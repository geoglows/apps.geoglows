import {hydrateIcons} from "./icons.js";

hydrateIcons();

document.getElementById("theme-toggle")?.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
  }
});

// Supabase is ~210 kB, by far the heaviest thing on the site. Load it only on
// the pages that have an auth control, so /terms never pays for it.
if (document.getElementById("authActionSlot")) {
  import("./auth.js").then((auth) => auth.start());
}

// The home page's app library is generated from apps.json. Load the
// renderer (and its bundled config) only on the page that has the grid.
if (document.getElementById("appLibrary")) {
  import("./appLibrary.js").then((m) => m.renderAppLibrary());
}
