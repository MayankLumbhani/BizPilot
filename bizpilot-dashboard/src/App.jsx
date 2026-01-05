import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, Cloud, Calendar as CalendarIcon, FileText, ArrowRight, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import Header from './components/Header';
import DashboardCard from './components/DashboardCard';
import StatCard from './components/StatCard';
import { statsData, salesData, followUpData, briefingData } from './data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

function App() {
  var [temp, setTemp] = useState(0);
  var [city, setCity] = useState("Loading...");
  var [feedback1, setFeed1] = useState("Loading...");
  var [feedback2, setFeed2] = useState("Loading...");

  useEffect(()=> {
     fetch(`http://api.weatherapi.com/v1/current.json?key=2182b7f344344969ac151627250912&q=kalol&aqi=ye`)
        .then((resp) => resp.json())
        .then((details) => {
            setCity(details.location.name + ", " + details.location.region);
            setTemp(details.current.temp_c);
            if (details.current.feelslike_c < 18) {
              setFeed1("Cold Weather ❄️");
            } else if (details.current.feelslike_c < 28) {
              setFeed1("Pleasant Weather 😌");
            } else {
              setFeed1("Hot Weather 🔥");
            }

            if (details.current.cloud > 60) {
                setFeed2("Cloudy / Overcast ☁️");
            }
            else {
                setFeed2("Sunny Weather ☀️");
            }

        })
  },[])
  return (
    <div className="min-h-screen bg-bg-light pb-20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Owner Dashboard
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Welcome back, John! Here's your daily overview and performance metrics.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Row 1: Key Stats */}
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} delay={index * 0.1} />
          ))}

          {/* Row 2: Sales vs Expenses (Expanded) */}
          <DashboardCard delay={0.3} className="md:col-span-2 lg:col-span-1 min-h-[300px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-green-50 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-accent-green" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Financial Overview</h3>
              </div>
              <button className="text-sm font-medium text-accent-blue hover:text-blue-700 transition-colors">
                View Report
              </button>
            </div>

            <div className="space-y-6">
              {/* Net Income Display */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                 <div className="text-sm text-text-secondary font-medium mb-1">Net Income</div>
                 <div className="text-3xl font-bold text-gray-900">{salesData.net}</div>
                 <div className="flex items-center gap-1 mt-2 text-sm text-accent-green font-medium">
                   <TrendingUp className="w-4 h-4" />
                   <span>+12.5% from last month</span>
                 </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-default group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-green"></div>
                    <span className="text-text-secondary font-medium">{salesData.sales.label}</span>
                  </div>
                  <span className="text-gray-900 font-bold group-hover:scale-105 transition-transform">
                     {salesData.sales.value}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-default group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-red"></div>
                    <span className="text-text-secondary font-medium">{salesData.expenses.label}</span>
                  </div>
                  <span className="text-gray-900 font-bold group-hover:scale-105 transition-transform">
                     {salesData.expenses.value}
                  </span>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Task List - Centered Empty State */}
          <DashboardCard className="md:col-span-2 lg:col-span-2 min-h-[300px] flex flex-col" delay={0.4}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Tasks & To-Dos</h3>
              </div>
              <div className="flex gap-2">
                 <span className="px-3 py-1 bg-gray-100 text-xs font-bold text-gray-600 rounded-full">All Clear</span>
              </div>
            </div>
            
            <div className="flex-grow flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-accent-green" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">All Caught Up!</h4>
              <p className="text-text-secondary max-w-xs mx-auto">
                You have no pending tasks for today. Enjoy your day or check back later for updates.
              </p>
              <button className="mt-6 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all hover:shadow-lg hover:-translate-y-0.5">
                Create New Task
              </button>
            </div>
          </DashboardCard>

          {/* Follow-ups */}
          <DashboardCard delay={0.5}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 text-lg">Next Follow-up</h3>
              <Clock className="w-5 h-5 text-text-secondary" />
            </div>
            
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white p-5 rounded-2xl border border-blue-100/50 shadow-sm group hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 rounded-full -mr-10 -mt-10 blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-xs font-bold text-accent-blue border border-blue-100">
                    High Priority
                  </div>
                  <span className="text-xs font-semibold text-text-secondary bg-white/50 px-2 py-1 rounded-md">
                     {followUpData.date}
                  </span>
                </div>
                
                <h4 className="font-bold text-xl text-gray-900 mb-1">{followUpData.company}</h4>
                <p className="text-sm text-text-secondary font-medium mb-4">{followUpData.title}</p>
                
                <button className="w-full py-2.5 bg-white border border-gray-200 text-sm font-semibold text-gray-700 rounded-xl hover:bg-gray-50 hover:text-accent-blue hover:border-blue-200 transition-all flex items-center justify-center gap-2 group-hover:shadow-sm">
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard className="bg-gradient-to-br from-sky-500 to-indigo-700 border-none text-white relative overflow-hidden shadow-elevated" delay={0.6}>
            <motion.div className="absolute inset-0 pointer-events-none" aria-hidden>
              <motion.div
                className="absolute top-10 left-[-100px] opacity-20"
                animate={{ x: [0, 260] }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              >
                <Cloud className="w-16 h-16 text-white" />
              </motion.div>
              <motion.div
                className="absolute bottom-8 left-[-80px] opacity-15"
                animate={{ x: [0, 200] }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              >
                <Cloud className="w-12 h-12 text-white" />
              </motion.div>
            </motion.div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-white/15 rounded-xl backdrop-blur-md border border-white/10">
                    <Sun className="w-5 h-5 text-yellow-300" />
                 </div>
                 <h3 className="font-bold text-white text-lg tracking-wide">Weather</h3>
              </div>
              
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <div className="text-6xl font-bold text-white mb-2 tracking-tighter">{temp}°C</div>
                  <div className="text-lg font-medium text-blue-100">{city}</div>
                  <div className="text-sm text-blue-200 font-medium mt-1">{feedback1}</div>
                  <div className="text-sm text-blue-200 font-medium mt-1">{feedback2}</div>
                </div>
                
                <motion.div
                  animate={{ 
                    rotate: 360, 
                    scale: [1, 1.1, 1] 
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="mb-2"
                >
                   <Sun className="w-20 h-20 text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" />
                </motion.div>
              </div>

            </div>
          </DashboardCard>

          {/* Daily Briefing */}
          <DashboardCard delay={0.7} className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gray-100 rounded-xl">
                  <FileText className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">Briefing</h3>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-text-secondary hover:text-gray-900">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              {briefingData.map((news, index) => (
                <div 
                  key={index} 
                  className="group p-3 -mx-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer border border-transparent hover:border-gray-100"
                >
                  <h4 className="font-semibold text-gray-900 mb-1.5 leading-snug group-hover:text-accent-blue transition-colors">
                    {news.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-text-secondary font-medium">
                    <span className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">{news.source}</span>
                    <span>•</span>
                    <span>{news.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
