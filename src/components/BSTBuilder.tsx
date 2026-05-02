'use client';

import { useState, useCallback, type ReactElement } from 'react';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x?: number;
  y?: number;
  highlight?: boolean;
  path?: boolean;
}

function insertNode(root: TreeNode | null, value: number, path: number[] = []): TreeNode {
  if (!root) {
    return { value, left: null, right: null, highlight: true, path: true };
  }

  const newPath = [...path, root.value];

  if (value < root.value) {
    const newLeft = insertNode(root.left, value, newPath);
    return {
      ...root,
      left: newLeft,
      highlight: false,
      path: newPath.includes(root.value) || root.value === value,
    };
  } else if (value > root.value) {
    const newRight = insertNode(root.right, value, newPath);
    return {
      ...root,
      right: newRight,
      highlight: false,
      path: newPath.includes(root.value) || root.value === value,
    };
  }
  return { ...root, highlight: false, path: false };
}

function clearHighlights(node: TreeNode | null): TreeNode | null {
  if (!node) return null;
  return {
    ...node,
    highlight: false,
    path: false,
    left: clearHighlights(node.left),
    right: clearHighlights(node.right),
  };
}

function assignPositions(root: TreeNode | null, x: number, y: number, spread: number): TreeNode | null {
  if (!root) return null;
  return {
    ...root,
    x,
    y,
    left: assignPositions(root.left, x - spread, y + 60, spread / 2),
    right: assignPositions(root.right, x + spread, y + 60, spread / 2),
  };
}

function inorderTraversal(node: TreeNode | null): number[] {
  if (!node) return [];
  return [...inorderTraversal(node.left), node.value, ...inorderTraversal(node.right)];
}

function preorderTraversal(node: TreeNode | null): number[] {
  if (!node) return [];
  return [node.value, ...preorderTraversal(node.left), ...preorderTraversal(node.right)];
}

function postorderTraversal(node: TreeNode | null): number[] {
  if (!node) return [];
  return [...postorderTraversal(node.left), ...postorderTraversal(node.right), node.value];
}

export default function BSTBuilder() {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [input, setInput] = useState('');
  const [insertOrder, setInsertOrder] = useState<number[]>([]);
  const [lastInserted, setLastInserted] = useState<number | null>(null);

  const handleInsert = useCallback((value: number) => {
    if (isNaN(value)) return;
    setRoot(prev => {
      let newRoot = insertNode(prev, value);
      newRoot = clearHighlights(newRoot) as TreeNode;
      // Re-insert to set path highlights
      newRoot = insertNode(prev, value);
      const width = 400;
      return assignPositions(newRoot, width / 2, 30, width / 4) as TreeNode;
    });
    setInsertOrder(prev => [...prev, value]);
    setLastInserted(value);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleInsert(Number(input.trim()));
      setInput('');
    }
  };

  const handleReset = () => {
    setRoot(null);
    setInsertOrder([]);
    setLastInserted(null);
    setInput('');
  };

  const inorder = inorderTraversal(root);
  const preorder = preorderTraversal(root);
  const postorder = postorderTraversal(root);

  // Render tree as SVG
  const renderTree = (node: TreeNode | null): ReactElement[] => {
    if (!node || node.x === undefined || node.y === undefined) return [];

    const elements: ReactElement[] = [];

    // Edges
    if (node.left && node.left.x !== undefined) {
      elements.push(
        <line
          key={`edge-${node.value}-L`}
          x1={node.x}
          y1={node.y}
          x2={node.left.x}
          y2={node.left.y}
          stroke={node.path && node.left.path ? '#525252' : '#d1d5db'}
          strokeWidth={node.path && node.left.path ? 2.5 : 1.5}
        />
      );
    }
    if (node.right && node.right.x !== undefined) {
      elements.push(
        <line
          key={`edge-${node.value}-R`}
          x1={node.x}
          y1={node.y}
          x2={node.right.x}
          y2={node.right.y}
          stroke={node.path && node.right.path ? '#525252' : '#d1d5db'}
          strokeWidth={node.path && node.right.path ? 2.5 : 1.5}
        />
      );
    }

    // Children
    elements.push(...renderTree(node.left));
    elements.push(...renderTree(node.right));

    // Node circle
    const isHighlighted = node.highlight;
    const isOnPath = node.path && !isHighlighted;

    elements.push(
      <g key={`node-${node.value}`}>
        <circle
          cx={node.x}
          cy={node.y}
          r={18}
          fill={isHighlighted ? '#525252' : isOnPath ? '#d4d4d4' : '#ffffff'}
          stroke={isHighlighted ? '#404040' : isOnPath ? '#525252' : '#d1d5db'}
          strokeWidth={isHighlighted ? 3 : isOnPath ? 2 : 1.5}
          className="transition-all duration-300"
        />
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="central"
          className={`text-xs font-bold ${isHighlighted ? 'fill-white' : 'fill-neutral-700 dark:fill-neutral-200'}`}
          style={{ fontSize: '12px', fontWeight: 700 }}
        >
          {node.value}
        </text>
      </g>
    );

    return elements;
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-500">Insert Value</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 text-sm font-mono bg-white dark:bg-neutral-800 border border-border dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500"
            placeholder="Enter a number..."
          />
          <button
            onClick={() => { if (input.trim()) { handleInsert(Number(input.trim())); setInput(''); } }}
            className="px-4 py-2 text-sm font-bold bg-accent text-accent-text rounded-lg hover:bg-accent-hover transition-colors"
          >
            Insert
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-2 text-sm font-bold bg-surface hover:bg-surface-hover rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[50, 30, 70, 20, 40, 60, 80].map(n => (
            <button
              key={n}
              onClick={() => handleInsert(n)}
              className="px-2 py-1 text-xs font-mono bg-neutral-100 dark:bg-neutral-800 rounded hover:bg-neutral-100 dark:hover:bg-neutral-900/30 transition-colors"
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Tree visualization */}
      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-border dark:border-border overflow-hidden">
        {root ? (
          <svg width="100%" height="200" viewBox="0 0 400 200" className="p-2">
            {renderTree(root)}
          </svg>
        ) : (
          <div className="h-48 flex items-center justify-center text-sm text-neutral-400">
            Insert numbers to build the BST
          </div>
        )}
      </div>

      {/* Insertion log */}
      {insertOrder.length > 0 && (
        <div className="text-xs text-neutral-500">
          <span className="font-bold">Insert order:</span>{' '}
          <span className="font-mono">{insertOrder.join(' → ')}</span>
          {lastInserted !== null && (
            <span className="ml-2 text-neutral-600 dark:text-neutral-400">
              Last inserted: <strong>{lastInserted}</strong>
            </span>
          )}
        </div>
      )}

      {/* Traversal results */}
      {root && (
        <div className="space-y-2">
          <div className="bg-neutral-50 dark:bg-neutral-900/20 rounded-lg p-3 border border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Inorder (sorted): </span>
            <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400">{inorder.join(', ')}</span>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-900/20 rounded-lg p-3 border border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Preorder: </span>
            <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400">{preorder.join(', ')}</span>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-900/20 rounded-lg p-3 border border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Postorder: </span>
            <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400">{postorder.join(', ')}</span>
          </div>
        </div>
      )}

      <div className="text-xs text-neutral-400 text-center bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3">
        🌳 Left child &lt; Root ≤ Right child. Inorder traversal always gives sorted output.
      </div>
    </div>
  );
}
