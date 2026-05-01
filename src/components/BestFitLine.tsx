'use client';

import { useState, useMemo } from 'react';
import {
  ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ComposedChart,
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
      error: d.y - (b1 * d.x + b0),
    }));
  }, [b1, b0]);

  const mse = useMemo(() => {
    const errors = chartData.map(d => Math.pow(d.error, 2));
    return (errors.reduce((a, b) => a + b, 0) / errors.length).toFixed(1);
  }, [chartData]);

  const mae = useMemo(() => {
    const absErrors = chartData.map(d => Math.abs(d.error));
    return (absErrors.reduce((a, b) => a + b, 0) / absErrors.length).toFixed(1);
  }, [chartData]);

  // Calculate optimal line for comparison
  const optimal = useMemo(() => {
    const n = sampleData.length;
    const sumX = sampleData.reduce((s, d) => s + d.x, 0);
    const sumY = sampleData.reduce((s, d) => s + d.y, 0);
    const sumXY = sampleData.reduce((s, d) => s + d.x * d.y, 0);
    const sumX2 = sampleData.reduce((s, d) => s + d.x * d.x, 0);
    const optB1 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const optB0 = (sumY - optB1 * sumX) / n;
    return { b1: optB1.toFixed(2), b0: optB0.toFixed(2) };
  }, []);

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
          <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
            <span>0</span><span>7.5</span><span>15</span>
          </div>
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
          <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
            <span>0</span><span>20</span><span>40</span>
          </div>
        </div>
      </div>

      {/* Equation & Metrics */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="font-mono text-sm bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded border border-gray-200 dark:border-gray-700">
          y = <span className="text-blue-600 font-bold">{b1}</span>x + <span className="text-green-600 font-bold">{b0}</span>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
            MSE: <span className="font-mono font-bold text-amber-600">{mse}</span>
          </div>
          <div className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
            MAE: <span className="font-mono font-bold text-purple-600">{mae}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="x"
            type="number"
            domain={[0, 10]}
            tick={{ fontSize: 11 }}
            label={{ value: 'Experience (years)', position: 'insideBottom', offset: -5, fontSize: 10 }}
          />
          <YAxis
            domain={[0, 80]}
            tick={{ fontSize: 11 }}
            label={{ value: 'Salary ($K)', angle: -90, position: 'insideLeft', fontSize: 10 }}
          />
          <Tooltip
            formatter={(value, name) => {
              const v = typeof value === 'number' ? value : 0;
              const n = typeof name === 'string' ? name : '';
              if (n === 'Actual') return [`${v}K`, 'Actual Salary'] as const;
              if (n === 'Predicted') return [`${v}K`, 'Predicted'] as const;
              return [value, name] as const;
            }}
          />
          <Scatter name="Actual" data={chartData} fill="#3b82f6">
            {chartData.map((d, i) => (
              <Cell key={`cell-${i}`} fill={Math.abs(d.error) > 5 ? '#ef4444' : '#3b82f6'} />
            ))}
          </Scatter>
          <Line
            type="monotone"
            name="Predicted"
            dataKey="predicted"
            stroke="#ef4444"
            strokeWidth={2.5}
            dot={false}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Error breakdown */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left font-semibold text-gray-500">Exp (x)</th>
              <th className="px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left font-semibold text-gray-500">Actual (y)</th>
              <th className="px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left font-semibold text-gray-500">Predicted</th>
              <th className="px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left font-semibold text-gray-500">Error</th>
              <th className="px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left font-semibold text-gray-500">Error²</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((d, i) => (
              <tr key={i}>
                <td className="px-2 py-1.5 border border-gray-100 dark:border-gray-800 font-mono">{d.x}</td>
                <td className="px-2 py-1.5 border border-gray-100 dark:border-gray-800 font-mono">{d.y}</td>
                <td className="px-2 py-1.5 border border-gray-100 dark:border-gray-800 font-mono text-red-600">{d.predicted.toFixed(1)}</td>
                <td className={`px-2 py-1.5 border border-gray-100 dark:border-gray-800 font-mono ${d.error > 0 ? 'text-green-600' : 'text-red-600'}`}>{d.error > 0 ? '+' : ''}{d.error.toFixed(1)}</td>
                <td className="px-2 py-1.5 border border-gray-100 dark:border-gray-800 font-mono">{Math.pow(d.error, 2).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        <span>🎯 Goal: Minimize MSE by adjusting b₁ and b₀</span>
        <span>Optimal: b₁={optimal.b1}, b₀={optimal.b0}</span>
      </div>
    </div>
  );
}
