import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Library } from "lucide-react";
import Link from "next/link";

export default function BooksPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl">
      <div className="flex flex-col space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
          <Library className="h-10 w-10 text-primary" /> E-Books
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Online textbooks for BCA YCMOU.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>BCA Textbooks</CardTitle>
            <CardDescription>Access all the official textbooks online.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="https://ycmou.digitaluniversity.ac/" target="_blank">
              <Button className="w-full gap-2">
                Visit YCMOU Portal <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
