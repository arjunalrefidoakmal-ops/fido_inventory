'use client';
import React, { useState } from 'react';
import { useStore } from './store';
import { Save, Bell, Shield, Database, LayoutDashboard } from 'lucide-react';

const Card = ({ children, className = '', glow = false }: { children: React.ReactNode, className?: string, glow?: boolean }) => (
  <div className={`bg-[#1c2131] rounded-2xl border ${glow ? 'border-indigo-500/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]' : 'border-slate-700/50'} ${className}`}>
    {children}
  </div>
);

export const SettingsView = () => {
  const { settings, updateSettings } = useStore();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    updateSettings(localSettings);
    alert('Settings successfully optimized and saved!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Application Settings</h2>
        <p className="text-sm text-slate-400">Configure your DapurSync preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
           <button className="w-full text-left px-4 py-3 bg-indigo-500/10 text-indigo-400 font-medium rounded-xl border border-indigo-500/20 flex items-center gap-3">
             <LayoutDashboard className="w-5 h-5" /> General
           </button>
           <button className="w-full text-left px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-xl transition-colors flex items-center gap-3">
             <Bell className="w-5 h-5" /> Notifications
           </button>
           <button className="w-full text-left px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-xl transition-colors flex items-center gap-3">
             <Database className="w-5 h-5" /> Data & Backup
           </button>
           <button className="w-full text-left px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-xl transition-colors flex items-center gap-3">
             <Shield className="w-5 h-5" /> Security
           </button>
        </div>

        <Card className="md:col-span-2 p-6 md:p-8 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-200 border-b border-slate-700/50 pb-2">Facility Details</h3>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">Store / Kitchen Name</label>
              <input 
                 type="text" 
                 value={localSettings.storeName}
                 onChange={e => setLocalSettings({...localSettings, storeName: e.target.value})}
                 className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-indigo-500" 
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-2">Currency Symbol</label>
              <select 
                value={localSettings.currency} 
                onChange={e => setLocalSettings({...localSettings, currency: e.target.value})}
                className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="IDR">IDR (Rp)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-200 border-b border-slate-700/50 pb-2">Preferences</h3>
            
            <label className="flex items-center justify-between cursor-pointer group">
               <div>
                  <div className="text-slate-200 font-medium group-hover:text-indigo-400 transition-colors">Enable Push Notifications</div>
                  <div className="text-sm text-slate-400">Receive alerts for low stock and inbound.</div>
               </div>
               <div className="relative">
                  <input type="checkbox" className="sr-only" checked={localSettings.notificationsEnabled} onChange={e => setLocalSettings({...localSettings, notificationsEnabled: e.target.checked})} />
                  <div className={`block w-14 h-8 rounded-full transition-colors ${localSettings.notificationsEnabled ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${localSettings.notificationsEnabled ? 'transform translate-x-6' : ''}`}></div>
               </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
               <div>
                  <div className="text-slate-200 font-medium group-hover:text-indigo-400 transition-colors">Automated Daily Backups</div>
                  <div className="text-sm text-slate-400">Sync database to secure server nightly.</div>
               </div>
               <div className="relative">
                  <input type="checkbox" className="sr-only" checked={localSettings.autoBackup} onChange={e => setLocalSettings({...localSettings, autoBackup: e.target.checked})} />
                  <div className={`block w-14 h-8 rounded-full transition-colors ${localSettings.autoBackup ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${localSettings.autoBackup ? 'transform translate-x-6' : ''}`}></div>
               </div>
            </label>
          </div>

          <div className="pt-4 flex justify-end">
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Save className="w-5 h-5" /> Save Changes
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
