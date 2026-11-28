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
    family: "Family & Friends",
    contact: "Contact"
};

const reduceMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

let currentPage = null;


// BACK / NEXT BUTTONS IN THE FOOTER

let prevButton = null;
let nextButton = null;

if (footer) {

    prevButton = document.createElement("button");
    nextButton = document.createElement("button");

    prevButton.className = "pager-btn";
    nextButton.className = "pager-btn";

    prevButton.type = "button";
    nextButton.type = "button";

    footer.insertBefore(prevButton, footer.firstChild);
    footer.appendChild(nextButton);

}

function pageLabel(pageId) {

    return pageLabels[pageId] || pageId;

}

function updatePager(pageId) {

    if (!prevButton || !nextButton) {
        return;
    }

    const index = pageOrder.indexOf(pageId);

    const previous = pageOrder[index - 1];
    const next = pageOrder[index + 1];

    prevButton.hidden = !previous;
    nextButton.hidden = !next;

    if (previous) {

        prevButton.dataset.target = previous;
        prevButton.textContent = "\u2039 " + pageLabel(previous);

    }

    if (next) {

        nextButton.dataset.target = next;
        nextButton.textContent = pageLabel(next) + " \u203A";

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

    currentPage = pageId;


    // Update active navigation link
    navLinks.forEach((link) => {

        link.classList.toggle(
            "active",
            link.dataset.pageLink === pageId
        );

    });


    // Close mobile navigation
    if (navigation) {

        navigation.classList.remove("show");

    }


    // Update URL
    if (updateHistory && location.hash !== "#" + pageId) {

        try {

            history.pushState(null, "", "#" + pageId);

        } catch (error) {

            location.hash = pageId;

        }

    }


    // Reset page scroll position
    selectedPage.scrollTop = 0;


    // Play the entrance animation for this page
    void selectedPage.offsetWidth;

    selectedPage.classList.add("enter");

    updatePager(pageId);

    closePerson();

    updateTree(pageId);

}


// GO TO A PAGE

function goToPage(pageId, updateHistory = true) {

    if (!pageOrder.includes(pageId)) {
        return;
    }

    if (pageId === currentPage) {

        if (navigation) {

            navigation.classList.remove("show");

        }

        return;

    }

    showPage(pageId, updateHistory);

}


// NAVIGATION LINKS, PAGE BUTTONS AND BACK / NEXT BUTTONS

document.addEventListener("click", function(event) {

    const target = event.target;

    if (!target || !target.closest) {
        return;
    }

    const podButton = target.closest(".pod-btn");

    if (podButton) {

        openPerson(podButton.dataset.person, podButton);

        return;

    }

    if (target.closest(".person-close") || target === personDialog) {

        closePerson();

        return;

    }

    const link = target.closest("[data-page-link]");

    if (link) {

        event.preventDefault();

        goToPage(link.dataset.pageLink);

        return;

    }

    const button = target.closest("[data-go-to]");

    if (button) {

        goToPage(button.dataset.goTo);

        return;

    }

    const pager = target.closest(".pager-btn");

    if (pager && pager.dataset.target) {

        goToPage(pager.dataset.target);

    }

});


// MOBILE MENU

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function() {

        navigation.classList.toggle("show");

    });

}


// EDUCATION / ACHIEVEMENTS TABS (PHONES)

const eduTabs = document.querySelectorAll("[data-edu-tab]");

const eduGrid = document.querySelector(".education-achievements");

eduTabs.forEach((tab) => {

    tab.addEventListener("click", function() {

        if (eduGrid) {

            eduGrid.dataset.view = this.dataset.eduTab;

        }

        eduTabs.forEach((button) => {

            button.classList.toggle("active", button === this);

        });

    });

});


// ARROW KEYS MOVE BETWEEN PAGES

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closePerson();

    }

    if (personDialog && !personDialog.hidden) {
        return;
    }

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


// FAMILY AND FRIENDS: TREE BACKGROUND

const TREE_IMAGE = "tree-bg.webp";
const TREE_RATIO = 1600 / 900;

const treeLayer = document.createElement("div");

treeLayer.className = "tree-layer";
treeLayer.setAttribute("aria-hidden", "true");

const treeTop = document.createElement("img");
const treeBottom = document.createElement("img");

treeTop.className = "tree-top";
treeBottom.className = "tree-bottom";

treeTop.alt = "";
treeBottom.alt = "";

treeLayer.appendChild(treeTop);
treeLayer.appendChild(treeBottom);

document.body.appendChild(treeLayer);

let treeLoaded = false;

// The tree only fades in on the Family & Friends page
function updateTree(pageId) {

    const onFamily = pageId === "family";

    document.body.classList.toggle("on-family", onFamily);

    if (onFamily && !treeLoaded) {

        treeLoaded = true;

        treeTop.src = TREE_IMAGE;
        treeBottom.src = TREE_IMAGE;

    }

}


// FAMILY AND FRIENDS: PODS

// Where each pod sits on the picture (fractions of its width and height)
const treeSlots = {
    tl: [0.31, 0.31],
    tr: [0.71, 0.30],
    bl: [0.30, 0.60],
    br: [0.70, 0.60]
};

function layoutPods() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    const pods = document.querySelectorAll(".pod");

    pods.forEach((pod, index) => {

        const slot = pod.dataset.slot;

        const spot = treeSlots[slot];

        if (!spot) {
            return;
        }

        let x;
        let y;

        if (height < 520 && width > height) {

            // Very short landscape screens: one row of four
            x = width * (0.2 + index * 0.2);
            y = height * 0.62;

        } else if (width / height < 1) {

            // Phones held upright: two rows around the trunk
            x = width * (slot.endsWith("l") ? 0.27 : 0.73);
            y = height * (slot.startsWith("t") ? 0.4 : 0.66);

        } else {

            // Wide screens: sit on top of the pods in the picture
            let shownWidth;
            let shownHeight;

            if (width / height > TREE_RATIO) {

                shownWidth = width;
                shownHeight = width / TREE_RATIO;

            } else {

                shownHeight = height;
                shownWidth = height * TREE_RATIO;

            }

            const spotX = (width - shownWidth) / 2 + spot[0] * shownWidth;
            const spotY = (height - shownHeight) / 2 + spot[1] * shownHeight;

            // The picture is slightly zoomed in (1.04) in the CSS
            x = width / 2 + (spotX - width / 2) * 1.04;
            y = height / 2 + (spotY - height / 2) * 1.04;

            x = Math.max(90, Math.min(width - 90, x));
            y = Math.max(150, Math.min(height - 110, y));

        }

        pod.style.left = x + "px";
        pod.style.top = y + "px";

    });

}

window.addEventListener("resize", layoutPods);

layoutPods();


// FAMILY AND FRIENDS: POP-UP CARD

const personDialog = document.getElementById("personDialog");

let lastPodButton = null;

function openPerson(personId, trigger) {

    if (!personDialog) {
        return;
    }

    const info = document.querySelector(
        '.person-info[data-person="' + personId + '"]'
    );

    if (!info) {
        return;
    }

    const title = info.querySelector("h2");
    const text = info.querySelector("p");
    const photos = info.querySelectorAll("img");

    const photoBox = personDialog.querySelector(".person-photos");

    photoBox.textContent = "";

    photoBox.classList.toggle("single", photos.length <= 1);

    if (photos.length) {

        photos.forEach((photo) => {

            photoBox.appendChild(photo.cloneNode(true));

        });

    } else {

        const placeholder = document.createElement("div");

        placeholder.className = "person-placeholder";
        placeholder.textContent = "Photo coming soon";

        photoBox.appendChild(placeholder);

    }

    personDialog.querySelector(".person-title").textContent =
        title ? title.textContent : "";

    personDialog.querySelector(".person-text").textContent =
        text ? text.textContent : "";

    personDialog.hidden = false;

    lastPodButton = trigger || null;

    const closeButton = personDialog.querySelector(".person-close");

    if (closeButton) {

        closeButton.focus();

    }

}

function closePerson() {

    if (!personDialog || personDialog.hidden) {
        return;
    }

    personDialog.hidden = true;

    if (lastPodButton && lastPodButton.focus) {

        lastPodButton.focus();

    }

    lastPodButton = null;

}


// OPEN CORRECT PAGE WHEN WEBSITE LOADS

const initialPage = location.hash.replace("#", "") || "home";

showPage(initialPage, false);


// MOVING BACKGROUND (BLUE CIRCUIT TUNNEL)

function initBackground() {

    const canvas = document.createElement("canvas");

    canvas.className = "bg-canvas";
    canvas.setAttribute("aria-hidden", "true");

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    const NEAR = 0.25;
    const LENGTH = 6;
    const SPEED = 0.35;
    const RINGS = 12;

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let scaleX = 0;
    let scaleY = 0;
    let travel = 0;

    let traces = [];
    let panels = [];

    function random(min, max) {

        return min + Math.random() * (max - min);

    }

    // Turn a spot on a tunnel wall into x / y coordinates
    function wallPoint(wall, u) {

        if (wall === 0) return [u, -1];
        if (wall === 1) return [u, 1];
        if (wall === 2) return [-1, u];

        return [1, u];

    }

    function project(x, y, z) {

        return [centerX + (x / z) * scaleX, centerY + (y / z) * scaleY];

    }

    function wallToScreen(wall, u, z) {

        const point = wallPoint(wall, u);

        return project(point[0], point[1], z);

    }

    // Position of something along the tunnel as it flies toward you
    function depthOf(phase, offset) {

        return (((phase - travel) % LENGTH) + LENGTH) % LENGTH + NEAR + offset;

    }

    // Far things fade out, and so do things that get too close
    function alphaAt(z) {

        const far = Math.max(0, 1 - (z - NEAR) / LENGTH);
        const close = Math.min(1, (z - NEAR) / 0.35);

        return Math.pow(far, 1.3) * close;

    }

    function build() {

        traces = [];
        panels = [];

        const traceCount = width < 700 ? 38 : 70;
        const panelCount = width < 700 ? 8 : 14;

        for (let i = 0; i < traceCount; i++) {

            let u = Math.round(random(-0.9, 0.9) * 10) / 10;
            let offset = 0;

            const points = [{ u: u, offset: 0 }];

            const steps = 3 + Math.floor(Math.random() * 3);

            for (let step = 0; step < steps; step++) {

                if (step % 2 === 0) {

                    offset += random(0.2, 0.8);

                } else {

                    const direction = Math.random() < 0.5 ? -1 : 1;

                    u = Math.max(-0.97, Math.min(0.97, u + direction * random(0.15, 0.55)));

                }

                points.push({ u: u, offset: offset });

            }

            traces.push({
                wall: Math.floor(Math.random() * 4),
                points: points,
                phase: random(0, LENGTH)
            });

        }

        for (let i = 0; i < panelCount; i++) {

            const u0 = random(-0.9, 0.5);
            const offset0 = random(0, 0.6);

            panels.push({
                wall: Math.floor(Math.random() * 4),
                u0: u0,
                u1: u0 + random(0.2, 0.5),
                offset0: offset0,
                offset1: offset0 + random(0.3, 0.9),
                phase: random(0, LENGTH)
            });

        }

    }

    function resize() {

        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * ratio;
        canvas.height = height * ratio;

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        centerX = width / 2;
        centerY = height / 2;

        scaleX = width * 0.5;
        scaleY = height * 0.5;

        build();

    }

    function draw() {

        ctx.clearRect(0, 0, width, height);

        // Soft see-through panels on the walls
        panels.forEach((panel) => {

            const z0 = depthOf(panel.phase, panel.offset0);
            const z1 = depthOf(panel.phase, panel.offset1);

            if (z0 < NEAR + 0.05) {
                return;
            }

            const alpha = alphaAt((z0 + z1) / 2) * 0.14;

            const a = wallToScreen(panel.wall, panel.u0, z0);
            const b = wallToScreen(panel.wall, panel.u1, z0);
            const c = wallToScreen(panel.wall, panel.u1, z1);
            const d = wallToScreen(panel.wall, panel.u0, z1);

            ctx.fillStyle = "rgba(47, 107, 255, " + alpha + ")";

            ctx.beginPath();
            ctx.moveTo(a[0], a[1]);
            ctx.lineTo(b[0], b[1]);
            ctx.lineTo(c[0], c[1]);
            ctx.lineTo(d[0], d[1]);
            ctx.closePath();
            ctx.fill();

        });

        ctx.lineWidth = 1;

        // Rings that rush toward you
        for (let i = 0; i < RINGS; i++) {

            const z = NEAR + ((((i * LENGTH) / RINGS - travel) % LENGTH) + LENGTH) % LENGTH;

            const topLeft = project(-1, -1, z);
            const bottomRight = project(1, 1, z);

            ctx.strokeStyle = "rgba(80, 160, 255, " + alphaAt(z) * 0.22 + ")";

            ctx.strokeRect(
                topLeft[0],
                topLeft[1],
                bottomRight[0] - topLeft[0],
                bottomRight[1] - topLeft[1]
            );

        }

        // Long faint lines down the walls
        ctx.strokeStyle = "rgba(80, 160, 255, 0.07)";

        for (let wall = 0; wall < 4; wall++) {

            [-1, -0.5, 0, 0.5, 1].forEach((u) => {

                const start = wallToScreen(wall, u, NEAR + 0.1);
                const end = wallToScreen(wall, u, NEAR + LENGTH);

                ctx.beginPath();
                ctx.moveTo(start[0], start[1]);
                ctx.lineTo(end[0], end[1]);
                ctx.stroke();

            });

        }

        // Circuit lines with glowing dots at the corners
        traces.forEach((trace) => {

            const depths = trace.points.map((point) => depthOf(trace.phase, point.offset));

            for (let i = 0; i < trace.points.length - 1; i++) {

                if (depths[i] < NEAR + 0.05 || depths[i + 1] < NEAR + 0.05) {
                    continue;
                }

                const alpha = alphaAt((depths[i] + depths[i + 1]) / 2) * 0.5;

                const from = wallToScreen(trace.wall, trace.points[i].u, depths[i]);
                const to = wallToScreen(trace.wall, trace.points[i + 1].u, depths[i + 1]);

                ctx.strokeStyle = "rgba(90, 170, 255, " + alpha + ")";

                ctx.beginPath();
                ctx.moveTo(from[0], from[1]);
                ctx.lineTo(to[0], to[1]);
                ctx.stroke();

            }

            trace.points.forEach((point, i) => {

                if (depths[i] < NEAR + 0.05) {
                    return;
                }

                const spot = wallToScreen(trace.wall, point.u, depths[i]);

                const radius = Math.min(3, 0.8 + 0.9 / depths[i]);

                ctx.fillStyle = "rgba(190, 235, 255, " + Math.min(1, alphaAt(depths[i]) * 1.3) + ")";

                ctx.beginPath();
                ctx.arc(spot[0], spot[1], radius, 0, Math.PI * 2);
                ctx.fill();

            });

        });

    }

    let lastTime = 0;

    function loop(time) {

        const delta = Math.min(0.05, (time - lastTime) / 1000 || 0);

        lastTime = time;

        travel += SPEED * delta;

        draw();

        requestAnimationFrame(loop);

    }

    resize();

    window.addEventListener("resize", function() {

        resize();

        if (reduceMotion) {
            draw();
        }

    });

    if (reduceMotion) {

        draw();

    } else {

        requestAnimationFrame(loop);

    }

}


// The background is only decoration: if it ever fails, the site still works

try {

    initBackground();

} catch (error) {

    console.error(error);

}
