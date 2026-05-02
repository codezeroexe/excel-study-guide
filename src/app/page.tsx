import Link from 'next/link';
import { ArrowRight, BookOpen, Search, Sparkles } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { subjects } from '@/data/subjects';
import { getSubjectTone, SubjectIcon } from '@/lib/subject-ui';

export default function Home() {
  const moduleCount = subjects.reduce((total, subject) => total + subject.modules.length, 0);

  return (
    <AppShell
      eyebrow={`${subjects.length} subjects · ${moduleCount} modules`}
      title="Study workspace"
      description="Interactive lessons, visualizers, and quizzes"
    >
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero section */}
        <section className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-[11px] text-muted">
            <Sparkles className="h-3 w-3" />
            Choose a subject to start learning
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            What do you want to study?
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            Interactive lessons with hands-on practice. Click any subject below to see available modules.
          </p>
        </section>

        {/* Subject cards - message style */}
        <section className="space-y-3">
          {subjects.map(subject => {
            const tone = getSubjectTone(subject.color);
            const firstModule = subject.modules[0];

            return (
              <Link
                key={subject.id}
                href={`/${subject.id}`}
                className="group block rounded-2xl border border-border bg-background p-5 transition-all hover:border-border-hover hover:shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-foreground">
                    <SubjectIcon name={subject.icon} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold text-foreground">{subject.name}</h2>
                      <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-muted">
                        {subject.modules.length} modules
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-6 text-muted">{subject.description}</p>
                    {firstModule && (
                      <p className="mt-3 text-xs text-muted">
                        Start with <span className="font-medium text-foreground">{firstModule.title}</span>
                      </p>
                    )}
                  </div>
                  <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </section>

        {/* Info card */}
        <section className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-start gap-3">
            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Quick tip</h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                Use <kbd className="rounded-md bg-background px-1.5 py-0.5 text-[11px]">⌘K</kbd> to quickly search and jump to any module.
              </p>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
