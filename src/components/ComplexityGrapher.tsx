'use client';

import { useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const complexityFunctions: Record<string, { label: string; color: string; fn: (n: number) => number }> = {
  O1: { label: 'O(1)', color: '#22c55e', fn: () => 1 },
  OlogN: { label: 'O(log n)', color: '#3b82f6', fn: (n) => Math.log2(n) },
  ON: { label: 'O(n)', color: '#f59e0b', fn: (n) => n },
  ONlogN: { label: 'O(n log n)', color: '#8b5cf6', fn: (n) => n * Math.log2(n) },
  ON2: { label: 'O(n²)', color: '#ef4444', fn: (n) => n * n },
};

export default function ComplexityGrapher() {
  const [active, setActive] = useState<Record<string, boolean>>({
    O1: true, OlogN: true, ON: true, ONlogN: true, ON2: false,
  });
  const [maxN, setMaxN] = useState(100);

  const chartData = useMemo(() => {
    const data = [];
    for (let n = 1; n <= maxN; n += Math.max(1, Math.floor(maxN / 50))) {
      const point: Record<string, number | string> = { n };
      for (const [key, { fn }] of Object.entries(complexityFunctions)) {
        if (active[key]) {
          point[key] = Math.min(fn(n), maxN * 10); // cap for visibility
        }
      }
      data.push(point);
    }
    return data;
  }, [active, maxN]);

  const toggle = (key: string) => setActive(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-4">
      {/* Toggle buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(complexityFunctions).map(([key, { label, color }]) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-full border-2 transition-all ${
              active[key]
                ? 'border-current text-white shadow-sm'
                : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'
            }`}
            style={active[key] ? { backgroundColor: color, borderColor: color } : {}}
          >
            {label}
          </button>
        ))}
      </div>

      {/* N slider */}
      <div>
        <label className="text-xs font-medium text-gray-500 mb-1 block">
          Max N: <span className="font-mono font-bold text-gray-700 dark:text-gray-300">{maxN}</span>
        </label>
        <input
          type="range"
          min="10"
          max="500"
          step="10"
          value={maxN}
          onChange={e => setMaxN(Number(e.target.value))}
          className="w-full accent-purple-600"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
          <span>10</span><span>250</span><span>500</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="n" tick={{ fontSize: 11 }} label={{ value: 'Input Size (n)', position: 'insideBottom', offset: -5, fontSize: 10 }} />
          <YAxis tick={{ fontSize: 11 }} label={{ value: 'Operations', angle: -90, position: 'insideLeft', fontSize: 10 }} />
          <Tooltip formatter={(value) => {
            const v = typeof value === 'number' ? value.toFixed(1) : value;
            return [v, ''] as const;
          }} />
          <Legend />
          {active.O1 && <Line type="monotone" dataKey="O1" name="O(1)" stroke={complexityFunctions.O1.color} strokeWidth={2} dot={false} />}
          {active.OlogN && <Line type="monotone" dataKey="OlogN" name="O(log n)" stroke={complexityFunctions.OlogN.color} strokeWidth={2} dot={false} />}
          {active.ON && <Line type="monotone" dataKey="ON" name="O(n)" stroke={complexityFunctions.ON.color} strokeWidth={2} dot={false} />}
          {active.ONlogN && <Line type="monotone" dataKey="ONlogN" name="O(n log n)" stroke={complexityFunctions.ONlogN.color} strokeWidth={2} dot={false} />}
          {active.ON2 && <Line type="monotone" dataKey="ON2" name="O(n²)" stroke={complexityFunctions.ON2.color} strokeWidth={2} dot={false} />}
        </LineChart>
      </ResponsiveContainer>

      <div className="text-xs text-gray-400 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        📈 Toggle curves to compare growth rates. Notice how O(n²) explodes while O(log n) stays flat.
      </div>
    </div>
  );
}
