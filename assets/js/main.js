document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     TOC (Tabla de contenidos)
  =============================== */

  const tocBox = document.querySelector(".toc-box");
  const headers = document.querySelectorAll(".subject-name");

  headers.forEach((h, index) => {
    const id = `section-${index}`;
    h.id = id;

    const li = document.createElement("li");
    li.dataset.target = id;

    const a = document.createElement("a");
    a.textContent = h.textContent;
    a.href = `#${id}`;

    li.appendChild(a);
    tocBox.appendChild(li);

    li.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ===============================
     Animaciones + TOC activo
  =============================== */

  const observerOptions = {
    root: null,
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0
  };

  const appearObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".subject, .item").forEach(el => {
    appearObserver.observe(el);
  });

  const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      document.querySelectorAll(".toc-box li").forEach(li => {
        li.classList.toggle("active", li.dataset.target === id);
      });
    });
  }, observerOptions);

  headers.forEach(h => tocObserver.observe(h));

  /* ===============================
     Idiomas
  =============================== */

  const flags = document.getElementById("flags");
  const LANG_KEY = "site-language";

  const setLanguage = (lang) => {
    document.querySelectorAll("[data-lang]").forEach(el => {
      el.hidden = el.dataset.lang !== lang;
    });
    localStorage.setItem(LANG_KEY, lang);
  };

  flags.addEventListener("click", (e) => {
    const item = e.target.closest(".flags__item");
    if (!item) return;
    setLanguage(item.dataset.language);
  });

  // Idioma inicial
  const savedLang = localStorage.getItem(LANG_KEY) || "es";
  setLanguage(savedLang);

});
