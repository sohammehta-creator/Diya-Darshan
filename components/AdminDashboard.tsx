
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const MetricCard: React.FC<{ title: string; value: string; color: string }> = ({ title, value, color }) => (
    <div className={`bg-white dark:bg-warmGray-800 p-6 rounded-xl shadow-md border-l-4 ${color}`}>
        <p className="text-sm text-warmGray-500 dark:text-warmGray-400">{title}</p>
        <p className="text-3xl font-bold text-warmGray-900 dark:text-white">{value}</p>
    </div>
);

const AdminDashboard: React.FC = () => {
    const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold font-serif text-warmGray-900 dark:text-white mb-8">Admin Command Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard title="System Status" value="Operational" color="border-green-500" />
        <MetricCard title="Active Admins" value="3" color="border-blue-500" />
        <MetricCard title="Pending Alerts" value="0" color="border-yellow-500" />
        <MetricCard title="Total Users" value="12,458" color="border-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-warmGray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold font-serif text-warmGray-800 dark:text-white mb-4">Resource Management</h2>
            <p className="text-warmGray-500 dark:text-warmGray-400">
                This section will contain tools for managing security staff, medical teams, and volunteers. 
                Features will include heatmaps for optimal deployment and communication panels.
            </p>
        </div>
        <div className="bg-white dark:bg-warmGray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold font-serif text-warmGray-800 dark:text-white mb-4">Alert Configuration</h2>
            <p className="text-warmGray-500 dark:text-warmGray-400">
                Administrators can configure geo-fencing thresholds, create custom alert rules, and manage the emergency broadcast system from this panel.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;