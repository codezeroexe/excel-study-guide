'use client';

import { useState } from 'react';

type Block = { id: string; size: number; color: string; processId: string | null; free: boolean };

const TOTAL_MEMORY = 64;
const BLOCK_COLORS = ['#525252', '#737373', '#a3a3a3', '#525252', '#404040', '#737373', '#a3a3a3'];

const initialBlocks: Block[] = [
  { id: 'b0', size: 8, color: BLOCK_COLORS[0], processId: 'P1', free: false },
  { id: 'b1', size: 4, color: '#e5e7eb', processId: null, free: true },
  { id: 'b2', size: 12, color: BLOCK_COLORS[1], processId: 'P2', free: false },
  { id: 'b3', size: 6, color: '#e5e7eb', processId: null, free: true },
  { id: 'b4', size: 10, color: BLOCK_COLORS[2], processId: 'P3', free: false },
  { id: 'b5', size: 8, color: '#e5e7eb', processId: null, free: true },
  { id: 'b6', size: 16, color: BLOCK_COLORS[3], processId: 'P4', free: false },
];

export default function MemoryFragmentationSandbox() {
  const [mode, setMode] = useState<'contiguous' | 'paging'>('contiguous');
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [nextProc, setNextProc] = useState(5);
  const [allocSize, setAllocSize] = useState(6);
  const [message, setMessage] = useState('');
  const [strategy, setStrategy] = useState<'first' | 'best' | 'worst'>('first');

  const totalFree = blocks.filter(b => b.free).reduce((s, b) => s + b.size, 0);
  const freeBlocks = blocks.filter(b => b.free);
  const largestFree = Math.max(...freeBlocks.map(b => b.size), 0);
  const externalFrag = totalFree > 0 && largestFree < allocSize;
  const usedBlocks = blocks.filter(b => !b.free);

  const allocate = () => {
    if (mode === 'contiguous') {
      let idx = -1;
      if (strategy === 'first') {
        idx = blocks.findIndex(b => b.free && b.size >= allocSize);
      } else if (strategy === 'best') {
        let bestSize = Infinity;
        blocks.forEach((b, i) => { if (b.free && b.size >= allocSize && b.size < bestSize) { bestSize = b.size; idx = i; } });
      } else {
        let worstSize = -1;
        blocks.forEach((b, i) => { if (b.free && b.size >= allocSize && b.size > worstSize) { worstSize = b.size; idx = i; } });
      }

      if (idx === -1) {
        setMessage(`Cannot allocate ${allocSize} units — no contiguous block large enough (external fragmentation!)`);
        return;
      }

      setBlocks(prev => {
        const newBlocks = [...prev];
        const block = newBlocks[idx];
        const color = BLOCK_COLORS[(nextProc - 1) % BLOCK_COLORS.length];
        if (block.size === allocSize) {
          newBlocks[idx] = { ...block, processId: `P${nextProc}`, free: false, color };
        } else {
          newBlocks[idx] = { ...block, size: allocSize, processId: `P${nextProc}`, free: false, color };
          newBlocks.splice(idx + 1, 0, { id: `b${Date.now()}`, size: block.size - allocSize, color: '#e5e7eb', processId: null, free: true });
        }
        return newBlocks;
      });
      setMessage(`Allocated ${allocSize} units to P${nextProc} (${strategy === 'first' ? 'First' : strategy === 'best' ? 'Best' : 'Worst'} Fit)`);
    } else {
      // Paging mode
      const pageSize = 4;
      const pagesNeeded = Math.ceil(allocSize / pageSize);
      const totalFreePages = blocks.filter(b => b.free).reduce((s, b) => s + Math.floor(b.size / pageSize), 0);
      if (totalFreePages < pagesNeeded) {
        setMessage(`Not enough free pages (${totalFreePages} < ${pagesNeeded})`);
        return;
      }

      setBlocks(prev => {
        const newBlocks = [...prev];
        let remaining = pagesNeeded;
        const color = BLOCK_COLORS[(nextProc - 1) % BLOCK_COLORS.length];
        for (let i = 0; i < newBlocks.length && remaining > 0; i++) {
          if (newBlocks[i].free) {
            const pagesInBlock = Math.floor(newBlocks[i].size / pageSize);
            const pagesToAlloc = Math.min(pagesInBlock, remaining);
            if (pagesToAlloc > 0) {
              const allocBytes = pagesToAlloc * pageSize;
              const remainder = newBlocks[i].size - allocBytes;
              newBlocks[i] = { ...newBlocks[i], size: allocBytes, processId: `P${nextProc}`, free: false, color };
              if (remainder > 0) {
                newBlocks.splice(i + 1, 0, { id: `b${Date.now()}-${i}`, size: remainder, color: '#e5e7eb', processId: null, free: true });
              }
              remaining -= pagesToAlloc;
            }
          }
        }
        return newBlocks;
      });
      setMessage(`Allocated ${allocSize} units to P${nextProc} across ${pagesNeeded} page(s) — no external fragmentation!`);
    }
    setNextProc(prev => prev + 1);
  };

  const deallocate = (procId: string) => {
    setBlocks(prev => prev.map(b => b.processId === procId ? { ...b, processId: null, free: true, color: '#e5e7eb' } : b));
    setMessage(`Freed ${procId} — memory returned (creates external fragmentation in contiguous mode)`);
  };

  const reset = () => {
    setBlocks(initialBlocks);
    setNextProc(5);
    setMessage('');
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2">
          <button onClick={() => { setMode('contiguous'); setMessage(''); }} className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all ${mode === 'contiguous' ? 'bg-neutral-900 text-white border-neutral-600' : 'border-neutral-200 dark:border-neutral-700 text-neutral-400'}`}>
            Contiguous
          </button>
          <button onClick={() => { setMode('paging'); setMessage(''); }} className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all ${mode === 'paging' ? 'bg-neutral-900 text-white border-neutral-600' : 'border-neutral-200 dark:border-neutral-700 text-neutral-400'}`}>
            Paging
          </button>
        </div>
        {mode === 'contiguous' && (
          <div className="flex gap-1">
            {(['first', 'best', 'worst'] as const).map(s => (
              <button key={s} onClick={() => setStrategy(s)} className={`px-2 py-1 text-[10px] font-bold rounded border transition-all ${strategy === s ? 'bg-neutral-100 dark:bg-neutral-900/30 border-neutral-400 text-neutral-700 dark:text-neutral-300' : 'border-neutral-200 dark:border-neutral-700 text-neutral-400'}`}>
                {s === 'first' ? 'First' : s === 'best' ? 'Best' : 'Worst'} Fit
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-500">Size:</label>
          <input type="number" min="1" max={TOTAL_MEMORY} value={allocSize} onChange={e => setAllocSize(Math.max(1, Number(e.target.value)))} className="w-14 px-1 py-0.5 text-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded font-mono text-xs" />
        </div>
        <button onClick={allocate} className="px-3 py-1.5 text-xs font-bold bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors">
          Allocate
        </button>
        <button onClick={reset} className="px-3 py-1.5 text-xs font-bold bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
          Reset
        </button>
      </div>

      {/* Memory bar */}
      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
        <div className="text-xs font-bold text-neutral-500 mb-2">Memory ({TOTAL_MEMORY} units total)</div>
        <div className="flex h-16 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
          {blocks.map((block) => (
            <div
              key={block.id}
              className="flex items-center justify-center text-xs font-bold transition-all cursor-pointer hover:opacity-80 relative group"
              style={{ width: `${(block.size / TOTAL_MEMORY) * 100}%`, backgroundColor: block.color, color: block.free ? '#9ca3af' : 'white' }}
              onClick={() => !block.free && deallocate(block.processId!)}
            >
              <span className="truncate px-0.5">{block.free ? 'Free' : block.processId}</span>
              <span className="text-[9px] opacity-60 ml-0.5">{block.size}</span>
              {!block.free && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-neutral-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  Click to free {block.processId} ({block.size} units)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded text-center">
          <div className="text-[10px] text-neutral-400 uppercase">Total Free</div>
          <div className="text-lg font-bold font-mono">{totalFree}</div>
        </div>
        <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded text-center">
          <div className="text-[10px] text-neutral-400 uppercase">Largest Block</div>
          <div className="text-lg font-bold font-mono">{largestFree}</div>
        </div>
        <div className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded text-center">
          <div className="text-[10px] text-neutral-400 uppercase">Free Blocks</div>
          <div className="text-lg font-bold font-mono">{freeBlocks.length}</div>
        </div>
        <div className={`p-2 rounded text-center ${externalFrag ? 'bg-neutral-50 dark:bg-neutral-900/20 border border-neutral-200 dark:border-neutral-800' : 'bg-neutral-50 dark:bg-neutral-900/20 border border-neutral-200 dark:border-neutral-800'}`}>
          <div className="text-[10px] uppercase font-bold">{externalFrag ? '⚠ External Frag' : '✓ Allocatable'}</div>
          <div className="text-[10px] text-neutral-500">{externalFrag ? `${totalFree} free, none ≥ ${allocSize}` : 'Can allocate'}</div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="bg-neutral-50 dark:bg-neutral-900/20 rounded-lg p-3 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300">
          {message}
        </div>
      )}

      {/* Active processes */}
      {usedBlocks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {usedBlocks.map(b => (
            <button key={b.id} onClick={() => deallocate(b.processId!)} className="px-2 py-1 text-xs font-mono rounded border transition-colors hover:opacity-70" style={{ backgroundColor: b.color + '20', borderColor: b.color, color: b.color }}>
              {b.processId} ({b.size}) ✕
            </button>
          ))}
        </div>
      )}

      <div className="text-xs text-neutral-400 text-center bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3">
        {mode === 'contiguous'
          ? '📦 Contiguous: needs one continuous block. Free memory in fragments = external fragmentation.'
          : '📄 Paging: splits across any free frames. No external fragmentation, but may have internal fragmentation.'
        }
      </div>
    </div>
  );
}
