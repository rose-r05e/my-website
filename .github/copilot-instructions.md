# Copilot Instructions for my-website-app

## Project Overview
A React + Vite personal portfolio website for "Rosy dev" with multi-language support and modular component architecture. Built with modern tooling for fast development and optimized builds.

## Tech Stack
- **Framework**: React 19.2.0 with JSX
- **Build Tool**: Vite 7.2.4 with HMR (Hot Module Replacement)
- **Bundler**: Vite (configured in `vite.config.js`)
- **Linter**: ESLint 9.39.1 with React-specific rules
- **Node Modules Type**: ES modules (`"type": "module"` in package.json)

## Core Architecture

### Component Structure
- **App.jsx**: Root component; uses `useLanguage` hook for translations; displays main content with counter demo
- **Header.jsx**: Navigation header with site branding, nav links using translated text via `useLanguage`, and utility nav (ThemeToggle, LanguageSelector)
- **LanguageSelector.jsx**: Dropdown for switching between English, Français, Polski; calls `setLanguage()` from Context to update global language
- **ThemeToggle.jsx**: Button component for dark/light theme switching; stores preference in localStorage and applies `dark-theme` class to `<html>`
- **CSS Files**: Each component has a companion `.css` file using CSS variables (`--text-primary`, `--bg-primary`, etc.)

### Language Context System
- **Location**: `src/contexts/` (LanguageContext.jsx provider, languageContextValue.js context creation)
- **Hook**: `src/hooks/useLanguage.js` - Custom hook to access language context
- **Translations**: Defined in LanguageProvider with structure `t.nav.*` and `t.main.*`
- **Usage**: Import `useLanguage` hook in any component; destructure `{ language, setLanguage, t }` where `t` is current translation object
- **Persistence**: Selected language saved to localStorage and HTML `lang` attribute updated for accessibility

### Directory Layout
- `src/components/` - React components (Header, LanguageSelector, ThemeToggle)
- `src/contexts/` - React Context API (LanguageContext provider and context creation)
- `src/hooks/` - Custom React hooks (useLanguage.js)
- `src/assets/` - Static assets (logo.avif)
- `src/pages/` - Reserved for page-level components
- `src/utils/` - Reserved for utility functions
- `public/` - Static files served at root

## Build & Development Workflow

### Scripts
- **`npm run dev`** - Start Vite dev server with HMR (localhost:5173 by default)
- **`npm run build`** - Production build to `dist/` folder
- **`npm run lint`** - Run ESLint across all `.js` and `.jsx` files
- **`npm run preview`** - Preview production build locally

### Key Patterns
1. **Component Naming**: PascalCase (Header, LanguageSelector); export as default
2. **CSS Organization**: One-to-one component:CSS mapping; all colors use CSS variables for theme support
3. **State Management**: Use `useState` for local state; `useLanguage` hook for global language
4. **Asset Imports**: Import static assets directly in JSX (e.g., `import siteLogo from '../assets/logo.avif'`)
5. **Context Setup**: Wrap App in `<LanguageProvider>` at root level (done in main.jsx)

## ESLint Configuration
- **Config File**: `eslint.config.js` (flat config format, ESLint 9)
- **Enabled Rules**: 
  - `@eslint/js` recommended
  - `eslint-plugin-react-hooks` for hooks rules
  - `eslint-plugin-react-refresh` for Vite refresh validation
  - Browser globals enabled
- **Ignored**: `dist/` folder

## Component Communication
- **Props-based**: Components receive props from parents (Header receives no props; LanguageSelector is self-contained)
- **Context API**: LanguageProvider wraps entire app; components access language data via `useLanguage()` hook
- **Local State**: Each component manages its own UI state (e.g., `isLangOpen` in LanguageSelector, `isDark` in ThemeToggle)
- **Theme CSS Variables**: All colors defined at root level; switching `dark-theme` class applies theme globally

## Styling Approach
- **CSS Files**: Plain CSS (not CSS-in-JS, Tailwind, or SCSS)
- **Global Styles**: `index.css` (imported in `main.jsx`)
- **Component Styles**: Scoped to component via class selectors
- **Layout Pattern**: Container-based grid/flex layout (see Header.css for example)

## Common Tasks

### Adding a New Component
1. Create `.jsx` file in `src/components/`
2. Create companion `.css` file for styles
3. Export as default function component
4. Import and use in parent component

### Adding a Page
1. Create component in `src/pages/`
2. Update routing logic when routing is implemented (currently no router)

### Running Development
```bash
npm run dev  # Starts dev server with HMR
```
Access at http://localhost:5173

### Building for Production
```bash
npm run build  # Creates optimized dist/ folder
npm run preview  # Test production build locally
```

## Future Expansion Points
- **Routing**: Pages folder prepared; consider `react-router` when adding multiple pages
- **State Management**: Context API is now in place for language; can be extended for other global states
- **Additional Languages**: Add new language objects to translations in LanguageProvider, then add flag option to LanguageSelector
- **TypeScript**: Consider migrating when project complexity increases (TS template available in Vite)

## Notes for AI Agents
- HMR is enabled; code changes reflect instantly in browser during development
- All components use functional components with hooks; no class components
- CSS is scoped per component by class naming conventions, not CSS modules
- The project is still in early stages with empty `hooks/`, `pages/`, and `utils/` directories
