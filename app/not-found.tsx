import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '404 – Page Not Found | BCA YCMOU',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="flex flex-col items-center gap-6 max-w-md">
        <div className="inline-flex size-20 items-center justify-center rounded-2xl bg-muted/50 ring-1 ring-border">
          <SearchX className="size-10 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl font-semibold tracking-tighter text-foreground">
            404
          </h1>
          <p className="text-xl font-semibold text-foreground">
            Page not found
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/">
            <Button size="lg" className="gap-2 rounded-full px-6">
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/notes">
            <Button size="lg" variant="outline" className="gap-2 rounded-full px-6">
              Browse Notes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
