'use client';

import { usePathname } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { subjects } from '@/data/subjects';

interface ProgressBadgeProps {
  subjectId: string;
  collapsed?: boolean;
}

// Mock progress - in real app, this would come from localStorage or API
function getProgress(subjectId: string): { completed: number; total: number } {
  if (typeof window === 'undefined') return { completed: 0, total: 0 };
  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return { completed: 0, total: 0 };
  const stored = localStorage.getItem(`progress-${subjectId}`);
  const completed = stored ? JSON.parse(stored).length : 0;
  return { completed, total: subject.modules.length };
}

export default function ProgressBadge({ subjectId, collapsed = false }: ProgressBadgeProps) {
  const { completed, total } = getProgress(subjectId);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (collapsed) {
    return (
      <div className="flex justify-center">
        <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium ${
          completed > 0 ? 'bg-accent text-accent-text' : 'bg-surface text-muted'
        }`}>
          {completed > 0 ? <CheckCircle2 className="h-3 w-3" /> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted">Progress</span>
        <span className="font-medium tabular-nums">{completed}/{total}</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
