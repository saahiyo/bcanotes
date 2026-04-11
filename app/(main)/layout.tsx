import { Navbar } from '@/components/navbar';
import Link from 'next/link';
import { BookOpen, Github, Twitter, Globe, MessageSquare } from 'lucide-react';

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="w-full border-t bg-muted/20 pb-8 pt-12 md:pb-12 md:pt-16 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <BookOpen className="h-6 w-6 text-primary" />
                <span>BCA YCMOU</span>
              </Link>
              <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
                The unofficial, community-driven resource portal exclusively built for BCA YCMOU students. Access notes, books, PYQs, and everything else you need to ace your exams completely free.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/notes" className="hover:text-primary transition-colors">Subject Notes</Link></li>
                <li><Link href="/books" className="hover:text-primary transition-colors">E-Books Reference</Link></li>
                <li><Link href="/question-papers" className="hover:text-primary transition-colors">Previous Year Papers</Link></li>
                <li><Link href="/practicals" className="hover:text-primary transition-colors">Solved Practicals</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Connect</h4>
              <div className="flex items-center gap-4 text-muted-foreground">
                <Link href="https://github.com/saahiyo" className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors" aria-label="GitHub" target='_blank'>
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="https://twitter.com/saahiyo75" className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors" aria-label="Twitter" target="_blank">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="/contact" className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors" aria-label="Contact">
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border/40 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} BCA YCMOU. Unofficial resource portal.
            </p>
            <div className="flex gap-6 font-medium">
              <Link href="https://github.com/saahiyo/bcanotes" className="hover:text-foreground transition-colors">Contribute</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
