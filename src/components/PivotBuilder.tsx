'use client';

import { useState, useMemo } from 'react';
import { GripVertical } from 'lucide-react';

interface PivotBuilderProps {
  data: Record<string, string>[];
  fields: string[];
}

type PivotArea = 'rows' | 'columns' | 'values' | 'filters';

export default function PivotBuilder({ data, fields }: PivotBuilderProps) {
  const [assignments, setAssignments] = useState<Record<PivotArea, string[]>>({
    rows: [],
    columns: [],
    values: [],
    filters: [],
  });

  const [valueAggregation, setValueAggregation] = useState<Record<string, 'SUM' | 'COUNT' | 'AVERAGE' | 'MAX' | 'MIN'>>({});

  const availableFields = fields.filter(f =>
    !assignments.rows.includes(f) &&
    !assignments.columns.includes(f) &&
    !assignments.values.includes(f) &&
    !assignments.filters.includes(f)
  );

  const assignField = (field: string, area: PivotArea) => {
    setAssignments(prev => ({
      ...prev,
      [area]: [...prev[area], field],
    }));
    if (area === 'values' && !valueAggregation[field]) {
      setValueAggregation(prev => ({ ...prev, [field]: 'SUM' }));
    }
  };

  const removeField = (field: string, area: PivotArea) => {
    setAssignments(prev => ({
      ...prev,
      [area]: prev[area].filter(f => f !== field),
    }));
  };

  const pivotResult = useMemo(() => {
    if (!assignments.rows.length || !assignments.values.length) return null;

    const rowGroups = [...new Set(data.map(row =>
      assignments.rows.map(f => row[f]).join(' | ')
    ))];

    const colGroups = assignments.columns.length
      ? [...new Set(data.map(row =>
          assignments.columns.map(f => row[f]).join(' | ')
        ))]
      : ['Total'];

    const result: Record<string, Record<string, number>> = {};

    rowGroups.forEach(rg => {
      result[rg] = {};
      colGroups.forEach(cg => {
        const matchingRows = data.filter(row => {
          const rowMatch = assignments.rows.every(f => row[f] === rg.split(' | ')[assignments.rows.indexOf(f)]);
          const colMatch = assignments.columns.length === 0 ||
            assignments.columns.every(f => row[f] === cg.split(' | ')[assignments.columns.indexOf(f)]);
          return rowMatch && colMatch;
        });

        const valField = assignments.values[0];
        const agg = valueAggregation[valField] || 'SUM';
        const values = matchingRows.map(r => Number(r[valField]) || 0);

        switch (agg) {
          case 'SUM': result[rg][cg] = values.reduce((a, b) => a + b, 0); break;
          case 'COUNT': result[rg][cg] = values.length; break;
          case 'AVERAGE': result[rg][cg] = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0; break;
          case 'MAX': result[rg][cg] = values.length ? Math.max(...values) : 0; break;
          case 'MIN': result[rg][cg] = values.length ? Math.min(...values) : 0; break;
        }
      });
    });

    return { rowGroups, colGroups, result };
  }, [data, assignments, valueAggregation]);

  const areaLabels: Record<PivotArea, string> = {
    rows: 'Rows',
    columns: 'Columns',
    values: 'Values',
    filters: 'Filters',
  };

  const areaColors: Record<PivotArea, string> = {
    rows: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    columns: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    values: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    filters: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  };

  return (
    <div className="space-y-4">
      {/* Available fields */}
      <div>
        <span className="text-xs font-medium text-gray-500 mb-2 block">Available Fields</span>
        <div className="flex flex-wrap gap-2">
          {availableFields.map(field => (
            <div key={field} className="relative group">
              <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1 cursor-grab">
                <GripVertical className="w-3 h-3 text-gray-400" />
                {field}
              </div>
              <div className="absolute top-full left-0 mt-1 hidden group-hover:flex gap-1 z-10">
                {(Object.keys(areaLabels) as PivotArea[]).map(area => (
                  <button
                    key={area}
                    onClick={() => assignField(field, area)}
                    className={`px-2 py-1 rounded text-xs font-medium border ${areaColors[area]}`}
                  >
                    + {areaLabels[area]}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {availableFields.length === 0 && (
            <span className="text-xs text-gray-400">All fields assigned</span>
          )}
        </div>
      </div>

      {/* Assigned areas */}
      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(areaLabels) as PivotArea[]).map(area => (
          <div key={area} className={`rounded-lg border p-3 min-h-[60px] ${areaColors[area]}`}>
            <span className="text-xs font-medium block mb-2">{areaLabels[area]}</span>
            <div className="flex flex-wrap gap-1">
              {assignments[area].map(field => (
                <span
                  key={field}
                  className="px-2 py-1 bg-white/50 dark:bg-gray-800/50 rounded text-xs flex items-center gap-1"
                >
                  {field}
                  {area === 'values' && (
                    <select
                      value={valueAggregation[field] || 'SUM'}
                      onChange={e => setValueAggregation(prev => ({ ...prev, [field]: e.target.value as typeof valueAggregation[string] }))}
                      className="bg-transparent text-xs outline-none"
                    >
                      <option value="SUM">SUM</option>
                      <option value="COUNT">COUNT</option>
                      <option value="AVERAGE">AVG</option>
                      <option value="MAX">MAX</option>
                      <option value="MIN">MIN</option>
                    </select>
                  )}
                  <button
                    onClick={() => removeField(field, area)}
                    className="ml-1 text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
              {assignments[area].length === 0 && (
                <span className="text-xs opacity-50">Drop fields here</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pivot result */}
      {pivotResult && (
        <div className="overflow-x-auto">
          <table className="border-collapse text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left text-xs font-medium text-gray-500">
                  {assignments.rows.join(' / ')}
                </th>
                {pivotResult.colGroups.map(cg => (
                  <th key={cg} className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500">
                    {cg}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pivotResult.rowGroups.map(rg => (
                <tr key={rg}>
                  <td className="px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 font-medium text-xs">
                    {rg}
                  </td>
                  {pivotResult.colGroups.map(cg => (
                    <td key={cg} className="px-3 py-2 border border-gray-200 dark:border-gray-700 text-xs text-right">
                      {pivotResult.result[rg]?.[cg]?.toLocaleString() ?? 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
