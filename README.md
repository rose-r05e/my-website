# My Website App - Rosy Dev Portfolio

A modern, multi-language personal portfolio website built with React and Vite, featuring a modular component architecture, theme switching, and optimized builds.

## ✨ Features

- **Multi-Language Support** - English, Français, and Polski with Context API
- **Dark/Light Theme** - Toggle between themes with localStorage persistence
- **Modern React** - Built with React 19.2.0 and functional components with hooks
- **Fast Development** - Vite 7.2.4 with Hot Module Replacement (HMR)
- **Responsive Design** - Mobile-first CSS with flexible layouts
- **Modular Architecture** - Clean component structure with separation of concerns
- **Accessibility** - Semantic HTML and proper language attributes

## 🚀 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Linter**: ESLint 9.39.1 with React-specific rules
- **Styling**: Plain CSS with CSS Variables
- **Module Type**: ES Modules

## 📁 Project Structure

```
my-website-app/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── LanguageSelector.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── ContactForm.jsx
│   │   ├── ExtensionSim.jsx
│   │   └── RoseCalyxBackground.jsx
│   ├── pages/             # Page-level components
│   │   ├── Home.jsx
│   │   ├── AboutMe.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Resume.jsx
│   │   ├── SimpleGame.jsx
│   │   ├── Stardust.jsx
│   │   └── WoocommerceExtension.jsx
│   ├── contexts/          # React Context providers
│   │   ├── LanguageContext.jsx
│   │   └── languageContextValue.js
│   ├── hooks/             # Custom React hooks
│   │   └── useLanguage.js
│   ├── utils/             # Utility functions
│   │   ├── contactInfo.js
│   │   └── designer.js
│   ├── assets/            # Static assets
│   │   ├── logos/
│   │   └── pictures/
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static files
│   └── resumes/
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── package.json           # Dependencies and scripts
```

## 🌐 Language System

The app uses React Context API for language management:

1. **LanguageProvider** wraps the entire app in `main.jsx`
2. Components access translations via the `useLanguage()` custom hook
3. Translations are organized by section: `t.nav.*`, `t.main.*`, etc.
4. Selected language persists in localStorage
5. HTML `lang` attribute updates automatically for accessibility

## 🎨 Theme System

- **CSS Variables** for all colors (`--text-primary`, `--bg-primary`, etc.)
- **Dark/Light Toggle** applies `dark-theme` class to `<html>` element
- **localStorage** persists user's theme preference
- All components inherit theme colors automatically

## 🧩 Component Patterns

### Component Structure
- Each component has a companion `.css` file
- Components are functional with hooks (no class components)
- Export as default function component
- Use PascalCase naming convention

### State Management
- **Local State**: `useState` for component-specific UI state
- **Global State**: Context API via custom hooks (`useLanguage`)
- **Props**: Parent-to-child data flow

## 👤 Author

**Rose 🌹**

---

Built with ❤️ using React and Vite
