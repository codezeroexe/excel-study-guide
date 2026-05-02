'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useMemo } from 'react';
import { Search, ArrowRight, FileText, BookOpen } from 'lucide-react';
import { subjects } from '@/data/subjects';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Reset query on close
  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Build search index
  const allItems = useMemo(() => {
    const items: { label: string; href: string; type: 'subject' | 'module'; subjectName: string }[] = [];
    subjects.forEach(subject => {
      items.push({
        label: subject.name,
        href: `/${subject.id}`,
        type: 'subject',
        subjectName: subject.name,
      });
      subject.modules.forEach(mod => {
        items.push({
          label: mod.title,
          href: `/${subject.id}/module/${mod.id}`,
          type: 'module',
          subjectName: subject.name,
        });
      });
    });
    return items;
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return allItems.slice(0, 10); // Show first 10 when no query
    return allItems.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.subjectName.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [query, allItems]);

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[20vh]">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search subjects, modules..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            autoComplete="off"
          />
          <kbd className="hidden rounded-md border border-border px-1.5 py-0.5 text-[11px] text-muted sm:inline-block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="scrollbar-none max-h-72 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-muted">
              No results found
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleSelect(item.href)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  pathname === item.href
                    ? 'bg-surface font-medium'
                    : 'hover:bg-surface'
                }`}
              >
                {item.type === 'subject' ? (
                  <BookOpen className="h-4 w-4 shrink-0 text-muted" />
                ) : (
                  <FileText className="h-4 w-4 shrink-0 text-muted" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate">{item.label}</div>
                  <div className="truncate text-[11px] text-muted">{item.subjectName}</div>
                </div>
                {pathname === item.href && (
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted" />
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-border px-4 py-2 text-[11px] text-muted">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
        </div>
      </div>

      {/* Click outside to close */}
      <button
        type="button"
        aria-label="Close command palette"
        onClick={onClose}
        className="absolute inset-0 -z-10"
      />
    </div>
  );
}
