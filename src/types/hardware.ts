export interface HardwareItem {
  id: string;
  name: string;
  description: string;
  image: string;
  categories: string[];
  status: 'available' | 'coming-soon' | 'maintenance';
}

export type HardwareStatus = HardwareItem['status'];
