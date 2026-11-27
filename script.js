// GET WEBSITE ELEMENTS

const pages = document.querySelectorAll(".page-panel");

const navLinks = document.querySelectorAll("[data-page-link]");

const navigation = document.getElementById("navigation");

const menuToggle = document.getElementById("menuToggle");

const footer = document.querySelector("footer");

const pageOrder = Array.from(pages).map((page) => page.id);

const pageLabels = {
    home: "Home",
    personal: "Personal Info",
    education: "Achievements",
    projects: "Projects",
    family: "Family",
    contact: "Contact"
};

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

let currentPage = null;


// BACK / NEXT BUTTONS IN THE FOOTER

const prevButton = document.createElement("button");
const nextButton = document.createElement("button");

prevButton.className = "pager-btn";
nextButton.className = "pager-btn";

prevButton.type = "button";
nextButton.type = "button";

footer.insertBefore(prevButton, footer.firstChild);
footer.appendChild(nextButton);

prevButton.addEventListener("click", function() {

    goToPage(this.dataset.target);

});

nextButton.addEventListener("click", function() {

    goToPage(this.dataset.target);

});

function pageLabel(pageId) {

    return pageLabels[pageId] || pageId;

}

function updatePager(pageId) {

    const index = pageOrder.indexOf(pageId);

    const previous = pageOrder[index - 1];
    const next = pageOrder[index + 1];

    prevButton.hidden = !previous;
    nextButton.hidden = !next;

    if (previous) {

        prevButton.dataset.target = previous;
        prevButton.textContent = "‹ "
        
