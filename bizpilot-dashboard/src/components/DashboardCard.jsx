import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper to merge classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (delay) => ({ 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 20,
      mass: 1,
      delay: delay 
    }
  }),
  hover: { 
    y: -4,
    scale: 1.005,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  },
  tap: {
    scale: 0.99,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
  }
};

const DashboardCard = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      custom={delay}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      className={cn(
        "bg-white p-6 rounded-2xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-gray-100 cursor-default transition-colors",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default DashboardCard;
