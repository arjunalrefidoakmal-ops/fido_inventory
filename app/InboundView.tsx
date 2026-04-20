'use client';
import React, { useState } from 'react';
import { Calendar, ChevronDown, Search } from 'lucide-react';
import { useStore } from './store';

const Card = ({ children, className = '', glow = false }: { children: React.ReactNode, className?: string, glow?: boolean }) => (
  <div className={`bg-[#1c2131] rounded-2xl border ${glow ? 'border-indigo-500/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]' : 'border-slate-700/50'} ${className}`}>
    {children}
  </div>
);

export const InboundView = () => {
  const ObjectDate = new Date();
  const defaultDate = ObjectDate.toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    date: defaultDate,
    supplier: 'Supplier Name',
    item: '',
    qty: '',
    unit: 'kg',
    price: '',
    notes: ''
  });

  const { inboundData, inventoryData, addInbound } = useStore();
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = () => {
    if(!formData.item || !formData.qty) return alert('Mohon lengkapi data item dan quantity');
    
    addInbound({
      date: formData.date,
      item: formData.item,
      supplier: formData.supplier === 'Supplier Name' ? 'Unspecified' : formData.supplier,
      qty: `${formData.qty} ${formData.unit}`,
      price: formData.price ? `Rp ${formData.price}` : '-',
      status: 'Received'
    });

    setFormData({
      date: defaultDate,
      supplier: 'Supplier Name',
      item: '',
      qty: '',
      unit: 'kg',
      price: '',
      notes: ''
    });
  };

  return (
  <div className="space-y-8 animate-in fade-in duration-500">
    <h2 className="text-2xl font-semibold mb-6">Record Inbound Inventory</h2>
    
    <Card glow className="p-6 relative overflow-visible">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Date</label>
            <div className="relative">
              <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-indigo-500 [&::-webkit-calendar-picker-indicator]:invert-[0.8]" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Supplier Name</label>
            <div className="relative">
              <select value={formData.supplier} onChange={e => setFormData({...formData, supplier: e.target.value})} className="w-full bg-[#131620] border border-indigo-500/30 rounded-xl py-2.5 px-4 appearance-none text-slate-200 focus:outline-none focus:border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                <option>Supplier Name</option>
                <option>Mitra Pangan</option>
                <option>Sumber Rezeki</option>
                <option>FreshGrocer</option>
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
                placeholder="Search..." 
                value={formData.item}
                onChange={e => setFormData({...formData, item: e.target.value})}
                onFocus={() => setIsSearching(true)}
                onBlur={() => setTimeout(() => setIsSearching(false), 200)}
                className="w-full bg-[#131620] border border-indigo-500/30 rounded-xl py-2.5 px-10 text-slate-200 focus:outline-none focus:border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.1)] mb-1" 
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
                     className="px-4 py-3 hover:bg-indigo-500/20 cursor-pointer border-b border-slate-700/50 text-sm"
                   >
                     {invItem.name} <span className="text-slate-500 text-xs ml-2">({invItem.category})</span>
                   </div>
                 ))}
                 {inventoryData.filter(i => i.name.toLowerCase().includes(formData.item.toLowerCase())).length === 0 && (
                   <div className="px-4 py-3 text-slate-500 text-sm">No items found</div>
                 )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-slate-400 mb-2">Quantity</label>
              <input type="number" value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="w-24">
              <label className="block text-sm text-slate-400 mb-2">&nbsp;</label>
               <div className="relative">
                <select value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-3 appearance-none text-slate-200 focus:outline-none focus:border-indigo-500">
                  <option value="kg">kg</option>
                  <option value="pcs">pcs</option>
                  <option value="Liters">Liters</option>
                  <option value="Trays">Trays</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-3.5 pointer-events-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Unit Price (Total)</label>
            <input type="text" placeholder="e.g. 500000" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-indigo-500" />
          </div>
        </div>
      </div>
      
      <div className="mt-6 relative z-10 w-full md:w-2/3">
         <label className="block text-sm text-slate-400 mb-2">Condition/Notes</label>
         <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} rows={3} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-3 px-4 text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"></textarea>
      </div>

      <div className="mt-6 flex justify-end gap-3 relative z-10">
        <button onClick={() => setFormData({date: defaultDate, supplier: 'Supplier Name', item: '', qty: '', unit: 'kg', price: '', notes: ''})} className="px-6 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-800 transition-colors border border-slate-700/50 hover:border-slate-500/50">
          Clear
        </button>
        <button onClick={handleSubmit} className="px-6 py-2.5 rounded-xl font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.4)]">
          Submit Inbound
        </button>
      </div>
    </Card>

    <div>
      <h3 className="text-xl font-semibold mb-4">Recent Inbound Transactions</h3>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
             <thead>
               <tr className="border-b border-slate-700/50 text-sm text-slate-400">
                 <th className="px-6 py-4 font-medium">Date</th>
                 <th className="px-6 py-4 font-medium">Item</th>
                 <th className="px-6 py-4 font-medium">Supplier</th>
                 <th className="px-6 py-4 font-medium">Qty</th>
                 <th className="px-6 py-4 font-medium">Total Price</th>
                 <th className="px-6 py-4 font-medium">Status</th>
               </tr>
             </thead>
             <tbody className="text-sm">
               {inboundData.map((row) => (
                 <tr key={row.id} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                   <td className="px-6 py-4 text-slate-300">{row.date}</td>
                   <td className="px-6 py-4 text-slate-200 font-medium">{row.item}</td>
                   <td className="px-6 py-4 text-slate-300">{row.supplier}</td>
                   <td className="px-6 py-4 text-slate-200">{row.qty}</td>
                   <td className="px-6 py-4 text-slate-300">{row.price}</td>
                   <td className="px-6 py-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                       row.status === 'Received' 
                         ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                         : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                     }`}>
                       {row.status}
                     </span>
                   </td>
                 </tr>
               ))}
               {inboundData.length === 0 && (
                 <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No active inbound records. Add one above.</td>
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
