
// Get all website pages and navigation links
const pages = document.querySelectorAll(".page-panel");
const navLinks = document.querySelectorAll("[data-page-link]");

const navigation = document.getElementById("navigation");
const menuToggle = document.getElementById("menuToggle");

// Function to switch pages
function showPage(pageId, updateHistory = true) {

    const selectedPage = document.getElementById(pageId);

    if (!selectedPage) {
        return;
    }

    // Hide all pages except the selected one
    pages.forEach(page => {
        page.hidden = page.id !== pageId;
    });

    // Update active navigation link
    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.pageLink === pageId
        );
    });

    // Close mobile navigation
    navigation.classList.remove("show");

    // Update website URL
    if (updateHistory) {
        history.pushState(null, "", "#" + pageId);
    }
}

// Navigation button clicks
navLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const pageId = this.dataset.pageLink;

        showPage(pageId);

    });

});

// Mobile menu
menuToggle.addEventListener("click", function() {

    navigation.classList.toggle("show");

});

// Browser back and forward buttons
window.addEventListener("popstate", function() {

    const pageId = location.hash.replace("#", "") || "home";

    showPage(pageId, false);

});

// Load the correct page
window.addEventListener("DOMContentLoaded", function() {

    const pageId = location.hash.replace("#", "") || "home";

    showPage(pageId, false);

});
