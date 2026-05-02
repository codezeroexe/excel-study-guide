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

// Monochromatic theme - single neutral tone for all subjects
export const subjectTone: SubjectTone = {
  text: 'text-neutral-900 dark:text-neutral-50',
  bg: 'bg-surface dark:bg-surface',
  badge: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  border: 'border-border dark:border-border',
  hoverBorder: 'hover:border-border-hover dark:hover:border-border-hover',
  button: 'bg-accent hover:bg-accent-hover',
  buttonHover: 'hover:bg-accent-hover',
  ring: 'ring-accent',
};

export function getSubjectTone(_color: string): SubjectTone {
  return subjectTone;
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
