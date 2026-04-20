'use client';
import React, { useState } from 'react';
import { Search, ChevronDown, Edit, Trash2, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useStore } from './store';

const Card = ({ children, className = '', glow = false }: { children: React.ReactNode, className?: string, glow?: boolean }) => (
  <div className={`bg-[#1c2131] rounded-2xl border ${glow ? 'border-indigo-500/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]' : 'border-slate-700/50'} ${className}`}>
    {children}
  </div>
);

export const MasterDataView = () => {
  const { inventoryData, addInventoryItem } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemParams, setNewItemParams] = useState({ name: '', category: 'Grains', stock: 0, unit: 'Kg', reorder: 0});

  const categories = ['Grains', 'Proteins', 'Vegetables', 'Dairy', 'Pantry'];

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? item.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleAddNew = () => {
    if(!newItemParams.name) return;
    addInventoryItem({
      name: newItemParams.name,
      category: newItemParams.category,
      stock: parseFloat(newItemParams.stock.toString()),
      unit: newItemParams.unit,
      reorder: parseFloat(newItemParams.reorder.toString()),
      isLow: parseFloat(newItemParams.stock.toString()) <= parseFloat(newItemParams.reorder.toString())
    });
    setShowAddModal(false);
    setNewItemParams({ name: '', category: 'Grains', stock: 0, unit: 'Kg', reorder: 0});
  };

  return (
  <div className="space-y-6 animate-in fade-in duration-500 relative">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h2 className="text-2xl font-semibold">Master Data Product Catalog</h2>
      <button onClick={() => setShowAddModal(true)} className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(99,102,241,0.4)] flex items-center gap-2">
        <Plus className="w-4 h-4"/> Add New Item
      </button>
    </div>

    <Card glow className="p-4 flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-1 w-full">
        <Search className="w-5 h-5 text-indigo-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Search Items or SKU..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#131620] border border-indigo-500/30 rounded-xl py-3 pl-12 pr-4 text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar items-center">
        <div className="bg-[#131620] border border-slate-700/50 rounded-xl py-3 px-4 text-sm text-slate-300 whitespace-nowrap hidden sm:block">
          Filter by Category
        </div>
        <div className="bg-[#131620] border border-slate-700/50 rounded-xl flex items-center overflow-hidden">
          {categories.map((cat) => (
             <button 
               key={cat} 
               onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
               className={`py-3 px-4 text-sm whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
             >
               {cat}
             </button>
          ))}
        </div>
        {(activeCategory || searchTerm) && (
          <button onClick={() => { setActiveCategory(null); setSearchTerm(''); }} className="bg-[#1c2131] border border-slate-700 rounded-xl px-6 py-3 font-medium text-slate-200 hover:bg-slate-700 transition-colors whitespace-nowrap">
            Clear
          </button>
        )}
      </div>
    </Card>

    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-indigo-500/20 text-sm text-slate-200 font-medium">
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Current Stock</th>
              <th className="px-6 py-4">Reorder Point</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredData.map((item, i) => (
               <tr key={item.sku} className={`border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30 transition-colors ${i % 2 !== 0 ? 'bg-[#151923]' : ''}`}>
                <td className="px-6 py-4 text-slate-400 font-mono">{item.sku}</td>
                <td className="px-6 py-4 text-slate-200 font-medium">{item.name}</td>
                <td className="px-6 py-4 text-slate-300">{item.category}</td>
                <td className="px-6 py-4 text-slate-200">
                  <div className="flex items-center gap-3">
                    {item.stock} {item.unit}
                    {item.isLow && (
                      <span className="bg-red-500/10 text-red-400 px-2.5 py-0.5 rounded-full text-xs font-medium border border-red-500/20">
                        Low Stock
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300">{item.reorder} {item.unit}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:bg-slate-800 hover:text-red-400 rounded-lg border border-slate-700 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                  No items found matching criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-slate-700/50 flex justify-center items-center gap-2">
        <button className="p-1 text-slate-500"><ChevronLeft className="w-5 h-5"/></button>
        <button className="w-8 h-8 flex items-center justify-center bg-indigo-500 text-white rounded-lg font-medium text-sm">1</button>
        <button className="p-1 text-slate-400"><ChevronRight className="w-5 h-5"/></button>
      </div>
    </Card>

    {/* Add Item Modal Overlay */}
    {showAddModal && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
         <Card className="w-full max-w-md p-6 animate-in zoom-in-95">
            <h3 className="text-xl font-bold mb-4">Add New Catalog Item</h3>
            
            <div className="space-y-4">
               <div>
                  <label className="block text-sm text-slate-400 mb-1">Item Name</label>
                  <input type="text" value={newItemParams.name} onChange={e => setNewItemParams({...newItemParams, name: e.target.value})} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2 px-4 text-slate-200 focus:outline-none focus:border-indigo-500" />
               </div>
               <div>
                  <label className="block text-sm text-slate-400 mb-1">Category</label>
                  <select value={newItemParams.category} onChange={e => setNewItemParams({...newItemParams, category: e.target.value})} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2 px-4 text-slate-200 focus:outline-none focus:border-indigo-500">
                     {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
               </div>
               <div className="flex gap-4">
                 <div className="flex-1">
                    <label className="block text-sm text-slate-400 mb-1">Initial Stock</label>
                    <input type="number" value={newItemParams.stock} onChange={e => setNewItemParams({...newItemParams, stock: Number(e.target.value)})} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2 px-4 text-slate-200 focus:outline-none focus:border-indigo-500" />
                 </div>
                 <div className="flex-1">
                    <label className="block text-sm text-slate-400 mb-1">Reorder Point</label>
                    <input type="number" value={newItemParams.reorder} onChange={e => setNewItemParams({...newItemParams, reorder: Number(e.target.value)})} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2 px-4 text-slate-200 focus:outline-none focus:border-indigo-500" />
                 </div>
               </div>
               <div>
                  <label className="block text-sm text-slate-400 mb-1">Unit</label>
                  <input type="text" value={newItemParams.unit} onChange={e => setNewItemParams({...newItemParams, unit: e.target.value})} className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2 px-4 text-slate-200 focus:outline-none focus:border-indigo-500" />
               </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowAddModal(false)} className="px-5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800">Cancel</button>
              <button onClick={handleAddNew} className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600">Save Item</button>
            </div>
         </Card>
      </div>
    )}
  </div>
  )
};
