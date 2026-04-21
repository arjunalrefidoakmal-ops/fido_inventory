'use client';
import { Calendar } from 'lucide-react';
import { useStore } from './store';

const Card = ({ children, className = '', glow = false }: { children: React.ReactNode, className?: string, glow?: boolean }) => (
  <div className={`bg-[#1c2131] rounded-2xl border ${glow ? 'border-indigo-500/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]' : 'border-slate-700/50'} ${className}`}>
    {children}
  </div>
);

export const ReportsView = () => {
  const { stockReports } = useStore();

  const handleExport = () => {
    const headers = ['Date', 'Activity', 'Quantity', 'Purpose', 'Responsible Person'];
    const csvRows = stockReports.map(r => {
      // Escape columns that might have commas just in case
      return `${r.date},${r.activity},"${r.qty}","${r.purpose}","${r.person}"`;
    });

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Stock_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="text-sm text-slate-400 mb-2">
      <span className="cursor-pointer hover:text-slate-200 transition-colors">Reports</span>
      <span className="mx-2">&gt;</span>
      <span className="text-slate-200">Kartu Stok: Keseluruhan</span>
    </div>
    
    <h2 className="text-3xl font-bold mb-6">Stock Reports and History</h2>

    <Card className="overflow-hidden">
      <div className="p-4 border-b border-slate-700/50 flex flex-col sm:flex-row justify-end gap-4 bg-gradient-to-b from-[#212638] to-[#1c2131]">
        <div className="flex items-center bg-[#131620] border border-slate-700/50 rounded-xl px-4 py-2 text-sm text-slate-300">
          <Calendar className="w-4 h-4 mr-2 text-slate-400" />
          Oct 01, 2024 - Oct 31, 2024
        </div>
        <button onClick={handleExport} className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          Export to CSV/Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700/80 text-sm text-slate-200 font-medium bg-[#212638]">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Activity</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Purpose</th>
              <th className="px-6 py-4">Responsible Person</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {stockReports.map((row, i) => (
              <tr key={row.id} className={`border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30 transition-colors ${i % 2 !== 0 ? 'bg-[#151923]' : ''}`}>
                <td className="px-6 py-4 text-slate-300">{row.date}</td>
                <td className="px-6 py-4 text-slate-300">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${row.activity === 'In' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-red-500/10 text-red-400'}`}>
                    {row.activity}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-200 font-medium">{row.qty}</td>
                <td className="px-6 py-4 text-slate-300">{row.purpose}</td>
                <td className="px-6 py-4 text-slate-300">{row.person}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
  )
};
