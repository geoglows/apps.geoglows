import { ICONS } from "./icons.js";

/* The GEO token layer keys off data-theme on <html> (see src/styles/tokens.css).
   index.html stamps the attribute inline before first paint; these helpers keep
   it and localStorage in sync afterwards. */

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function initTheme() {
  const stored = localStorage.getItem("theme");
  const dark =
    stored === "dark" ||
    (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

export function toggleTheme() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon();
}

export function updateThemeIcon() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  btn.innerHTML = currentTheme() === "dark" ? ICONS.sun : ICONS.moon;
}
