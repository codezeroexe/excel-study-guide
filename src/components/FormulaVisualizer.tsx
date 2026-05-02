'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Code } from 'lucide-react';

interface FormulaVisualizerProps {
  formula: string;
  description: string;
  explanation: string;
}

export default function FormulaVisualizer({
  formula,
  description,
  explanation,
}: FormulaVisualizerProps) {
  const [expanded, setExpanded] = useState(false);

  const isFormula = formula.includes('=') || formula.includes('SUM') || formula.includes('IF') ||
    formula.includes('VLOOKUP') || formula.includes('HLOOKUP') || formula.includes('COUNT') ||
    formula.includes('AVERAGE') || formula.includes('LEFT') || formula.includes('RIGHT') ||
    formula.includes('MID') || formula.includes('CONCATENATE') || formula.includes('&') ||
    formula.includes('SUMIF') || formula.includes('SUMIFS') || formula.includes('COUNTIF') ||
    formula.includes('AVERAGEIF');

  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <Code className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          <span className="font-mono text-sm text-neutral-900 dark:text-neutral-100">{formula}</span>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-neutral-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        )}
      </button>
      {expanded && (
        <div className="p-4 space-y-3 bg-white dark:bg-neutral-900">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
          <div className="bg-neutral-50 dark:bg-neutral-950/20 border-l-4 border-neutral-500 p-3 rounded-r">
            <p className="text-sm text-neutral-800 dark:text-neutral-300">{explanation}</p>
          </div>
          {isFormula && (
            <div className="flex flex-wrap gap-2">
              {formula.match(/[A-Z]+(?=\()/g)?.map((fn, i) => (
                <span key={i} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded text-xs font-medium">
                  Function: {fn}
                </span>
              ))}
              {formula.includes('$') && (
                <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded text-xs font-medium">
                  Absolute Reference
                </span>
              )}
              {formula.includes('IF') && (
                <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-900/30 text-neutral-700 dark:text-neutral-300 rounded text-xs font-medium">
                  Conditional Logic
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
