'use client';

import { useState } from 'react';
import { Plus, Trash2, Play } from 'lucide-react';

interface ConditionRule {
  field: string;
  operator: string;
  value: string;
}

interface ConditionBuilderProps {
  fields: string[];
  sampleData: Record<string, string>[];
}

const OPERATORS = [
  { value: '=', label: 'equals' },
  { value: '>', label: 'greater than' },
  { value: '<', label: 'less than' },
  { value: '>=', label: 'greater or equal' },
  { value: '<=', label: 'less or equal' },
  { value: '!=', label: 'not equals' },
  { value: 'contains', label: 'contains' },
];

export default function ConditionBuilder({ fields, sampleData }: ConditionBuilderProps) {
  const [rules, setRules] = useState<ConditionRule[]>([
    { field: fields[0] || '', operator: '=', value: '' },
  ]);
  const [logic, setLogic] = useState<'AND' | 'OR'>('AND');
  const [results, setResults] = useState<Record<string, string>[] | null>(null);

  const addRule = () => {
    setRules([...rules, { field: fields[0] || '', operator: '=', value: '' }]);
  };

  const removeRule = (idx: number) => {
    setRules(rules.filter((_, i) => i !== idx));
  };

  const updateRule = (idx: number, key: keyof ConditionRule, value: string) => {
    const updated = [...rules];
    updated[idx] = { ...updated[idx], [key]: value };
    setRules(updated);
  };

  const evaluate = () => {
    if (!sampleData.length) return;

    const filtered = sampleData.filter(row => {
      const ruleResults = rules.map(rule => {
        const cellValue = String(row[rule.field] || '');
        const compareValue = rule.value;

        switch (rule.operator) {
          case '=': return cellValue === compareValue;
          case '>': return Number(cellValue) > Number(compareValue);
          case '<': return Number(cellValue) < Number(compareValue);
          case '>=': return Number(cellValue) >= Number(compareValue);
          case '<=': return Number(cellValue) <= Number(compareValue);
          case '!=': return cellValue !== compareValue;
          case 'contains': return cellValue.toLowerCase().includes(compareValue.toLowerCase());
          default: return false;
        }
      });

      return logic === 'AND'
        ? ruleResults.every(r => r)
        : ruleResults.some(r => r);
    });

    setResults(filtered);
  };

  const formulaText = rules
    .map(r => `${r.field} ${r.operator} "${r.value}"`)
    .join(` ${logic} `);

  const excelFormula = rules.length === 1
    ? `=COUNTIF(${rules[0].field}:${rules[0].field}, "${rules[0].operator}${rules[0].value}")`
    : `=COUNTIFS(${rules.map(r => `${r.field}:${r.field}, "${r.operator}${r.value}"`).join(', ')})`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Build Condition</span>
        <div className="flex items-center gap-2">
          <select
            value={logic}
            onChange={e => setLogic(e.target.value as 'AND' | 'OR')}
            className="px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
          <button
            onClick={addRule}
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {rules.map((rule, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {idx > 0 && (
            <span className="text-xs font-medium text-gray-400 w-8">{logic}</span>
          )}
          <select
            value={rule.field}
            onChange={e => updateRule(idx, 'field', e.target.value)}
            className="flex-1 px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
          >
            {fields.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <select
            value={rule.operator}
            onChange={e => updateRule(idx, 'operator', e.target.value)}
            className="w-32 px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
          >
            {OPERATORS.map(op => (
              <option key={op.value} value={op.value}>{op.label}</option>
            ))}
          </select>
          <input
            type="text"
            value={rule.value}
            onChange={e => updateRule(idx, 'value', e.target.value)}
            placeholder="Value"
            className="flex-1 px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
          />
          {rules.length > 1 && (
            <button
              onClick={() => removeRule(idx)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}

      <div className="flex items-center gap-2">
        <button
          onClick={evaluate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Play className="w-3 h-3" />
          Evaluate
        </button>
      </div>

      {/* Formula display */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
        <div className="text-xs text-gray-500">Logic: {formulaText}</div>
        <div className="font-mono text-xs text-blue-600 dark:text-blue-400">{excelFormula}</div>
      </div>

      {/* Results */}
      {results !== null && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <p className="text-sm text-green-700 dark:text-green-300 font-medium">
            {results.length} of {sampleData.length} rows match
          </p>
          {results.length > 0 && results.length <= 10 && (
            <div className="mt-2 overflow-x-auto">
              <table className="text-xs">
                <thead>
                  <tr>
                    {Object.keys(results[0]).map(key => (
                      <th key={key} className="px-2 py-1 text-left font-medium text-green-600 dark:text-green-400">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="px-2 py-1 text-green-800 dark:text-green-200">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
