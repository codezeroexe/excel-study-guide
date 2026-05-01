'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Sigma } from 'lucide-react';

interface MathFormulaProps {
  formula: string;
  description: string;
  explanation: string;
  tags?: string[];
}

export default function MathFormula({
  formula,
  description,
  explanation,
  tags = [],
}: MathFormulaProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Sigma className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span className="font-mono text-sm text-gray-900 dark:text-gray-100 truncate">{formula}</span>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
        )}
      </button>
      {expanded && (
        <div className="p-4 space-y-3 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-3 rounded-r">
            <p className="text-sm text-blue-800 dark:text-blue-300">{explanation}</p>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
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
