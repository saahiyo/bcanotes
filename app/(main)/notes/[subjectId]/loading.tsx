import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-5xl">
      <div className="mb-8">
        <div className="inline-flex items-center mb-6">
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 w-full">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full shrink-0" />
              <Skeleton className="h-10 w-3/4 max-w-md" />
            </div>
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-12 w-full md:w-48 rounded-md shrink-0" />
        </div>
      </div>

      <div className="grid gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-6">
            <div className="mb-4 sm:mb-0 w-full">
              <Skeleton className="h-6 w-3/4 sm:w-64" />
            </div>
            <Skeleton className="h-10 w-full sm:w-32 rounded-md shrink-0" />
          </Card>
        ))}
      </div>
    </div>
  );
}
