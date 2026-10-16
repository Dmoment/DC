import { useState } from 'react';
import Link from 'next/link';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import { GSTIN, business } from '../lib/business';

export default function WorkWithMe() {
  const [copied, setCopied] = useState(false);

  const copyGstin = async () => {
    try {
      await navigator.clipboard.writeText(GSTIN);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <section id="work-with-me" className="py-20 scroll-mt-24">
      <h2 className="text-3xl font-serif font-medium mb-12 border-b border-black/5 pb-6">Work with me</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16">
        <div className="md:col-span-3">
          <p className="text-lg text-anthropic-secondary leading-relaxed mb-4">
            I take on contract work as an independent engineer, usually as the person who owns the backend and the AI
            layer end to end. Recent engagements covered voice agents on ElevenLabs, LLM assistants on Gemini and Claude
            with Langfuse tracing, POS and Salesforce integrations, and Rails and Node platforms that had to scale.
          </p>
          <p className="text-lg text-anthropic-secondary leading-relaxed mb-8">
            If you have a product that needs that kind of depth, or an AI feature that has to work in production rather
            than in a demo, get in touch.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:rishudc119@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 bg-anthropic-text text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              <Mail size={18} />
              Email me
            </a>
            <Link href="/card">
              <a className="inline-flex items-center gap-2 px-5 py-3 border border-anthropic-text/20 font-medium rounded-md hover:bg-black/5 transition-colors group">
                Digital card
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Link>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-mono text-xs uppercase tracking-widest text-anthropic-secondary mb-3">Business details</h3>
          <dl className="divide-y divide-black/5 border-y border-black/5">
            {business.map(({ label, value }) => (
              <div key={label} className="flex items-center gap-4 py-3">
                <dt className="w-24 text-sm text-anthropic-secondary shrink-0">{label}</dt>
                <dd className="flex-grow font-mono text-sm truncate">{value}</dd>
                {label === 'GSTIN' && (
                  <button
                    onClick={copyGstin}
                    aria-label="Copy GSTIN"
                    className="p-1.5 -mr-1.5 rounded-md text-anthropic-secondary hover:text-anthropic-accent hover:bg-black/5 transition-colors shrink-0"
                  >
                    {copied ? <Check size={16} className="text-anthropic-accent" /> : <Copy size={16} />}
                  </button>
                )}
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-anthropic-secondary leading-relaxed">
            Contract work is invoiced under this GSTIN. Registered address available on request.
          </p>
        </div>
      </div>
    </section>
  );
}
