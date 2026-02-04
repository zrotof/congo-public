export interface Challenge {
  id: number;
  title: string;
  contextText?: string;
  imageUrl?: string | null;
  blurredImageUrl?: string;
  targetViews: number;
  currentViews: number;
  isActive: boolean;
  isRevealed?: boolean;
  progress?: number;
}

export interface ChallengeState {
  challengeId: number;
  currentViews: number;
  targetViews: number;
  progress: number;
  isRevealed: boolean;
  originalImageUrl?: string | null;
}

export interface ChallengeRevealData {
  challengeId: number;
  originalImageUrl: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  message?: string;
}