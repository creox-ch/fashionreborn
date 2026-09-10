/* FASHION REBORN — canonical chrome behaviour (progressive enhancement).
   Burger toggle for the mobile menu + newsletter "sent" state.
   The header/footer render fine without this file; it only adds interactivity. */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(function () {
    // Mobile burger
    var burger = document.querySelector(".fp-top__burger");
    var menu = document.querySelector(".fp-top__menu");
    if (menu && !menu.querySelector(".fp-top__menu-foot")) {
      /* подвал мобильного меню: призыв + короткая информация из футера.
         Ссылки абсолютные от корня — на сайте cleanUrls, и вычислять «../»
         для страниц в подпапках больше не нужно.
         Призыв ведёт на билеты: до 10.08.2026 здесь была «Зарегистрироваться
         на форум» — она открывала форму ранней регистрации, которая после
         старта продаж конкурировала с покупкой. */
      var foot = document.createElement("div");
      foot.className = "fp-top__menu-foot";
      var hasCta = !!menu.querySelector(".fp-top__link--cta");
      foot.innerHTML =
        '<a class="fp-top__menu-ig" href="https://www.instagram.com/fashionreborn.ch/" target="_blank" rel="noopener">Instagram · @fashionreborn.ch</a>' +
        '<p class="fp-top__menu-legal">FASHION REBORN · 27.09.2026 · Baden<br>© 2026 FASHION REBORN — все права защищены</p>';
      menu.appendChild(foot);
    }
    if (burger && menu) {
      /* Иконку рисует CSS по aria-expanded (полоски на ::before/::after).
         Текст в кнопку не пишем: текстовый глиф убран из разметки как мёртвый,
         и возвращать его отсюда нельзя — он снова окажется в DOM. */
      burger.addEventListener("click", function () {
        var open = menu.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
      });
      menu.querySelectorAll("a:not(.fp-top__menu-ig)").forEach(function (a) {
        a.addEventListener("click", function () {
          menu.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          burger.setAttribute("aria-label", "Открыть меню");
        });
      });
    }
    // Newsletter form → "sent" message
    var form = document.querySelector(".fp-foot__form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var done = document.createElement("p");
        done.className = "fp-foot__done";
        done.textContent = "Спасибо! Напишем, когда будут новости о программе и спикерах.";
        var note = form.parentNode.querySelector(".fp-foot__note");
        if (note) note.remove();
        form.replaceWith(done);
      });
    }
  });
})();
