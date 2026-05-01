'use client';

import { useState, useCallback, useRef } from 'react';

type SortStep = {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  algorithm: string;
};

function bubbleSortSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const n = a.length;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j + 1], swapping: [], sorted: [...sorted], algorithm: 'Bubble' });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ array: [...a], comparing: [], swapping: [j, j + 1], sorted: [...sorted], algorithm: 'Bubble' });
      }
    }
    sorted.push(n - 1 - i);
  }
  sorted.push(0);
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], algorithm: 'Bubble' });
  return steps;
}

function selectionSortSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const n = a.length;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({ array: [...a], comparing: [minIdx, j], swapping: [], sorted: [...sorted], algorithm: 'Selection' });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({ array: [...a], comparing: [], swapping: [i, minIdx], sorted: [...sorted], algorithm: 'Selection' });
    }
    sorted.push(i);
  }
  sorted.push(n - 1);
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], algorithm: 'Selection' });
  return steps;
}

function insertionSortSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const n = a.length;
  const sorted: number[] = [0];

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;
    steps.push({ array: [...a], comparing: [i], swapping: [], sorted: [...sorted], algorithm: 'Insertion' });
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      steps.push({ array: [...a], comparing: [j, j + 1], swapping: [j, j + 1], sorted: [...sorted], algorithm: 'Insertion' });
      j--;
    }
    a[j + 1] = key;
    sorted.push(i);
    steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], algorithm: 'Insertion' });
  }
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: n }, (_, i) => i), algorithm: 'Insertion' });
  return steps;
}

function quickSortSteps(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const sorted: number[] = [];

  function partition(low: number, high: number): number {
    const pivot = a[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({ array: [...a], comparing: [j, high], swapping: [], sorted: [...sorted], algorithm: 'Quick' });
      if (a[j] <= pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({ array: [...a], comparing: [], swapping: [i, j], sorted: [...sorted], algorithm: 'Quick' });
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({ array: [...a], comparing: [], swapping: [i + 1, high], sorted: [...sorted], algorithm: 'Quick' });
    return i + 1;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      sorted.push(pi);
      sort(low, pi - 1);
      sort(pi + 1, high);
    } else if (low === high) {
      sorted.push(low);
    }
  }

  sort(0, a.length - 1);
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: a.length }, (_, i) => i), algorithm: 'Quick' });
  return steps;
}

const sortGenerators: Record<string, (arr: number[]) => SortStep[]> = {
  Bubble: bubbleSortSteps,
  Selection: selectionSortSteps,
  Insertion: insertionSortSteps,
  Quick: quickSortSteps,
};

const sortColors: Record<string, string> = {
  Bubble: '#ef4444',
  Selection: '#f59e0b',
  Insertion: '#22c55e',
  Quick: '#8b5cf6',
};

export default function SortingRace() {
  const [size, setSize] = useState(20);
  const [speed, setSpeed] = useState(100);
  const [algorithms, setAlgorithms] = useState<string[]>(['Bubble', 'Insertion', 'Quick']);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Record<string, { steps: number; done: boolean }>>({});
  const intervalsRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  const generateArray = useCallback(() => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
  }, [size]);

  const [arrays, setArrays] = useState<Record<string, number[]>>({});
  const [currentSteps, setCurrentSteps] = useState<Record<string, SortStep | null>>({});

  const handleGenerate = () => {
    const arr = generateArray();
    const newArrays: Record<string, number[]> = {};
    const newSteps: Record<string, SortStep | null> = {};
    for (const algo of algorithms) {
      newArrays[algo] = [...arr];
      newSteps[algo] = null;
    }
    setArrays(newArrays);
    setCurrentSteps(newSteps);
    setResults({});
    setRunning(false);
  };

  const handleStart = () => {
    if (Object.keys(arrays).length === 0) handleGenerate();
    setRunning(true);

    const newResults: Record<string, { steps: number; done: boolean }> = {};
    const newIntervals: Record<string, ReturnType<typeof setInterval>> = {};

    for (const algo of algorithms) {
      const arr = arrays[algo] || generateArray();
      const steps = sortGenerators[algo](arr);
      newResults[algo] = { steps: steps.length, done: false };

      let idx = 0;
      newIntervals[algo] = setInterval(() => {
        if (idx < steps.length) {
          setCurrentSteps(prev => ({ ...prev, [algo]: steps[idx] }));
          idx++;
        } else {
          clearInterval(newIntervals[algo]);
          setResults(prev => ({ ...prev, [algo]: { steps: steps.length, done: true } }));
          // Check if all done
          setRunning(false);
        }
      }, speed);
    }

    intervalsRef.current = newIntervals;
    setResults(newResults);
  };

  const handleStop = () => {
    for (const interval of Object.values(intervalsRef.current)) {
      clearInterval(interval);
    }
    setRunning(false);
  };

  const toggleAlgo = (algo: string) => {
    if (running) return;
    setAlgorithms(prev =>
      prev.includes(algo) ? prev.filter(a => a !== algo) : [...prev, algo]
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {Object.keys(sortGenerators).map(algo => (
            <button
              key={algo}
              onClick={() => toggleAlgo(algo)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all ${
                algorithms.includes(algo)
                  ? 'text-white border-current shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 text-gray-400'
              }`}
              style={algorithms.includes(algo) ? { backgroundColor: sortColors[algo], borderColor: sortColors[algo] } : {}}
            >
              {algo}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Array Size: <span className="font-mono font-bold">{size}</span>
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={size}
              onChange={e => { setSize(Number(e.target.value)); setArrays({}); setCurrentSteps({}); setResults({}); }}
              className="w-full accent-purple-600"
              disabled={running}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">
              Speed: <span className="font-mono font-bold">{speed}ms</span>
            </label>
            <input
              type="range"
              min="20"
              max="500"
              step="20"
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleGenerate}
            disabled={running}
            className="px-4 py-2 text-sm font-bold bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors"
          >
            🎲 New Array
          </button>
          {!running ? (
            <button
              onClick={handleStart}
              className="px-4 py-2 text-sm font-bold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              ▶ Race!
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="px-4 py-2 text-sm font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              ⏹ Stop
            </button>
          )}
        </div>
      </div>

      {/* Sort visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {algorithms.map(algo => {
          const step = currentSteps[algo];
          const result = results[algo];
          const arr = step ? step.array : arrays[algo] || [];
          const maxVal = Math.max(...arr, 1);

          return (
            <div key={algo} className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold" style={{ color: sortColors[algo] }}>{algo} Sort</span>
                {result?.done && <span className="text-xs font-bold text-green-600">✓ Done!</span>}
                {result && !result.done && <span className="text-xs text-gray-400">{Object.keys(currentSteps).length > 0 ? 'Running...' : ''}</span>}
              </div>
              <div className="flex items-end gap-px h-32">
                {arr.map((val, i) => {
                  const height = (val / maxVal) * 100;
                  const isComparing = step?.comparing.includes(i);
                  const isSwapping = step?.swapping.includes(i);
                  const isSorted = step?.sorted.includes(i);
                  let bg = sortColors[algo] + '80';
                  if (isSwapping) bg = '#ef4444';
                  else if (isComparing) bg = '#f59e0b';
                  else if (isSorted) bg = '#22c55e';

                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-t transition-all"
                      style={{
                        height: `${height}%`,
                        backgroundColor: bg,
                        minWidth: '2px',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-400 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        🏁 Watch how O(n log n) algorithms (Quick) beat O(n²) algorithms (Bubble, Selection) as array size grows.
      </div>
    </div>
  );
}
