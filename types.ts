export interface ProductPreferences {
  priorities: string[];
  customDescription: string;
}

export enum ComparisonStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type ModelType = 'gemini-2.5-flash' | 'gemini-3-pro-preview';

export interface ComparisonCategory {
  name: string;
  winner: 'A' | 'B' | 'Remis';
  scoreA: number; // 1-10
  scoreB: number; // 1-10
  reasoning: string;
}

export interface StructuredComparisonData {
  productAName: string;
  productBName: string;
  summary: string;
  categories: ComparisonCategory[];
  prosA: string[];
  consA: string[];
  prosB: string[];
  consB: string[];
  finalVerdict: {
    winner: 'A' | 'B' | 'Remis';
    explanation: string;
  };
}

export interface ComparisonResult {
  data: StructuredComparisonData;
  groundingSources?: Array<{ uri: string; title: string }>;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  productAName: string;
  productBName: string;
  result: ComparisonResult;
}
