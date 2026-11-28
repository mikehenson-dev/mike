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


// PERSONAL INFO TABS (PHONES)

const personalTabs = document.querySelectorAll("[data-personal-tab]");

const personalGrid = document.querySelector(".personal-grid");

personalTabs.forEach((tab) => {

    tab.addEventListener("click", function() {

        if (personalGrid) {

            personalGrid.dataset.view = this.dataset.personalTab;

        }

        personalTabs.forEach((button) => {

            button.classList.toggle("active", button === this);

        });

    });

});


// EDUCATION & ACHIEVEMENTS CONNECTED BRANCHES & CLICKABLE MODAL

function initEducationTree() {

    const rows = document.querySelectorAll(".edu-branch-row");
    const modal = document.getElementById("eduModal");
    const modalStage = document.getElementById("eduModalStage");
    const modalSchool = document.getElementById("eduModalSchool");
    const modalTitle = document.getElementById("eduModalTitle");
    const modalDesc = document.getElementById("eduModalDesc");
    const modalList = document.getElementById("eduModalList");

    function setActiveRow(targetRow) {
        rows.forEach((row) => {
            row.classList.toggle("is-active", row === targetRow);
        });
    }

    rows.forEach((row) => {

        const eduBtn = row.querySelector(".edu-node");
        const achChips = row.querySelectorAll(".ach-chip");

        if (eduBtn) {
            eduBtn.addEventListener("click", () => {
                setActiveRow(row);
                if (!modal) return;

                modalStage.textContent = eduBtn.dataset.eduStage || "";
                modalSchool.textContent = "";
                modalSchool.hidden = true;
                modalTitle.textContent = eduBtn.dataset.eduSchool || "";
                modalDesc.textContent = "Connected achievements for this stage:";

                modalList.innerHTML = "";
                const rawItems = (eduBtn.dataset.eduItems || "").split("||").filter(Boolean);
                rawItems.forEach((entry) => {
                    const parts = entry.split("::");
                    const item = document.createElement("div");
                    item.className = "edu-modal-item";

                    const h3 = document.createElement("h3");
                    h3.textContent = parts[0] || "";

                    const p = document.createElement("p");
                    p.textContent = parts[1] || "";

                    item.appendChild(h3);
                    item.appendChild(p);
                    modalList.appendChild(item);
                });

                modalList.hidden = false;
                modal.hidden = false;
            });
        }

        achChips.forEach((chip) => {
            chip.addEventListener("click", () => {
                setActiveRow(row);
                if (!modal) return;

                modalStage.textContent = chip.dataset.achStage || "";
                modalSchool.textContent = chip.dataset.achSchool || "";
                modalSchool.hidden = false;
                modalTitle.textContent = chip.dataset.achTitle || "";
                modalDesc.textContent = chip.dataset.achDesc || "";
                modalList.innerHTML = "";
                modalList.hidden = true;

                modal.hidden = false;
            });
        });

    });

    if (modal) {

        modal.addEventListener("click", (event) => {
            if (event.target.closest("[data-close-edu]")) {
                modal.hidden = true;
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !modal.hidden) {
                modal.hidden = true;
            }
        });

    }

}

initEducationTree();


// FAMILY & FRIENDS TREE PODS & MODAL

function initFamilyTree() {

    const pods = document.querySelectorAll(".tree-pod");
    const modal = document.getElementById("podModal");
    const modalBranch = document.getElementById("podModalBranch");
    const modalTitle = document.getElementById("podModalTitle");
    const modalDesc = document.getElementById("podModalDesc");
    const modalImg = document.getElementById("podModalImg");
    const modalPlaceholder = document.getElementById("podModalPlaceholder");

    pods.forEach((pod) => {

        const img = pod.querySelector(".pod-photo");
        const mediaBox = pod.querySelector(".pod-media");
        const placeholder = pod.querySelector(".pod-placeholder");
        const rawSrc = img ? (img.getAttribute("src") || "").trim() : "";

        if (img && rawSrc) {

            const reveal = () => {
                img.hidden = false;
                if (placeholder) placeholder.hidden = true;
                if (mediaBox) mediaBox.classList.add("has-photo");
            };

            if (img.complete && img.naturalWidth > 0) {
                reveal();
            } else {
                img.addEventListener("load", reveal, { once: true });
            }

        }

        pod.addEventListener("click", () => {

            if (!modal) return;

            modalBranch.textContent = pod.dataset.podBranch || "";
            modalTitle.textContent = pod.dataset.podTitle || "";
            modalDesc.textContent = pod.dataset.podDesc || "";

            const photoSrc = img ? (img.getAttribute("src") || "").trim() : "";

            if (photoSrc) {
                modalImg.src = photoSrc;
                modalImg.alt = pod.dataset.podTitle || "";
                modalImg.hidden = false;
                modalPlaceholder.hidden = true;
            } else {
                modalImg.hidden = true;
                modalPlaceholder.hidden = false;
            }

            modal.hidden = false;

        });

    });

    if (modal) {

        modal.addEventListener("click", (event) => {
            if (event.target.closest("[data-close-pod]")) {
                modal.hidden = true;
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !modal.hidden) {
                modal.hidden = true;
            }
        });

    }

}

initFamilyTree();


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
