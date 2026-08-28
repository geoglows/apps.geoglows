export function renderFooter() {
  return `
    <footer class="mt-16 border-t border-line pt-10 pb-8 px-4 bg-page/50">
      <div class="max-w-6xl mx-auto text-center">

        <div class="mb-10 flex flex-col items-center">
          <img
            src="/geoglows-logo.png"
            alt="GEOGLOWS"
            class="w-72 mb-4 block dark:hidden"
          />
          <img
            src="/geoglows-logo-white.png"
            alt="GEOGLOWS"
            class="w-72 mb-4 hidden dark:block opacity-80"
          />
          <p class="text-body text-sm max-w-lg leading-relaxed mb-5">
            Enabling individuals and organizations to solve local water challenges with global water intelligence through open data, forecasting, and research.
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <a href="https://www.geoglows.org" target="_blank" rel="noopener noreferrer"
              class="text-xs font-medium px-3 py-1.5 rounded-full border border-line text-faint hover:text-accent-text hover:border-accent-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta">
              geoglows.org
            </a>
            <a href="https://training.geoglows.org" target="_blank" rel="noopener noreferrer"
              class="text-xs font-medium px-3 py-1.5 rounded-full border border-line text-faint hover:text-accent-text hover:border-accent-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta">
              Training
            </a>
          </div>
        </div>

        <div class="pt-6 border-t border-line text-faint text-xs">
          <p>&copy; ${new Date().getFullYear()} GEOGLOWS. Global Water Intelligence Foundation.</p>
        </div>
      </div>
    </footer>
  `;
}

/*
  "A Collection of Work From" and "Funded By" sections — commented out for now:

  <div class="flex flex-col sm:flex-row justify-center gap-10 sm:gap-16 mb-10">
    <div>
      <p class="text-faint text-[0.65rem] mb-4 uppercase tracking-[0.2em] font-bold">
        A Collection of Work From
      </p>
      <div class="flex flex-wrap justify-center items-center gap-6">
        ${CONTRIBUTORS.map((c) => `<span class="text-body font-semibold text-sm">${c}</span>`).join("")}
      </div>
    </div>

    <div>
      <p class="text-faint text-[0.65rem] mb-4 uppercase tracking-[0.2em] font-bold">
        Funded By
      </p>
      <div class="flex flex-wrap justify-center items-center gap-6">
        ${SPONSORS.map((s) => `<span class="text-body font-semibold text-sm">${s}</span>`).join("")}
      </div>
    </div>
  </div>
*/
