import { escapeHtml as escape, sanitizeHref, getUserDisplayInfo } from "@geoglows/geoglows-auth/core";
import { ICONS } from "../icons.js";
import { isProfileComplete } from "../account.js";

const USER_TYPE_OPTIONS = [
  { value: "researcher", label: "Researcher" },
  { value: "student", label: "Student" },
  { value: "agency_staff", label: "Agency staff" },
  { value: "industry_professional", label: "Industry professional" },
  { value: "public", label: "Member of the public" },
  { value: "other", label: "Other" },
];

const USER_TYPE_LABELS = Object.fromEntries(
  USER_TYPE_OPTIONS.map((o) => [o.value, o.label]),
);

function fieldRow(label, displayHtml) {
  return `
    <div>
      <p class="text-xs font-semibold uppercase tracking-wider text-faint">${escape(label)}</p>
      <p class="mt-1 text-sm">${displayHtml}</p>
    </div>
  `;
}

function field(label, value, opts = {}) {
  const display = value
    ? `<span class="text-ink">${escape(value)}</span>`
    : `<span class="italic text-faint">${escape(opts.empty ?? "Not provided")}</span>`;
  return fieldRow(label, display);
}

function renderCompletionBanner(state) {
  const { account } = state;
  if (!account) return "";
  const profile = account.profile;
  if (isProfileComplete(profile)) return "";

  return `
    <div role="alert" aria-label="Profile completion reminder"
      class="mb-6 flex flex-wrap items-center gap-3 rounded-brand border border-line bg-teal-wash px-4 py-3">
      <div class="flex-1 min-w-[200px] text-sm text-accent-text">
        Your profile is missing your name. Complete it so we can address you correctly.
      </div>
      <button type="button" id="profileBannerComplete"
        class="btn-primary text-sm">
        Complete profile
      </button>
    </div>
  `;
}

function renderViewMode(state) {
  const { user, account } = state;
  const profile = account?.profile;
  const { name, email, initials } = getUserDisplayInfo(user, account);

  const userTypeLabel = profile?.user_type
    ? USER_TYPE_LABELS[profile.user_type] ?? profile.user_type
    : null;

  const safeLink = profile?.user_link ? sanitizeHref(profile.user_link) : null;
  const userLinkRow = safeLink
    ? fieldRow(
        "Personal link",
        `<a href="${escape(safeLink)}" target="_blank" rel="noopener noreferrer" class="text-accent-text hover:underline break-all">${escape(profile.user_link)}</a>`,
      )
    : field("Personal link", null, { empty: "—" });

  return `
    <div class="tool-card rounded-2xl p-6 md:p-8 shadow-sm">
      <div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-brand bg-geo-navy text-on-dark text-xl font-bold flex items-center justify-center shadow-sm">
            ${escape(initials)}
          </div>
          <div>
            <h3 class="font-display text-2xl text-ink">${escape(name)}</h3>
            <p class="text-sm text-body">${escape(email)}</p>
          </div>
        </div>
        <button type="button" id="profileEditButton"
          class="btn-primary self-start shadow-sm">
          Edit profile
        </button>
      </div>

      <div class="mt-8 grid gap-5 sm:grid-cols-2">
        ${field("First name", profile?.first_name)}
        ${field("Middle name", profile?.middle_name, { empty: "—" })}
        ${field("Last name", profile?.last_name)}
        ${field("User type", userTypeLabel, { empty: "—" })}
        ${userLinkRow}
      </div>

    </div>
  `;
}

function renderEditMode(state) {
  const { user, account, action, error } = state;
  const profile = account?.profile ?? {};
  const { email } = getUserDisplayInfo(user, account);
  const pending = action === "saving_profile";

  const userTypeOptionsHtml = USER_TYPE_OPTIONS.map(
    (opt) => `
      <option value="${escape(opt.value)}" ${profile.user_type === opt.value ? "selected" : ""}>
        ${escape(opt.label)}
      </option>
    `,
  ).join("");

  return `
    <form id="profileEditForm" novalidate class="tool-card rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
      <div>
        <h2 class="font-display text-2xl text-ink">Edit profile</h2>
        <p class="mt-1 text-sm text-body">Update your information. Your account email is shown below and cannot be changed here.</p>
      </div>

      <div class="rounded-xl bg-muted px-4 py-2 text-sm text-body">
        Account email: <strong>${escape(email)}</strong>
      </div>

      ${
        error
          ? `<p role="alert" aria-live="polite" class="rounded-brand border border-error-border bg-error-bg px-4 py-3 text-sm text-error-text">${escape(error)}</p>`
          : ""
      }

      <div class="grid gap-4 sm:grid-cols-3">
        <div>
          <label for="profileFirstName" class="block text-xs font-semibold uppercase tracking-wider text-faint mb-1">First name *</label>
          <input id="profileFirstName" name="first_name" type="text" autocomplete="given-name" ${pending ? "disabled" : ""}
            value="${escape(profile.first_name ?? "")}"
            class="w-full px-3 py-2 rounded-xl border border-line bg-page text-sm focus:outline-none focus:ring-2 focus:ring-cta" required />
        </div>
        <div>
          <label for="profileMiddleName" class="block text-xs font-semibold uppercase tracking-wider text-faint mb-1">Middle name</label>
          <input id="profileMiddleName" name="middle_name" type="text" autocomplete="additional-name" ${pending ? "disabled" : ""}
            value="${escape(profile.middle_name ?? "")}"
            class="w-full px-3 py-2 rounded-xl border border-line bg-page text-sm focus:outline-none focus:ring-2 focus:ring-cta" />
        </div>
        <div>
          <label for="profileLastName" class="block text-xs font-semibold uppercase tracking-wider text-faint mb-1">Last name *</label>
          <input id="profileLastName" name="last_name" type="text" autocomplete="family-name" ${pending ? "disabled" : ""}
            value="${escape(profile.last_name ?? "")}"
            class="w-full px-3 py-2 rounded-xl border border-line bg-page text-sm focus:outline-none focus:ring-2 focus:ring-cta" required />
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label for="profileUserType" class="block text-xs font-semibold uppercase tracking-wider text-faint mb-1">User type</label>
          <select id="profileUserType" name="user_type" ${pending ? "disabled" : ""}
            class="w-full px-3 py-2 rounded-xl border border-line bg-page text-sm focus:outline-none focus:ring-2 focus:ring-cta">
            <option value="">Select…</option>
            ${userTypeOptionsHtml}
          </select>
        </div>
      </div>

      <div>
        <label for="profileLink" class="block text-xs font-semibold uppercase tracking-wider text-faint mb-1">Personal link (URL)</label>
        <input id="profileLink" name="user_link" type="url" autocomplete="url" placeholder="https://" ${pending ? "disabled" : ""}
          value="${escape(profile.user_link ?? "")}"
          class="w-full px-3 py-2 rounded-xl border border-line bg-page text-sm focus:outline-none focus:ring-2 focus:ring-cta" />
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <button type="button" id="profileEditCancel" ${pending ? "disabled" : ""}
          class="btn-secondary disabled:opacity-60">
          Cancel
        </button>
        <button type="submit" ${pending ? "disabled" : ""}
          class="btn-primary shadow-sm">
          ${pending ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  `;
}

export function renderProfilePage(state) {
  if (!state.user) {
    return `
      <div class="flex flex-col items-center justify-center py-24 text-center gap-6">
        <div class="w-16 h-16 rounded-2xl bg-wash flex items-center justify-center">
          ${ICONS.droplet}
        </div>
        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Sign in to view your profile</h2>
          <p class="text-body max-w-sm">
            Create an account or sign in to manage your GEOGLOWS profile.
          </p>
        </div>
        <button id="signIn"
          class="btn-primary shadow-sm">
          Sign in
        </button>
      </div>
    `;
  }

  const editing = state.profileEditing === true;

  return `
    <section>
      <div class="mb-5">
        <h2 class="font-display text-3xl text-ink">Your Profile</h2>
        <p class="mt-2 text-body max-w-2xl">
          Manage your GEOGLOWS account details. Your information is private to you.
        </p>
      </div>
      ${state.profileSaveSuccess ? `
        <div role="status" class="mb-6 px-4 py-3 rounded-brand border border-line bg-wash text-accent-text text-sm">
          Profile updated successfully.
        </div>
      ` : ""}
      ${editing ? "" : renderCompletionBanner(state)}
      ${editing ? renderEditMode(state) : renderViewMode(state)}
    </section>
  `;
}
