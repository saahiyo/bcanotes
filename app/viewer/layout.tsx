import type { Metadata } from "next";

export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: Promise<{ title?: string }> 
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const title = resolvedParams.title ? decodeURIComponent(resolvedParams.title) : "Document Viewer";

  return {
    title: `${title} – Viewer`,
    description: `Viewing ${title} on the BCA YCMOU resource portal.`,
    robots: {
      index: false, // Don't index individual document viewer pages to avoid bloat
      follow: true,
    }
  };
}

export default function ViewerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
