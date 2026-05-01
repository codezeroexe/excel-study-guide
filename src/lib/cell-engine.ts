export interface CellPosition {
  row: number;
  col: number;
}

export function parseCellRef(ref: string): CellPosition | null {
  const match = ref.match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;
  const colStr = match[1];
  const row = parseInt(match[2], 10) - 1;
  let col = 0;
  for (let i = 0; i < colStr.length; i++) {
    col = col * 26 + (colStr.charCodeAt(i) - 64);
  }
  return { row, col: col - 1 };
}

export function cellRef(row: number, col: number): string {
  let colStr = '';
  let c = col + 1;
  while (c > 0) {
    c--;
    colStr = String.fromCharCode(65 + (c % 26)) + colStr;
    c = Math.floor(c / 26);
  }
  return `${colStr}${row + 1}`;
}

export function isAbsoluteRef(ref: string): boolean {
  return ref.includes('$');
}

export function resolveReference(
  ref: string,
  baseRow: number,
  baseCol: number,
  deltaRow: number,
  deltaCol: number
): string {
  const cleanRef = ref.replace(/\$/g, '');
  const pos = parseCellRef(cleanRef);
  if (!pos) return ref;

  let newRow = pos.row;
  let newCol = pos.col;

  if (!ref.includes('$') || !ref.match(/^\$[A-Z]+\$/)) {
    if (!ref.match(/^\$[A-Z]/)) newRow += deltaRow;
    if (!ref.match(/[A-Z]\$\d/)) newCol += deltaCol;
  }

  if (ref.includes('$')) {
    const colLocked = ref.match(/^\$/);
    const rowLocked = ref.match(/\$\d/);
    if (colLocked) newCol = pos.col;
    if (rowLocked) newRow = pos.row;
  }

  return cellRef(newRow, newCol);
}

export function evaluateSimpleFormula(
  formula: string,
  data: string[][]
): string {
  if (!formula.startsWith('=')) return formula;

  const expr = formula.slice(1);

  // Handle SUM
  const sumMatch = expr.match(/^SUM\(([A-Z]\d+):([A-Z]\d+)\)$/i);
  if (sumMatch) {
    const start = parseCellRef(sumMatch[1].toUpperCase());
    const end = parseCellRef(sumMatch[2].toUpperCase());
    if (start && end) {
      let total = 0;
      for (let r = start.row; r <= end.row; r++) {
        for (let c = start.col; c <= end.col; c++) {
          const val = data[r]?.[c];
          if (val && !isNaN(Number(val))) total += Number(val);
        }
      }
      return String(total);
    }
  }

  // Handle COUNT
  const countMatch = expr.match(/^COUNT\(([A-Z]\d+):([A-Z]\d+)\)$/i);
  if (countMatch) {
    const start = parseCellRef(countMatch[1].toUpperCase());
    const end = parseCellRef(countMatch[2].toUpperCase());
    if (start && end) {
      let count = 0;
      for (let r = start.row; r <= end.row; r++) {
        for (let c = start.col; c <= end.col; c++) {
          const val = data[r]?.[c];
          if (val && !isNaN(Number(val))) count++;
        }
      }
      return String(count);
    }
  }

  // Handle AVERAGE
  const avgMatch = expr.match(/^AVERAGE\(([A-Z]\d+):([A-Z]\d+)\)$/i);
  if (avgMatch) {
    const start = parseCellRef(avgMatch[1].toUpperCase());
    const end = parseCellRef(avgMatch[2].toUpperCase());
    if (start && end) {
      let total = 0;
      let count = 0;
      for (let r = start.row; r <= end.row; r++) {
        for (let c = start.col; c <= end.col; c++) {
          const val = data[r]?.[c];
          if (val && !isNaN(Number(val))) {
            total += Number(val);
            count++;
          }
        }
      }
      return count > 0 ? String((total / count).toFixed(1)) : '0';
    }
  }

  // Handle simple arithmetic with cell references
  let evalExpr = expr;
  const cellRefs = expr.match(/[A-Z]+\d+/gi) || [];
  for (const ref of cellRefs) {
    const pos = parseCellRef(ref.toUpperCase());
    if (pos) {
      const val = data[pos.row]?.[pos.col];
      if (val && !isNaN(Number(val))) {
        evalExpr = evalExpr.replace(new RegExp(ref, 'gi'), val);
      }
    }
  }

  try {
    const result = Function('"use strict"; return (' + evalExpr + ')')();
    if (typeof result === 'number') {
      return Number.isInteger(result) ? String(result) : result.toFixed(2);
    }
  } catch {
    // fall through
  }

  return expr;
}
