import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiActivity, FiUsers, FiDollarSign, FiPieChart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const LandingPage = () => {
  return (
    <div className="bg-secondary min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-grow">
        <section className="text-center pt-16 pb-12 px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="bg-teal-100 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block">New: Advanced Financial Reporting</motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">
              Navigate Your Business <br/> With Complete Confidence
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-muted text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              The all-in-one platform to manage clients, track transactions, organize tasks, and visualize your success with detailed reports.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex justify-center gap-4 mb-16">
               <Link to="/dashboard">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-md transition shadow-lg hover:shadow-xl"
                  >
                    Start Free Trial
                  </motion.button>
              </Link>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border border-gray-300 hover:border-primary text-dark font-medium px-6 py-3 rounded-md transition shadow-sm hover:shadow-md"
              >
                See How it Works
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto bg-white p-4 rounded-xl shadow-2xl mb-20 overflow-hidden relative border border-gray-100"
          >
             {/* Simulated content for the preview image */}
             <div className="bg-gray-50 p-6 rounded-lg grid grid-cols-3 gap-6 mb-6">
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded shadow-sm text-center border border-gray-100"><h3 className="text-muted text-sm mb-2">Total Revenue</h3><p className="text-2xl font-bold text-primary">$124,500</p></motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded shadow-sm text-center border border-gray-100"><h3 className="text-muted text-sm mb-2">Active Tasks</h3><p className="text-2xl font-bold text-primary">24</p></motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded shadow-sm text-center border border-gray-100"><h3 className="text-muted text-sm mb-2">Total Clients</h3><p className="text-2xl font-bold text-primary">86</p></motion.div>
             </div>
             <div className="bg-gray-50 p-6 rounded-lg grid grid-cols-2 gap-6 h-64">
                <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-4 rounded shadow-sm border border-gray-100"></motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-4 rounded shadow-sm border border-gray-100"></motion.div>
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent pointer-events-none"></div>
          </motion.div>
        </section>

        {/* Features Section - IDs added here for linking from navbar */}
        <section className="py-20 px-6 bg-secondary/50">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
                <h2 className="text-3xl font-bold mb-4">Everything you need to run your business</h2>
                <p className="text-muted max-w-xl mx-auto">Streamline your operations with our comprehensive suite of tools.</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                {/* Task Management */}
                <motion.div 
                  variants={fadeInUp} 
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  id="section-tasks" 
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 scroll-mt-24 border border-transparent hover:border-gray-100"
                >
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-primary mb-6">
                        <FiActivity size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-3">Task Management</h3>
                    <p className="text-muted text-sm leading-relaxed mb-6">
                        Create, assign, and track tasks with ease. Set priorities and due dates to keep your team aligned.
                    </p>
                    <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1 group">
                      View Tasks <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </motion.div>

                {/* Client Directory */}
                <motion.div 
                  variants={fadeInUp} 
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  id="section-clients" 
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 scroll-mt-24 border border-transparent hover:border-gray-100"
                >
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-primary mb-6">
                        <FiUsers size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-3">Client Directory</h3>
                    <p className="text-muted text-sm leading-relaxed mb-6">
                        Manage client profiles, company details, and contact information all in one secure place.
                    </p>
                    <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1 group">
                      Manage Clients <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </motion.div>

                {/* Transaction Tracking */}
                <motion.div 
                  variants={fadeInUp} 
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  id="section-transactions" 
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 scroll-mt-24 border border-transparent hover:border-gray-100"
                >
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-primary mb-6">
                        <FiDollarSign size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-3">Transaction Tracking</h3>
                    <p className="text-muted text-sm leading-relaxed mb-6">
                        Log income and expenses instantly. Categorize transactions to understand your cash flow better.
                    </p>
                    <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1 group">
                      Track Money <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </motion.div>

                {/* Detailed Reporting */}
                <motion.div 
                  variants={fadeInUp} 
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  id="section-reports" 
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 scroll-mt-24 border border-transparent hover:border-gray-100"
                >
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-primary mb-6">
                        <FiPieChart size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-3">Detailed Reporting</h3>
                    <p className="text-muted text-sm leading-relaxed mb-6">
                        Get insights on net profit, monthly revenue, and expenses. Identify your top performing clients.
                    </p>
                    <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1 group">
                      View Reports <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </motion.div>
            </motion.div>

        </section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-primary py-20 px-6 text-center text-white relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative z-10"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to take off?</h2>
              <p className="opacity-90 max-w-xl mx-auto mb-8">Join thousands of business owners who trust BizPilot for their daily operations.</p>
              <Link to="/dashboard">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary hover:bg-gray-100 font-medium px-6 py-3 rounded-md transition shadow-lg"
                  >
                    Get Started for Free
                  </motion.button>
               </Link>
            </motion.div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;