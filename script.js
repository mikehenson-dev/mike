
/* =================================
   MHA PORTFOLIO NAVIGATION
================================= */

document.addEventListener("DOMContentLoaded", () => {

  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav a[data-page]");
  const nav = document.querySelector(".nav");
  const menuToggle = document.querySelector(".menu-toggle");

  // Display selected page
  function showPage(pageName) {

    const target = document.getElementById(pageName);

    // Fallback to homepage
    if (!target || !target.classList.contains("page")) {
      pageName = "home";
    }

    // Hide all pages
    pages.forEach(page => {
      page.classList.remove("active");
    });

    // Show selected page
    document.getElementById(pageName).classList.add("active");

    // Update active navigation link
    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.dataset.page === pageName
      );
    });

    // Close mobile navigation
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";

    // Return to top of page
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // Handle navigation clicks
  function handleNavigation(event) {

    const link = event.target.closest('a[href^="#"]');

    if (!link) return;

    const pageName = link.getAttribute("href").slice(1);

    if (!document.getElementById(pageName)?.classList.contains("page")) {
      return;
    }

    event.preventDefault();

    if (window.location.hash !== "#" + pageName) {
      history.pushState(null, "", "#" + pageName);
    }

    showPage(pageName);
  }

  // All internal navigation links
  document.addEventListener("click", handleNavigation);

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";

  });

  // Browser back and forward buttons
  window.addEventListener("popstate", () => {

    const pageName = window.location.hash.slice(1) || "home";

    showPage(pageName);

  });

  // Load correct page when opening a direct URL
  const initialPage = window.location.hash.slice(1) || "home";

  showPage(initialPage);

  // Automatically update copyright year
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
