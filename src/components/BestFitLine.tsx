'use client';

import { useState, useMemo } from 'react';
import {
  ScatterChart, Scatter, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const sampleData = [
  { x: 1, y: 26 },
  { x: 2, y: 34 },
  { x: 3, y: 38 },
  { x: 4, y: 42 },
  { x: 5, y: 48 },
  { x: 6, y: 52 },
  { x: 7, y: 58 },
  { x: 8, y: 62 },
];

export default function BestFitLine() {
  const [b1, setB1] = useState(5);
  const [b0, setB0] = useState(20);

  const chartData = useMemo(() => {
    return sampleData.map(d => ({
      ...d,
      predicted: b1 * d.x + b0,
    }));
  }, [b1, b0]);

  const mse = useMemo(() => {
    const errors = chartData.map(d => Math.pow(d.y - d.predicted, 2));
    return (errors.reduce((a, b) => a + b, 0) / errors.length).toFixed(1);
  }, [chartData]);

  return (
    <div className="space-y-4">
      {/* Sliders */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">
            Slope (b₁): <span className="font-mono font-bold text-blue-600">{b1}</span>
          </label>
          <input
            type="range"
            min="0"
            max="15"
            step="0.5"
            value={b1}
            onChange={e => setB1(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1 block">
            Intercept (b₀): <span className="font-mono font-bold text-green-600">{b0}</span>
          </label>
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            value={b0}
            onChange={e => setB0(Number(e.target.value))}
            className="w-full accent-green-600"
          />
        </div>
      </div>

      {/* Equation & MSE */}
      <div className="flex items-center gap-4">
        <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded">
          y = <span className="text-blue-600">{b1}</span>x + <span className="text-green-600">{b0}</span>
        </div>
        <div className="text-xs text-gray-500">
          MSE: <span className="font-mono font-bold text-amber-600">{mse}</span>
          <span className="ml-1">(lower = better fit)</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="x" type="number" domain={[0, 10]} tick={{ fontSize: 12 }} label={{ value: 'Experience (years)', position: 'insideBottom', offset: -5, fontSize: 11 }} />
          <YAxis domain={[0, 80]} tick={{ fontSize: 12 }} label={{ value: 'Salary ($K)', angle: -90, position: 'insideLeft', fontSize: 11 }} />
          <Tooltip />
          <Scatter name="Actual Data" data={chartData} fill="#3b82f6">
            {chartData.map((_, i) => (
              <Cell key={i} fill="#3b82f6" />
            ))}
          </Scatter>
          <Line type="linear" name="Prediction Line" dataKey="predicted" stroke="#ef4444" strokeWidth={2} dot={false} />
        </ScatterChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-400 text-center">
        Adjust sliders to minimize MSE. Best fit: b₁≈5, b₀≈20
      </p>
    </div>
  );
}
