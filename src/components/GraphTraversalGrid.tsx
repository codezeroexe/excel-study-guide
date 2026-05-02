'use client';

import { useState, useCallback } from 'react';

type Node = {
  id: number;
  x: number;
  y: number;
  label: string;
};

type Edge = {
  from: number;
  to: number;
  weight: number;
};

type NodeState = 'unvisited' | 'visiting' | 'visited';

const defaultNodes: Node[] = [
  { id: 0, x: 150, y: 40, label: 'A' },
  { id: 1, x: 60, y: 120, label: 'B' },
  { id: 2, x: 240, y: 120, label: 'C' },
  { id: 3, x: 30, y: 220, label: 'D' },
  { id: 4, x: 120, y: 220, label: 'E' },
  { id: 5, x: 270, y: 220, label: 'F' },
];

const defaultEdges: Edge[] = [
  { from: 0, to: 1, weight: 4 },
  { from: 0, to: 2, weight: 2 },
  { from: 1, to: 2, weight: 1 },
  { from: 1, to: 3, weight: 5 },
  { from: 1, to: 4, weight: 10 },
  { from: 2, to: 5, weight: 3 },
  { from: 3, to: 4, weight: 2 },
  { from: 4, to: 5, weight: 4 },
];

function getAdjacencyList(nodes: Node[], edges: Edge[]): Map<number, { to: number; weight: number }[]> {
  const adj = new Map<number, { to: number; weight: number }[]>();
  for (const node of nodes) {
    adj.set(node.id, []);
  }
  for (const edge of edges) {
    adj.get(edge.from)!.push({ to: edge.to, weight: edge.weight });
    // Undirected: add reverse
    adj.get(edge.to)!.push({ to: edge.from, weight: edge.weight });
  }
  return adj;
}

function runDFS(nodes: Node[], edges: Edge[], startId: number): Array<{ nodeId: number; state: NodeState; distances: Map<number, number>; step: string }> {
  const steps: Array<{ nodeId: number; state: NodeState; distances: Map<number, number>; step: string }> = [];
  const adj = getAdjacencyList(nodes, edges);
  const visited = new Set<number>();
  const distances = new Map<number, number>();
  for (const node of nodes) distances.set(node.id, Infinity);

  function dfs(nodeId: number, depth: number) {
    visited.add(nodeId);
    distances.set(nodeId, depth);
    const node = nodes.find(n => n.id === nodeId)!;

    steps.push({
      nodeId,
      state: 'visiting',
      distances: new Map(distances),
      step: `DFS: Visit ${node.label} (depth ${depth})`,
    });

    const neighbors = adj.get(nodeId) || [];
    for (const { to } of neighbors) {
      if (!visited.has(to)) {
        dfs(to, depth + 1);
      }
    }

    steps.push({
      nodeId,
      state: 'visited',
      distances: new Map(distances),
      step: `DFS: Finished ${node.label}, backtrack`,
    });
  }

  dfs(startId, 0);
  return steps;
}

function runBFS(nodes: Node[], edges: Edge[], startId: number): Array<{ nodeId: number; state: NodeState; distances: Map<number, number>; step: string }> {
  const steps: Array<{ nodeId: number; state: NodeState; distances: Map<number, number>; step: string }> = [];
  const adj = getAdjacencyList(nodes, edges);
  const visited = new Set<number>();
  const distances = new Map<number, number>();
  for (const node of nodes) distances.set(node.id, Infinity);

  const queue: number[] = [startId];
  visited.add(startId);
  distances.set(startId, 0);

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    const node = nodes.find(n => n.id === nodeId)!;

    steps.push({
      nodeId,
      state: 'visiting',
      distances: new Map(distances),
      step: `BFS: Visit ${node.label} (distance ${distances.get(nodeId)})`,
    });

    const neighbors = adj.get(nodeId) || [];
    for (const { to } of neighbors) {
      if (!visited.has(to)) {
        visited.add(to);
        distances.set(to, (distances.get(nodeId) || 0) + 1);
        const neighborNode = nodes.find(n => n.id === to)!;
        steps.push({
          nodeId: to,
          state: 'visiting',
          distances: new Map(distances),
          step: `BFS: Enqueue ${neighborNode.label} (distance ${distances.get(to)})`,
        });
        queue.push(to);
      }
    }

    steps.push({
      nodeId,
      state: 'visited',
      distances: new Map(distances),
      step: `BFS: Finished ${node.label}`,
    });
  }

  return steps;
}

function runDijkstra(nodes: Node[], edges: Edge[], startId: number): Array<{ nodeId: number; state: NodeState; distances: Map<number, number>; step: string }> {
  const steps: Array<{ nodeId: number; state: NodeState; distances: Map<number, number>; step: string }> = [];
  const adj = getAdjacencyList(nodes, edges);
  const distances = new Map<number, number>();
  const visited = new Set<number>();

  for (const node of nodes) {
    distances.set(node.id, node.id === startId ? 0 : Infinity);
  }

  const startNode = nodes.find(n => n.id === startId)!;
  steps.push({
    nodeId: startId,
    state: 'visiting',
    distances: new Map(distances),
    step: `Dijkstra: Initialize — ${startNode.label} distance = 0, all others = ∞`,
  });

  while (true) {
    // Find unvisited node with minimum distance
    let minDist = Infinity;
    let minNode: Node | null = null;
    for (const node of nodes) {
      if (!visited.has(node.id) && (distances.get(node.id) || Infinity) < minDist) {
        minDist = distances.get(node.id) || Infinity;
        minNode = node;
      }
    }

    if (!minNode || minDist === Infinity) break;

    visited.add(minNode.id);
    steps.push({
      nodeId: minNode.id,
      state: 'visiting',
      distances: new Map(distances),
      step: `Dijkstra: Pick ${minNode.label} (dist=${minDist}) — finalize`,
    });

    // Relax neighbors
    const neighbors = adj.get(minNode.id) || [];
    for (const { to, weight } of neighbors) {
      if (!visited.has(to)) {
        const newDist = minDist + weight;
        const oldDist = distances.get(to) || Infinity;
        if (newDist < oldDist) {
          distances.set(to, newDist);
          const neighborNode = nodes.find(n => n.id === to)!;
          steps.push({
            nodeId: to,
            state: 'visiting',
            distances: new Map(distances),
            step: `Dijkstra: Relax ${minNode.label}→${neighborNode.label}: ${minDist}+${weight}=${newDist} < ${oldDist === Infinity ? '∞' : oldDist} → update`,
          });
        }
      }
    }

    steps.push({
      nodeId: minNode.id,
      state: 'visited',
      distances: new Map(distances),
      step: `Dijkstra: ${minNode.label} finalized at distance ${minDist}`,
    });
  }

  return steps;
}

export default function GraphTraversalGrid() {
  const [nodes] = useState<Node[]>(defaultNodes);
  const [edges] = useState<Edge[]>(defaultEdges);
  const [startNode, setStartNode] = useState(0);
  const [algorithm, setAlgorithm] = useState<'DFS' | 'BFS' | 'Dijkstra'>('DFS');
  const [nodeStates, setNodeStates] = useState<Map<number, NodeState>>(new Map());
  const [distances, setDistances] = useState<Map<number, number>>(new Map());
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Array<{ nodeId: number; state: NodeState; distances: Map<number, number>; step: string }>>([]);
  const [running, setRunning] = useState(false);

  const handleRun = useCallback(() => {
    let result: Array<{ nodeId: number; state: NodeState; distances: Map<number, number>; step: string }>;
    switch (algorithm) {
      case 'DFS':
        result = runDFS(nodes, edges, startNode);
        break;
      case 'BFS':
        result = runBFS(nodes, edges, startNode);
        break;
      case 'Dijkstra':
        result = runDijkstra(nodes, edges, startNode);
        break;
    }
    setSteps(result);
    setCurrentStep(0);
    setRunning(false);

    // Apply first step
    if (result.length > 0) {
      const first = result[0];
      const states = new Map<number, NodeState>();
      for (const node of nodes) states.set(node.id, 'unvisited');
      states.set(first.nodeId, first.state);
      setNodeStates(states);
      setDistances(first.distances);
    }
  }, [algorithm, startNode, nodes, edges]);

  const handleStep = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      const step = steps[next];
      const states = new Map(nodeStates);
      // Reset all visiting to visited
      for (const [id, state] of states) {
        if (state === 'visiting') states.set(id, 'visited');
      }
      states.set(step.nodeId, step.state);
      setNodeStates(states);
      setDistances(step.distances);
    }
  };

  const handleAutoPlay = () => {
    if (running) {
      setRunning(false);
      return;
    }
    if (steps.length === 0) handleRun();
    setRunning(true);
  };

  // Auto-play
  useState(() => {
    if (!running || currentStep >= steps.length - 1) {
      setRunning(false);
      return;
    }
    const timer = setTimeout(() => handleStep(), 600);
    return () => clearTimeout(timer);
  });

  const handleReset = () => {
    setSteps([]);
    setCurrentStep(0);
    setNodeStates(new Map());
    setDistances(new Map());
    setRunning(false);
  };

  const getNodeColor = (nodeId: number): string => {
    const state = nodeStates.get(nodeId);
    switch (state) {
      case 'visiting': return '#a3a3a3';
      case 'visited': return '#737373';
      default: return '#e5e7eb';
    }
  };

  const getNodeTextColor = (nodeId: number): string => {
    const state = nodeStates.get(nodeId);
    switch (state) {
      case 'visiting': return '#ffffff';
      case 'visited': return '#ffffff';
      default: return '#374151';
    }
  };

  const currentStepInfo = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {(['DFS', 'BFS', 'Dijkstra'] as const).map(algo => (
            <button
              key={algo}
              onClick={() => { setAlgorithm(algo); handleReset(); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all ${
                algorithm === algo
                  ? 'bg-accent text-accent-text border-neutral-600 shadow-sm'
                  : 'border-border dark:border-border text-neutral-400'
              }`}
            >
              {algo}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-neutral-500">Start Node:</label>
          <select
            value={startNode}
            onChange={e => { setStartNode(Number(e.target.value)); handleReset(); }}
            className="px-2 py-1 text-sm bg-white dark:bg-neutral-800 border border-border dark:border-border rounded"
          >
            {nodes.map(n => (
              <option key={n.id} value={n.id}>{n.label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRun}
            className="px-4 py-2 text-sm font-bold bg-accent text-accent-text rounded-lg hover:bg-neutral-700 transition-colors"
          >
            ▶ Run
          </button>
          {steps.length > 0 && (
            <>
              <button
                onClick={handleStep}
                disabled={currentStep >= steps.length - 1}
                className="px-3 py-2 text-sm font-bold bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-40 transition-colors"
              >
                Step →
              </button>
              <button
                onClick={handleAutoPlay}
                className="px-3 py-2 text-sm font-bold bg-neutral-100 dark:bg-neutral-900/30 text-neutral-700 dark:text-neutral-300 rounded hover:bg-neutral-200 dark:hover:bg-neutral-900/50 transition-colors"
              >
                {running ? '⏸' : '▶ Auto'}
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-2 text-sm font-bold bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                Reset
              </button>
            </>
          )}
          {steps.length > 0 && (
            <span className="text-xs text-neutral-400 self-center">
              Step {currentStep + 1} / {steps.length}
            </span>
          )}
        </div>
      </div>

      {/* Graph visualization */}
      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-border dark:border-border overflow-hidden">
        <svg width="100%" height="280" viewBox="0 0 300 280" className="p-2">
          {/* Edges */}
          {edges.map((edge, i) => {
            const fromNode = nodes.find(n => n.id === edge.from)!;
            const toNode = nodes.find(n => n.id === edge.to)!;
            return (
              <g key={`edge-${i}`}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="#d1d5db"
                  strokeWidth={1.5}
                />
                {/* Weight label */}
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 - 5}
                  textAnchor="middle"
                  className="text-[10px] fill-neutral-500 font-mono"
                >
                  {edge.weight}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map(node => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill={getNodeColor(node.id)}
                stroke={nodeStates.get(node.id) === 'visiting' ? '#a3a3a3' : nodeStates.get(node.id) === 'visited' ? '#737373' : '#d1d5db'}
                strokeWidth={nodeStates.has(node.id) ? 3 : 1.5}
                className="transition-all duration-300"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: '13px', fontWeight: 700 }}
                fill={getNodeTextColor(node.id)}
              >
                {node.label}
              </text>
              {/* Distance label */}
              {distances.has(node.id) && distances.get(node.id) !== Infinity && (
                <text
                  x={node.x}
                  y={node.y - 28}
                  textAnchor="middle"
                  className="text-[10px] font-mono font-bold fill-neutral-600 dark:fill-neutral-400"
                >
                  {distances.get(node.id)}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-neutral-200 border border-neutral-300" />
          <span className="text-neutral-500">Unvisited</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-neutral-700" />
          <span className="text-neutral-500">Visiting</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-neutral-700" />
          <span className="text-neutral-500">Visited</span>
        </div>
      </div>

      {/* Step explanation */}
      {currentStepInfo && (
        <div className="bg-neutral-50 dark:bg-neutral-900/20 rounded-lg p-3 border border-neutral-200 dark:border-neutral-800">
          <div className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{currentStepInfo.step}</div>
        </div>
      )}

      {/* Final distances for Dijkstra */}
      {algorithm === 'Dijkstra' && currentStep >= steps.length - 1 && steps.length > 0 && (
        <div className="bg-neutral-50 dark:bg-neutral-900/20 rounded-lg p-3 border border-neutral-200 dark:border-neutral-800">
          <div className="text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2">Shortest Distances from {nodes.find(n => n.id === startNode)?.label}:</div>
          <div className="flex flex-wrap gap-2">
            {nodes.map(node => (
              <span key={node.id} className="font-mono text-sm text-neutral-600 dark:text-neutral-400">
                {node.label}: {distances.get(node.id) === Infinity ? '∞' : distances.get(node.id)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
