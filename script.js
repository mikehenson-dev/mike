
// PAGE NAVIGATION

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll("nav a[data-page]");
const navigation = document.getElementById("navigation");
const menuToggle = document.getElementById("menu-toggle");

function showPage(pageId) {
    const targetPage = document.getElementById(pageId);

    if (!targetPage) return;

    pages.forEach(page => {
        page.classList.remove("active");
    });

    targetPage.classList.add("active");

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.page === pageId
        );
    });

    navigation.classList.remove("open");
    window.location.hash = pageId;

    targetPage.scrollTop = 0;
}

// Navigation links
navLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        showPage(link.dataset.page);
    });
});

// Buttons that navigate to other pages
document.querySelectorAll("[data-target]").forEach(button => {
    button.addEventListener("click", () => {
        showPage(button.dataset.target);
    });
});

// Mobile navigation
menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

// Logo returns to home
document.querySelector(".logo").addEventListener("click", event => {
    event.preventDefault();
    showPage("home");
});

// Load the page from the URL hash
function loadPageFromHash() {
    const pageId = window.location.hash.replace("#", "");
    showPage(
        document.getElementById(pageId) ? pageId : "home"
    );
}

window.addEventListener("hashchange", loadPageFromHash);


// EDUCATION CAROUSEL

const educationSlides = document.querySelectorAll(".education-slide");
const previousButton = document.getElementById("edu-prev");
const nextButton = document.getElementById("edu-next");
const educationNumber = document.getElementById("edu-number");

let currentEducation = 0;

function showEducation(index) {
    if (educationSlides.length === 0) return;

    if (index < 0) {
        currentEducation = educationSlides.length - 1;
    } else if (index >= educationSlides.length) {
        currentEducation = 0;
    } else {
        currentEducation = index;
    }

    educationSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle(
            "active",
            slideIndex === currentEducation
        );
    });

    const current = String(currentEducation + 1).padStart(2, "0");
    const total = String(educationSlides.length).padStart(2, "0");

    educationNumber.textContent = `${current} / ${total}`;
}

previousButton.addEventListener("click", () => {
    showEducation(currentEducation - 1);
});

nextButton.addEventListener("click", () => {
    showEducation(currentEducation + 1);
});

showEducation(0);


// KEYBOARD NAVIGATION

document.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") {
        const activePage = document.querySelector(".page.active");
        if (activePage && activePage.id === "education") {
            showEducation(currentEducation + 1);
        }
    }

    if (event.key === "ArrowLeft") {
        const activePage = document.querySelector(".page.active");
        if (activePage && activePage.id === "education") {
            showEducation(currentEducation - 1);
        }
    }

    if (event.key === "Escape") {
        navigation.classList.remove("open");
    }
});
