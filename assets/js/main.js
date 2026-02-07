document.addEventListener('DOMContentLoaded', function () {

  /* ===============================
     TOC (MISMA LÓGICA ORIGINAL)
  =============================== */

  const tocbox = document.querySelector('.toc-box');
  const headers = document.querySelectorAll('.subject-name');

  headers.forEach((h) => {
    const safeId = "toc-id-" + h.textContent.trim().replace(/\s+/g, "-");
    h.dataset.tocId = safeId;

    const tocItem = document.createElement("li");
    tocItem.id = safeId;

    const itemLink = document.createElement("a");
    itemLink.textContent = h.textContent;

    tocItem.append(itemLink);

    tocItem.addEventListener('click', () => {
      h.scrollIntoView({ behavior: 'smooth' });
    });

    tocbox.append(tocItem);
  });

  /* ===============================
     APPEAR (MISMA LÓGICA VISUAL)
  =============================== */

  const contents = document.querySelectorAll('.subject, .item');

  const onScroll = () => {
    const scrollPos = document.documentElement.scrollTop;
    const wh = window.innerHeight;

    let currHead;

    headers.forEach(h => {
      const headPos = h.getBoundingClientRect().top + window.scrollY - wh / 2;
      if (scrollPos > headPos) currHead = h;
    });

    contents.forEach(c => {
      const contentPos = c.getBoundingClientRect().top + window.scrollY - wh;
      if (!c.classList.contains("appear") && scrollPos > contentPos) {
        c.classList.add("appear");
      }
    });

    document.querySelectorAll('.toc-box li').forEach(li => li.classList.remove('active'));

    if (currHead) {
      const active = document.getElementById(currHead.dataset.tocId);
      if (active) active.classList.add('active');
    }
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ===============================
     IDIOMAS (SEGURO)
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

  setLanguage(localStorage.getItem(LANG_KEY) || "es");

});
