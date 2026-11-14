
// GET WEBSITE ELEMENTS

const pages = document.querySelectorAll(".page-panel");

const navLinks = document.querySelectorAll("[data-page-link]");

const navigation = document.getElementById("navigation");

const menuToggle = document.getElementById("menuToggle");


// SHOW SELECTED PAGE

function showPage(pageId, updateHistory = true) {

    const selectedPage = document.getElementById(pageId);

    // Check if the selected page exists
    if (
        !selectedPage ||
        !selectedPage.classList.contains("page-panel")
    ) {
        return;
    }

    // Hide all other pages
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


    // Update URL
    if (updateHistory && location.hash !== "#" + pageId) {

        history.pushState(null, "", "#" + pageId);

    }


    // Reset page scroll position
    selectedPage.scrollTop = 0;

}


// NAVIGATION LINKS

navLinks.forEach((link) => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const pageId = this.dataset.pageLink;

        showPage(pageId);

    });

});


// HOME BUTTON AND OTHER PAGE BUTTONS

document.querySelectorAll("[data-go-to]").forEach((button) => {

    button.addEventListener("click", function() {

        const pageId = this.dataset.goTo;

        showPage(pageId);

    });

});


// MOBILE MENU

menuToggle.addEventListener("click", function() {

    navigation.classList.toggle("show");

});


// BROWSER BACK AND FORWARD BUTTONS

window.addEventListener("popstate", function() {

    const pageId = location.hash.replace("#", "") || "home";

    showPage(pageId, false);

});


// OPEN CORRECT PAGE WHEN WEBSITE LOADS

const initialPage = location.hash.replace("#", "") || "home";

showPage(initialPage, false);
