import type { NextApiRequest, NextApiResponse } from 'next';

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql';

const USER_STATS_QUERY = `
  query userPublicProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

const USER_CALENDAR_QUERY = `
  query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        submissionCalendar
      }
    }
  }
`;

async function fetchLeetCodeGraphQL(query: string, variables: Record<string, any>) {
  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com',
      'Origin': 'https://leetcode.com',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode API returned ${response.status}`);
  }

  return response.json();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    // Fetch both stats and calendar in parallel
    const [statsResult, calendarResult] = await Promise.all([
      fetchLeetCodeGraphQL(USER_STATS_QUERY, { username }),
      fetchLeetCodeGraphQL(USER_CALENDAR_QUERY, { username, year: new Date().getFullYear() }),
    ]);

    const matchedUser = statsResult.data?.matchedUser;
    const allQuestions = statsResult.data?.allQuestionsCount;

    if (!matchedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Parse submission stats
    const submitStats = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
    const getCount = (difficulty: string) =>
      submitStats.find((s: any) => s.difficulty === difficulty)?.count || 0;

    const getTotalCount = (difficulty: string) =>
      allQuestions?.find((q: any) => q.difficulty === difficulty)?.count || 0;

    // Parse calendar
    const calendarData = calendarResult.data?.matchedUser?.userCalendar?.submissionCalendar;
    const calendar = calendarData ? JSON.parse(calendarData) : {};

    const stats = {
      totalSolved: getCount('All'),
      totalQuestions: getTotalCount('All'),
      easySolved: getCount('Easy'),
      totalEasy: getTotalCount('Easy'),
      mediumSolved: getCount('Medium'),
      totalMedium: getTotalCount('Medium'),
      hardSolved: getCount('Hard'),
      totalHard: getTotalCount('Hard'),
      ranking: matchedUser.profile?.ranking || 0,
    };

    // Cache for 1 hour
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json({ stats, calendar });

  } catch (error) {
    console.error('LeetCode API error:', error);
    res.status(500).json({ error: 'Failed to fetch LeetCode data' });
  }
}
