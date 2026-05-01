'use client';

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Area, ComposedChart,
} from 'recharts';

interface ChartRendererProps {
  type: 'column' | 'line' | 'pie' | 'scatter' | 'histogram' | 'combo';
  data: Record<string, unknown>[];
  title?: string;
  xKey?: string;
  yKeys?: string[];
  colors?: string[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

export default function ChartRenderer({
  type,
  data,
  title,
  xKey = 'name',
  yKeys = ['value'],
  colors = COLORS,
}: ChartRendererProps) {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-400 text-sm">No data to display</p>
      </div>
    );
  }

  const renderChart = () => {
    switch (type) {
      case 'column':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            {yKeys.map((key, i) => (
              <Bar key={key} dataKey={key} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            {yKeys.map((key, i) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[i % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={yKeys[0]}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );

      case 'scatter':
        return (
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} name={xKey} />
            <YAxis dataKey={yKeys[0]} tick={{ fontSize: 12 }} name={yKeys[0]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name={yKeys[0]} data={data} fill={colors[0]} />
          </ScatterChart>
        );

      case 'histogram':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey={yKeys[0]} fill={colors[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        );

      case 'combo':
        return (
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey={yKeys[0]} fill={colors[0]} radius={[4, 4, 0, 0]} name={yKeys[0]} />
            <Line yAxisId="right" type="monotone" dataKey={yKeys[1]} stroke={colors[1]} strokeWidth={2} dot={{ r: 4 }} name={yKeys[1]} />
          </ComposedChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      {title && <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">{title}</h4>}
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
