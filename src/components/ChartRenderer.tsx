'use client';

import { useState } from 'react';

interface ChartRendererProps {
  type: 'column' | 'line' | 'pie' | 'scatter' | 'histogram' | 'combo';
  data: Record<string, unknown>[];
  title?: string;
  xKey?: string;
  yKeys?: string[];
  colors?: string[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const W = 500;
const H = 280;
const PAD = { top: 20, right: 20, bottom: 50, left: 55 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

function niceNum(range: number, round: boolean): number {
  const exp = Math.floor(Math.log10(range));
  const frac = range / Math.pow(10, exp);
  let nice: number;
  if (round) {
    if (frac < 1.5) nice = 1;
    else if (frac < 3) nice = 2;
    else if (frac < 7) nice = 5;
    else nice = 10;
  } else {
    if (frac <= 1) nice = 1;
    else if (frac <= 2) nice = 2;
    else if (frac <= 5) nice = 5;
    else nice = 10;
  }
  return nice * Math.pow(10, exp);
}

function getTicks(min: number, max: number, maxTicks = 6): number[] {
  const range = niceNum(max - min, false);
  const tickSpacing = niceNum(range / (maxTicks - 1), true);
  const niceMin = Math.floor(min / tickSpacing) * tickSpacing;
  const niceMax = Math.ceil(max / tickSpacing) * tickSpacing;
  const ticks: number[] = [];
  for (let t = niceMin; t <= niceMax + tickSpacing * 0.5; t += tickSpacing) {
    ticks.push(Math.round(t * 100) / 100);
  }
  return ticks;
}

export default function ChartRenderer({
  type,
  data,
  title,
  xKey = 'name',
  yKeys = ['value'],
  colors = COLORS,
}: ChartRendererProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-400 text-sm">No data to display</p>
      </div>
    );
  }

  const labels = data.map(d => String(d[xKey]));
  const allValues = yKeys.flatMap(key => data.map(d => Number(d[key]) || 0));
  const maxVal = Math.max(...allValues, 1);
  const yTicks = getTicks(0, maxVal);
  const yMax = yTicks[yTicks.length - 1] || maxVal;

  const scaleX = (i: number) => PAD.left + (i / Math.max(labels.length - 1, 1)) * plotW;
  const scaleY = (v: number) => PAD.top + plotH - (v / yMax) * plotH;
  const barWidth = Math.max(8, (plotW / labels.length) * 0.6);
  const barGap = plotW / labels.length;

  // Pie chart
  if (type === 'pie') {
    const total = data.reduce((s, d) => s + (Number(d[yKeys[0]]) || 0), 0);
    const cx = W / 2;
    const cy = H / 2;
    const r = Math.min(plotW, plotH) / 2 - 20;
    let cumAngle = -Math.PI / 2;

    const slices = data.map((d, i) => {
      const val = Number(d[yKeys[0]]) || 0;
      const angle = (val / Math.max(total, 1)) * Math.PI * 2;
      const startAngle = cumAngle;
      cumAngle += angle;
      const endAngle = cumAngle;
      const midAngle = (startAngle + endAngle) / 2;

      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const largeArc = angle > Math.PI ? 1 : 0;

      const path = angle >= Math.PI * 0.999
        ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`
        : `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      const pct = total > 0 ? ((val / total) * 100).toFixed(0) : '0';

      return { path, color: colors[i % colors.length], label: String(d[xKey]), pct, val };
    });

    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        {title && <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">{title}</h4>}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 300 }}>
          {slices.map((s, i) => (
            <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth={1} opacity={hoveredIdx === i ? 1 : 0.85}
              onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} />
          ))}
          {/* Legend */}
          {slices.map((s, i) => (
            <g key={`leg-${i}`} transform={`translate(${PAD.left}, ${H - PAD.bottom + 10 + Math.floor(i / 4) * 16})`}>
              <rect x={(i % 4) * 120} y={0} width={10} height={10} fill={s.color} rx={2} />
              <text x={(i % 4) * 120 + 14} y={9} fontSize={9} fill="#6b7280">{s.label} ({s.pct}%)</text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // Scatter chart
  if (type === 'scatter') {
    const xValues = data.map(d => Number(d[xKey]) || 0);
    const yValues = data.map(d => Number(d[yKeys[0]]) || 0);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMaxScatter = Math.max(...yValues, 1);
    const xTicksScatter = getTicks(xMin, xMax);
    const yTicksScatter = getTicks(0, yMaxScatter);
    const xRange = xMax - xMin || 1;
    const yRange = yMaxScatter;

    const sx = (v: number) => PAD.left + ((v - xMin) / xRange) * plotW;
    const sy = (v: number) => PAD.top + plotH - (v / yRange) * plotH;

    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        {title && <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">{title}</h4>}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 300 }}>
          {yTicksScatter.map(t => (
            <g key={`y-${t}`}>
              <line x1={PAD.left} y1={sy(t)} x2={W - PAD.right} y2={sy(t)} stroke="#e5e7eb" strokeWidth={0.5} strokeDasharray="3 3" />
              <text x={PAD.left - 8} y={sy(t) + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{t}</text>
            </g>
          ))}
          {xTicksScatter.map(t => (
            <g key={`x-${t}`}>
              <line x1={sx(t)} y1={PAD.top} x2={sx(t)} y2={H - PAD.bottom} stroke="#e5e7eb" strokeWidth={0.5} strokeDasharray="3 3" />
              <text x={sx(t)} y={H - PAD.bottom + 16} textAnchor="middle" fontSize={10} fill="#9ca3af">{t}</text>
            </g>
          ))}
          {data.map((d, i) => (
            <circle key={i} cx={sx(Number(d[xKey]) || 0)} cy={sy(Number(d[yKeys[0]]) || 0)} r={5}
              fill={colors[0]} stroke={colors[0]} strokeWidth={1.5} opacity={0.8} />
          ))}
        </svg>
      </div>
    );
  }

  // Column / Bar / Histogram
  if (type === 'column' || type === 'histogram') {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        {title && <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">{title}</h4>}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 300 }}>
          {/* Grid */}
          {yTicks.map(t => (
            <g key={`y-${t}`}>
              <line x1={PAD.left} y1={scaleY(t)} x2={W - PAD.right} y2={scaleY(t)} stroke="#e5e7eb" strokeWidth={0.5} strokeDasharray="3 3" />
              <text x={PAD.left - 8} y={scaleY(t) + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{t}</text>
            </g>
          ))}
          {/* Bars */}
          {data.map((d, i) => {
            const x = PAD.left + i * barGap + (barGap - barWidth * yKeys.length) / 2;
            return (
              <g key={i}>
                {yKeys.map((key, ki) => {
                  const val = Number(d[key]) || 0;
                  const barH = (val / yMax) * plotH;
                  const bx = x + ki * barWidth;
                  const by = PAD.top + plotH - barH;
                  return (
                    <rect key={key} x={bx} y={by} width={barWidth} height={barH}
                      fill={colors[ki % colors.length]} rx={3} opacity={hoveredIdx === i ? 1 : 0.8}
                      onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} />
                  );
                })}
                {/* X label */}
                <text x={PAD.left + i * barGap + barGap / 2} y={H - PAD.bottom + 16}
                  textAnchor="middle" fontSize={9} fill="#9ca3af"
                  transform={`rotate(-30, ${PAD.left + i * barGap + barGap / 2}, ${H - PAD.bottom + 16})`}>
                  {labels[i]}
                </text>
              </g>
            );
          })}
          {/* Legend */}
          {yKeys.length > 1 && yKeys.map((key, i) => (
            <g key={`leg-${i}`} transform={`translate(${PAD.left + i * 80}, ${H - 8})`}>
              <rect x={0} y={-8} width={10} height={10} fill={colors[i % colors.length]} rx={2} />
              <text x={14} y={0} fontSize={9} fill="#6b7280">{key}</text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // Line chart
  if (type === 'line') {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        {title && <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">{title}</h4>}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 300 }}>
          {/* Grid */}
          {yTicks.map(t => (
            <g key={`y-${t}`}>
              <line x1={PAD.left} y1={scaleY(t)} x2={W - PAD.right} y2={scaleY(t)} stroke="#e5e7eb" strokeWidth={0.5} strokeDasharray="3 3" />
              <text x={PAD.left - 8} y={scaleY(t) + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{t}</text>
            </g>
          ))}
          {/* X labels */}
          {labels.map((label, i) => (
            <text key={i} x={scaleX(i)} y={H - PAD.bottom + 16} textAnchor="middle" fontSize={9} fill="#9ca3af"
              transform={`rotate(-30, ${scaleX(i)}, ${H - PAD.bottom + 16})`}>
              {label}
            </text>
          ))}
          {/* Lines */}
          {yKeys.map((key, ki) => {
            const points = data.map((d, i) => `${scaleX(i)},${scaleY(Number(d[key]) || 0)}`).join(' ');
            return (
              <g key={key}>
                <polyline points={points} fill="none" stroke={colors[ki % colors.length]} strokeWidth={2.5} />
                {data.map((d, i) => (
                  <circle key={i} cx={scaleX(i)} cy={scaleY(Number(d[key]) || 0)} r={4}
                    fill={colors[ki % colors.length]} stroke="white" strokeWidth={1.5} />
                ))}
              </g>
            );
          })}
          {/* Legend */}
          {yKeys.length > 1 && yKeys.map((key, i) => (
            <g key={`leg-${i}`} transform={`translate(${PAD.left + i * 80}, ${H - 8})`}>
              <line x1={0} y1={-4} x2={14} y2={-4} stroke={colors[i % colors.length]} strokeWidth={2.5} />
              <text x={18} y={0} fontSize={9} fill="#6b7280">{key}</text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // Combo chart (bar + line)
  if (type === 'combo') {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        {title && <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">{title}</h4>}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 300 }}>
          {/* Grid */}
          {yTicks.map(t => (
            <g key={`y-${t}`}>
              <line x1={PAD.left} y1={scaleY(t)} x2={W - PAD.right} y2={scaleY(t)} stroke="#e5e7eb" strokeWidth={0.5} strokeDasharray="3 3" />
              <text x={PAD.left - 8} y={scaleY(t) + 4} textAnchor="end" fontSize={10} fill="#9ca3af">{t}</text>
            </g>
          ))}
          {/* Bars (first yKey) */}
          {data.map((d, i) => {
            const val = Number(d[yKeys[0]]) || 0;
            const barH = (val / yMax) * plotH;
            const bx = PAD.left + i * barGap + (barGap - barWidth) / 2;
            const by = PAD.top + plotH - barH;
            return (
              <g key={i}>
                <rect x={bx} y={by} width={barWidth} height={barH} fill={colors[0]} rx={3} opacity={0.8} />
                <text x={PAD.left + i * barGap + barGap / 2} y={H - PAD.bottom + 16}
                  textAnchor="middle" fontSize={9} fill="#9ca3af"
                  transform={`rotate(-30, ${PAD.left + i * barGap + barGap / 2}, ${H - PAD.bottom + 16})`}>
                  {labels[i]}
                </text>
              </g>
            );
          })}
          {/* Line (second yKey) */}
          {yKeys[1] && (
            <g>
              <polyline
                points={data.map((d, i) => `${scaleX(i)},${scaleY(Number(d[yKeys[1]]) || 0)}`).join(' ')}
                fill="none" stroke={colors[1]} strokeWidth={2.5}
              />
              {data.map((d, i) => (
                <circle key={i} cx={scaleX(i)} cy={scaleY(Number(d[yKeys[1]]) || 0)} r={4}
                  fill={colors[1]} stroke="white" strokeWidth={1.5} />
              ))}
            </g>
          )}
          {/* Legend */}
          {yKeys.map((key, i) => (
            <g key={`leg-${i}`} transform={`translate(${PAD.left + i * 100}, ${H - 8})`}>
              {i === 0 ? (
                <rect x={0} y={-10} width={10} height={10} fill={colors[i]} rx={2} />
              ) : (
                <line x1={0} y1={-5} x2={14} y2={-5} stroke={colors[i]} strokeWidth={2.5} />
              )}
              <text x={14} y={0} fontSize={9} fill="#6b7280">{key}</text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  return null;
}
