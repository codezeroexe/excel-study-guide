export interface FormulaExample {
  formula: string;
  description: string;
  explanation: string;
  result?: string;
}

export interface Lesson {
  title: string;
  content: string;
  formulas: FormulaExample[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ModuleData {
  id: string;
  title: string;
  icon: string;
  description: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  sampleData?: Record<string, string[][]>;
}

export interface SubjectData {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
  icon: string;
  modules: ModuleData[];
}
