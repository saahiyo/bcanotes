"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, BookOpen, FileText, FolderOpen, Home, Library, LogIn, LogOut, Menu, Heart, MessageSquare, User, Search, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/components/auth-provider";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();
  const { push } = useRouter();
  const { user, loading, signOut } = useAuth();

  const resourcesRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsOpen(false);

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
    setShowProfile(false);
    push("/");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setShowResources(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resourceLinks = [
    { href: "/notes", label: "Notes", description: "Unit-wise notes for all subjects", icon: FileText, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
    { href: "/books", label: "E-Books", description: "Official online digital textbooks", icon: Library, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    { href: "/question-papers", label: "Question Papers", description: "Previous year exam papers", icon: FolderOpen, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    { href: "/practicals", label: "Practicals", description: "Lab files and practical solutions", icon: FolderOpen, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  ];

  // Mobile drawer links
  const allNavLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/notes", label: "Notes", icon: FileText },
    { href: "/books", label: "E-Books", icon: Library },
    { href: "/question-papers", label: "Question Papers", icon: FolderOpen },
    { href: "/practicals", label: "Practicals", icon: FolderOpen },
    { href: "/contribute", label: "Contribute", icon: Heart },
    { href: "/contact", label: "Contact", icon: MessageSquare },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 md:h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 md:gap-2">
            <BookOpen className="size-7 md:size-6 text-primary" />
            <Link href="/" className="flex items-center gap-x-2">
              <span className="font-bold text-2xl md:text-xl tracking-tight">BCA YCMOU</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-x-1 text-sm font-medium">
            <Link 
              href="/" 
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                pathname === "/"
                  ? "text-primary font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[1.5px] after:bg-gradient-to-r after:from-[#4285f4] after:to-[#1a73e8] after:rounded-t-full"
                  : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Home className="size-5 md:size-4" />
              Home
            </Link>

            {/* Resources Dropdown Trigger */}
            <div 
              className="relative" 
              ref={resourcesRef}
              onMouseEnter={() => setShowResources(true)}
              onMouseLeave={() => setShowResources(false)}
            >
              <button
                onClick={() => {
                  setShowResources(!showResources);
                  setShowProfile(false);
                }}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm font-medium focus:outline-none",
                  resourceLinks.some(link => pathname.startsWith(link.href))
                    ? "text-primary font-semibold"
                    : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
                )}
              >
                <BookOpen className="size-5 md:size-4" />
                <span>Resources</span>
                <ChevronDown className={cn("size-3.5 transition-transform duration-200", showResources && "rotate-180")} />
              </button>

              <AnimatePresence>
                {showResources && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 mt-2 w-80 rounded-xl border bg-popover/95 p-2 shadow-xl z-50 border-border/80 backdrop-blur-md"
                  >
                    <div className="grid gap-1">
                      {resourceLinks.map((link) => {
                        const Icon = link.icon;
                        const active = pathname.startsWith(link.href);
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setShowResources(false)}
                            className={cn(
                              "flex items-start gap-3 p-2.5 rounded-lg transition-colors text-left",
                              active
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted/60 text-foreground/80 hover:text-foreground"
                            )}
                          >
                            <div className={cn("rounded-md p-1.5 border shrink-0", link.color)}>
                              <Icon className="size-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-semibold leading-none">{link.label}</span>
                              <span className="text-[11px] text-muted-foreground mt-1 leading-normal">
                                {link.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/contribute" 
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                pathname.startsWith("/contribute")
                  ? "text-primary font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[1.5px] after:bg-gradient-to-r after:from-[#4285f4] after:to-[#1a73e8] after:rounded-t-full"
                  : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Heart className="size-5 md:size-4" />
              Contribute
            </Link>

            <Link 
              href="/contact" 
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                pathname.startsWith("/contact")
                  ? "text-primary font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[1.5px] after:bg-gradient-to-r after:from-[#4285f4] after:to-[#1a73e8] after:rounded-t-full"
                  : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
              )}
            >
              <MessageSquare className="size-5 md:size-4" />
              Contact
            </Link>
          </nav>

          {/* Desktop Right Side Controls */}
          <div className="hidden md:flex items-center ml-4 gap-3">
            {/* Search Input Bar (Responsive Width) */}
            <Button
              variant="outline"
              className="relative h-9 w-9 xl:w-52 justify-start rounded-md bg-muted/40 text-xs text-muted-foreground hover:bg-muted/70 transition-colors border-border/60 shrink-0 p-0 xl:px-3"
              onClick={() => window.dispatchEvent(new Event("open-search"))}
            >
              <Search className="size-4 xl:size-3.5 xl:mr-2 mx-auto xl:mx-0" />
              <span className="hidden xl:inline-flex">Search...</span>
              <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[9px] font-medium opacity-100 xl:flex">
                <span className="text-[10px]">Ctrl</span>K
              </kbd>
            </Button>
            
            <ModeToggle />

            {/* Profile Avatar Dropdown */}
            {!loading && (
              user ? (
                <div className="relative shrink-0" ref={profileRef}>
                  <button
                    onClick={() => {
                      setShowProfile(!showProfile);
                      setShowResources(false);
                    }}
                    className="flex items-center gap-2 text-sm hover:opacity-85 transition-opacity focus:outline-none"
                    aria-label="User profile"
                  >
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs uppercase border border-primary/20 transition-transform active:scale-95 shrink-0">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                    </div>
                    <span className="max-w-[100px] truncate font-medium hidden lg:inline text-foreground text-left">
                      {user.displayName || user.email?.split("@")[0]}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showProfile && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-56 rounded-xl border bg-popover/95 p-2 shadow-xl z-50 border-border/80 backdrop-blur-md"
                      >
                        <div className="px-2.5 py-2">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {user.displayName || "Student"}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                            {user.email}
                          </p>
                        </div>
                        
                        <div className="h-[1px] bg-border/60 my-1" />

                        <div className="grid gap-0.5">
                          <Link
                            href="/profile"
                            onClick={() => setShowProfile(false)}
                            className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors"
                          >
                            <User className="size-4 text-muted-foreground" />
                            View Profile
                          </Link>
                          
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors w-full text-left"
                          >
                            <LogOut className="size-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="link" size="sm" className="gap-2 shrink-0">
                    <ArrowUpRight className="size-4"/>
                    Create an account 
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Mobile Navigation Header */}
          <div className="flex items-center gap-1.5 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="size-10"
              onClick={() => window.dispatchEvent(new Event("open-search"))}
              aria-label="Open Search"
            >
              <Search className="size-5" />
            </Button>
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="size-10" aria-label="Open Menu" />}>
                <Menu className="size-7" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[320px] flex flex-col">
                <SheetHeader className="text-left pb-4 border-b">
                  <SheetTitle className="flex items-center gap-3 text-primary">
                    <BookOpen className="size-7" />
                    <span className="font-bold text-2xl tracking-tight">BCA YCMOU</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-4">
                  <nav className="flex flex-col gap-1.5">
                    {allNavLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.href);
                      return (
                        <Link 
                          key={link.href}
                          href={link.href} 
                          onClick={closeMenu}
                          className={cn(
                            "flex items-center gap-4 py-3.5 px-4 text-[17px] font-medium rounded-lg transition-all",
                            active
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                          )}
                        >
                          <Icon className={cn("size-6", active ? "text-primary" : "text-foreground/50")} />
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                <div className="mt-auto pt-6 flex flex-col gap-4 border-t pb-4">
                  {!loading && (
                    user ? (
                      <>
                        <Link href="/profile" onClick={closeMenu} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted/60 transition-colors">
                          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm uppercase">
                            {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{user.displayName || "User"}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          </div>
                        </Link>
                        <Button variant="outline" size="lg" className="w-full gap-2 h-12 text-base" onClick={handleSignOut}>
                          <LogOut className="size-5" />
                          Sign out
                        </Button>
                      </>
                    ) : (
                      <>
                      <Link href="/login" onClick={closeMenu}>
                        <Button variant="outline" size="lg" className="w-full gap-2 h-12 text-base">
                          <LogIn className="size-5" />
                          Login
                        </Button>
                      </Link>
                        <Link href="/signup" onClick={closeMenu}>
                          <Button size="lg" className="w-full h-12 text-base font-semibold">Sign up</Button>
                        </Link>
                      </>
                    )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
