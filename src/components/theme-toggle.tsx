"use client";

type Theme = "light" | "dark";

const STORAGE_KEY = "teknamin-theme";

function getResolvedTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export default function ThemeToggle() {
  const onToggleTheme = () => {
    const current = getResolvedTheme();
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      Theme
    </button>
  );
}
