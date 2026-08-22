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

  /* ---------- Wildlife sprites: sage grouse & pronghorn ----------
     Decorative only (see aria-hidden markup in index.html). The sprite
     sheets themselves (frame count, frame size) are referenced from CSS,
     not here — see the "Wildlife sprites" comment in css/styles.css for
     the steps()/background-size math if you swap in art with a different
     frame count. This config only holds the behavioral/timing values JS
     actually needs (emerge delay, speech-bubble cycle, run/graze timing).
     See the READMEs in assets/sprites/ (one per creature folder) for
     asset details. */
  var WILDLIFE_CONFIG = {
    sageGrouse: {
      emergeDelay: 1200,
      firstBubbleDelay: 5000,
      bubbleInterval: 27000,
      bubbleVisibleFor: 4500,
      lines: [
        "Any questions?",
        "Welcome to the field.",
        "Ask me about my research."
      ]
    },
    pronghorn: {
      firstRunDelay: 6000,
      speedPxPerSec: 130,
      grazePauseMin: 2000,
      grazePauseMax: 4000,
      cooldownMin: 45000,
      cooldownMax: 90000
    }
  };

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var narrowViewport = window.matchMedia("(max-width: 700px)").matches;

  function initSageGrouse() {
    var scene = document.querySelector(".sage-grouse-scene");
    var bubble = scene ? scene.querySelector("[data-grouse-bubble]") : null;
    if (!scene || !bubble) return;

    var cfg = WILDLIFE_CONFIG.sageGrouse;

    setTimeout(function () {
      scene.classList.add("is-visible");

      var lineIndex = 0;
      function showBubble() {
        bubble.textContent = cfg.lines[lineIndex % cfg.lines.length];
        lineIndex++;
        bubble.classList.add("is-shown");
        setTimeout(function () {
          bubble.classList.remove("is-shown");
        }, cfg.bubbleVisibleFor);
      }

      setTimeout(function () {
        showBubble();
        setInterval(showBubble, cfg.bubbleInterval);
      }, cfg.firstBubbleDelay);
    }, cfg.emergeDelay);
  }

  function initPronghorn() {
    // Reduced motion / narrow viewports: CSS already hides the element;
    // skip scheduling any of the timers/transitions below entirely.
    if (reducedMotion || narrowViewport) return;

    var pos = document.querySelector(".pronghorn-runner__pos");
    if (!pos) return;

    var cfg = WILDLIFE_CONFIG.pronghorn;

    function randomBetween(min, max) {
      return min + Math.random() * (max - min);
    }

    function moveTo(x, callback) {
      var current = pos.getBoundingClientRect().left;
      var distance = Math.abs(x - current);
      var duration = Math.max(distance / cfg.speedPxPerSec, 0.3);
      pos.style.transitionDuration = duration + "s";

      var done = false;
      function onEnd() {
        if (done) return;
        done = true;
        pos.removeEventListener("transitionend", onEnd);
        callback();
      }
      pos.addEventListener("transitionend", onEnd, { once: true });
      requestAnimationFrame(function () {
        pos.style.transform = "translateX(" + x + "px)";
      });
    }

    function graze(callback) {
      pos.classList.add("is-grazing");
      setTimeout(function () {
        pos.classList.remove("is-grazing");
        callback();
      }, randomBetween(cfg.grazePauseMin, cfg.grazePauseMax));
    }

    function runOnce() {
      var viewportWidth = window.innerWidth;
      var waypoint1 = viewportWidth * randomBetween(0.3, 0.42);
      var waypoint2 = viewportWidth * randomBetween(0.6, 0.75);
      var exitPoint = viewportWidth + 80;

      // Reset instantly to the off-screen start before each run.
      pos.style.transitionDuration = "0s";
      pos.style.transform = "translateX(-80px)";

      requestAnimationFrame(function () {
        moveTo(waypoint1, function () {
          graze(function () {
            moveTo(waypoint2, function () {
              graze(function () {
                moveTo(exitPoint, function () {
                  var cooldown = randomBetween(cfg.cooldownMin, cfg.cooldownMax);
                  setTimeout(runOnce, cooldown);
                });
              });
            });
          });
        });
      });
    }

    setTimeout(runOnce, cfg.firstRunDelay);
  }

  initSageGrouse();
  initPronghorn();
  /* ---------- END Wildlife sprites ---------- */
})();
