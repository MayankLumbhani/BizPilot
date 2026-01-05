import { CheckCircle, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

export const statsData = [
  {
    title: "Today's Tasks",
    value: "0",
    label: "PENDING",
    subtext: "0 completed today",
    icon: CheckCircle,
    iconColor: "text-gray-400",
  },
  {
    title: "Upcoming Follow-ups",
    value: "3",
    label: "SCHEDULED",
    subtext: "Next: Tomorrow, 10:00 AM",
    icon: Calendar,
    iconColor: "text-accent-blue",
  },
];

export const salesData = {
  sales: { label: "Sales", value: "$24,500", trend: "up", icon: TrendingUp },
  expenses: { label: "Expenses", value: "$12,300", trend: "down", icon: TrendingDown },
  net: "$12,200",
};

export const followUpData = {
  company: "Acme Corporation",
  title: "Contract Review",
  date: "Tomorrow, 10:00 AM",
};

export const briefingData = [
  {
    title: "Small business tax credits expanded for 2025",
    source: "Finance Daily",
    time: "2 hours ago",
  },
  {
    title: "Tech sector sees 5% growth in Q3",
    source: "Market Watch",
    time: "5 hours ago",
  },
];