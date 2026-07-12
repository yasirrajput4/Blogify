<div align="center">

<br/>

<h1>
  <img src="https://img.shields.io/badge/📝-Blogify-C1502E?style=for-the-badge&labelColor=1F1B16&color=C1502E" alt="Blogify" />
</h1>

<p><strong>A production-ready, full-stack blogging platform built with React + Appwrite.</strong><br/>
Write beautifully. Publish instantly. Read with intention.</p>

<p>
  <a href="https://blogify-eosin-zeta.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐  Live%20Demo-Open%20App-C1502E?style=flat-square&labelColor=1F1B16" />
  </a>
  &nbsp;&nbsp;
  <a href="https://github.com/yasirrajput4/Blogify/issues">
    <img src="https://img.shields.io/github/issues/yasirrajput4/Blogify?style=flat-square&labelColor=1F1B16&color=E4DCC8" />
  </a>
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/License-MIT-22C55E?style=flat-square&labelColor=1F1B16" />
</p>

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232A" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=1a1a2e" />
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=0f172a" />
  <img src="https://img.shields.io/badge/Appwrite-Cloud-FD366E?style=flat-square&logo=appwrite&logoColor=white&labelColor=1a1a2e" />
  <img src="https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white&labelColor=1a1a2e" />
</p>

<br/>

<a href="https://blogify-eosin-zeta.vercel.app" target="_blank">
  <img
    width="1912"
    alt="Blogify — editorial blogging platform screenshot"
    src="https://github.com/user-attachments/assets/4a38a342-68fb-440c-aca6-9f37667b9999"
    style="border-radius: 12px;"
  />
</a>

<br/>
<sub><i>Click the screenshot to open the live app ↑</i></sub>

<br/><br/>

</div>

---

## What is Blogify?

Blogify is a single-page application that handles the complete lifecycle of a blog post — from account creation and rich-text authoring, through image upload and storage, to public reading — with **zero custom backend code**. Appwrite Cloud handles all server-side concerns: authentication, database, and file storage.

The front end is built around a handcrafted editorial design system — **Fraunces** variable serif for display text, **Inter** for UI chrome, and a warm paper palette that makes long-form content genuinely pleasant to read.

---

## Tech Stack

| Layer       | Technology      | Why                                                                               |
| ----------- | --------------- | --------------------------------------------------------------------------------- |
| **UI**      | React 18 + Vite | Component model + instant HMR in dev, optimised bundles in prod                   |
| **Styling** | Tailwind CSS    | Custom design tokens (`paper`, `ink`, `terracotta`) wired directly into utilities |
| **BaaS**    | Appwrite Cloud  | Auth + Database + Storage — no Express, no Prisma, no deployment config           |
| **State**   | Redux Toolkit   | Predictable global auth state with zero boilerplate                               |
| **Forms**   | React Hook Form | Uncontrolled inputs, schema validation, `isSubmitting` guard out of the box       |
| **Editor**  | TinyMCE         | Battle-tested WYSIWYG; `content_style` mirrors the reading-page prose styles      |
| **Routing** | React Router v6 | Nested layouts, protected route guards, v7 future flags enabled                   |

---

## Feature Highlights

**Core**

- Full post CRUD — create, edit, publish (`active`), draft (`inactive`), delete
- Author-only edit and delete controls rendered inline on the reading page
- Auto-generated URL slug from title with manual override
- Featured image upload, stored in Appwrite Storage, served via `getFileView()`

**Auth**

- Email + password signup and login
- Session persistence — Redux state rehydrated from Appwrite on every mount
- Protected routes redirect unauthenticated users; auth pages redirect logged-in users

**UX Details**

- Shimmer skeleton loaders on every async page — no blank flash, no layout shift
- Live word count and estimated read time, calculated in the editor and shown on the post page
- One-click copy-link-to-clipboard on every post
- `isSubmitting` disabled state on all form buttons — no double-submits
- Keyboard focus rings on every interactive element (WCAG AA)
- `prefers-reduced-motion` respected via a global CSS override

---

## Project Structure

```
Blogify/
├── src/
│   ├── appwrite/        # AuthService (auth) + Service (database, storage)
│   ├── components/      # All UI components + AuthLayout route guard
│   ├── conf/            # conf.js — wraps import.meta.env for type safety
│   ├── pages/           # One component per route
│   ├── store/           # Redux store + authSlice
│   ├── App.jsx          # Root layout — Appwrite session check on mount
│   ├── main.jsx         # Entry point — createBrowserRouter + Provider
│   └── index.css        # Tailwind directives + editorial base + .browser-css prose
│
├── index.html           # HTML shell — Google Fonts (Fraunces + Inter) preloaded
├── .env                 # Local environment secrets — never committed
├── .env.example         # Safe template committed for collaborators
├── tailwind.config.js   # Extended: editorial color palette + font families
└── README.md
```

---

## Getting Started

**Prerequisites:** Node.js ≥ 18 · Appwrite Cloud account · TinyMCE API key (free)

```bash
# Clone and install
git clone https://github.com/yasirrajput4/Blogify.git
cd Blogify
npm install

# Configure secrets
cp .env.example .env
# → fill in your Appwrite + TinyMCE values

# Run
npm run dev
# → http://localhost:5173
```

---

## Environment Variables

```env
VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id"
VITE_APPWRITE_DATABASE_ID="your_database_id"
VITE_APPWRITE_COLLECTION_ID="your_collection_id"
VITE_APPWRITE_BUCKET_ID="your_bucket_id"
VITE_TINYMCE_API_KEY="your_tinymce_api_key"
```

> Variables are consumed in `src/conf/conf.js` and injected at build time via `import.meta.env`. `.env` is already in `.gitignore`.

---

## Appwrite Configuration

**Database collection attributes**

| Attribute       | Type               | Required |
| --------------- | ------------------ | -------- |
| `title`         | String (255)       | ✅       |
| `content`       | String (unlimited) | ✅       |
| `featuredImage` | String (255)       | ✅       |
| `status`        | String (20)        | ✅       |
| `userId`        | String (255)       | ✅       |

**Collection permissions** — `Any` → Read · `Users` → Create, Read, Update, Delete

**Bucket permissions** — `Users` → Create, Read, Update, Delete

> `getFileView()` is used instead of `getFilePreview()` — public bucket read is not required.

**Web platforms** — register `http://localhost:5173` and your production domain under **Project → Platforms → Web** to prevent CORS errors.

---

## Routes

| Path               | Page                          | Auth                            |
| ------------------ | ----------------------------- | ------------------------------- |
| `/`                | Home — latest published posts | Public                          |
| `/login`           | Login                         | Redirects home if authenticated |
| `/signup`          | Signup                        | Redirects home if authenticated |
| `/all-posts`       | All posts grid                | Protected                       |
| `/add-post`        | Post editor — create          | Protected                       |
| `/edit-post/:slug` | Post editor — edit            | Protected                       |
| `/post/:slug`      | Post reading page             | Public                          |

---

## Scripts

```bash
npm run dev      # Dev server → http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Serve production build locally
npm run lint     # ESLint
```

---

## Contributing

Issues and pull requests are welcome.

```bash
git checkout -b feat/your-feature
git commit -m "feat: describe your change"
git push origin feat/your-feature
# open a Pull Request
```

Follow [Conventional Commits](https://www.conventionalcommits.org/).

---

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

<br/>

Built by [Yasir Rajput](https://github.com/yasirrajput4)

<br/>

<sub>If this project was useful, a ⭐ goes a long way.</sub>

</div>
