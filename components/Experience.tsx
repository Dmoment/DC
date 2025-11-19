import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, Building2 } from 'lucide-react';
import { cn } from '../lib/utils';

type TimelineItem = {
  id: string;
  type: 'work' | 'education';
  role: string;
  company: string;
  period: string;
  location?: string;
  description?: string[];
  skills?: string[];
  logo?: string; // Placeholder for image path
};

const experienceData: TimelineItem[] = [
  {
    id: 'famaash',
    type: 'work',
    role: 'Founding Engineer',
    company: 'Famaash',
    period: 'Aug 2024 - Present',
    location: 'United States · Remote',
    description: [
      'Single-handedly developing the backend for an MVP for the entertainment industry in the United States.',
      'Leveraged Cursor and Claude Sonnet to expedite the MVP’s development, taking part in the entire product lifecycle from R&D to decision-making.'
    ]
  },
  {
    id: 'betacraft',
    type: 'work',
    role: 'Technical Lead',
    company: 'BetaCraft',
    period: 'Jan 2021 - Present',
    location: 'Pune, Maharashtra, India',
    description: [
      'Client - ReadyTech: Working as a full-stack developer to build an application portal for students in Australia using Ruby on Rails and Next.js/React.',
      'Client - Mocingbird: Created a course recommendation feature utilizing a binary tree for efficient search and filter capabilities.',
      'Engineered a multi-tenant rules engine as a USP, attracting 2 new clients.',
      'Mentored 16 team members, achieving a 30% reduction in onboarding time.',
      'Automated the platform\'s Rules Engine, reducing developer effort by 70%.'
    ],
    skills: ['Ruby on Rails', 'PostgreSQL', 'Next.js', 'React']
  },
  {
    id: 'spark',
    type: 'work',
    role: 'Senior Software Engineer',
    company: 'Spark Solutions - Ecommerce Experts',
    period: 'Apr 2023 - Oct 2024',
    location: 'Poland · Remote',
    description: [
      'Client - Fullscript: Worked on the backend of a Ruby on Rails monolith with a React frontend.',
      'Conducted comprehensive unit testing for backend and frontend to enhance code reliability.',
      'Developed GraphQL queries and mutations for smooth backend-frontend integration.'
    ],
    skills: ['Ruby on Rails', 'GraphQL']
  },
  {
    id: 'vendo',
    type: 'work',
    role: 'Ruby on Rails Developer',
    company: 'Vendo',
    period: 'Jul 2022 - Jun 2023',
    location: 'Poland · Remote',
    description: [
      'Worked on the integration of third-party APIs and customization of the Spree engine, boosting average order value by 15%.',
      'Improved application performance by 30% via code refactoring and database optimization.'
    ],
    skills: ['Ruby on Rails', 'Ruby']
  },
  {
    id: 'infosys',
    type: 'work',
    role: 'System Engineer',
    company: 'Infosys',
    period: 'Sep 2019 - Jan 2021',
    location: 'Pune, Maharashtra, India',
    description: []
  },
  {
    id: 'aktu',
    type: 'education',
    role: 'Bachelor of Technology - Computer Science',
    company: 'Dr. A.P.J. Abdul Kalam Technical University',
    period: '2015 – 2019',
    description: ['Grade: 70%']
  },
  {
    id: 'aps',
    type: 'education',
    role: 'Senior Secondary',
    company: 'Army Public School (APS)',
    period: 'Completed',
    description: ['Grade: 90%']
  }
];

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
              <h3 className="text-xl font-serif font-medium text-anthropic-text">
                {item.role}
              </h3>
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

