# 📚 BCA YCMOU — Learning Resources

A modern, responsive web portal for **BCA YCMOU** students to access notes, e-books, previous year question papers, and solved practicals — all in one place.

Built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**.

---

## ✨ Features

- **📝 Notes** — Comprehensive unit-wise notes for subjects across all semesters
- **📖 E-Books** — Online textbooks curated for the BCA YCMOU syllabus
- **📄 Question Papers** — Previous year question papers (2017–2024)
- **🧪 Practicals** — Solved practicals for Semester 1 to 6
- **🔐 Authentication** — Login & Signup pages with Google OAuth support
- **📱 Responsive Design** — Fully responsive with a mobile-friendly slide-out navigation
- **⚡ Loading Skeletons** — Route-specific loading states for a smooth UX
- **🎨 Modern UI** — Clean, glassmorphism-inspired design with the Geist font

---

## 🗂️ Subjects Covered

| Subject | Units |
|---|---|
| Problem Solving Using Computers | 8 |
| Programming Using C++ | 8 |
| Computer Network | 6 |
| Environmental Studies (E.V.S) | 7 |
| Data Structures & Algorithms (D.S.A) | 9 |

---

## 🛠️ Tech Stack

| Technology | Version |
|---|---|
| [Next.js](https://nextjs.org/) | 16 |
| [React](https://react.dev/) | 19 |
| [Tailwind CSS](https://tailwindcss.com/) | 4 |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 |
| [Lucide Icons](https://lucide.dev/) | Latest |
| [Base UI](https://base-ui.com/) | Latest |

---

## 📁 Project Structure

```
bcanotes/
├── app/
│   ├── (auth)/               # Auth route group
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx
│   ├── (main)/               # Main app route group
│   │   ├── page.tsx           # Landing / Home page
│   │   ├── notes/             # Notes listing & subject detail
│   │   ├── books/             # E-Books page
│   │   ├── question-papers/   # Question papers page
│   │   ├── practicals/        # Practicals page
│   │   ├── layout.tsx         # Main layout with Navbar
│   │   └── loading.tsx        # Loading skeleton
│   ├── globals.css
│   └── layout.tsx             # Root layout
├── components/
│   ├── navbar.tsx             # Responsive navigation bar
│   └── ui/                    # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       └── tabs.tsx
├── data/
│   └── subjects.ts            # Subject data & unit links
├── lib/
│   └── utils.ts               # Utility functions (cn)
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

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**

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
