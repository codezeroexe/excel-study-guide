'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, CheckCircle2, Search } from 'lucide-react';

interface LookupAnimatorProps {
  type: 'vlookup' | 'hlookup';
  lookupValue: string;
  tableData: string[][];
  colOrRowIndex: number;
  result: string;
  subjectColor?: string;
}

export default function LookupAnimator({
  type,
  lookupValue,
  tableData,
  colOrRowIndex,
  result,
  subjectColor = 'accent',
}: LookupAnimatorProps) {
  const colorClass = subjectColor === 'green' ? 'ring-green-500 bg-green-50 dark:bg-green-950/30' :
    subjectColor === 'blue' ? 'ring-blue-500 bg-blue-50 dark:bg-blue-950/30' :
    subjectColor === 'purple' ? 'ring-purple-500 bg-purple-50 dark:bg-purple-950/30' :
    subjectColor === 'amber' ? 'ring-amber-500 bg-amber-50 dark:bg-amber-950/30' :
    subjectColor === 'rose' ? 'ring-rose-500 bg-rose-50 dark:bg-rose-950/30' :
    'ring-neutral-500 bg-neutral-50 dark:bg-neutral-950/30';
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalSteps = type === 'vlookup' ? 4 : 4;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      if (step >= totalSteps) {
        setIsPlaying(false);
      } else {
        setStep(s => s + 1);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [step, isPlaying, totalSteps]);

  const play = () => {
    setStep(0);
    setIsPlaying(true);
  };

  const reset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const matchRow = type === 'vlookup'
    ? tableData.findIndex(row => row[0]?.toLowerCase() === lookupValue.toLowerCase())
    : -1;

  const matchCol = type === 'hlookup'
    ? tableData[0]?.findIndex(cell => cell?.toLowerCase() === lookupValue.toLowerCase()) ?? -1
    : -1;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={play}
          disabled={isPlaying}
          className="px-4 py-2 bg-accent text-accent-text dark:bg-neutral-100 dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPlaying ? 'Playing...' : 'Play Animation'}
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          Reset
        </button>
        <span className="text-xs text-neutral-500 ml-2">Step {step}/{totalSteps}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="border-collapse text-sm">
          {tableData.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => {
                let bgClass = 'bg-white dark:bg-neutral-900';
                const borderClass = 'border border-border dark:border-border';

                if (type === 'vlookup') {
                  // Step 1: highlight first column (search column)
                  if (step >= 1 && colIdx === 0) {
                    bgClass = 'bg-neutral-100 dark:bg-neutral-800';
                  }
                  // Step 2: highlight the matching cell
                  if (step >= 2 && rowIdx === matchRow && colIdx === 0) {
                    bgClass = `${colorClass} ring-2`;
                  }
                  // Step 3: highlight the row from match to result column
                  if (step >= 3 && rowIdx === matchRow && colIdx <= colOrRowIndex - 1) {
                    bgClass = 'bg-neutral-100 dark:bg-neutral-800';
                  }
                  // Step 4: highlight the result cell
                  if (step >= 4 && rowIdx === matchRow && colIdx === colOrRowIndex - 1) {
                    bgClass = `${colorClass} ring-2`;
                  }
                } else {
                  // HLOOKUP
                  if (step >= 1 && rowIdx === 0) {
                    bgClass = 'bg-neutral-100 dark:bg-neutral-800';
                  }
                  if (step >= 2 && rowIdx === 0 && colIdx === matchCol) {
                    bgClass = `${colorClass} ring-2`;
                  }
                  if (step >= 3 && colIdx === matchCol && rowIdx <= colOrRowIndex - 1) {
                    bgClass = 'bg-neutral-100 dark:bg-neutral-800';
                  }
                  if (step >= 4 && rowIdx === colOrRowIndex - 1 && colIdx === matchCol) {
                    bgClass = `${colorClass} ring-2`;
                  }
                }

                if (rowIdx === 0) {
                  bgClass += ' font-semibold bg-neutral-50 dark:bg-neutral-800/50';
                }

                return (
                  <td
                    key={colIdx}
                    className={`${bgClass} ${borderClass} p-3 min-w-[80px] text-center transition-colors duration-300`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {step >= 2 && ((type === 'vlookup' && rowIdx === matchRow && colIdx === 0) ||
                        (type === 'hlookup' && rowIdx === 0 && colIdx === matchCol)) && (
                        <CheckCircle2 className="w-4 h-4 text-neutral-600" />
                      )}
                      {cell}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </table>
      </div>

      {/* Step description */}
      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 space-y-2">
        {type === 'vlookup' ? (
          <>
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'}`}>
              <Search className="w-4 h-4" />
              <span className="text-sm">Step 1: Search for &quot;{lookupValue}&quot; in first column</span>
            </div>
            {step >= 2 && (
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Step 2: Found at row {matchRow + 1}</span>
              </div>
            )}
            {step >= 3 && (
              <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <ArrowRight className="w-4 h-4" />
                <span className="text-sm">Step 3: Move across to column {colOrRowIndex}</span>
              </div>
            )}
            {step >= 4 && (
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Step 4: Result = {result}</span>
              </div>
            )}
          </>
        ) : (
          <>
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'}`}>
              <Search className="w-4 h-4" />
              <span className="text-sm">Step 1: Search for &quot;{lookupValue}&quot; in first row</span>
            </div>
            {step >= 2 && (
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Step 2: Found at column {matchCol + 1}</span>
              </div>
            )}
            {step >= 3 && (
              <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                <ArrowDown className="w-4 h-4" />
                <span className="text-sm">Step 3: Move down to row {colOrRowIndex}</span>
              </div>
            )}
            {step >= 4 && (
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Step 4: Result = {result}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
