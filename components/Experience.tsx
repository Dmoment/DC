import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, Building2 } from 'lucide-react';
import { cn } from '../lib/utils';

type Client = {
  name: string;
  description: string;
};

type TimelineItem = {
  id: string;
  type: 'work' | 'education';
  role: string;
  company: string;
  period: string;
  location?: string;
  employmentType?: 'Full-time' | 'Contract' | 'Internship';
  description?: string[];
  skills?: string[];
  client?: Client;
};

const experienceData: TimelineItem[] = [
  {
    id: 'famaash',
    type: 'work',
    role: 'Founding Engineer',
    company: 'Famaash',
    period: 'Oct 2024 - Present',
    location: 'United States · Remote',
    employmentType: 'Full-time',
    description: [
      'Building an MVP for payroll, expense management and everything a film production company needs.',
      'Sole engineer responsible for the entire backend stack.'
    ],
    skills: ['Ruby on Rails', 'PostgreSQL', 'System Design']
  },
  {
    id: 'betacraft-readytech',
    type: 'work',
    role: 'Senior Software Engineer',
    company: 'BetaCraft Pvt Ltd',
    period: 'Jan 2025 - Present',
    location: 'Remote',
    employmentType: 'Contract',
    client: {
      name: 'ReadyTech (EdTech, Australia)',
      description: 'Working on a new "Admissions" application for ReadyTech\'s EdTech platform. Integrating functionality from their legacy 15-year-old Rails application into the new system.'
    },
    description: [
      'Contributing to both the new repo and the existing legacy codebase simultaneously.'
    ],
    skills: ['Ruby on Rails', 'Next.js', 'React', 'PostgreSQL']
  },
  {
    id: 'fullscript',
    type: 'work',
    role: 'Senior Software Engineer',
    company: 'Fullscript',
    period: 'Apr 2023 - Oct 2024',
    location: 'Remote',
    employmentType: 'Contract',
    description: [
      'Optimized wholesale checkout process to improve user experience and operational efficiency.',
      'Optimized core GraphQL search query, cutting response time from 20 seconds to 2 seconds.',
      'Managed transfer of Emerson Ecologies\' data to newly developed app with robust error handling.',
      'Wrote optimized SQL queries for data migration, reducing time from 1 hour to 5 minutes.'
    ],
    skills: ['Ruby on Rails', 'GraphQL', 'PostgreSQL', 'React']
  },
  {
    id: 'vendo',
    type: 'work',
    role: 'Senior Software Engineer',
    company: 'Vendo',
    period: 'Jun 2022 - Apr 2023',
    location: 'Remote',
    employmentType: 'Contract',
    description: [
      'Spearheaded integration of third-party APIs and Spree engine customization, resulting in 15% increase in average order value.',
      'Enhanced application performance by 30% through code refactoring and database optimization.'
    ],
    skills: ['Ruby on Rails', 'Spree Commerce', 'API Integration']
  },
  {
    id: 'betacraft-mockingbird',
    type: 'work',
    role: 'Tech Lead',
    company: 'BetaCraft Pvt Ltd',
    period: 'Jan 2021 - Jun 2022',
    location: 'Pune, India',
    employmentType: 'Full-time',
    client: {
      name: 'Mockingbird',
      description: 'Developed Ruby on Rails app enhancing US doctors\' licensing processes with 40% rise in B2B applications.'
    },
    description: [
      'Cut memory usage by ~45% through improved coding practices and algorithm optimization.',
      'Built course recommendation feature using binary tree data structure for efficient searching.',
      'Designed multi-tenant rules engine USP, instrumental in attracting new clients.',
      'Practiced TDD and increased test coverage by 70%.',
      'Facilitated code reviews and participated in daily stand-ups, sprint planning.'
    ],
    skills: ['Ruby on Rails', 'PostgreSQL', 'TDD', 'System Design']
  },
  {
    id: 'infosys',
    type: 'work',
    role: 'System Engineer',
    company: 'Infosys',
    period: 'Jun 2019 - Jan 2021',
    location: 'Pune, India',
    employmentType: 'Full-time',
    description: [
      'Completed internship working on internal projects using C#, Python, and Ruby.'
    ],
    skills: ['C#', 'Python', 'Ruby']
  },
  {
    id: 'aktu',
    type: 'education',
    role: 'Bachelor\'s in Computer Science & Engineering',
    company: 'A.P.J. Abdul Kalam Technical University',
    period: 'Jul 2015 - Jul 2019',
    description: []
  }
];

function ClientBadge({ client }: { client: Client }) {
  return (
    <div className="mb-4 flex items-start gap-3 p-3 bg-anthropic-accent/5 border border-anthropic-accent/10 rounded-lg">
      <div className="w-8 h-8 rounded-md bg-anthropic-accent/10 border border-anthropic-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Building2 size={16} className="text-anthropic-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-anthropic-secondary/60">Client</span>
          <div className="h-px flex-1 bg-anthropic-accent/10" />
        </div>
        <p className="font-medium text-anthropic-text text-sm mt-1">{client.name}</p>
        <p className="text-sm text-anthropic-secondary mt-1 leading-relaxed">
          {client.description}
        </p>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-serif font-medium mb-12 border-b border-black/5 pb-6">Experience & Education</h2>

      <div className="relative border-l border-black/10 ml-3 md:ml-6 space-y-12">
        {experienceData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot with Icon */}
            <div className={cn(
              "absolute -left-3 md:-left-[1.15rem] top-0 w-6 h-6 md:w-9 md:h-9 rounded-full border md:border-2 flex items-center justify-center bg-anthropic-bg z-10",
              item.type === 'work' ? "border-anthropic-accent text-anthropic-accent" : "border-anthropic-secondary text-anthropic-secondary"
            )}>
              {item.type === 'work' ? <Briefcase size={14} className="md:w-4 md:h-4" /> : <GraduationCap size={14} className="md:w-4 md:h-4" />}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-serif font-medium text-anthropic-text">
                  {item.role}
                </h3>
                {item.employmentType && (
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium",
                    item.employmentType === 'Full-time'
                      ? "bg-green-100 text-green-700"
                      : item.employmentType === 'Contract'
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  )}>
                    {item.employmentType}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-anthropic-secondary/80 font-medium mt-1 sm:mt-0">
                <Calendar size={14} />
                {item.period}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-anthropic-secondary mb-4">
              <div className="flex items-center gap-1.5 font-medium text-anthropic-text/80">
                <Building2 size={14} />
                {item.company}
              </div>
              {item.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {item.location}
                </div>
              )}
            </div>

            {/* Client Thread */}
            {item.client && (
              <ClientBadge client={item.client} />
            )}

            {item.description && item.description.length > 0 && (
              <ul className="list-disc list-outside ml-4 space-y-2 text-anthropic-secondary leading-relaxed mb-4">
                {item.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            )}

            {item.skills && (
              <div className="flex flex-wrap gap-2">
                {item.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 text-xs font-medium bg-white border border-black/5 rounded-md text-anthropic-secondary">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
