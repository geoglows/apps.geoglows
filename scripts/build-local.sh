#!/usr/bin/env bash

# Assemble the portal into ./_site from local checkouts
#
#   ./scripts/build-local.sh                       # landing page and every app
#   ./scripts/build-local.sh rfs previews/rfs-v3   # only these apps
#   npx serve _site
#
# Installs and builds are cached in ./.build: npm ci only runs when package.json or
# package-lock.json changed, and a build only runs when the checkout's files changed.
#
# Pass --analytics to add the Google tag the deploy adds if you plan to deploy this to s3 manually.
# It is off by default so local builds don't pollute analytics
# Pass --clean to delete _site and the cache and rebuild everything from scratch.

set -euo pipefail
cd "$(dirname "$0")/.."

APPS_DIR="${APPS_DIR:-..}"
CACHE_DIR=".build"

analytics=false
clean=false
slugs=()
for arg in "$@"; do
  case "$arg" in
    --analytics) analytics=true ;;
    --clean) clean=true ;;
    -*) echo "usage: $0 [--analytics] [--clean] [app-slug ...]" >&2; exit 2 ;;
    *) slug="${arg#/}"; slugs+=("${slug%/}") ;;
  esac
done

if [ "$clean" = true ]; then
  rm -rf _site "$CACHE_DIR"
fi
mkdir -p _site "$CACHE_DIR"

read -r -d '' ga_tag <<'HTML' || true
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LLEY2QHRVH"></script>
<script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-LLEY2QHRVH');</script>
HTML

# Inject the GA tag into the given html pages
inject_analytics() {
  [ "$#" -gt 0 ] || return 0
  local missing=() page
  for page in "$@"; do
    grep -qi '</head>' "$page" || missing+=("${page#_site/}")
  done
  if [ ${#missing[@]} -gt 0 ]; then
    echo "!!  no </head> to inject the tag into:" >&2
    printf '!!    %s\n' "${missing[@]}" >&2
    exit 1
  fi
  TAG="$ga_tag" perl -0777 -pi -e 's{</head>}{$ENV{TAG}\n</head>}i' "$@"
}

# Fingerprint of every tracked and untracked (not ignored) file in a git checkout
# Prints nothing outside of a git checkout so the build is never skipped
source_hash() {
  (
    cd "$1"
    git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0
    git ls-files -co --exclude-standard -z | xargs -0 shasum 2>/dev/null | shasum | cut -d' ' -f1
  )
}

# Run npm ci only if node_modules is missing or the package files changed since the last install
install_deps() {
  local dir="$1" key="$2" stamp="${CACHE_DIR}/${2}.install" hash
  hash="$(cat "$dir/package.json" "$dir/package-lock.json" 2>/dev/null | shasum | cut -d' ' -f1)"
  if [ -d "$dir/node_modules" ] && [ "$(cat "$stamp" 2>/dev/null)" = "$hash" ]; then
    echo "    install cached"
    return 0
  fi
  (cd "$dir" && npm ci) || return 1
  echo "$hash" > "$stamp"
}

# Returns 0 if the output for this key is up to date with the given fingerprint
is_cached() {
  [ -n "$2" ] && [ "$(cat "${CACHE_DIR}/${1}.build" 2>/dev/null)" = "$2" ]
}

if [ ${#slugs[@]} -eq 0 ]; then
  echo "==> landing page"
  fingerprint="$(source_hash .)"
  [ -z "$fingerprint" ] || fingerprint="${fingerprint} analytics=${analytics}"
  if is_cached landing "$fingerprint" && [ -f _site/index.html ]; then
    echo "    build cached"
  else
    install_deps . landing
    npm run build
    cp -r dist/. _site/
    if [ "$analytics" = true ]; then
      pages=()
      while IFS= read -r -d '' page; do pages+=("_site/${page#dist/}"); done < <(find dist -name '*.html' -print0)
      inject_analytics "${pages[@]}"
    fi
    echo "$fingerprint" > "${CACHE_DIR}/landing.build"
  fi
fi

apps="$(jq -r '.groups[].apps[] | select(.repository) | "\(.path | ltrimstr("/")) \(.repository | split("/") | last)"' apps.json)"

for slug in ${slugs[@]+"${slugs[@]}"}; do
  if ! grep -q "^${slug} " <<< "$apps"; then
    echo "!!  no app with path /${slug} in apps.json" >&2
    exit 2
  fi
done

while read -r slug repo; do
  if [ ${#slugs[@]} -gt 0 ] && [[ ! " ${slugs[*]} " == *" ${slug} "* ]]; then
    continue
  fi
  dir="${APPS_DIR}/${repo}"
  key="${slug//\//__}"
  if [ ! -d "$dir" ]; then
    echo "!!  skip /${slug} — no checkout at ${dir}"
    continue
  fi
  echo "==> /${slug}  <-  ${dir}"
  fingerprint="$(source_hash "$dir")"
  [ -z "$fingerprint" ] || fingerprint="${fingerprint} base=/${slug}/ analytics=${analytics}"
  if is_cached "$key" "$fingerprint" && [ -d "_site/${slug}" ]; then
    echo "    build cached"
    continue
  fi
  if ! install_deps "$dir" "$key" || ! (cd "$dir" && npx vite build --base="/${slug}/"); then
    echo "!!  /${slug} failed to build — skipping"
    continue
  fi
  rm -rf "_site/${slug}"
  mkdir -p "_site/${slug}"
  cp -r "$dir/dist/." "_site/${slug}/"
  if [ "$analytics" = true ]; then
    pages=()
    while IFS= read -r -d '' page; do pages+=("$page"); done < <(find "_site/${slug}" -name '*.html' -print0)
    inject_analytics ${pages[@]+"${pages[@]}"}
  fi
  echo "$fingerprint" > "${CACHE_DIR}/${key}.build"
done <<< "$apps"

echo ""
echo "==> done — preview with: npx serve _site"
echo "If you plan to deploy manually, pass --analytics to include the Google tag."
echo "Then sync with s5cmd sync --delete _site/ s3://apps-geoglows/"
