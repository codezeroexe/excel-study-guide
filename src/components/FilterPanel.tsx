'use client';

import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';

interface FilterPanelProps {
  data: Record<string, string>[];
  headers: string[];
}

export default function FilterPanel({ data, headers }: FilterPanelProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const uniqueValues = useMemo(() => {
    const values: Record<string, string[]> = {};
    headers.forEach(h => {
      const unique = [...new Set(data.map(row => String(row[h] || '')))].sort();
      values[h] = unique;
    });
    return values;
  }, [data, headers]);

  const filteredData = useMemo(() => {
    return data.filter(row => {
      return Object.entries(activeFilters).every(([col, values]) => {
        if (values.length === 0) return true;
        return values.includes(String(row[col] || ''));
      });
    });
  }, [data, activeFilters]);

  const toggleValue = (col: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[col] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [col]: updated };
    });
  };

  const clearFilter = (col: string) => {
    setActiveFilters(prev => {
      const next = { ...prev };
      delete next[col];
      return next;
    });
    setOpenDropdown(null);
  };

  const clearAll = () => {
    setActiveFilters({});
    setOpenDropdown(null);
  };

  const activeFilterCount = Object.values(activeFilters).reduce((sum, v) => sum + v.length, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-500" />
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-950/30 text-neutral-700 dark:text-neutral-300 rounded-full text-xs">
              {activeFilterCount} active
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-neutral-500 hover:text-neutral-500 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {headers.map(header => {
          const isOpen = openDropdown === header;
          const hasFilter = activeFilters[header]?.length > 0;

          return (
            <div key={header} className="relative">
              <button
                onClick={() => setOpenDropdown(isOpen ? null : header)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                  hasFilter
                    ? 'border-neutral-500 bg-neutral-50 dark:bg-neutral-950/20 text-neutral-700 dark:text-neutral-300'
                    : 'border-border dark:border-border bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                }`}
              >
                {header}
                {hasFilter && (
                  <span className="w-1.5 h-1.5 bg-neutral-700 rounded-full" />
                )}
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white dark:bg-neutral-800 border border-border dark:border-border rounded-lg shadow-lg z-10 w-48 max-h-64 overflow-y-auto">
                  <div className="p-2 border-b border-neutral-100 dark:border-neutral-700">
                    <button
                      onClick={() => clearFilter(header)}
                      className="text-xs text-neutral-600 hover:text-neutral-700"
                    >
                      Select All
                    </button>
                  </div>
                  {uniqueValues[header]?.map(value => {
                    const isSelected = !activeFilters[header] || activeFilters[header].includes(value);
                    return (
                      <button
                        key={value}
                        onClick={() => toggleValue(header, value)}
                        className="w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-50 dark:hover:bg-neutral-700 flex items-center gap-2"
                      >
                        <div className={`w-3 h-3 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-neutral-700 border-neutral-500' : 'border-neutral-300 dark:border-neutral-600'
                        }`}>
                          {isSelected && (
                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-neutral-700 dark:text-neutral-300 truncate">{value || '(blank)'}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-xs text-neutral-500">
        Showing {filteredData.length} of {data.length} rows
      </div>

      {filteredData.length > 0 && filteredData.length <= 20 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                {headers.map(h => (
                  <th key={h} className="px-2 py-1 text-left font-medium text-neutral-500 border-b border-border dark:border-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={i}>
                  {headers.map(h => (
                    <td key={h} className="px-2 py-1 text-neutral-700 dark:text-neutral-300 border-b border-neutral-100 dark:border-neutral-800">{String(row[h] || '')}</td>
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
