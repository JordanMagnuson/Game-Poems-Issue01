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

// --- CONTENTS PAGE helper ----------------------------------------------
function buildContentsGrid() {
    const container = textContentEl;
    if (!container) return;

    // Clear any existing content (including placeholder HTML)
    container.innerHTML = "";

    // Create four column wrappers:
    // 1) Intro text pages (About, Forward)
    // 2) Games (left half)
    // 3) Games (right half)
    // 4) Final text pages (e.g., Credits & Colophon)
    const introCol = document.createElement("div");
    introCol.className = "toc-column toc-column-intro";

    const gamesLeftCol = document.createElement("div");
    gamesLeftCol.className = "toc-column toc-column-games toc-column-games-left";

    const gamesRightCol = document.createElement("div");
    gamesRightCol.className = "toc-column toc-column-games toc-column-games-right";

    const finalCol = document.createElement("div");
    finalCol.className = "toc-column toc-column-final";

    const gamePages = [];
    const introTextPages = [];
    const finalTextPages = [];

    pages.forEach((p) => {
        if (!p || !p.title) return;

        // Skip the Contents page itself
        if (p.title === "Contents") return;

        if (p.typeOfPage === "game") {
            gamePages.push(p);
        } else if (p.typeOfPage === "text") {
            // Treat initial text pages specially
            if (p.title === "About" || p.title === "Forward") {
                introTextPages.push(p);
            } else {
                // Everything else text-y goes in the final column
                finalTextPages.push(p);
            }
        }
    });

    // Intro column: About, Forward (in that order)
    introTextPages.forEach((p) => {
        const item = document.createElement("div");
        item.className = "toc-item";
        item.textContent = p.title;
        introCol.appendChild(item);
    });

// Split game pages into two roughly equal halves
    const mid = Math.ceil(gamePages.length / 2);
    const leftGames = gamePages.slice(0, mid);
    const rightGames = gamePages.slice(mid);

// Helper to build a game TOC item (title + author)
// Helper to build a game TOC item (cover + title + author)
    function createGameTocItem(p) {
        const item = document.createElement("div");
        item.className = "toc-item toc-item-game";

        // Outer flex container for text (title + author)
        const textWrapper = document.createElement("div");
        textWrapper.className = "toc-text";

        const titleEl = document.createElement("div");
        titleEl.className = "toc-title";
        titleEl.textContent = p.title;
        textWrapper.appendChild(titleEl);

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

    leftGames.forEach((p) => {
        const item = createGameTocItem(p);
        gamesLeftCol.appendChild(item);
    });

    rightGames.forEach((p) => {
        const item = createGameTocItem(p);
        gamesRightCol.appendChild(item);
    });

    // Final column: closing text pages (e.g., Credits & Colophon)
    finalTextPages.forEach((p) => {
        const item = document.createElement("div");
        item.className = "toc-item";
        item.textContent = p.title;
        finalCol.appendChild(item);
    });

    // Append columns to the container in order: intro, games, games, final
    container.appendChild(introCol);
    container.appendChild(gamesLeftCol);
    container.appendChild(gamesRightCol);
    container.appendChild(finalCol);
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

        // If this is the Contents page, populate the grid dynamically
        if (page.title === "Contents") {
            buildContentsGrid();
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

// Landing cover "Play"/"Enter" button
if (enterMagazineBtnEl) {
    enterMagazineBtnEl.addEventListener("click", () => {
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
