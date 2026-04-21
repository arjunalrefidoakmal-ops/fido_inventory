'use client';
import React, { useState } from 'react';
import { Calendar, ChevronDown, Search } from 'lucide-react';
import { useStore } from './store';

const Card = ({ children, className = '', glow = false }: { children: React.ReactNode, className?: string, glow?: boolean }) => (
  <div className={`bg-[#1c2131] rounded-2xl border ${glow ? 'border-indigo-500/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]' : 'border-slate-700/50'} ${className}`}>
    {children}
  </div>
);

export const OutboundView = () => {
  const ObjectDate = new Date();
  const defaultDate = ObjectDate.toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    date: defaultDate,
    person: 'Rudi Hartono (Chef)',
    item: '',
    qty: '',
    unit: 'kg',
    purpose: '',
  });

  const { outboundData, inventoryData, addOutbound } = useStore();
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = () => {
    if(!formData.item || !formData.qty) return alert('Mohon lengkapi data item dan quantity');

    const itemInStock = inventoryData.find(i => i.name === formData.item);
    if (itemInStock && parseFloat(formData.qty) > itemInStock.stock) {
      if(!window.confirm(`Warning: Quantity diminta (${formData.qty}) melebihi stok yang ada (${itemInStock.stock}). Lanjutkan?`)) {
        return;
      }
    }
    
    addOutbound({
      date: formData.date,
      item: formData.item,
      person: formData.person,
      qty: `${formData.qty} ${formData.unit}`,
      purpose: formData.purpose,
      status: 'Dispatched'
    });

    setFormData({
      date: defaultDate,
      person: 'Rudi Hartono (Chef)',
      item: '',
      qty: '',
      unit: 'kg',
      purpose: '',
    });
  };

  return (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div>
        <h2 className="text-2xl font-semibold mb-2">Record Outbound Inventory</h2>
        <p className="text-slate-400 text-sm">Gunakan form ini untuk mencatat pengeluaran barang dari gudang (contoh: untuk dimasak).</p>
    </div>
    
    <Card glow className="p-6 relative overflow-visible">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Date</label>
            <div className="relative">
              <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-amber-500 [&::-webkit-calendar-picker-indicator]:invert-[0.8]" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Requested By</label>
            <div className="relative">
              <select value={formData.person} onChange={e => setFormData({...formData, person: e.target.value})} className="w-full bg-[#131620] border border-amber-500/30 rounded-xl py-2.5 px-4 appearance-none text-slate-200 focus:outline-none focus:border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                <option>Rudi Hartono (Chef)</option>
                <option>Siti Aminah (Asst. Chef)</option>
                <option>Budi Santoso (Logistik)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm text-slate-400 mb-2">Item Name</label>
             <div className="relative">
              <input 
                type="text" 
                placeholder="Search inventory..." 
                value={formData.item}
                onChange={e => setFormData({...formData, item: e.target.value})}
                onFocus={() => setIsSearching(true)}
                onBlur={() => setTimeout(() => setIsSearching(false), 200)}
                className="w-full bg-[#131620] border border-amber-500/30 rounded-xl py-2.5 px-10 text-slate-200 focus:outline-none focus:border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.1)] mb-1" 
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3" />
            </div>
            
            {isSearching && (
              <div className="absolute top-[72px] left-0 right-0 bg-[#1e2332] border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl z-50">
                 {inventoryData.filter(i => i.name.toLowerCase().includes(formData.item.toLowerCase())).map(invItem => (
                   <div 
                     key={invItem.sku} 
                     onClick={() => {
                        setFormData({...formData, item: invItem.name, unit: invItem.unit});
                        setIsSearching(false);
                     }}
                     className="px-4 py-3 hover:bg-amber-500/20 cursor-pointer border-b border-slate-700/50 text-sm flex justify-between"
                   >
                     <span>{invItem.name}</span>
                     <span className={`text-xs ${invItem.stock === 0 ? 'text-red-400' : 'text-emerald-400'}`}>Stock: {invItem.stock} {invItem.unit}</span>
                   </div>
                 ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-slate-400 mb-2">Quantity</label>
              <input type="number" value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-amber-500" />
            </div>
            <div className="w-24">
              <label className="block text-sm text-slate-400 mb-2">&nbsp;</label>
               <div className="relative">
                <input type="text" readOnly value={formData.unit} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-3 text-slate-400 cursor-not-allowed" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Purpose / Menu</label>
            <input type="text" placeholder="e.g. Makan Siang (Ayam Bakar)" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-amber-500" />
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end gap-3 relative z-10">
        <button onClick={() => setFormData({date: defaultDate, person: 'Rudi Hartono (Chef)', item: '', qty: '', unit: 'kg', purpose: ''})} className="px-6 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-800 transition-colors border border-slate-700/50 hover:border-slate-500/50">
          Clear
        </button>
        <button onClick={handleSubmit} className="px-6 py-2.5 rounded-xl font-medium text-white bg-amber-500 hover:bg-amber-600 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.4)]">
          Submit Outbound
        </button>
      </div>
    </Card>

    <div>
      <h3 className="text-xl font-semibold mb-4">Recent Outbound Transactions</h3>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
             <thead>
               <tr className="border-b border-slate-700/50 text-sm text-slate-400">
                 <th className="px-6 py-4 font-medium">Date</th>
                 <th className="px-6 py-4 font-medium">Item</th>
                 <th className="px-6 py-4 font-medium">Requested By</th>
                 <th className="px-6 py-4 font-medium">Qty</th>
                 <th className="px-6 py-4 font-medium">Purpose</th>
                 <th className="px-6 py-4 font-medium">Status</th>
               </tr>
             </thead>
             <tbody className="text-sm">
               {outboundData.map((row: any) => (
                 <tr key={row.id} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                   <td className="px-6 py-4 text-slate-300">{row.date}</td>
                   <td className="px-6 py-4 text-slate-200 font-medium">{row.item}</td>
                   <td className="px-6 py-4 text-slate-300">{row.person}</td>
                   <td className="px-6 py-4 text-amber-400 font-medium">-{row.qty}</td>
                   <td className="px-6 py-4 text-slate-300">{row.purpose}</td>
                   <td className="px-6 py-4">
                     <span className="px-3 py-1 rounded-full text-xs font-medium border bg-amber-500/10 text-amber-400 border-amber-500/20">
                       {row.status}
                     </span>
                   </td>
                 </tr>
               ))}
               {outboundData.length === 0 && (
                 <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No active outbound records yet. Add one above.</td>
                 </tr>
               )}
             </tbody>
          </table>
        </div>
      </Card>
    </div>
  </div>
  )
};
