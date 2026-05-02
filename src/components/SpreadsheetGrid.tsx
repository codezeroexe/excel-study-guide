'use client';

import { useState } from 'react';
import { evaluateSimpleFormula, cellRef } from '@/lib/cell-engine';

interface SpreadsheetGridProps {
  data: string[][];
  editable?: boolean;
  highlightCells?: Record<string, string>;
  showFormulas?: boolean;
}

export default function SpreadsheetGrid({
  data,
  editable = false,
  highlightCells = {},
  showFormulas = false,
}: SpreadsheetGridProps) {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [cellValues, setCellValues] = useState<Record<string, string>>({});

  const cols = data[0]?.length || 0;

  const getCellValue = (row: number, col: number): string => {
    const ref = cellRef(row, col);
    if (cellValues[ref] !== undefined) return cellValues[ref];
    const raw = data[row]?.[col] || '';
    if (showFormulas) return raw;
    if (raw.startsWith('=')) {
      return evaluateSimpleFormula(raw, data);
    }
    return raw;
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell(cellRef(row, col));
  };

  const handleCellChange = (row: number, col: number, value: string) => {
    const ref = cellRef(row, col);
    setCellValues(prev => ({ ...prev, [ref]: value }));
  };

  const getHighlight = (row: number, col: number): string | undefined => {
    const ref = cellRef(row, col);
    return highlightCells[ref];
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-10 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-1 text-xs font-medium text-neutral-500"></th>
            {Array.from({ length: cols }, (_, i) => (
              <th
                key={i}
                className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-1 text-xs font-medium text-neutral-500 min-w-[100px]"
              >
                {cellRef(0, i).replace(/\d/, '')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              <td className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-1 text-xs font-medium text-neutral-500 text-center">
                {rowIdx + 1}
              </td>
              {row.map((cell, colIdx) => {
                const ref = cellRef(rowIdx, colIdx);
                const isSelected = selectedCell === ref;
                const highlight = getHighlight(rowIdx, colIdx);
                const displayValue = getCellValue(rowIdx, colIdx);

                return (
                  <td
                    key={colIdx}
                    className={`border border-neutral-200 dark:border-neutral-700 p-2 min-w-[100px] max-w-[200px] truncate ${
                      isSelected
                        ? 'ring-2 ring-neutral-500 bg-neutral-50 dark:bg-neutral-950/20'
                        : highlight
                          ? highlight
                          : 'bg-white dark:bg-neutral-900'
                    } ${rowIdx === 0 ? 'font-semibold bg-neutral-50 dark:bg-neutral-800/50' : ''}`}
                    onClick={() => handleCellClick(rowIdx, colIdx)}
                  >
                    {editable && isSelected ? (
                      <input
                        type="text"
                        defaultValue={cell}
                        className="w-full bg-transparent outline-none text-sm"
                        onChange={(e) => handleCellChange(rowIdx, colIdx, e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <span className="text-neutral-900 dark:text-neutral-100">{displayValue}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCell && (
        <div className="px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500">
          Selected: <span className="font-mono font-medium">{selectedCell}</span>
          {cellValues[selectedCell] && (
            <span className="ml-2">Value: <span className="font-mono">{cellValues[selectedCell]}</span></span>
          )}
        </div>
      )}
    </div>
  );
}
