import Link from 'next/link';
import { modules } from '@/data/modules';
import {
  Table, Calculator, LinkIcon, GitBranch, Type, Sigma, Filter,
  Search, Funnel, Grid3X3, BarChart3, LayoutDashboard, Bug, Sheet
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Table, Calculator, Link: LinkIcon, GitBranch, Type, Sigma, Filter,
  Search, Funnel, Grid3X3, BarChart3, LayoutDashboard, Bug, Sheet,
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <h1 className="font-bold text-lg">Excel Study Guide</h1>
          </div>
          <span className="text-xs text-gray-500">14 Modules • Interactive Learning</span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Master MS Excel <span className="text-green-600">Step by Step</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Interactive lessons with live spreadsheet demos, formula visualizers, VLOOKUP/HLOOKUP animations,
            pivot table builders, and practice quizzes.
          </p>
        </div>
      </section>

      {/* Module Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((mod, idx) => {
            const Icon = iconMap[mod.icon] || Table;
            return (
              <Link
                key={mod.id}
                href={`/module/${mod.id}`}
                className="group block p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                    <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Module {idx + 1}</div>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {mod.description}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                  <span>{mod.lessons.length} lessons</span>
                  <span>•</span>
                  <span>{mod.quiz.length} quiz questions</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Learning Flow */}
        <div className="mt-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-6">Learning Flow</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-3">
            {modules.map((mod, idx) => (
              <Link
                key={mod.id}
                href={`/module/${mod.id}`}
                className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-center"
              >
                <span className="text-xs font-bold text-green-600 dark:text-green-400 mb-1">{idx + 1}</span>
                <span className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight">{mod.title.split(' ')[0]}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-xs text-gray-400">
        Excel Study Guide — Built for MS Excel Practicals
      </footer>
    </div>
  );
}
