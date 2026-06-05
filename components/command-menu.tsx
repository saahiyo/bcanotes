"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, BookOpen, Library, FolderOpen, X, CornerDownLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { subjectsData } from "@/data/subjects";
import { semesterBooks } from "@/data/books";
import { generateUnitSlug } from "@/lib/unit-slug";
import { cn } from "@/lib/utils";

interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Pages" | "Subjects" | "Units" | "Textbooks";
  url: string;
}

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setSelectedIndex(0);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Compile search index once
  const searchIndex = useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Pages
    const pages = [
      { id: "page-home", title: "Home", subtitle: "Main portal landing page", url: "/" },
      { id: "page-notes", title: "Subject Notes", subtitle: "Notes for Semesters 1 to 6", url: "/notes" },
      { id: "page-books", title: "E-Books Reference", subtitle: "Official digital textbooks", url: "/books" },
      { id: "page-pyq", title: "Question Papers", subtitle: "PYQ exam papers archive", url: "/question-papers" },
      { id: "page-practicals", title: "Solved Practicals", subtitle: "Lab practical files & solutions", url: "/practicals" },
      { id: "page-contribute", title: "Contribute Material", subtitle: "Submit study resources", url: "/contribute" },
      { id: "page-contact", title: "Contact Us", subtitle: "Get in touch with us", url: "/contact" },
    ];
    pages.forEach((p) => {
      items.push({ ...p, category: "Pages" });
    });

    // 2. Subjects
    Object.entries(subjectsData).forEach(([id, subject]) => {
      items.push({
        id: `subject-${id}`,
        title: subject.title,
        subtitle: "Subject Study Notes",
        category: "Subjects",
        url: `/notes/${id}`,
      });

      // 3. Units
      subject.units.forEach((unit) => {
        const slug = generateUnitSlug(unit.title);
        items.push({
          id: `unit-${id}-${slug}`,
          title: unit.title,
          subtitle: `${subject.title} Notes`,
          category: "Units",
          url: `/notes/${id}/${slug}`,
        });
      });
    });

    // 4. Textbooks
    semesterBooks.forEach((sem) => {
      sem.books.forEach((book) => {
        const encodedUrl = encodeURIComponent(book.pdfUrl);
        const encodedTitle = encodeURIComponent(`${book.code} - ${book.title}`);
        const encodedBackUrl = encodeURIComponent("/books");
        const viewerHref = `/viewer?url=${encodedUrl}&title=${encodedTitle}&backUrl=${encodedBackUrl}`;

        items.push({
          id: `book-${sem.id}-${book.code}`,
          title: book.title,
          subtitle: `${book.code} • ${sem.title} Textbook`,
          category: "Textbooks",
          url: viewerHref,
        });
      });
    });

    return items;
  }, []);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      // Show default pages when query is empty
      return searchIndex.filter((item) => item.category === "Pages");
    }

    const cleanQuery = query.toLowerCase().trim();
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(cleanQuery) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(cleanQuery)) ||
        item.category.toLowerCase().includes(cleanQuery)
    );
  }, [query, searchIndex]);


  // Keyboard shortcut (Ctrl/Cmd + K) listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Custom DOM event listener to toggle from click triggers
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-search", handleOpen);
    return () => window.removeEventListener("open-search", handleOpen);
  }, []);

  // Handle global page scroll disable when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Delay focus slightly to allow enter animation
      const timeout = setTimeout(() => inputRef.current?.focus(), 150);
      return () => {
        document.body.style.overflow = "unset";
        clearTimeout(timeout);
      };
    }
  }, [isOpen]);

  // Navigate to target item URL
  const handleSelect = (item: SearchItem) => {
    router.push(item.url);
    setIsOpen(false);
    handleQueryChange("");
  };

  // Keyboard navigation inside list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  // Auto-scroll to selected element in scroll view
  useEffect(() => {
    if (resultsRef.current && resultsRef.current.children[selectedIndex]) {
      const selectedEl = resultsRef.current.children[selectedIndex] as HTMLElement;
      selectedEl.scrollIntoView({
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Pages":
        return <FolderOpen className="size-4 text-blue-500" />;
      case "Subjects":
        return <FileText className="size-4 text-purple-500" />;
      case "Units":
        return <BookOpen className="size-4 text-emerald-500" />;
      case "Textbooks":
        return <Library className="size-4 text-amber-500" />;
      default:
        return <Search className="size-4 text-muted-foreground" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="command-menu-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 md:px-0"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-zinc-950/40 dark:bg-zinc-950/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            ref={containerRef}
            className="relative w-full max-w-2xl overflow-hidden rounded-xl border bg-popover/90 dark:bg-zinc-900/95 shadow-2xl backdrop-blur-md flex flex-col max-h-[70vh] border-border/80"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-border/60 gap-3">
              <Search className="size-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleListKeyDown}
                placeholder="Type to search notes, units, textbooks..."
                className="flex-1 bg-transparent text-foreground outline-none text-base placeholder:text-muted-foreground/70"
              />
              {query && (
                <button
                  onClick={() => handleQueryChange("")}
                  className="rounded-md p-1 hover:bg-muted/80 text-muted-foreground shrink-0"
                >
                  <X className="size-4" />
                </button>
              )}
              <kbd className="pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                esc
              </kbd>
            </div>

            {/* Results Section */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-muted-foreground/20">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-2">
                  <Search className="size-8 opacity-40 text-muted-foreground mb-1 animate-pulse" />
                  <p className="font-semibold">No resources found</p>
                  <p className="text-xs opacity-75 max-w-[300px]">
                    No matches found for &ldquo;{query}&rdquo;. Check spelling or search a different subject.
                  </p>
                </div>
              ) : (
                <div ref={resultsRef} className="flex flex-col gap-0.5">
                  {filteredItems.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 gap-3",
                          isSelected
                            ? "bg-primary/10 dark:bg-primary/15 text-foreground border border-primary/20"
                            : "hover:bg-muted/40 text-foreground/80 hover:text-foreground border border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={cn(
                              "rounded-md p-2 shrink-0 border",
                              isSelected
                                ? "bg-background border-primary/20 shadow-sm"
                                : "bg-muted/50 border-transparent"
                            )}
                          >
                            {getCategoryIcon(item.category)}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold truncate leading-tight">
                              {item.title}
                            </span>
                            {item.subtitle && (
                              <span className="text-xs text-muted-foreground truncate mt-0.5">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] uppercase font-bold tracking-wider opacity-60 text-muted-foreground px-2 py-0.5 rounded bg-muted/60 border border-border/50">
                            {item.category}
                          </span>
                          {isSelected && (
                            <CornerDownLeft className="size-3 text-muted-foreground animate-bounce-horizontal" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer / Shortcut Help */}
            <div className="px-4 py-2 bg-muted/40 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 border rounded bg-background">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 border rounded bg-background">Enter</kbd> Select
                </span>
              </div>
              <div>
                <span>Press <kbd className="px-1 border rounded bg-background">Esc</kbd> to close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
