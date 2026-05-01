import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubjectById, subjects } from '@/data/subjects';
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Sigma } from 'lucide-react';

// Excel components
import SpreadsheetGrid from '@/components/SpreadsheetGrid';
import FormulaVisualizer from '@/components/FormulaVisualizer';
import LookupAnimator from '@/components/LookupAnimator';
import ReferenceToggle from '@/components/ReferenceToggle';
import ConditionBuilder from '@/components/ConditionBuilder';
import ChartRenderer from '@/components/ChartRenderer';
import FilterPanel from '@/components/FilterPanel';
import PivotBuilder from '@/components/PivotBuilder';

// ML components
import MathFormula from '@/components/MathFormula';
import DataTable from '@/components/DataTable';
import ConfusionMatrixCalc from '@/components/ConfusionMatrixCalc';
import ScalingSandbox from '@/components/ScalingSandbox';
import BestFitLine from '@/components/BestFitLine';
import NeuralNetworkViz from '@/components/NeuralNetworkViz';

// DSA components
import ComplexityGrapher from '@/components/ComplexityGrapher';
import InfixPostfixSimulator from '@/components/InfixPostfixSimulator';
import SortingRace from '@/components/SortingRace';
import BSTBuilder from '@/components/BSTBuilder';
import GraphTraversalGrid from '@/components/GraphTraversalGrid';

// OS components
import GanttChartGenerator from '@/components/GanttChartGenerator';
import MemoryFragmentationSandbox from '@/components/MemoryFragmentationSandbox';
import ProcessStateMachine from '@/components/ProcessStateMachine';

import QuizCard from '@/components/QuizCard';

export function generateStaticParams() {
  const params: { subject: string; id: string }[] = [];
  for (const sub of subjects) {
    for (const mod of sub.modules) {
      params.push({ subject: sub.id, id: mod.id });
    }
  }
  return params;
}

// Helper to convert sampleData to records for Excel components
function getExcelRecords(sampleData: Record<string, string[][]>) {
  const firstTable = Object.values(sampleData)[0];
  const headers = firstTable[0];
  const records = firstTable.slice(1).map((row: string[]) => {
    const record: Record<string, string> = {};
    headers.forEach((h: string, j: number) => { record[h] = row[j] || ''; });
    return record;
  });
  return { headers: headers as string[], records };
}

export default async function ModulePage({ params }: { params: Promise<{ subject: string; id: string }> }) {
  const { subject, id } = await params;
  const sub = getSubjectById(subject);
  if (!sub) notFound();

  const mod = sub.modules.find(m => m.id === id);
  if (!mod) notFound();

  const idx = sub.modules.findIndex(m => m.id === id);
  const prev = idx > 0 ? sub.modules[idx - 1] : null;
  const next = idx < sub.modules.length - 1 ? sub.modules[idx + 1] : null;

  const colorMap: Record<string, { text: string; badge: string; bg: string; btn: string; btnHover: string }> = {
    green: { text: 'text-green-600', badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300', bg: 'from-green-50 to-white dark:from-green-950/20 dark:to-gray-950', btn: 'bg-green-600', btnHover: 'hover:bg-green-700' },
    blue: { text: 'text-blue-600', badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300', bg: 'from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950', btn: 'bg-blue-600', btnHover: 'hover:bg-blue-700' },
    purple: { text: 'text-purple-600', badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300', bg: 'from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-950', btn: 'bg-purple-600', btnHover: 'hover:bg-purple-700' },
    amber: { text: 'text-amber-600', badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300', bg: 'from-amber-50 to-white dark:from-amber-950/20 dark:to-gray-950', btn: 'bg-amber-600', btnHover: 'hover:bg-amber-700' },
  };
  const colors = colorMap[sub.color] || colorMap.green;

  const isExcel = subject === 'excel';
  const isDSA = subject === 'dsa';
  const isOS = subject === 'os';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/${subject}`} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {sub.shortName} Modules
          </Link>
          <span className="text-xs text-gray-400">Module {idx + 1} of {sub.modules.length}</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Title */}
        <div className="mb-8">
          <div className={`inline-flex px-2 py-0.5 ${colors.badge} rounded text-xs font-medium mb-2`}>
            {sub.shortName} • Module {idx + 1}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{mod.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">{mod.description}</p>
        </div>

        {/* Lessons */}
        <div className="space-y-8">
          {mod.lessons.map((lesson, lIdx) => (
            <section key={lIdx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className={`w-4 h-4 ${colors.text}`} />
                  <span className={`text-xs font-medium ${colors.text}`}>Lesson {lIdx + 1}</span>
                </div>
                <h2 className="text-xl font-bold mb-3">{lesson.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{lesson.content}</p>
              </div>

              {/* Formulas / Concepts */}
              <div className="p-6 space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  {isExcel ? (
                    <><Lightbulb className="w-4 h-4 text-amber-500" />Formula Examples</>
                  ) : isDSA ? (
                    <><Sigma className="w-4 h-4 text-purple-500" />Key Concepts & Formulas</>
                  ) : (
                    <><Sigma className="w-4 h-4 text-blue-500" />Key Concepts & Formulas</>
                  )}
                </h3>
                {lesson.formulas.map((f, fIdx) =>
                  isExcel ? (
                    <FormulaVisualizer key={fIdx} formula={f.formula} description={f.description} explanation={f.explanation} />
                  ) : (
                    <MathFormula key={fIdx} formula={f.formula} description={f.description} explanation={f.explanation} accentColor={isDSA ? 'purple' : 'blue'} />
                  )
                )}
              </div>

              {/* Sample Data (first lesson only) */}
              {mod.sampleData && lIdx === 0 && (
                <div className="px-6 pb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {isExcel ? 'Interactive Spreadsheet' : isDSA ? 'Example Data' : 'Example Data'}
                  </h3>
                  {Object.entries(mod.sampleData).map(([tableName, tableData]) =>
                    isExcel ? (
                      <div key={tableName} className="mb-4">
                        <span className="text-xs text-gray-500 mb-2 block">{tableName}</span>
                        <SpreadsheetGrid data={tableData} />
                      </div>
                    ) : (
                      <div key={tableName} className="mb-4">
                        <DataTable data={tableData} title={tableName} />
                      </div>
                    )
                  )}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* ===== INTERACTIVE TOOLS (rendered once per module, outside lessons) ===== */}

        {/* Excel: VLOOKUP Animation */}
        {isExcel && id === 'lookup-functions' && mod.sampleData?.['VLOOKUP Reference Table'] && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Interactive: VLOOKUP Animation</h2>
            <LookupAnimator
              type="vlookup"
              lookupValue="IT"
              tableData={mod.sampleData['VLOOKUP Reference Table']}
              colOrRowIndex={2}
              result="8000"
            />
          </section>
        )}

        {/* Excel: Reference Toggle */}
        {isExcel && id === 'cell-referencing' && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Interactive: Cell Reference Visualizer</h2>
            <ReferenceToggle formula="=D2*$N$1" description="See how references change when dragged." />
          </section>
        )}

        {/* Excel: Condition Builder */}
        {isExcel && id === 'conditional-functions' && mod.sampleData && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Interactive: Condition Builder</h2>
            {(() => { const { headers, records } = getExcelRecords(mod.sampleData!); return <ConditionBuilder fields={headers} sampleData={records} />; })()}
          </section>
        )}

        {/* Excel: Filter Panel */}
        {isExcel && id === 'filtering' && mod.sampleData && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Interactive: Data Filter</h2>
            {(() => { const { headers, records } = getExcelRecords(mod.sampleData!); return <FilterPanel data={records} headers={headers} />; })()}
          </section>
        )}

        {/* Excel: Pivot Builder */}
        {isExcel && id === 'pivot-tables' && mod.sampleData && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Interactive: Pivot Table Builder</h2>
            {(() => { const { headers, records } = getExcelRecords(mod.sampleData!); return <PivotBuilder data={records} fields={headers} />; })()}
          </section>
        )}

        {/* Excel: Charts */}
        {isExcel && id === 'charts' && mod.sampleData && (
          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold">Interactive: Chart Examples</h2>
            {mod.sampleData['Study Hours vs Marks'] && (
              <ChartRenderer type="scatter" data={mod.sampleData['Study Hours vs Marks'].slice(1).map(row => ({ name: row[0], value: Number(row[2]) || 0 }))} title="Study Hours vs Marks" xKey="name" yKeys={['value']} />
            )}
            {mod.sampleData['Quarterly Revenue'] && (
              <ChartRenderer type="combo" data={mod.sampleData['Quarterly Revenue'].slice(1).map(row => ({ name: row[0], Revenue: Number(row[1]) || 0, 'Growth %': Number(row[2]) || 0 }))} title="Revenue & Growth" xKey="name" yKeys={['Revenue', 'Growth %']} />
            )}
          </section>
        )}

        {/* ML: Scaling Sandbox */}
        {!isExcel && id === 'data-preprocessing' && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Scaling Sandbox</h2>
            <p className="text-sm text-gray-500 mb-4">Enter numbers and see Min-Max Normalization and Z-Score Standardization in real-time.</p>
            <ScalingSandbox />
          </section>
        )}

        {/* ML: Best Fit Line */}
        {!isExcel && id === 'supervised-learning' && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Best Fit Line Adjuster</h2>
            <p className="text-sm text-gray-500 mb-4">Adjust slope (b₁) and intercept (b₀) to minimize MSE. Find the best fit line.</p>
            <BestFitLine />
          </section>
        )}

        {/* ML: Confusion Matrix Calculator */}
        {!isExcel && id === 'evaluation-metrics' && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Confusion Matrix Calculator</h2>
            <p className="text-sm text-gray-500 mb-4">Enter TP, FP, TN, FN values. Watch Accuracy, Precision, Recall, and F1 update live.</p>
            <ConfusionMatrixCalc />
          </section>
        )}

        {/* ML: Neural Network Visualizer */}
        {!isExcel && id === 'deep-learning-foundations' && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Neural Network Visualizer</h2>
            <p className="text-sm text-gray-500 mb-4">Hover over neurons to see layer details. Watch the training loop flow.</p>
            <NeuralNetworkViz />
          </section>
        )}

        {/* DSA: Complexity Grapher */}
        {isDSA && id === 'intro-dsa' && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Time & Space Complexity Grapher</h2>
            <p className="text-sm text-gray-500 mb-4">Toggle complexity curves and adjust N to see how growth rates compare.</p>
            <ComplexityGrapher />
          </section>
        )}

        {/* DSA: Infix to Postfix Simulator */}
        {isDSA && id === 'linear-data-structures' && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Infix to Postfix Stack Simulator</h2>
            <p className="text-sm text-gray-500 mb-4">Enter an infix expression and watch the stack-based conversion step by step.</p>
            <InfixPostfixSimulator />
          </section>
        )}

        {/* DSA: Sorting Race */}
        {isDSA && id === 'searching-sorting' && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Sorting Algorithm Race</h2>
            <p className="text-sm text-gray-500 mb-4">Watch Bubble, Selection, Insertion, and Quick sort compete side by side.</p>
            <SortingRace />
          </section>
        )}

        {/* DSA: BST Builder */}
        {isDSA && id === 'trees' && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Binary Search Tree Builder</h2>
            <p className="text-sm text-gray-500 mb-4">Insert numbers and watch the BST grow. See all three traversals update live.</p>
            <BSTBuilder />
          </section>
        )}

        {/* DSA: Graph Traversal Grid */}
        {isDSA && (id === 'graphs-traversals' || id === 'advanced-graphs') && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Graph Traversal & Pathfinding</h2>
            <p className="text-sm text-gray-500 mb-4">Run DFS, BFS, or Dijkstra's algorithm on a sample graph. Step through or auto-play.</p>
            <GraphTraversalGrid />
          </section>
        )}

        {/* OS: Process State Machine */}
        {isOS && id === 'process-management' && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Process State Machine</h2>
            <p className="text-sm text-gray-500 mb-4">Click transitions to move a process through New → Ready → Running → Waiting → Terminated states.</p>
            <ProcessStateMachine />
          </section>
        )}

        {/* OS: Gantt Chart Generator */}
        {isOS && id === 'cpu-scheduling' && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: CPU Scheduling Gantt Chart</h2>
            <p className="text-sm text-gray-500 mb-4">Enter processes with burst times and compare FCFS, SJF, and Round Robin visually.</p>
            <GanttChartGenerator />
          </section>
        )}

        {/* OS: Memory Fragmentation Sandbox */}
        {isOS && id === 'memory-management' && (
          <section className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Memory Fragmentation Sandbox</h2>
            <p className="text-sm text-gray-500 mb-4">Allocate and free memory blocks. See how contiguous allocation causes external fragmentation while paging avoids it.</p>
            <MemoryFragmentationSandbox />
          </section>
        )}

        {/* Quiz */}
        {mod.quiz.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-4">Practice Quiz</h2>
            <QuizCard questions={mod.quiz} />
          </section>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {prev ? (
            <Link href={`/${subject}/module/${prev.id}`} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {prev.title}
            </Link>
          ) : (
            <Link href={`/${subject}`} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              All Modules
            </Link>
          )}
          {next ? (
            <Link href={`/${subject}/module/${next.id}`} className={`flex items-center gap-2 px-4 py-2 ${colors.btn} text-white rounded-lg text-sm ${colors.btnHover} transition-colors`}>
              {next.title}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link href="/" className={`flex items-center gap-2 px-4 py-2 ${colors.btn} text-white rounded-lg text-sm ${colors.btnHover} transition-colors`}>
              Back to Subjects
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
