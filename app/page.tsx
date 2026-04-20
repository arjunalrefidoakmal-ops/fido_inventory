'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  LayoutDashboard,
  Database,
  ArrowLeftRight,
  FileText,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Utensils
} from 'lucide-react';
import { StoreProvider } from './store';
import { DashboardView } from './DashboardView';
import { InboundView } from './InboundView';
import { MasterDataView } from './MasterDataView';
import { ReportsView } from './ReportsView';

function DashboardApp() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Master Data', icon: Database },
    { name: 'Transactions', icon: ArrowLeftRight, hasChevron: true, defaultOpen: true, subItems: ['Inbound', 'Outbound'] },
    { name: 'Reports', icon: FileText },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#0e1117] text-slate-200 flex font-sans selection:bg-indigo-500/30">
        <aside className="w-[280px] bg-[#161a25] border-r border-[#262A36] hidden lg:flex flex-col flex-shrink-0 relative overflow-y-auto">
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="p-6 flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.6)]">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">DapurSync</h1>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">Makan Bergizi Gratis Program</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 relative z-10">
            {navItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => {
                    if (!item.subItems) setActiveTab(item.name);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    activeTab === item.name && !item.subItems
                      ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 font-medium">
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </div>
                  {item.hasChevron && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${item.defaultOpen ? 'rotate-180': ''}`} />
                  )}
                </button>
                
                {item.subItems && (
                  <div className="pl-[3rem] mt-1 space-y-1">
                    {item.subItems.map((sub) => (
                      <button 
                        key={sub}
                        onClick={() => setActiveTab(sub)}
                        className={`w-full text-left py-2 px-3 rounded-lg text-sm transition-colors ${
                          activeTab === sub 
                            ? 'text-indigo-400 font-medium' 
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-[76px] bg-[#161a25]/50 backdrop-blur-md border-b border-[#262A36] px-8 flex items-center justify-between sticky top-0 z-50">
            <div className="lg:hidden">
              <LayoutDashboard className="w-6 h-6 text-slate-400" />
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                 <input 
                   type="text" 
                   placeholder="Search globally..." 
                   className="w-full bg-[#1e2332] border border-[#2a3042] rounded-full py-2.5 px-5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
                 />
                 <Search className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div className="md:hidden flex-1"></div>

            <div className="flex items-center gap-5">
              <button className="relative text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#161a25]"></span>
              </button>
              <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-700 hidden sm:block border-2 border-slate-600">
                 <img src="https://picsum.photos/seed/user1/100/100" alt="User" referrerPolicy="no-referrer" />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-[1400px] mx-auto">
              {activeTab === 'Dashboard' && <DashboardView />}
              {activeTab === 'Inbound' && <InboundView />}
              {activeTab === 'Master Data' && <MasterDataView />}
              {activeTab === 'Reports' && <ReportsView />}
              
              {/* Fake views for empty tabs */}
              {['Outbound', 'Settings'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 animate-in fade-in zoom-in-95 duration-500 bg-[#161a25]/50 rounded-3xl border border-[#262A36]">
                  <div className="p-4 bg-indigo-500/10 rounded-full mb-4">
                    <Database className="w-12 h-12 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-200 mb-2">{activeTab} Maintenance</h3>
                  <p className="text-sm max-w-sm text-center">Modul {activeTab} sedang dalam pengembangan dan akan segera bisa Anda gunakan di update berikutnya.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </StoreProvider>
  );
}

export default dynamic(() => Promise.resolve(DashboardApp), { ssr: false });
