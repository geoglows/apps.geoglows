import config from "../../apps.json";

const { apps: APPS } = config;
const visibleApps = APPS.filter((a) => !a.hidden && !a.disabled);

// Legal pages live on geoglows.org; the portal has none of its own.
const LEGAL = [
  { label: "Privacy", href: "https://www.geoglows.org/legal/privacy-policy" },
  { label: "Terms", href: "https://www.geoglows.org/legal/terms-of-service" },
  { label: "Cookies", href: "https://www.geoglows.org/legal/cookie-policy" },
];

const EXPLORE = [
  { label: "What we do", href: "https://www.geoglows.org/what-we-do" },
  { label: "Impact", href: "https://www.geoglows.org/impact" },
  { label: "Publications", href: "https://www.geoglows.org/publications" },
  { label: "Videos & webinars", href: "https://www.geoglows.org/videos" },
];

const COMMUNITY = [
  { label: "Partners", href: "https://www.geoglows.org/community#partners" },
  { label: "News & events", href: "https://www.geoglows.org/community#news" },
  { label: "Training", href: "https://training.geoglows.org" },
  { label: "About GEOGLOWS", href: "https://www.geoglows.org/about" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/geoglows" },
  { label: "Contact", href: "mailto:secretariat@geoglows.org" },
];

function link({ label, href }) {
  const external = /^https?:\/\//.test(href);
  const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a href="${href}"${attrs}>${label}</a>`;
}

function column(title, links) {
  return `
    <div class="footer-col">
      <b>${title}</b>
      ${links.map(link).join("")}
    </div>
  `;
}

export function renderFooter() {
  const tools = [
    ...visibleApps.map((a) => ({
      label: a.name,
      href: a.type === "external" ? a.url : a.path,
    })),
    { label: "Access the data", href: "https://www.geoglows.org/tools#data" },
    { label: "Getting started", href: "https://www.geoglows.org/tools#getting-started" },
  ];

  return `
    <footer class="site-footer">
      <div class="shell">
        <div class="footer-top">
          <div class="brand-col">
            <img src="/geoglows-logo-white.webp" alt="GEOGLOWS" width="163" height="34" loading="lazy" decoding="async" />
            <p>
              Enabling individuals and organizations to solve local water challenges with
              global water intelligence through open data, forecasting, and research.
            </p>
          </div>
          ${column("Tools", tools)}
          ${column("Explore", EXPLORE)}
          ${column("Community", COMMUNITY)}
        </div>
        <div class="footer-bottom">
          <span>&copy; ${new Date().getFullYear()} GEOGLOWS. Global Water Intelligence Foundation.</span>
          <span class="legal">
            ${LEGAL.map(link).join("")}
          </span>
        </div>
      </div>
    </footer>
  `;
}
