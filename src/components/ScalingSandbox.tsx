'use client';

import { useState, useMemo } from 'react';

export default function ScalingSandbox() {
  const [input, setInput] = useState('10, 20, 30, 40, 50');

  const numbers = useMemo(() => {
    return input.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
  }, [input]);

  const results = useMemo(() => {
    if (numbers.length === 0) return null;
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const variance = numbers.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / numbers.length;
    const std = Math.sqrt(variance);
    const range = max - min || 1;

    return {
      min, max, mean, std, range,
      minmax: numbers.map(n => ((n - min) / range).toFixed(3)),
      zscore: numbers.map(n => std > 0 ? ((n - mean) / std).toFixed(3) : '0.000'),
    };
  }, [numbers]);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-neutral-500 mb-1 block">Enter numbers (comma-separated)</label>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 font-mono text-sm focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none"
          placeholder="e.g. 10, 20, 30, 40, 50"
        />
      </div>

      {results && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { label: 'Min', value: results.min.toFixed(2) },
              { label: 'Max', value: results.max.toFixed(2) },
              { label: 'Mean', value: results.mean.toFixed(2) },
              { label: 'Std Dev', value: results.std.toFixed(2) },
              { label: 'Range', value: results.range.toFixed(2) },
            ].map(s => (
              <div key={s.label} className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded text-center">
                <div className="text-[10px] text-neutral-400 uppercase">{s.label}</div>
                <div className="text-sm font-bold font-mono">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-500">Original</th>
                  {numbers.map((n, i) => (
                    <td key={i} className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 text-center font-mono font-bold">{n}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 bg-neutral-50 dark:bg-neutral-900/20 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-600">Min-Max [0,1]</td>
                  {results.minmax.map((v, i) => (
                    <td key={i} className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 text-center font-mono text-neutral-600 dark:text-neutral-400">{v}</td>
                  ))}
                </tr>
                <tr>
                  <td className="px-3 py-2 bg-neutral-50 dark:bg-neutral-900/20 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-600">Z-Score (μ=0, σ=1)</td>
                  {results.zscore.map((v, i) => (
                    <td key={i} className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 text-center font-mono text-neutral-600 dark:text-neutral-400">{v}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Formulas */}
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3 space-y-1 text-xs font-mono text-neutral-500">
            <div>Min-Max: x&apos; = (x - {results.min}) / ({results.max} - {results.min}) = (x - {results.min}) / {results.range}</div>
            <div>Z-Score: z = (x - {results.mean.toFixed(2)}) / {results.std.toFixed(2)}</div>
          </div>
        </>
      )}
    </div>
  );
}
