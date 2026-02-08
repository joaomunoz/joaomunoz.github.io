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
