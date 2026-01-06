import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { FiPlus, FiExternalLink, FiDownload, FiSave } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Helper components for dashboard elements
const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold text-dark">{title}</h2>
    {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
  </div>
);

const StatCard = ({ title, value, subtext }) => (
  <motion.div 
    variants={fadeInUp} 
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
  >
    <h3 className="text-sm text-muted mb-2">{title}</h3>
    <p className="text-3xl font-bold text-dark mb-1">{value}</p>
    <p className="text-xs text-muted">{subtext}</p>
  </motion.div>
);

const Badge = ({ type, children }) => {
    const colors = {
        high: 'bg-red-100 text-red-700',
        medium: 'bg-yellow-100 text-yellow-700',
        low: 'bg-blue-100 text-blue-700',
        inprogress: 'bg-blue-50 text-blue-600',
        scheduled: 'bg-orange-50 text-orange-600',
        waiting: 'bg-gray-100 text-gray-600',
        income: 'bg-green-100 text-green-700',
        expense: 'bg-red-50 text-red-600'
    }
    return <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors[type.toLowerCase().replace(' ', '')] || colors.waiting}`}>{children}</span>
}


const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', priority: 'normal' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      if (res.ok) {
        setNewTask({ title: '', dueDate: '', priority: 'normal' });
        fetchTasks(); // refresh
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Welcome Section */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-end bg-white p-8 rounded-2xl border border-gray-100"
        >
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to BizPilot</h1>
            <p className="text-muted">A simple hub to manage your tasks, clients, finances, and reports in one place.</p>
          </div>
          <div className="flex gap-3">
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="flex items-center gap-2 bg-teal-50 text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-100 transition shadow-sm"
             >
               <FiExternalLink/> Quick Tour
             </motion.button>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition shadow-md hover:shadow-lg"
             >
               <FiPlus/> New Task
             </motion.button>
          </div>
        </motion.section>

        {/* Stats Banner */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
            <StatCard title="Pending Tasks" value="12" subtext="Keep an eye on your deadlines." />
            <StatCard title="Active Clients" value="48" subtext="Relationships that drive revenue." />
            <StatCard title="Monthly Revenue" value="$14,250" subtext="Updated from recent transactions." />
            <StatCard title="Net Profit Margin" value="24%" subtext="After expenses and taxes." />
        </motion.section>

        {/* ---- TASKS SECTION ---- */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          id="dash-tasks" 
          className="scroll-mt-24"
        >
             <SectionTitle title="Tasks" subtitle="Add new tasks and review active items to be done." />
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add New Task Form */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="font-semibold mb-4">Add New Task</h3>
                    <form className="space-y-4" onSubmit={handleAddTask}>
                        <div>
                            <label className="block text-xs font-medium text-muted mb-1">Task Title</label>
                            <input type="text" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary" placeholder="e.g., Prepare monthly report" required />
                        </div>
                         <div>
                            <label className="block text-xs font-medium text-muted mb-1">Description</label>
                            <textarea value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary h-24 resize-none" placeholder="Add details..."></textarea>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-muted mb-1">Due Date</label>
                                <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary" />
                            </div>
                             <div>
                                <label className="block text-xs font-medium text-muted mb-1">Priority</label>
                                <select value={newTask.priority} onChange={(e) => setNewTask({...newTask, priority: e.target.value})} className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary bg-white">
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                         </div>
                         <div className="flex justify-end gap-3 pt-2">
                             <button type="button" onClick={() => setNewTask({ title: '', description: '', dueDate: '', priority: 'normal' })} className="text-muted text-sm hover:text-dark transition">Clear</button>
                             <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition flex items-center gap-2"><FiSave size={14}/> Save Task</button>
                         </div>
                    </form>
                </div>

                 {/* View Tasks Table */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100">
                     <h3 className="font-semibold mb-4">View Tasks</h3>
                     <div className="overflow-x-auto">
                         <table className="w-full text-sm text-left text-muted">
                             <thead className="text-xs uppercase bg-gray-50 border-b border-gray-100">
                                 <tr>
                                     <th className="px-4 py-3 font-medium">Task Title</th>
                                     <th className="px-4 py-3 font-medium">Due Date</th>
                                     <th className="px-4 py-3 font-medium">Priority</th>
                                     <th className="px-4 py-3 font-medium text-right">Status</th>
                                 </tr>
                             </thead>
                             <tbody>
                                {tasks.map(task => (
                                  <motion.tr key={task.id} whileHover={{ backgroundColor: "#f9fafb", x: 4 }} className="bg-white border-b border-gray-50 transition cursor-default">
                                    <td className="px-4 py-4 font-medium text-dark">{task.title}</td>
                                    <td className="px-4 py-4">{task.dueDate ? new Date(task.dueDate.seconds * 1000).toLocaleDateString() : 'No date'}</td>
                                    <td className="px-4 py-4"><Badge type={task.priority}>{task.priority}</Badge></td>
                                    <td className="px-4 py-4 text-right"><Badge type={task.status}>{task.status}</Badge></td>
                                  </motion.tr>
                                ))}
                            </tbody>
                         </table>
                     </div>
                </div>
             </div>
        </motion.section>

        {/* ---- CLIENTS SECTION ---- */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          id="dash-clients" 
          className="scroll-mt-24"
        >
             <SectionTitle title="Clients" subtitle="Add new clients and manage key relationships." />
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add New Client Form */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="font-semibold mb-4">Add New Client</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-muted mb-1">Client Name</label>
                            <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary" placeholder="Jane Smith" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-xs font-medium text-muted mb-1">Company</label>
                                <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary" />
                            </div>
                             <div>
                                <label className="block text-xs font-medium text-muted mb-1">Email</label>
                                <input type="email" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-xs font-medium text-muted mb-1">Phone</label>
                                <input type="tel" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary" />
                            </div>
                             <div>
                                <label className="block text-xs font-medium text-muted mb-1">Address</label>
                                <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary" />
                            </div>
                        </div>
                        
                         <div className="flex justify-end gap-3 pt-2">
                             <button type="button" className="text-muted text-sm hover:text-dark transition">Cancel</button>
                             <button type="button" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition">Save Client</button>
                         </div>
                    </form>
                </div>

                 {/* Client Directory Table */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100">
                     <h3 className="font-semibold mb-4">Client Directory</h3>
                     <div className="overflow-x-auto">
                         <table className="w-full text-sm text-left text-muted">
                             <thead className="text-xs uppercase bg-gray-50 border-b border-gray-100">
                                 <tr>
                                     <th className="px-4 py-3 font-medium">Client Name</th>
                                     <th className="px-4 py-3 font-medium">Company</th>
                                     <th className="px-4 py-3 font-medium">Email</th>
                                     <th className="px-4 py-3 font-medium text-right">Phone</th>
                                 </tr>
                             </thead>
                             <tbody>
                                <motion.tr whileHover={{ backgroundColor: "#f9fafb", x: 4 }} className="bg-white border-b border-gray-50 transition cursor-default">
                                    <td className="px-4 py-4 font-medium text-dark">Tech Solutions Inc</td>
                                    <td className="px-4 py-4">Tech Solutions Inc</td>
                                    <td className="px-4 py-4">contact@techsolutions.com</td>
                                    <td className="px-4 py-4 text-right">+1 (555) 101-2020</td>
                                </motion.tr>
                                <motion.tr whileHover={{ backgroundColor: "#f9fafb", x: 4 }} className="bg-white border-b border-gray-50 transition cursor-default">
                                    <td className="px-4 py-4 font-medium text-dark">Global Ventures</td>
                                    <td className="px-4 py-4">Global Ventures</td>
                                    <td className="px-4 py-4">info@globalventures.io</td>
                                    <td className="px-4 py-4 text-right">+1 (555) 330-4040</td>
                                </motion.tr>
                                <motion.tr whileHover={{ backgroundColor: "#f9fafb", x: 4 }} className="bg-white transition cursor-default">
                                    <td className="px-4 py-4 font-medium text-dark">Acme Corporation</td>
                                    <td className="px-4 py-4">Acme Corporation</td>
                                    <td className="px-4 py-4">support@acme.com</td>
                                    <td className="px-4 py-4 text-right">+1 (555) 599-6060</td>
                                </motion.tr>
                            </tbody>
                         </table>
                     </div>
                </div>
             </div>
        </motion.section>

         {/* ---- TRANSACTIONS SECTION ---- */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          id="dash-transactions" 
          className="scroll-mt-24"
        >
             <SectionTitle title="Transactions" subtitle="Add new transactions and review recent activity." />
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Transaction Form */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="font-semibold mb-4">Add Transaction</h3>
                    <form className="space-y-4">
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-muted mb-1">Type</label>
                                <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary bg-white">
                                    <option>Income</option>
                                    <option>Expense</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-xs font-medium text-muted mb-1">Amount</label>
                                <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary" placeholder="$0.00" />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-xs font-medium text-muted mb-1">Date</label>
                                <input type="date" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary" />
                            </div>
                             <div>
                                <label className="block text-xs font-medium text-muted mb-1">Description</label>
                                <input type="text" className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary" placeholder="e.g., Client Payment" />
                            </div>
                        </div>
                        
                         <div className="flex justify-end gap-3 pt-2">
                             <button type="button" className="text-muted text-sm hover:text-dark transition">Reset</button>
                             <button type="button" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition">Save Transaction</button>
                         </div>
                    </form>
                </div>

                 {/* Recent Transactions Table */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100">
                     <h3 className="font-semibold mb-4">Recent Transactions</h3>
                     <div className="overflow-x-auto">
                         <table className="w-full text-sm text-left text-muted">
                             <thead className="text-xs uppercase bg-gray-50 border-b border-gray-100">
                                 <tr>
                                     <th className="px-4 py-3 font-medium">Type</th>
                                     <th className="px-4 py-3 font-medium">Description</th>
                                     <th className="px-4 py-3 font-medium">Amount</th>
                                     <th className="px-4 py-3 font-medium text-right">Date</th>
                                 </tr>
                             </thead>
                             <tbody>
                                <motion.tr whileHover={{ backgroundColor: "#f9fafb", x: 4 }} className="bg-white border-b border-gray-50 transition cursor-default">
                                    <td className="px-4 py-4"><Badge type="income">Income</Badge></td>
                                    <td className="px-4 py-4 font-medium text-dark">Payment from Tech Solutions Inc</td>
                                    <td className="px-4 py-4 text-green-600 font-medium">+$4,500.00</td>
                                    <td className="px-4 py-4 text-right">Oct 20, 2025</td>
                                </motion.tr>
                                <motion.tr whileHover={{ backgroundColor: "#f9fafb", x: 4 }} className="bg-white border-b border-gray-50 transition cursor-default">
                                    <td className="px-4 py-4"><Badge type="expense">Expense</Badge></td>
                                    <td className="px-4 py-4 font-medium text-dark">Software License Renewal</td>
                                    <td className="px-4 py-4 text-red-600 font-medium">-$120.00</td>
                                    <td className="px-4 py-4 text-right">Oct 18, 2025</td>
                                </motion.tr>
                                 <motion.tr whileHover={{ backgroundColor: "#f9fafb", x: 4 }} className="bg-white transition cursor-default">
                                    <td className="px-4 py-4"><Badge type="income">Income</Badge></td>
                                    <td className="px-4 py-4 font-medium text-dark">Payment from Global Ventures</td>
                                    <td className="px-4 py-4 text-green-600 font-medium">+$2,850.00</td>
                                    <td className="px-4 py-4 text-right">Oct 15, 2025</td>
                                </motion.tr>
                            </tbody>
                         </table>
                     </div>
                </div>
             </div>
        </motion.section>

        {/* ---- REPORTS SECTION ---- */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          id="dash-reports" 
          className="scroll-mt-24"
        >
             <div className="flex justify-between items-start mb-6">
                <SectionTitle title="Reports" subtitle="High-level overview and detailed financial breakdown." />
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-muted px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50 transition"><FiDownload size={14}/> Export PDF</button>
            </div>
            
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="text-sm text-muted mb-2">Monthly Revenue</h3>
                    <p className="text-3xl font-bold text-dark mb-1">$14,250</p>
                    <p className="text-xs text-muted">Includes all income transactions this month.</p>
                    {/* Placeholder for mini chart */}
                    <div className="h-12 bg-teal-50 mt-4 rounded-md overflow-hidden relative">
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary/20 to-transparent"></div>
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                             <path d="M0,50 L10,40 L30,45 L50,30 L70,35 L100,10 L100,50 Z" fill="currentColor" className="text-primary/30"></path>
                        </svg>
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="text-sm text-muted mb-2">Monthly Expenses</h3>
                    <p className="text-3xl font-bold text-dark mb-1">$7,800</p>
                    <p className="text-xs text-muted">Operational and recurring costs.</p>
                     {/* Placeholder for mini chart */}
                    <div className="h-12 bg-red-50 mt-4 rounded-md overflow-hidden relative">
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-red-500/20 to-transparent"></div>
                         <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                             <path d="M0,50 L20,45 L40,30 L60,40 L80,20 L100,35 L100,50 Z" fill="currentColor" className="text-red-500/30"></path>
                        </svg>
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="text-sm text-muted mb-2">Net Profit</h3>
                    <p className="text-3xl font-bold text-dark mb-1">$6,450</p>
                    <p className="text-xs text-muted">After deducting expenses.</p>
                     {/* Placeholder for mini chart */}
                    <div className="h-12 bg-teal-50 mt-4 rounded-md overflow-hidden relative">
                         <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-primary/20 to-transparent"></div>
                         <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                             <path d="M0,50 L15,45 L35,35 L55,40 L75,25 L100,15 L100,50 Z" fill="currentColor" className="text-primary/30"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Summary Table */}
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="font-semibold mb-4">Summary</h3>
                     <table className="w-full text-sm text-left text-muted">
                         <tbody>
                             <tr className="border-b border-gray-50"><td className="py-3">Total Revenue</td><td className="py-3 text-right font-medium text-dark">$14,250</td></tr>
                             <tr className="border-b border-gray-50"><td className="py-3">Total Expenses</td><td className="py-3 text-right font-medium text-dark">$7,800</td></tr>
                             <tr className="border-b border-gray-50"><td className="py-3">Net Profit</td><td className="py-3 text-right font-bold text-primary">$6,450</td></tr>
                             <tr><td className="py-3">Profit Margin</td><td className="py-3 text-right font-medium text-dark">45.3%</td></tr>
                         </tbody>
                     </table>
                </div>
                 {/* Top Clients Table */}
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <h3 className="font-semibold mb-4">Top Clients</h3>
                     <table className="w-full text-sm text-left text-muted">
                         <thead className="text-xs uppercase bg-gray-50 border-b border-gray-100">
                             <tr><th className="px-4 py-2 font-medium">Client</th><th className="px-4 py-2 font-medium text-right">Revenue</th><th className="px-4 py-2 font-medium text-right">Share</th></tr>
                         </thead>
                         <tbody>
                             <tr className="border-b border-gray-50"><td className="px-4 py-3 font-medium text-dark">Tech Solutions Inc</td><td className="px-4 py-3 text-right">$12,500</td><td className="px-4 py-3 text-right">42%</td></tr>
                             <tr className="border-b border-gray-50"><td className="px-4 py-3 font-medium text-dark">Global Ventures</td><td className="px-4 py-3 text-right">$8,200</td><td className="px-4 py-3 text-right">28%</td></tr>
                             <tr><td className="px-4 py-3 font-medium text-dark">Acme Corporation</td><td className="px-4 py-3 text-right">$5,400</td><td className="px-4 py-3 text-right">17%</td></tr>
                         </tbody>
                     </table>
                </div>
            </div>
       </motion.section>

        {/* ---- SETTINGS SECTION ---- */}
       <motion.section 
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, margin: "-100px" }}
         variants={fadeInUp}
         id="dash-settings" 
         className="scroll-mt-24"
       >
             <SectionTitle title="Settings" subtitle="Configure how BizPilot works for your business." />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Workspace Preferences */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold mb-6">Workspace Preferences</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-muted mb-1">Default Currency</label>
                                <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary bg-white">
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-muted mb-1">Fiscal Year Start</label>
                                <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary bg-white">
                                    <option>January</option>
                                    <option>April</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-xs font-medium text-muted mb-1">Time Zone</label>
                                <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-primary bg-white">
                                    <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-6">
                         <button type="button" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition">Save Settings</button>
                    </div>
                </div>

                 {/* Notifications */}
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                     <h3 className="font-semibold mb-6">Notifications</h3>
                     <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-dark">Task Reminders</h4>
                                <p className="text-xs text-muted">Email notification for upcoming due dates.</p>
                            </div>
                             {/* Simple Toggle Switch Placeholder */}
                            <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-dark">Weekly Summary</h4>
                                <p className="text-xs text-muted">Overview of tasks and finances.</p>
                            </div>
                             <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div></div>
                        </div>
                         <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-dark">New Client Alerts</h4>
                                <p className="text-xs text-muted">Notify when a new client is added.</p>
                            </div>
                             <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div></div>
                        </div>
                     </div>
                </div>
            </div>
       </motion.section>

        {/* ---- ABOUT SECTION ---- */}
        {/* <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          id="dash-about" 
          className="scroll-mt-24 bg-white p-8 rounded-2xl border border-gray-100"
        >
             <SectionTitle title="About BizPilot" subtitle="The cockpit for your small business finances and operations." />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-sm text-muted leading-relaxed">
                 <div>
                     <h3 className="font-semibold text-dark mb-3">Our Mission</h3>
                     <p className="mb-4">BizPilot is designed for founders, freelancers, and finance teams who want clarity without complexity. Instead of jumping between spreadsheets, invoices, and banking portals, BizPilot brings your tasks, clients, and transactions together in a single, focused workspace.</p>
                     <p>We focus on the essentials: staying on top of what needs to be done, who you work with, and how money moves through your business. Clean visuals and simple workflows help you make decisions quickly and confidently.</p>
                 </div>
                 <div>
                     <h3 className="font-semibold text-dark mb-3">Why teams use BizPilot</h3>
                     <ul className="space-y-3">
                         <li className="flex items-start gap-2"><div className="mt-1 min-w-[8px] h-2 bg-primary rounded-full"></div> Unified view of work and money.</li>
                         <li className="flex items-start gap-2"><div className="mt-1 min-w-[8px] h-2 bg-primary rounded-full"></div> Simple reporting.</li>
                         <li className="flex items-start gap-2"><div className="mt-1 min-w-[8px] h-2 bg-primary rounded-full"></div> Built for small teams.</li>
                     </ul>
                      <div className="flex gap-4 mt-8">
                         <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition">Get Started</button>
                         <button className="bg-white border border-gray-300 text-dark px-4 py-2 rounded-md text-sm font-medium hover:border-primary transition">Contact Support</button>
                      </div>
                 </div>
             </div>
        </motion.section> */}

     </main>
       <div className="bg-white border-t border-gray-200 py-6 text-center text-xs text-muted">
        © 2025 BizPilot Inc. All rights reserved.
      </div>
    </div>
  );
};

export default DashboardPage;
