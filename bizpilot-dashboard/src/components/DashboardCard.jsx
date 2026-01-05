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
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  },
  tap: {
    scale: 0.99
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
        "bg-white p-6 rounded-2xl shadow-soft hover:shadow-elevated border border-gray-100 cursor-default transition-shadow transition-colors",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default DashboardCard;
