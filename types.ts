export type AnalysisState = 'idle' | 'analyzing' | 'success' | 'error';

export type StatusStep = {
  key: AnalysisState;
  label: string;
};

export interface WebSource {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web: WebSource;
}
