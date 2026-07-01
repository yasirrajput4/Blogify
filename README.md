# Blogify

A clean, editorial blogging platform built with React and Appwrite. Write, publish, and read stories in a distraction-free environment designed around the reading experience.

---

## Live Preview

> Deploy to Vercel or Netlify — see [Deployment](#deployment) below.

---

## Tech Stack

| Layer                | Technology                         |
| -------------------- | ---------------------------------- |
| Frontend             | React 18 (Vite)                    |
| Styling              | Tailwind CSS                       |
| Backend-as-a-Service | Appwrite (Auth, Database, Storage) |
| State Management     | Redux Toolkit                      |
| Form Handling        | React Hook Form                    |
| Rich Text Editor     | TinyMCE (`@tinymce/tinymce-react`) |
| HTML Parsing         | `html-react-parser`                |
| Routing              | React Router v6                    |

---

## Project Structure

```
src/
├── appwrite/
│   ├── auth.js          # AuthService — account create, login, logout, getCurrentUser
│   └── config.js        # Service — posts CRUD + file upload/delete/preview
│
├── components/
│   ├── index.js         # Barrel export — import any component from here
│   ├── AuthLayout.jsx   # Route guard (authentication prop switches protect/redirect)
│   ├── Button.jsx
│   ├── Container.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Input.jsx
│   ├── Login.jsx
│   ├── Logo.jsx
│   ├── LogoutBtn.jsx
│   ├── PostCard.jsx
│   ├── PostForm.jsx     # Create + Edit form (shared, driven by `post` prop)
│   ├── RTE.jsx          # TinyMCE rich text editor wrapped with react-hook-form Controller
│   ├── Select.jsx
│   └── Signup.jsx
│
├── conf/
│   └── conf.js          # Environment variable config (create this — see Setup)
│
├── pages/
│   ├── AddPost.jsx
│   ├── AllPosts.jsx
│   ├── EditPost.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Post.jsx         # Single post reading page
│   └── Signup.jsx
│
├── store/
│   ├── authSlice.js     # Redux slice — status (bool) + userData
│   └── store.js         # Redux store config
│
├── App.jsx              # Root layout — auth session check on mount
├── main.jsx             # Entry point — router + Redux Provider setup
├── index.css            # Tailwind directives + editorial base styles + .browser-css prose
└── index.html           # Google Fonts (Fraunces + Inter) loaded here
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- An [Appwrite](https://appwrite.io) account (Cloud or self-hosted)
- A TinyMCE API key (free at [tiny.cloud](https://www.tiny.cloud))

### 1. Clone the repository

```bash
git clone https://github.com/your-username/blogify.git
cd blogify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a file at `src/conf/conf.js`:

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

Then create a `.env` file in the project root:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

> **Never commit `.env` to version control.** It is already in `.gitignore` if you used Vite's default scaffold.

### 4. Set up Appwrite

In your Appwrite console:

**Database collection** — create a collection with these attributes:

| Attribute       | Type               | Required |
| --------------- | ------------------ | -------- |
| `title`         | String (255)       | ✅       |
| `content`       | String (unlimited) | ✅       |
| `featuredImage` | String (255)       | ✅       |
| `status`        | String (20)        | ✅       |
| `userId`        | String (255)       | ✅       |

**Collection permissions** — set `Any` read for public posts, and document-level security for write/update/delete so only the author can modify their own posts.

**Storage bucket** — create a bucket for featured images. Set file size limit and allowed MIME types (`image/jpeg`, `image/png`, `image/gif`, `image/webp`).

### 5. Add Tailwind design tokens

Open `tailwind.config.js` and merge in `tailwind.config.snippet.js` (provided in the output files) under `theme.extend`. This adds the editorial color palette (`paper`, `ink`, `terracotta`, `clay`, `rule`, `sage`) that all components reference.

```js
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF6EF",
        "paper-dim": "#F2ECDE",
        ink: "#1F1B16",
        "ink-soft": "#4A4339",
        clay: "#8B6F5C",
        rule: "#E4DCC8",
        terracotta: "#C1502E",
        "terracotta-dark": "#A23F22",
        sage: "#5B7B5A",
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

### 6. Run the development server

```bash
npm run dev
```

---

## Features

### Core (CRUD)

- ✅ Create, read, update, and delete blog posts
- ✅ Featured image upload and preview via Appwrite Storage
- ✅ Post status (`active` / `inactive`) to draft or publish
- ✅ Auto-generated URL slug from the post title
- ✅ Author-only edit/delete controls on the post page

### Authentication

- ✅ Email + password signup and login via Appwrite Auth
- ✅ Session persistence across page refreshes
- ✅ Route guards — protected routes redirect to `/login`, auth-only routes (login/signup) redirect logged-in users to `/`
- ✅ Sign out (clears all sessions)

### UI / UX

- ✅ Editorial design system — Fraunces serif display, Inter body, warm paper palette
- ✅ Sticky header with backdrop blur and active route highlighting
- ✅ Shimmer skeleton loaders on Home, AllPosts, EditPost, and Post pages
- ✅ Polished empty states for unauthenticated and zero-post cases
- ✅ Disabled + loading states on all submit buttons (`isSubmitting` from React Hook Form)
- ✅ Branded wordmark pulse on the initial auth-check load
- ✅ Consistent terracotta "spine" hover effect on all post cards

### Micro-features

- ✅ Live word count + estimated read time in the post editor (PostForm)
- ✅ Read time display on the single post page
- ✅ Copy-link-to-clipboard button on the post page
- ✅ TinyMCE editor content styled to match the reading-page typography (WYSIWYG)
- ✅ Keyboard focus ring on all interactive elements (accessibility)
- ✅ `prefers-reduced-motion` respected via global CSS override

---

## Routes

| Path               | Page                       | Auth required                       |
| ------------------ | -------------------------- | ----------------------------------- |
| `/`                | Home — latest active posts | No (shows CTA if logged out)        |
| `/login`           | Login                      | Redirects home if already logged in |
| `/signup`          | Signup                     | Redirects home if already logged in |
| `/all-posts`       | All posts grid             | ✅ Yes                              |
| `/add-post`        | Post editor (create)       | ✅ Yes                              |
| `/edit-post/:slug` | Post editor (edit)         | ✅ Yes                              |
| `/post/:slug`      | Single post reading view   | No                                  |

---

## Key Design Decisions

### Why Fraunces?

Fraunces is a variable serif with a warm, slightly quirky personality — it reads as editorial and intentional rather than generic. Paired with Inter (neutral workhorse) it creates the classic magazine split: a characterful display face against a quiet body face.

### The terracotta "spine"

Every PostCard has a 2px left border that transitions from warm grey to terracotta on hover. The same terracotta appears in blockquotes in the editor and on the post reading page. It's one repeating motif — like a margin annotation mark — that ties the whole app together visually.

### `.browser-css` class

TinyMCE outputs raw HTML. The `.browser-css` class in `index.css` applies full prose typography (line-height, paragraph spacing, heading hierarchy, link styles, blockquote treatment) to that parsed output — scoped to the Post page only so it never leaks into UI chrome. The editor's `content_style` mirrors these same rules so the writing experience matches the reading experience.

---

## Bugs Fixed During Refactor

| File                        | Bug                                                                                               | Fix                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `auth.js`                   | `createEmailSession()` deprecated/removed in Appwrite v1.5+                                       | Changed to `createEmailPasswordSession()`           |
| `pages/AllPosts.jsx`        | `getPosts()` called in render body outside `useEffect` — caused infinite re-fetch loop            | Moved inside `useEffect(fn, [])`                    |
| `pages/Login.jsx` (page)    | `<loginComponent />` — lowercase, treated as unknown DOM element, rendered nothing                | Renamed to `<LoginComponent />`                     |
| `components/AuthLayout.jsx` | `authStatus === undefined` check — dead code, Redux initial state is `false` not `undefined`      | Removed; replaced with clean boolean guards         |
| `components/index.js`       | Import paths referenced old subdirectory structure (`Header/Header`, etc.) that no longer existed | Updated to flat paths matching refactored structure |

---

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Add your `.env` variables in the Vercel dashboard under **Project → Settings → Environment Variables**.

### Netlify

```bash
npm run build
# drag and drop the `dist/` folder into Netlify, or connect the repo
```

Add environment variables under **Site → Site configuration → Environment variables**.

> For both platforms, add the deployed URL to your Appwrite project's **Web Platforms** list (Appwrite Console → Project → Overview → Platforms) to avoid CORS errors.

---

## Scripts

```bash
npm run dev      # start local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview production build locally
npm run lint     # ESLint
```

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

---

## License

MIT — free to use, modify, and distribute.
