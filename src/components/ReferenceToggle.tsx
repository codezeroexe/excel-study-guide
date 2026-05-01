'use client';

import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

interface ReferenceToggleProps {
  formula: string;
  description?: string;
}

export default function ReferenceToggle({ formula, description }: ReferenceToggleProps) {
  const [mode, setMode] = useState<'relative' | 'absolute' | 'mixed-col' | 'mixed-row'>('relative');

  const convertRef = (ref: string): string => {
    const match = ref.match(/([A-Z]+)(\d+)/i);
    if (!match) return ref;
    const col = match[1].toUpperCase();
    const row = match[2];

    switch (mode) {
      case 'relative': return `${col}${row}`;
      case 'absolute': return `$${col}$${row}`;
      case 'mixed-col': return `$${col}${row}`;
      case 'mixed-row': return `${col}$${row}`;
      default: return ref;
    }
  };

  const convertedFormula = formula.replace(/[A-Z]+\d+/gi, convertRef);

  const dragResults = {
    relative: {
      down: formula.replace(/([A-Z]+)(\d+)/gi, (_, col, row) => `${col}${parseInt(row) + 1}`),
      right: formula.replace(/([A-Z]+)(\d+)/gi, (match, col, row) => {
        const nextCol = String.fromCharCode(col.charCodeAt(0) + 1);
        return `${nextCol}${row}`;
      }),
    },
    absolute: {
      down: formula,
      right: formula,
    },
    'mixed-col': {
      down: formula.replace(/(\$?[A-Z]+)(\d+)/gi, (_, col, row) => `${col}${parseInt(row) + 1}`),
      right: formula,
    },
    'mixed-row': {
      down: formula,
      right: formula.replace(/([A-Z]+)(\$?\d+)/gi, (match, col, row) => {
        const nextCol = String.fromCharCode(col.charCodeAt(0) + 1);
        return `${nextCol}${row}`;
      }),
    },
  };

  const modeLabels = {
    relative: 'Relative (A2)',
    absolute: 'Absolute ($A$2)',
    'mixed-col': 'Mixed Col ($A2)',
    'mixed-row': 'Mixed Row (A$2)',
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(modeLabels) as Array<keyof typeof modeLabels>).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
              mode === m
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {m === 'absolute' ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            {modeLabels[m]}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
        <div>
          <span className="text-xs text-gray-500">Converted Formula:</span>
          <div className="font-mono text-sm text-blue-600 dark:text-blue-400 mt-1">{convertedFormula}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-xs text-gray-500">Drag Down →</span>
            <div className="font-mono text-xs text-green-600 dark:text-green-400 mt-1">{dragResults[mode].down}</div>
          </div>
          <div>
            <span className="text-xs text-gray-500">Drag Right →</span>
            <div className="font-mono text-xs text-amber-600 dark:text-amber-400 mt-1">{dragResults[mode].right}</div>
          </div>
        </div>
      </div>

      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
}
