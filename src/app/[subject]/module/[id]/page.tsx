import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubjectById, subjects } from '@/data/subjects';
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Settings, Target, Layers, Cpu } from 'lucide-react';
import SpreadsheetGrid from '@/components/SpreadsheetGrid';
import FormulaVisualizer from '@/components/FormulaVisualizer';
import LookupAnimator from '@/components/LookupAnimator';
import QuizCard from '@/components/QuizCard';
import ReferenceToggle from '@/components/ReferenceToggle';
import ConditionBuilder from '@/components/ConditionBuilder';
import ChartRenderer from '@/components/ChartRenderer';
import FilterPanel from '@/components/FilterPanel';
import PivotBuilder from '@/components/PivotBuilder';

export function generateStaticParams() {
  const params: { subject: string; id: string }[] = [];
  for (const sub of subjects) {
    for (const mod of sub.modules) {
      params.push({ subject: sub.id, id: mod.id });
    }
  }
  return params;
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

  // Convert sample data to Record<string, string>[] for components
  const sampleDataRecords: Record<string, string>[] = [];
  if (mod.sampleData) {
    const firstTable = Object.values(mod.sampleData)[0];
    if (firstTable && firstTable.length > 1) {
      const headers = firstTable[0];
      for (let i = 1; i < firstTable.length; i++) {
        const record: Record<string, string> = {};
        headers.forEach((h, j) => {
          record[h] = firstTable[i]?.[j] || '';
        });
        sampleDataRecords.push(record);
      }
    }
  }

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

              {/* Formula Examples */}
              <div className="p-6 space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Formula Examples
                </h3>
                {lesson.formulas.map((f, fIdx) => (
                  <FormulaVisualizer
                    key={fIdx}
                    formula={f.formula}
                    description={f.description}
                    explanation={f.explanation}
                  />
                ))}
              </div>

              {/* Interactive Demo */}
              {mod.sampleData && lIdx === 0 && (
                <div className="px-6 pb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Interactive Demo</h3>
                  {Object.entries(mod.sampleData).map(([tableName, tableData]) => (
                    <div key={tableName} className="mb-4">
                      <span className="text-xs text-gray-500 mb-2 block">{tableName}</span>
                      <SpreadsheetGrid data={tableData} />
                    </div>
                  ))}
                </div>
              )}

              {/* Module-specific interactive components */}
              {id === 'lookup-functions' && lIdx >= 0 && mod.sampleData?.['VLOOKUP Reference Table'] && (
                <div className="px-6 pb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">VLOOKUP Animation</h3>
                  <LookupAnimator
                    type="vlookup"
                    lookupValue="IT"
                    tableData={mod.sampleData['VLOOKUP Reference Table']}
                    colOrRowIndex={2}
                    result="8000"
                  />
                </div>
              )}

              {id === 'cell-referencing' && (
                <div className="px-6 pb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Reference Type Visualizer</h3>
                  <ReferenceToggle
                    formula="=D2*$N$1"
                    description="See how references change when dragged. Toggle between relative, absolute, and mixed modes."
                  />
                </div>
              )}

              {id === 'conditional-functions' && sampleDataRecords.length > 0 && (
                <div className="px-6 pb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Condition Builder</h3>
                  <ConditionBuilder
                    fields={Object.keys(sampleDataRecords[0] || {})}
                    sampleData={sampleDataRecords}
                  />
                </div>
              )}

              {id === 'filtering' && sampleDataRecords.length > 0 && (
                <div className="px-6 pb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Interactive Filter</h3>
                  <FilterPanel
                    data={sampleDataRecords}
                    headers={Object.keys(sampleDataRecords[0] || {})}
                  />
                </div>
              )}

              {id === 'pivot-tables' && sampleDataRecords.length > 0 && (
                <div className="px-6 pb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Pivot Table Builder</h3>
                  <PivotBuilder
                    data={sampleDataRecords}
                    fields={Object.keys(sampleDataRecords[0] || {})}
                  />
                </div>
              )}

              {id === 'charts' && mod.sampleData && (
                <div className="px-6 pb-6 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Chart Examples</h3>
                  {mod.sampleData['Study Hours vs Marks'] && (
                    <ChartRenderer
                      type="scatter"
                      data={mod.sampleData['Study Hours vs Marks'].slice(1).map(row => ({
                        name: row[0],
                        value: Number(row[2]) || 0,
                      }))}
                      title="Study Hours vs Marks"
                      xKey="name"
                      yKeys={['value']}
                    />
                  )}
                  {mod.sampleData['Quarterly Revenue'] && (
                    <ChartRenderer
                      type="combo"
                      data={mod.sampleData['Quarterly Revenue'].slice(1).map(row => ({
                        name: row[0],
                        Revenue: Number(row[1]) || 0,
                        'Growth %': Number(row[2]) || 0,
                      }))}
                      title="Revenue & Growth"
                      xKey="name"
                      yKeys={['Revenue', 'Growth %']}
                    />
                  )}
                </div>
              )}
            </section>
          ))}
        </div>

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
            <Link
              href={`/${subject}/module/${prev.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {prev.title}
            </Link>
          ) : (
            <Link
              href={`/${subject}`}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Modules
            </Link>
          )}
          {next ? (
            <Link
              href={`/${subject}/module/${next.id}`}
              className={`flex items-center gap-2 px-4 py-2 ${colors.btn} text-white rounded-lg text-sm ${colors.btnHover} transition-colors`}
            >
              {next.title}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-2 ${colors.btn} text-white rounded-lg text-sm ${colors.btnHover} transition-colors`}
            >
              Back to Subjects
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
