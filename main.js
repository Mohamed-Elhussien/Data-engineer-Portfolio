/**
 * ═══════════════════════════════════════════════════════════════
 * NOURELDEEN MOHAMED — Portfolio | main.js
 * Global JavaScript: Navbar, Typewriter, Scroll Reveal, Skills
 * ═══════════════════════════════════════════════════════════════
 */

(function () {
  "use strict";

  // ─────────────────────────────────────────────
  // 1. MOBILE MENU TOGGLE
  // ─────────────────────────────────────────────
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");

  if (mobileMenuBtn && mobileMenu) {
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener("click", function () {
      isMenuOpen = !isMenuOpen;
      mobileMenu.classList.toggle("hidden", !isMenuOpen);

      // Animate hamburger to X
      const spans = hamburgerIcon.querySelectorAll("span");
      if (isMenuOpen) {
        spans[0].style.transform = "translateY(4px) rotate(45deg)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "translateY(-4px) rotate(-45deg)";
        spans[2].style.width = "1.25rem";
      } else {
        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";
        spans[2].style.width = "0.875rem";
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        isMenuOpen = false;
        mobileMenu.classList.add("hidden");
        const spans = hamburgerIcon.querySelectorAll("span");
        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";
        spans[2].style.width = "0.875rem";
      });
    });
  }

  // ─────────────────────────────────────────────
  // 2. NAVBAR SCROLL EFFECT
  // ─────────────────────────────────────────────
  const navbar = document.getElementById("navbar");

  if (navbar) {
    let lastScrollY = 0;
    let ticking = false;

    function handleNavbarScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        navbar.style.backgroundColor = "rgba(15, 15, 17, 0.95)";
        navbar.style.borderBottomColor = "rgba(255, 255, 255, 0.08)";
        navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.3)";
      } else {
        navbar.style.backgroundColor = "rgba(15, 15, 17, 0.8)";
        navbar.style.borderBottomColor = "rgba(255, 255, 255, 0.05)";
        navbar.style.boxShadow = "none";
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(handleNavbarScroll);
        ticking = true;
      }
    });
  }

  // ─────────────────────────────────────────────
  // 3. TYPEWRITER EFFECT
  // ─────────────────────────────────────────────
  const typewriterElement = document.getElementById("typewriter");

  if (typewriterElement) {
    const roles = [
      "Data Engineer",
      "Backend Developer",
      "API Architect",
      "CS Graduate",
      "Pipeline Builder",
      "System Designer",
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        // Remove characters
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        // Add characters
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      // Word complete
      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before next word
      }

      setTimeout(typeWriter, typingSpeed);
    }

    // Start typewriter after a small delay
    setTimeout(typeWriter, 1000);
  }

  // ─────────────────────────────────────────────
  // 4. SCROLL REVEAL ANIMATION
  // ─────────────────────────────────────────────
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-element");

    if (revealElements.length === 0) return;

    // Set initial state
    revealElements.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition =
        "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Stagger the animation slightly
          const delay = Array.from(revealElements).indexOf(entry.target) % 6;
          setTimeout(function () {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, delay * 80);

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ─────────────────────────────────────────────
  // 5. SKILL BARS ANIMATION
  // ─────────────────────────────────────────────
  function initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-bar");

    if (skillBars.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute("data-width");

          setTimeout(function () {
            bar.style.transition = "width 1.5s cubic-bezier(0.16, 1, 0.3, 1)";
            bar.style.width = targetWidth + "%";
          }, 200);

          observer.unobserve(bar);
        }
      });
    }, observerOptions);

    skillBars.forEach(function (bar) {
      observer.observe(bar);
    });
  }

  // ─────────────────────────────────────────────
  // 6. CONTACT FORM HANDLING
  // ─────────────────────────────────────────────
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = document.getElementById("contact-submit");
      const successMessage = document.getElementById("form-success");
      const originalText = submitBtn.innerHTML;

      // Loading state
      submitBtn.innerHTML =
        '<svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Sending...</span>';
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      // Simulate form submission
      setTimeout(function () {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";

        // Show success message
        successMessage.classList.remove("hidden");
        successMessage.style.opacity = "0";
        successMessage.style.transform = "translateY(10px)";
        successMessage.style.transition = "all 0.5s ease";

        setTimeout(function () {
          successMessage.style.opacity = "1";
          successMessage.style.transform = "translateY(0)";
        }, 50);

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(function () {
          successMessage.style.opacity = "0";
          successMessage.style.transform = "translateY(10px)";
          setTimeout(function () {
            successMessage.classList.add("hidden");
          }, 500);
        }, 5000);
      }, 1500);
    });
  }

  // ─────────────────────────────────────────────
  // 7. SMOOTH SCROLL FOR ANCHOR LINKS
  // ─────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ─────────────────────────────────────────────
  // 8. INITIALIZE ALL
  // ─────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    initScrollReveal();
    initSkillBars();
  });

  // If DOM is already loaded (deferred scripts)
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    initScrollReveal();
    initSkillBars();
  }
})();
