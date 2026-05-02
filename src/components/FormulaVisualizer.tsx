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
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-surface hover:bg-surface-hover transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <Code className="w-4 h-4 text-muted" />
          <span className="font-mono text-sm text-foreground">{formula}</span>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-muted" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted" />
        )}
      </button>
      {expanded && (
        <div className="p-4 space-y-3 bg-background">
          <p className="text-sm text-muted">{description}</p>
          <div className="border-l-4 border-accent pl-3 py-1">
            <p className="text-sm text-foreground">{explanation}</p>
          </div>
          {isFormula && (
            <div className="flex flex-wrap gap-2">
              {formula.match(/[A-Z]+(?=\()/g)?.map((fn, i) => (
                <span key={i} className="px-2 py-1 bg-surface text-foreground rounded text-xs font-medium">
                  Function: {fn}
                </span>
              ))}
              {formula.includes('$') && (
                <span className="px-2 py-1 bg-surface text-foreground rounded text-xs font-medium">
                  Absolute Reference
                </span>
              )}
              {formula.includes('IF') && (
                <span className="px-2 py-1 bg-surface text-foreground rounded text-xs font-medium">
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
