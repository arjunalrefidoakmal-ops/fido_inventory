'use client';
import React, { createContext, useContext, useState } from 'react';
import { initialInventoryFlowData, initialRecentInboundData, initialMasterDataCatalog, initialStockReportsData } from './data';

type AppState = {
  inventoryFlow: any[];
  inboundData: any[];
  outboundData: any[];
  inventoryData: any[];
  stockReports: any[];
  settings: any;
  updateSettings: (newSettings: any) => void;
  addInbound: (item: any) => void;
  addOutbound: (item: any) => void;
  addInventoryItem: (item: any) => void;
  editInventoryItem: (sku: string, data: any) => void;
  deleteInventoryItem: (sku: string) => void;
};

const StoreContext = createContext<AppState | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [inventoryFlow, setInventoryFlow] = useState(initialInventoryFlowData);
  const [inboundData, setInboundData] = useState(initialRecentInboundData);
  const [outboundData, setOutboundData] = useState([]);
  const [inventoryData, setInventoryData] = useState(initialMasterDataCatalog);
  const [stockReports, setStockReports] = useState(initialStockReportsData);
  const [settings, setSettings] = useState({
    storeName: 'DapurSync Utama',
    notificationsEnabled: true,
    autoBackup: true,
    currency: 'IDR'
  });

  const updateSettings = (newSettings: any) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addInbound = (item: any) => {
    const newItem = { id: Date.now(), ...item };
    setInboundData([newItem, ...inboundData]);
    
    setInventoryData(prev => prev.map(inv => {
      if (inv.name === item.item) {
        const addedQty = parseFloat(item.qty);
        const newStock = inv.stock + (isNaN(addedQty) ? 0 : addedQty);
        return { ...inv, stock: newStock, isLow: newStock <= inv.reorder };
      }
      return inv;
    }));

    setStockReports(prev => [
      {
        id: Date.now(),
        date: item.date,
        activity: 'In',
        qty: '+' + item.qty,
        purpose: 'Restock - ' + item.supplier,
        person: 'System Inbound'
      },
      ...prev
    ])
  };

  const addOutbound = (item: any) => {
    const newItem = { id: Date.now(), ...item };
    setOutboundData([newItem, ...outboundData] as any);
    
    setInventoryData(prev => prev.map(inv => {
      if (inv.name === item.item) {
        const subQty = parseFloat(item.qty);
        const newStock = Math.max(0, inv.stock - (isNaN(subQty) ? 0 : subQty));
        return { ...inv, stock: newStock, isLow: newStock <= inv.reorder };
      }
      return inv;
    }));

    setStockReports(prev => [
      {
        id: Date.now(),
        date: item.date,
        activity: 'Out',
        qty: '-' + item.qty,
        purpose: item.purpose,
        person: item.person || 'System Outbound'
      },
      ...prev
    ])
  };

  const addInventoryItem = (item: any) => {
    setInventoryData([...inventoryData, { ...item, sku: `DS-00${inventoryData.length + 1}` }]);
  };

  const editInventoryItem = (sku: string, data: any) => {
    setInventoryData(prev => prev.map(inv => {
      if (inv.sku === sku) {
        const newStock = parseFloat(data.stock.toString());
        const newReorder = parseFloat(data.reorder.toString());
        return { ...inv, ...data, stock: newStock, reorder: newReorder, isLow: newStock <= newReorder };
      }
      return inv;
    }));
  };

  const deleteInventoryItem = (sku: string) => {
    setInventoryData(prev => prev.filter(inv => inv.sku !== sku));
  };

  return (
    <StoreContext.Provider value={{ 
      inventoryFlow, inboundData, outboundData, inventoryData, stockReports, settings,
      updateSettings, addInbound, addOutbound, addInventoryItem, editInventoryItem, deleteInventoryItem 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
