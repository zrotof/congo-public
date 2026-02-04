export interface SnapFilter {
  id: number;
  name: string | null;
  imageUrl: string | null;
  snapchatUrl: string;
  usageCount: number;
  isActive: boolean;
}

export interface FilterState {
  filterId: number;
  usageCount: number;
}

export interface FiltersState {
  filters: FilterState[];
}