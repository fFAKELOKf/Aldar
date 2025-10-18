export interface StoryboardFrame {
  thumbnail: string;
  caption: string;
}

export interface StoryBlueprint {
  id: string;
  title: string;
  prompt: string;
  summary: string;
  themeKeywords: string[];
  storyboardImage: string;
  frames: StoryboardFrame[];
}

export type MatchConfidence = 'high' | 'medium' | 'low';

export interface GeneratedStoryboard {
  blueprintId: string;
  title: string;
  scenario: string;
  summary: string;
  storyboardImage: string;
  frames: StoryboardFrame[];
  matchedKeywords: string[];
  matchConfidence: MatchConfidence;
  generatedAt: string;
}
