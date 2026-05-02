'use client';

import { useState, useMemo } from 'react';

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

const W = 500;
const H = 280;
const PAD = { top: 20, right: 20, bottom: 40, left: 50 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

function scaleX(v: number) {
  return PAD.left + ((v - 0) / (10 - 0)) * plotW;
}
function scaleY(v: number) {
  return PAD.top + plotH - ((v - 0) / (80 - 0)) * plotH;
}

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

  // Build line points for prediction line (from x=0 to x=10)
  const lineStart = { x: 0, predicted: b1 * 0 + b0 };
  const lineEnd = { x: 10, predicted: b1 * 10 + b0 };

  // Grid lines
  const xTicks = [0, 2, 4, 6, 8, 10];
  const yTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80];

  return (
    <div className="space-y-4">
      {/* Sliders */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-neutral-500 mb-1 block">
            Slope (b₁): <span className="font-mono font-bold text-neutral-600">{b1}</span>
          </label>
          <input type="range" min="0" max="15" step="0.5" value={b1} onChange={e => setB1(Number(e.target.value))} className="w-full accent-neutral-900" />
          <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5"><span>0</span><span>7.5</span><span>15</span></div>
        </div>
        <div>
          <label className="text-xs font-medium text-neutral-500 mb-1 block">
            Intercept (b₀): <span className="font-mono font-bold text-neutral-600">{b0}</span>
          </label>
          <input type="range" min="0" max="40" step="1" value={b0} onChange={e => setB0(Number(e.target.value))} className="w-full accent-neutral-900" />
          <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5"><span>0</span><span>20</span><span>40</span></div>
        </div>
      </div>

      {/* Equation & Metrics */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="font-mono text-sm bg-neutral-50 dark:bg-neutral-800 px-3 py-2 rounded border border-border dark:border-border">
          y = <span className="text-neutral-600 font-bold">{b1}</span>x + <span className="text-neutral-600 font-bold">{b0}</span>
        </div>
        <div className="flex gap-3 text-xs">
          <div className="px-2 py-1 bg-neutral-50 dark:bg-neutral-900/20 rounded border border-neutral-200 dark:border-neutral-800">
            MSE: <span className="font-mono font-bold text-neutral-600">{mse}</span>
          </div>
          <div className="px-2 py-1 bg-neutral-50 dark:bg-neutral-900/20 rounded border border-neutral-200 dark:border-neutral-800">
            MAE: <span className="font-mono font-bold text-neutral-600">{mae}</span>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 300 }}>
          {/* Grid */}
          {yTicks.map(t => (
            <g key={`y-${t}`}>
              <line x1={PAD.left} y1={scaleY(t)} x2={W - PAD.right} y2={scaleY(t)} stroke="#e5e7eb" strokeWidth={0.5} strokeDasharray="3 3" />
              <text x={PAD.left - 8} y={scaleY(t) + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{t}</text>
            </g>
          ))}
          {xTicks.map(t => (
            <g key={`x-${t}`}>
              <line x1={scaleX(t)} y1={PAD.top} x2={scaleX(t)} y2={H - PAD.bottom} stroke="#e5e7eb" strokeWidth={0.5} strokeDasharray="3 3" />
              <text x={scaleX(t)} y={H - PAD.bottom + 16} textAnchor="middle" fontSize={10} fill="#9ca3af">{t}</text>
            </g>
          ))}

          {/* Axis labels */}
          <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={10} fill="#6b7280">Experience (years)</text>
          <text x={12} y={H / 2} textAnchor="middle" fontSize={10} fill="#6b7280" transform={`rotate(-90, 12, ${H / 2})`}>Salary ($K)</text>

          {/* Prediction line */}
          <line
            x1={scaleX(lineStart.x)} y1={scaleY(Math.min(Math.max(lineStart.predicted, 0), 80))}
            x2={scaleX(lineEnd.x)} y2={scaleY(Math.min(Math.max(lineEnd.predicted, 0), 80))}
            stroke="#404040" strokeWidth={2.5}
          />

          {/* Data points */}
          {chartData.map((d, i) => {
            const isError = Math.abs(d.error) > 5;
            return (
              <g key={i}>
                {/* Error line */}
                <line
                  x1={scaleX(d.x)} y1={scaleY(d.y)}
                  x2={scaleX(d.x)} y2={scaleY(Math.min(Math.max(d.predicted, 0), 80))}
                  stroke={isError ? '#404040' : '#a3a3a3'} strokeWidth={1} strokeDasharray="2 2" opacity={0.6}
                />
                {/* Point */}
                <circle
                  cx={scaleX(d.x)} cy={scaleY(d.y)} r={5}
                  fill={isError ? '#404040' : '#525252'}
                  stroke={isError ? '#262626' : '#404040'} strokeWidth={1.5}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Error breakdown */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-border dark:border-border text-left font-semibold text-neutral-500">Exp (x)</th>
              <th className="px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-border dark:border-border text-left font-semibold text-neutral-500">Actual (y)</th>
              <th className="px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-border dark:border-border text-left font-semibold text-neutral-500">Predicted</th>
              <th className="px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-border dark:border-border text-left font-semibold text-neutral-500">Error</th>
              <th className="px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-border dark:border-border text-left font-semibold text-neutral-500">Error²</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((d, i) => (
              <tr key={i}>
                <td className="px-2 py-1.5 border border-neutral-100 dark:border-neutral-800 font-mono">{d.x}</td>
                <td className="px-2 py-1.5 border border-neutral-100 dark:border-neutral-800 font-mono">{d.y}</td>
                <td className="px-2 py-1.5 border border-neutral-100 dark:border-neutral-800 font-mono text-neutral-600">{d.predicted.toFixed(1)}</td>
                <td className={`px-2 py-1.5 border border-neutral-100 dark:border-neutral-800 font-mono ${d.error > 0 ? 'text-neutral-600' : 'text-neutral-600'}`}>{d.error > 0 ? '+' : ''}{d.error.toFixed(1)}</td>
                <td className="px-2 py-1.5 border border-neutral-100 dark:border-neutral-800 font-mono">{Math.pow(d.error, 2).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-neutral-400 bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3">
        <span>🎯 Goal: Minimize MSE by adjusting b₁ and b₀</span>
        <span>Optimal: b₁={optimal.b1}, b₀={optimal.b0}</span>
      </div>
    </div>
  );
}
