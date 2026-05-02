'use client';

import { useState } from 'react';

interface DataTableProps {
  data: string[][];
  title?: string;
  highlight?: Record<string, string>;
}

export default function DataTable({ data, title, highlight = {} }: DataTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  if (!data.length) return null;

  const headers = data[0];
  const rows = data.slice(1);

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <span className="text-xs font-medium text-neutral-500">{title}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`${
                  hoveredRow === rowIdx
                    ? 'bg-neutral-50 dark:bg-neutral-900/10'
                    : rowIdx % 2 === 0
                      ? 'bg-white dark:bg-neutral-900'
                      : 'bg-neutral-50/50 dark:bg-neutral-800/30'
                } transition-colors`}
                onMouseEnter={() => setHoveredRow(rowIdx)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {row.map((cell, colIdx) => {
                  const cellKey = `${rowIdx}-${colIdx}`;
                  const hlClass = highlight[cellKey] || '';
                  return (
                    <td
                      key={colIdx}
                      className={`px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 whitespace-nowrap ${hlClass}`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
