<div align="center">

# 📝 Blogify

**A modern, editorial blogging platform — write, publish, and read stories beautifully.**

Built with React + Vite · Styled with Tailwind CSS · Powered by Appwrite

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Appwrite](https://img.shields.io/badge/Appwrite-Cloud-FD366E?style=flat&logo=appwrite)](https://appwrite.io)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

</div>

---

## ✨ Overview

Blogify is a full-stack blogging application with a clean, editorial aesthetic inspired by platforms like Substack and Medium. It features a complete post management system (create, read, update, delete), secure authentication, a rich text editor, and a warm typographic design system built around a Fraunces serif + Inter sans-serif pairing.

---

## 🖼️ Screenshots

> _Add screenshots here after deployment_

---

## 🛠️ Tech Stack

| Layer                | Technology        | Purpose                                         |
| -------------------- | ----------------- | ----------------------------------------------- |
| Framework            | React 18 (Vite)   | UI rendering & fast dev builds                  |
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
blogify/
│
├── public/                     # Static assets
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
├── .env                        # Environment variables (never commit this)
├── .env.example                # Template for required environment variables
├── tailwind.config.js          # Tailwind config with custom design tokens
├── vite.config.js              # Vite configuration
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
git clone https://github.com/your-username/blogify.git
cd blogify
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Set up environment variables

Create a `.env` file in the **project root** (same level as `index.html`):

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

> ⚠️ **Never commit `.env` to version control.** Add it to `.gitignore` — Vite's default scaffold does this automatically.

Then create `src/conf/conf.js` to expose these variables to the app:

```js
const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  tinyMCEApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
};

export default conf;
```

### Step 4 — Configure Appwrite

Log in to your [Appwrite Console](https://cloud.appwrite.io) and complete the following:

**① Create a Database and Collection**

Add a collection with these exact attributes:

| Attribute       | Type   | Size          | Required |
| --------------- | ------ | ------------- | -------- |
| `title`         | String | 255           | ✅       |
| `content`       | String | — (unlimited) | ✅       |
| `featuredImage` | String | 255           | ✅       |
| `status`        | String | 20            | ✅       |
| `userId`        | String | 255           | ✅       |

**② Set Collection Permissions**

- Read → `Any` (so posts are publicly readable)
- Create / Update / Delete → `Users` with document-level security so only the author can edit their own posts

**③ Create a Storage Bucket**

- Go to **Storage → Create Bucket**
- Set allowed MIME types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`
- Permissions: Read → `Any`, Create → `Users`

**④ Register your app platform**

Go to **Project → Overview → Platforms → Add Platform → Web** and add:

- `http://localhost:5173` for local development
- Your production URL after deployment

### Step 5 — Add Tailwind design tokens

Open `tailwind.config.js` and add the following under `theme.extend`:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF6EF", // warm off-white page background
        "paper-dim": "#F2ECDE", // cards, wells, input fills
        ink: "#1F1B16", // primary text
        "ink-soft": "#4A4339", // body copy, paragraph text
        clay: "#8B6F5C", // meta text, captions, dates
        rule: "#E4DCC8", // borders, dividers
        terracotta: "#C1502E", // primary accent — links, CTAs, spine
        "terracotta-dark": "#A23F22", // terracotta hover state
        sage: "#5B7B5A", // success / active status
      },
      fontFamily: {
        display: ["'Fraunces'", "Georgia", "serif"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "'SF Mono'", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
```

### Step 6 — Run the development server

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

### UI / UX

- Editorial design system — Fraunces serif headlines, Inter body, warm paper palette
- Sticky header with backdrop blur and active route indicator
- Shimmer skeleton loaders on all data-fetching pages
- Polished empty states with contextual messaging
- Disabled and loading states on all form submit buttons
- Branded wordmark pulse animation during the initial auth check
- Terracotta "spine" left-border hover effect on all post cards

### Micro-features

- Live word count + estimated read time in the post editor
- Read time displayed on the single post reading page
- One-click copy-link-to-clipboard button on each post
- TinyMCE `content_style` mirrors the reading-page typography (true WYSIWYG)
- Keyboard focus ring on all interactive elements (WCAG accessibility)
- `prefers-reduced-motion` support via global CSS

---

## 🗺️ Routes

| Route              | Page                          | Auth Required                    |
| ------------------ | ----------------------------- | -------------------------------- |
| `/`                | Home — latest published posts | No                               |
| `/login`           | Login                         | No (redirects home if logged in) |
| `/signup`          | Signup                        | No (redirects home if logged in) |
| `/all-posts`       | All posts grid                | ✅ Yes                           |
| `/add-post`        | Post editor — create mode     | ✅ Yes                           |
| `/edit-post/:slug` | Post editor — edit mode       | ✅ Yes                           |
| `/post/:slug`      | Single post reading view      | No                               |

---

## 🐛 Bugs Fixed During Refactor

| File                        | Bug                                                                                                                                                                     | Fix Applied                                   |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `appwrite/auth.js`          | `createEmailSession()` was deprecated in Appwrite v1.5 and removed in v1.6+ — login was broken                                                                          | Replaced with `createEmailPasswordSession()`  |
| `pages/AllPosts.jsx`        | `getPosts()` was called directly in the render body, outside `useEffect` — triggered an infinite re-fetch loop on every render                                          | Moved inside `useEffect(fn, [])`              |
| `pages/Login.jsx`           | `<loginComponent />` (lowercase) is treated by React as an unknown DOM element, not a component — the login form never rendered                                         | Renamed to `<LoginComponent />`               |
| `components/AuthLayout.jsx` | `authStatus === undefined` check was dead code — Redux `initialState` sets `status: false`, never `undefined`, so the loading branch was unreachable                    | Removed; replaced with correct boolean guards |
| `components/index.js`       | Import paths used old subdirectory structure (`Header/Header`, `container/Container`, `post-form/PostForm`) that no longer matched the refactored flat component layout | Updated all paths to flat structure           |

---

## 🎨 Design System

### Typography

| Role               | Font               | Usage                                               |
| ------------------ | ------------------ | --------------------------------------------------- |
| Display / Headings | Fraunces (serif)   | Post titles, page headings, auth headings, wordmark |
| Body / UI          | Inter (sans-serif) | Nav, labels, body text, buttons, meta               |
| Mono               | System monospace   | Read time, dates, bylines, code blocks              |

### Colour Palette

| Token        | Hex       | Usage                                     |
| ------------ | --------- | ----------------------------------------- |
| `paper`      | `#FAF6EF` | Page background                           |
| `paper-dim`  | `#F2ECDE` | Cards, sidebar, input backgrounds         |
| `ink`        | `#1F1B16` | Primary headings and text                 |
| `ink-soft`   | `#4A4339` | Body copy                                 |
| `clay`       | `#8B6F5C` | Meta text, placeholders, footer links     |
| `rule`       | `#E4DCC8` | All borders and dividers                  |
| `terracotta` | `#C1502E` | Primary accent — CTAs, links, hover spine |
| `sage`       | `#5B7B5A` | Success state, "Update" button            |

### The Terracotta Spine

Every post card carries a `2px` left border (`border-rule`) that animates to `border-terracotta` on hover — the same terracotta used for blockquote markers in the editor and links in the reading view. This one repeating motif, like a manuscript annotation mark, is the visual signature of the Blogify design system.

---

## 📦 Available Scripts

```bash
npm run dev       # Start local development server at http://localhost:5173
npm run build     # Production build → output in dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add your `.env` variables in the Vercel dashboard:
**Project → Settings → Environment Variables**

### Netlify

```bash
npm run build
```

Drag and drop the `dist/` folder to Netlify, or connect your GitHub repo for automatic deploys.
Add environment variables under **Site → Site configuration → Environment variables**.

> **Important:** After deploying, go to your Appwrite Console → **Project → Overview → Platforms** and add your production domain to the allowed Web Platforms list. Without this, Appwrite will block all requests from your live URL with a CORS error.

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

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

<div align="center">

Made with ❤️ using React & Appwrite

</div>
