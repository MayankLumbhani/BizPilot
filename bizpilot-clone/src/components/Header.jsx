import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FiBox } from 'react-icons/fi';
import { motion } from 'framer-motion';

// ---------------------------------------------------------
// COMPONENT 1: Landing Links (MUST BE OUTSIDE 'Header')
// ---------------------------------------------------------
const LandingNavLinks = () => (
  <>
    <RouterLink to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</RouterLink>
    {['Tasks', 'Clients', 'Transactions', 'Reports'].map((item) => (
      <ScrollLink 
        key={item}
        to={`section-${item.toLowerCase()}`} 
        smooth={true} 
        duration={500} 
        className="text-sm font-medium hover:text-primary cursor-pointer transition-colors relative group"
      >
        {item}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
      </ScrollLink>
    ))}
    <RouterLink to="/" className="text-sm font-medium hover:text-primary transition-colors">About</RouterLink>
  </>
);

// ---------------------------------------------------------
// COMPONENT 2: Dashboard Links (MUST BE OUTSIDE 'Header')
// ---------------------------------------------------------
const DashboardNavLinks = () => (
  <>
    <RouterLink to="/dashboard" className="flex items-center gap-1 text-sm font-medium text-white bg-primary px-3 py-1.5 rounded-md shadow-sm hover:bg-primary-dark transition-colors">
      <FiBox /> Home
    </RouterLink>
    {['Tasks', 'Clients', 'Transactions', 'Reports', 'Settings', 'About'].map((item) => (
      <ScrollLink 
        key={item}
        to={`dash-${item.toLowerCase()}`} 
        smooth={true} 
        offset={-100} 
        className="text-sm font-medium hover:text-primary cursor-pointer transition-colors relative group"
      >
        {item}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
      </ScrollLink>
    ))}
  </>
);

// ---------------------------------------------------------
// MAIN COMPONENT: Header
// ---------------------------------------------------------
const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full py-4 px-6 bg-white/80 backdrop-blur-md border-b border-transparent sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <RouterLink to="/" className="flex items-center gap-2 text-primary font-bold text-xl group">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center"
            >
               <div className="w-3 h-3 bg-white rounded-sm"></div>
            </motion.div>
            <span className="group-hover:text-primary-dark transition-colors">BizPilot</span>
          </RouterLink>
          <nav className="hidden md:flex items-center gap-6 text-muted">
            {/* We simply use the components here */}
            {isDashboard ? <DashboardNavLinks /> : <LandingNavLinks />}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {isDashboard ? (
             <div className="flex items-center gap-2">
               <span className="text-sm font-medium">Alex Pilot</span>
               <img src="https://i.pravatar.cc/32?u=alex" alt="Profile" className="w-8 h-8 rounded-full bg-gray-200 border border-gray-100" />
             </div>
          ) : (
            <>
              <button className="text-sm font-medium hover:text-primary transition-colors">Sign In</button>
              <RouterLink to="/dashboard">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-md transition shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </motion.button>
              </RouterLink>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;