import { r as reactExports, j as jsxDevRuntimeExports } from "./vendor-CuCSxqBp.js";
import { B as Button } from "./main-DyAg0H93.js";
import "./preload-DYXzOcNn.js";
const COOKIE_CONSENT_KEY = "c2_analytics_consent";
const COOKIE_CONSENT_EXPIRES_DAYS = 365;
function initC2Tracking() {
  if (typeof window === "undefined" || window.__SCC_INIT__) return;
  window.__SCC_INIT__ = true;
  window._signalsDataLayer = window._signalsDataLayer || [];
  const track = (eid, type, label, props) => {
    window._signalsDataLayer.push({
      schema: "add_event",
      version: "v1",
      data: { eid, type, event_label: label, custom_properties: { ...props, timestamp: (/* @__PURE__ */ new Date()).toISOString(), source: "airo-app-builder" } }
    });
  };
  const getSection = (el) => {
    if (el.closest("header")) return "header";
    if (el.closest("footer")) return "footer";
    if (el.closest("nav")) return "nav";
    if (el.closest("main")) return "main";
    return "page";
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
  };
  track("airo.website.session", "session", "start", { page_path: location.pathname, referrer: document.referrer });
  track("airo.website.pageview", "pageview", document.title, { page_path: location.pathname, referrer: document.referrer });
  document.addEventListener("click", (e) => {
    var _a, _b, _c;
    const el = (_a = e.target) == null ? void 0 : _a.closest('a, button, [role="button"]');
    if (!el) return;
    const text = ((_c = (_b = el.textContent) == null ? void 0 : _b.trim()) == null ? void 0 : _c.substring(0, 100)) || "";
    const href = el.href || "";
    const type = el.tagName.toLowerCase() === "a" ? "link" : "button";
    let isExternal;
    if (href) {
      try {
        isExternal = new URL(href, location.origin).origin !== location.origin;
      } catch {
      }
    }
    track("airo.website.click", "click", text || type, {
      element_type: type,
      element_text: text,
      element_id: el.id || void 0,
      section: getSection(el),
      page_path: location.pathname,
      page_title: document.title,
      href: href || void 0,
      is_external: href ? isExternal : void 0,
      device: getDevice(),
      viewport_width: window.innerWidth
    });
  }, true);
  let lastUrl = location.href;
  const trackPage = () => {
    if (location.href !== lastUrl) {
      track("airo.website.pageview", "pageview", document.title, { page_path: location.pathname, referrer: lastUrl });
      lastUrl = location.href;
    }
  };
  window.addEventListener("popstate", trackPage);
  const push = history.pushState, replace = history.replaceState;
  history.pushState = (...args) => {
    push.apply(history, args);
    setTimeout(trackPage, 0);
  };
  history.replaceState = (...args) => {
    replace.apply(history, args);
    setTimeout(trackPage, 0);
  };
  const h = location.hostname;
  const url = h === "localhost" || h.includes("dev-airoapp") ? "https://img1.dev-wsimg.com/signals/js/clients/scc-c2/scc-c2.js" : h.includes("test-airoapp") ? "https://img1.test-wsimg.com/signals/js/clients/scc-c2/scc-c2.min.js" : "https://img1.wsimg.com/signals/js/clients/scc-c2/scc-c2.min.js";
  const script = document.createElement("script");
  script.src = url;
  script.async = true;
  document.head.appendChild(script);
}
function CookieBanner() {
  const [showBanner, setShowBanner] = reactExports.useState(false);
  const [isLoaded, setIsLoaded] = reactExports.useState(false);
  reactExports.useEffect(function checkConsent() {
    if (typeof window === "undefined") return;
    const consentData = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consentData) {
      setShowBanner(true);
      setIsLoaded(true);
      return;
    }
    try {
      const consent = JSON.parse(consentData);
      const daysSinceConsent = (Date.now() - consent.timestamp) / (1e3 * 60 * 60 * 24);
      if (daysSinceConsent > COOKIE_CONSENT_EXPIRES_DAYS) {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        setShowBanner(true);
      } else if (consent.analytics) {
        initC2Tracking();
      }
    } catch {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      setShowBanner(true);
    }
    setIsLoaded(true);
  }, []);
  function saveConsent(analytics) {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ analytics, timestamp: Date.now() }));
    if (analytics) initC2Tracking();
    setShowBanner(false);
  }
  function revokeConsent() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setShowBanner(true);
  }
  reactExports.useEffect(function exposeRevokeFunction() {
    if (typeof window === "undefined") return;
    window.revokeAnalyticsConsent = revokeConsent;
    return () => {
      delete window.revokeAnalyticsConsent;
    };
  }, []);
  if (!isLoaded || !showBanner) return null;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg",
      role: "alertdialog",
      "aria-live": "polite",
      "aria-label": "Cookie consent banner",
      "aria-describedby": "cookie-banner-description",
      "data-dev-file": "/app/src/components/CookieBanner.tsx",
      "data-dev-line": 169,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8", "data-dev-file": "/app/src/components/CookieBanner.tsx", "data-dev-line": 176, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", "data-dev-file": "/app/src/components/CookieBanner.tsx", "data-dev-line": 177, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1", "data-dev-file": "/app/src/components/CookieBanner.tsx", "data-dev-line": 178, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-sm font-semibold text-gray-900 mb-1", "data-dev-file": "/app/src/components/CookieBanner.tsx", "data-dev-line": 179, children: "Cookie Consent" }, void 0, false, {
            fileName: "/app/src/components/CookieBanner.tsx",
            lineNumber: 179,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { id: "cookie-banner-description", className: "text-sm text-gray-600", "data-dev-file": "/app/src/components/CookieBanner.tsx", "data-dev-line": 180, children: [
            "We serve cookies. We use tools, such as cookies, to enable essential services and functionality on our site and to collect data on how visitors interact with our site, products and services. By clicking Accept, you agree to our use of these tools for advertising, analytics and support.",
            " ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "https://www.godaddy.com/legal/agreements/privacy-policy", className: "text-blue-600 hover:text-blue-800 underline", target: "_blank", rel: "noopener noreferrer", "data-dev-file": "/app/src/components/CookieBanner.tsx", "data-dev-line": 182, children: "Learn more" }, void 0, false, {
              fileName: "/app/src/components/CookieBanner.tsx",
              lineNumber: 182,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/components/CookieBanner.tsx",
            lineNumber: 180,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/CookieBanner.tsx",
          lineNumber: 178,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 flex-shrink-0", "data-dev-file": "/app/src/components/CookieBanner.tsx", "data-dev-line": 185, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: "secondary", onClick: () => saveConsent(false), className: "whitespace-nowrap", "data-dev-file": "/app/src/components/CookieBanner.tsx", "data-dev-line": 186, children: "Decline" }, void 0, false, {
            fileName: "/app/src/components/CookieBanner.tsx",
            lineNumber: 186,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", onClick: () => saveConsent(true), className: "whitespace-nowrap", autoFocus: true, "data-dev-file": "/app/src/components/CookieBanner.tsx", "data-dev-line": 187, children: "Accept" }, void 0, false, {
            fileName: "/app/src/components/CookieBanner.tsx",
            lineNumber: 187,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/components/CookieBanner.tsx",
          lineNumber: 185,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/components/CookieBanner.tsx",
        lineNumber: 177,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "/app/src/components/CookieBanner.tsx",
        lineNumber: 176,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/src/components/CookieBanner.tsx",
      lineNumber: 169,
      columnNumber: 5
    },
    this
  );
}
export {
  CookieBanner as default
};
