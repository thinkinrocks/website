export interface HardwareItem {
  id: string;
  name: string;
  description: string;
  cloudinaryPublicId: string;
  categories: string[];
  status: 'available' | 'coming-soon' | 'maintenance';
}

export type HardwareStatus = HardwareItem['status'];
