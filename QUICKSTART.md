# 🎯 DARYL Web Local - Quick Start

## ✅ Setup Complete

```
Location: c:\Users\bural\daryl-web-local
Status:   Ready for local development
Date:     2026-02-10
```

---

## 🚀 Start Here

### 1️⃣ Open PowerShell
```powershell
cd c:\Users\bural\daryl-web-local
```

### 2️⃣ Run Type Check
```powershell
npm run check
```

### 3️⃣ Start Dev Server
```powershell
# Option A: Using script
.\start-dev.ps1

# Option B: Manual command
$env:NODE_ENV='development'; npx tsx server/index.ts
```

### 4️⃣ Open Browser
```
http://localhost:5000
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| [DEV_GUIDE.md](DEV_GUIDE.md) | Full development guide |
| [PROJECT_ANALYSIS.md](PROJECT_ANALYSIS.md) | Architecture & features |
| [DSM_INTEGRATION_ROADMAP.md](DSM_INTEGRATION_ROADMAP.md) | Future integration plans |
| [LOCAL_SETUP.md](LOCAL_SETUP.md) | Initial setup info |

---

## 📋 What's Inside

```
🎨 Frontend (React + Vite)
├── Dark mode UI (Apple-inspired)
├── English/French translations
├── Responsive design
├── Framer Motion animations
└── Shadcn UI components

⚙️ Backend (Express)
├── REST API (/api/contact)
├── Static file serving
├── Vite integration (HMR)
└── Ready for expansion

📦 Tech Stack
├── React 18, Vite 7, TailwindCSS 3
├── TypeScript, Express 5
├── Zod validation, TanStack Query
└── All development tools configured
```

---

## 🔄 Typical Workflow

```
1. Edit client/pages/*.tsx or server/*.ts
2. Browser auto-reloads (HMR enabled)
3. Test functionality
4. npm run check (type checking)
5. npm run build (production test)
6. git commit + push → Auto-deploys to daryl.md
```

---

## 🎨 Key Pages

- **Home** (`/`) - Hero, products, roadmap
- **Vision** (`/vision`) - Philosophy, principles
- **Products** (`/products`) - DaryLab, API, SDK
- **Agents** (`/agents`) - Capabilities showcase
- **Roadmap** (`/roadmap`) - Phases & timeline
- **Universe** (`/universe`) - Origin story
- **Contact** (`/contact`) - Contact form
- **Legal** (`/cookies`, `/privacy`, `/terms`)

---

## 💡 Quick Edits

### Change text
```typescript
// client/pages/Home.tsx
const title = "Your new title";
```

### Add translation
```typescript
// client/lib/translations/en.ts
export const en = {
  "nav.products": "Our Products",
  // ...
};

// client/lib/translations/fr.ts
export const fr = {
  "nav.products": "Nos Produits",
};
```

### Modify styles
```typescript
// client/pages/Home.tsx
<div className="bg-slate-900 text-white px-8 py-16">
```

### Add route
```typescript
// client/App.tsx
<Route path="/new-page" component={NewPage} />
```

---

## 🔧 Maintenance

### Clear cache
```powershell
Remove-Item node_modules -Recurse
npm install --legacy-peer-deps
npm run check
```

### Update dependencies
```powershell
npm update
npm audit fix
```

### Check for issues
```powershell
npm run check    # Type errors
npm audit        # Vulnerabilities
npm run build    # Build errors
```

---

## 🌐 Deployment Flow

```
Local Dev (http://localhost:5000)
         ↓
    git commit
         ↓
    git push (GitHub)
         ↓
  Replit auto-build
         ↓
  https://daryl.md (live)
```

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port busy | `$env:PORT=3001; npx tsx server/index.ts` |
| Module not found | `npm install --legacy-peer-deps` |
| Type errors | `npm run check` for details |
| Browser blank | Check console for errors (F12) |
| Missing translations | Check `client/lib/translations/` |

---

## 📞 Resources

- **GitHub**: https://github.com/buralux/daryl-md-project
- **Live Site**: https://daryl.md
- **Contact**: hello@daryl.md

---

## 🎓 Learning Path

1. **First**: Read this file (you're here!)
2. **Next**: Read [DEV_GUIDE.md](DEV_GUIDE.md)
3. **Then**: Start dev server and explore UI
4. **Finally**: Check [PROJECT_ANALYSIS.md](PROJECT_ANALYSIS.md) for deep dive

---

## ✨ You're All Set!

Go ahead and:
- 🚀 Start the dev server
- 🎨 Explore the UI
- 💻 Try editing a page
- 🧪 Test changes in real-time
- 📚 Read the documentation
- 🚀 Deploy when ready

**Happy coding!** 🎉

---

Last updated: 2026-02-10
