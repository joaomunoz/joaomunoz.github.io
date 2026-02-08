document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "site-language";
  const flags = document.getElementById("flags");

  function setLanguage(lang) {
    document.querySelectorAll("[data-lang]").forEach(el => {
      el.hidden = el.dataset.lang !== lang;
    });
    localStorage.setItem(STORAGE_KEY, lang);
  }

  // Idioma por defecto: español
  const savedLang = localStorage.getItem(STORAGE_KEY) || "es";
  setLanguage(savedLang);

  // Click en banderas (si existen)
  if (flags) {
    flags.addEventListener("click", e => {
      const item = e.target.closest(".flags__item");
      if (!item) return;
      setLanguage(item.dataset.language);
    });
  }
});
