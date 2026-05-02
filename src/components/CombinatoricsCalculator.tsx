'use client';

import { useState } from 'react';

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function nPr(n: number, r: number): number {
  if (r > n) return 0;
  return factorial(n) / factorial(n - r);
}

function nCr(n: number, r: number): number {
  if (r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

export default function CombinatoricsCalculator() {
  const [n, setN] = useState(5);
  const [r, setR] = useState(3);
  const [mode, setMode] = useState<'permutation' | 'combination'>('permutation');

  const result = mode === 'permutation' ? nPr(n, r) : nCr(n, r);
  const formula = mode === 'permutation'
    ? `P(${n},${r}) = ${n}! / (${n}-${r})! = ${n}! / ${n - r}!`
    : `C(${n},${r}) = ${n}! / (${r}! × (${n}-${r})!) = ${n}! / (${r}! × ${n - r}!)`;

  const arrangements = mode === 'permutation' && n <= 8 && r <= n
    ? generateArrangements(n, r)
    : null;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2">
          <button onClick={() => setMode('permutation')} className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all ${mode === 'permutation' ? 'bg-accent text-accent-text border-neutral-600' : 'border-border dark:border-border text-neutral-400'}`}>
            Permutation (order matters)
          </button>
          <button onClick={() => setMode('combination')} className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all ${mode === 'combination' ? 'bg-accent text-accent-text border-neutral-600' : 'border-border dark:border-border text-neutral-400'}`}>
            Combination (order does not)
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500">n:</label>
          <input type="number" min="1" max="20" value={n} onChange={e => setN(Math.min(20, Math.max(1, Number(e.target.value))))} className="w-14 px-1 py-0.5 text-center bg-white dark:bg-neutral-800 border border-border dark:border-border rounded font-mono text-xs" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500">r:</label>
          <input type="number" min="0" max={n} value={r} onChange={e => setR(Math.min(n, Math.max(0, Number(e.target.value))))} className="w-14 px-1 py-0.5 text-center bg-white dark:bg-neutral-800 border border-border dark:border-border rounded font-mono text-xs" />
        </div>
      </div>

      {/* Result */}
      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border p-4">
        <div className="text-3xl font-bold font-mono text-neutral-600">{result.toLocaleString()}</div>
        <div className="text-xs text-neutral-500 mt-1 font-mono">{formula}</div>
        <div className="text-xs text-neutral-400 mt-2">
          {mode === 'permutation'
            ? `Number of ways to arrange ${r} items from ${n} (order matters)`
            : `Number of ways to choose ${r} items from ${n} (order doesn't matter)`
          }
        </div>
      </div>

      {/* Visual arrangements (small n only) */}
      {arrangements && arrangements.length > 0 && (
        <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
          <div className="text-xs font-bold text-neutral-500 mb-2">
            All {arrangements.length} {mode === 'permutation' ? 'arrangements' : 'combinations'}:
          </div>
          <div className="flex flex-wrap gap-1">
            {arrangements.map((a, i) => (
              <span key={i} className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-neutral-700 rounded border border-neutral-200 dark:border-neutral-600">
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-neutral-50 dark:bg-neutral-900/20 rounded text-center">
          <div className="text-[10px] text-neutral-400 uppercase">P(n,r)</div>
          <div className="text-lg font-bold font-mono text-neutral-600">{nPr(n, r).toLocaleString()}</div>
        </div>
        <div className="p-2 bg-neutral-50 dark:bg-neutral-900/20 rounded text-center">
          <div className="text-[10px] text-neutral-400 uppercase">C(n,r)</div>
          <div className="text-lg font-bold font-mono text-neutral-600">{nCr(n, r).toLocaleString()}</div>
        </div>
      </div>

      <div className="text-xs text-neutral-400 text-center bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3">
        {mode === 'permutation'
          ? '📦 Permutation: ABC ≠ BAC — order matters. More arrangements.'
          : '📋 Combination: {A,B,C} = {B,A,C} — order doesn\'t matter. Fewer selections.'
        }
      </div>
    </div>
  );
}

function generateArrangements(n: number, r: number): string[] {
  const items = Array.from({ length: n }, (_, i) => String.fromCharCode(65 + i));
  const results: string[] = [];

  function permute(current: string[], remaining: string[]) {
    if (current.length === r) {
      results.push(current.join(''));
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      permute([...current, remaining[i]], [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
    }
  }

  function combine(current: string[], start: number) {
    if (current.length === r) {
      results.push(current.join(''));
      return;
    }
    for (let i = start; i < items.length; i++) {
      combine([...current, items[i]], i + 1);
    }
  }

  if (results.length < 200) {
    permute([], items);
  } else {
    combine([], 0);
  }

  return results.slice(0, 200);
}
