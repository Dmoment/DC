import type { NextPage } from 'next';
import Layout from '../components/Layout';
import LeetCodeStats from '../components/LeetCodeStats';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

// Replace with your LeetCode username
const LEETCODE_USERNAME = 'Dmoment';

const LeetCodePage: NextPage = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
            <Code2 size={24} />
          </div>
          <h1 className="text-4xl font-serif font-medium text-anthropic-text">LeetCode Progress</h1>
        </div>

        <p className="text-anthropic-secondary mb-12 max-w-2xl">
          Tracking my problem-solving journey on LeetCode. Building strong fundamentals in
          data structures and algorithms through consistent practice.
        </p>

        <LeetCodeStats username={LEETCODE_USERNAME} />
      </motion.div>
    </Layout>
  );
};

export default LeetCodePage;
