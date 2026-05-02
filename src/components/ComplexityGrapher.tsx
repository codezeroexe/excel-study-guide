'use client';

import { useState, useMemo } from 'react';

const complexityFns: Record<string, { label: string; color: string; fn: (n: number) => number }> = {
  O1: { label: 'O(1)', color: '#737373', fn: () => 1 },
  OlogN: { label: 'O(log n)', color: '#525252', fn: (n) => Math.log2(n) },
  ON: { label: 'O(n)', color: '#a3a3a3', fn: (n) => n },
  ONlogN: { label: 'O(n log n)', color: '#525252', fn: (n) => n * Math.log2(n) },
  ON2: { label: 'O(n²)', color: '#404040', fn: (n) => n * n },
};

const W = 520;
const H = 300;
const PAD = { top: 20, right: 20, bottom: 40, left: 55 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

export default function ComplexityGrapher() {
  const [active, setActive] = useState<Record<string, boolean>>({
    O1: true, OlogN: true, ON: true, ONlogN: true, ON2: true,
  });
  const [maxN, setMaxN] = useState(100);
  const [logScale, setLogScale] = useState(true);

  const toggle = (key: string) => setActive(prev => ({ ...prev, [key]: !prev[key] }));

  // Compute max Y for scaling
  const maxY = useMemo(() => {
    let max = 1;
    for (const [key, { fn }] of Object.entries(complexityFns)) {
      if (active[key]) {
        const val = fn(maxN);
        if (val > max) max = val;
      }
    }
    return max;
  }, [active, maxN]);

  const logMaxY = Math.ceil(Math.log10(Math.max(maxY, 10)));

  const scaleX = (n: number) => PAD.left + (n / maxN) * plotW;

  const scaleY = (v: number) => {
    if (logScale) {
      const logV = Math.log10(Math.max(v, 0.5));
      return PAD.top + plotH - (logV / logMaxY) * plotH;
    }
    return PAD.top + plotH - (v / maxY) * plotH;
  };

  // Generate path data for each active curve
  const paths = (() => {
    const result: Record<string, string> = {};
    const steps = Math.min(maxN, 300);
    for (const [key, { fn }] of Object.entries(complexityFns)) {
      if (!active[key]) continue;
      let d = '';
      for (let i = 0; i <= steps; i++) {
        const n = Math.max((i / steps) * maxN, 0.5);
        const v = fn(n);
        const x = scaleX(n);
        const y = scaleY(v);
        d += (i === 0 ? 'M' : 'L') + `${x},${y}`;
      }
      result[key] = d;
    }
    return result;
  })();

  // Y-axis ticks
  const yTicks = useMemo(() => {
    if (logScale) {
      const ticks: number[] = [];
      for (let p = 0; p <= logMaxY; p++) {
        ticks.push(Math.pow(10, p));
      }
      return ticks;
    }
    const ticks: number[] = [];
    const step = maxY <= 50 ? 10 : maxY <= 500 ? 50 : maxY <= 5000 ? 500 : 5000;
    for (let t = 0; t <= maxY; t += step) ticks.push(t);
    return ticks;
  }, [maxY, logScale, logMaxY]);

  // X-axis ticks
  const xTicks = useMemo(() => {
    const ticks: number[] = [];
    const step = maxN <= 50 ? 10 : maxN <= 200 ? 50 : 100;
    for (let t = 0; t <= maxN; t += step) ticks.push(t);
    return ticks;
  }, [maxN]);

  const formatY = (v: number) => {
    if (logScale && v >= 1000) return `10^${Math.round(Math.log10(v))}`;
    if (v >= 1000000) return `${(v / 1000000).toFixed(0)}M`;
    if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
    return v.toFixed(0);
  };

  return (
    <div className="space-y-4">
      {/* Toggle buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(complexityFns).map(([key, { label, color }]) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-full border-2 transition-all ${
              active[key] ? 'text-white shadow-sm' : 'border-neutral-200 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500'
            }`}
            style={active[key] ? { backgroundColor: color, borderColor: color } : {}}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-xs font-medium text-neutral-500 mb-1 block">
            Max N: <span className="font-mono font-bold text-neutral-700 dark:text-neutral-300">{maxN}</span>
          </label>
          <input type="range" min="10" max="500" step="10" value={maxN} onChange={e => setMaxN(Number(e.target.value))} className="w-full accent-neutral-900" />
        </div>
        <div className="flex items-end">
          <button
            onClick={() => setLogScale(prev => !prev)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              logScale
                ? 'bg-neutral-100 dark:bg-neutral-900/30 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border-neutral-200 dark:border-neutral-700'
            }`}
          >
            {logScale ? '📊 Log Scale' : '📈 Linear Scale'}
          </button>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 320 }}>
          {/* Grid */}
          {yTicks.map(t => (
            <g key={`y-${t}`}>
              <line x1={PAD.left} y1={scaleY(t)} x2={W - PAD.right} y2={scaleY(t)} stroke="#e5e7eb" strokeWidth={0.5} strokeDasharray="3 3" />
              <text x={PAD.left - 8} y={scaleY(t) + 4} textAnchor="end" fontSize={9} fill="#9ca3af">{formatY(t)}</text>
            </g>
          ))}
          {xTicks.map(t => (
            <g key={`x-${t}`}>
              <line x1={scaleX(t)} y1={PAD.top} x2={scaleX(t)} y2={H - PAD.bottom} stroke="#e5e7eb" strokeWidth={0.5} strokeDasharray="3 3" />
              <text x={scaleX(t)} y={H - PAD.bottom + 16} textAnchor="middle" fontSize={10} fill="#9ca3af">{t}</text>
            </g>
          ))}

          {/* Axis labels */}
          <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={10} fill="#6b7280">Input Size (n)</text>
          <text x={12} y={H / 2} textAnchor="middle" fontSize={10} fill="#6b7280" transform={`rotate(-90, 12, ${H / 2})`}>
            Operations {logScale ? '(log scale)' : ''}
          </text>

          {/* Curves */}
          {Object.entries(paths).map(([key, d]) => (
            <path key={key} d={d} fill="none" stroke={complexityFns[key].color} strokeWidth={2.5} />
          ))}

          {/* Legend */}
          {Object.entries(complexityFns).filter(([key]) => active[key]).map(([key, { label, color }], i) => {
            const lx = PAD.left + 10;
            const ly = PAD.top + 15 + i * 18;
            return (
              <g key={`legend-${key}`}>
                <line x1={lx} y1={ly} x2={lx + 20} y2={ly} stroke={color} strokeWidth={2.5} />
                <text x={lx + 25} y={ly + 4} fontSize={10} fill="#374151" className="dark:fill-neutral-300">{label}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="text-xs text-neutral-400 text-center bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3">
        {logScale
          ? '📊 Log scale shows ALL curves clearly. Toggle to linear to see how O(n²) dwarfs everything.'
          : '📈 Linear scale — O(n²) dominates. Toggle curves off to see smaller ones.'
        }
      </div>
    </div>
  );
}
