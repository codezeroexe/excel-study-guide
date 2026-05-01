'use client';

import { useState } from 'react';

export default function BayesTheoremCalc() {
  const [priorA, setPriorA] = useState(0.01);
  const [likelihoodBA, setLikelihoodBA] = useState(0.95);
  const [likelihoodBNotA, setLikelihoodBNotA] = useState(0.05);

  const notA = 1 - priorA;
  const evidence = likelihoodBA * priorA + likelihoodBNotA * notA;
  const posterior = evidence > 0 ? (likelihoodBA * priorA) / evidence : 0;

  const scenarios = [
    { name: 'Medical Test (Rare Disease)', prior: 0.01, sens: 0.95, fpr: 0.05 },
    { name: 'Spam Filter', prior: 0.30, sens: 0.90, fpr: 0.02 },
    { name: 'Factory Defect', prior: 0.05, sens: 0.99, fpr: 0.01 },
  ];

  return (
    <div className="space-y-4">
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {scenarios.map(s => (
          <button key={s.name} onClick={() => { setPriorA(s.prior); setLikelihoodBA(s.sens); setLikelihoodBNotA(s.fpr); }} className="px-2 py-1 text-[10px] font-bold rounded border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors">
            {s.name}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          <div className="text-[10px] text-gray-400 uppercase mb-1">P(A) — Prior</div>
          <input type="range" min="0.001" max="0.99" step="0.001" value={priorA} onChange={e => setPriorA(Number(e.target.value))} className="w-full" />
          <div className="text-lg font-bold font-mono text-rose-600">{priorA.toFixed(3)}</div>
          <div className="text-[10px] text-gray-400">Base rate of A</div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          <div className="text-[10px] text-gray-400 uppercase mb-1">P(B|A) — Sensitivity</div>
          <input type="range" min="0.01" max="1" step="0.01" value={likelihoodBA} onChange={e => setLikelihoodBA(Number(e.target.value))} className="w-full" />
          <div className="text-lg font-bold font-mono text-blue-600">{likelihoodBA.toFixed(3)}</div>
          <div className="text-[10px] text-gray-400">True positive rate</div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          <div className="text-[10px] text-gray-400 uppercase mb-1">P(B|¬A) — False Positive</div>
          <input type="range" min="0.01" max="1" step="0.01" value={likelihoodBNotA} onChange={e => setLikelihoodBNotA(Number(e.target.value))} className="w-full" />
          <div className="text-lg font-bold font-mono text-amber-600">{likelihoodBNotA.toFixed(3)}</div>
          <div className="text-[10px] text-gray-400">False positive rate</div>
        </div>
      </div>

      {/* Bayes Formula */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="text-xs font-mono text-gray-500 mb-2">Bayes' Theorem:</div>
        <div className="text-sm font-mono">
          P(A|B) = <span className="text-blue-600">{likelihoodBA.toFixed(3)}</span> × <span className="text-rose-600">{priorA.toFixed(3)}</span> / (<span className="text-blue-600">{likelihoodBA.toFixed(3)}</span> × <span className="text-rose-600">{priorA.toFixed(3)}</span> + <span className="text-amber-600">{likelihoodBNotA.toFixed(3)}</span> × <span className="text-gray-500">{notA.toFixed(3)}</span>)
        </div>
        <div className="text-sm font-mono mt-1">
          = {((likelihoodBA * priorA)).toFixed(4)} / {evidence.toFixed(4)}
        </div>
      </div>

      {/* Result */}
      <div className={`rounded-lg p-4 border-2 ${posterior > 0.5 ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'}`}>
        <div className="text-xs uppercase font-bold text-gray-500">Posterior: P(A|B)</div>
        <div className={`text-4xl font-bold font-mono ${posterior > 0.5 ? 'text-green-600' : 'text-red-600'}`}>
          {(posterior * 100).toFixed(1)}%
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {posterior > 0.5
            ? 'Evidence strongly supports A'
            : `Despite positive evidence, A is still unlikely (base rate fallacy!)`
          }
        </div>
      </div>

      {/* Visual bar */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-6 overflow-hidden">
        <div className="h-full bg-rose-500 transition-all duration-300 flex items-center justify-end pr-2" style={{ width: `${posterior * 100}%` }}>
          <span className="text-[10px] font-bold text-white">{(posterior * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className="text-xs text-gray-400 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        🔬 Even with 95% accurate test, a rare disease (1%) gives only ~16% posterior probability after a positive result.
      </div>
    </div>
  );
}
