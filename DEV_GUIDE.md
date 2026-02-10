# 🚀 DARYL Web - Local Dev Environment

## Status: ✅ READY

**Project**: daryl-md-project  
**Location**: `c:\Users\bural\daryl-web-local`  
**Setup Date**: 2026-02-10  
**TypeScript Check**: ✅ PASSED

---

## Quick Commands

```powershell
# Navigate to project
cd c:\Users\bural\daryl-web-local

# 1. Type checking (always do this first)
npm run check

# 2. Start dev server
$env:NODE_ENV='development'; npx tsx server/index.ts

# 3. Build for production
npm run build

# 4. Run production build
npm start

# 5. Type check with watching (if available)
npm run check -- --watch
```

---

## Server Ports

- **Development Server**: `http://localhost:5000`
  - Frontend: React via Vite (HMR enabled)
  - Backend: Express API
  - Both on same port via express middleware

- **Alternative**: Set `PORT` environment variable
  ```powershell
  $env:PORT=3000; npx tsx server/index.ts
  ```

---

## Architecture Overview

### 🎨 Frontend (`client/src/`)
- React 18 + Vite + TailwindCSS
- Components: Shadcn UI (Radix primitives)
- Pages: Home, Vision, Products, Agents, Roadmap, Universe, Contact, Legal
- i18n: EN/FR (React Context)
- Theme: Dark mode default + toggle
- Animations: Framer Motion
- Routing: Wouter (lightweight)

### ⚙️ Backend (`server/`)
- Express.js 5.0
- Single route: `POST /api/contact` (form submission)
- Static file serving
- Vite middleware integration (dev mode)

### 📦 Shared (`shared/`)
- Zod schema validation
- `contactFormSchema` for form validation

---

## Development Workflow

### 1️⃣ Setup
```powershell
cd c:\Users\bural\daryl-web-local
npm install --legacy-peer-deps
npm run check
```

### 2️⃣ Make Changes
- Edit `client/src/` files (hot reload enabled)
- Edit `server/` files (restart required)
- Edit `shared/schema.ts` (rebuild required)

### 3️⃣ Test Locally
```powershell
# Terminal 1: Start dev server
$env:NODE_ENV='development'; npx tsx server/index.ts

# Terminal 2: Open browser
Start-Process http://localhost:5000
```

### 4️⃣ Validate
```powershell
npm run check  # Type checking
npm run build  # Production build test
npm start      # Run production build
```

### 5️⃣ Deploy
```powershell
git add .
git commit -m "Your changes"
git push origin main  # Push to GitHub
# Replit auto-deploys on push
```

---

## File Structure

```
c:\Users\bural\daryl-web-local\
├── client/                      # Frontend (React)
│   └── src/
│       ├── components/
│       │   ├── Layout.tsx       # Main wrapper
│       │   ├── Header.tsx       # Top nav
│       │   ├── Footer.tsx       # Bottom nav
│       │   └── ui/              # Shadcn components
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── Vision.tsx
│       │   ├── Products.tsx
│       │   ├── Agents.tsx
│       │   ├── Roadmap.tsx
│       │   ├── Universe.tsx
│       │   ├── Contact.tsx
│       │   └── Legal/*
│       ├── lib/
│       │   ├── i18n.tsx         # i18n context
│       │   ├── theme.tsx        # Theme context
│       │   ├── translations/
│       │   │   ├── en.ts
│       │   │   └── fr.ts
│       │   └── queryClient.ts
│       ├── App.tsx              # Root router
│       └── main.tsx             # Entry point
├── server/                      # Backend (Express)
│   ├── index.ts                 # App setup
│   ├── routes.ts                # API routes
│   ├── vite.ts                  # Vite integration
│   └── static.ts                # Static serving
├── shared/                      # Shared code
│   └── schema.ts                # Zod schemas
├── vite.config.ts               # Vite config
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
└── LOCAL_SETUP.md               # Setup guide
```

---

## Key Technologies

| Layer | Tech | Version |
|-------|------|---------|
| **Frontend** | React | 18.3 |
| | Vite | 7.3 |
| | TailwindCSS | 3.4 |
| | Framer Motion | 11.18 |
| | Shadcn UI | latest |
| | Wouter | 3.3 |
| **Backend** | Express | 5.0 |
| | TypeScript | 5.6 |
| | tsx | 4.20 |
| **Database** | Drizzle ORM | 0.39 (configured, not used) |
| **Validation** | Zod | 3.24 |
| **State** | TanStack Query | 5.60 |

---

## Innovation Areas

### 📋 To Explore
- [ ] Add analytics (Plausible? PostHog?)
- [ ] Contact form persistence (currently in-memory)
- [ ] Blog/changelog section
- [ ] Product demo/video integration
- [ ] User testimonials carousel
- [ ] Performance optimization (PageSpeed Insights)
- [ ] SEO enhancements (meta tags, schemas)
- [ ] Dark mode variations (true black? accent colors?)
- [ ] Mobile menu animations
- [ ] Accessibility audit (WCAG 2.1)

### 🔍 Analysis Tasks
1. Lighthouse scores (performance, accessibility, SEO)
2. Mobile responsiveness check (iOS + Android)
3. i18n completeness (EN/FR parity)
4. Font loading optimization
5. Image optimization
6. CSS purging effectiveness
7. Build size analysis

---

## Troubleshooting

### Port already in use
```powershell
# Use different port
$env:PORT=3001; npx tsx server/index.ts
```

### Module not found
```powershell
# Reinstall dependencies
rm node_modules
rm package-lock.json
npm install --legacy-peer-deps
npm run check
```

### TypeScript errors
```powershell
# Check types
npm run check

# Full output
npm run check 2>&1
```

### Vite middleware issues
- Clear browser cache (Ctrl+Shift+Del)
- Check `@replit/vite-plugin-*` versions
- Restart dev server

---

## Git Workflow

```powershell
# Check status
git status

# Stage changes
git add .

# Commit with message
git commit -m "feat: description of changes"

# Push to GitHub
git push origin main

# View log
git log --oneline -10
```

---

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `NODE_ENV` | `development` | Mode (dev/prod) |
| `PORT` | `5000` | Server port |
| `DATABASE_URL` | (none) | DB connection (optional) |

---

## Performance Checklist

- [ ] Lighthouse score > 90
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms
- [ ] Bundle size < 500KB (gzipped)
- [ ] CSS purged (Tailwind)
- [ ] Images optimized
- [ ] Fonts optimized (WOFF2)

---

## Next Steps

1. ✅ Local environment setup
2. ✅ Dependencies installed
3. ✅ TypeScript validation
4. ⏭️ Start dev server (`$env:NODE_ENV='development'; npx tsx server/index.ts`)
5. ⏭️ Open http://localhost:5000 in browser
6. ⏭️ Make changes and test
7. ⏭️ Commit and push to GitHub
8. ⏭️ Verify deployment on daryl.md

---

**Last Updated**: 2026-02-10  
**Status**: Ready for development  
**Maintainer**: @buralux
