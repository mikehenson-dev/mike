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
let isMoving = false;
let pendingPage = null;


// TRANSITION PANELS (THREE GRADIENT LAYERS AND A LOGO)

const wipe = document.createElement("div");

wipe.className = "wipe";
wipe.setAttribute("aria-hidden", "true");

const layers = [0, 1, 2].map(() => {

    const layer = document.createElement("div");

    layer.className = "wipe-layer";

    wipe.appendChild(layer);

    return layer;

});

const mark = document.createElement("div");

mark.className = "wipe-mark";
mark.textContent = "MH.";

wipe.appendChild(mark);

document.body.appendChild(wipe);


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
        prevButton.textContent = "‹ " + pageLabel(previous);

    }

    if (next) {

        nextButton.dataset.target = next;
        nextButton.textContent = pageLabel(next) + " ›";

    }

}


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

        page.classList.remove("enter");

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


    // Play the entrance animation for this page
    void selectedPage.offsetWidth;

    selectedPage.classList.add("enter");

    currentPage = pageId;

    updatePager(pageId);

}


// GO TO A PAGE WITH A TRANSITION

const DURATION = 450;
const STAGGER = 70;
const EASE = "cubic-bezier(0.65, 0, 0.25, 1)";

function slideLayers(from, to, skew, reverseOrder) {

    return layers.map((layer, index) => {

        const order = reverseOrder ? layers.length - 1 - index : index;

        return layer.animate(
            [
                { transform: "translateX(" + from + "vw) skewX(" + skew + "deg)" },
                { transform: "translateX(" + to + "vw) skewX(" + skew + "deg)" }
            ],
            {
                duration: DURATION,
                delay: order * STAGGER,
                easing: EASE,
                fill: "both"
            }
        );

    });

}

function goToPage(pageId, updateHistory = true) {

    if (!pageOrder.includes(pageId)) {
        return;
    }

    // A transition is running, remember the latest request
    if (isMoving) {

        pendingPage = { pageId, updateHistory };

        return;

    }

    if (pageId === currentPage) {

        navigation.classList.remove("show");

        return;

    }

    // First load or reduced motion: no transition
    if (currentPage === null || reduceMotion) {

        showPage(pageId, updateHistory);

        return;

    }

    isMoving = true;

    // 1 = moving forward, -1 = moving back
    const direction =
        pageOrder.indexOf(pageId) > pageOrder.indexOf(currentPage) ? 1 : -1;

    const skew = -12 * direction;

    navigation.classList.remove("show");

    const running = [];

    // Panels sweep in and cover the screen
    const cover = slideLayers(direction * 160, 0, skew, false);

    const markIn = mark.animate(
        [
            { opacity: 0, transform: "scale(0.9)" },
            { opacity: 1, transform: "scale(1)" }
        ],
        { duration: 300, delay: 250, fill: "both" }
    );

    running.push(...cover, markIn);

    Promise.all([...cover, markIn].map((animation) => animation.finished))
        .then(() => {

            showPage(pageId, updateHistory);

            // Panels sweep away and reveal the new page
            const reveal = slideLayers(0, direction * -160, skew, true);

            const markOut = mark.animate(
                [
                    { opacity: 1, transform: "scale(1)" },
                    { opacity: 0, transform: "scale(1.08)" }
                ],
                { duration: 250, fill: "both" }
            );

            running.push(...reveal, markOut);

            return Promise.all(
                [...reveal, markOut].map((animation) => animation.finished)
            );

        })
        .then(() => {

            running.forEach((animation) => animation.cancel());

        })
        .finally(() => {

            isMoving = false;

            if (pendingPage) {

                const next = pendingPage;

                pendingPage = null;

                goToPage(next.pageId, next.updateHistory);

            }

        });

}


// NAVIGATION LINKS

navLinks.forEach((link) => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const pageId = this.dataset.pageLink;

        goToPage(pageId);

    });

});


// HOME BUTTON AND OTHER PAGE BUTTONS

document.querySelectorAll("[data-go-to]").forEach((button) => {

    button.addEventListener("click", function() {

        const pageId = this.dataset.goTo;

        goToPage(pageId);

    });

});


// MOBILE MENU

menuToggle.addEventListener("click", function() {

    navigation.classList.toggle("show");

});


// EDUCATION / ACHIEVEMENTS TABS (PHONES)

const eduTabs = document.querySelectorAll("[data-edu-tab]");

const eduGrid = document.querySelector(".education-achievements");

eduTabs.forEach((tab) => {

    tab.addEventListener("click", function() {

        eduGrid.dataset.view = this.dataset.eduTab;

        eduTabs.forEach((button) => {

            button.classList.toggle("active", button === this);

        });

    });

});


// ARROW KEYS MOVE BETWEEN PAGES

document.addEventListener("keydown", function(event) {

    const index = pageOrder.indexOf(currentPage);

    if (event.key === "ArrowRight" && index < pageOrder.length - 1) {

        goToPage(pageOrder[index + 1]);

    }

    if (event.key === "ArrowLeft" && index > 0) {

        goToPage(pageOrder[index - 1]);

    }

});


// BROWSER BACK AND FORWARD BUTTONS

window.addEventListener("popstate", function() {

    const pageId = location.hash.replace("#", "") || "home";

    goToPage(pageId, false);

});


// OPEN CORRECT PAGE WHEN WEBSITE LOADS

const initialPage = location.hash.replace("#", "") || "home";

showPage(initialPage, false);
