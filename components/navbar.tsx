"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BookOpen, FileText, FolderOpen, Home, Library, LogIn, Menu } from "lucide-react";
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
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                    "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                    active
                      ? "text-foreground font-semibold"
                      : "text-foreground/60 hover:text-foreground hover:bg-muted"
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
              <SheetContent side="left" className="w-[280px] sm:w-[300px]">
                <SheetHeader className="mb-6 text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    BCA YCMOU
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-1 mt-8">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <Link 
                        key={link.href}
                        href={link.href} 
                        onClick={closeMenu}
                        className={cn(
                          "flex items-center gap-4 py-3 px-3 text-lg font-medium rounded-md transition-colors",
                          active
                            ? "text-foreground font-semibold"
                            : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-auto border-t pt-4 flex flex-col gap-2 p-4">
                  <Link href="/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full gap-2">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={closeMenu}>
                    <Button className="w-full">Sign up</Button>
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
