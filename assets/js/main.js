document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CONFIG
  =============================== */

  const LANG_KEY = "site-language";
  const DEFAULT_LANG = "es";

  /* ===============================
     IDIOMAS (SEGURO Y LIMITADO)
     Solo afecta a elementos .i18n
  =============================== */

  const flags = document.getElementById("flags");

  const setLanguage = (lang) => {
    document.querySelectorAll(".i18n").forEach(el => {
      el.hidden = el.dataset.lang !== lang;
    });
    localStorage.setItem(LANG_KEY, lang);
  };

  if (flags) {
    flags.addEventListener("click", (e) => {
      const item = e.target.closest(".flags__item");
      if (!item) return;
      setLanguage(item.dataset.language);
    });
  }

  setLanguage(localStorage.getItem(LANG_KEY) || DEFAULT_LANG);

  /* ===============================
     TOC (TABLA DE CONTENIDOS)
     Defensivo
  =============================== */

  const tocbox = document.querySelector(".toc-box");
  const headers = document.querySelectorAll(".subject-name");

  if (tocbox && headers.length) {
    headers.forEach(h => {
      const safeId = "toc-" + h.textContent.trim().replace(/\s+/g, "-").toLowerCase();
      h.dataset.tocId = safeId;

      const li = document.createElement("li");
      li.id = safeId;

      const a = document.createElement("a");
      a.textContent = h.textContent;

      li.appendChild(a);
      li.addEventListener("click", () => {
        h.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      tocbox.appendChild(li);
    });
  }

  /* ===============================
     APPEAR ON SCROLL
     (Optimizado y estable)
  =============================== */

  const revealItems = document.querySelectorAll(".subject, .item");

  const onScroll = () => {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    revealItems.forEach(el => {
      const elTop = el.getBoundingClientRect().top + scrollY;
      if (!el.classList.contains("appear") && scrollY > elTop - windowH * 0.85) {
        el.classList.add("appear");
      }
    });

    // TOC active state
    let currentHeader = null;
    headers.forEach(h => {
      const hTop = h.getBoundingClientRect().top + scrollY;
      if (scrollY >= hTop - windowH / 3) {
        currentHeader = h;
      }
    });

    document.querySelectorAll(".toc-box li").forEach(li => li.classList.remove("active"));
document.addEventListener("DOMContentLoaded", () => {

  const FLAGS_KEY = "site-language";
  const flags = document.getElementById("flags");

  const setLanguage = lang => {
    document.querySelectorAll("[data-lang]").forEach(el => {
      el.hidden = el.dataset.lang !== lang;
    });
    localStorage.setItem(FLAGS_KEY, lang);
  };

  flags?.addEventListener("click", e => {
    const item = e.target.closest(".flags__item");
    if (!item) return;
    setLanguage(item.dataset.language);
  });

  setLanguage(localStorage.getItem(FLAGS_KEY) || "es");
});

    if (currentHeader) {
      const active = document.getElementById(currentHeader.dataset.tocId);
      active?.classList.add("active");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // estado inicial
});
