import React from 'react';
import DashboardCard from './DashboardCard';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatCard = ({ title, value, label, subtext, icon: Icon, iconColor, delay = 0 }) => {
  // Determine trend (mock logic for visual purposes)
  const isPositive = !subtext.includes('decrease') && !subtext.includes('down');
  const isNeutral = subtext.includes('Same');

  return (
    <DashboardCard delay={delay} className="hover:border-blue-200 transition-colors duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${iconColor.replace('text-', 'bg-').replace('500', '50')} ${iconColor.replace('text-', 'bg-').replace('600', '50')}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        
        {/* Trend Indicator */}
        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-bold ${
          isNeutral ? 'bg-gray-100 text-gray-600' :
          isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {isNeutral ? <Minus className="w-3 h-3 mr-1" /> : 
           isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : 
           <TrendingDown className="w-3 h-3 mr-1" />}
          {isNeutral ? '0%' : '2.5%'}
        </div>
      </div>
      
      <div>
        <h3 className="text-text-secondary font-medium text-sm mb-1">{title}</h3>
        <div className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">{value}</div>
        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">{label}</span>
           <span className="text-xs text-text-secondary truncate max-w-[120px]" title={subtext}>{subtext}</span>
        </div>
      </div>
    </DashboardCard>
  );
};

export default StatCard;
