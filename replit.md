# DARYL Website

## Overview
Premium, Apple-inspired website for DARYL - an intelligence layer bridging narrative, AI systems, and autonomous agents. Built with dark mode default, i18n (EN/FR), and Framer Motion animations.

## Architecture
- **Frontend**: React + Vite + TailwindCSS + wouter (routing) + Framer Motion
- **Backend**: Express.js (contact form API only)
- **No database** - static content site with in-memory contact form handling

## Project Structure
```
client/src/
  components/
    Layout.tsx          - Main layout wrapper (Header + main + Footer)
    Header.tsx          - Sticky header with nav, language switcher, theme toggle, mobile menu
    Footer.tsx          - 4-column footer with nav, legal links, email
    Logo.tsx            - Logo placeholder component
    PageHead.tsx        - Per-page SEO (document.title + meta)
    ui/                 - Shadcn components
  pages/
    Home.tsx            - Hero, pillars, products preview, roadmap preview, manifesto
    Vision.tsx          - Principles, flow diagram
    Products.tsx        - Product grid with status badges
    DaryLab.tsx         - Product detail page with use cases, steps, CTA
    Agents.tsx          - Agent capability cards + blockchain section
    Roadmap.tsx         - Vertical timeline with phases
    Universe.tsx        - Storytelling sections (origin, question, today)
    Contact.tsx         - Contact form + email section
    Cookies.tsx         - Cookies policy
    Privacy.tsx         - Privacy notice
    Terms.tsx           - Terms and conditions
  lib/
    i18n.tsx            - Language context, useTranslation hook, LanguageSwitcher
    theme.tsx           - Theme context, useTheme hook, ThemeToggle
    translations/
      en.ts             - English translations (flat dot-notation keys)
      fr.ts             - French translations
    queryClient.ts      - TanStack Query client
    utils.ts            - Utility functions
  App.tsx               - Root component with providers and routing
server/
  routes.ts             - POST /api/contact endpoint
shared/
  schema.ts             - contactFormSchema (zod validation)
```

## Key Decisions
- Dark mode is the default theme
- i18n uses lightweight React context (no external library)
- All text uses translation keys - no hardcoded strings
- Framer Motion for scroll-based reveal animations
- Inter font family for premium Apple-like typography
- No database needed - contact form logs to console

## Routes
- `/` - Home
- `/vision` - Vision
- `/products` - Products
- `/products/darylab` - DaryLab detail
- `/agents` - Agents
- `/roadmap` - Roadmap
- `/universe` - Universe
- `/contact` - Contact
- `/cookies` - Cookies Policy
- `/privacy` - Privacy Notice
- `/terms` - Terms and Conditions

## Recent Changes
- Initial build: complete DARYL website with all pages, i18n, dark mode, animations
