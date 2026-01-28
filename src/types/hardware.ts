export interface HardwareItem {
  id: string;
  name: string;
  description: string;
  cloudinaryPublicId?: string;
  images?: string[];
  imageCaptions?: string[];
  categories: string[];
  status: 'available' | 'coming-soon' | 'maintenance';
  availableSince?: string;
  isNew?: boolean;
  details: string[];
  related: string[];
}

export type HardwareStatus = HardwareItem['status'];
