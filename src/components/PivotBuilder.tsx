'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { GripVertical, Trash2 } from 'lucide-react';

interface PivotBuilderProps {
  data: Record<string, string>[];
  fields: string[];
  subjectColor?: string;
}

type PivotArea = 'rows' | 'columns' | 'values' | 'filters';

export default function PivotBuilder({ data, fields, subjectColor = 'accent' }: PivotBuilderProps) {
  const [assignments, setAssignments] = useState<Record<PivotArea, string[]>>({
    rows: [],
    columns: [],
    values: [],
    filters: [],
  });

  const [valueAggregation, setValueAggregation] = useState<Record<string, 'SUM' | 'COUNT' | 'AVERAGE' | 'MAX' | 'MIN'>>({});

  const [draggedField, setDraggedField] = useState<string | null>(null);
  const [dragOverArea, setDragOverArea] = useState<PivotArea | null>(null);
  const dragRef = useRef<string | null>(null);

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

  const handleDragStart = useCallback((e: React.DragEvent, field: string) => {
    dragRef.current = field;
    setDraggedField(field);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', field);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, area: PivotArea) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverArea(area);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, area: PivotArea) => {
    e.preventDefault();
    const field = dragRef.current;
    if (field) {
      assignField(field, area);
      setDraggedField(null);
      setDragOverArea(null);
      dragRef.current = null;
    }
  }, [assignField]);

  const handleDragEnd = useCallback(() => {
    setDraggedField(null);
    setDragOverArea(null);
    dragRef.current = null;
  }, []);

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
    rows: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-border dark:border-border',
    columns: 'bg-neutral-100 dark:bg-neutral-900/30 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800',
    values: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-border dark:border-border',
    filters: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-border dark:border-border',
  };

  return (
    <div className="space-y-4">
      {/* Available fields */}
      <div>
        <span className="text-xs font-medium text-neutral-500 mb-2 block">Available Fields</span>
        <div className="flex flex-wrap gap-2">
          {availableFields.map(field => (
            <div key={field} className="relative group">
              <div
                draggable
                onDragStart={e => handleDragStart(e, field)}
                onDragEnd={handleDragEnd}
                className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-border dark:border-border rounded-lg text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1 cursor-grab hover:border-neutral-400"
              >
                <GripVertical className="w-3 h-3 text-neutral-400" />
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
            <span className="text-xs text-neutral-400">All fields assigned</span>
          )}
        </div>
      </div>

      {/* Assigned areas */}
      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(areaLabels) as PivotArea[]).map(area => (
          <div
            key={area}
            onDragOver={e => handleDragOver(e, area)}
            onDrop={e => handleDrop(e, area)}
            className={`rounded-lg border p-3 min-h-[60px] ${areaColors[area]} ${dragOverArea === area ? 'border-2 border-dashed' : ''}`}
          >
            <span className="text-xs font-medium block mb-2">{areaLabels[area]}</span>
            <div className="flex flex-wrap gap-1">
              {assignments[area].map(field => (
                <span
                  key={field}
                  className="px-2 py-1 bg-white/50 dark:bg-neutral-800/50 rounded text-xs flex items-center gap-1"
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
                    className="ml-1 text-neutral-400 hover:text-neutral-500"
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
                <th className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-border dark:border-border text-left text-xs font-medium text-neutral-500">
                  {assignments.rows.join(' / ')}
                </th>
                {pivotResult.colGroups.map(cg => (
                  <th key={cg} className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-border dark:border-border text-xs font-medium text-neutral-500">
                    {cg}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pivotResult.rowGroups.map(rg => (
                <tr key={rg}>
                  <td className="px-3 py-2 bg-neutral-50 dark:bg-neutral-800/50 border border-border dark:border-border font-medium text-xs">
                    {rg}
                  </td>
                  {pivotResult.colGroups.map(cg => (
                    <td key={cg} className="px-3 py-2 border border-border dark:border-border text-xs text-right">
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
