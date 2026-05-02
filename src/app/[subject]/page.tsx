import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, ListOrdered } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { getSubjectById, subjects } from '@/data/subjects';
import { getSubjectTone, SubjectIcon } from '@/lib/subject-ui';

export function generateStaticParams() {
  return subjects.map(s => ({ subject: s.id }));
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  const sub = getSubjectById(subject);
  if (!sub) notFound();

  const tone = getSubjectTone(sub.color);

  return (
    <AppShell eyebrow={sub.shortName} title={sub.name} description={sub.description}>
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Subject header */}
        <section className="space-y-4">
          <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${tone.badge}`}>
            <SubjectIcon name={sub.icon} className="h-5 w-5" />
          </div>
          <div className="max-w-3xl space-y-3">
            <h1 className={`text-xl font-semibold tracking-tight sm:text-2xl ${tone.text}`}>{sub.name}</h1>
            <p className="text-sm leading-6 text-muted">{sub.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className={`inline-flex items-center gap-1 rounded-full ${tone.badge}`}>
              <ListOrdered className="h-3 w-3" />
              {sub.modules.length} modules
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-muted">
              <BookOpen className="h-3 w-3" />
              Interactive lessons & quizzes
            </span>
          </div>
        </section>

        {/* Module list - chat thread style */}
        <section className="space-y-2">
          {sub.modules.map((mod, idx) => (
            <Link
              key={mod.id}
              href={`/${sub.id}/module/${mod.id}`}
              className={`group flex items-start gap-4 rounded-2xl border bg-background p-4 transition-all hover:border-border-hover hover:shadow-sm ${tone.border}`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${tone.badge}`}>
                {idx + 1}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold text-foreground">{mod.title}</h2>
                <p className="mt-1 text-sm leading-6 text-muted">{mod.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted">
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5">
                    <BookOpen className="h-3 w-3" />
                    {mod.lessons.length} lessons
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5">
                    <CheckCircle2 className="h-3 w-3" />
                    {mod.quiz.length} questions
                  </span>
                </div>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </section>
      </main>
    </AppShell>
  );
}
