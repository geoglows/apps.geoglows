/**
 * Reveals each section once as it enters the viewport.
 *
 * Ported from geoglows.org's src/scripts/reveal.ts. The matching styles live in
 * src/style.css under ".reveal-ready .reveal". Because the portal re-renders by
 * replacing #app.innerHTML, every reveal target is a fresh node after a render,
 * so this is called again from renderApp() rather than once at startup.
 */

let observer = null;

export function initReveal() {
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  // Content is visible by default; the class is what opts it into the
  // transition, so a JS failure leaves a fully rendered page.
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    root.classList.remove("reveal-ready");
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  root.classList.add("reveal-ready");

  // The previous observer still holds detached nodes from the last render.
  if (observer) observer.disconnect();

  observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0 },
  );

  targets.forEach((el) => observer.observe(el));
}
