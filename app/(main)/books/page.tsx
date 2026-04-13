import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Library } from "lucide-react";
import Link from "next/link";
import { semesterBooks } from "@/data/books";

export default function BooksPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl">
      <div className="flex flex-col space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
          <Library className="h-10 w-10 text-primary" /> E-Books
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Access official BCA YCMOU textbooks online. Select your semester to browse available e-books.
        </p>
      </div>

      <Tabs defaultValue="sem1" className="w-full">
        <TabsList className="flex flex-wrap w-full justify-start gap-2 sm:gap-3 bg-transparent p-0 group-data-horizontal/tabs:h-auto">
          {semesterBooks.map((sem) => (
            <TabsTrigger
              key={sem.id}
              value={sem.id}
              className="data-active:bg-primary data-active:text-primary-foreground border bg-muted/50 px-3 py-1.5 sm:px-6 sm:py-2.5 text-xs sm:text-sm rounded-full transition-all h-auto flex-none"
            >
              {sem.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {semesterBooks.map((sem) => (
          <TabsContent key={sem.id} value={sem.id} className="mt-8">
            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sem.books.map((book, index) => {
                const encodedUrl = encodeURIComponent(book.pdfUrl);
                const encodedTitle = encodeURIComponent(`${book.code} - ${book.title}`);
                const encodedBackUrl = encodeURIComponent("/books");
                const viewerHref = `/viewer?url=${encodedUrl}&title=${encodedTitle}&backUrl=${encodedBackUrl}`;

                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-primary/10 p-2.5 shrink-0">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{book.title}</CardTitle>
                          <CardDescription className="mt-1 font-mono text-xs">{book.code}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex gap-3">
                      <Link href={viewerHref} className="flex-1">
                        <Button className="w-full gap-2">
                          Read Online
                        </Button>
                      </Link>
                      <Link href={book.pdfUrl} target="_blank">
                        <Button variant="outline" size="icon" title="Open PDF directly">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
