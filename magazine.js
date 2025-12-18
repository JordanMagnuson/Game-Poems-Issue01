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
const navTitleEl = document.getElementById("navTitle");
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

        addNotesSection(
            gameBlock,
            getAuthorLabel(page),
            page.aboutAuthor
        );
        addNotesSection(gameBlock, "About the process:", page.aboutProcess);
        addNotesSection(gameBlock, "Paragame acknowledgements:", page.acknowledgements);

        container.appendChild(gameBlock);
    });
}

function buildContentsGrid() {
    const container = textContentEl;
    if (!container) return;

    // Clear any existing content (including placeholder HTML)
    container.innerHTML = "";

    // Helper: get 1-based page number from global pages[]
    function getPageNumber(page) {
        const idx = pages.indexOf(page);
        return idx === -1 ? "" : (idx + 1);
    }

    // Helper: build "Title ..... 12" row
    function createTitleWithPage(page) {
        const row = document.createElement("div");
        row.className = "toc-title";

        const titleText = document.createElement("span");
        titleText.className = "toc-title-text";
        titleText.textContent = page.title;

        const dots = document.createElement("span");
        dots.className = "toc-dots";

        const pageSpan = document.createElement("span");
        pageSpan.className = "toc-page";
        pageSpan.textContent = getPageNumber(page);

        row.appendChild(titleText);
        row.appendChild(dots);
        row.appendChild(pageSpan);
        return row;
    }

    // Helper to build a game TOC item (cover + title + author)
    function createGameTocItem(p) {
        const item = document.createElement("div");
        item.className = "toc-item toc-item-game";

        // Outer flex container for text (title + author)
        const textWrapper = document.createElement("div");
        textWrapper.className = "toc-text";

        // Title row with dotted leaders + page number
        const titleRow = createTitleWithPage(p);
        textWrapper.appendChild(titleRow);

        if (p.author) {
            const authorEl = document.createElement("div");
            authorEl.className = "toc-author";
            authorEl.textContent = p.author;
            textWrapper.appendChild(authorEl);
        }

        // Cover image on the left
        const coverSrc = getCoverSrc(p);
        if (coverSrc) {
            const img = document.createElement("img");
            img.className = "toc-cover";
            img.src = coverSrc;
            img.alt = p.title ? `${p.title} cover` : "Game cover";

            // Layout order: [image][text]
            item.appendChild(img);
            item.appendChild(textWrapper);
        } else {
            // Fallback: no image available, just text
            item.appendChild(textWrapper);
        }

        return item;
    }

    // Helper: build a TOC item for any page type
    function createTocItem(p) {
        if (p.typeOfPage === "game") {
            return createGameTocItem(p);
        }

        // Text pages: reserve the same "cover slot" area as game entries
        const item = document.createElement("div");
        item.className = "toc-item toc-item-text";

        const placeholder = document.createElement("div");
        placeholder.className = "toc-cover-placeholder";

        const textWrapper = document.createElement("div");
        textWrapper.className = "toc-text";
        textWrapper.appendChild(createTitleWithPage(p));

        // Layout order: [placeholder][text]
        item.appendChild(placeholder);
        item.appendChild(textWrapper);

        return item;
    }

    // Create three equal columns
    const colA = document.createElement("div");
    colA.className = "toc-column toc-column-a";

    const colB = document.createElement("div");
    colB.className = "toc-column toc-column-b";

    const colC = document.createElement("div");
    colC.className = "toc-column toc-column-c";

    // Build a single ordered list of TOC pages:
    // - keep the order from pages[]
    // - skip the Contents page itself
    const tocPages = pages.filter((p) => p && p.title && p.title !== "Contents");

    // --- Manual TOC column sizing (tweak these numbers) ---
    const COL1_COUNT = 6; // number of items in column 1
    const COL2_COUNT = 5; // number of items in column 2
    // column 3 will contain the rest

    // (Optional safety) clamp counts so weird values can't break slicing
    const safeCol1 = Math.max(0, Math.min(COL1_COUNT, tocPages.length));
    const safeCol2 = Math.max(0, Math.min(COL2_COUNT, tocPages.length - safeCol1));

    // Split into three consecutive chunks (column-major reading order)
    const chunkA = tocPages.slice(0, safeCol1);
    const chunkB = tocPages.slice(safeCol1, safeCol1 + safeCol2);
    const chunkC = tocPages.slice(safeCol1 + safeCol2);

    chunkA.forEach((p) => colA.appendChild(createTocItem(p)));
    chunkB.forEach((p) => colB.appendChild(createTocItem(p)));
    chunkC.forEach((p) => colC.appendChild(createTocItem(p)));

    // Append the three columns
    container.appendChild(colA);
    container.appendChild(colB);
    container.appendChild(colC);
}

// --- Rendering functions ----------------------------------------------

function updateNav() {
    const page = pages[currentIndex];
    const atFirstPage = currentIndex === 0;
    navTitleEl.textContent = page.title || "Page";
    pageIndicatorEl.textContent = `Page ${currentIndex + 1} of ${pages.length}`;
    prevBtnEl.disabled = atFirstPage && !landingCoverEl;
    nextBtnEl.disabled = currentIndex === pages.length - 1;
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
