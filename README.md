# 📚 BCA YCMOU — Learning Resources

A modern, responsive web portal for **BCA YCMOU** students to access notes, e-books, previous year question papers, and solved practicals — all in one place.

Official URL: **[https://bcanotes.tech/](https://bcanotes.tech/)**

Built with **Next.js**, **React 19**, and **Tailwind CSS 4**.

---

## ✨ Features

- **📝 Notes** — Comprehensive unit-wise notes for subjects across all semesters.
- **📖 E-Books** — Online textbooks curated for the BCA YCMOU syllabus.
- **📄 Question Papers** — Previous year question papers (2017–2024).
- **🧪 Practicals** — Solved practicals for Semester 1 to 6.
- **📄 Advanced Document Viewer** — Built-in `pdf.js` integration for native PDF rendering and an intelligent iframe fallback with automatic blocked-provider detection (e.g., Zoho) to ensure a seamless reading experience.
- **🤝 Contribute Portal** — Direct Drag-and-Drop Google Drive upload integration via Google Apps Script.
- **🔐 Authentication** — Secure Login & Signup pages powered by Firebase Auth with Google OAuth support.
- **📱 Responsive Design** — Fully responsive with a mobile-friendly slide-out navigation.
- **⚡ Performance** — Route-specific loading skeletons for a smooth UX and Vercel Analytics for tracking.
- **🎨 Modern UI** — Clean, glassmorphism-inspired design with the Geist font, dark/light mode toggle, and interactive elements like a custom cursor follower.
- **🔍 SEO Optimized** — Dynamic `sitemap.xml`, `robots.txt`, and comprehensive meta tags for search engine visibility.
- **📲 PWA Support** — Web manifest and icons for a native app experience on mobile and desktop.
- **🛠️ Error Resilience** — Custom 404 (Not Found) and global error boundary pages.

---

## 🗂️ Subjects Covered

| Subject | Units |
|---|---|
| Problem Solving Using Computers | 8 |
| Programming Using C++ | 8 |
| Computer Network | 6 |
| Environmental Studies (E.V.S) | 7 |
| Data Structures & Algorithms (D.S.A) | 9 |
| Operating System | 8 |
| Web Technology | 8 |
| ... and many more! | |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) |
| **Library** | [React](https://react.dev/) 19 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) 4 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) 5.9 |
| **Authentication**| [Firebase](https://firebase.google.com/) 12 |
| **Icons & UI** | [Lucide React](https://lucide.dev/), [Base UI](https://base-ui.com/), Shadcn UI |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **PDF Rendering** | [PDF.js](https://mozilla.github.io/pdf.js/) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |

---

## 📁 Project Structure

```text
bcanotes/
├── app/
│   ├── (auth)/               # Firebase Auth routes (login/signup)
│   ├── (main)/               # Main app pages (notes, books, profile, contribute)
│   ├── api/                  # Next.js API routes
│   ├── viewer/               # Advanced document viewer with PDF.js & Iframe fallback
│   ├── layout.tsx            # Root layout with SEO metadata & Providers
│   ├── robots.ts             # Dynamic robots.txt
│   ├── sitemap.ts            # Dynamic sitemap.xml
│   ├── manifest.ts           # Web app manifest
│   ├── not-found.tsx         # Custom 404 page
│   └── error.tsx             # Global error boundary
├── components/               # Reusable React & Shadcn UI components
├── data/                     # Static subject and book data
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions (utils, Firebase config, etc.)
├── public/                   # Static assets (images, fonts, icons)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saahiyo/bcanotes.git
   cd bcanotes
   ```

2. **Set up Environment Variables**
   Create a `.env` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add the necessary keys:
   ```env
   NEXT_PUBLIC_SITE_URL=https://bcanotes.tech
   GOOGLE_DRIVE_API_KEY=your_api_key_here
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_key_here
   GOOGLE_APPS_SCRIPT_URL=your_google_apps_script_url_here
   # Add your Firebase config keys here as required by lib/firebase.ts
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint checks |
| `npm run clean` | Remove the `.next` build cache |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <strong>Made with ❤️ for BCA YCMOU students</strong>
</div>
