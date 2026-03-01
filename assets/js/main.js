/**
 * main.js — Lógica del CV multiidioma
 * ─────────────────────────────────────────────────────────────────────────────
 * RESPONSABILIDADES:
 *  1. Detectar preferencia de idioma guardada y redirigir si hace falta.
 *  2. Marcar la bandera del idioma activo.
 *  3. Guardar en localStorage el idioma cuando el usuario hace click.
 *  4. Revelar/ocultar datos de contacto al hacer click en cada ítem.
 *
 * FILOSOFÍA: en vez de tener UNA página que oculta/muestra bloques con JS
 * (lo que causa FOUC y duplica el contenido en el HTML), usamos DOS páginas
 * reales (/es/ y /en/) y navegamos entre ellas con window.location.
 * Esto es más limpio para SEO, accesibilidad y mantenimiento.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Clave usada para persistir la preferencia de idioma en localStorage.
 * Se define como constante para evitar typos si se necesita cambiar.
 * @type {string}
 */
const STORAGE_KEY = "site-language";

/**
 * Mapa de idioma → URL raíz de esa versión del sitio.
 * Si en el futuro se agrega un tercer idioma, solo hay que añadirlo aquí.
 * @type {Object.<string, string>}
 */
const LANG_URLS = {
  es: "/es/",
  en: "/en/",
};

/**
 * Idioma activo: lo lee del atributo `data-lang` inyectado por Jekyll
 * en la etiqueta <script> al momento de generar la página.
 * Esto evita variables globales y acoplamientos frágiles.
 *
 * Ejemplo en el HTML generado:
 *   <script src="/assets/js/main.js" data-lang="es"></script>
 *
 * @type {string}  "es" | "en"
 */
const currentLang = document.currentScript?.dataset.lang ?? "es";


/* ─────────────────────────────────────────────────────────────────────────────
   1. REDIRECCIÓN POR PREFERENCIA GUARDADA
   Se ejecuta ANTES de que el usuario haya interactuado con nada.
   Si el usuario visitó antes el sitio y eligió "en", y ahora llega a "/es/",
   lo mandamos automáticamente a "/en/" para respetar su preferencia.
───────────────────────────────────────────────────────────────────────────── */

(function redirectIfNeeded() {
  const savedLang = localStorage.getItem(STORAGE_KEY);

  // Si no hay preferencia guardada, no hacemos nada (mostramos la página actual).
  if (!savedLang) return;

  // Si la preferencia coincide con la página actual, tampoco hacemos nada.
  if (savedLang === currentLang) return;

  // Si el idioma guardado no tiene URL mapeada (valor inesperado), ignoramos.
  const targetUrl = LANG_URLS[savedLang];
  if (!targetUrl) return;

  // Redirigimos sin agregar una entrada extra al historial del navegador
  // (replace en vez de assign) para que el botón "Atrás" funcione bien.
  window.location.replace(targetUrl);
})();


/* ─────────────────────────────────────────────────────────────────────────────
   Punto de entrada principal: esperamos a que el DOM esté completamente cargado
   antes de manipular cualquier elemento.
───────────────────────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {

  /* ───────────────────────────────────────────────────────────────────────
     2. MARCAR BANDERA ACTIVA
     Añadimos la clase `flags__item--active` a la bandera del idioma actual
     para que CSS pueda resaltarla (borde, opacidad, etc.).
  ─────────────────────────────────────────────────────────────────────── */

  document.querySelectorAll(".flags__item").forEach(flagEl => {
    // Si el atributo data-language del elemento coincide con el idioma actual…
    if (flagEl.dataset.language === currentLang) {
      flagEl.classList.add("flags__item--active");
    }
  });


  /* ───────────────────────────────────────────────────────────────────────
     3. MANEJO DEL CLICK EN BANDERAS — guardar preferencia y navegar
     Los <a> del selector de idioma ya tienen href="/es/" o href="/en/",
     por lo que el navegador navegará solo.
     Nuestro trabajo aquí es ÚNICAMENTE guardar la preferencia en
     localStorage ANTES de que ocurra la navegación, para que cuando cargue
     la nueva página, el paso 1 no la redirija de vuelta.
  ─────────────────────────────────────────────────────────────────────── */

  const flagsNav = document.getElementById("flags");

  flagsNav?.addEventListener("click", e => {
    // Buscamos el ancestro con clase flags__item (permite clicks en la <img>)
    const flagItem = e.target.closest(".flags__item");
    if (!flagItem) return;

    const chosenLang = flagItem.dataset.language;

    // Guardamos la nueva preferencia antes de que el <a> navegue.
    localStorage.setItem(STORAGE_KEY, chosenLang);

    // No llamamos a preventDefault(): dejamos que el <a href> funcione normal.
  });


  /* ───────────────────────────────────────────────────────────────────────
     4. TOGGLE DE DATOS DE CONTACTO
     Cada .info-item muestra/oculta su .info-data al hacer click.
     Solo puede estar abierto un ítem a la vez (cerramos los demás).
     También manejamos "Enter" y "Space" para accesibilidad de teclado,
     ya que el elemento es un <li> con role="button".
  ─────────────────────────────────────────────────────────────────────── */

const infoItems = document.querySelectorAll(".info-item:not(.info-item--download)");

  infoItems.forEach(item => {

    /**
     * Alterna la visibilidad del ítem clicado y cierra los demás.
     */
    function toggleItem() {
      const isAlreadyOpen = item.classList.contains("active");

      // Cerramos TODOS los ítems primero (accordion: solo uno abierto a la vez).
      infoItems.forEach(el => {
        el.classList.remove("active");
        el.setAttribute("aria-expanded", "false");
      });

      // Si el ítem estaba cerrado, lo abrimos; si estaba abierto, ya quedó cerrado.
      if (!isAlreadyOpen) {
        item.classList.add("active");
        item.setAttribute("aria-expanded", "true");
      }
    }

    // Click con el ratón o tap en móvil.
    item.addEventListener("click", toggleItem);

    // Soporte de teclado: Enter y Space activan el toggle
    // (comportamiento esperado para elements con role="button").
    item.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); // Evita el scroll al presionar Space.
        toggleItem();
      }
    });

  });

}); // fin DOMContentLoaded 