'use client';

import { useState } from 'react';

type ProcessState = 'new' | 'ready' | 'running' | 'waiting' | 'terminated';

const stateColors: Record<ProcessState, string> = {
  new: '#9ca3af',
  ready: '#3b82f6',
  running: '#22c55e',
  waiting: '#f59e0b',
  terminated: '#ef4444',
};

const stateLabels: Record<ProcessState, string> = {
  new: 'New',
  ready: 'Ready',
  running: 'Running',
  waiting: 'Waiting',
  terminated: 'Terminated',
};

type Transition = { from: ProcessState; to: ProcessState; label: string; description: string };

const transitions: Transition[] = [
  { from: 'new', to: 'ready', label: 'Admit', description: 'OS admits process to ready queue' },
  { from: 'ready', to: 'running', label: 'Dispatch', description: 'Scheduler picks process for CPU' },
  { from: 'running', to: 'ready', label: 'Preempt', description: 'Time quantum expires or higher priority arrives' },
  { from: 'running', to: 'waiting', label: 'I/O Wait', description: 'Process requests I/O or waits for event' },
  { from: 'running', to: 'terminated', label: 'Exit', description: 'Process finishes or is killed' },
  { from: 'waiting', to: 'ready', label: 'I/O Done', description: 'I/O completes or event occurs' },
];

// SVG positions for state diagram
const statePositions: Record<ProcessState, { x: number; y: number }> = {
  new: { x: 80, y: 150 },
  ready: { x: 220, y: 80 },
  running: { x: 380, y: 150 },
  waiting: { x: 220, y: 240 },
  terminated: { x: 520, y: 150 },
};

const W = 600;
const H = 320;

export default function ProcessStateMachine() {
  const [state, setState] = useState<ProcessState>('new');
  const [history, setHistory] = useState<ProcessState[]>(['new']);
  const [lastTransition, setLastTransition] = useState<string>('');

  const availableTransitions = transitions.filter(t => t.from === state);

  const handleTransition = (t: Transition) => {
    setState(t.to);
    setHistory(prev => [...prev, t.to]);
    setLastTransition(`${t.label}: ${t.description}`);
  };

  const reset = () => {
    setState('new');
    setHistory(['new']);
    setLastTransition('');
  };

  // Build arrow paths
  const arrowPaths: { from: ProcessState; to: ProcessState; label: string }[] = [
    { from: 'new', to: 'ready', label: 'Admit' },
    { from: 'ready', to: 'running', label: 'Dispatch' },
    { from: 'running', to: 'ready', label: 'Preempt' },
    { from: 'running', to: 'waiting', label: 'I/O' },
    { from: 'running', to: 'terminated', label: 'Exit' },
    { from: 'waiting', to: 'ready', label: 'I/O Done' },
  ];

  function getArrowPath(from: ProcessState, to: ProcessState): string {
    const f = statePositions[from];
    const t = statePositions[to];
    const dx = t.x - f.x;
    const dy = t.y - f.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const r = 35;
    const sx = f.x + (dx / dist) * r;
    const sy = f.y + (dy / dist) * r;
    const ex = t.x - (dx / dist) * (r + 8);
    const ey = t.y - (dy / dist) * (r + 8);

    // Offset for bidirectional arrows
    const midX = (sx + ex) / 2;
    const midY = (sy + ey) / 2;
    const perpX = -(ey - sy) * 0.15;
    const perpY = (ex - sx) * 0.15;

    // Check if there's a reverse arrow
    const hasReverse = arrowPaths.some(a => a.from === to && a.to === from);
    if (hasReverse) {
      return `M ${sx} ${sy} Q ${midX + perpX} ${midY + perpY} ${ex} ${ey}`;
    }
    return `M ${sx} ${sy} L ${ex} ${ey}`;
  }

  return (
    <div className="space-y-4">
      {/* State diagram */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 340 }}>
          {/* Arrows */}
          {arrowPaths.map((arrow, i) => {
            const isActive = state === arrow.from;
            return (
              <g key={i}>
                <path
                  d={getArrowPath(arrow.from, arrow.to)}
                  fill="none"
                  stroke={isActive ? '#f59e0b' : '#d1d5db'}
                  strokeWidth={isActive ? 2 : 1}
                  markerEnd="url(#arrowhead)"
                />
                {/* Label */}
                {(() => {
                  const f = statePositions[arrow.from];
                  const t = statePositions[arrow.to];
                  const mx = (f.x + t.x) / 2;
                  const my = (f.y + t.y) / 2;
                  return (
                    <text x={mx} y={my - 6} textAnchor="middle" fontSize={9} fill={isActive ? '#f59e0b' : '#9ca3af'} fontWeight={isActive ? 'bold' : 'normal'}>
                      {arrow.label}
                    </text>
                  );
                })()}
              </g>
            );
          })}

          {/* Arrow marker */}
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#9ca3af" />
            </marker>
          </defs>

          {/* State circles */}
          {Object.entries(statePositions).map(([key, pos]) => {
            const s = key as ProcessState;
            const isCurrent = state === s;
            const isInHistory = history.includes(s);
            return (
              <g key={key}>
                <circle
                  cx={pos.x} cy={pos.y} r={35}
                  fill={isCurrent ? stateColors[s] : isInHistory ? stateColors[s] + '40' : '#f3f4f6'}
                  stroke={isCurrent ? stateColors[s] : '#d1d5db'}
                  strokeWidth={isCurrent ? 3 : 1.5}
                  className="transition-all duration-300"
                />
                <text
                  x={pos.x} y={pos.y}
                  textAnchor="middle" dominantBaseline="central"
                  fontSize={11} fontWeight="bold"
                  fill={isCurrent ? 'white' : isInHistory ? stateColors[s] : '#9ca3af'}
                >
                  {stateLabels[s]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Transition buttons */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-gray-500">Current State: <span style={{ color: stateColors[state] }}>{stateLabels[state]}</span></div>
        <div className="flex flex-wrap gap-2">
          {availableTransitions.map((t, i) => (
            <button
              key={i}
              onClick={() => handleTransition(t)}
              className="px-3 py-2 text-xs font-bold rounded-lg border-2 transition-all hover:scale-105"
              style={{
                borderColor: stateColors[t.to],
                backgroundColor: stateColors[t.to] + '15',
                color: stateColors[t.to],
              }}
            >
              {t.label} → {stateLabels[t.to]}
            </button>
          ))}
          {availableTransitions.length === 0 && (
            <span className="text-xs text-gray-400">Process terminated. Click Reset to start over.</span>
          )}
        </div>
      </div>

      {/* Transition log */}
      {lastTransition && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
          <div className="text-xs font-bold text-blue-700 dark:text-blue-300">{lastTransition}</div>
        </div>
      )}

      {/* History */}
      {history.length > 1 && (
        <div className="text-xs text-gray-500">
          <span className="font-bold">State History: </span>
          <span className="font-mono">
            {history.map((s, i) => (
              <span key={i}>
                {i > 0 && <span className="text-gray-300 dark:text-gray-600"> → </span>}
                <span style={{ color: stateColors[s] }}>{stateLabels[s]}</span>
              </span>
            ))}
          </span>
        </div>
      )}

      <button onClick={reset} className="px-3 py-1.5 text-xs font-bold bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        ↻ Reset
      </button>

      <div className="text-xs text-gray-400 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        🔄 Click transitions to move the process through states. Watch how I/O requests and preemption change the flow.
      </div>
    </div>
  );
}
