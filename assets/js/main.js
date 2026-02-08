document.addEventListener("DOMContentLoaded", () => {

  /* ====== IDIOMAS ====== */
  const LANG_KEY = "site-language";
  const flags = document.getElementById("flags");

  const setLanguage = lang => {
    document.querySelectorAll("[data-lang]").forEach(el => {
      el.style.display = el.dataset.lang === lang ? "" : "none";
    });
    localStorage.setItem(LANG_KEY, lang);
  };

  flags.addEventListener("click", e => {
    const item = e.target.closest(".flags__item");
    if (!item) return;
    setLanguage(item.dataset.language);
  });

  setLanguage(localStorage.getItem(LANG_KEY) || "es");

  /* ====== TOC ====== */
  const toc = document.querySelector(".toc-box");
  document.querySelectorAll(".subject-name").forEach(h => {
    const li = document.createElement("li");
    li.textContent = h.textContent;
    li.onclick = () => h.scrollIntoView({ behavior: "smooth" });
    toc.appendChild(li);
  });

});
