
const pages = document.querySelectorAll(".page-panel");
const navLinks = document.querySelectorAll("[data-page-link]");

const navigation = document.getElementById("navigation");
const menuToggle = document.getElementById("menuToggle");

function showPage(pageId, updateHistory = true) {
    const selectedPage = document.getElementById(pageId);

    if (!selectedPage || !selectedPage.classList.contains("page-panel")) {
        return;
    }

    // Hide all pages except the selected page
    pages.forEach((page) => {
        page.hidden = page.id !== pageId;
    });

    // Update active navigation link
    navLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.dataset.pageLink === pageId
        );
    });

    // Close mobile navigation
    navigation.classList.remove("show");

    // Update browser URL
    if (updateHistory && location.hash !== "#" + pageId) {
        history.pushState(null, "", "#" + pageId);
    }

    // Return selected page to the top
    selectedPage.scrollTop = 0;
}


// Navigation links
navLinks.forEach((link) => {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const pageId = this.dataset.pageLink;
        showPage(pageId);
    });
});


// Buttons that navigate to another page
document.querySelectorAll("[data-go-to]").forEach((button) => {
    button.addEventListener("click", function() {
        showPage(this.dataset.goTo);
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


// Open the correct page when website loads
const initialPage = location.hash.replace("#", "") || "home";
showPage(initialPage, false);
