import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title = "Deepak Chauhan", description = "Personal portfolio and blog" }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-anthropic-bg text-anthropic-text selection:bg-anthropic-accent/20">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow pt-32 px-6">
        <div className="max-w-5xl mx-auto w-full">
           <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
