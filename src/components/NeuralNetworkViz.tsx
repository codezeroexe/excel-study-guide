'use client';

import { useState } from 'react';

interface NeuralNetworkVizProps {
  subjectColor?: string;
}

export default function NeuralNetworkViz({ subjectColor = 'accent' }: NeuralNetworkVizProps) {
  const colorMap: Record<string, string> = {
    green: '#22c55e',
    blue: '#3b82f6',
    purple: '#a855f7',
    amber: '#f59e0b',
    rose: '#f43f5e',
  };
  const subjectColorValue = colorMap[subjectColor] || '#a3a3a3';

  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [activeNeuron, setActiveNeuron] = useState<string | null>(null);

  const layers = [
    { name: 'Input', neurons: 3, labels: ['x₁', 'x₂', 'x₃'], x: 80 },
    { name: 'Hidden 1', neurons: 4, labels: ['h₁', 'h₂', 'h₃', 'h₄'], x: 200 },
    { name: 'Hidden 2', neurons: 4, labels: ['h₅', 'h₆', 'h₇', 'h₈'], x: 320 },
    { name: 'Output', neurons: 2, labels: ['y₁', 'y₂'], x: 440 },
  ];

  const height = 280;
  const centerY = height / 2;

  const getNeuronY = (layerIdx: number, neuronIdx: number, total: number) => {
    const spacing = 50;
    const totalHeight = (total - 1) * spacing;
    const startY = centerY - totalHeight / 2;
    return startY + neuronIdx * spacing;
  };

  function Neuron({ x, y, active, label }: { x: number; y: number; active?: boolean; label?: string }) {
    return (
      <g>
        <circle
          cx={x}
          cy={y}
          r="18"
          fill={active ? subjectColorValue : '#e5e7eb'}
          stroke={active ? subjectColorValue : '#9ca3af'}
          strokeWidth="2"
          className="transition-colors"
        />
        {label && (
          <text x={x} y={y + 4} textAnchor="middle" fontSize="8" fill={active ? 'white' : '#374151'} fontWeight="bold">
            {label}
          </text>
        )}
      </g>
    );
  }

  return (
    <div className="space-y-4">
      {/* Network Visualization */}
      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border p-4 overflow-x-auto">
        <svg viewBox={`0 0 520 ${height}`} className="w-full">
          {/* Connections */}
          {layers.slice(0, -1).map((layer, i) =>
            layer.labels.map((_, ni) =>
              layers[i + 1].labels.map((_, nj) => (
                <line
                  key={`conn-${i}-${ni}-${nj}`}
                  x1={layer.x}
                  y1={getNeuronY(i, ni, layer.neurons)}
                  x2={layers[i + 1].x}
                  y2={getNeuronY(i + 1, nj, layers[i + 1].neurons)}
                  stroke="#e5e7eb"
                  strokeWidth="0.5"
                  className="transition-colors"
                />
              ))
            )
          )}

          {/* Neurons */}
          {layers.map((layer, i) => (
            <g key={i} onClick={() => setActiveLayer(activeLayer === i ? null : i)} className="cursor-pointer">
              {layer.labels.map((label, j) => {
                const y = getNeuronY(i, j, layer.neurons);
                const isActive = activeLayer === i || activeNeuron === `${i}-${j}`;
                return (
                  <g key={j} onClick={e => { e.stopPropagation(); setActiveNeuron(activeNeuron === `${i}-${j}` ? null : `${i}-${j}`); }}>
                    <Neuron x={layer.x} y={y} active={isActive} label={label} />
                  </g>
                );
              })}
              {/* Layer label */}
              <text x={layer.x} y={centerY + (layer.neurons / 2) * 50 + 30} textAnchor="middle" fontSize="9" fill="#9ca3af" className="font-bold">
                {layer.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Info */}
      <div className="text-xs text-neutral-400 text-center bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3">
        🧠 Click a layer to highlight it, or click individual neurons. Hover shows activation flow.
      </div>
    </div>
  );
}
