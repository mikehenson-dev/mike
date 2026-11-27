// GET WEBSITE ELEMENTS

const pages = document.querySelectorAll(".page-panel");

const navLinks = document.querySelectorAll("[data-page-link]");

const navigation = document.getElementById("navigation");

const menuToggle = document.getElementById("menuToggle");

const pageOrder = Array.from(pages).map((page) => page.id);

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

let currentPage = null;
let isMoving = false;
let pendingPage = null;


// LOAD NEW FONTS AND TRANSITION STYLES

function addStylesheet(href) {

    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = href;

    document.head.appendChild(link);

}

addStylesheet(
    "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Instrument+Sans:wght@400;500;600;700&display=swap"
);

addStylesheet("transitions.css");


// WIPE PANEL USED FOR PAGE TRANSITIONS

const wipe = document.createElement("div");

wipe.className = "wipe";
wipe.setAttribute("aria-hidden", "true");
wipe.textContent = "MH.";

document.body.appendChild(wipe);


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

}


// GO TO A PAGE WITH A TRANSITION

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

    // First load or reduced motion: no wipe
    if (currentPage === null || reduceMotion) {

        showPage(pageId, updateHistory);

        return;

    }

    isMoving = true;

    // 1 = moving forward, -1 = moving back
    const direction =
        pageOrder.indexOf(pageId) > pageOrder.indexOf(currentPage) ? 1 : -1;

    navigation.classList.remove("show");

    const options = {
        duration: 420,
        easing: "cubic-bezier(0.7, 0, 0.3, 1)",
        fill: "forwards"
    };

    const cover = wipe.animate(
        [
            { transform: "translateX(" + direction * 100 + "%)" },
            { transform: "translateX(0)" }
        ],
        options
    );

    cover.finished
        .then(() => {

            showPage(pageId, updateHistory);

            const reveal = wipe.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(" + direction * -100 + "%)" }
                ],
                options
            );

            return reveal.finished;

        })
        .then(() => {

            wipe.getAnimations().forEach((animation) => animation.cancel());

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
                            
