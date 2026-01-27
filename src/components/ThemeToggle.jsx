import { useState, useEffect } from 'react';
import './ThemeToggle.css';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme ? savedTheme === 'dark' : prefersDark;
    });

    const applyTheme = (dark) => {
        if (dark) {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
    };

    useEffect(() => {
        applyTheme(isDark);
    }, [isDark]);

    const handleToggle = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        applyTheme(newTheme);
    };
    const sunEmoji = '\u2600\uFE0F';
    const moonEmoji = '\uD83C\uDF19';

    return (
        <button className="theme-toggle-btn " onClick={handleToggle}
            title={isDark ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label={isDark ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
            {isDark ? sunEmoji : moonEmoji}
        </button>
    );
}