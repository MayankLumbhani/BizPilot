import React from 'react';
import { Plane, Bell, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-bg-light/80 backdrop-blur-md border-b border-gray-200/50 mb-8 transition-all duration-300 shadow-soft">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-green rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <Plane className="w-6 h-6 text-white transform -rotate-45" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">BizPilot</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-text-secondary hover:text-text-primary">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent-red rounded-full ring-2 ring-bg-light"></span>
          </button>
          
          {/* Divider */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* User Profile */}
          <button className="flex items-center gap-3 p-1 pl-2 pr-1 rounded-full hover:bg-white hover:shadow-sm transition-all group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 leading-none group-hover:text-accent-blue transition-colors">John Doe</p>
              <p className="text-xs text-text-secondary font-medium mt-0.5">Owner</p>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
