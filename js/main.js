/*
  Progressive enhancement only. Navigation and all core content work with
  this file absent — see the `.js` class gate in css/styles.css, which is
  what actually hides the nav list on small screens (only once JS is known
  to be present).
*/
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  document.querySelectorAll("a.placeholder-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });
})();
