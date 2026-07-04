import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Activity, Trophy, Code2, RefreshCw } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-surface p-6 rounded-2xl shadow-lg border border-slate-700/50 flex items-center space-x-4 transform transition-all hover:scale-[1.02]">
    <div className={`p-4 rounded-xl ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-text-muted text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-text-main mt-1">{value}</h3>
    </div>
  </div>
);

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Assuming backend runs on 5000 in dev
      const response = await fetch('http://localhost:5000/api/stats/leetcode/testuser');
      const result = await response.json();
      if (result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              AlgoMetrics
            </h1>
            <p className="text-text-muted mt-2">Competitive Programming Analytics Dashboard</p>
          </div>
          <button 
            onClick={fetchStats}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors border border-slate-600"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </header>

        {/* Dashboard Skeleton / Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : data ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                title="Global Rating" 
                value={data.rating} 
                icon={Trophy} 
                color="bg-gradient-to-br from-yellow-400 to-yellow-600" 
              />
              <StatCard 
                title="Problems Solved" 
                value={data.problemsSolved} 
                icon={Code2} 
                color="bg-gradient-to-br from-primary to-blue-700" 
              />
              <StatCard 
                title="Recent Submissions" 
                value={data.recentActivity.reduce((acc, curr) => acc + curr.count, 0)} 
                icon={Activity} 
                color="bg-gradient-to-br from-secondary to-purple-700" 
              />
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Activity Chart */}
              <div className="bg-surface p-6 rounded-2xl border border-slate-700/50 shadow-xl">
                <h3 className="text-xl font-bold mb-6 text-text-main flex items-center">
                  <Activity className="mr-2 text-primary" size={20} />
                  Activity Trend
                </h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.recentActivity}>
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="date" stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                      <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#e2e8f0' }}
                      />
                      <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Mock Secondary Chart */}
              <div className="bg-surface p-6 rounded-2xl border border-slate-700/50 shadow-xl flex items-center justify-center">
                <div className="text-center text-text-muted">
                  <Code2 size={48} className="mx-auto mb-4 opacity-50" />
                  <p>More detailed metrics (e.g., Topic Tags, Rating History) will go here.</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-text-muted mt-12">
            No data available.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
