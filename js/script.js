/* =========================================================
   JAMOIR GRAND — Interactions
   ========================================================= */

(function () {
  "use strict";

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const toTop = document.getElementById("toTop");
  const heroVideo = document.getElementById("heroVideo");
  const revealItems = document.querySelectorAll(".reveal");

  /* ---------- Header state ---------- */

  const updateHeader = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle("is-scrolled", scrolled);
    toTop.classList.toggle("is-visible", window.scrollY > 700);
  };

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------- Mobile menu ---------- */

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Scroll reveal ---------- */

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  /* Safety net: never leave content hidden if intersection callbacks are unavailable. */
  setTimeout(() => {
    const anyVisible = Array.from(revealItems).some((el) => el.classList.contains("is-visible"));
    if (!anyVisible) revealItems.forEach((el) => el.classList.add("is-visible"));
  }, 1600);

  /* ---------- Active nav link ---------- */

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav a");

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* ---------- Hero video: silent, seamless, never-ending loop ---------- */

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;

    const keepPlaying = () => {
      const attempt = heroVideo.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
    };

    keepPlaying();

    /* Restart cleanly if a browser fires "ended" instead of looping. */
    heroVideo.addEventListener("ended", () => {
      heroVideo.currentTime = 0;
      keepPlaying();
    });

    /* Recover from buffering/stalls and tab switches. */
    heroVideo.addEventListener("stalled", keepPlaying);
    heroVideo.addEventListener("pause", () => {
      if (!heroVideo.ended) keepPlaying();
    });
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) keepPlaying();
    });
  }

  /* ---------- Gallery lightbox ---------- */

  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lbImage");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");
  let currentIndex = 0;

  const showImage = (index) => {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const img = galleryItems[currentIndex].querySelector("img");
    lbImage.src = img.src;
    lbImage.alt = img.alt;
  };

  const openLightbox = (index) => {
    showImage(index);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", () => showImage(currentIndex - 1));
  lbNext.addEventListener("click", () => showImage(currentIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });

  /* ---------- Back to top ---------- */

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Label third-party Instagram embeds ---------- */

  const labelEmbeds = () => {
    document.querySelectorAll("iframe.instagram-media").forEach((frame) => {
      if (!frame.hasAttribute("title")) frame.setAttribute("title", "Instagram reel from JA'MOIR Grand");
    });
  };

  labelEmbeds();

  if ("MutationObserver" in window) {
    new MutationObserver(labelEmbeds).observe(document.body, { childList: true, subtree: true });
  }

  /* ---------- Footer year ---------- */

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
