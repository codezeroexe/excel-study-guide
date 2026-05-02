'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Sigma } from 'lucide-react';

interface MathFormulaProps {
  formula: string;
  description: string;
  explanation: string;
  tags?: string[];
  accentColor?: string;
}

export default function MathFormula({
  formula,
  description,
  explanation,
  tags = [],
  accentColor = 'blue',
}: MathFormulaProps) {
  const [expanded, setExpanded] = useState(false);

  const colorMap: Record<string, { icon: string; bg: string; border: string; text: string }> = {
    green: { icon: 'text-neutral-500', bg: 'bg-neutral-50 dark:bg-neutral-950/20', border: 'border-neutral-400', text: 'text-neutral-800 dark:text-neutral-300' },
    blue: { icon: 'text-neutral-500', bg: 'bg-neutral-50 dark:bg-neutral-900/20', border: 'border-neutral-400', text: 'text-neutral-800 dark:text-neutral-300' },
    purple: { icon: 'text-neutral-500', bg: 'bg-neutral-50 dark:bg-neutral-900/20', border: 'border-neutral-400', text: 'text-neutral-800 dark:text-neutral-300' },
    amber: { icon: 'text-neutral-500', bg: 'bg-neutral-50 dark:bg-neutral-950/20', border: 'border-neutral-400', text: 'text-neutral-800 dark:text-neutral-300' },
    rose: { icon: 'text-neutral-500', bg: 'bg-neutral-50 dark:bg-neutral-950/20', border: 'border-neutral-400', text: 'text-neutral-800 dark:text-neutral-300' },
  };
  const c = colorMap[accentColor] || colorMap.blue;

  return (
    <div className="border border-border dark:border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Sigma className={`w-4 h-4 ${c.icon} flex-shrink-0`} />
          <span className="font-mono text-sm text-neutral-900 dark:text-neutral-100 truncate">{formula}</span>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-2" />
        ) : (
          <ChevronRight className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-2" />
        )}
      </button>
      {expanded && (
        <div className="p-4 space-y-3 bg-white dark:bg-neutral-900">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
          <div className={`${c.bg} border-l-4 ${c.border} p-3 rounded-r`}>
            <p className={`text-sm ${c.text}`}>{explanation}</p>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-900/30 text-neutral-700 dark:text-neutral-300 rounded text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
