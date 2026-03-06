import Image from 'next/image';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, Building2 } from 'lucide-react';
import { cn } from '../lib/utils';

type Client = {
  name: string;
  logo: string;
  website?: string;
};

type Product = {
  name: string;
  logo: string;
  website?: string;
};

type TimelineItem = {
  id: string;
  type: 'work' | 'education';
  role: string;
  company: string;
  companyLogo?: string;
  companyWebsite?: string;
  period: string;
  location?: string;
  employmentType?: 'Full-time' | 'Contract' | 'Internship';
  description?: string[];
  skills?: string[];
  client?: Client;
  product?: Product;
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
    product: {
      name: 'LensLedger',
      logo: 'https://lensledger.vercel.app/assets/logo.png',
      website: 'https://lensledger.vercel.app'
    },
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
    company: 'BetaCraft',
    companyLogo: '/logos/betacraft.png',
    companyWebsite: 'https://betacraft.com',
    period: 'Jan 2025 - Present',
    location: 'Remote',
    employmentType: 'Contract',
    client: {
      name: 'ReadyTech',
      logo: 'https://readytech.io/assets/Uploads/RDY_Logo_Secondary_Standard_L.png',
      website: 'https://readytech.io'
    },
    description: [
      'Working on a new "Admissions" application for ReadyTech\'s EdTech platform.',
      'Integrating functionality from their legacy 15-year-old Rails application into the new system.',
      'Contributing to both the new repo and the existing legacy codebase simultaneously.'
    ],
    skills: ['Ruby on Rails', 'Next.js', 'React', 'PostgreSQL']
  },
  {
    id: 'fullscript',
    type: 'work',
    role: 'Senior Software Engineer',
    company: 'Spark Solutions',
    companyLogo: 'https://sparksolutions.co/wp-content/themes/sparksolutions/images/logo.svg',
    companyWebsite: 'https://sparksolutions.co',
    period: 'Apr 2023 - Oct 2024',
    location: 'Remote',
    employmentType: 'Contract',
    client: {
      name: 'Fullscript',
      logo: 'https://fullscript.com/favicon.svg',
      website: 'https://fullscript.com'
    },
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
    company: 'Spark Solutions',
    companyLogo: 'https://sparksolutions.co/wp-content/themes/sparksolutions/images/logo.svg',
    companyWebsite: 'https://sparksolutions.co',
    period: 'Jun 2022 - Apr 2023',
    location: 'Remote',
    employmentType: 'Contract',
    product: {
      name: 'Vendo',
      logo: '/logos/vendo.svg',
      website: 'https://www.getvendo.com'
    },
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
    company: 'BetaCraft',
    companyLogo: '/logos/betacraft.png',
    companyWebsite: 'https://betacraft.com',
    period: 'Jan 2021 - Jun 2022',
    location: 'Pune, India',
    employmentType: 'Full-time',
    client: {
      name: 'Mocingbird',
      logo: 'https://mocingbird.com/wp-content/uploads/2024/11/mocingbird-logo.svg',
      website: 'https://mocingbird.com'
    },
    description: [
      'Developed Ruby on Rails app enhancing US doctors\' licensing processes with 40% rise in B2B applications.',
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
    companyLogo: '/logos/infosys.svg',
    companyWebsite: 'https://www.infosys.com',
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
  const content = (
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-anthropic-accent/5 border border-anthropic-accent/10 rounded-lg hover:bg-anthropic-accent/10 transition-colors">
      <div className="w-8 h-8 rounded-md bg-white border border-black/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          width={24}
          height={24}
          className="object-contain"
          unoptimized
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-anthropic-secondary/60">Client</span>
        <span className="font-medium text-anthropic-text text-sm">{client.name}</span>
      </div>
    </div>
  );

  if (client.website) {
    return (
      <a href={client.website} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

function ProductBadge({ product }: { product: Product }) {
  const content = (
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-50 border border-purple-100 rounded-lg hover:bg-purple-100 transition-colors">
      <div className="w-8 h-8 rounded-md bg-white border border-black/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
        <Image
          src={product.logo}
          alt={`${product.name} logo`}
          width={24}
          height={24}
          className="object-contain"
          unoptimized
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-purple-400">Product</span>
        <span className="font-medium text-anthropic-text text-sm">{product.name}</span>
      </div>
    </div>
  );

  if (product.website) {
    return (
      <a href={product.website} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
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
                {item.companyLogo ? (
                  <div className="w-5 h-5 rounded overflow-hidden flex items-center justify-center bg-white border border-black/5">
                    <Image
                      src={item.companyLogo}
                      alt={`${item.company} logo`}
                      width={16}
                      height={16}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <Building2 size={14} />
                )}
                {item.companyWebsite ? (
                  <a href={item.companyWebsite} target="_blank" rel="noopener noreferrer" className="hover:text-anthropic-accent transition-colors">
                    {item.company}
                  </a>
                ) : (
                  item.company
                )}
              </div>
              {item.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {item.location}
                </div>
              )}
            </div>

            {/* Client & Product Badges */}
            {(item.client || item.product) && (
              <div className="flex flex-wrap gap-3 mb-4">
                {item.client && <ClientBadge client={item.client} />}
                {item.product && <ProductBadge product={item.product} />}
              </div>
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
