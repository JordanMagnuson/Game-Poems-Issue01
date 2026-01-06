// --- DOM references ----------------------------------------------------\
const topbarEl = document.querySelector("header.topbar");

const coverViewEl = document.getElementById("coverView");
const playViewEl = document.getElementById("playView");

const gameLayoutEl = document.getElementById("gameLayout");
const textLayoutEl = document.getElementById("textLayout");

const coverImgEl = document.getElementById("coverImage");

const metaTitleEl = document.getElementById("metaTitle");
const metaArtistEl = document.getElementById("metaArtist");
const metaContribTypeEl = document.getElementById("metaContribType");
const metaLocationEl = document.getElementById("metaLocation");
const metaPlayTimeEl = document.getElementById("metaPlayTime");
const metaContentWarningEl = document.getElementById("metaContentWarning");
const cwBlockEl = document.getElementById("cwBlock");
const metaInstructionsEl = document.getElementById("metaInstructions");
const metaOverWhenEl = document.getElementById("metaOverWhen");
const metaStatementEl = document.getElementById("metaStatement");

const textTitleEl = document.getElementById("textTitle");
const textContentEl = document.getElementById("textContent");

const playButtonEl = document.getElementById("playButton");
const gameFrameEl = document.getElementById("gameFrame");

const prevBtnEl = document.getElementById("prevBtn");
const nextBtnEl = document.getElementById("nextBtn");
const navTitleBtnEl = document.getElementById("navTitleBtn");
const jumpMenuEl = document.getElementById("jumpMenu");
const pageIndicatorEl = document.getElementById("pageIndicator");
const fullscreenToggleBtnEl = document.getElementById("fullscreenToggleBtn");
const closePlayBtnEl = document.getElementById("closePlayBtn");

const landingCoverEl = document.getElementById("landingCover");
const enterMagazineBtnEl = document.getElementById("enterMagazineBtn");

// --- Preload cover + background images for all pages ---------------------

function preloadImages() {
    if (!Array.isArray(pages)) return;

    pages.forEach(page => {
        const coverSrc = getCoverSrc(page);
        if (coverSrc) {
            const img = new Image();
            img.src = coverSrc;
        }

        const bgSrc = getBackgroundSrc(page);
        if (bgSrc) {
            const img = new Image();
            img.src = bgSrc;
        }
    });
}

// --- State -------------------------------------------------------------

let currentIndex = 0;

// --- Helper to build ids from titles ----------------------------------

function makeIdFromTitle(title) {
    if (!title) return "";
    return String(title)
        .trim()
        .replace(/\s+/g, "")          // remove spaces
        .replace(/[^A-Za-z0-9_-]/g, ""); // strip other unsafe chars
}

// --- Fullscreen helpers ----------------------------
function requestFullscreen() {
    const docEl = document.documentElement;

    if (!document.fullscreenEnabled) {
        return; // browser doesn't allow fullscreen; just fail silently
    }

    if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
    } else if (docEl.webkitRequestFullscreen) { // Safari
        docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) { // Old Edge/IE
        docEl.msRequestFullscreen();
    }
}

function isFullscreen() {
    return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function toggleFullscreen() {
    if (isFullscreen()) {
        exitFullscreen();
    } else {
        requestFullscreen(); // reuse the existing helper (documentElement)
    }
}

function updateFullscreenButton() {
    if (!fullscreenToggleBtnEl) return;

    if (isFullscreen()) {
        fullscreenToggleBtnEl.textContent = "🗗"; // restore icon
        fullscreenToggleBtnEl.setAttribute("aria-label", "Exit fullscreen");
    } else {
        fullscreenToggleBtnEl.textContent = "⛶"; // maximize icon
        fullscreenToggleBtnEl.setAttribute("aria-label", "Enter fullscreen");
    }
}

// --- Helpers for asset paths ------------------------------------------

function getCoverSrc(page) {
    if (page.cover) return page.cover;
    if (page.slug) return `games/${page.slug}/cover.png`;
    if (page.src && page.src.endsWith("index.html")) {
        return page.src.replace("index.html", "cover.png");
    }
    return "";
}

function getBackgroundSrc(page) {
    if (page.background) return page.background;
    if (page.slug) return `games/${page.slug}/background.png`;
    if (page.src && page.src.endsWith("index.html")) {
        return page.src.replace("index.html", "background.png");
    }
    return "";
}

function applyThemeColor(page) {
    const themeColor = page.themeColor;

    if (themeColor) {
        // Use the per-page color for both the top bar and the primary button
        document.documentElement.style.setProperty("--topbar-bg", themeColor);
        document.documentElement.style.setProperty("--bg-button", themeColor);
    } else {
        // Reset to defaults when no page-specific color is provided
        document.documentElement.style.setProperty("--topbar-bg", "#000000");
        document.documentElement.style.setProperty("--bg-button", "#000000");
    }
}

// --- Helpers to build dynamic pages (Contents, Notes) -----------------
function buildNotesPage() {
    const container = textContentEl;
    if (!container) return;

    container.innerHTML = "";

    function getAuthorLabel(page) {
        if (!page.author) return "About the author:";
        return page.author.includes(",")
            ? "About the authors:"
            : "About the author:";
    }

    // Normalize a single website string (strip protocol/www/trailing slash)
    function normalizeWebsite(site) {
        if (!site) return "";
        return String(site)
            .trim()
            .replace(/^https?:\/\//i, "")
            .replace(/^www\./i, "")
            .replace(/\/+$/, "");
    }

    // Build the "Website(s): ..." suffix from page.authorWebsite
    function getWebsiteSuffix(page) {
        if (!page.authorWebsite) return "";

        // Allow either a single site or a comma-separated list
        const sites = String(page.authorWebsite)
            .split(",")
            .map(s => normalizeWebsite(s))
            .filter(Boolean);

        if (sites.length === 0) return "";

        const label = sites.length === 1 ? "Website:" : "Websites:";
        return ` ${label} ${sites.join(", ")}.`;
    }

    function addNotesSection(parentEl, label, value) {
        if (!value) return;

        const p = document.createElement("p");

        // Allow value to contain HTML OR plain text (both are strings)
        // We render via innerHTML so contributors can include <p>, <em>, links, etc.
        p.innerHTML = `<strong>${label}</strong> ${value}`;
        parentEl.appendChild(p);
    }

    pages.forEach((page) => {
        if (page.typeOfPage !== "game") return;

        const hasAnyNotes =
            page.aboutAuthor || page.aboutProcess || page.acknowledgements;
        if (!hasAnyNotes) return;

        const gameBlock = document.createElement("div");
        gameBlock.className = "game";

        const titleEl = document.createElement("h2");
        titleEl.textContent = page.title;
        gameBlock.appendChild(titleEl);

        // Append website(s) to the About the author(s) section
        const aboutAuthorWithWebsite = page.aboutAuthor
            ? (page.aboutAuthor + getWebsiteSuffix(page))
            : page.aboutAuthor;

        addNotesSection(
            gameBlock,
            getAuthorLabel(page),
            aboutAuthorWithWebsite
        );
        addNotesSection(gameBlock, "About the process:", page.aboutProcess);
        addNotesSection(gameBlock, "Paragame acknowledgements:", page.acknowledgements);

        container.appendChild(gameBlock);
    });
}

function buildContentsGrid() {
    const textContent = document.getElementById("textContent");
    if (!textContent) return;

    textContent.innerHTML = "";

    // Everything except the Contents page itself
    const tocPages = pages.filter(p => p.title && p.title !== "Contents");

    // ---- tweak these to control column breaks ----
    const COL1_COUNT = 6;
    const COL2_COUNT = 5;

    const col1Pages = tocPages.slice(0, COL1_COUNT);
    const col2Pages = tocPages.slice(COL1_COUNT, COL1_COUNT + COL2_COUNT);
    const col3Pages = tocPages.slice(COL1_COUNT + COL2_COUNT);

    const col1 = document.createElement("div");
    const col2 = document.createElement("div");
    const col3 = document.createElement("div");

    col1.className = "toc-column";
    col2.className = "toc-column";
    col3.className = "toc-column";

    function getPageNumber(page) {
        return pages.indexOf(page) + 1;
    }

    function makeTocItemClickable(itemEl, page) {
        const targetIndex = pages.indexOf(page);
        if (targetIndex < 0) return;

        itemEl.classList.add("toc-clickable");
        itemEl.tabIndex = 0;
        itemEl.setAttribute("role", "link");
        itemEl.setAttribute("aria-label", `Go to page ${targetIndex + 1}: ${page.title}`);

        itemEl.addEventListener("click", () => showCover(targetIndex));

        itemEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                showCover(targetIndex);
            }
        });
    }

    function createTitleRow(p) {
        // IMPORTANT: This matches your CSS:
        // .toc-title contains .toc-title-text + .toc-dots + .toc-page
        const row = document.createElement("div");
        row.className = "toc-title";

        const titleText = document.createElement("span");
        titleText.className = "toc-title-text";
        titleText.textContent = p.title;

        const dots = document.createElement("span");
        dots.className = "toc-dots";

        const pageNum = document.createElement("span");
        pageNum.className = "toc-page";
        pageNum.textContent = getPageNumber(p);

        row.appendChild(titleText);
        row.appendChild(dots);
        row.appendChild(pageNum);

        return row;
    }

    function createGameTocItem(p) {
        const item = document.createElement("div");
        item.className = "toc-item toc-item-game";

        const img = document.createElement("img");
        img.src = getCoverSrc(p);
        img.className = "toc-cover";
        img.alt = p.title ? `${p.title} cover` : "Game cover";

        const textWrapper = document.createElement("div");
        textWrapper.className = "toc-text";

        textWrapper.appendChild(createTitleRow(p));

        if (p.author) {
            const author = document.createElement("div");
            author.className = "toc-author";
            author.textContent = p.author;
            textWrapper.appendChild(author);
        }

        item.appendChild(img);
        item.appendChild(textWrapper);

        makeTocItemClickable(item, p);
        return item;
    }

    function createTextTocItem(p) {
        const item = document.createElement("div");
        item.className = "toc-item toc-item-text";

        item.appendChild(createTitleRow(p));

        makeTocItemClickable(item, p);
        return item;
    }

    function createTocItem(p) {
        return (p.typeOfPage === "game") ? createGameTocItem(p) : createTextTocItem(p);
    }

    col1Pages.forEach(p => col1.appendChild(createTocItem(p)));
    col2Pages.forEach(p => col2.appendChild(createTocItem(p)));
    col3Pages.forEach(p => col3.appendChild(createTocItem(p)));

    textContent.appendChild(col1);
    textContent.appendChild(col2);
    textContent.appendChild(col3);
}

// --- Jump menu (dropdown TOC) ------------------------------------------

function isBrowseMode() {
    return !(topbarEl && topbarEl.classList.contains("playing"));
}

function buildJumpMenu() {
    if (!jumpMenuEl) return;

    jumpMenuEl.innerHTML = "";

    pages.forEach((p, idx) => {
        // Only include real titled pages
        if (!p || !p.title) return;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "jump-menu-item";
        btn.setAttribute("role", "option");
        btn.dataset.index = String(idx);

        const num = document.createElement("span");
        num.className = "jump-num";
        num.textContent = `${idx + 1}.`;

        const title = document.createElement("span");
        title.className = "jump-title";
        title.textContent = p.title;

        btn.appendChild(num);
        btn.appendChild(title);

        btn.addEventListener("click", () => {
            closeJumpMenu();
            showCover(idx);
        });

        jumpMenuEl.appendChild(btn);
    });

    refreshJumpMenuSelection();
}

function refreshJumpMenuSelection() {
    if (!jumpMenuEl) return;

    const items = jumpMenuEl.querySelectorAll(".jump-menu-item");
    items.forEach((el) => {
        const idx = parseInt(el.dataset.index, 10);
        const isCurrent = idx === currentIndex;
        el.classList.toggle("current", isCurrent);
        el.setAttribute("aria-selected", isCurrent ? "true" : "false");
    });
}

function openJumpMenu() {
    if (!jumpMenuEl || !navTitleBtnEl) return;
    if (!isBrowseMode()) return;

    jumpMenuEl.classList.remove("hidden");
    navTitleBtnEl.setAttribute("aria-expanded", "true");
    refreshJumpMenuSelection();
}

function closeJumpMenu() {
    if (!jumpMenuEl || !navTitleBtnEl) return;

    jumpMenuEl.classList.add("hidden");
    navTitleBtnEl.setAttribute("aria-expanded", "false");
}

function toggleJumpMenu() {
    if (!jumpMenuEl) return;
    if (!isBrowseMode()) return;

    const isOpen = !jumpMenuEl.classList.contains("hidden");
    if (isOpen) closeJumpMenu();
    else openJumpMenu();
}

// --- Rendering functions ----------------------------------------------

function updateNav() {
    const page = pages[currentIndex];
    const atFirstPage = currentIndex === 0;

    if (navTitleBtnEl) {
        navTitleBtnEl.textContent = page.title || "Page";
    }

    pageIndicatorEl.textContent = `Page ${currentIndex + 1} of ${pages.length}`;
    prevBtnEl.disabled = atFirstPage && !landingCoverEl;
    nextBtnEl.disabled = currentIndex === pages.length - 1;

    // keep dropdown selection in sync, and auto-close if needed
    refreshJumpMenuSelection();
    if (!isBrowseMode()) {
        closeJumpMenu();
    }
}


function showLanding() {
    if (!landingCoverEl) return;

    document.body.classList.add("landing-active");
    landingCoverEl.classList.remove("hidden");
    coverViewEl.classList.add("hidden");
    playViewEl.classList.add("hidden");

    // Hide top bar
    if (topbarEl) {
        topbarEl.classList.remove("playing");
        topbarEl.classList.add("hidden");
    }

    // Stop any running game
    gameFrameEl.src = "about:blank";

    // Remove ?page from the URL
    const url = new URL(window.location);
    url.searchParams.delete("page");
    window.history.replaceState({}, "", url);
}

function showCover(index) {
    // hide landing and clear landing state whenever we show an interior page
    if (landingCoverEl) {
        landingCoverEl.classList.add("hidden");
    }
    document.body.classList.remove("landing-active");

    if (topbarEl) {
        topbarEl.classList.remove("hidden");
        topbarEl.classList.remove("playing");
    }

    closeJumpMenu();

    if (typeof index === "number") {
        currentIndex = Math.max(0, Math.min(index, pages.length - 1));
    }

    const page = pages[currentIndex];

    // Apply theme color (topbar + primary button)
    // applyThemeColor(page);

    // Add page-specific class to <body> for easy css targeting.
    const id = page.slug || makeIdFromTitle(page.title || "");
    document.body.className = "";          // clear previous classes
    document.body.classList.add(`page-${id}`);

    // Background image (for both page types)
    const bgSrc = getBackgroundSrc(page);
    coverViewEl.style.backgroundImage = bgSrc ? `url("${bgSrc}")` : "none";

    // Decide layout by typeOfPage
    if (page.typeOfPage === "text") {
        // Hide game layout, show text layout
        gameLayoutEl.classList.add("hidden");
        textLayoutEl.classList.remove("hidden");

        // Give this text page a unique id based on its title
        const baseId = "textLayout";
        const suffix = makeIdFromTitle(page.title || "");
        textLayoutEl.id = suffix ? baseId + suffix : baseId;

        // Title + content
        textTitleEl.textContent = page.title || "";
        textContentEl.innerHTML = page.pageContent || "";

        // If this is a dynamic page, populate the contents dynamically
        if (page.title === "Contents") {
            buildContentsGrid();
        }
        if (page.title === "Notes") {
            buildNotesPage();
        }
    } else {
        // Default to game layout
        textLayoutEl.classList.add("hidden");
        textLayoutEl.id = "textLayout"; // reset base id when not on a text page
        gameLayoutEl.classList.remove("hidden");

        const coverSrc = getCoverSrc(page);
        coverImgEl.src = coverSrc || "";
        coverImgEl.alt = page.title ? `${page.title} cover art` : "Game cover";

        // Metadata
        metaTitleEl.textContent = page.title || "";
        metaArtistEl.textContent = page.author || "";
        metaLocationEl.textContent = page.location || "";
        metaPlayTimeEl.textContent = page.estimatedPlayTime || "—";
        metaInstructionsEl.textContent = page.instructions || "—";
        metaOverWhenEl.textContent = page.overWhen || "—";
        metaStatementEl.innerHTML = page.statement || "—";

        // Content Warning
        if (page.contentWarning) {
            metaContentWarningEl.textContent = page.contentWarning;
            cwBlockEl.style.display = "block";
        } else {
            metaContentWarningEl.textContent = "";
            cwBlockEl.style.display = "none";
        }

        // Contribution type (invited or editor)
        if (page.invited) {
            metaContribTypeEl.textContent = "Invited contribution";
            metaContribTypeEl.style.display = "block";
        } else if (page.editor) {
            metaContribTypeEl.textContent = "Editor contribution";
            metaContribTypeEl.style.display = "block";
        } else {
            metaContribTypeEl.textContent = "";
            metaContribTypeEl.style.display = "none";
        }
    }

    // Switch views: always show cover/content view
    coverViewEl.classList.remove("hidden");
    playViewEl.classList.add("hidden");

    // Stop any running game
    gameFrameEl.src = "about:blank";

    updateNav();

    // Keep ?page=<1-based> in the URL without adding history entries
    const url = new URL(window.location);
    url.searchParams.set("page", String(currentIndex + 1));
    window.history.replaceState({}, "", url);

    window.scrollTo({ top: 0, behavior: "instant" });
}

function showPlay() {
    const page = pages[currentIndex];

    // Only makes sense for game pages; text pages won't show the button
    if (page.typeOfPage !== "game") return;

    gameFrameEl.src = page.src || "";
    coverViewEl.classList.add("hidden");
    playViewEl.classList.remove("hidden");

    if (topbarEl) {
        topbarEl.classList.add("playing");
        topbarEl.classList.remove("hidden");
    }

    closeJumpMenu();

    updateNav();

    // Focus once iframe is rendered
    setTimeout(() => {
        gameFrameEl.focus();
    }, 50);
}

// --- Event wiring ------------------------------------------------------

playButtonEl.addEventListener("click", showPlay);
nextBtnEl.addEventListener("click", () => showCover(currentIndex + 1));
prevBtnEl.addEventListener("click", () => {
    // If we're on the first page and have a landing cover, go back to landing
    if (currentIndex === 0 && landingCoverEl) {
        showLanding();
    } else {
        showCover(currentIndex - 1);
    }
});

// Jump menu: toggle on title click (browse mode only)
if (navTitleBtnEl) {
    navTitleBtnEl.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleJumpMenu();
    });
}

// Close jump menu when clicking outside
document.addEventListener("click", (e) => {
    if (!jumpMenuEl || !navTitleBtnEl) return;
    const clickedInside =
        jumpMenuEl.contains(e.target) || navTitleBtnEl.contains(e.target);
    if (!clickedInside) closeJumpMenu();
});

// Close jump menu on Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeJumpMenu();
});

// Fullscreen toggle (maximize button in the top bar)
if (fullscreenToggleBtnEl) {
    fullscreenToggleBtnEl.addEventListener("click", () => {
        toggleFullscreen();
        // update icon/label after the request (in case of instant change)
        updateFullscreenButton();
    });
}

// Keep the button icon in sync with actual fullscreen state
["fullscreenchange", "webkitfullscreenchange", "msfullscreenchange"].forEach(
    (evtName) => {
        document.addEventListener(evtName, () => {
            updateFullscreenButton();
        });
    }
);

// Initialize button icon/label on load
updateFullscreenButton();

// Build the jump menu dropdown
buildJumpMenu();

// Close game (X in the top bar)
if (closePlayBtnEl) {
    closePlayBtnEl.addEventListener("click", () => {
        // Return to this game's cover/about page
        showCover(currentIndex);
    });
}

// Landing cover "Play"/"Enter" button
if (enterMagazineBtnEl) {
    enterMagazineBtnEl.addEventListener("click", () => {
        // Try to put the browser window into fullscreen
        requestFullscreen();

        // Hide landing and show the first magazine page
        showCover(0);

        // Update ?page=1 in the URL for consistency
        const url = new URL(window.location);
        url.searchParams.set("page", "1");
        window.history.replaceState({}, "", url);
    });
}

// Preload all cover + background images in the background
window.addEventListener("load", () => {
    preloadImages();
});

// Home button
const homeBtnEl = document.getElementById("homeBtn");
if (homeBtnEl) {
    homeBtnEl.addEventListener("click", (e) => {
        e.preventDefault(); // avoid navigation
        showLanding();

        // Clean the ?page param
        const url = new URL(window.location);
        url.searchParams.delete("page");
        window.history.replaceState({}, "", url);
    });
}

// --- Init --------------------------------------------------------------

// Grab current page from url param (?page=N)
if (pages.length > 0) {
    const params = new URLSearchParams(window.location.search);
    const pageParam = parseInt(params.get("page"), 10);

    if (Number.isNaN(pageParam)) {
        // No ?page param: show landing screen (if present), otherwise fall back to first page
        if (landingCoverEl) {
            showLanding();
        } else {
            showCover(0);
        }
    } else {
        // ?page=N present: skip landing and go straight to that page
        const initialIndex = Math.min(
            Math.max(pageParam - 1, 0),
            pages.length - 1
        );
        showCover(initialIndex);
    }
}
