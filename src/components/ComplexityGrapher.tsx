'use client';

import { useState, useMemo } from 'react';

const W = 520;
const H = 300;
const PAD = { top: 20, right: 20, bottom: 40, left: 55 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

interface ComplexityGrapherProps {
  subjectColor?: string;
}

export default function ComplexityGrapher({ subjectColor = 'accent' }: ComplexityGrapherProps) {
  const colorMap: Record<string, string> = {
    green: '#22c55e',
    blue: '#3b82f6',
    purple: '#a855f7',
    amber: '#f59e0b',
    rose: '#f43f5e',
  };
  const subjectColorValue = colorMap[subjectColor] || '#a3a3a3';

  const complexityFns: Record<string, { label: string; color: string; fn: (n: number) => number }> = {
    O1: { label: 'O(1)', color: subjectColorValue, fn: () => 1 },
    OlogN: { label: 'O(log n)', color: subjectColorValue, fn: (n) => Math.log2(n) },
    ON: { label: 'O(n)', color: subjectColorValue, fn: (n) => n },
    ONlogN: { label: 'O(n log n)', color: subjectColorValue, fn: (n) => n * Math.log2(n) },
    ON2: { label: 'O(n²)', color: subjectColorValue, fn: (n) => n * n },
  };

  const [active, setActive] = useState<Record<string, boolean>>({
    O1: true, OlogN: true, ON: true, ONlogN: true, ON2: true,
  });
  const [maxN, setMaxN] = useState(100);
  const [logScale, setLogScale] = useState(true);

  const toggle = (key: string) => setActive(prev => ({ ...prev, [key]: !prev[key] }));

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

  const generatePath = (fn: (n: number) => number) => {
    const points: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const n = (i / 100) * maxN;
      const x = scaleX(n);
      const y = scaleY(fn(n));
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1.5">
          {Object.entries(complexityFns).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`px-2 py-1 text-[10px] font-bold rounded border transition-all ${active[key] ? '' : 'opacity-30'}`}
              style={active[key] ? { backgroundColor: subjectColorValue + '20', borderColor: subjectColorValue, color: subjectColorValue } : {}}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500">Max N:</label>
          <input
            type="range" min="10" max="500" value={maxN}
            onChange={e => setMaxN(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-xs font-mono w-8">{maxN}</span>
        </div>
        <button
          onClick={() => setLogScale(!logScale)}
          className={`px-2 py-1 text-[10px] font-bold rounded border transition-all ${logScale ? '' : 'opacity-50'}`}
          style={logScale ? { backgroundColor: subjectColorValue + '20', borderColor: subjectColorValue, color: subjectColorValue } : {}}
        >
          Log Scale
        </button>
      </div>

      {/* SVG Chart */}
      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {/* Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map(frac => {
            const y = PAD.top + plotH * (1 - frac);
            return (
              <g key={frac}>
                <line x1={PAD.left} y1={y} x2={PAD.left + plotW} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
                <text x={PAD.left - 4} y={y + 3} textAnchor="end" fontSize={8} fill="#9ca3af">
                  {logScale ? Math.pow(10, frac * logMaxY).toFixed(0) : (maxY * frac).toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Lines */}
          {Object.entries(complexityFns).filter(([key]) => active[key]).map(([key, { fn }]) => (
            <path
              key={key}
              d={generatePath(fn)}
              fill="none"
              stroke={subjectColorValue}
              strokeWidth="2"
              strokeDasharray={key === 'O1' ? '4,4' : key === 'OlogN' ? '8,4' : key === 'ON' ? '' : key === 'ONlogN' ? '12,4' : '2,2'}
            />
          ))}

          {/* Axes */}
          <line x1={PAD.left} y1={PAD.top + plotH} x2={PAD.left + plotW} y2={PAD.top + plotH} stroke="#d1d5db" strokeWidth="1" />
          <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + plotH} stroke="#d1d5db" strokeWidth="1" />
        </svg>
      </div>

      <div className="text-xs text-neutral-400 text-center bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3">
        📈 Toggle functions on/off. O(1) = constant, O(n²) = quadratic. Log scale helps compare exponential growth.
      </div>
    </div>
  );
}
