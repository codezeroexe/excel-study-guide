'use client';

import { useState, useMemo } from 'react';

function normalPDF(x: number, mu: number, sigma: number): number {
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
}

function binomialPMF(x: number, n: number, p: number): number {
  if (x < 0 || x > n || x !== Math.floor(x)) return 0;
  let result = 1;
  for (let i = 0; i < x; i++) result *= (n - i) / (i + 1);
  return result * Math.pow(p, x) * Math.pow(1 - p, n - x);
}

function poissonPMF(x: number, lambda: number): number {
  if (x < 0 || x !== Math.floor(x)) return 0;
  let factorial = 1;
  for (let i = 2; i <= x; i++) factorial *= i;
  return (Math.exp(-lambda) * Math.pow(lambda, x)) / factorial;
}

function exponentialPDF(x: number, lambda: number): number {
  if (x < 0) return 0;
  return lambda * Math.exp(-lambda * x);
}

type DistType = 'normal' | 'binomial' | 'poisson' | 'exponential';

const W = 500;
const H = 220;
const PAD = { top: 20, right: 20, bottom: 30, left: 40 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

export default function DistributionVisualizer() {
  const [dist, setDist] = useState<DistType>('normal');
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [n, setN] = useState(20);
  const [p, setP] = useState(0.5);
  const [lambda, setLambda] = useState(3);

  const data = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    if (dist === 'normal') {
      const range = 4 * sigma;
      for (let i = 0; i <= 100; i++) {
        const x = mu - range + (2 * range * i) / 100;
        points.push({ x, y: normalPDF(x, mu, sigma) });
      }
    } else if (dist === 'binomial') {
      for (let x = 0; x <= n; x++) {
        points.push({ x, y: binomialPMF(x, n, p) });
      }
    } else if (dist === 'poisson') {
      const maxX = Math.max(lambda * 3, 10);
      for (let x = 0; x <= maxX; x++) {
        points.push({ x, y: poissonPMF(x, lambda) });
      }
    } else {
      const maxX = 5 / lambda;
      for (let i = 0; i <= 100; i++) {
        const x = (maxX * i) / 100;
        points.push({ x, y: exponentialPDF(x, lambda) });
      }
    }
    return points;
  }, [dist, mu, sigma, n, p, lambda]);

  const maxY = Math.max(...data.map(d => d.y), 0.001);
  const minX = Math.min(...data.map(d => d.x));
  const maxX = Math.max(...data.map(d => d.x));
  const rangeX = maxX - minX || 1;

  const toSvg = (x: number, y: number) => ({
    sx: PAD.left + ((x - minX) / rangeX) * plotW,
    sy: PAD.top + plotH - (y / maxY) * plotH,
  });

  const pathD = data.map((d, i) => {
    const { sx, sy } = toSvg(d.x, d.y);
    return `${i === 0 ? 'M' : 'L'} ${sx} ${sy}`;
  }).join(' ');

  const areaD = pathD + ` L ${PAD.left + plotW} ${PAD.top + plotH} L ${PAD.left} ${PAD.top + plotH} Z`;

  const isDiscrete = dist === 'binomial' || dist === 'poisson';

  return (
    <div className="space-y-4">
      {/* Distribution selector */}
      <div className="flex flex-wrap gap-2">
        {([['normal', 'Normal'], ['binomial', 'Binomial'], ['poisson', 'Poisson'], ['exponential', 'Exponential']] as [DistType, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setDist(key)} className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all ${dist === key ? 'bg-neutral-900 text-white border-neutral-600' : 'border-neutral-200 dark:border-neutral-700 text-neutral-400'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Parameters */}
      <div className="flex flex-wrap gap-4">
        {dist === 'normal' && (
          <>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-500">μ:</label>
              <input type="range" min="-5" max="5" step="0.5" value={mu} onChange={e => setMu(Number(e.target.value))} className="w-24" />
              <span className="text-xs font-mono w-8">{mu}</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-500">σ:</label>
              <input type="range" min="0.5" max="4" step="0.1" value={sigma} onChange={e => setSigma(Number(e.target.value))} className="w-24" />
              <span className="text-xs font-mono w-8">{sigma}</span>
            </div>
          </>
        )}
        {dist === 'binomial' && (
          <>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-500">n:</label>
              <input type="range" min="1" max="50" step="1" value={n} onChange={e => setN(Number(e.target.value))} className="w-24" />
              <span className="text-xs font-mono w-8">{n}</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-neutral-500">p:</label>
              <input type="range" min="0.05" max="0.95" step="0.05" value={p} onChange={e => setP(Number(e.target.value))} className="w-24" />
              <span className="text-xs font-mono w-8">{p}</span>
            </div>
          </>
        )}
        {dist === 'poisson' && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-neutral-500">λ:</label>
            <input type="range" min="0.5" max="15" step="0.5" value={lambda} onChange={e => setLambda(Number(e.target.value))} className="w-24" />
            <span className="text-xs font-mono w-8">{lambda}</span>
          </div>
        )}
        {dist === 'exponential' && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-neutral-500">λ:</label>
            <input type="range" min="0.1" max="5" step="0.1" value={lambda} onChange={e => setLambda(Number(e.target.value))} className="w-24" />
            <span className="text-xs font-mono w-8">{lambda}</span>
          </div>
        )}
      </div>

      {/* SVG Chart */}
      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(frac => {
            const y = PAD.top + plotH * (1 - frac);
            return (
              <g key={frac}>
                <line x1={PAD.left} y1={y} x2={PAD.left + plotW} y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
                <text x={PAD.left - 4} y={y + 3} textAnchor="end" fontSize={8} fill="#9ca3af">{(maxY * frac).toFixed(3)}</text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaD} fill="rgba(244,63,94,0.1)" />

          {isDiscrete ? (
            /* Bar chart for discrete */
            data.map((d, i) => {
              const { sx, sy } = toSvg(d.x, d.y);
              const barW = Math.max(2, plotW / data.length - 1);
              return (
                <g key={i}>
                  <rect x={sx - barW / 2} y={sy} width={barW} height={PAD.top + plotH - sy} fill="rgba(244,63,94,0.6)" rx="1" />
                  <text x={sx} y={PAD.top + plotH + 12} textAnchor="middle" fontSize={7} fill="#9ca3af">{d.x}</text>
                </g>
              );
            })
          ) : (
            /* Line for continuous */
            <>
              <path d={pathD} fill="none" stroke="#525252" strokeWidth="2" />
              {/* Mean line */}
              {dist === 'normal' && (() => {
                const { sx } = toSvg(mu, 0);
                return <line x1={sx} y1={PAD.top} x2={sx} y2={PAD.top + plotH} stroke="#525252" strokeWidth="1" strokeDasharray="4,4" />;
              })()}
            </>
          )}

          {/* X axis */}
          <line x1={PAD.left} y1={PAD.top + plotH} x2={PAD.left + plotW} y2={PAD.top + plotH} stroke="#d1d5db" strokeWidth="1" />
          {/* Y axis */}
          <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + plotH} stroke="#d1d5db" strokeWidth="1" />
        </svg>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded text-center">
          <div className="text-[10px] text-neutral-400 uppercase">Mean</div>
          <div className="text-sm font-bold font-mono">
            {dist === 'normal' ? mu : dist === 'binomial' ? (n * p).toFixed(1) : dist === 'poisson' ? lambda : (1 / lambda).toFixed(2)}
          </div>
        </div>
        <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded text-center">
          <div className="text-[10px] text-neutral-400 uppercase">Variance</div>
          <div className="text-sm font-bold font-mono">
            {dist === 'normal' ? (sigma * sigma).toFixed(2) : dist === 'binomial' ? (n * p * (1 - p)).toFixed(2) : dist === 'poisson' ? lambda : (1 / (lambda * lambda)).toFixed(3)}
          </div>
        </div>
        <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded text-center">
          <div className="text-[10px] text-neutral-400 uppercase">Type</div>
          <div className="text-sm font-bold">{isDiscrete ? 'Discrete' : 'Continuous'}</div>
        </div>
        <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded text-center">
          <div className="text-[10px] text-neutral-400 uppercase">Peak</div>
          <div className="text-sm font-bold font-mono">{maxY.toFixed(4)}</div>
        </div>
      </div>

      <div className="text-xs text-neutral-400 text-center bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3">
        {dist === 'normal' && '🔔 Bell-shaped, symmetric. 68-95-99.7 rule: ±1σ, ±2σ, ±3σ.'}
        {dist === 'binomial' && '📊 Fixed trials, binary outcomes. Approaches normal as n increases.'}
        {dist === 'poisson' && '📈 Rare events over fixed interval. Mean = Variance = λ.'}
        {dist === 'exponential' && '⏱️ Waiting time between events. Memoryless property.'}
      </div>
    </div>
  );
}
