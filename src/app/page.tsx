import Link from 'next/link';
import { subjects } from '@/data/subjects';
import {
  Table, Calculator, LinkIcon, GitBranch, Type, Sigma, Filter,
  Search, Funnel, Grid3X3, BarChart3, LayoutDashboard, Bug, Sheet,
  BookOpen, ArrowRight, Brain, Settings, Target, Layers, Cpu
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Table, Calculator, Link: LinkIcon, GitBranch, Type, Sigma, Filter,
  Search, Funnel, Grid3X3, BarChart3, LayoutDashboard, Bug, Sheet, BookOpen, Brain, Settings, Target, Layers, Cpu,
};

const colorMap: Record<string, { bg: string; text: string; hover: string; badge: string }> = {
  green: {
    bg: 'from-green-50 to-white dark:from-green-950/20 dark:to-gray-950',
    text: 'text-green-600',
    hover: 'hover:border-green-300 dark:hover:border-green-700',
    badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  },
  blue: {
    bg: 'from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950',
    text: 'text-blue-600',
    hover: 'hover:border-blue-300 dark:hover:border-blue-700',
    badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  },
  purple: {
    bg: 'from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-950',
    text: 'text-purple-600',
    hover: 'hover:border-purple-300 dark:hover:border-purple-700',
    badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  },
  amber: {
    bg: 'from-amber-50 to-white dark:from-amber-950/20 dark:to-gray-950',
    text: 'text-amber-600',
    hover: 'hover:border-amber-300 dark:hover:border-amber-700',
    badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h1 className="font-bold text-lg">Study Guide</h1>
          </div>
          <span className="text-xs text-gray-500">{subjects.length} Subject{subjects.length !== 1 ? 's' : ''} • Interactive Learning</span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pick Your <span className="text-green-600">Subject</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Interactive lessons with live demos, formula visualizers, animations, and practice quizzes.
          </p>
        </div>
      </section>

      {/* Subject Cards */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map(subject => {
            const colors = colorMap[subject.color] || colorMap.green;
            const Icon = iconMap[subject.icon] || BookOpen;
            return (
              <Link
                key={subject.id}
                href={`/${subject.id}`}
                className={`group block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl ${colors.hover} hover:shadow-lg transition-all duration-200`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${colors.badge} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg mb-1 ${colors.text} group-hover:opacity-80 transition-opacity`}>
                      {subject.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {subject.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {subject.modules.length} modules
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Module preview */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex flex-wrap gap-1.5">
                    {subject.modules.slice(0, 6).map((mod, idx) => (
                      <span
                        key={mod.id}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] text-gray-500"
                      >
                        {idx + 1}. {mod.title.split(' ')[0]}
                      </span>
                    ))}
                    {subject.modules.length > 6 && (
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] text-gray-400">
                        +{subject.modules.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-xs text-gray-400">
        Study Guide — Interactive Learning App
      </footer>
    </div>
  );
}
