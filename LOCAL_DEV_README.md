# DARYL Web - Local Development Environment

**Status**: ✅ Ready for Local Innovation & Testing  
**Setup Date**: February 10, 2026  
**Environment**: Windows PowerShell + Node.js  
**Last Updated**: 2026-02-10

---

## 🎯 What You Have

A fully configured local development environment for **daryl.md** - the DARYL intelligence platform website.

### ✅ Configured
- React 18 + Vite + TailwindCSS frontend
- Express.js backend with API routes
- TypeScript with full type checking
- i18n (English/French)
- Dark mode + theme switching
- HMR (hot module reloading)
- Production build pipeline
- All dependencies installed (475 packages)

### ⏳ Ready to Add
- Features and innovations
- Content and pages
- Design refinements
- Performance optimizations
- Analytics integration
- DSM knowledge base integration

---

## 🚀 Quick Start (Choose One)

### Option 1: Using Script
```powershell
cd c:\Users\bural\daryl-web-local
.\start-dev.ps1
```

### Option 2: Manual
```powershell
cd c:\Users\bural\daryl-web-local
npm run check                          # Type checking
$env:NODE_ENV='development'
npx tsx server/index.ts
```

### Option 3: Production Build
```powershell
npm run build
npm start
```

**Result**: Open http://localhost:5000 in your browser

---

## 📖 Documentation

Start with these in order:

1. **[QUICKSTART.md](QUICKSTART.md)** - 2 min read
   - What to do first
   - Quick commands
   - Troubleshooting

2. **[DEV_GUIDE.md](DEV_GUIDE.md)** - 10 min read
   - Full development workflow
   - Architecture overview
   - Key technologies
   - Performance checklist

3. **[PROJECT_ANALYSIS.md](PROJECT_ANALYSIS.md)** - Reference
   - Complete file structure
   - Feature list
   - Quality metrics
   - Implementation ideas

4. **[DSM_INTEGRATION_ROADMAP.md](DSM_INTEGRATION_ROADMAP.md)** - Advanced
   - Integration with local DSM system
   - Future architecture
   - Data flows
   - Implementation phases

---

## 🎨 What You Can Do Today

### Immediate
- [ ] Start dev server
- [ ] Browse the website locally
- [ ] Edit pages and watch HMR
- [ ] Add new content
- [ ] Customize design

### This Week
- [ ] Add new pages
- [ ] Create components
- [ ] Optimize images
- [ ] Performance audit
- [ ] Mobile testing

### This Month
- [ ] Add features
- [ ] Connect contact form
- [ ] Integrate analytics
- [ ] Deploy changes to daryl.md
- [ ] Collect feedback

---

## 🛠️ Common Tasks

### Edit a Page
```typescript
// client/pages/Home.tsx
// Make changes, browser auto-reloads
```

### Add a Translation
```typescript
// client/lib/translations/en.ts & fr.ts
export const en = {
  "key": "English text",
};
```

### Create New Page
```typescript
// 1. Create client/pages/NewPage.tsx
// 2. Add route in client/App.tsx
// 3. Add navigation link in client/components/Header.tsx
```

### Style with TailwindCSS
```tsx
<div className="bg-slate-900 text-white px-8 py-16">
  {/* TailwindCSS classes */}
</div>
```

### Add API Endpoint
```typescript
// server/routes.ts
app.post('/api/new-endpoint', (req, res) => {
  // Handle request
  res.json({ status: 'ok' });
});
```

---

## 📊 Project Structure

```
client/
  └── src/
      ├── components/    (Layout, Header, Footer, UI)
      ├── pages/         (Home, Vision, Products, etc.)
      ├── lib/           (i18n, theme, utilities)
      └── App.tsx        (Router + Providers)

server/
  ├── index.ts          (Express app setup)
  ├── routes.ts         (API endpoints)
  ├── vite.ts           (Dev server setup)
  └── static.ts         (Production serving)

shared/
  └── schema.ts         (Zod validation)

Configuration:
  ├── package.json      (Dependencies)
  ├── vite.config.ts    (Build config)
  ├── tsconfig.json     (TypeScript)
  ├── tailwind.config.ts (TailwindCSS)
  └── drizzle.config.ts (ORM config)
```

---

## 🔧 Tech Stack

| Purpose | Technology | Version |
|---------|-----------|---------|
| Programming | TypeScript | 5.6 |
| Frontend | React | 18.3 |
| Bundler | Vite | 7.3 |
| Styling | TailwindCSS | 3.4 |
| Components | Radix UI | latest |
| Animations | Framer Motion | 11.18 |
| State | TanStack Query | 5.60 |
| Routing | Wouter | 3.3 |
| Backend | Express | 5.0 |
| Validation | Zod | 3.24 |
| Database | Drizzle ORM | 0.39 |

---

## ✨ Key Features

✅ **Dark Mode** - Default dark theme with toggle  
✅ **Responsive** - Mobile-first design  
✅ **Animated** - Framer Motion on hero sections  
✅ **i18n** - Full EN/FR support  
✅ **Fast** - Optimized with Vite + TailwindCSS  
✅ **Validated** - Zod schemas for forms  
✅ **Accessible** - Radix UI components  
✅ **Premium** - Apple-inspired design  

---

## 🚀 Development Workflow

```
1. ✏️  Edit code
2. 🔄 Auto-reload in browser (HMR)
3. ✅ Type check: npm run check
4. 🏗️  Build: npm run build
5. ✔️  Test: npm start
6. 📦 Commit & push
7. 🌐 Auto-deploys to daryl.md
```

---

## 📈 Performance Goals

- **Lighthouse**: > 90
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Bundle**: < 500KB (gzipped)

---

## 🔗 Links

- **Live Site**: https://daryl.md
- **GitHub**: https://github.com/buralux/daryl-md-project
- **GitHub Org**: https://github.com/buralux
- **Contact**: hello@daryl.md

---

## 💾 System Info

- **Node**: Check with `node --version`
- **npm**: 10.8.2+ (11.9.0 available)
- **Packages**: 475 total
- **Vulnerabilities**: 1 moderate (audit fix available)
- **Installation**: Complete ✅

---

## 🆘 Getting Help

**Something not working?**

1. Check [QUICKSTART.md](QUICKSTART.md#troubleshooting)
2. Run `npm run check` for type errors
3. Clear cache: `Remove-Item node_modules -Recurse; npm install`
4. Check console for JavaScript errors (F12)
5. Verify port isn't in use: `netstat -ano | findstr :5000`

---

## 🎓 Next Steps

1. **Now**: Read [QUICKSTART.md](QUICKSTART.md)
2. **Then**: Start dev server
3. **Explore**: Browse the website
4. **Edit**: Try changing a page
5. **Learn**: Read [DEV_GUIDE.md](DEV_GUIDE.md)
6. **Build**: Add your features
7. **Deploy**: Push to GitHub

---

## 🎉 You're Ready!

Everything is set up. Start the dev server and begin innovating.

```powershell
.\start-dev.ps1
# or
$env:NODE_ENV='development'; npx tsx server/index.ts
```

Open: **http://localhost:5000**

Happy coding! 🚀

---

**Created**: 2026-02-10  
**By**: @buralux  
**Status**: Production Ready for Local Development
