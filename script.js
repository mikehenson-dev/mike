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


// MOVING BACKGROUND (BLUE NETWORK OF DRIFTING NODES)

function initBackground() {

    const canvas = document.createElement("canvas");

    canvas.className = "bg-canvas";
    canvas.setAttribute("aria-hidden", "true");

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let linkDistance = 150;

    const nodes = [];
    const packets = [];

    function makeNode() {

        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.32,
            vy: (Math.random() - 0.5) * 0.32,
            r: 1 + Math.random() * 1.4
        };

    }

    function resize() {

        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * ratio;
        canvas.height = height * ratio;

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        linkDistance = width < 700 ? 115 : 160;

        const count = Math.round(
            Math.min(70, Math.max(24, (width * height) / 22000))
        );

        while (nodes.length < count) {
            nodes.push(makeNode());
        }

        nodes.length = count;

    }

    function spawnPacket() {

        const a = Math.floor(Math.random() * nodes.length);

        let best = -1;
        let bestDistance = linkDistance;

        for (let b = 0; b < nodes.length; b++) {

            if (b === a) {
                continue;
            }

            const d = Math.hypot(
                nodes[a].x - nodes[b].x,
                nodes[a].y - nodes[b].y
            );

            if (d < bestDistance) {
                bestDistance = d;
                best = b;
            }

        }

        if (best >= 0) {
            packets.push({ a: a, b: best, t: 0 });
        }

    }

    function draw(move) {

        ctx.clearRect(0, 0, width, height);

        if (move) {

            nodes.forEach((node) => {

                node.x += node.vx;
                node.y += node.vy;

                if (node.x < -10) node.x = width + 10;
                if (node.x > width + 10) node.x = -10;
                if (node.y < -10) node.y = height + 10;
                if (node.y > height + 10) node.y = -10;

            });

            if (packets.length < 5 && Math.random() < 0.03) {
                spawnPacket();
            }

        }

        // Thin translucent lines between nearby nodes
        ctx.lineWidth = 1;

        for (let i = 0; i < nodes.length; i++) {

            for (let j = i + 1; j < nodes.length; j++) {

                const d = Math.hypot(
                    nodes[i].x - nodes[j].x,
                    nodes[i].y - nodes[j].y
                );

                if (d < linkDistance) {

                    const alpha = (1 - d / linkDistance) * 0.3;

                    ctx.strokeStyle = "rgba(80, 160, 255, " + alpha + ")";

                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();

                }

            }

        }

        // Nodes
        nodes.forEach((node) => {

            ctx.fillStyle = "rgba(140, 210, 255, 0.55)";

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
            ctx.fill();

        });

        // Small glowing packets travelling along the lines
        for (let i = packets.length - 1; i >= 0; i--) {

            const packet = packets[i];

            const from = nodes[packet.a];
            const to = nodes[packet.b];

            const x = from.x + (to.x - from.x) * packet.t;
            const y = from.y + (to.y - from.y) * packet.t;

            ctx.fillStyle = "rgba(90, 200, 255, 0.16)";
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "rgba(190, 240, 255, 0.9)";
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();

            if (move) {
                packet.t += 0.015;
            }

            if (packet.t >= 1) {
                packets.splice(i, 1);
            }

        }

    }

    function loop() {

        draw(true);

        requestAnimationFrame(loop);

    }

    resize();

    window.addEventListener("resize", function() {

        resize();

        if (reduceMotion) {
            draw(false);
        }

    });

    if (reduceMotion) {

        draw(false);

    } else {

        loop();

    }

}

initBackground();


// OPEN CORRECT PAGE WHEN WEBSITE LOADS

const initialPage = location.hash.replace("#", "") || "home";

showPage(initialPage, false);

