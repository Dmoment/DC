import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-xl shadow-2xl z-[101] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
              <h2 className="text-xl font-serif font-medium">Resume</h2>
              <div className="flex items-center gap-3">
                {/* Open in new tab */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-anthropic-secondary hover:text-anthropic-text transition-colors"
                >
                  <ExternalLink size={16} />
                  <span className="hidden sm:inline">Open</span>
                </a>

                {/* Download button */}
                <a
                  href="/resume.pdf"
                  download="Deepak_Chauhan_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-anthropic-text text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="p-2 text-anthropic-secondary hover:text-anthropic-text hover:bg-black/5 rounded-md transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* PDF Preview */}
            <div className="flex-1 bg-gray-100">
              <iframe
                src="/resume.pdf#view=FitH"
                className="w-full h-full"
                title="Resume Preview"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
