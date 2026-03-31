import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Trophy, CheckCircle2, Target, Flame, ExternalLink } from 'lucide-react';

interface UserStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
}

interface SubmissionCalendar {
  [timestamp: string]: number;
}

interface LeetCodeStatsProps {
  username: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getIntensityClass(count: number): string {
  if (count === 0) return 'bg-anthropic-border';
  if (count <= 2) return 'bg-green-200';
  if (count <= 5) return 'bg-green-400';
  if (count <= 10) return 'bg-green-500';
  return 'bg-green-600';
}

function ContributionHeatmap({ calendar }: { calendar: SubmissionCalendar }) {
  const today = new Date();
  const weeks: { date: Date; count: number }[][] = [];

  // Generate last 52 weeks of data
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364);
  startDate.setDate(startDate.getDate() - startDate.getDay()); // Start from Sunday

  let currentWeek: { date: Date; count: number }[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= today) {
    const timestamp = Math.floor(currentDate.getTime() / 1000).toString();
    const count = calendar[timestamp] || 0;

    currentWeek.push({ date: new Date(currentDate), count });

    if (currentDate.getDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Get month labels
  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const firstDayOfWeek = week[0]?.date;
    if (firstDayOfWeek) {
      const month = firstDayOfWeek.getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month], weekIndex });
        lastMonth = month;
      }
    }
  });

  const totalSubmissions = Object.values(calendar).reduce((sum, count) => sum + count, 0);
  const activeDays = Object.values(calendar).filter(count => count > 0).length;

  return (
    <div className="bg-white border border-black/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-serif font-medium text-anthropic-text">Submission Activity</h3>
        <div className="flex items-center gap-4 text-sm text-anthropic-secondary">
          <span>{totalSubmissions} submissions</span>
          <span>{activeDays} active days</span>
        </div>
      </div>

      {/* Month labels */}
      <div className="flex mb-2 ml-8 overflow-x-auto">
        {monthLabels.map(({ label, weekIndex }, i) => (
          <div
            key={i}
            className="text-xs text-anthropic-secondary flex-shrink-0"
            style={{
              marginLeft: i === 0 ? `${weekIndex * 14}px` : `${(weekIndex - monthLabels[i-1].weekIndex - 1) * 14}px`,
              minWidth: '28px'
            }}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="flex overflow-x-auto pb-2">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] mr-2 text-xs text-anthropic-secondary flex-shrink-0">
          {DAYS.map((day, i) => (
            <div key={day} className="h-[12px] leading-[12px]" style={{ visibility: i % 2 === 1 ? 'visible' : 'hidden' }}>
              {day}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-[3px]">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={dayIndex}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                  className={`w-[12px] h-[12px] rounded-sm ${getIntensityClass(day.count)} cursor-pointer transition-transform hover:scale-125`}
                  title={`${day.date.toDateString()}: ${day.count} submissions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-anthropic-secondary">
        <span>Less</span>
        <div className="w-[12px] h-[12px] rounded-sm bg-anthropic-border" />
        <div className="w-[12px] h-[12px] rounded-sm bg-green-200" />
        <div className="w-[12px] h-[12px] rounded-sm bg-green-400" />
        <div className="w-[12px] h-[12px] rounded-sm bg-green-500" />
        <div className="w-[12px] h-[12px] rounded-sm bg-green-600" />
        <span>More</span>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, subtext, color }: {
  icon: typeof Code2;
  label: string;
  value: string | number;
  subtext?: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-black/5 rounded-xl p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={20} />
        </div>
        <span className="text-sm text-anthropic-secondary font-medium">{label}</span>
      </div>
      <div className="text-2xl font-serif font-medium text-anthropic-text">{value}</div>
      {subtext && <div className="text-sm text-anthropic-secondary mt-1">{subtext}</div>}
    </motion.div>
  );
}

function DifficultyBar({ label, solved, total, color }: { label: string; solved: number; total: number; color: string }) {
  const percentage = total > 0 ? (solved / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className={`font-medium ${color}`}>{label}</span>
        <span className="text-anthropic-secondary">{solved} / {total}</span>
      </div>
      <div className="h-2 bg-anthropic-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
        />
      </div>
    </div>
  );
}

// Use our own API route which queries LeetCode directly
async function fetchLeetCodeStats(username: string): Promise<{ stats: UserStats; calendar: SubmissionCalendar } | null> {
  try {
    // Use our own Next.js API route
    const res = await fetch(`/api/leetcode?username=${encodeURIComponent(username)}`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'API failed');
    }
    const data = await res.json();
    return {
      stats: data.stats,
      calendar: data.calendar || {},
    };
  } catch (e) {
    console.error('Failed to fetch LeetCode stats:', e);
    return null;
  }
}

export default function LeetCodeStats({ username }: LeetCodeStatsProps) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [calendar, setCalendar] = useState<SubmissionCalendar>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchLeetCodeStats(username);

        if (!result) {
          throw new Error('All APIs failed');
        }

        setStats(result.stats);
        setCalendar(result.calendar);
      } catch (err) {
        console.error('LeetCode fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-anthropic-accent" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-white border border-black/5 rounded-xl p-8 text-center">
        <Code2 size={48} className="mx-auto mb-4 text-anthropic-secondary/50" />
        <p className="text-anthropic-secondary mb-4">Unable to load LeetCode stats at the moment.</p>
        <a
          href={`https://leetcode.com/u/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-anthropic-accent text-white rounded-lg hover:bg-anthropic-accent/90 transition-colors"
        >
          <ExternalLink size={16} />
          View Profile on LeetCode
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={CheckCircle2}
          label="Problems Solved"
          value={stats.totalSolved}
          subtext={`of ${stats.totalQuestions}`}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={Trophy}
          label="Global Ranking"
          value={stats.ranking?.toLocaleString() || 'N/A'}
          color="bg-yellow-100 text-yellow-600"
        />
        <StatCard
          icon={Target}
          label="Acceptance Rate"
          value={stats.totalQuestions > 0 ? `${((stats.totalSolved / stats.totalQuestions) * 100).toFixed(1)}%` : 'N/A'}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={Flame}
          label="Hard Problems"
          value={stats.hardSolved}
          subtext={`of ${stats.totalHard}`}
          color="bg-red-100 text-red-600"
        />
      </div>

      {/* Difficulty Breakdown */}
      <div className="bg-white border border-black/5 rounded-xl p-6">
        <h3 className="text-lg font-serif font-medium text-anthropic-text mb-6">Problems by Difficulty</h3>
        <div className="space-y-4">
          <DifficultyBar label="Easy" solved={stats.easySolved} total={stats.totalEasy} color="text-green-500" />
          <DifficultyBar label="Medium" solved={stats.mediumSolved} total={stats.totalMedium} color="text-yellow-500" />
          <DifficultyBar label="Hard" solved={stats.hardSolved} total={stats.totalHard} color="text-red-500" />
        </div>
      </div>

      {/* Contribution Heatmap */}
      {Object.keys(calendar).length > 0 && (
        <ContributionHeatmap calendar={calendar} />
      )}

      {/* Link to LeetCode profile */}
      <div className="text-center">
        <a
          href={`https://leetcode.com/u/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-anthropic-secondary hover:text-anthropic-accent transition-colors text-sm"
        >
          <Code2 size={16} />
          View full profile on LeetCode
        </a>
      </div>
    </div>
  );
}
