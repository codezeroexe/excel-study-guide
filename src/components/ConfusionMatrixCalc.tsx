'use client';

import { useState, useMemo } from 'react';

export default function ConfusionMatrixCalc() {
  const [tp, setTp] = useState(80);
  const [fp, setFp] = useState(10);
  const [tn, setTn] = useState(90);
  const [fn, setFn] = useState(20);

  const metrics = useMemo(() => {
    const total = tp + fp + tn + fn;
    const accuracy = total > 0 ? ((tp + tn) / total * 100).toFixed(1) : '0';
    const precision = (tp + fp) > 0 ? (tp / (tp + fp) * 100).toFixed(1) : '0';
    const recall = (tp + fn) > 0 ? (tp / (tp + fn) * 100).toFixed(1) : '0';
    const f1 = (Number(precision) + Number(recall)) > 0
      ? (2 * Number(precision) * Number(recall) / (Number(precision) + Number(recall))).toFixed(1)
      : '0';
    const fpr = (fp + tn) > 0 ? (fp / (fp + tn) * 100).toFixed(1) : '0';

    return { accuracy, precision, recall, f1, fpr, total };
  }, [tp, fp, tn, fn]);

  const inputClass = "w-20 px-3 py-2 text-center text-lg font-bold border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none";

  return (
    <div className="space-y-6">
      {/* Confusion Matrix Grid */}
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div />
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Predicted Positive</div>
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Predicted Negative</div>

          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide flex items-center justify-end pr-2">Actual Positive</div>
          <div className="p-4 bg-neutral-100 dark:bg-neutral-900/30 rounded-lg border-2 border-neutral-300 dark:border-neutral-700">
            <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">TP</div>
            <input type="number" value={tp} onChange={e => setTp(Number(e.target.value))} className={inputClass} />
          </div>
          <div className="p-4 bg-neutral-100 dark:bg-neutral-900/30 rounded-lg border-2 border-neutral-300 dark:border-neutral-700">
            <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">FN</div>
            <input type="number" value={fn} onChange={e => setFn(Number(e.target.value))} className={inputClass} />
          </div>

          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide flex items-center justify-end pr-2">Actual Negative</div>
          <div className="p-4 bg-neutral-100 dark:bg-neutral-900/30 rounded-lg border-2 border-neutral-300 dark:border-neutral-700">
            <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">FP</div>
            <input type="number" value={fp} onChange={e => setFp(Number(e.target.value))} className={inputClass} />
          </div>
          <div className="p-4 bg-neutral-100 dark:bg-neutral-900/30 rounded-lg border-2 border-neutral-300 dark:border-neutral-700">
            <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">TN</div>
            <input type="number" value={tn} onChange={e => setTn(Number(e.target.value))} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Metrics Output */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Accuracy', value: metrics.accuracy, color: 'blue' },
          { label: 'Precision', value: metrics.precision, color: 'green' },
          { label: 'Recall', value: metrics.recall, color: 'purple' },
          { label: 'F1-Score', value: metrics.f1, color: 'amber' },
          { label: 'FPR', value: metrics.fpr, color: 'red' },
        ].map(m => (
          <div key={m.label} className={`p-3 rounded-lg border text-center ${
            m.color === 'blue' ? 'bg-neutral-50 dark:bg-neutral-900/20 border-neutral-200 dark:border-neutral-800' :
            m.color === 'green' ? 'bg-neutral-50 dark:bg-neutral-900/20 border-neutral-200 dark:border-neutral-800' :
            m.color === 'purple' ? 'bg-neutral-50 dark:bg-neutral-900/20 border-neutral-200 dark:border-neutral-800' :
            m.color === 'amber' ? 'bg-neutral-50 dark:bg-neutral-900/20 border-neutral-200 dark:border-neutral-800' :
            'bg-neutral-50 dark:bg-neutral-900/20 border-neutral-200 dark:border-neutral-800'
          }`}>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{m.label}</div>
            <div className="text-xl font-bold">{m.value}%</div>
          </div>
        ))}
      </div>

      {/* Formulas used */}
      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 space-y-1 text-xs font-mono text-neutral-600 dark:text-neutral-400">
        <div>Accuracy = (TP+TN) / Total = ({tp}+{tn}) / {metrics.total} = {metrics.accuracy}%</div>
        <div>Precision = TP / (TP+FP) = {tp} / ({tp}+{fp}) = {metrics.precision}%</div>
        <div>Recall = TP / (TP+FN) = {tp} / ({tp}+{fn}) = {metrics.recall}%</div>
        <div>F1 = 2×(P×R)/(P+R) = {metrics.f1}%</div>
      </div>
    </div>
  );
}
