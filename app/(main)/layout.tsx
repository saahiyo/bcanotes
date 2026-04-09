import { Navbar } from '@/components/navbar';

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for BCA YCMOU students. Unofficial resource portal.
          </p>
        </div>
      </footer>
    </>
  );
}
