'use client';
import React, { useState } from 'react';
import { useStore } from './store';
import { Save, Bell, Shield, Database, LayoutDashboard, Download, HardDrive } from 'lucide-react';

const Card = ({ children, className = '', glow = false }: { children: React.ReactNode, className?: string, glow?: boolean }) => (
  <div className={`bg-[#1c2131] rounded-2xl border ${glow ? 'border-indigo-500/50 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]' : 'border-slate-700/50'} ${className}`}>
    {children}
  </div>
);

// Toggle Component for reusability
const Toggle = ({ checked, onChange }: { checked: boolean, onChange: (val: boolean) => void }) => (
  <div className="relative" onClick={() => onChange(!checked)}>
    <div className={`block w-14 h-8 rounded-full transition-colors cursor-pointer ${checked ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform cursor-pointer pointer-events-none ${checked ? 'transform translate-x-6' : ''}`}></div>
  </div>
);

export const SettingsView = () => {
  const { settings, updateSettings, inventoryData, inboundData, outboundData, stockReports } = useStore();
  const [localSettings, setLocalSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState('General');

  const handleSave = () => {
    updateSettings(localSettings);
    alert('✅ Settings successfully optimized and saved!');
  };

  const handleDownloadBackup = () => {
    const allData = { 
      exportDate: new Date().toISOString(),
      inventoryData, 
      inboundData, 
      outboundData, 
      stockReports, 
      settings: localSettings 
    };
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DapurSync_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'General', icon: LayoutDashboard, label: 'General' },
    { id: 'Notifications', icon: Bell, label: 'Notifications' },
    { id: 'Data', icon: Database, label: 'Data & Backup' },
    { id: 'Security', icon: Shield, label: 'Security' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Application Settings</h2>
        <p className="text-sm text-slate-400">Manage your Dapur MBG application preferences and configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Sidebar Menu inside Settings */}
        <div className="md:col-span-1 flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
           {tabs.map(tab => (
             <button 
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 font-medium whitespace-nowrap ${
                 activeTab === tab.id 
                   ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]' 
                   : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
               }`}
             >
               <tab.icon className="w-5 h-5 flex-shrink-0" /> {tab.label}
             </button>
           ))}
        </div>

        {/* Content Area */}
        <Card className="md:col-span-3 p-6 md:p-8 space-y-8 relative overflow-hidden min-h-[500px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* ========== GENERAL TAB ========== */}
          {activeTab === 'General' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <h3 className="text-xl font-medium text-slate-200 border-b border-slate-700/50 pb-4">General Facility Details</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Store / Kitchen Name</label>
                  <input 
                     type="text" 
                     value={localSettings.storeName}
                     onChange={e => setLocalSettings({...localSettings, storeName: e.target.value})}
                     className="w-full max-w-md bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-indigo-500" 
                  />
                  <p className="text-xs text-slate-500 mt-1.5">This name will appear on all exported reports.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-md">
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
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Timezone</label>
                    <select 
                      value={localSettings.timezone} 
                      onChange={e => setLocalSettings({...localSettings, timezone: e.target.value})}
                      className="w-full bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                      <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                      <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== NOTIFICATIONS TAB ========== */}
          {activeTab === 'Notifications' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <h3 className="text-xl font-medium text-slate-200 border-b border-slate-700/50 pb-4">Alerts & Notifications</h3>
              
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between group">
                   <div>
                      <div className="text-slate-200 font-medium group-hover:text-indigo-400 transition-colors">In-App Push Notifications</div>
                      <div className="text-sm text-slate-400">Receive alerts in your browser for low stock and inbound activities.</div>
                   </div>
                   <Toggle 
                     checked={localSettings.notificationsEnabled} 
                     onChange={(val) => setLocalSettings({...localSettings, notificationsEnabled: val})} 
                   />
                </div>

                <div className="flex items-center justify-between group">
                   <div>
                      <div className="text-slate-200 font-medium group-hover:text-indigo-400 transition-colors">Daily Email Digest</div>
                      <div className="text-sm text-slate-400">Send an email summarizing daily Inbound/Outbound transactions.</div>
                   </div>
                   <Toggle 
                     checked={localSettings.emailAlerts} 
                     onChange={(val) => setLocalSettings({...localSettings, emailAlerts: val})} 
                   />
                </div>

                <div className="pt-4">
                  <label className="block text-sm font-medium text-slate-200 mb-2">Default Low Stock Threshold</label>
                  <p className="text-sm text-slate-400 mb-3">Notify when any item's stock drops below this number (if product has no specific reorder point).</p>
                  <input 
                     type="number" 
                     value={localSettings.lowStockThreshold}
                     onChange={e => setLocalSettings({...localSettings, lowStockThreshold: Number(e.target.value)})}
                     className="w-32 bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========== DATA & BACKUP TAB ========== */}
          {activeTab === 'Data' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <h3 className="text-xl font-medium text-slate-200 border-b border-slate-700/50 pb-4">Data Management</h3>
              
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between group">
                   <div>
                      <div className="text-slate-200 font-medium group-hover:text-indigo-400 transition-colors">Automated Cloud Backups</div>
                      <div className="text-sm text-slate-400">Continuously sync database to secure remote server.</div>
                   </div>
                   <Toggle 
                     checked={localSettings.autoBackup} 
                     onChange={(val) => setLocalSettings({...localSettings, autoBackup: val})} 
                   />
                </div>

                {localSettings.autoBackup && (
                  <div className="bg-[#151923] p-4 rounded-xl border border-slate-700/50">
                    <label className="block text-sm text-slate-400 mb-2">Cloud Backup Frequency</label>
                    <select 
                      value={localSettings.backupFrequency} 
                      onChange={e => setLocalSettings({...localSettings, backupFrequency: e.target.value})}
                      className="w-full max-w-xs bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Hourly">Every Hour</option>
                      <option value="Daily">Daily (Midnight)</option>
                      <option value="Weekly">Weekly (Sunday)</option>
                    </select>
                  </div>
                )}

                <div className="border-t border-slate-700/50 pt-6 mt-6">
                  <h4 className="text-slate-200 font-medium mb-2">Export Complete Database</h4>
                  <p className="text-sm text-slate-400 mb-4">Download a local JSON copy of your entire system including inventory, history, and settings.</p>
                  <button onClick={handleDownloadBackup} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl transition-colors border border-slate-600 font-medium">
                    <HardDrive className="w-4 h-4" /> Download Full Snapshot (.json)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========== SECURITY TAB ========== */}
          {activeTab === 'Security' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <h3 className="text-xl font-medium text-slate-200 border-b border-slate-700/50 pb-4">Access & Security</h3>
              
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between group">
                   <div>
                      <div className="text-slate-200 font-medium group-hover:text-indigo-400 transition-colors">Require PIN on Outbound Transaction</div>
                      <div className="text-sm text-slate-400">Prevent unauthorized staff from dispatching items without a supervisor PIN.</div>
                   </div>
                   <Toggle 
                     checked={localSettings.requirePinOnOutbound} 
                     onChange={(val) => setLocalSettings({...localSettings, requirePinOnOutbound: val})} 
                   />
                </div>

                <div className="pt-4">
                  <label className="block text-sm font-medium text-slate-200 mb-2">Inactivity Session Timeout (Minutes)</label>
                  <p className="text-sm text-slate-400 mb-3">Automatically log out users after being idle for this duration.</p>
                  <input 
                     type="number" 
                     value={localSettings.sessionTimeout}
                     onChange={e => setLocalSettings({...localSettings, sessionTimeout: Number(e.target.value)})}
                     className="w-32 bg-[#131620] border border-slate-700/50 rounded-xl py-2.5 px-4 text-slate-200 focus:outline-none focus:border-indigo-500" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Button (Floats at bottom of content) */}
          <div className="pt-6 mt-6 border-t border-slate-700/30 flex justify-end absolute bottom-6 right-6 left-6 bg-[#1c2131]/80 backdrop-blur-sm shadow-[0_-10px_20px_10px_#1c2131]">
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-white bg-indigo-500 hover:bg-indigo-600 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Save className="w-4 h-4" /> Apply Settings
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
