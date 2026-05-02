import {
  BarChart3,
  BookOpen,
  Braces,
  Brain,
  Calculator,
  Cpu,
  Filter,
  Funnel,
  GitBranch,
  Grid3X3,
  LayoutDashboard,
  LinkIcon,
  Monitor,
  Search,
  Settings,
  Sheet,
  Sigma,
  Table,
  Target,
  Type,
} from 'lucide-react';

export type SubjectTone = {
  text: string;
  bg: string;
  badge: string;
  border: string;
  hoverBorder: string;
  button: string;
  buttonHover: string;
  ring: string;
};

export const subjectTones: Record<string, SubjectTone> = {
  green: {
    text: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950/20',
    badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    border: 'border-green-200 dark:border-green-800',
    hoverBorder: 'hover:border-green-300 dark:hover:border-green-700',
    button: 'bg-green-600 hover:bg-green-700',
    buttonHover: 'hover:bg-green-700',
    ring: 'ring-green-500',
  },
  blue: {
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700',
    button: 'bg-blue-600 hover:bg-blue-700',
    buttonHover: 'hover:bg-blue-700',
    ring: 'ring-blue-500',
  },
  purple: {
    text: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    hoverBorder: 'hover:border-purple-300 dark:hover:border-purple-700',
    button: 'bg-purple-600 hover:bg-purple-700',
    buttonHover: 'hover:bg-purple-700',
    ring: 'ring-purple-500',
  },
  amber: {
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/20',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-700',
    button: 'bg-amber-600 hover:bg-amber-700',
    buttonHover: 'hover:bg-amber-700',
    ring: 'ring-amber-500',
  },
  rose: {
    text: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/20',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800',
    hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-700',
    button: 'bg-rose-600 hover:bg-rose-700',
    buttonHover: 'hover:bg-rose-700',
    ring: 'ring-rose-500',
  },
};

export function getSubjectTone(color: string): SubjectTone {
  return subjectTones[color] || subjectTones.green;
}

export function SubjectIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'BarChart3':
      return <BarChart3 className={className} />;
    case 'Calculator':
      return <Calculator className={className} />;
    case 'Code':
      return <Braces className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Filter':
      return <Filter className={className} />;
    case 'Funnel':
      return <Funnel className={className} />;
    case 'GitBranch':
      return <GitBranch className={className} />;
    case 'Grid3X3':
      return <Grid3X3 className={className} />;
    case 'LayoutDashboard':
      return <LayoutDashboard className={className} />;
    case 'Link':
      return <LinkIcon className={className} />;
    case 'Monitor':
      return <Monitor className={className} />;
    case 'Search':
      return <Search className={className} />;
    case 'Settings':
      return <Settings className={className} />;
    case 'Sheet':
      return <Sheet className={className} />;
    case 'Sigma':
      return <Sigma className={className} />;
    case 'Table':
      return <Table className={className} />;
    case 'Target':
      return <Target className={className} />;
    case 'Type':
      return <Type className={className} />;
    case 'Brain':
      return <Brain className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}
