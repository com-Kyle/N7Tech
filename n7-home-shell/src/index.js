import { authRoutes } from "./auth.js";

const COVER_PATH = "/brand/n7-network-cover.webp";
const PROFILE_IMAGE_PATH = "/brand/n7-technologies.png";
const HEADER_LOGO_PATH = "/brand/neural-zenith-banner.png";
// Neural Zenith Technologies LLC — CSS wordmark lockup (replaces the PNG).
// Kept identical to the Next.js source (components/chrome/site-nav.tsx) and the
// .nz-* rules in MENU_STYLES so dev and prod render the same lockup.
const NZ_LOCKUP_HTML =
  '<span class="nz-lockup" aria-hidden="true">' +
    '<span class="nz-panel">' +
      '<span class="nz-title"><span class="nz-neural">NEURAL</span><span class="nz-zenith">ZENITH</span></span>' +
      '<span class="nz-divider"><span class="nz-rule"></span><span class="nz-dot"></span><span class="nz-rule"></span></span>' +
      '<span class="nz-sub">TECHNOLOGIES</span>' +
    '</span>' +
  '</span>';
const CONTRACTORPOD_PREFIX = "/contractorpod";
const CONTRACTORPOD_ORIGIN = "https://contractorpod.deploypod.ai";
const CONTRACTORPOD_CANONICAL_ORIGIN = "https://contractorpod.com";
const CONTRACTORPOD_PUBLIC_BASE = `https://www.n7technologies.org${CONTRACTORPOD_PREFIX}`;
const FOUNDER_EMAIL = "founder@n7technologies.org";
const FOUNDER_MAILTO = `mailto:${FOUNDER_EMAIL}?subject=Hello%20from%20n7technologies.org`;
const LEGACY_PUBLIC_EMAIL_PATTERN = /n7(?:dpagan|kpierce)@gmail\.com/gi;
const CONTRACTORPOD_ROUTE_ROOTS = [
  "_next",
  "account",
  "api",
  "bids",
  "built-for-you",
  "cdn-cgi",
  "contracts",
  "crew-manager",
  "customers",
  "dashboard",
  "employees",
  "estimate",
  "estimates",
  "find",
  "forgot-password",
  "founder",
  "home",
  "invoices",
  "jobs",
  "legal",
  "login",
  "market",
  "messages",
  "notifications",
  "offline-projects",
  "portfolio",
  "pricing",
  "products",
  "projects",
  "quotes",
  "reputation",
  "settings",
  "signup",
  "start",
  "tax"
];
const CONTRACTORPOD_ROUTE_PATTERN = CONTRACTORPOD_ROUTE_ROOTS.join("|");
const CONTACT_EMAILS = [
  {
    label: "Email a Founder",
    email: FOUNDER_EMAIL,
    subject: "Hello from n7technologies.org"
  },
  {
    label: "General Information",
    email: "contact@n7technologies.org",
    subject: "General Information"
  },
  {
    label: "Need Help",
    email: "help@n7technologies.org",
    subject: "Need Help"
  }
];
const FOUNDER_PERSONAL_EMAILS = {
  "Dante Pagan": "n7dpagan@gmail.com",
  "Kyle Pierce": "n7kpierce@gmail.com"
};

function mailtoUrl({ email, subject }) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

function contactButtonsHtml() {
  return CONTACT_EMAILS.map(contact => `
    <a href="${mailtoUrl(contact)}" class="n7-contact-email" aria-label="${contact.label} at ${contact.email}">
      <span>
        <span class="n7-contact-email__label">${contact.label}</span>
        <span class="n7-contact-email__address">${contact.email}</span>
      </span>
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
    </a>
  `).join("");
}

const MOBILE_NAVIGATION_HTML = `
  <div class="n7-mobile-nav">
    <button type="button" class="n7-mobile-nav__toggle" aria-expanded="false" aria-controls="n7-mobile-menu" aria-label="Open navigation menu">
      <span class="n7-mobile-nav__icon" aria-hidden="true"><span></span><span></span><span></span></span>
    </button>
    <nav id="n7-mobile-menu" class="n7-mobile-nav__panel" data-open="false" aria-label="Mobile navigation">
      <a class="n7-mobile-nav__link" href="/products">Products</a>
      <div class="n7-mobile-nav__services">
        <button type="button" class="n7-mobile-nav__services-toggle" aria-expanded="false" aria-controls="n7-mobile-services">
          <span>Services</span>
          <svg class="n7-mobile-nav__chevron" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
        </button>
        <div id="n7-mobile-services" class="n7-mobile-nav__services-list" data-open="false">
          <a href="/website-services">Website Services</a>
          <a href="/app-services">App Services</a>
          <a href="/deploypod">DeployPod</a>
        </div>
      </div>
      <a class="n7-mobile-nav__link" href="/about">About</a>
      <a class="n7-mobile-nav__link" href="/contact">Contact</a>
      <a class="n7-mobile-nav__link n7-account-link" href="/login">Login</a>
    </nav>
  </div>
`;

const CONTRACTORPOD_CLIENT_BRIDGE = `
  <script data-n7-contractorpod-bridge>
    (() => {
      const prefix = ${JSON.stringify(CONTRACTORPOD_PREFIX)};
      const oldOrigins = [
        "aHR0cHM6Ly9jb250cmFjdG9ycG9kLmRlcGxveXBvZC5haQ==",
        "aHR0cHM6Ly9jb250cmFjdG9ycG9kLmNvbQ=="
      ].map(value => atob(value));

      function localUrl(value) {
        if (typeof value !== "string" || !value) return value;
        if (value.startsWith("#") || /^(?:data:|blob:|mailto:|tel:|javascript:)/i.test(value)) return value;

        for (const origin of oldOrigins) {
          if (value === origin || value === origin + "/") return location.origin + prefix;
          if (value.startsWith(origin + "/")) return location.origin + prefix + value.slice(origin.length);
        }

        try {
          const url = new URL(value, location.href);
          if (url.origin !== location.origin || url.pathname === prefix || url.pathname.startsWith(prefix + "/")) {
            return value;
          }
          url.pathname = prefix + (url.pathname === "/" ? "" : url.pathname);
          return value.startsWith("http://") || value.startsWith("https://") ? url.href : url.pathname + url.search + url.hash;
        } catch {
          return value;
        }
      }

      function rewriteElement(element) {
        for (const attribute of ["href", "src", "action", "poster"]) {
          if (!element.hasAttribute(attribute)) continue;
          const current = element.getAttribute(attribute);
          const rewritten = localUrl(current);
          if (rewritten !== current) element.setAttribute(attribute, rewritten);
        }

        if (element.hasAttribute("srcset")) {
          const current = element.getAttribute("srcset");
          const rewritten = current.split(",").map(candidate => {
            const parts = candidate.trim().split(/\\s+/);
            parts[0] = localUrl(parts[0]);
            return parts.join(" ");
          }).join(", ");
          if (rewritten !== current) element.setAttribute("srcset", rewritten);
        }
      }

      function rewriteTree(root) {
        if (root.nodeType === Node.ELEMENT_NODE) rewriteElement(root);
        root.querySelectorAll?.("[href], [src], [action], [poster], [srcset]").forEach(rewriteElement);
      }

      const originalFetch = window.fetch.bind(window);
      window.fetch = (input, init) => {
        if (input instanceof Request) {
          const rewritten = localUrl(input.url);
          input = rewritten === input.url ? input : new Request(rewritten, input);
        } else {
          input = localUrl(String(input));
        }
        return originalFetch(input, init);
      };

      const originalOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url, ...args) {
        return originalOpen.call(this, method, localUrl(String(url)), ...args);
      };

      for (const method of ["pushState", "replaceState"]) {
        const original = history[method];
        history[method] = function(state, title, url) {
          return original.call(this, state, title, url == null ? url : localUrl(String(url)));
        };
      }

      document.addEventListener("click", event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target.closest?.("a[href]");
        if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

        const href = link.getAttribute("href");
        if (!href || href.startsWith("#") || /^(?:mailto:|tel:|javascript:)/i.test(href)) return;

        const destination = new URL(localUrl(link.href), location.href);
        if (destination.origin !== location.origin || !(destination.pathname === prefix || destination.pathname.startsWith(prefix + "/"))) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        location.assign(destination.href);
      }, true);

      rewriteTree(document.documentElement);
      new MutationObserver(records => {
        for (const record of records) {
          if (record.type === "attributes") rewriteElement(record.target);
          record.addedNodes.forEach(node => rewriteTree(node));
        }
      }).observe(document.documentElement, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["href", "src", "action", "poster", "srcset"]
      });
    })();
  </script>
`;

const MENU_STYLES = `
  .n7-header-logo {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
  }

  .n7-header-logo:focus-visible {
    outline: 3px solid #fff;
    outline-offset: 3px;
    border-radius: 0.4rem;
  }

  /* The shell owns the header bar height — keep the bar tall enough for the
     lockup even when the separately-deployed app worker still ships an older
     height class (e.g. h-20). min-height wins over the app's fixed height. */
  header > div {
    min-height: 7rem;
  }

  /* Neural Zenith Technologies LLC — CSS wordmark lockup. Kept identical to the
     Next.js source (app/globals.css .nz-* block) so dev == prod. */
  .nz-lockup {
    --nz-notch: 9px;
    zoom: 1.45;
    display: inline-flex;
    padding: 2px;
    background: linear-gradient(180deg, #ff343c 0%, #d20712 52%, #7e0c12 100%);
    clip-path: polygon(
      var(--nz-notch) 0, calc(100% - var(--nz-notch)) 0, 100% var(--nz-notch),
      100% calc(100% - var(--nz-notch)), calc(100% - var(--nz-notch)) 100%,
      var(--nz-notch) 100%, 0 calc(100% - var(--nz-notch)), 0 var(--nz-notch)
    );
    filter: drop-shadow(0 0 5px rgba(225, 29, 39, 0.5));
  }

  .nz-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.05rem;
    padding: 0.42rem 1.15rem 0.36rem;
    background-color: #070709;
    background-image: url("data:image/svg+xml,%3Csvg%20width='28'%20height='49'%20viewBox='0%200%2028%2049'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cg%20fill='none'%20fill-rule='evenodd'%3E%3Cg%20fill='%23e11d27'%20fill-opacity='0.07'%3E%3Cpath%20d='M13.99%209.25l13%207.5v15l-13%207.5L1%2024.75v-15l12.99-7.5zM3%2021.45v8.6l10.99%206.34%2011-6.35v-8.6l-11-6.34L3%2021.45zM0%2015l12.98-7.5V0h-2v6.35L0%2012.69v2.3zm0%2018.5L12.98%2041v8h-2v-6.85L0%2035.81v-2.3zM15%200v7.5L27.99%2015H28v-2.31h-.01L17%206.35V0h-2zm0%2049v-8l12.99-7.5H28v2.31h-.01L17%2042.95V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-size: 28px 49px;
    clip-path: polygon(
      var(--nz-notch) 0, calc(100% - var(--nz-notch)) 0, 100% var(--nz-notch),
      100% calc(100% - var(--nz-notch)), calc(100% - var(--nz-notch)) 100%,
      var(--nz-notch) 100%, 0 calc(100% - var(--nz-notch)), 0 var(--nz-notch)
    );
  }

  .nz-title {
    display: flex;
    align-items: baseline;
    gap: 0.4em;
    font-family: "Chakra Petch", var(--font-chakra), "Rajdhani", sans-serif;
    font-weight: 700;
    font-size: clamp(1.05rem, 2.2vw, 1.45rem);
    line-height: 1;
    letter-spacing: 0.05em;
  }

  .nz-neural {
    background: linear-gradient(180deg, #ffffff 0%, #e7e9ee 42%, #bcc0c8 70%, #fbfbfd 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .nz-zenith {
    background: linear-gradient(180deg, #ff6168 0%, #e11d27 52%, #9e1119 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .nz-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    align-self: stretch;
    margin: 0.2rem 0 0.16rem;
  }

  .nz-rule {
    flex: 1 1 auto;
    height: 1px;
  }
  .nz-rule:first-child {
    background: linear-gradient(90deg, transparent, #e11d27 90%);
  }
  .nz-rule:last-child {
    background: linear-gradient(90deg, #e11d27 10%, transparent);
  }

  .nz-sub {
    font-family: "Chakra Petch", var(--font-chakra), "Rajdhani", sans-serif;
    font-weight: 600;
    font-size: clamp(0.46rem, 1vw, 0.6rem);
    letter-spacing: 0.46em;
    text-indent: 0.46em;
    background: linear-gradient(180deg, #f4f5f7, #c2c6cd);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .nz-dot {
    width: 3px;
    height: 3px;
    border-radius: 9999px;
    background: #e11d27;
    box-shadow: 0 0 4px rgba(225, 29, 39, 0.85);
  }

  .n7-mobile-nav {
    display: none;
  }

  .n7-desktop-account-link {
    display: none;
  }

  header button[aria-haspopup="menu"],
  header nav > a[href="/products"],
  header nav > a[href="/about"],
  header nav > a[href="/contact"],
  .n7-desktop-account-link {
    border: 2px solid #050505;
    border-radius: 0.7rem;
    background: linear-gradient(180deg, #191919, #050505);
    color: #fff !important;
    padding: 0.65rem 1rem;
    box-shadow: 0 5px 14px rgba(0, 0, 0, 0.28);
    line-height: 1.25;
  }

  header button[aria-haspopup="menu"]:hover,
  header button[aria-haspopup="menu"][aria-expanded="true"],
  header nav > a[href="/products"]:hover,
  header nav > a[href="/about"]:hover,
  header nav > a[href="/contact"]:hover,
  header nav > a[href="/products"]:focus-visible,
  header nav > a[href="/about"]:focus-visible,
  header nav > a[href="/contact"]:focus-visible,
  .n7-desktop-account-link:hover,
  .n7-desktop-account-link:focus-visible {
    border-color: #fff;
    background: #050505;
    color: #fff !important;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.22), 0 9px 22px rgba(0, 0, 0, 0.38);
    outline: none;
  }

  header [role="menu"][aria-label="Services"] > div {
    min-width: 17rem !important;
    border: 2px solid #e00008 !important;
    background: #08090d !important;
    padding: 0.55rem !important;
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.62), 0 0 24px rgba(224, 0, 8, 0.22) !important;
  }

  header [role="menu"][aria-label="Services"] a {
    display: flex !important;
    align-items: center;
    gap: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 0.55rem;
    background: #14151b;
    color: #fff !important;
    font-size: 1.075rem;
    padding: 0.9rem 1rem !important;
  }

  header [role="menu"][aria-label="Services"] a + a {
    margin-top: 0.45rem;
  }

  header [role="menu"][aria-label="Services"] a::before {
    width: 0.55rem;
    height: 0.55rem;
    flex: 0 0 auto;
    border-radius: 999px;
    background: #e00008;
    box-shadow: 0 0 10px rgba(224, 0, 8, 0.8);
    content: "";
  }

  header [role="menu"][aria-label="Services"] a:hover,
  header [role="menu"][aria-label="Services"] a:focus-visible {
    border-color: #ff343b;
    background: #e00008 !important;
    transform: translateX(3px);
    outline: none;
  }

  header [role="menu"][aria-label="Services"] a:hover::before,
  header [role="menu"][aria-label="Services"] a:focus-visible::before {
    background: #fff;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.85);
  }

  @media (max-width: 639px) {
    header > div {
      min-height: 5rem;
    }

    .nz-lockup {
      zoom: 1.25;
    }

    .nz-panel {
      padding: 0.34rem 0.85rem 0.3rem;
    }

    .nz-title {
      font-size: 1.05rem;
    }

    .n7-mobile-nav {
      position: relative;
      display: block;
    }

    .n7-mobile-nav__toggle {
      display: inline-flex;
      width: 3rem;
      height: 3rem;
      align-items: center;
      justify-content: center;
      border: 2px solid #050505;
      border-radius: 0.65rem;
      background: linear-gradient(180deg, #191919, #050505);
      box-shadow: 0 5px 14px rgba(0, 0, 0, 0.28);
    }

    .n7-mobile-nav__icon {
      display: flex;
      width: 1.45rem;
      flex-direction: column;
      gap: 0.3rem;
    }

    .n7-mobile-nav__icon span {
      display: block;
      width: 100%;
      height: 2px;
      border-radius: 999px;
      background: #fff;
      transition: transform 160ms ease, opacity 160ms ease;
    }

    .n7-mobile-nav__toggle[aria-expanded="true"] .n7-mobile-nav__icon span:first-child {
      transform: translateY(0.5rem) rotate(45deg);
    }

    .n7-mobile-nav__toggle[aria-expanded="true"] .n7-mobile-nav__icon span:nth-child(2) {
      opacity: 0;
    }

    .n7-mobile-nav__toggle[aria-expanded="true"] .n7-mobile-nav__icon span:last-child {
      transform: translateY(-0.5rem) rotate(-45deg);
    }

    .n7-mobile-nav__panel {
      position: absolute;
      top: calc(100% + 0.75rem);
      right: 0;
      z-index: 80;
      display: none;
      width: min(19rem, calc(100vw - 2rem));
      border: 2px solid #e00008;
      border-radius: 0.8rem;
      background: #08090d;
      padding: 0.65rem;
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.68), 0 0 24px rgba(224, 0, 8, 0.24);
    }

    .n7-mobile-nav__panel[data-open="true"] {
      display: block;
    }

    .n7-mobile-nav__link,
    .n7-mobile-nav__services-toggle {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 0.55rem;
      background: #14151b;
      color: #fff;
      padding: 0.9rem 1rem;
      font-size: 1rem;
      font-weight: 800;
      text-align: left;
    }

    .n7-mobile-nav__link + .n7-mobile-nav__link,
    .n7-mobile-nav__services,
    .n7-mobile-nav__services + .n7-mobile-nav__link {
      margin-top: 0.5rem;
    }

    .n7-mobile-nav__link:active,
    .n7-mobile-nav__link:focus-visible,
    .n7-mobile-nav__services-toggle:active,
    .n7-mobile-nav__services-toggle:focus-visible {
      border-color: #ff343b;
      background: #e00008;
      outline: none;
    }

    .n7-mobile-nav__chevron {
      transition: transform 160ms ease;
    }

    .n7-mobile-nav__services-toggle[aria-expanded="true"] .n7-mobile-nav__chevron {
      transform: rotate(180deg);
    }

    .n7-mobile-nav__services-list {
      display: none;
      margin-top: 0.45rem;
      border-left: 2px solid #e00008;
      padding-left: 0.55rem;
    }

    .n7-mobile-nav__services-list[data-open="true"] {
      display: grid;
      gap: 0.4rem;
    }

    .n7-mobile-nav__services-list a {
      border-radius: 0.45rem;
      background: #202128;
      color: #fff;
      padding: 0.75rem 0.85rem;
      font-size: 0.9rem;
      font-weight: 700;
    }
  }

  @media (min-width: 640px) {
    .n7-mobile-nav {
      display: none !important;
    }

    .n7-desktop-account-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 800;
      text-decoration: none;
    }
  }
`;

const CONTACT_STYLES = `
  .n7-contact-email {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border: 2px solid #e00008;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, rgba(224, 0, 8, 0.2), rgba(10, 10, 14, 0.98));
    color: #fff;
    padding: 1.1rem 1.25rem;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.3), 0 0 22px rgba(224, 0, 8, 0.12);
    transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
  }

  .n7-contact-email:hover,
  .n7-contact-email:focus-visible {
    border-color: #ff4a50;
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.38), 0 0 28px rgba(224, 0, 8, 0.24);
    transform: translateY(-2px);
    outline: none;
  }

  .n7-contact-email__label {
    display: block;
    font-family: var(--font-display), sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .n7-contact-email__address {
    display: block;
    margin-top: 0.2rem;
    color: var(--color-muted);
    font-size: 0.95rem;
  }

  .n7-founder-personal-email {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.25rem;
    border: 1px solid var(--color-brand);
    border-radius: 0.55rem;
    background: color-mix(in srgb, var(--color-brand) 12%, transparent);
    color: var(--color-fg);
    padding: 0.65rem 0.9rem;
    font-size: 0.875rem;
    font-weight: 700;
    transition: background-color 160ms ease, color 160ms ease, transform 160ms ease;
  }

  .n7-founder-personal-email:hover,
  .n7-founder-personal-email:focus-visible {
    background: var(--color-brand);
    color: #fff;
    transform: translateY(-1px);
    outline: none;
  }
`;

// NOTE: the homepage backdrop is now owned entirely by the Next.js app
// (.bg-carbon in app/globals.css — the grid-horizon background). The shell used
// to inject a competing .n7-home-cover cover image here; that was removed
// 2026-06-14 because it layered on top of the app background and clashed.

class HeadElement {
  element(element) {
    // Chakra Petch powers the Neural Zenith wordmark lockup; load it as a named
    // family so the injected lockup renders correctly even where the Next.js
    // next/font variable isn't in scope.
    const fontLink =
      `<link rel="preconnect" href="https://fonts.googleapis.com">` +
      `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` +
      `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&display=swap">`;
    const pageStyles = [
      MENU_STYLES,
      CONTACT_STYLES
    ].join("\n");

    element.append(`${fontLink}<style>${pageStyles}</style>`, { html: true });
  }
}

class TopBrandBannerElement {
  element(element) {
    element.remove();
  }
}

class HeaderBrandElement {
  element(element) {
    element.setAttribute("class", "n7-header-logo");
    element.setAttribute("aria-label", "Neural Zenith Technologies LLC — home");
    element.setInnerContent(NZ_LOCKUP_HTML, { html: true });
  }
}

class FounderMailtoElement {
  element(element) {
    element.setAttribute("href", FOUNDER_MAILTO);
  }
}

class HomeQuoteLinkElement {
  element(element) {
    element.setAttribute("href", "/quote");
  }
}

class ServiceQuoteLinkElement {
  element(element) {
    const href = element.getAttribute("href") || "";
    const contactUrl = new URL(href, "https://www.n7technologies.org");
    const service = contactUrl.searchParams.get("subject");
    element.setAttribute("href", service ? `/quote?service=${encodeURIComponent(service)}` : "/quote");
  }
}

class FounderContactCardsElement {
  constructor() {
    this.count = 0;
  }

  element(element) {
    this.count += 1;

    if (this.count === 1) {
      element.before(contactButtonsHtml(), { html: true });
      element.remove();
      return;
    }

    element.remove();
  }
}

class FounderPersonalEmailCardsElement {
  constructor() {
    this.count = 0;
  }

  element(element) {
    const founder = Object.keys(FOUNDER_PERSONAL_EMAILS)[this.count];
    const email = FOUNDER_PERSONAL_EMAILS[founder];
    this.count += 1;

    if (!email) return;

    element.setAttribute("href", `mailto:${email}`);
    element.setAttribute("class", "n7-founder-personal-email");
    element.setAttribute("aria-label", `Email ${founder} at ${email}`);
    element.setInnerContent(
      `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg><span>Email: ${email}</span>`,
      { html: true }
    );
  }
}

class HeaderContainerElement {
  element(element) {
    element.append(`${MOBILE_NAVIGATION_HTML}<a class="n7-desktop-account-link n7-account-link" href="/login">Login</a>`, { html: true });
  }
}

class SiteBodyElement {
  element(element) {
    element.append(
      `<script>
        (() => {
          const contactEmails = ${JSON.stringify(CONTACT_EMAILS)};
          const founderPersonalEmails = ${JSON.stringify(FOUNDER_PERSONAL_EMAILS)};
          const mobileNavigationHtml = ${JSON.stringify(MOBILE_NAVIGATION_HTML)};
          const headerLogoPath = ${JSON.stringify(HEADER_LOGO_PATH)};
          const nzLockupHtml = ${JSON.stringify(NZ_LOCKUP_HTML)};
          let accountState = null;
          let accountRequest = null;
          let documentNavigationReady = false;

          function mailtoUrl(contact) {
            return "mailto:" + contact.email + "?subject=" + encodeURIComponent(contact.subject);
          }

          function contactButtonsHtml() {
            return contactEmails.map(contact =>
              '<a href="' + mailtoUrl(contact) + '" class="n7-contact-email" aria-label="' + contact.label + ' at ' + contact.email + '">' +
                '<span><span class="n7-contact-email__label">' + contact.label + '</span>' +
                '<span class="n7-contact-email__address">' + contact.email + '</span></span>' +
                '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>' +
              '</a>'
            ).join("");
          }

          function syncHeaderBrand() {
            document.querySelectorAll("body > div.w-full.bg-black").forEach(banner => {
              if (banner.querySelector('img[src="' + headerLogoPath + '"]')) banner.remove();
            });

            const brand = document.querySelector('header > div > a[href="/"]');
            if (!brand) return;

            brand.className = "n7-header-logo";
            brand.setAttribute("aria-label", "Neural Zenith Technologies LLC — home");
            if (!brand.querySelector(".nz-lockup") || brand.children.length !== 1) {
              brand.innerHTML = nzLockupHtml;
            }
          }

          function replaceContactEmails() {
            const heading = Array.from(document.querySelectorAll("p")).find(
              element => ["Or email a founder directly", "Email a founder directly", "Email N7 directly"].includes(element.textContent.trim())
            );

            if (!heading) return;

            const section = heading.parentElement;
            const contactList = section && section.querySelector("div.flex.flex-col.gap-3");
            if (!contactList) return;

            heading.textContent = "Email N7 directly";

            const oldNote = Array.from(section.children).find(
              child => child !== heading && child.tagName === "P" && child.classList.contains("mt-6")
            );
            if (oldNote) oldNote.remove();

            const isReady = contactEmails.every(contact =>
              contactList.querySelector('a[href^="mailto:' + contact.email + '"]')
            ) && contactList.children.length === contactEmails.length;
            if (isReady) return;

            contactList.innerHTML = contactButtonsHtml();
            contactList.dataset.n7ContactEmails = "true";
          }

          function replaceFounderPersonalEmails() {
            if (window.location.pathname !== "/about") return;

            Object.entries(founderPersonalEmails).forEach(([name, email]) => {
              const heading = Array.from(document.querySelectorAll("h3")).find(
                element => element.textContent.trim() === name
              );
              const card = heading && heading.closest("div.relative.overflow-hidden");
              const link = card && card.querySelector('a[href^="mailto:"]');
              if (!link) return;

              // Idempotency guard: once our markup is applied, do NOT rewrite
              // innerHTML again. Rewriting every sync re-triggers the body
              // MutationObserver into an infinite ~60fps resync loop that starves
              // the main thread ("buffers forever" hang — Ares 2026-06-15).
              const desiredHref = "mailto:" + email;
              if (link.classList.contains("n7-founder-personal-email") && link.getAttribute("href") === desiredHref) return;

              link.href = desiredHref;
              link.className = "n7-founder-personal-email";
              link.setAttribute("aria-label", "Email " + name + " at " + email);
              link.innerHTML = '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg><span>Email: ' + email + '</span>';
            });
          }

          function replaceQuoteLinks() {
            if (window.location.pathname === "/") {
              document.querySelectorAll('main a[href^="/contact"]').forEach(link => {
                if (link.textContent.toLowerCase().includes("quote")) link.href = "/quote";
              });
            }

            if (["/website-services", "/app-services"].includes(window.location.pathname)) {
              document.querySelectorAll('main a[href^="/contact?subject="]').forEach(link => {
                const destination = new URL(link.href, window.location.origin);
                const service = destination.searchParams.get("subject");
                link.href = service ? "/quote?service=" + encodeURIComponent(service) : "/quote";
              });
            }
          }

          function ensureMobileNavigation() {
            const headerContainer = document.querySelector("header > div");
            if (!headerContainer) return null;

            let root = headerContainer.querySelector(":scope > .n7-mobile-nav");
            if (!root) {
              headerContainer.insertAdjacentHTML("beforeend", mobileNavigationHtml);
              root = headerContainer.querySelector(":scope > .n7-mobile-nav");
            }

            if (!headerContainer.querySelector(":scope > .n7-desktop-account-link")) {
              headerContainer.insertAdjacentHTML("beforeend", '<a class="n7-desktop-account-link n7-account-link" href="/login">Login</a>');
            }

            return root;
          }

          function setupMobileMenu() {
            const root = ensureMobileNavigation();
            if (!root || root.dataset.initialized === "true") return;

            const toggle = root.querySelector(".n7-mobile-nav__toggle");
            const panel = root.querySelector(".n7-mobile-nav__panel");
            const servicesToggle = root.querySelector(".n7-mobile-nav__services-toggle");
            const servicesList = root.querySelector(".n7-mobile-nav__services-list");

            const closeMenu = () => {
              toggle.setAttribute("aria-expanded", "false");
              toggle.setAttribute("aria-label", "Open navigation menu");
              panel.dataset.open = "false";
              servicesToggle.setAttribute("aria-expanded", "false");
              servicesList.dataset.open = "false";
            };

            toggle.addEventListener("click", () => {
              const open = toggle.getAttribute("aria-expanded") !== "true";
              toggle.setAttribute("aria-expanded", String(open));
              toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
              panel.dataset.open = String(open);
            });

            servicesToggle.addEventListener("click", () => {
              const open = servicesToggle.getAttribute("aria-expanded") !== "true";
              servicesToggle.setAttribute("aria-expanded", String(open));
              servicesList.dataset.open = String(open);
            });

            root.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
            document.addEventListener("pointerdown", event => {
              if (!root.contains(event.target)) closeMenu();
            });
            document.addEventListener("keydown", event => {
              if (event.key === "Escape") {
                closeMenu();
                toggle.focus();
              }
            });
            window.addEventListener("popstate", closeMenu);

            root.dataset.initialized = "true";
          }

          function setupDocumentNavigation() {
            if (documentNavigationReady) return;

            document.addEventListener("click", event => {
              if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              const link = event.target.closest?.("a[href]");
              if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

              const href = link.getAttribute("href") || "";
              if (!href || href.startsWith("#") || /^(?:mailto:|tel:|javascript:|data:|blob:)/i.test(href)) return;

              const destination = new URL(link.href, window.location.href);
              if (destination.origin !== window.location.origin) return;
              if (destination.pathname === window.location.pathname && destination.search === window.location.search && destination.hash) return;

              event.preventDefault();
              event.stopImmediatePropagation();
              window.location.assign(destination.href);
            }, true);

            documentNavigationReady = true;
          }

          async function syncAccountLinks() {
            const applyState = () => {
              document.querySelectorAll(".n7-account-link").forEach(link => {
                link.href = accountState?.authenticated ? "/account" : "/login";
                link.textContent = accountState?.authenticated ? "Account" : "Login";
              });
            };

            if (accountState) {
              applyState();
              return;
            }

            if (!accountRequest) {
              accountRequest = fetch("/api/auth/me", { headers: { accept: "application/json" } })
                .then(response => response.ok ? response.json() : { authenticated: false })
                .then(account => {
                  accountState = account;
                  applyState();
                })
                .catch(() => {
                  accountRequest = null;
                });
            }
          }

          function syncShell() {
            syncHeaderBrand();
            replaceContactEmails();
            replaceFounderPersonalEmails();
            replaceQuoteLinks();
            setupDocumentNavigation();
            setupMobileMenu();
            syncAccountLinks();
          }

          // The observer must be PAUSED while the shell mutates the DOM, or the
          // shell's own rewrites re-fire it endlessly (Ares 2026-06-15). syncShell
          // only runs inside syncShellGuarded, which disconnects first and
          // reconnects after.
          let observer = null;
          let observing = false;
          function observeBody() {
            if (observer && !observing) {
              observer.observe(document.body, { childList: true, subtree: true });
              observing = true;
            }
          }
          function syncShellGuarded() {
            if (observing) { observer.disconnect(); observing = false; }
            try { syncShell(); } finally { observeBody(); }
          }
          const scheduleSync = () => window.requestAnimationFrame(syncShellGuarded);
          const originalPushState = history.pushState;
          const originalReplaceState = history.replaceState;

          history.pushState = function(...args) {
            const result = originalPushState.apply(this, args);
            scheduleSync();
            return result;
          };

          history.replaceState = function(...args) {
            const result = originalReplaceState.apply(this, args);
            scheduleSync();
            return result;
          };

          observer = new MutationObserver(scheduleSync);
          const startShell = () => {
            // First pass runs syncShell with the observer detached, then attaches
            // it — so the initial branding rewrites don't kick off the loop.
            syncShellGuarded();
          };

          if (document.readyState === "complete") {
            window.setTimeout(startShell, 0);
          } else {
            window.addEventListener("load", () => window.setTimeout(startShell, 0), { once: true });
          }
          window.addEventListener("popstate", scheduleSync);
          window.addEventListener("pageshow", scheduleSync);
        })();
      </script>`,
      { html: true }
    );
  }
}

function isContractorPodPath(pathname) {
  return pathname === CONTRACTORPOD_PREFIX || pathname.startsWith(`${CONTRACTORPOD_PREFIX}/`);
}

function contractorPodUpstreamUrl(requestUrl) {
  const publicUrl = new URL(requestUrl);
  const upstreamUrl = new URL(CONTRACTORPOD_ORIGIN);
  const upstreamPath = publicUrl.pathname.slice(CONTRACTORPOD_PREFIX.length);

  upstreamUrl.pathname = upstreamPath || "/";
  upstreamUrl.search = publicUrl.search;
  return upstreamUrl;
}

function toContractorPodPublicUrl(value) {
  if (!value) return value;

  let rewritten = value
    .replaceAll(CONTRACTORPOD_ORIGIN, CONTRACTORPOD_PUBLIC_BASE)
    .replaceAll(CONTRACTORPOD_CANONICAL_ORIGIN, CONTRACTORPOD_PUBLIC_BASE)
    .replaceAll(encodeURIComponent(CONTRACTORPOD_ORIGIN), encodeURIComponent(CONTRACTORPOD_PUBLIC_BASE))
    .replaceAll(encodeURIComponent(CONTRACTORPOD_CANONICAL_ORIGIN), encodeURIComponent(CONTRACTORPOD_PUBLIC_BASE));

  if (rewritten.startsWith("/") && !rewritten.startsWith("//") && !isContractorPodPath(new URL(rewritten, "https://n7.invalid").pathname)) {
    rewritten = CONTRACTORPOD_PREFIX + (rewritten === "/" ? "" : rewritten);
  }

  return rewritten;
}

function rewriteContractorPodText(body, contentType) {
  let rewritten = body
    .replaceAll(CONTRACTORPOD_ORIGIN, CONTRACTORPOD_PUBLIC_BASE)
    .replaceAll(CONTRACTORPOD_CANONICAL_ORIGIN, CONTRACTORPOD_PUBLIC_BASE)
    .replaceAll(CONTRACTORPOD_ORIGIN.replaceAll("/", "\\/"), CONTRACTORPOD_PUBLIC_BASE.replaceAll("/", "\\/"))
    .replaceAll(CONTRACTORPOD_CANONICAL_ORIGIN.replaceAll("/", "\\/"), CONTRACTORPOD_PUBLIC_BASE.replaceAll("/", "\\/"));
  const directRootPath = new RegExp(`(["'\\\`])\\/(?=(?:${CONTRACTORPOD_ROUTE_PATTERN})(?:[/?#"'\\\`]|$))`, "g");
  const escapedRootPath = new RegExp(`(\\\\["'])\\/(?=(?:${CONTRACTORPOD_ROUTE_PATTERN})(?:[/?#"']|$))`, "g");

  rewritten = rewritten
    .replace(directRootPath, `$1${CONTRACTORPOD_PREFIX}/`)
    .replace(escapedRootPath, `$1${CONTRACTORPOD_PREFIX}/`)
    .replace(new RegExp(`url\\(\\/(?=(?:${CONTRACTORPOD_ROUTE_PATTERN})(?:[/?#)]|$))`, "g"), `url(${CONTRACTORPOD_PREFIX}/`);

  if (/text\/html|text\/x-component|application\/json/i.test(contentType)) {
    rewritten = rewritten
      .replace(/((?:href|src|action|poster)=["'])\/(["'])/gi, `$1${CONTRACTORPOD_PREFIX}$2`)
      .replace(/(["'])\/\1/g, `$1${CONTRACTORPOD_PREFIX}$1`)
      .replace(/(\\["'])\/(\\["'])/g, `$1${CONTRACTORPOD_PREFIX}$2`);
  }

  if (/text\/html/i.test(contentType) && !rewritten.includes("data-n7-contractorpod-bridge")) {
    rewritten = rewritten.replace(/<head([^>]*)>/i, match => `${match}${CONTRACTORPOD_CLIENT_BRIDGE}`);
  }

  return rewritten;
}

function rewriteContractorPodCookie(cookie) {
  return cookie.replace(/;\s*Domain=[^;]+/i, "");
}

function contractorPodRequestHeaders(request) {
  const headers = new Headers(request.headers);
  const origin = headers.get("origin");
  const referer = headers.get("referer");
  const nextUrl = headers.get("next-url");

  if (origin === "https://n7technologies.org" || origin === "https://www.n7technologies.org") {
    headers.set("origin", CONTRACTORPOD_ORIGIN);
  }
  if (referer) {
    headers.set("referer", referer
      .replace(`https://www.n7technologies.org${CONTRACTORPOD_PREFIX}`, CONTRACTORPOD_ORIGIN)
      .replace(`https://n7technologies.org${CONTRACTORPOD_PREFIX}`, CONTRACTORPOD_ORIGIN));
  }
  if (nextUrl && isContractorPodPath(new URL(nextUrl, "https://n7.invalid").pathname)) {
    headers.set("next-url", nextUrl.slice(CONTRACTORPOD_PREFIX.length) || "/");
  }

  headers.set("x-forwarded-host", new URL(CONTRACTORPOD_ORIGIN).host);
  headers.set("x-forwarded-proto", "https");
  return headers;
}

function contractorPodResponseHeaders(response) {
  const headers = new Headers(response.headers);
  const location = headers.get("location");
  const link = headers.get("link");
  const cookies = typeof response.headers.getSetCookie === "function"
    ? response.headers.getSetCookie()
    : [];

  if (location) headers.set("location", toContractorPodPublicUrl(location));
  if (link) {
    headers.set("link", link
      .replaceAll(CONTRACTORPOD_ORIGIN, CONTRACTORPOD_PUBLIC_BASE)
      .replaceAll(CONTRACTORPOD_CANONICAL_ORIGIN, CONTRACTORPOD_PUBLIC_BASE)
      .replace(/<\/(?!\/|contractorpod(?:\/|>))/g, `<${CONTRACTORPOD_PREFIX}/`));
  }

  if (cookies.length > 0) {
    headers.delete("set-cookie");
    for (const cookie of cookies) headers.append("set-cookie", rewriteContractorPodCookie(cookie));
  } else if (headers.has("set-cookie")) {
    headers.set("set-cookie", rewriteContractorPodCookie(headers.get("set-cookie")));
  }

  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");
  return headers;
}

async function proxyContractorPod(request) {
  const upstreamUrl = contractorPodUpstreamUrl(request.url);
  const upstreamRequest = new Request(upstreamUrl, {
    method: request.method,
    headers: contractorPodRequestHeaders(request),
    body: request.method === "GET" || request.method === "HEAD" ? null : request.body,
    redirect: "manual"
  });
  const response = await fetch(upstreamRequest);

  if (response.status === 101) return response;

  const headers = contractorPodResponseHeaders(response);
  const contentType = response.headers.get("content-type") || "";
  const shouldRewrite = [
    "text/html",
    "text/css",
    "text/javascript",
    "text/x-component",
    "application/javascript",
    "application/json",
    "application/xml",
    "text/xml",
    "text/plain"
  ].some(type => contentType.includes(type));

  const hasNullBody = request.method === "HEAD" || [204, 205, 304].includes(response.status);

  if (!shouldRewrite || hasNullBody) {
    return new Response(hasNullBody ? null : response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }

  const body = rewriteContractorPodText(await response.text(), contentType);
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function isHtmlResponse(request, response) {
  const contentType = response.headers.get("content-type") || "";
  return request.method === "GET" && contentType.includes("text/html");
}

function shouldNormalizePublicResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  return [
    "text/html",
    "text/x-component",
    "text/javascript",
    "application/javascript"
  ].some(type => contentType.includes(type));
}

async function normalizePublicResponse(response) {
  if (!shouldNormalizePublicResponse(response)) {
    return response;
  }

  const originalBody = await response.text();
  const normalizedBody = originalBody
    .replace(LEGACY_PUBLIC_EMAIL_PATTERN, FOUNDER_EMAIL)
    .replaceAll(CONTRACTORPOD_ORIGIN, CONTRACTORPOD_PUBLIC_BASE)
    .replaceAll(CONTRACTORPOD_CANONICAL_ORIGIN, CONTRACTORPOD_PUBLIC_BASE)
    .replace(/(?:Primary|Secondary) contact/g, "Founder contact");
  const headers = new Headers(response.headers);

  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");

  return new Response(normalizedBody, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function pageFlags(request) {
  const url = new URL(request.url);
  return {
    homepage: url.pathname === "/",
    contactPage: url.pathname === "/contact",
    aboutPage: url.pathname === "/about",
    servicePage: ["/website-services", "/app-services"].includes(url.pathname)
  };
}

// Forward an app request to the Next.js origin. In production this is the
// `ORIGIN` service binding (the deployed `n7technologies` Worker). For LOCAL
// dev, set the `ORIGIN_URL` var (e.g. http://localhost:3000 running `next dev`)
// so the shell can sit in front of a hot-reloading app and localhost renders
// exactly like prod. Prod never sets ORIGIN_URL, so it always uses the binding.
async function fetchOrigin(request, env) {
  if (env.ORIGIN_URL) {
    const target = new URL(request.url);
    const base = new URL(env.ORIGIN_URL);
    target.protocol = base.protocol;
    target.host = base.host;
    return fetch(new Request(target.toString(), request));
  }
  return env.ORIGIN.fetch(request);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (isContractorPodPath(url.pathname)) {
      return proxyContractorPod(request);
    }

    const authResponse = await authRoutes(request, env);
    if (authResponse) return authResponse;

    if ([COVER_PATH, PROFILE_IMAGE_PATH, HEADER_LOGO_PATH].includes(url.pathname)) {
      return env.ASSETS.fetch(request);
    }

    const response = await normalizePublicResponse(await fetchOrigin(request, env));

    if (!isHtmlResponse(request, response)) {
      return response;
    }

    const flags = pageFlags(request);
    let rewriter = new HTMLRewriter()
      .on("head", new HeadElement(flags))
      .on("body", new SiteBodyElement())
      .on("body > div.w-full.bg-black", new TopBrandBannerElement())
      .on('header > div > a[href="/"]', new HeaderBrandElement())
      .on('footer a[href^="mailto:"]', new FounderMailtoElement());

    if (flags.homepage) {
      rewriter = rewriter
        .on('main a[href="/contact"]', new HomeQuoteLinkElement());
    }

    if (flags.servicePage) {
      rewriter = rewriter
        .on('main a[href^="/contact?subject="]', new ServiceQuoteLinkElement());
    }

    if (flags.contactPage) {
      const founderContactCards = new FounderContactCardsElement();

      rewriter = rewriter
        .on(`main a[href^="mailto:${FOUNDER_EMAIL}"]`, founderContactCards);
    }

    if (flags.aboutPage) {
      const founderPersonalEmailCards = new FounderPersonalEmailCardsElement();

      rewriter = rewriter
        .on(`main a[href="mailto:${FOUNDER_EMAIL}"]`, founderPersonalEmailCards);
    }

    return rewriter.transform(response);
  }
};
