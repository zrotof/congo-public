export interface SnapFilter {
  id: number;
  name: string | null;
  imageUrl: string;
  filterUrl: string; 
  platform: 'SNAPCHAT' | 'TIKTOK';
  usageCount: number;
  isActive: boolean;
}

// Pour le socket
export interface FilterState {
  filterId: number;
  usageCount: number;
}

export interface FiltersState {
  filters: FilterState[];
}