/* ==============================
   EDUCATION CAROUSEL
============================== */

const educationSlides = document.querySelectorAll(
    '.education-slide'
);

const previousEducation = document.getElementById('edu-prev');
const nextEducation = document.getElementById('edu-next');
const educationNumber = document.getElementById('edu-number');

let currentEducation = 0;

function showEducation(index) {

    if (!educationSlides.length) return;

    currentEducation =
        (index + educationSlides.length) %
        educationSlides.length;

    educationSlides.forEach((slide, i) => {
        slide.classList.toggle(
            'active',
            i === currentEducation
        );
    });

    educationNumber.textContent =
        String(currentEducation + 1).padStart(2, '0');
}

if (previousEducation && nextEducation) {

    previousEducation.addEventListener('click', () => {
        showEducation(currentEducation - 1);
    });

    nextEducation.addEventListener('click', () => {
        showEducation(currentEducation + 1);
    });

    showEducation(0);
}
