import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubjectById, subjects } from '@/data/subjects';
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Sigma } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { getSubjectTone } from '@/lib/subject-ui';

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

// Stats components
import CombinatoricsCalculator from '@/components/CombinatoricsCalculator';
import BayesTheoremCalc from '@/components/BayesTheoremCalc';
import DistributionVisualizer from '@/components/DistributionVisualizer';
import HypothesisTestCalc from '@/components/HypothesisTestCalc';
import WorksheetGenerator from '@/components/WorksheetGenerator';

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

  const colors = getSubjectTone(sub.color);

  const isExcel = subject === 'excel';
  const isDSA = subject === 'dsa';
  const isOS = subject === 'os';
  const isStats = subject === 'stats';

  return (
    <AppShell
      eyebrow={`${sub.shortName} module ${idx + 1} of ${sub.modules.length}`}
      title={mod.title}
      description={mod.description}
    >
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Module Title */}
        <div className="mb-8 space-y-4">
          <div className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${colors.badge}`}>
            {sub.shortName} • Module {idx + 1}
          </div>
          <div className="max-w-3xl space-y-3">
            <h1 className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50 sm:text-3xl">{mod.title}</h1>
            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-400">{mod.description}</p>
          </div>
        </div>

        {/* Lessons */}
        <div className="space-y-4">
          {mod.lessons.map((lesson, lIdx) => (
            <section key={lIdx} className="overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
              <div className="border-b border-neutral-100 p-5 dark:border-neutral-800">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className={`w-4 h-4 ${colors.text}`} />
                  <span className={`text-xs font-medium ${colors.text}`}>Lesson {lIdx + 1}</span>
                </div>
                <h2 className="mb-3 text-lg font-semibold text-neutral-950 dark:text-neutral-50">{lesson.title}</h2>
                <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">{lesson.content}</p>
              </div>

              {/* Formulas / Concepts */}
              <div className="space-y-3 p-5">
                <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                  {isExcel ? (
                    <><Lightbulb className={`w-4 h-4 ${colors.text}`} />Formula Examples</>
                  ) : (
                    <><Sigma className={`w-4 h-4 ${colors.text}`} />Key Concepts & Formulas</>
                  )}
                </h3>
                {lesson.formulas.map((f, fIdx) =>
                  isExcel ? (
                    <FormulaVisualizer key={fIdx} formula={f.formula} description={f.description} explanation={f.explanation} />
                  ) : (
                    <MathFormula key={fIdx} formula={f.formula} description={f.description} explanation={f.explanation} accentColor={sub.color} />
                  )
                )}
              </div>

              {/* Sample Data (first lesson only) */}
              {mod.sampleData && lIdx === 0 && (
                <div className="px-6 pb-6">
                  <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                    {isExcel ? 'Interactive Spreadsheet' : isDSA ? 'Example Data' : 'Example Data'}
                  </h3>
                  {Object.entries(mod.sampleData).map(([tableName, tableData]) =>
                    isExcel ? (
                      <div key={tableName} className="mb-4">
                        <span className="text-xs text-neutral-500 mb-2 block">{tableName}</span>
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
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
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
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Interactive: Cell Reference Visualizer</h2>
            <ReferenceToggle formula="=D2*$N$1" description="See how references change when dragged." />
          </section>
        )}

        {/* Excel: Condition Builder */}
        {isExcel && id === 'conditional-functions' && mod.sampleData && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Interactive: Condition Builder</h2>
            {(() => { const { headers, records } = getExcelRecords(mod.sampleData!); return <ConditionBuilder fields={headers} sampleData={records} />; })()}
          </section>
        )}

        {/* Excel: Filter Panel */}
        {isExcel && id === 'filtering' && mod.sampleData && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Interactive: Data Filter</h2>
            {(() => { const { headers, records } = getExcelRecords(mod.sampleData!); return <FilterPanel data={records} headers={headers} />; })()}
          </section>
        )}

        {/* Excel: Pivot Builder */}
        {isExcel && id === 'pivot-tables' && mod.sampleData && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
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
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Scaling Sandbox</h2>
            <p className="text-sm text-neutral-500 mb-4">Enter numbers and see Min-Max Normalization and Z-Score Standardization in real-time.</p>
            <ScalingSandbox />
          </section>
        )}

        {/* ML: Best Fit Line */}
        {!isExcel && id === 'supervised-learning' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Best Fit Line Adjuster</h2>
            <p className="text-sm text-neutral-500 mb-4">Adjust slope (b₁) and intercept (b₀) to minimize MSE. Find the best fit line.</p>
            <BestFitLine />
          </section>
        )}

        {/* ML: Confusion Matrix Calculator */}
        {!isExcel && id === 'evaluation-metrics' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Confusion Matrix Calculator</h2>
            <p className="text-sm text-neutral-500 mb-4">Enter TP, FP, TN, FN values. Watch Accuracy, Precision, Recall, and F1 update live.</p>
            <ConfusionMatrixCalc />
          </section>
        )}

        {/* ML: Neural Network Visualizer */}
        {!isExcel && id === 'deep-learning-foundations' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Neural Network Visualizer</h2>
            <p className="text-sm text-neutral-500 mb-4">Hover over neurons to see layer details. Watch the training loop flow.</p>
            <NeuralNetworkViz />
          </section>
        )}

        {/* DSA: Complexity Grapher */}
        {isDSA && id === 'intro-dsa' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Time & Space Complexity Grapher</h2>
            <p className="text-sm text-neutral-500 mb-4">Toggle complexity curves and adjust N to see how growth rates compare.</p>
            <ComplexityGrapher />
          </section>
        )}

        {/* DSA: Infix to Postfix Simulator */}
        {isDSA && id === 'linear-data-structures' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Infix to Postfix Stack Simulator</h2>
            <p className="text-sm text-neutral-500 mb-4">Enter an infix expression and watch the stack-based conversion step by step.</p>
            <InfixPostfixSimulator />
          </section>
        )}

        {/* DSA: Sorting Race */}
        {isDSA && id === 'searching-sorting' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Sorting Algorithm Race</h2>
            <p className="text-sm text-neutral-500 mb-4">Watch Bubble, Selection, Insertion, and Quick sort compete side by side.</p>
            <SortingRace />
          </section>
        )}

        {/* DSA: BST Builder */}
        {isDSA && id === 'trees' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Binary Search Tree Builder</h2>
            <p className="text-sm text-neutral-500 mb-4">Insert numbers and watch the BST grow. See all three traversals update live.</p>
            <BSTBuilder />
          </section>
        )}

        {/* DSA: Graph Traversal Grid */}
        {isDSA && (id === 'graphs-traversals' || id === 'advanced-graphs') && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Graph Traversal & Pathfinding</h2>
            <p className="text-sm text-neutral-500 mb-4">Run DFS, BFS, or Dijkstra&apos;s algorithm on a sample graph. Step through or auto-play.</p>
            <GraphTraversalGrid />
          </section>
        )}

        {/* OS: Process State Machine */}
        {isOS && id === 'process-management' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Process State Machine</h2>
            <p className="text-sm text-neutral-500 mb-4">Click transitions to move a process through New → Ready → Running → Waiting → Terminated states.</p>
            <ProcessStateMachine />
          </section>
        )}

        {/* OS: Gantt Chart Generator */}
        {isOS && id === 'cpu-scheduling' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: CPU Scheduling Gantt Chart</h2>
            <p className="text-sm text-neutral-500 mb-4">Enter processes with burst times and compare FCFS, SJF, and Round Robin visually.</p>
            <GanttChartGenerator />
          </section>
        )}

        {/* OS: Memory Fragmentation Sandbox */}
        {isOS && id === 'memory-management' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Memory Fragmentation Sandbox</h2>
            <p className="text-sm text-neutral-500 mb-4">Allocate and free memory blocks. See how contiguous allocation causes external fragmentation while paging avoids it.</p>
            <MemoryFragmentationSandbox />
          </section>
        )}

        {/* Stats: Combinatorics Calculator */}
        {isStats && id === 'stats-combinatorics' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Permutation & Combination Calculator</h2>
            <p className="text-sm text-neutral-500 mb-4">Adjust n and r to see P(n,r) and C(n,r) with visual arrangements.</p>
            <CombinatoricsCalculator />
          </section>
        )}

        {/* Stats: Bayes Theorem Calculator */}
        {isStats && id === 'stats-bayes-theorem' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Bayes&apos; Theorem Calculator</h2>
            <p className="text-sm text-neutral-500 mb-4">Adjust prior, sensitivity, and false positive rate. See how the posterior updates.</p>
            <BayesTheoremCalc />
          </section>
        )}

        {/* Stats: Distribution Visualizer */}
        {isStats && id === 'stats-distributions' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Probability Distribution Visualizer</h2>
            <p className="text-sm text-neutral-500 mb-4">Explore Normal, Binomial, Poisson, and Exponential distributions with adjustable parameters.</p>
            <DistributionVisualizer />
          </section>
        )}

        {/* Stats: Hypothesis Test Calculator */}
        {isStats && id === 'stats-hypothesis-testing' && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Hypothesis Test Calculator</h2>
            <p className="text-sm text-neutral-500 mb-4">Run Z-tests, T-tests, and Chi-Square tests with step-by-step solutions.</p>
            <HypothesisTestCalc />
          </section>
        )}

        {/* Stats: Worksheet Generator (all modules) */}
        {isStats && (
          <section className="mt-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-2">Interactive: Practice Worksheet Generator</h2>
            <p className="text-sm text-neutral-500 mb-4">Generate randomized problems with step-by-step solutions for any topic.</p>
            <WorksheetGenerator />
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
        <div className="mt-8 flex flex-col gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
          {prev ? (
            <Link href={`/${subject}/module/${prev.id}`} className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900">
              <ArrowLeft className="w-4 h-4" />
              {prev.title}
            </Link>
          ) : (
            <Link href={`/${subject}`} className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900">
              <ArrowLeft className="w-4 h-4" />
              All Modules
            </Link>
          )}
          {next ? (
            <Link href={`/${subject}/module/${next.id}`} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-colors ${colors.button} ${colors.buttonHover}`}>
              {next.title}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link href="/" className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-colors ${colors.button} ${colors.buttonHover}`}>
              Back to Subjects
            </Link>
          )}
        </div>
      </main>
    </AppShell>
  );
}
