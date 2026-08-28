import config from "../../apps.json";
import { ICONS } from "../icons.js";
import { getAppIcon } from "../appIcons.js";
import { getRecentApps } from "../recentApps.js";

const { apps: APPS } = config;
const visibleApps = APPS.filter((a) => !a.hidden && !a.disabled);

function createAppCard(app) {
  const iconSvg = getAppIcon(app.iconName);
  const href = app.type === "external" ? app.url : app.path;
  const target =
    app.type === "external" ? ' target="_blank" rel="noopener noreferrer"' : "";

  return `
    <a href="${href}"${target} data-app-id="${app.id}"
      class="tool-card p-5 md:p-8 flex flex-col group relative overflow-hidden hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta">
      <div class="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        ${ICONS.arrowUpRight}
      </div>
      <div class="mb-5 p-3 bg-wash rounded-xl w-fit group-hover:bg-teal-wash transition-colors ${app.iconClass}">
        ${iconSvg}
      </div>
      <h3 class="font-display text-xl text-ink mb-2 group-hover:text-accent-text transition-colors">
        ${app.name}
      </h3>
      <p class="text-sm text-body leading-relaxed mb-6 grow">
        ${app.description}
      </p>
      <div class="flex flex-wrap gap-2 mt-auto">
        ${app.tags
          .map(
            (tag) => `
          <span class="text-xs text-faint">
            ${tag}
          </span>
        `,
          )
          .join("")}
      </div>
    </a>
  `;
}

function renderRecentApps() {
  const recent = getRecentApps();
  if (!recent.length) return "";
  const recentCards = recent
    .map((r) => visibleApps.find((a) => a.id === r.id))
    .filter(Boolean)
    .map(createAppCard);
  if (!recentCards.length) return "";
  return `
    <section class="mb-12 reveal">
      <p class="eyebrow">Recent</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${recentCards.join("")}
      </div>
    </section>
  `;
}

export function renderAppsGrid() {
  return `
    ${renderRecentApps()}
    <section class="reveal">
      <p class="eyebrow">App library</p>
      <h2 class="section-title">GEOGLOWS applications</h2>
      <p class="mt-3 text-body max-w-2xl">
        Tools for forecasting, groundwater, and water intelligence workflows.
      </p>
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        ${visibleApps.map(createAppCard).join("")}
      </div>
    </section>
  `;
}

export function renderLandingPage() {
  return `
    <section class="block-y reveal">
      <p class="eyebrow">Explore</p>
      <h2 class="section-title">Choose a tool and begin exploring</h2>
      <p class="mt-3 text-body max-w-2xl">
        Every tool is open access. Create an account for personalized features.
      </p>
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        ${visibleApps.map(createAppCard).join("")}
      </div>
    </section>

    <section class="block-y reveal text-center">
      <p class="section-title text-ink">Don't just monitor water.</p>
      <p class="section-title text-accent-text">Understand it.</p>
    </section>
  `;
}
