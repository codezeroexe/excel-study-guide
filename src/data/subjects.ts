import type { SubjectData } from './types';
import { modules as excelModules } from './excel/modules';
import { modules as mlModules } from './ml/modules';
import { modules as dsaModules } from './dsa/modules';

export const subjects: SubjectData[] = [
  {
    id: 'excel',
    name: 'MS Excel',
    shortName: 'Excel',
    description: 'Master spreadsheets — formulas, VLOOKUP, HLOOKUP, Pivot Tables, Charts, and Dashboards',
    color: 'green',
    icon: 'Sheet',
    modules: excelModules,
  },
  {
    id: 'mldl',
    name: 'Machine Learning & Deep Learning',
    shortName: 'ML/DL',
    description: 'From AI fundamentals to neural networks — regression, classification, clustering, and deep learning',
    color: 'blue',
    icon: 'Brain',
    modules: mlModules,
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    shortName: 'DSA',
    description: 'From arrays to graphs — complexity analysis, sorting, trees, and shortest path algorithms',
    color: 'purple',
    icon: 'Code',
    modules: dsaModules,
  },
];

export function getSubjectById(id: string): SubjectData | undefined {
  return subjects.find(s => s.id === id);
}

export function getAllSubjectIds(): string[] {
  return subjects.map(s => s.id);
}
