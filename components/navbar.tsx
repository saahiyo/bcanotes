"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BookOpen, FileText, FolderOpen, Home, Library, LogIn, Menu, Heart, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
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
    <header className="sticky top-0 z-50 w-full border-b  backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight">BCA YCMOU</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={cn(
                    "relative flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                    active
                      ? "text-primary font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[1.5px] after:bg-gradient-to-r after:from-[#4285f4] after:to-[#1a73e8] after:rounded-t-full"
                      : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center ml-4 gap-2">
            <ModeToggle />
            <Link href="/login">
              <Button variant="link" size="sm" className="gap-2">
                {/* <LogIn className="h-4 w-4" /> */}
                <ArrowUpRight className="h-4 w-4"/>
                Create a account 
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open Menu" />}>
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[300px] flex flex-col">
                <SheetHeader className="text-left pb-2 border-b">
                  <SheetTitle className="flex items-center gap-2 text-primary">
                    <BookOpen className="h-6 w-6" />
                    <span className="font-bold text-xl tracking-tight">BCA YCMOU</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-4">
                  <nav className="flex flex-col gap-1.5">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.href);
                      return (
                        <Link 
                          key={link.href}
                          href={link.href} 
                          onClick={closeMenu}
                          className={cn(
                            "flex items-center gap-3 py-3 px-4 text-[15px] font-medium rounded-lg transition-all",
                            active
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                          )}
                        >
                          <Icon className={cn("h-5 w-5", active ? "text-primary" : "text-foreground/50")} />
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                <div className="mt-auto pt-6 flex flex-col gap-4 border-t pb-4">
                  <Link href="/login" onClick={closeMenu}>
                    <Button variant="outline" size="lg" className="w-full gap-2 h-12 text-base">
                      <LogIn className="h-5 w-5" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={closeMenu}>
                    <Button size="lg" className="w-full h-12 text-base font-semibold">Sign up</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
