# DARYL Web Local Development Setup

**Date**: 2026-02-10  
**Status**: ✅ Ready for Local Development

## Quick Start

```powershell
cd c:\Users\bural\daryl-web-local

# Development mode (hot reload)
npm run dev

# Type checking
npm run check

# Build for production
npm run build

# Run production build locally
npm start
```

## Architecture

### Frontend (React + Vite)
- **Location**: `client/src/`
- **Port**: 5173 (default Vite)
- **Pages**: Home, Vision, Products, Agents, Roadmap, Universe, Contact
- **Styling**: TailwindCSS + Shadcn UI components
- **i18n**: EN/FR via React Context (lightweight)
- **Animations**: Framer Motion
- **Theme**: Dark mode default + toggle

### Backend (Express.js)
- **Location**: `server/`
- **Port**: 3000
- **Purpose**: Minimal API (contact form only)
- **ORM**: Drizzle (configured but not used currently - static site)

### Shared
- **Schema**: Zod validation (contactFormSchema)

## Development Workflow

1. **Make changes** to `client/src/` or `server/`
2. **Test locally** with hot reload
3. **Type check**: `npm run check`
4. **Build**: `npm run build` → outputs to `dist/`
5. **Test production build**: `npm start`
6. **Commit & Push** when ready
7. **Deploy** to daryl.md

## File Structure

```
client/src/
  ├── components/
  │   ├── Layout.tsx       (Header + Footer wrapper)
  │   ├── Header.tsx       (Nav, language, theme toggle)
  │   ├── Footer.tsx       (4-column footer)
  │   └── ui/              (Shadcn components)
  ├── pages/
  │   ├── Home.tsx
  │   ├── Vision.tsx
  │   ├── Products.tsx
  │   ├── Agents.tsx
  │   ├── Roadmap.tsx
  │   ├── Universe.tsx
  │   ├── Contact.tsx
  │   └── Legal (Cookies, Privacy, Terms)
  ├── lib/
  │   ├── i18n.tsx         (Language context + translations)
  │   ├── theme.tsx        (Theme context)
  │   └── translations/
  │       ├── en.ts
  │       └── fr.ts
  └── App.tsx              (Router + Providers)

server/
  └── routes.ts            (POST /api/contact)

shared/
  └── schema.ts            (Zod schemas)
```

## Key Features

- ✅ Dark mode default
- ✅ i18n (EN/FR)
- ✅ Premium UI (Apple-inspired)
- ✅ Responsive design (mobile-first with wouter routing)
- ✅ Framer Motion animations
- ✅ Contact form with validation

## Innovation & Analysis Notes

### Potential Improvements:
- [ ] Add analytics (Plausible? PostHog?)
- [ ] Contact form persistence (currently in-memory)
- [ ] API for dynamic content
- [ ] Blog/changelog section
- [ ] User authentication (Stack Auth integration?)
- [ ] Product demo scripts/videos

### Testing:
- Visual design validation
- i18n completeness check
- Performance metrics
- Mobile responsiveness
- Accessibility audit

### Next Steps:
1. Local development and UI refinement
2. Add features/pages as needed
3. Performance optimization
4. Deploy to daryl.md when ready

## Environment

- Node.js: Check with `node --version`
- npm: 11.9.0 (update available)
- Vulnerabilities: 1 moderate (run `npm audit fix` if needed)

---

**Workflow**: Local Dev → Test → Build → Deploy to daryl.md
