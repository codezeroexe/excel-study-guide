'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, CheckCircle2, Search } from 'lucide-react';

interface LookupAnimatorProps {
  type: 'vlookup' | 'hlookup';
  lookupValue: string;
  tableData: string[][];
  colOrRowIndex: number;
  result: string;
}

export default function LookupAnimator({
  type,
  lookupValue,
  tableData,
  colOrRowIndex,
  result,
}: LookupAnimatorProps) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalSteps = type === 'vlookup' ? 4 : 4;

  useEffect(() => {
    if (!isPlaying) return;
    if (step >= totalSteps) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => setStep(s => s + 1), 1200);
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
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPlaying ? 'Playing...' : 'Play Animation'}
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        <span className="text-xs text-gray-500 ml-2">Step {step}/{totalSteps}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="border-collapse text-sm">
          {tableData.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => {
                let bgClass = 'bg-white dark:bg-gray-900';
                let borderClass = 'border border-gray-200 dark:border-gray-700';

                if (type === 'vlookup') {
                  // Step 1: highlight first column (search column)
                  if (step >= 1 && colIdx === 0) {
                    bgClass = 'bg-blue-100 dark:bg-blue-900/30';
                  }
                  // Step 2: highlight the matching cell
                  if (step >= 2 && rowIdx === matchRow && colIdx === 0) {
                    bgClass = 'bg-green-200 dark:bg-green-900/40 ring-2 ring-green-500';
                  }
                  // Step 3: highlight the row from match to result column
                  if (step >= 3 && rowIdx === matchRow && colIdx <= colOrRowIndex - 1) {
                    bgClass = 'bg-yellow-100 dark:bg-yellow-900/30';
                  }
                  // Step 4: highlight the result cell
                  if (step >= 4 && rowIdx === matchRow && colIdx === colOrRowIndex - 1) {
                    bgClass = 'bg-green-300 dark:bg-green-800/50 ring-2 ring-green-600';
                  }
                } else {
                  // HLOOKUP
                  if (step >= 1 && rowIdx === 0) {
                    bgClass = 'bg-blue-100 dark:bg-blue-900/30';
                  }
                  if (step >= 2 && rowIdx === 0 && colIdx === matchCol) {
                    bgClass = 'bg-green-200 dark:bg-green-900/40 ring-2 ring-green-500';
                  }
                  if (step >= 3 && colIdx === matchCol && rowIdx <= colOrRowIndex - 1) {
                    bgClass = 'bg-yellow-100 dark:bg-yellow-900/30';
                  }
                  if (step >= 4 && rowIdx === colOrRowIndex - 1 && colIdx === matchCol) {
                    bgClass = 'bg-green-300 dark:bg-green-800/50 ring-2 ring-green-600';
                  }
                }

                if (rowIdx === 0) {
                  bgClass += ' font-semibold bg-gray-50 dark:bg-gray-800/50';
                }

                return (
                  <td
                    key={colIdx}
                    className={`${bgClass} ${borderClass} p-3 min-w-[80px] text-center transition-colors duration-300`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {step >= 2 && ((type === 'vlookup' && rowIdx === matchRow && colIdx === 0) ||
                        (type === 'hlookup' && rowIdx === 0 && colIdx === matchCol)) && (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
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
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
        {type === 'vlookup' ? (
          <>
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
              <Search className="w-4 h-4" />
              <span className="text-sm">Step 1: Search for &quot;{lookupValue}&quot; in first column</span>
            </div>
            {step >= 2 && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Step 2: Found at row {matchRow + 1}</span>
              </div>
            )}
            {step >= 3 && (
              <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                <ArrowRight className="w-4 h-4" />
                <span className="text-sm">Step 3: Move across to column {colOrRowIndex}</span>
              </div>
            )}
            {step >= 4 && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Step 4: Result = {result}</span>
              </div>
            )}
          </>
        ) : (
          <>
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
              <Search className="w-4 h-4" />
              <span className="text-sm">Step 1: Search for &quot;{lookupValue}&quot; in first row</span>
            </div>
            {step >= 2 && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Step 2: Found at column {matchCol + 1}</span>
              </div>
            )}
            {step >= 3 && (
              <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                <ArrowDown className="w-4 h-4" />
                <span className="text-sm">Step 3: Move down to row {colOrRowIndex}</span>
              </div>
            )}
            {step >= 4 && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
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
