'use client';

import { useState, useMemo } from 'react';

type Process = { id: string; arrival: number; burst: number; priority: number };

type GanttBlock = { id: string; start: number; end: number };

function fcfs(procs: Process[]): { gantt: GanttBlock[]; avgWait: number; avgTurn: number } {
  const sorted = [...procs].sort((a, b) => a.arrival - b.arrival);
  const gantt: GanttBlock[] = [];
  let time = 0;
  let totalWait = 0;
  let totalTurn = 0;
  for (const p of sorted) {
    const start = Math.max(time, p.arrival);
    const end = start + p.burst;
    gantt.push({ id: p.id, start, end });
    totalWait += start - p.arrival;
    totalTurn += end - p.arrival;
    time = end;
  }
  return { gantt, avgWait: totalWait / procs.length, avgTurn: totalTurn / procs.length };
}

function sjf(procs: Process[]): { gantt: GanttBlock[]; avgWait: number; avgTurn: number } {
  const remaining = procs.map(p => ({ ...p, remaining: p.burst, done: false }));
  const gantt: GanttBlock[] = [];
  let time = 0;
  let totalWait = 0;
  let totalTurn = 0;
  let completed = 0;

  while (completed < remaining.length) {
    const available = remaining.filter(p => p.arrival <= time && !p.done);
    if (available.length === 0) {
      time = Math.min(...remaining.filter(p => !p.done).map(p => p.arrival));
      continue;
    }
    const shortest = available.reduce((a, b) => a.remaining < b.remaining ? a : b);
    const start = time;
    const end = start + shortest.remaining;
    gantt.push({ id: shortest.id, start, end });
    totalWait += start - shortest.arrival;
    totalTurn += end - shortest.arrival;
    shortest.done = true;
    time = end;
    completed++;
  }
  return { gantt, avgWait: totalWait / procs.length, avgTurn: totalTurn / procs.length };
}

function roundRobin(procs: Process[], quantum: number): { gantt: GanttBlock[]; avgWait: number; avgTurn: number } {
  const remaining = procs.map(p => ({ ...p, remaining: p.burst, done: false }));
  const gantt: GanttBlock[] = [];
  let time = 0;
  let totalWait = 0;
  let totalTurn = 0;
  let completed = 0;
  const queue = [...remaining].sort((a, b) => a.arrival - b.arrival);

  while (completed < remaining.length) {
    const available = queue.filter(p => p.arrival <= time && !p.done);
    if (available.length === 0) {
      time = Math.min(...remaining.filter(p => !p.done).map(p => p.arrival));
      continue;
    }
    const p = available[0];
    const exec = Math.min(p.remaining, quantum);
    const start = time;
    const end = start + exec;
    gantt.push({ id: p.id, start, end });
    p.remaining -= exec;
    time = end;
    if (p.remaining === 0) {
      p.done = true;
      totalWait += end - p.arrival - p.burst;
      totalTurn += end - p.arrival;
      completed++;
    }
  }
  return { gantt, avgWait: totalWait / procs.length, avgTurn: totalTurn / procs.length };
}

const defaultProcs: Process[] = [
  { id: 'P1', arrival: 0, burst: 6, priority: 3 },
  { id: 'P2', arrival: 1, burst: 8, priority: 1 },
  { id: 'P3', arrival: 2, burst: 7, priority: 2 },
  { id: 'P4', arrival: 3, burst: 3, priority: 4 },
];

const algoColors: Record<string, string> = {
  P1: '#525252', P2: '#737373', P3: '#a3a3a3', P4: '#525252',
  P5: '#404040', P6: '#737373', P7: '#a3a3a3', P8: '#d4d4d4',
};

interface GanttChartGeneratorProps {
  subjectColor?: string;
}

export default function GanttChartGenerator({ subjectColor = 'accent' }: GanttChartGeneratorProps) {
  const colorMap: Record<string, string> = {
    green: '#22c55e',
    blue: '#3b82f6',
    purple: '#a855f7',
    amber: '#f59e0b',
    rose: '#f43f5e',
  };
  const subjectColorValue = colorMap[subjectColor] || '#a3a3a3';

  const [procs, setProcs] = useState<Process[]>(defaultProcs);
  const [algorithm, setAlgorithm] = useState<'FCFS' | 'SJF' | 'RR'>('FCFS');
  const [quantum, setQuantum] = useState(2);

  const result = useMemo(() => {
    switch (algorithm) {
      case 'FCFS': return fcfs(procs);
      case 'SJF': return sjf(procs);
      case 'RR': return roundRobin(procs, quantum);
    }
  }, [procs, algorithm, quantum]);

  const blockWidth = Math.max(40, Math.min(120, 600 / result.gantt.length));

  const updateProc = (idx: number, field: keyof Process, value: number) => {
    setProcs(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  return (
    <div className="space-y-4">
      {/* Process inputs */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-border dark:border-border">Process</th>
              <th className="px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-border dark:border-border">Arrival</th>
              <th className="px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-border dark:border-border">Burst</th>
              <th className="px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-border dark:border-border">Priority</th>
            </tr>
          </thead>
          <tbody>
            {procs.map((p, i) => (
              <tr key={i}>
                <td className="px-2 py-1.5 border border-neutral-100 dark:border-neutral-800 font-mono font-bold" style={{ color: algoColors[p.id] || '#6b7280' }}>{p.id}</td>
                <td className="px-2 py-1.5 border border-neutral-100 dark:border-neutral-800">
                  <input type="number" min="0" value={p.arrival} onChange={e => updateProc(i, 'arrival', Number(e.target.value))} className="w-14 px-1 py-0.5 text-center bg-white dark:bg-neutral-800 border border-border dark:border-border rounded font-mono" />
                </td>
                <td className="px-2 py-1.5 border border-neutral-100 dark:border-neutral-800">
                  <input type="number" min="1" value={p.burst} onChange={e => updateProc(i, 'burst', Math.max(1, Number(e.target.value)))} className="w-14 px-1 py-0.5 text-center bg-white dark:bg-neutral-800 border border-border dark:border-border rounded font-mono" />
                </td>
                <td className="px-2 py-1.5 border border-neutral-100 dark:border-neutral-800">
                  <input type="number" min="1" value={p.priority} onChange={e => updateProc(i, 'priority', Math.max(1, Number(e.target.value)))} className="w-14 px-1 py-0.5 text-center bg-white dark:bg-neutral-800 border border-border dark:border-border rounded font-mono" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Algorithm selector */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {(['FCFS', 'SJF', 'RR'] as const).map(algo => (
            <button
              key={algo}
              onClick={() => setAlgorithm(algo)}
               className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all ${
                 algorithm === algo ? 'text-white border-neutral-600' : 'border-border dark:border-border text-neutral-400'
               }`}
               style={algorithm === algo ? { backgroundColor: subjectColorValue } : {}}
            >
              {algo}
            </button>
          ))}
        </div>
        {algorithm === 'RR' && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-neutral-500">Quantum:</label>
            <input type="number" min="1" max="20" value={quantum} onChange={e => setQuantum(Math.max(1, Number(e.target.value)))} className="w-14 px-1 py-0.5 text-center bg-white dark:bg-neutral-800 border border-border dark:border-border rounded font-mono" />
          </div>
        )}
      </div>

      {/* Gantt Chart */}
      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-border dark:border-border p-4 overflow-x-auto">
        <div className="flex items-center" style={{ minWidth: result.gantt.length * blockWidth + 60 }}>
          {/* Y label */}
          <div className="text-xs font-bold text-neutral-500 w-12 flex-shrink-0 text-center">CPU</div>
          {/* Blocks */}
          <div className="flex">
            {result.gantt.map((block, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="flex items-center justify-center text-xs font-bold text-white border border-white/20"
                  style={{
                    width: blockWidth,
                    height: 40,
                     backgroundColor: subjectColorValue,
                  }}
                >
                  {block.id}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Time axis */}
        <div className="flex items-center ml-12">
          {result.gantt.map((block, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex">
                <span className="text-[10px] text-neutral-400 font-mono" style={{ width: blockWidth / 2, textAlign: 'center' }}>{block.start}</span>
                {i === result.gantt.length - 1 && (
                  <span className="text-[10px] text-neutral-400 font-mono" style={{ width: blockWidth / 2, textAlign: 'center' }}>{block.end}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-neutral-50 dark:bg-neutral-900/20 rounded-lg border border-neutral-200 dark:border-neutral-800 text-center">
          <div className="text-[10px] text-neutral-600 dark:text-neutral-400 uppercase font-bold">Avg Waiting Time</div>
          <div className="text-xl font-bold font-mono text-neutral-700 dark:text-neutral-300">{result.avgWait.toFixed(2)}</div>
        </div>
        <div className="p-3 bg-neutral-50 dark:bg-neutral-900/20 rounded-lg border border-neutral-200 dark:border-neutral-800 text-center">
          <div className="text-[10px] text-neutral-600 dark:text-neutral-400 uppercase font-bold">Avg Turnaround Time</div>
          <div className="text-xl font-bold font-mono text-neutral-700 dark:text-neutral-300">{result.avgTurn.toFixed(2)}</div>
        </div>
      </div>

      <div className="text-xs text-neutral-400 text-center bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3">
        📊 Edit arrival/burst times and switch algorithms to compare scheduling strategies.
      </div>
    </div>
  );
}
