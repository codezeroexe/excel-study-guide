import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubjectById, subjects } from '@/data/subjects';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return subjects.map(s => ({ subject: s.id }));
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  const sub = getSubjectById(subject);
  if (!sub) notFound();

  const colorMap: Record<string, { bg: string; text: string; badge: string; border: string }> = {
    green: { bg: 'from-green-50 to-white dark:from-green-950/20 dark:to-gray-950', text: 'text-green-600', badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-800' },
    blue: { bg: 'from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950', text: 'text-blue-600', badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800' },
    purple: { bg: 'from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-950', text: 'text-purple-600', badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800' },
    amber: { bg: 'from-amber-50 to-white dark:from-amber-950/20 dark:to-gray-950', text: 'text-amber-600', badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800' },
  };
  const colors = colorMap[sub.color] || colorMap.green;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            All Subjects
          </Link>
          <span className="text-xs text-gray-400">{sub.modules.length} Modules</span>
        </div>
      </header>

      {/* Hero */}
      <section className={`bg-gradient-to-b ${colors.bg} border-b border-gray-200 dark:border-gray-800`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className={`inline-flex px-3 py-1 ${colors.badge} rounded-full text-xs font-medium mb-3`}>
            {sub.shortName}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{sub.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">{sub.description}</p>
        </div>
      </section>

      {/* Module List */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-3">
          {sub.modules.map((mod, idx) => (
            <Link
              key={mod.id}
              href={`/${sub.id}/module/${mod.id}`}
              className={`group flex items-center gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:${colors.border} hover:shadow-md transition-all`}
            >
              <div className={`w-10 h-10 ${colors.badge} rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors truncate">
                  {mod.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{mod.description}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-gray-400">{mod.lessons.length} lessons</span>
                <span className="text-xs text-gray-400">{mod.quiz.length} quiz</span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Learning Flow */}
        <div className="mt-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">Learning Path</h3>
          <div className="flex flex-wrap gap-2">
            {sub.modules.map((mod, idx) => (
              <Link
                key={mod.id}
                href={`/${sub.id}/module/${mod.id}`}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${colors.badge} hover:opacity-80 transition-opacity`}
              >
                <span className="opacity-60">{idx + 1}.</span>
                {mod.title.split(' ')[0]}
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-xs text-gray-400">
        Study Guide — {sub.name}
      </footer>
    </div>
  );
}
