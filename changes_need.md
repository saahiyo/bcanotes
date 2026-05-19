# Google Indexing & SEO Fix Guide

This document explains all required SEO and indexing fixes for improving Google indexing and search visibility for the project.

---

# Current Problem

Google Search Console shows:

```txt
Crawled - currently not indexed
```

Example problematic URL:

```txt
/viewer?url=https://...
```

These URLs are low quality for SEO because they:
- use query parameters
- wrap external content
- contain little unique content
- create duplicate pages
- behave like document proxies

---

# Main Goal

Convert:

```txt
/viewer?url=...
```

into proper SEO-friendly routes:

```txt
/notes/operating-system/unit-2
```

---

# 1. NOINDEX Viewer Pages

Viewer pages should not be indexed.

## BEFORE

```tsx
// app/viewer/page.tsx

export default function Viewer() {
  return <div>Viewer</div>
}
```

---

## AFTER

```tsx
// app/viewer/page.tsx

export const metadata = {
  robots: {
    index: false,
    follow: false
  }
}

export default function Viewer() {
  return <div>Viewer</div>
}
```

---

# 2. Create SEO-Friendly Dynamic Routes

## BAD

```txt
/viewer?url=...
```

---

## GOOD

```txt
/notes/os/unit-2
/question-papers/sem-3
/practicals/java
```

---

# Recommended Folder Structure

```txt
app/
├── notes/
│   └── [subject]/
│       └── [unit]/
│           └── page.tsx
│
├── question-papers/
│   └── [semester]/
│       └── page.tsx
│
├── practicals/
│   └── [subject]/
│       └── page.tsx
```

---

# 3. Add Metadata

Every page should contain proper metadata.

## Example

```tsx
export async function generateMetadata({ params }) {
  return {
    title:
      'Operating System Unit 2 Notes | BCA Notes',

    description:
      'Download Operating System Unit 2 notes for BCA students.',

    keywords: [
      'Operating System Notes',
      'BCA Notes',
      'OS Unit 2 PDF'
    ]
  }
}
```

---

# 4. Add Canonical URLs

Prevents duplicate indexing.

## Example

```tsx
export async function generateMetadata({ params }) {
  return {
    alternates: {
      canonical:
        `https://bcanotes.tech/notes/${params.subject}/${params.unit}`
    }
  }
}
```

---

# 5. Add Revalidation (ISR)

Improves:
- SEO
- speed
- cache efficiency

## Example

```tsx
export const revalidate = 86400
```

---

# 6. Add Real HTML Content

DO NOT only embed PDFs or iframes.

---

# BAD

```tsx
<iframe src={pdfUrl} />
```

---

# GOOD

```tsx
<h1>Operating System Unit 2 Notes</h1>

<p>
These notes cover process scheduling,
memory management, deadlocks,
and operating system structure.
</p>

<iframe src={pdfUrl} />
```

---

# 7. Add Internal Linking

Google indexes linked pages much better.

## Example

```tsx
<Link href="/notes/os/unit-1">
  Operating System Unit 1
</Link>

<Link href="/notes/os/unit-2">
  Operating System Unit 2
</Link>
```

---

# 8. Add Sitemap Entries

ONLY include clean routes.

---

# GOOD

```txt
/notes/os/unit-2
/question-papers/sem-3
```

---

# BAD

```txt
/viewer?url=...
```

---

# Example Sitemap

```xml
<url>
  <loc>
    https://bcanotes.tech/notes/os/unit-2
  </loc>
</url>
```

---

# 9. Add Robots.txt

## Example

```txt
User-agent: *

Allow: /

Disallow: /viewer

Sitemap: https://bcanotes.tech/sitemap.xml
```

---

# 10. Add OpenGraph Metadata

Improves social previews and SEO quality.

## Example

```tsx
openGraph: {
  title: 'Operating System Notes',
  description: 'BCA Operating System Notes',
  url:
    'https://bcanotes.tech/notes/os/unit-2',
  siteName: 'BCA Notes'
}
```

---

# 11. Generate Static Params

Improves indexing and performance.

## Example

```tsx
export async function generateStaticParams() {
  const notes = await getNotes()

  return notes.map((note) => ({
    subject: note.subject,
    unit: note.unit
  }))
}
```

---

# 12. Add Structured Data (Optional)

Improves rich results.

## Example

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Operating System Unit 2 Notes"
    })
  }}
/>
```

---

# 13. Recommended Architecture

| Route | SEO Strategy |
|---|---|
| Homepage | Indexed |
| Notes | Indexed |
| Question Papers | Indexed |
| Practicals | Indexed |
| Viewer | NOINDEX |
| Admin | NOINDEX |

---

# 14. Important Rules

## NEVER index:

- `/viewer?url=...`
- parameter-heavy URLs
- embedded document wrappers
- duplicate external content

---

# ALWAYS index:

- clean slug URLs
- real content pages
- subject/unit pages
- pages with metadata

---

# 15. After Implementing

Open Google Search Console:

1. URL Inspection
2. Test Live URL
3. Request Indexing

---

# Expected Improvements

After implementing these changes:

- Better Google indexing
- Faster page ranking
- Reduced duplicate content issues
- Better SEO score
- More organic traffic
- Better Core Web Vitals
- Cleaner site architecture

---