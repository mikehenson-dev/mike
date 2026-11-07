document.addEventListener('DOMContentLoaded', () => {

    const pages = [...document.querySelectorAll('.page')];
    const links = [...document.querySelectorAll('nav a[data-page]')];
    const nav = document.querySelector('nav');
    const menu = document.querySelector('.menu');

    function show(id) {

        if (!pages.some(page => page.id === id)) {
            id = 'home';
        }

        pages.forEach(page => {
            page.classList.toggle('active', page.id === id);
        });

        links.forEach(link => {
            link.classList.toggle(
                'active',
                link.dataset.page === id
            );
        });

        nav.classList.remove('open');
        menu.textContent = '☰';

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Navigation buttons and menu links
    document.addEventListener('click', event => {

        const link = event.target.closest('a[href^="#"]');

        if (!link) return;

        const id = link.getAttribute('href').slice(1);

        if (!pages.some(page => page.id === id)) return;

        event.preventDefault();

        if (location.hash !== '#' + id) {
            history.pushState(null, '', '#' + id);
        }

        show(id);
    });

    // Mobile menu
    menu.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    // Browser back and forward buttons
    addEventListener('popstate', () => {
        show(location.hash.slice(1) || 'home');
    });

    // Start on the correct page
    show(location.hash.slice(1) || 'home');

    // Automatic copyright year
    document.getElementById('year').textContent =
        new Date().getFullYear();

    // Animated background stars
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');

    let dots = [];

    function resize() {

        const d = Math.min(devicePixelRatio || 1, 2);

        canvas.width = innerWidth * d;
        canvas.height = innerHeight * d;

        canvas.style.width = innerWidth + 'px';
        canvas.style.height = innerHeight + 'px';

        ctx.setTransform(d, 0, 0, d, 0, 0);

        dots = Array.from(
            {
                length: Math.min(100, Math.floor(innerWidth / 10))
            },
            () => ({
                x: Math.random() * innerWidth,
                y: Math.random() * innerHeight,
                r: Math.random() + .25,
                a: Math.random() * .55 + .15,
                v: Math.random() * .18 + .04
            })
        );
    }

    function draw() {

        ctx.clearRect(0, 0, innerWidth, innerHeight);

        dots.forEach(star => {

            ctx.beginPath();

            ctx.fillStyle =
                `rgba(170,220,255,${star.a})`;

            ctx.arc(
                star.x,
                star.y,
                star.r,
                0,
                Math.PI * 2
            );

            ctx.fill();

            star.y -= star.v;

            if (star.y < 0) {
                star.y = innerHeight;
                star.x = Math.random() * innerWidth;
            }

        });

        requestAnimationFrame(draw);
    }

    resize();

    addEventListener('resize', resize);

    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        draw();
    }

});
