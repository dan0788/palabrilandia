export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  requirementText: string;
}

export interface UserStats {
  xp: number;
  stars: number;
  level: number;
  streak: number;
  gamesPlayed: number;
  soundEnabled: boolean;
  selectedAvatar: string;
}

export type GameDifficulty = 'facil' | 'intermedio' | 'experto';

export interface WordFillQuestion {
  id: number;
  sentenceBefore: string;
  missingWord: string;
  sentenceAfter: string;
  options: string[];
  explanation: string;
  category: 'Ortografía' | 'Gramática' | 'Sinónimos';
  hint: string;
}

export interface WordSearchTarget {
  word: string;
  clue: string;
  found: boolean;
  color?: string;
}

export interface Riddle {
  id: number;
  verse: string[];
  answer: string;
  options: string[];
  hints: string[];
  educationalNote: string;
}

export interface SentencePuzzle {
  id: number;
  title: string;
  authorOrSource: string;
  words: string[];
  correctOrder: string[];
  moralOrExplanation: string;
}

export interface TriviaQuestion {
  id: number;
  category: 'Cuentos Clásicos' | 'Poesía y Rima' | 'Gramática Divertida' | 'Ortografía Mágica' | 'Literatura Moderna' | 'Sintaxis de Bachillerato' | 'Ortografía Crítica' | string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}


export interface SyntaxChallenge {
  id: number;
  sentence: string;
  sentenceType: string;
  subordinateClause: string;
  nexus: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface LiteraryMovementChallenge {
  id: number;
  authorOrWork: string;
  description: string;
  options: string[];
  correctMovement: string;
  keyFragment: string;
  explanation: string;
}

export interface DiacriticChallenge {
  id: number;
  sentenceBefore: string;
  sentenceAfter: string;
  pair: [string, string];
  correctWord: string;
  grammaticalFunction: string;
  explanation: string;
}

export interface RhetoricFigureChallenge {
  id: number;
  verse: string;
  author: string;
  options: string[];
  correctFigure: string;
  explanation: string;
}

export interface HomophoneChallenge {
  id: number;
  context: string;
  options: string[];
  correctWord: string;
  distractorMeaning: string;
  explanation: string;
}

export interface MicrofictionChallenge {
  id: number;
  title: string;
  author: string;
  text: string;
  question: string;
  options: string[];
  correctIndex: number;
  literaryAnalysis: string;
}

export interface QuoteAnagramChallenge {
  id: number;
  author: string;
  work: string;
  scrambledKeywords: string[];
  correctKeywords: string[];
  fullQuote: string;
  clue: string;
}
