'use client';

import { useState } from 'react';

type TestType = 'z' | 't' | 'chi';

const zCritical: Record<string, number> = { '0.01': 2.576, '0.05': 1.96, '0.10': 1.645 };

function tCritical(df: number, alpha: number): number {
  // Approximation using inverse t-distribution
  const z = zCritical[alpha.toFixed(2)] || 1.96;
  // Cornish-Fisher expansion approximation
  const g = (z * z * z + z) / (4 * df) + (5 * z * z * z * z * z + 16 * z * z * z + 3 * z) / (96 * df * df);
  return z + g;
}

function chiSquareCritical(df: number, alpha: number): number {
  // Wilson-Hilferty approximation
  const z = zCritical[alpha.toFixed(2)] || 1.96;
  return df * Math.pow(1 - 2 / (9 * df) + z * Math.sqrt(2 / (9 * df)), 3);
}

export default function HypothesisTestCalc() {
  const [testType, setTestType] = useState<TestType>('z');
  const [sampleMean, setSampleMean] = useState(75);
  const [popMean, setPopMean] = useState(70);
  const [stdDev, setStdDev] = useState(10);
  const [sampleSize, setSampleSize] = useState(36);
  const [alpha, setAlpha] = useState(0.05);
  const [tail, setTail] = useState<'two' | 'left' | 'right'>('two');

  // Chi-square inputs
  const [observed, setObserved] = useState('20,15,10,15');
  const [expected, setExpected] = useState('15,15,15,15');

  let testStat = 0;
  let criticalVal = 0;
  let pValue = 0;
  let reject = false;
  let steps: string[] = [];

  if (testType === 'z') {
    const se = stdDev / Math.sqrt(sampleSize);
    testStat = (sampleMean - popMean) / se;
    criticalVal = zCritical[alpha.toFixed(2)] || 1.96;
    // Approximate p-value using normal CDF approximation
    pValue = normalCDF(-Math.abs(testStat)) * (tail === 'two' ? 2 : 1);
    reject = tail === 'two' ? Math.abs(testStat) > criticalVal : tail === 'right' ? testStat > criticalVal : testStat < -criticalVal;
    steps = [
      `SE = σ/√n = ${stdDev}/√${sampleSize} = ${se.toFixed(4)}`,
      `Z = (x̄ - μ) / SE = (${sampleMean} - ${popMean}) / ${se.toFixed(4)} = ${testStat.toFixed(4)}`,
      `Critical Z (α=${alpha}, ${tail}-tailed) = ±${criticalVal}`,
      `|Z| = ${Math.abs(testStat).toFixed(4)} ${reject ? '>' : '≤'} ${criticalVal} → ${reject ? 'Reject H₀' : 'Fail to reject H₀'}`,
      `p-value ≈ ${pValue.toFixed(4)} ${pValue <= alpha ? '≤' : '>'} ${alpha} → ${reject ? 'Reject H₀' : 'Fail to reject H₀'}`,
    ];
  } else if (testType === 't') {
    const se = stdDev / Math.sqrt(sampleSize);
    testStat = (sampleMean - popMean) / se;
    const df = sampleSize - 1;
    criticalVal = tCritical(df, alpha);
    pValue = normalCDF(-Math.abs(testStat)) * (tail === 'two' ? 2 : 1);
    reject = tail === 'two' ? Math.abs(testStat) > criticalVal : tail === 'right' ? testStat > criticalVal : testStat < -criticalVal;
    steps = [
      `df = n - 1 = ${sampleSize} - 1 = ${df}`,
      `SE = s/√n = ${stdDev}/√${sampleSize} = ${se.toFixed(4)}`,
      `t = (x̄ - μ) / SE = (${sampleMean} - ${popMean}) / ${se.toFixed(4)} = ${testStat.toFixed(4)}`,
      `Critical t (df=${df}, α=${alpha}) = ±${criticalVal.toFixed(4)}`,
      `|t| = ${Math.abs(testStat).toFixed(4)} ${reject ? '>' : '≤'} ${criticalVal.toFixed(4)} → ${reject ? 'Reject H₀' : 'Fail to reject H₀'}`,
    ];
  } else {
    const obs = observed.split(',').map(Number);
    const exp = expected.split(',').map(Number);
    if (obs.length === exp.length && obs.length > 0) {
      testStat = obs.reduce((sum, o, i) => sum + Math.pow(o - exp[i], 2) / exp[i], 0);
      const df = obs.length - 1;
      criticalVal = chiSquareCritical(df, alpha);
      reject = testStat > criticalVal;
      steps = [
        `Observed: [${obs.join(', ')}]`,
        `Expected: [${exp.join(', ')}]`,
        `χ² = Σ(O-E)²/E = ${testStat.toFixed(4)}`,
        `df = ${obs.length} - 1 = ${df}`,
        `Critical χ² (df=${df}, α=${alpha}) = ${criticalVal.toFixed(4)}`,
        `χ² = ${testStat.toFixed(4)} ${reject ? '>' : '≤'} ${criticalVal.toFixed(4)} → ${reject ? 'Reject H₀' : 'Fail to reject H₀'}`,
      ];
    }
  }

  return (
    <div className="space-y-4">
      {/* Test type selector */}
      <div className="flex flex-wrap gap-2">
        {([['z', 'Z-Test'], ['t', 'T-Test'], ['chi', 'Chi-Square']] as [TestType, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setTestType(key)} className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all ${testType === key ? 'bg-accent text-accent-text border-neutral-600' : 'border-border dark:border-border text-neutral-400'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      {testType !== 'chi' ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border p-3">
            <div className="text-[10px] text-neutral-400 uppercase">Sample Mean (x̄)</div>
            <input type="number" value={sampleMean} onChange={e => setSampleMean(Number(e.target.value))} className="w-full mt-1 px-1 py-0.5 bg-white dark:bg-neutral-800 border border-border dark:border-border rounded font-mono text-sm" />
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border p-3">
            <div className="text-[10px] text-neutral-400 uppercase">Pop Mean (μ)</div>
            <input type="number" value={popMean} onChange={e => setPopMean(Number(e.target.value))} className="w-full mt-1 px-1 py-0.5 bg-white dark:bg-neutral-800 border border-border dark:border-border rounded font-mono text-sm" />
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border p-3">
            <div className="text-[10px] text-neutral-400 uppercase">{testType === 't' ? 'Sample SD (s)' : 'Pop SD (σ)'}</div>
            <input type="number" value={stdDev} onChange={e => setStdDev(Number(e.target.value))} className="w-full mt-1 px-1 py-0.5 bg-white dark:bg-neutral-800 border border-border dark:border-border rounded font-mono text-sm" />
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border p-3">
            <div className="text-[10px] text-neutral-400 uppercase">Sample Size (n)</div>
            <input type="number" min="2" value={sampleSize} onChange={e => setSampleSize(Math.max(2, Number(e.target.value)))} className="w-full mt-1 px-1 py-0.5 bg-white dark:bg-neutral-800 border border-border dark:border-border rounded font-mono text-sm" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border p-3">
            <div className="text-[10px] text-neutral-400 uppercase">Observed (comma-separated)</div>
            <input type="text" value={observed} onChange={e => setObserved(e.target.value)} className="w-full mt-1 px-2 py-1 bg-white dark:bg-neutral-800 border border-border dark:border-border rounded font-mono text-sm" />
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border p-3">
            <div className="text-[10px] text-neutral-400 uppercase">Expected (comma-separated)</div>
            <input type="text" value={expected} onChange={e => setExpected(e.target.value)} className="w-full mt-1 px-2 py-1 bg-white dark:bg-neutral-800 border border-border dark:border-border rounded font-mono text-sm" />
          </div>
        </div>
      )}

      {/* Alpha and tail */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500">α:</label>
          <select value={alpha} onChange={e => setAlpha(Number(e.target.value))} className="px-2 py-1 bg-white dark:bg-neutral-800 border border-border dark:border-border rounded text-xs font-mono">
            <option value={0.01}>0.01</option>
            <option value={0.05}>0.05</option>
            <option value={0.10}>0.10</option>
          </select>
        </div>
        {testType !== 'chi' && (
          <div className="flex gap-1">
            {(['two', 'left', 'right'] as const).map(t => (
              <button key={t} onClick={() => setTail(t)} className={`px-2 py-1 text-[10px] font-bold rounded border transition-all ${tail === t ? 'bg-neutral-100 dark:bg-neutral-900/30 border-neutral-400 text-neutral-700 dark:text-neutral-300' : 'border-border dark:border-border text-neutral-400'}`}>
                {t === 'two' ? 'Two-tailed' : t === 'left' ? 'Left' : 'Right'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Result */}
      <div className={`rounded-lg p-4 border-2 ${reject ? 'bg-neutral-50 dark:bg-neutral-900/20 border-neutral-300 dark:border-neutral-700' : 'bg-neutral-50 dark:bg-neutral-900/20 border-neutral-300 dark:border-neutral-700'}`}>
        <div className="text-2xl font-bold font-mono">
          {testType === 'chi' ? `χ² = ${testStat.toFixed(4)}` : `${testType.toUpperCase()} = ${testStat.toFixed(4)}`}
        </div>
        <div className={`text-lg font-bold mt-1 ${reject ? 'text-neutral-600' : 'text-neutral-600'}`}>
          {reject ? '✕ Reject H₀' : '✓ Fail to Reject H₀'}
        </div>
        {testType !== 'chi' && <div className="text-xs text-neutral-500 mt-1">p-value ≈ {pValue.toFixed(4)}</div>}
      </div>

      {/* Steps */}
      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border p-4">
        <div className="text-xs font-bold text-neutral-500 mb-2">Step-by-Step Solution:</div>
        <div className="space-y-1">
          {steps.map((s, i) => (
            <div key={i} className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <span className="text-neutral-500 font-bold">{i + 1}.</span> {s}
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-neutral-400 text-center bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3">
        {testType === 'z' && '📏 Z-Test: n > 30, σ known. Compare sample mean to population mean.'}
        {testType === 't' && '📐 T-Test: n ≤ 30, σ unknown. Uses sample SD and t-distribution.'}
        {testType === 'chi' && '📊 Chi-Square: Test if observed frequencies match expected frequencies.'}
      </div>
    </div>
  );
}

function normalCDF(x: number): number {
  // Approximation of standard normal CDF
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x) / Math.sqrt(2);
  const t = 1 / (1 + p * absX);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return 0.5 * (1 + sign * y);
}
