# Copilot Instructions for my-website-app

## Project Overview
A React + Vite personal portfolio website for "Rosy dev" with multi-language support (EN/FR/PL), client-side routing, PDF resume viewer, contact form integration, and interactive project demonstrations. Built with modern tooling for fast development and optimized builds.

## Tech Stack
- **Framework**: React 19.2.0 with JSX (functional components + hooks only)
- **Build Tool**: Vite 7.2.4 with HMR (Hot Module Replacement)
- **Routing**: react-router-dom 7.13.0 (`BrowserRouter` wraps entire app in App.jsx)
- **PDF Handling**: react-pdf 10.3.0 + pdfjs-dist 5.4.530 (worker from CDN)
- **External Libraries**: 
  - Fabric.js (loaded via CDN for canvas-based designer in ExtensionSim)
  - JSZip 3.10.1 (for order ZIP downloads in ExtensionSim)
- **Linter**: ESLint 9.39.1 (flat config format)
- **Module Type**: ES modules (`"type": "module"` in package.json)

## Core Architecture

### App.jsx - Routing Hub
- Wraps all content in `<Router>` (react-router-dom)
- Routes: `/` (Home), `/projects`, `/projects/:projectId`, `/resume`, `/about`, `/contact`
- Layout: `<Header />` + `<main>` (routes) + `<Footer />` on every page
- Optional: `<RoseCalyxBackground />` component (currently commented out)

### Multi-Language System (Critical Pattern)
**Location**: `src/contexts/LanguageContext.jsx` (provider), `src/contexts/languageContextValue.js` (context creation)
**Hook**: `src/hooks/useLanguage.js` - Returns `{ language, setLanguage, t }`
**Translations**: All text lives in `LanguageContext.jsx` as nested objects: `t.nav.projects`, `t.contact.title`, etc.
**Persistence**: Language saved to localStorage + sets `document.documentElement.lang` for a11y
**Usage Pattern**:
```jsx
import { useLanguage } from '../hooks/useLanguage';
const { t, language } = useLanguage();
return <h1>{t.page.title}</h1>;
```

**Adding New Translations**:
1. Add keys to all three language objects (en/fr/pl) in LanguageContext.jsx
2. Use dot notation to access: `t.section.key`
3. Keep structure consistent across languages

### Theme System
**Implementation**: `ThemeToggle.jsx` component toggles `.dark-theme` class on `<html>` element
**CSS Variables**: Defined in `src/global.css` (`:root` for light, `:root.dark-theme` for dark)
**Key Variables**: `--bg-primary`, `--text-primary`, `--accent-color`, `--border-color`, etc.
**Persistence**: Theme preference stored in localStorage

### Styling Architecture
- **Global styles**: `src/global.css` (imported in `src/main.jsx`) contains tokens, resets, base element styles, shared layout primitives, and shared utility classes (e.g. `.icon`)
- **Component/page styles**: Keep feature-specific selectors in local CSS files (`Header.css`, `Footer.css`, `ThemeToggle.css`, `LanguageSelector.css`, page CSS files)
- **Icon sizing pattern**: Use global variable `--emoji-icon-size` + shared `.icon` class; combine with local classes for layout (`className="feature-icon icon"`)

### Styling Guardrails (Do / Don't)
- **Do** keep app-wide tokens, resets, and shared utilities in `src/global.css`
- **Do** keep Header/Footer/ThemeToggle/LanguageSelector styles in their own component CSS files
- **Do** apply icon sizing through `.icon` + `--emoji-icon-size` (avoid per-page icon font-size declarations)
- **Do** scope page-specific selectors under the page's parent class (e.g. `.projects-page .features-grid`) to avoid cross-page CSS conflicts (see below)
- **Don't** add component-specific selectors (header/footer/theme/lang/page-only rules) to `src/global.css`
- **Don't** reintroduce `src/index.css`; use `src/global.css` as the only global stylesheet
- **Don't** use bare class selectors (e.g. `.features-grid`) in page CSS files — always scope under the page's parent class

### Vite CSS Scoping (Critical)
Vite loads all imported CSS files into a single global scope regardless of which component imports them. This means a selector like `.features-grid` in `Stardust.css` and the same selector in `WoocommerceExtension.css` will conflict — whichever loads last wins.
**Solution**: Always scope page-level selectors under the page's unique parent class:
- Stardust: `.projects-page .features-grid { ... }`
- WooCommerce: `.woocommerce-extension-page .features-grid { ... }`
This prevents cross-page style collisions without needing CSS Modules or other tooling.

### Static Data Utilities
**ContactInfo** (`src/utils/contactInfo.js`): Singleton class with private static fields
- Stores email, GitHub, LinkedIn URLs
- Access via static getters: `ContactInfo.getEmail()`, `ContactInfo.getGithub()`
- Used in ContactForm and Contact page to centralize contact info

### Resume System
**Component**: `src/pages/Resume.jsx`
**PDF.js Worker**: Loaded from CDN in component: `//unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`
**Language-Specific Resumes**: Maps language code to PDF path:
```jsx
const resumeFiles = { en: '/resumes/rg_resume_eng.pdf', fr: '/resumes/rg_resume_fr.pdf', pl: '/resumes/rg_resume_pl.pdf' };
```
**File Location**: PDFs stored in `public/resumes/` (served at root)
**Download Feature**: Creates dynamic `<a>` element with `download` attribute

### Project Demos
**ExtensionSim** (`src/components/ExtensionSim.jsx`): WooCommerce extension simulator
- **Fabric.js Canvas**: Initialized via `window.initFabricCanvas()` from `src/utils/designer.js`
- **Three Views**: Admin setup, buyer designer, order viewer
- **LocalStorage**: Persists setup (`wc_admin_setup`) and orders (`wc_orders`)
- **ZIP Export**: Uses JSZip to bundle product image + canvas JSON + preview image
- **Designer.js**: IIFE module with Fabric.js utilities (text/image adding, canvas export, object constraints)

**Projects Page**: Displays grid of project cards as `<Link>` to `/projects/:id` routes

## Directory Structure
```
src/
├── components/     # Reusable UI (Header, Footer, ContactForm, ThemeToggle, LanguageSelector, ExtensionSim, RoseCalyxBackground)
├── pages/          # Route components (Home, AboutMe, Projects, Contact, Resume, SimpleGame, Stardust, WoocommerceExtension, ANPRSystem)
├── contexts/       # LanguageContext provider + context creation
├── hooks/          # useLanguage.js (custom hook for translations)
├── utils/          # contactInfo.js (singleton), designer.js (Fabric.js utilities)
├── assets/         # logos/ (logo.avif), pictures/ (static images)
public/
├── resumes/        # Language-specific PDF files
```

## Build & Development Workflow

### Commands
- `npm run dev` - Vite dev server at http://localhost:5173 (HMR enabled)
- `npm run build` - Production build to `dist/`
- `npm run preview` - Test production build locally
- `npm run lint` - ESLint check (all `.js` and `.jsx` files)

### Key Patterns
1. **Routing**: Use `<Link to="/path">` from react-router-dom, never `<a href>`
2. **Component Exports**: Always `export default` function components
3. **CSS Ownership**: Keep styles in the closest component/page CSS file; keep only app-wide tokens/base rules in `src/global.css`
4. **Asset Imports**: `import logo from '../assets/logos/logo.avif'` (Vite handles bundling)
5. **Public Assets**: Files in `public/` served at root (e.g., `/resumes/file.pdf`)
6. **No Class Components**: Use functional components with hooks only

## Common Tasks

### Adding a New Route
1. Create page component in `src/pages/MyPage.jsx`
2. Add route to `App.jsx`: `<Route path="/my-page" element={<MyPage />} />`
3. Add nav link to `Header.jsx` if needed (use `t.nav.myPage` for translation)

### Adding Translations
1. Open `src/contexts/LanguageContext.jsx`
2. Add same key to `en`, `fr`, and `pl` objects (e.g., `pages: { myPage: { title: "..." } }`)
3. Access via `t.pages.myPage.title` in components

### Working with ContactInfo
- Import: `import ContactInfo from '../utils/contactInfo';`
- Use: `const email = ContactInfo.getEmail();`
- Update values: Edit private static fields in `contactInfo.js`

### Styling with Theme Variables
- Define new colors in `src/global.css` (`:root` and `:root.dark-theme`)
- Use in component CSS: `color: var(--text-primary);`
- Theme switch automatically updates all components

## Critical Integration Points

### PDF.js Configuration
- Worker must be set before rendering `<Document>`: `pdfjs.GlobalWorkerOptions.workerSrc = ...`
- Import CSS layers: `'react-pdf/dist/Page/AnnotationLayer.css'` and `'react-pdf/dist/Page/TextLayer.css'`

### Fabric.js Canvas (ExtensionSim)
- Load Fabric.js via CDN in `index.html` or component (not bundled)
- Initialize via `window.initFabricCanvas(canvasId, options)` from `designer.js`
- Store canvas reference in `useRef(null)` to persist across re-renders

### LocalStorage Keys
- `language` - Current language code (en/fr/pl)
- `theme` - Dark/light theme preference
- `wc_admin_setup` - ExtensionSim admin configuration
- `wc_orders` - ExtensionSim order history

## ESLint & Code Quality
- **Config**: `eslint.config.js` (ESLint 9 flat format)
- **Rules**: `@eslint/js` recommended + `react-hooks` + `react-refresh`
- **Ignored**: `dist/` folder
- Run before committing: `npm run lint`
