import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Download, Share2, Check, QrCode as QrIcon, X, ArrowUpRight } from 'lucide-react';
import QrCode from '../components/QrCode';
import styles from '../styles/Card.module.css';

const CARD_URL = 'https://modestmoron.tech/card';

const links = [
  { label: 'Email', value: 'rishudc119@gmail.com', href: 'mailto:rishudc119@gmail.com', Icon: Mail },
  { label: 'GitHub', value: 'github.com/Dmoment', href: 'https://github.com/Dmoment', Icon: Github },
  { label: 'LinkedIn', value: 'in/deepak-chauhan-a3426b11a', href: 'https://www.linkedin.com/in/deepak-chauhan-a3426b11a/', Icon: Linkedin },
  { label: 'X', value: '@rishudc119', href: 'https://x.com/rishudc119', Icon: Twitter },
];

const CardPage: NextPage = () => {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [unit, setUnit] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // --u is one millimetre of a real 89 x 51 mm card, in pixels.
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const measure = () => setUnit(el.clientWidth / 89);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
    if (window.location.hash === '#back') setFlipped(true);
  }, []);

  useEffect(() => {
    if (!qrOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setQrOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [qrOpen]);

  const share = async () => {
    const data = { title: 'Deepak Chauhan', text: 'Deepak Chauhan, Senior Software Engineer', url: CARD_URL };
    try {
      if (canShare) {
        await navigator.share(data);
        return;
      }
    } catch {
      // user cancelled the share sheet; fall through to copy
    }
    try {
      await navigator.clipboard.writeText(CARD_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable; nothing else sensible to do
    }
  };

  return (
    <div className="min-h-screen bg-anthropic-bg text-anthropic-text selection:bg-anthropic-accent/20 flex flex-col">
      <Head>
        <title>Deepak Chauhan · Contact</title>
        <meta name="description" content="Deepak Chauhan, Senior Software Engineer. Save my contact, or find me on GitHub, LinkedIn and X." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Deepak Chauhan · Contact" />
        <meta property="og:description" content="Senior Software Engineer. Ruby on Rails, PostgreSQL, React, System Design." />
        <meta property="og:url" content={CARD_URL} />
        <meta name="theme-color" content="#f4f1ed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="max-w-xl w-full mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-serif font-bold tracking-tighter hover:text-anthropic-accent transition-colors">DC</a>
        </Link>
        <span className="font-mono text-xs tracking-wide text-anthropic-secondary">modestmoron.tech/card</span>
      </header>

      <main className="flex-grow w-full max-w-xl mx-auto px-6 pb-16 flex flex-col gap-8">
        {/* The card */}
        <section className="pt-4">
          <div ref={sceneRef} className={styles.scene}>
            <motion.div
              role="button"
              tabIndex={0}
              aria-label={flipped ? 'Card back. Press to see the front.' : 'Card front. Press to see the back.'}
              className={styles.card}
              style={{ '--u': `${unit}px` } as React.CSSProperties}
              onClick={() => setFlipped((f) => !f)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped((f) => !f); } }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 26 }}
            >
              <div className={`${styles.face} ${styles.front}`}>
                <div className={styles.safe}>
                  <div className={styles.mark}>
                    <span className={styles.dc}>DC<i>.</i></span>
                    <span className={styles.url}>modestmoron.tech</span>
                  </div>
                  <div className={styles.euler} aria-hidden="true">
                    e<sup>iπ</sup><span className={styles.op}>+</span><span className={styles.num}>1</span><span className={styles.op}>=</span><span className={styles.num}>0</span>
                  </div>
                  <div className={styles.name}>Deepak Chauhan</div>
                  <div className={styles.role}>
                    <span><b>Senior Software Engineer</b></span>
                    <span>Ruby on Rails <span className={styles.sep}>·</span> PostgreSQL <span className={styles.sep}>·</span> React <span className={styles.sep}>·</span> System Design</span>
                  </div>
                </div>
              </div>

              <div className={`${styles.face} ${styles.back}`}>
                <div className={styles.safe}>
                  <div className={styles.tag}>I build things and share what I learn along the way.</div>
                  <div className={styles.qr}><QrCode /></div>
                  <div className={styles.qrcap}>
                    <span><b className={styles.u}>modestmoron.tech</b>work &amp; writing</span>
                    <span><b>Ask me about</b> Rails at scale, GraphQL perf, AI tooling for devs.</span>
                  </div>
                  <div className={styles.contacts}>
                    <span className={styles.l}>mail</span><span className={styles.v}>rishudc119@gmail.com</span>
                    <span className={styles.l}>github</span><span className={styles.v}><span>github.com/</span>Dmoment</span>
                    <span className={styles.l}>linkedin</span><span className={styles.v}>deepak-chauhan-a3426b11a</span>
                    <span className={styles.l}>x</span><span className={styles.v}>@rishudc119</span>
                    <span className={styles.l}>base</span><span className={styles.v}>Remote <span>·</span> India <span>·</span> IST</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <p className="mt-4 text-center font-mono text-xs tracking-wide text-anthropic-secondary">
            Tap the card to flip it
          </p>
        </section>

        {/* Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="/deepak-chauhan.vcf"
            download="Deepak Chauhan.vcf"
            className="sm:col-span-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-anthropic-text text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            <Download size={18} />
            Save contact
          </a>
          <button
            onClick={share}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-anthropic-text/20 font-medium rounded-md hover:bg-black/5 transition-colors"
          >
            {copied ? <Check size={18} className="text-anthropic-accent" /> : <Share2 size={18} />}
            {copied ? 'Link copied' : canShare ? 'Share' : 'Copy link'}
          </button>
          <button
            onClick={() => setQrOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-anthropic-text/20 font-medium rounded-md hover:bg-black/5 transition-colors"
          >
            <QrIcon size={18} />
            Show QR
          </button>
        </section>

        {/* Links */}
        <section>
          <h2 className="font-mono text-xs uppercase tracking-widest text-anthropic-secondary mb-3">Find me</h2>
          <ul className="divide-y divide-black/5 border-y border-black/5">
            {links.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="group flex items-center gap-4 py-4 hover:text-anthropic-accent transition-colors"
                >
                  <Icon size={20} className="text-anthropic-secondary group-hover:text-anthropic-accent transition-colors shrink-0" />
                  <span className="w-20 text-sm text-anthropic-secondary shrink-0">{label}</span>
                  <span className="flex-grow font-mono text-sm truncate">{value}</span>
                  <ArrowUpRight size={16} className="text-anthropic-secondary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="text-sm text-anthropic-secondary leading-relaxed">
          <p>
            Senior Software Engineer, seven years in. Backend-leaning full stack: Ruby on Rails, PostgreSQL, React and system design.
            Currently building admissions software for ReadyTech with BetaCraft, and KhataTrack on the side.
            {' '}
            <Link href="/"><a className="text-anthropic-text underline decoration-anthropic-accent underline-offset-4 hover:text-anthropic-accent">More on the home page</a></Link>.
          </p>
        </section>
      </main>

      {/* Full-screen QR for handing the phone over */}
      <AnimatePresence>
        {qrOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-anthropic-bg flex flex-col items-center justify-center px-8"
            onClick={() => setQrOpen(false)}
          >
            <button
              onClick={() => setQrOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 text-anthropic-secondary hover:text-anthropic-text hover:bg-black/5 rounded-md transition-colors"
            >
              <X size={22} />
            </button>
            <div className="w-full max-w-xs aspect-square">
              <QrCode className="w-full h-full" label="QR code linking to modestmoron.tech/card" />
            </div>
            <p className="mt-8 font-serif text-2xl font-medium text-center">Deepak Chauhan</p>
            <p className="mt-2 font-mono text-sm text-anthropic-secondary text-center">Scan to save my contact</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardPage;
