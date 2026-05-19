# Next.js Caching & Revalidation Setup Guide

This guide explains all required changes to implement proper caching and ISR (Incremental Static Regeneration) in a Next.js App Router project deployed on Vercel.

---

# 1. Add Revalidation to Pages

## BEFORE

```tsx
// app/question-papers/page.tsx

export default function Page() {
  return <div>Question Papers</div>
}
```

---

## AFTER

```tsx
// app/question-papers/page.tsx

export const revalidate = 86400

export default function Page() {
  return <div>Question Papers</div>
}
```

---

# Recommended Revalidation Times

| Route | Revalidate |
|---|---|
| Homepage | 3600 |
| Notes | 86400 |
| Question Papers | 86400 |
| Practicals | 86400 |
| Blogs | 3600 |

---

# 2. Cache Fetch Requests

## BEFORE

```ts
const res = await fetch(API_URL)
```

---

## AFTER

```ts
const res = await fetch(API_URL, {
  next: {
    revalidate: 86400
  }
})
```

---

# 3. Force Static Pages

For pages that rarely change.

## Example

```tsx
export const dynamic = 'force-static'
```

---

# 4. Dynamic Routes ISR

## BEFORE

```tsx
// app/notes/[subjectId]/page.tsx

export default async function Page({ params }) {
  const data = await getData(params.subjectId)

  return <div>{data.title}</div>
}
```

---

## AFTER

```tsx
// app/notes/[subjectId]/page.tsx

export const revalidate = 86400

export default async function Page({ params }) {
  const data = await getData(params.subjectId)

  return <div>{data.title}</div>
}
```

---

# 5. Add Static Params

Improves SEO and performance.

## Example

```tsx
export async function generateStaticParams() {
  const notes = await getNotes()

  return notes.map((note) => ({
    subjectId: note.id
  }))
}
```

---

# 6. Cache API Routes

## BEFORE

```ts
export async function GET() {
  const data = await getData()

  return Response.json(data)
}
```

---

## AFTER

```ts
export async function GET() {
  const data = await getData()

  return Response.json(data, {
    headers: {
      'Cache-Control':
        'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}
```

---

# 7. Add Revalidation After Data Update

Useful for admin panel uploads.

## Example

```ts
import { revalidatePath } from 'next/cache'

revalidatePath('/notes')
revalidatePath(`/notes/${id}`)
```

---

# 8. Recommended Setup For Your Project

## Notes Pages

```tsx
export const revalidate = 86400
```

---

## Question Papers

```tsx
export const revalidate = 86400
```

---

## Practicals

```tsx
export const revalidate = 86400
```

---

## Homepage

```tsx
export const revalidate = 3600
```

---

## API Fetch

```ts
const res = await fetch(API_URL, {
  next: {
    revalidate: 86400
  }
})
```

---

# 9. Avoid These Mistakes

## DO NOT USE

```tsx
cache: 'no-store'
```

unless absolutely necessary.

---

## DO NOT USE

```tsx
export const dynamic = 'force-dynamic'
```

for public content pages.

---

# 10. Verify Caching Works

Open browser DevTools → Network → Headers

Look for:

```txt
x-vercel-cache: HIT
```

---

# Cache Status Meanings

| Status | Meaning |
|---|---|
| HIT | Served from cache |
| MISS | Freshly generated |
| STALE | Old cache served while regenerating |

---

# 11. Expected Improvements

After implementing caching:

- Faster page loads
- Better SEO
- Lower Vercel usage
- Better Core Web Vitals
- Higher cache hit ratio
- Reduced serverless execution

---

# 12. Final Recommended Architecture

| Route Type | Strategy |
|---|---|
| Homepage | ISR |
| Notes | ISR |
| Question Papers | ISR |
| Practicals | ISR |
| Viewer | Partial Dynamic |
| Admin Panel | Dynamic |
| APIs | Cached Responses |

---