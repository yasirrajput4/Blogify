<div align="center">

# 📝 Blogify

**A modern, editorial blogging platform — write, publish, and read stories beautifully.**

Built with React + Vite · Styled with Tailwind CSS · Powered by Appwrite

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Appwrite](https://img.shields.io/badge/Appwrite-Cloud-FD366E?style=flat&logo=appwrite)](https://appwrite.io)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## ✨ Overview

Blogify is a full-stack blogging application with a clean, editorial aesthetic inspired by platforms like Substack and Medium. It features a complete post management system (create, read, update, delete), secure authentication, a rich text editor, and a warm typographic design system built around a Fraunces serif + Inter sans-serif pairing.

---

## 🛠️ Tech Stack

| Layer                | Technology        | Purpose                                         |
| -------------------- | ----------------- | ----------------------------------------------- |
| Library              | React 18 (Vite)   | UI rendering & fast dev builds                  |
| Styling              | Tailwind CSS      | Utility-first styling with custom design tokens |
| Backend-as-a-Service | Appwrite          | Auth, Database, and File Storage                |
| State Management     | Redux Toolkit     | Global auth state                               |
| Form Handling        | React Hook Form   | Form validation and submission                  |
| Rich Text Editor     | TinyMCE           | WYSIWYG post content editing                    |
| HTML Parsing         | html-react-parser | Safely renders stored post HTML                 |
| Routing              | React Router v6   | Client-side navigation + route guards           |

---

## 📁 Project Structure

```
Blogify/
│
├── src/
│   ├── appwrite/               # Appwrite service layer
│   ├── components/             # Reusable UI components + route guard
│   ├── conf/                   # Environment variable config
│   ├── pages/                  # Page-level components (one per route)
│   ├── store/                  # Redux store and slices
│   ├── App.jsx                 # Root layout — auth session check on mount
│   ├── main.jsx                # Entry point — router + Redux Provider
│   └── index.css               # Tailwind directives + global editorial styles
│
├── index.html                  # HTML entry — Google Fonts loaded here
├── .env.example                # Template for required environment variables
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following:

- **Node.js** v18 or higher — [Download](https://nodejs.org)
- **Appwrite account** (Cloud is free) — [Sign up](https://cloud.appwrite.io)
- **TinyMCE API key** (free tier available) — [Get key](https://www.tiny.cloud)

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/yasirrajput4/Blogify.git
cd Blogify
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Set up environment variables

Create a `.env` file in the **project root** (same level as `index.html`):

```env
VITE_APPWRITE_URL="YOUR_APPWRITE_URL"
VITE_APPWRITE_PROJECT_ID="YOUR_PROJECT_ID"
VITE_APPWRITE_DATABASE_ID="YOUR_DATABASE_ID"
VITE_APPWRITE_COLLECTION_ID="YOUR_COLLECTION_ID"
VITE_APPWRITE_BUCKET_ID="YOUR_BUCKET_ID"
VITE_TINYMCE_API_KEY="YOUR_TINYMCE_API_KEY"
```

> ⚠️ **Never commit `.env` to version control.** Add it to `.gitignore` — Vite's default scaffold does this automatically.

### Step 4 — Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✅ Features

### Core (CRUD)

- Create, read, update, and delete blog posts
- Rich text editing with TinyMCE (images, lists, tables, code blocks)
- Featured image upload and preview via Appwrite Storage
- Post status toggle — `active` (published) or `inactive` (draft)
- Auto-generated URL slug from post title, with manual override
- Author-only edit and delete controls on the post reading page

### Authentication

- Email + password signup and login via Appwrite Auth
- Session persistence — auth state restored on every page refresh
- Route guards — protected routes redirect unauthenticated users to `/login`
- Guest-only routes (login/signup) redirect logged-in users to home
- Sign out clears all active sessions across devices

### Micro-features

- Live word count + estimated read time in the post editor
- Read time displayed on the single post reading page
- One-click copy-link-to-clipboard button on each post
- TinyMCE `content_style` mirrors the reading-page typography (true WYSIWYG)
- Keyboard focus ring on all interactive elements (WCAG accessibility)
- `prefers-reduced-motion` support via global CSS

---

## 📦 Available Scripts

```bash
npm run dev       # Start local development server at http://localhost:5173
npm run build     # Production build → output in dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/amazing-feature`
3. Commit your changes — `git commit -m "feat: add amazing feature"`
4. Push to your branch — `git push origin feature/amazing-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ using React & Appwrite

</div>
