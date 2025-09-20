export interface HardwareItem {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  status: 'available' | 'coming-soon' | 'maintenance';
}

export type HardwareStatus = HardwareItem['status'];
