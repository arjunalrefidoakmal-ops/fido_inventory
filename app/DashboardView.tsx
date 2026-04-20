'use client';
import { Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { useStore } from './store';

const Card = ({ children, className = '', glow = false }: { children: React.ReactNode, className?: string, glow?: boolean }) => (
  <div className={`bg-[#1c2131] rounded-2xl border ${glow ? 'border-indigo-500/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]' : 'border-slate-700/50'} ${className}`}>
    {children}
  </div>
);

export const DashboardView = () => {
  const { inventoryData, inventoryFlow } = useStore();
  const totalItems = inventoryData.length;
  const lowStockItems = inventoryData.filter(i => i.isLow);

  return (
  <div className="space-y-6 animate-in fade-in duration-500">
    <h2 className="text-2xl font-semibold mb-6">Main Dashboard</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card glow className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 font-medium mb-2">Total Unique Items</p>
            <h3 className="text-4xl font-bold mb-2">{totalItems}</h3>
            <p className="text-emerald-400 text-sm">Stock Level: Good</p>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-xl">
            <Package className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
      </Card>
      
      <Card glow className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 font-medium mb-2">Today&apos;s In/Out</p>
            <div className="space-y-1">
              <p className="text-2xl font-bold">In: <span className="text-slate-200">+120</span></p>
              <p className="text-2xl font-bold">Out: <span className="text-slate-200">-85</span></p>
            </div>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-xl">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
      </Card>
      
      <Card glow className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 font-medium mb-2">Low Stock Alerts</p>
            <h3 className="text-4xl font-bold mb-2">{lowStockItems.length} Items</h3>
            <p className="text-slate-400 text-sm">{lowStockItems.map(i => i.name).join(', ') || 'None'}</p>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
        </div>
      </Card>
    </div>

    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Inventory Flow</h3>
          <p className="text-sm text-slate-400">7-Day Trends</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span>Inbound</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <span>Outbound</span>
          </div>
        </div>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={inventoryFlow} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#cbd5e1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#cbd5e1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2D334D" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Area type="monotone" dataKey="outbound" stroke="#cbd5e1" strokeWidth={2} fillOpacity={1} fill="url(#colorOutbound)" />
            <Area type="monotone" dataKey="inbound" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorInbound)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </div>
  )
};
