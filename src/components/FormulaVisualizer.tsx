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
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <Code className="w-4 h-4 text-blue-500" />
          <span className="font-mono text-sm text-gray-900 dark:text-gray-100">{formula}</span>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {expanded && (
        <div className="p-4 space-y-3 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-3 rounded-r">
            <p className="text-sm text-blue-800 dark:text-blue-300">{explanation}</p>
          </div>
          {isFormula && (
            <div className="flex flex-wrap gap-2">
              {formula.match(/[A-Z]+(?=\()/g)?.map((fn, i) => (
                <span key={i} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
                  Function: {fn}
                </span>
              ))}
              {formula.includes('$') && (
                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded text-xs font-medium">
                  Absolute Reference
                </span>
              )}
              {formula.includes('IF') && (
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs font-medium">
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
