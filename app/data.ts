export const initialInventoryFlowData = [
  { name: 'Sun', inbound: 20, outbound: 80 },
  { name: 'Mon', inbound: 150, outbound: 40 },
  { name: 'Tue', inbound: 45, outbound: 80 },
  { name: 'Wed', inbound: 100, outbound: 110 },
  { name: 'Thu', inbound: 90, outbound: 150 },
  { name: 'Week', inbound: 160, outbound: 100 },
  { name: 'Week ', inbound: 80, outbound: 160 },
];

export const initialRecentInboundData = [
  { id: 1, date: '2024-05-23', item: 'Beras Premium', supplier: 'Mitra Pangan', qty: '100 kg', price: 'Rp 1,500,000', status: 'Received' },
  { id: 2, date: '2024-05-22', item: 'Ayam Potong', supplier: 'FreshGrocer', qty: '50 kg', price: 'Rp 1,250,000', status: 'Received' },
  { id: 3, date: '2024-05-21', item: 'Telur Ayam', supplier: 'Sumber Rezeki', qty: '200 pcs', price: 'Rp 400,000', status: 'Pending' },
];

export const initialMasterDataCatalog = [
  { sku: 'DS-001', name: 'Beras Premium', category: 'Grains', stock: 150, unit: 'Kg', reorder: 50, isLow: false },
  { sku: 'DS-002', name: 'Ayam Potong', category: 'Proteins', stock: 30, unit: 'Kg', reorder: 10, isLow: false },
  { sku: 'DS-003', name: 'Wortel', category: 'Vegetables', stock: 12, unit: 'Kg', reorder: 5, isLow: true },
  { sku: 'DS-004', name: 'Minyak Goreng', category: 'Pantry', stock: 80, unit: 'Liters', reorder: 20, isLow: false },
  { sku: 'DS-005', name: 'Telur Ayam', category: 'Proteins', stock: 12, unit: 'Trays', reorder: 3, isLow: true },
];

export const initialStockReportsData = [
  { id: 1, date: 'Oct 28, 2024', activity: 'In', qty: '+50 kg', purpose: 'Restock - Supplier A', person: 'Budi Santoso' },
  { id: 2, date: 'Oct 27, 2024', activity: 'Out', qty: '-15 kg', purpose: 'Menu Ayam Kecap (Makan Siang)', person: 'Siti Aminah' },
  { id: 3, date: 'Oct 25, 2024', activity: 'Out', qty: '-20 kg', purpose: 'Menu Ayam Goreng (Makan Malam)', person: 'Rudi Hartono' },
  { id: 4, date: 'Oct 24, 2024', activity: 'In', qty: '+30 kg', purpose: 'Restock - Supplier B', person: 'Budi Santoso' },
  { id: 5, date: 'Oct 23, 2024', activity: 'Out', qty: '-10 kg', purpose: 'Menu Opor Ayam (Pagi)', person: 'Siti Aminah' },
  { id: 6, date: 'Oct 22, 2024', activity: 'Out', qty: '-18 kg', purpose: 'Menu Ayam Bakar (Makan Siang)', person: 'Rudi Hartono' },
];
