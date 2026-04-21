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
  Utensils,
  Menu,
  X
} from 'lucide-react';
import { StoreProvider } from './store';
import { DashboardView } from './DashboardView';
import { InboundView } from './InboundView';
import { OutboundView } from './OutboundView';
import { MasterDataView } from './MasterDataView';
import { ReportsView } from './ReportsView';
import { SettingsView } from './SettingsView';

function DashboardApp() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Master Data', icon: Database },
    { name: 'Transactions', icon: ArrowLeftRight, hasChevron: true, defaultOpen: true, subItems: ['Inbound', 'Outbound'] },
    { name: 'Reports', icon: FileText },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#0e1117] text-slate-200 flex font-sans selection:bg-indigo-500/30 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
        )}

        <aside className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#161a25] border-r border-[#262A36] flex flex-col flex-shrink-0 overflow-y-auto transition-transform duration-300 transform lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="p-6 flex items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_-5px_rgba(99,102,241,0.6)]">
                <Utensils className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight text-white leading-none">DapurSync</h1>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">Makan Bergizi Gratis</p>
              </div>
            </div>
            
            <button className="lg:hidden p-2 -mr-2 text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 relative z-10">
            {navItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => {
                    if (!item.subItems) {
                      setActiveTab(item.name);
                      setIsMobileMenuOpen(false); // Close menu on mobile after selection
                    }
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
                        onClick={() => {
                          setActiveTab(sub);
                          setIsMobileMenuOpen(false); // Close menu on mobile after selection
                        }}
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

        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <header className="h-[76px] flex-shrink-0 bg-[#161a25]/90 backdrop-blur-md border-b border-[#262A36] px-4 md:px-8 flex items-center justify-between z-30 relative">
            <button className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>

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
              {activeTab === 'Outbound' && <OutboundView />}
              {activeTab === 'Master Data' && <MasterDataView />}
              {activeTab === 'Reports' && <ReportsView />}
              {activeTab === 'Settings' && <SettingsView />}
            </div>
          </div>
        </main>
      </div>
    </StoreProvider>
  );
}

export default dynamic(() => Promise.resolve(DashboardApp), { ssr: false });
