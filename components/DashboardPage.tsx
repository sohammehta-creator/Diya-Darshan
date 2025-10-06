
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TEMPLES_DATA } from '../constants';

const chartData = [
  { name: 'Mon', crowd: 2200 },
  { name: 'Tue', crowd: 2500 },
  { name: 'Wed', crowd: 1800 },
  { name: 'Thu', crowd: 3200 },
  { name: 'Fri', crowd: 4500 },
  { name: 'Sat', crowd: 6800 },
  { name: 'Sun', crowd: 7200 },
];

const MetricCard: React.FC<{ title: string; value: string; color: string }> = ({ title, value, color }) => (
    <div className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${color}`}>
        <p className="text-sm text-warmGray-500">{title}</p>
        <p className="text-3xl font-bold text-warmGray-900">{value}</p>
    </div>
);

const DashboardPage: React.FC = () => {
    const totalVisitors = TEMPLES_DATA.reduce((sum, t) => sum + (t.waitTime * (Math.random() * 10 + 20)), 0).toFixed(0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold font-serif text-warmGray-900 mb-8">Live Crowd Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard title="Total Live Visitors" value={Number(totalVisitors).toLocaleString()} color="border-amber" />
        <MetricCard title="Average Wait Time" value="65 mins" color="border-orange" />
        <MetricCard title="Total Parking Availability" value="555 slots" color="border-saffron" />
        <MetricCard title="Active Special Events" value="2" color="border-gold" />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold font-serif text-warmGray-800 mb-4">Crowd Trend (Past 7 Days)</h2>
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
            <LineChart
                data={chartData}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#D6D3D1" />
                <XAxis dataKey="name" stroke="#78716C" />
                <YAxis stroke="#78716C" />
                <Tooltip contentStyle={{ backgroundColor: '#FFFBEB', border: '1px solid #FBBF24' }}/>
                <Legend />
                <Line type="monotone" dataKey="crowd" stroke="#F97316" strokeWidth={3} activeDot={{ r: 8 }} dot={{fill: '#F59E0B'}}/>
            </LineChart>
            </ResponsiveContainer>
        </div>
      </div>

       <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold font-serif text-warmGray-800 mb-4">Temple-wise Status</h2>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b-2 border-amber-light">
                        <th className="p-4">Temple</th>
                        <th className="p-4">Crowd Level</th>
                        <th className="p-4">Wait Time (mins)</th>
                        <th className="p-4">Parking Slots</th>
                    </tr>
                </thead>
                <tbody>
                    {TEMPLES_DATA.map(temple => (
                        <tr key={temple.id} className="border-b border-warmGray-100 hover:bg-cream">
                            <td className="p-4 font-bold">{temple.name}</td>
                            <td className="p-4">{temple.crowdLevel}</td>
                            <td className="p-4">{temple.waitTime}</td>
                            <td className="p-4">{temple.parkingSlots}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
