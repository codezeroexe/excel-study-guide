'use client';

import { useState } from 'react';

interface NeuronProps {
  x: number;
  y: number;
  active?: boolean;
  label?: string;
}

function Neuron({ x, y, active, label }: NeuronProps) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="18"
        fill={active ? '#3b82f6' : '#e5e7eb'}
        stroke={active ? '#2563eb' : '#9ca3af'}
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

export default function NeuralNetworkViz() {
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
    const startY = centerY - ((total - 1) * spacing) / 2;
    return startY + neuronIdx * spacing;
  };

  return (
    <div className="space-y-4">
      <svg viewBox={`0 0 520 ${height}`} className="w-full h-auto">
        {/* Connections */}
        {layers.map((layer, li) => {
          if (li === layers.length - 1) return null;
          const nextLayer = layers[li + 1];
          return Array.from({ length: layer.neurons }, (_, ni) =>
            Array.from({ length: nextLayer.neurons }, (_, nni) => {
              const x1 = layer.x;
              const y1 = getNeuronY(li, ni, layer.neurons);
              const x2 = nextLayer.x;
              const y2 = getNeuronY(li + 1, nni, nextLayer.neurons);
              const isActive = activeLayer === li || activeLayer === li + 1;
              return (
                <line
                  key={`${li}-${ni}-${nni}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isActive ? '#93c5fd' : '#d1d5db'}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  className="transition-all"
                />
              );
            })
          );
        })}

        {/* Neurons */}
        {layers.map((layer, li) =>
          Array.from({ length: layer.neurons }, (_, ni) => {
            const x = layer.x;
            const y = getNeuronY(li, ni, layer.neurons);
            const key = `${li}-${ni}`;
            const isActive = activeNeuron === key || activeLayer === li;
            return (
              <g
                key={key}
                onMouseEnter={() => { setActiveLayer(li); setActiveNeuron(key); }}
                onMouseLeave={() => { setActiveLayer(null); setActiveNeuron(null); }}
                className="cursor-pointer"
              >
                <Neuron x={x} y={y} active={isActive} label={layer.labels[ni]} />
              </g>
            );
          })
        )}

        {/* Layer labels */}
        {layers.map((layer, li) => (
          <text
            key={li}
            x={layer.x}
            y={height - 10}
            textAnchor="middle"
            fontSize="10"
            fill={activeLayer === li ? '#3b82f6' : '#6b7280'}
            fontWeight={activeLayer === li ? 'bold' : 'normal'}
          >
            {layer.name}
          </text>
        ))}
      </svg>

      {/* Info panel */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-xs text-gray-600 dark:text-gray-400">
        {activeLayer !== null ? (
          <div>
            <span className="font-semibold text-blue-600">{layers[activeLayer].name} Layer</span>
            <span className="ml-2">{layers[activeLayer].neurons} neurons</span>
            {activeNeuron && (
              <span className="ml-2 font-mono">
                z = w·x + b → activation σ(z)
              </span>
            )}
          </div>
        ) : (
          <span>Hover over neurons to see layer details</span>
        )}
      </div>

      {/* Training loop */}
      <div className="flex items-center justify-center gap-2 text-xs">
        {['Forward Pass', '→', 'Loss', '→', 'Backpropagation', '→', 'Update Weights'].map((step, i) => (
          <span key={i} className={step.includes('→') ? 'text-gray-300' : 'px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded font-medium'}>
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
