<div align="center">

<br />

<img src="https://img.shields.io/badge/Blogify-Editorial%20Blogging%20Platform-C1502E?style=for-the-badge&labelColor=1F1B16" alt="Blogify" />

<br />
<br />

**A modern, editorial blogging platform — write, publish, and read stories beautifully.**

<p>
  <a href="https://blogify-eosin-zeta.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐  Live Demo-blogify--eosin--zeta.vercel.app-C1502E?style=flat-square" alt="Live Demo" />
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Appwrite-Cloud-FD366E?style=flat-square&logo=appwrite&logoColor=white" alt="Appwrite" />
  <img src="https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/License-MIT-22C55E?style=flat-square" alt="License" />
</p>

<br />

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Appwrite Setup](#-appwrite-setup)
- [Design System](#-design-system)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Overview

Blogify is a full-stack blogging application with a clean, editorial aesthetic inspired by Substack and Medium. Built with React and Appwrite as the backend, it delivers a complete content management experience — from writing with a rich text editor to reading with beautifully typeset prose.

The design system is built around a **Fraunces serif + Inter sans-serif** pairing on a warm paper palette, with a signature terracotta accent that runs consistently through links, CTAs, hover states, and blockquotes.

---

## 🌐 Live Demo

> 🔗 **[blogify-eosin-zeta.vercel.app](https://blogify-eosin-zeta.vercel.app)**

Create an account and start writing. All data is stored in Appwrite Cloud.

---

## 🛠️ Tech Stack

| Layer                | Technology        | Purpose                                         |
| -------------------- | ----------------- | ----------------------------------------------- |
| Library              | React 18 (Vite)   | UI rendering & fast dev builds                  |
| Styling              | Tailwind CSS      | Utility-first styling with custom design tokens |
| Backend-as-a-Service | Appwrite Cloud    | Auth, Database, and File Storage                |
| State Management     | Redux Toolkit     | Global authentication state                     |
| Form Handling        | React Hook Form   | Form validation and controlled submission       |
| Rich Text Editor     | TinyMCE           | WYSIWYG post content editing                    |
| HTML Parsing         | html-react-parser | Safely renders stored post HTML on read page    |
| Routing              | React Router v6   | Client-side navigation + protected route guards |

---

## ✅ Features

### 📝 Core — Post Management

- Create, read, update, and delete blog posts
- Rich text editing with TinyMCE (images, lists, tables, headings, code blocks)
- Featured image upload and storage via Appwrite Storage
- Post status toggle — `active` (published) or `inactive` (draft)
- Auto-generated URL slug from post title, with manual override
- Author-only Edit and Delete controls on the reading page

### 🔐 Authentication

- Email + password signup and login via Appwrite Auth
- Session persistence — auth state restored automatically on page refresh
- Protected route guards — unauthenticated users redirected to `/login`
- Guest-only routes — logged-in users redirected away from login/signup
- Sign out clears all active sessions across devices

### 🎨 UI / UX

- Editorial design system — Fraunces serif headlines, Inter body, warm paper palette
- Sticky header with backdrop blur and active route indicator
- Shimmer skeleton loaders on all data-fetching pages
- Polished empty states with contextual messaging
- Branded wordmark pulse animation during initial auth check
- Terracotta "spine" left-border hover effect on all post cards

### ⚡ Micro-features

- Live word count + estimated read time in the post editor
- Read time badge on the single post reading page
- One-click copy-link-to-clipboard on each post
- TinyMCE `content_style` mirrors reading-page typography (true WYSIWYG)
- Keyboard focus ring on all interactive elements (WCAG accessibility)
- `prefers-reduced-motion` respected via global CSS

---

## 📁 Project Structure

```
Blogify/
│
├── src/
│   ├── appwrite/               # Appwrite service layer (auth + database + storage)
│   ├── components/             # Reusable UI components + AuthLayout route guard
│   ├── conf/                   # Environment variable config (conf.js)
│   ├── pages/                  # Page-level components, one per route
│   ├── store/                  # Redux store and authSlice
│   ├── App.jsx                 # Root layout — session check on mount
│   ├── main.jsx                # Entry point — router + Redux Provider
│   └── index.css               # Tailwind directives + global editorial styles
│
├── index.html                  # HTML shell — Google Fonts loaded here
├── .env                        # Local environment variables (never commit)
├── .env.example                # Safe template to share with collaborators
├── tailwind.config.js          # Tailwind config with editorial design tokens
├── vite.config.js              # Vite configuration
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ — [Download](https://nodejs.org)
- **Appwrite Cloud account** (free) — [Sign up](https://cloud.appwrite.io)
- **TinyMCE API key** (free tier) — [Get key](https://www.tiny.cloud)

### 1 — Clone the repository

```bash
git clone https://github.com/yasirrajput4/Blogify.git
cd Blogify
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Configure environment variables

```bash
cp .env.example .env
```

Fill in your values — see [Environment Variables](#-environment-variables) below.

### 4 — Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following keys:

```env
VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id"
VITE_APPWRITE_DATABASE_ID="your_database_id"
VITE_APPWRITE_COLLECTION_ID="your_collection_id"
VITE_APPWRITE_BUCKET_ID="your_bucket_id"
VITE_TINYMCE_API_KEY="your_tinymce_api_key"
```

> ⚠️ Never commit `.env` to version control. It is already listed in `.gitignore`.

These variables are consumed in `src/conf/conf.js` and injected into the app at build time by Vite via `import.meta.env`.

---

## ☁️ Appwrite Setup

### 1 — Create a Database and Collection

In your Appwrite Console, create a database and add a collection with these attributes:

| Attribute       | Type   | Size      | Required |
| --------------- | ------ | --------- | -------- |
| `title`         | String | 255       | ✅       |
| `content`       | String | unlimited | ✅       |
| `featuredImage` | String | 255       | ✅       |
| `status`        | String | 20        | ✅       |
| `userId`        | String | 255       | ✅       |

### 2 — Set Collection Permissions

| Role    | Create | Read | Update | Delete |
| ------- | ------ | ---- | ------ | ------ |
| `Any`   | ❌     | ✅   | ❌     | ❌     |
| `Users` | ✅     | ✅   | ✅     | ✅     |

### 3 — Create a Storage Bucket

- Allowed MIME types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`
- Permissions: `Users` → Create, Read, Update, Delete

> **Note:** This project uses `getFileView()` instead of `getFilePreview()` for image URLs. This means `Any Read` is **not required** on the bucket — `Users` permissions alone are sufficient and more secure.

### 4 — Register your Web Platform

**Appwrite Console → Project → Overview → Platforms → Add Platform → Web**

Add:

- `http://localhost:5173` for local development
- `https://blogify-eosin-zeta.vercel.app` for production

---

## 🎨 Design System

### Typography

| Role      | Font                      | Usage                                               |
| --------- | ------------------------- | --------------------------------------------------- |
| Display   | Fraunces (variable serif) | Post titles, page headings, auth headings, wordmark |
| Body / UI | Inter (sans-serif)        | Nav, labels, buttons, meta text, body copy          |
| Mono      | System monospace          | Read time, dates, bylines, code snippets            |

### Colour Palette

| Token        | Hex       | Usage                                     |
| ------------ | --------- | ----------------------------------------- |
| `paper`      | `#FAF6EF` | Page background                           |
| `paper-dim`  | `#F2ECDE` | Cards, sidebar wells, input backgrounds   |
| `ink`        | `#1F1B16` | Primary headings and display text         |
| `ink-soft`   | `#4A4339` | Body copy, paragraph text                 |
| `clay`       | `#8B6F5C` | Meta text, placeholders, secondary labels |
| `rule`       | `#E4DCC8` | All borders and dividers                  |
| `terracotta` | `#C1502E` | Primary accent — CTAs, links, hover spine |
| `sage`       | `#5B7B5A` | Success / "Update" button state           |

### The Terracotta Spine

Every post card has a `2px` left border (`border-rule`) that animates to `border-terracotta` on hover — matching the blockquote marker in the editor and links on the reading page. One repeating motif, like a manuscript annotation mark, is the visual signature of the Blogify design system.

---

## 📦 Available Scripts

```bash
npm run dev       # Start local development server → http://localhost:5173
npm run build     # Production build → output in dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

---

## 🚢 Deployment

This project is deployed on **Vercel**.

### Deploy your own fork

```bash
npm install -g vercel
vercel
```

Add your `.env` variables in the Vercel dashboard:
**Project → Settings → Environment Variables**

Then add your Vercel domain to Appwrite's allowed Web Platforms to avoid CORS errors.

### Netlify

```bash
npm run build
# deploy the dist/ folder
```

Add environment variables under **Site → Site configuration → Environment variables**.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m "feat: add your feature"`
4. Push to your branch — `git push origin feature/your-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.
See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by <a href="https://github.com/yasirrajput4">Yasir Rajput</a>

<br />
<br />

⭐ Star this repo if you found it helpful!

</div>
