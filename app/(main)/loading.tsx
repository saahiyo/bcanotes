import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-full py-16 md:py-24 lg:py-32 xl:py-48 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-y-8 text-center">
            <div className="gap-y-4 w-full flex flex-col items-center">
              <Skeleton className="h-12 sm:h-14 md:h-16 w-3/4 max-w-lg" />
              <Skeleton className="h-6 w-2/3 max-w-[500px]" />
            </div>
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="rounded-xl ring-1 ring-foreground/10 p-6 flex flex-col gap-y-4">
                <Skeleton className="size-10 rounded-md" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
