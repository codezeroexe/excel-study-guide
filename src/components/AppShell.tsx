'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Command,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sun,
  Monitor,
  X,
} from 'lucide-react';
import { subjects } from '@/data/subjects';
import { getSubjectTone, SubjectIcon } from '@/lib/subject-ui';
import CommandPalette from './CommandPalette';
import ProgressBadge from './ProgressBadge';

type Theme = 'light' | 'dark' | 'system';

interface AppShellProps {
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function AppShell({ children, eyebrow, title, description }: AppShellProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('study-guide-sidebar') === 'collapsed';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    const stored = window.localStorage.getItem('study-guide-theme');
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    return 'system';
  });
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [readingMode, setReadingMode] = useState(false);

  // Cmd+K / Ctrl+K to open command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(v => !v);
      }
      // Ctrl+Shift+R for reading mode
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        setReadingMode(v => !v);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Apply theme
  useEffect(() => {
    let resolvedTheme: 'light' | 'dark' = 'light';
    if (theme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolvedTheme = theme;
    }
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    window.localStorage.setItem('study-guide-theme', theme);
  }, [theme]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (theme !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      document.documentElement.classList.toggle('dark', media.matches);
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [theme]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!themeDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [themeDropdownOpen]);

  const setThemeAndClose = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    setThemeDropdownOpen(false);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('study-guide-sidebar', sidebarCollapsed ? 'collapsed' : 'expanded');
  }, [sidebarCollapsed]);

  const filteredSubjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subjects;
    return subjects
      .map(subject => ({
        ...subject,
        modules: subject.modules.filter(module =>
          `${subject.name} ${subject.shortName} ${module.title} ${module.description}`
            .toLowerCase()
            .includes(q)
        ),
      }))
      .filter(subject =>
        subject.modules.length > 0 ||
        `${subject.name} ${subject.shortName} ${subject.description}`.toLowerCase().includes(q)
      );
  }, [query]);

  const renderSidebar = (collapsed: boolean) => (
    <aside className="flex h-full flex-col bg-surface border-border dark:border-border">
      <div className={`flex h-12 items-center gap-2 border-b border-border px-3 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        <Link
          href="/"
          title="Study Guide"
          className={`flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-surface-hover ${collapsed ? 'justify-center' : ''}`}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background">
            <BookOpen className="h-4 w-4" />
          </div>
          {!collapsed && <span className="truncate text-sm font-semibold">Study Guide</span>}
        </Link>
        {!collapsed && (
          <button
            type="button"
            aria-label="Collapse sidebar"
            onClick={() => setSidebarCollapsed(true)}
            className="hidden rounded-lg p-2 text-muted hover:bg-surface-hover lg:inline-flex"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="border-b border-border p-3">
          <label className="flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm shadow-sm">
            <Search className="h-4 w-4 text-muted" />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search modules..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </label>
        </div>
      )}

      <nav className={`scrollbar-none min-h-0 flex-1 overflow-y-auto py-3 ${collapsed ? 'space-y-1.5 px-2' : 'space-y-3 px-3'}`}>
        {filteredSubjects.map(subject => {
          const tone = getSubjectTone(subject.color);
          const subjectActive = pathname === `/${subject.id}` || pathname.startsWith(`/${subject.id}/`);
          const showAllModules = query.trim() || subjectActive;
          const visibleModules = showAllModules ? subject.modules : subject.modules.slice(0, 4);

          return (
            <section key={subject.id} className="space-y-0.5">
              <Link
                href={`/${subject.id}`}
                title={collapsed ? subject.name : undefined}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${collapsed ? 'justify-center' : ''} ${
                  subjectActive
                    ? 'bg-background font-medium shadow-sm'
                    : 'text-muted hover:bg-surface-hover'
                }`}
              >
                <SubjectIcon name={subject.icon} className={`h-4 w-4 ${subjectActive ? tone.text : 'text-muted'}`} />
                {!collapsed && (
                  <>
                    <span className="min-w-0 flex-1 truncate">{subject.shortName}</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-muted transition-transform ${showAllModules ? '' : '-rotate-90'}`} />
                  </>
                )}
              </Link>

              {collapsed && (
                <div className="flex justify-center">
                  <ProgressBadge subjectId={subject.id} collapsed />
                </div>
              )}

              {!collapsed && visibleModules.length > 0 && (
                <div className="ml-3 space-y-0.5 border-l-2 border-border pl-2">
                  {visibleModules.map(module => {
                    const href = `/${subject.id}/module/${module.id}`;
                    const active = pathname === href;
                    return (
                      <Link
                        key={module.id}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={`block rounded-md px-2 py-1 text-xs leading-5 transition-colors ${
                          active
                            ? 'border-l-2 border-accent -ml-0.5 bg-background font-medium'
                            : 'text-muted hover:bg-surface-hover hover:text-foreground'
                        }`}
                      >
                        <span className="line-clamp-2">{module.title}</span>
                      </Link>
                    );
                  })}
                  {!query.trim() && !subjectActive && subject.modules.length > visibleModules.length && (
                    <Link
                      href={`/${subject.id}`}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-2 py-1 text-xs text-muted hover:text-foreground"
                    >
                      +{subject.modules.length - visibleModules.length} more
                    </Link>
                  )}

                  {/* Progress bar for expanded view */}
                  <div className="ml-3 px-2 pb-1">
                    <ProgressBadge subjectId={subject.id} />
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </nav>
    </aside>
  );

  // Breadcrumb
  const breadcrumbs = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return [{ label: 'Home', href: '/' }];
    const crumbs: { label: string; href: string }[] = [{ label: 'Home', href: '/' }];
    if (parts[0]) {
      const sub = subjects.find(s => s.id === parts[0]);
      crumbs.push({ label: sub?.shortName || parts[0], href: `/${parts[0]}` });
    }
    if (parts[1] === 'module' && parts[2]) {
      crumbs.push({ label: 'Module', href: pathname });
    }
    return crumbs;
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className={`hidden transition-[width] duration-200 lg:fixed lg:inset-y-0 lg:left-0 lg:block lg:border-r lg:border-border ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-60'}`}>
        {renderSidebar(sidebarCollapsed)}
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/30"
          />
          <div className="absolute inset-y-0 left-0 w-[min(86vw,20rem)] border-r border-border">
            {renderSidebar(false)}
          </div>
        </div>
      )}

      <div className={`transition-[padding] duration-200 ${readingMode ? '' : sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'}`}>
        <header className={`sticky top-0 z-40 flex h-12 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-md ${readingMode ? 'hidden' : ''}`}>
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-muted hover:bg-surface-hover lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          {sidebarCollapsed && (
            <button
              type="button"
              aria-label="Expand sidebar"
              onClick={() => setSidebarCollapsed(false)}
              className="hidden rounded-lg p-2 text-muted hover:bg-surface-hover lg:inline-flex"
            >
              <PanelLeftOpen className="h-5 w-5" />
            </button>
          )}

          {/* Breadcrumbs */}
          <nav className="hidden min-w-0 flex-1 items-center gap-1 text-sm md:flex">
            {breadcrumbs.map((crumb, i) => (
              <div key={crumb.href} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted" />}
                <Link
                  href={crumb.href}
                  className={`truncate text-xs hover:text-foreground ${
                    i === breadcrumbs.length - 1 ? 'font-medium text-foreground' : 'text-muted'
                  }`}
                >
                  {crumb.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="min-w-0 flex-1 md:hidden">
            {title && <h1 className="truncate text-sm font-semibold">{title}</h1>}
          </div>

          {/* Theme Dropdown */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              type="button"
              aria-label="Change theme"
              onClick={() => setThemeDropdownOpen(v => !v)}
              className="rounded-lg p-2 text-muted hover:bg-surface-hover"
            >
              {theme === 'dark' ? <Moon className="h-5 w-5" /> : theme === 'light' ? <Sun className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
            </button>
            {themeDropdownOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-36 rounded-lg border border-border bg-background shadow-lg">
                <button
                  type="button"
                  onClick={() => setThemeAndClose('light')}
                  className={`flex w-full items-center gap-2 rounded-t-lg px-3 py-2 text-sm hover:bg-surface-hover ${theme === 'light' ? 'font-medium text-foreground' : 'text-muted'}`}
                >
                  <Sun className="h-4 w-4" /> Light
                </button>
                <button
                  type="button"
                  onClick={() => setThemeAndClose('dark')}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-surface-hover ${theme === 'dark' ? 'font-medium text-foreground' : 'text-muted'}`}
                >
                  <Moon className="h-4 w-4" /> Dark
                </button>
                <button
                  type="button"
                  onClick={() => setThemeAndClose('system')}
                  className={`flex w-full items-center gap-2 rounded-b-lg px-3 py-2 text-sm hover:bg-surface-hover ${theme === 'system' ? 'font-medium text-foreground' : 'text-muted'}`}
                >
                  <Monitor className="h-4 w-4" /> System
                </button>
              </div>
            )}
          </div>

          {/* Cmd+K Button */}
          <button
            type="button"
            aria-label="Open command palette"
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-surface-hover sm:flex"
          >
            <Command className="h-4 w-4" />
            <span className="hidden lg:inline">Search...</span>
            <kbd className="ml-2 rounded-md bg-surface px-1.5 py-0.5 text-[11px]">⌘K</kbd>
          </button>

          {/* Reading Mode Toggle */}
          <button
            type="button"
            aria-label={readingMode ? 'Exit reading mode' : 'Enter reading mode'}
            onClick={() => setReadingMode(v => !v)}
            className={`hidden rounded-lg p-2 sm:inline-flex ${readingMode ? 'bg-surface text-foreground' : 'text-muted hover:bg-surface-hover'}`}
          >
            {readingMode ? <BookOpen className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
          </button>

          {mobileOpen && (
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-muted hover:bg-surface-hover lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </header>
        {children}

        {/* Command Palette */}
        <CommandPalette
          open={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
      </div>
    </div>
  );
}
