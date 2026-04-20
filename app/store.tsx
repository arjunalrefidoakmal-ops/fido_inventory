'use client';
import React, { createContext, useContext, useState } from 'react';
import { initialInventoryFlowData, initialRecentInboundData, initialMasterDataCatalog, initialStockReportsData } from './data';

type AppState = {
  inventoryFlow: any[];
  inboundData: any[];
  inventoryData: any[];
  stockReports: any[];
  addInbound: (item: any) => void;
  addInventoryItem: (item: any) => void;
};

const StoreContext = createContext<AppState | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [inventoryFlow, setInventoryFlow] = useState(initialInventoryFlowData);
  const [inboundData, setInboundData] = useState(initialRecentInboundData);
  const [inventoryData, setInventoryData] = useState(initialMasterDataCatalog);
  const [stockReports, setStockReports] = useState(initialStockReportsData);

  const addInbound = (item: any) => {
    const newItem = { id: Date.now(), ...item };
    setInboundData([newItem, ...inboundData]);
    
    // Also update inventory if matched
    setInventoryData(prev => prev.map(inv => {
      if (inv.name === item.item) {
        const addedQty = parseFloat(item.qty);
        const newStock = inv.stock + (isNaN(addedQty) ? 0 : addedQty);
        return { ...inv, stock: newStock, isLow: newStock <= inv.reorder };
      }
      return inv;
    }));

    // Add to reports
    setStockReports(prev => [
      {
        id: Date.now(),
        date: item.date,
        activity: 'In',
        qty: '+' + item.qty,
        purpose: 'Restock - ' + item.supplier,
        person: 'System'
      },
      ...prev
    ])
  };

  const addInventoryItem = (item: any) => {
    setInventoryData([...inventoryData, { ...item, sku: `DS-00${inventoryData.length + 1}` }]);
  };

  return (
    <StoreContext.Provider value={{ inventoryFlow, inboundData, inventoryData, stockReports, addInbound, addInventoryItem }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
