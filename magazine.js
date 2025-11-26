// --- Page data ---------------------------------------------------------
const pages = [
    {
        typeOfPage: "text",
        title: "Contents",
        background: "background.png",
        themeColor: "0000bf",
        pageContent: `
                <p>[Table of Contents]</p>
            `
    },
    {
        typeOfPage: "text",
        title: "About",
        background: "background.png",
        themeColor: "0000bf",
        pageContent: `
                <div class="column">
                    <h2>Mission</h2>
                    <p><em>Game Poems</em> is an interactive magazine dedicated to exploring the artistic and poetic potential of short-form videogames by publishing new work directly in a playable format. The magazine foregrounds the convergences that exist between game making and poetry, highlights "born-videogame" poetics, and champions videogame creation as a legitimate and accessible form of poetic practice.</p>
                </div>
                <div class="column">
                    <h2>Founding Editor & Publisher</h2>
                    <ul><li>Jordan Magnuson</li></ul>
                    <h2>Editorial Collective</h2>
                    <ul>
                        <li>Gregory Avery-Weir</li>
                        <li>Jarory de Jesus</li>
                        <li>Farhanaz "Joy" Kassee-Elahee</li>
                        <li>Jordan Magnuson</li>
                        <li>Jon Stone</li>
                        <li>Agata Waszkiewicz</li>
                    </ul>
                    <h2>Production Team</h2>
                    <ul>
                        <li>John Domenico Calvelli</li>
                        <li>Matt Griffin</li>
                        <li>Jordan Magnuson</li>
                    </ul>
                    <h2>Advisory Board</h2>
                    <ul>
                        <li>Andrew Baillie</li>
                        <li>Hannah Brooks-Motl</li>
                        <li>Kavi Duvoori</li>
                        <li>Noah Wardrip-Fruin</li>
                        <li>Shelby Wilson</li>
                    </ul>
                    <h2>Special Thanks</h2>
                    <ul>
                        <li>Nick Montfort</li>
                    </ul>
                </div>
                <div class="column">
                    <h2>First Readers</h2>
                    <ul>
                        <li>June Audirac</li>
                        <li>Tex Barnes</li>
                        <li>Art Baum</li>
                        <li>Stanley Baxton</li>
                        <li>Torien Cafferata</li>
                        <li>Alex Calderwood</li>
                        <li>Pedro Cardoso</li>
                        <li>Jerram Carr</li>
                        <li>Vania Castagnino</li>
                        <li>Gary Chadwick</li>
                        <li>Eva Chang</li>
                        <li>Wei Ting Chia</li>
                        <li>Drice Ducongé Dos Santos</li>
                        <li>Kavi Duvvoori</li>
                        <li>Anna Eyler</li>
                        <li>Rafael Fajardo</li>
                        <li>Cyril Focht</li>
                        <li>Melanie Fussenegger</li>
                        <li>Claudia Garza</li>
                        <li>Drew Genel</li>
                        <li>Vidya Giri</li>
                        <li>Matt Griffin</li>
                        <li>Aren Guralp</li>
                        <li>Haochen Han</li>
                        <li>Farfama Hargaaya</li>
                    </ul>
                </div>
                <div class="column">
                    <h2 style="visibility:hidden">First Readers</h2>
                    <ul>
                        <li>Anna Kucerova</li>
                        <li>Zihan Liu</li>
                        <li>Shanel Locke</li>
                        <li>Christoffer Lundberg</li>
                        <li>Hélène Lupa</li>
                        <li>Tanel Marran</li>
                        <li>Thomas Martin</li>
                        <li>Terhi Marttila</li>
                        <li>Nat Mesnard</li>
                        <li>Leon Noel Micheel</li>
                        <li>Zeynab Mirzadeh</li>
                        <li>Alex Mitchell</li>
                        <li>Óscar A. Montiel</li>
                        <li>Devinne Moses</li>
                        <li>Ignacio Puccini</li>
                        <li>Yvens Rebouças Serpa</li>
                        <li>Tim Samoff</li>
                        <li>Zhang Sicheng</li>
                        <li>Dawn Sueoka</li>
                        <li>Alexander Swords</li>
                        <li>Semkan Uragan</li>
                        <li>Yohanna Waliya</li>
                        <li>Afra Willems</li>
                        <li>Khalil Zeigler</li>
                    </ul>
                </div>
            `
    },
    {
        typeOfPage: "text",
        title: "Forward",
        themeColor: "0000bf",
        background: "background.png",
        pageContent: `
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus, ex id suscipit finibus, tortor libero commodo purus, quis tempor est mi non libero. Phasellus viverra ac nisi at interdum. Phasellus accumsan rhoncus felis. Mauris blandit commodo risus, lacinia sollicitudin ligula tincidunt id. Mauris rhoncus arcu in sapien pulvinar commodo. Quisque nec odio ac risus varius rutrum. Sed hendrerit auctor risus sit amet volutpat. Vivamus sed tortor nibh. Duis in iaculis velit. Proin sit amet auctor dui.</p>
                <p>Pellentesque eu ornare nulla, a bibendum neque. Mauris pretium dolor et augue mollis tincidunt. Proin sem risus, semper in tellus eget, tincidunt semper risus. Ut quis lorem vel felis pretium dictum non in massa. Nullam vel porta velit. Sed varius sapien diam, vitae tincidunt magna fermentum a. Ut pulvinar quam ac neque vulputate, ac posuere nibh tempor. Quisque aliquam velit eget laoreet sagittis.</p>
                <p>Vestibulum eu diam metus. In hac habitasse platea dictumst. Praesent consectetur metus nec augue vehicula, in accumsan ipsum aliquet. Aenean tristique consequat metus eget tincidunt. Curabitur ac egestas odio. Integer ut sollicitudin lectus. Etiam iaculis est libero, id bibendum ex rhoncus ac. Aliquam luctus enim at magna convallis vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam egestas, ante scelerisque volutpat luctus, augue dui ornare nunc, in lacinia quam justo eu libero. Pellentesque varius augue eget magna elementum rhoncus. Aenean aliquam lobortis augue, a tempus lacus lobortis eu. In et pulvinar risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla sodales metus nec orci auctor tincidunt.</p>
                <p>Vestibulum tincidunt ex mi, feugiat suscipit risus molestie pretium. Cras dignissim massa vitae augue dictum luctus. Cras dignissim sem a lobortis fermentum. Proin ipsum urna, sodales venenatis pretium et, convallis nec nunc. Ut quis eros ut metus dignissim hendrerit porta ut purus. Donec sodales nisl in sapien tempus rhoncus. Sed at mi sed arcu posuere dapibus vel in eros. Donec placerat mauris sed urna dictum hendrerit. Proin ac lacinia magna. Etiam elit urna, ultricies pretium tempor eget, tincidunt eget tortor. Fusce ullamcorper aliquam augue sed dictum.</p>
                <p>Integer rutrum iaculis est ac ultricies. Integer a vestibulum purus. Phasellus bibendum tempus purus. Morbi malesuada sodales velit sed ultrices. Phasellus efficitur massa in massa posuere, id aliquam magna gravida. Ut dolor ipsum, laoreet sed tortor at, hendrerit fringilla leo. Aliquam ornare efficitur massa ut congue. Cras bibendum est volutpat nibh interdum sollicitudin eget non lorem. Curabitur tortor magna, faucibus semper est nec, mollis ultricies leo. Sed rutrum, lectus eu semper finibus, est justo consectetur eros, a lobortis mi ex sit amet elit. In hac habitasse platea dictumst. Nulla porttitor eu enim et cursus. Nullam nulla neque, accumsan nec dui vel, maximus auctor tortor. Cras faucibus consequat turpis, at dapibus risus iaculis in. Maecenas eros tellus, placerat id tristique tristique, tempor et ex.</p>
                <p>—Jordan Magnuson</p>
            `
    },
    {
        typeOfPage: "game",
        title: "Hesitation",
        slug: "hesitation",
        src: "games/hesitation/index.html",
        madeWith: "Godot",
        author: "Yifan Yuan",
        location: "Hangzhou, China",
        estimatedPlayTime: "5-10 minutes.",
        instructions: "You the mouse to interact.",
        overWhen: "You see 'Game Over,' or you decide to step away.",
        statement: `<p>地上的缝隙<br/>触及几片花瓣<br/>夏天的风</p><p>Gaps in the ground<br/>a few petals touched<br/>summer wind</p><p>Whether in games or in life, making choices is always key to action. In this game, I want players to simply experience the feeling of difficult decisions, without pressure from story or resource management.</p>`
    },
    {
        typeOfPage: "game",
        title: "On Second Thought",
        slug: "on-second-thought",
        src: "games/on-second-thought/index.html",
        themeColor: "#204988",
        madeWith: "Unity",
        author: "Tereza Kotěšovcová",
        location: "Prague, Czech Republic",
        estimatedPlayTime: "Less than 5 minutes.",
        instructions: "Click or press spacebar to interact.",
        overWhen: "You see the restart screen.",
        statement: `<p>This is a tiny game about reaching out and everything that gets in the way.</p><p>You hesitate. You imagine the worst. Miss your moment, and the world will stutter: a coffee spills, a sun is eclipsed, a temple crumbles.</p><p>You start again.</p>`
    },
    {
        typeOfPage: "game",
        title: "Like I Never Moved at All",
        slug: "like-i-never",
        src: "games/like-i-never/index.html",
        themeColor: "#0D0D19",
        madeWith: "Unity",
        author: "Adam Pype",
        location: "Seoul, South Korea",
        estimatedPlayTime: "Less than 5 minutes.",
        contentWarning: "Rotational movement that could be uncomfortable for players sensitive to motion sickness.",
        instructions: "Use the left and right arrow keys to turn the diorama. It's recommended to read the poem by cycling with the right arrow, but the poem is written to work in both directions and even loops around, so you can't interact with it in a \"wrong\" way.",
        overWhen: "You reach the end of the poem (or not).",
        statement: `<p>I wanted to make a short piece about my feelings around moving, having lived in different places and the weird disconnect I feel between them. I'm from Belgium, but I moved to South Korea a couple years ago, and I find myself drifting back and forth between the life I left behind and the new life I built for myself.</p><p>It's an attempt at trying to capture a very specific feeling of having only yourself to rely on as a home, when the places you cycle through are constantly fleeting and you can't process them all existing at once.</p>`
    },
    {
        typeOfPage: "game",
        title: "Firsts",
        slug: "firsts",
        src: "games/firsts/index.html",
        themeColor: "#2E2622",
        madeWith: "Unity",
        author: "Geoffrey Mugford",
        location: "London, UK",
        estimatedPlayTime: "Less than 5 minutes.",
        instructions: "Use the mouse to interact. Press any key to pause or leave the game.",
        overWhen: "You see the end screen.",
        statement: `<p>Firsts is a quiet exploration of what it feels like to begin — each gesture a small act of discovery, each scene a different kind of first step. It's rooted in a moment many of us know: leaving home, being reshaped by the world, and returning in a form our loved ones might still recognise — whether or not we meant to change.</p>`
    },
    {
        typeOfPage: "game",
        title: "Lessons In Anatomy",
        slug: "lessons",
        src: "games/lessons/index.html",
        themeColor: "#000000",
        cover: "games/lessons/cover.jpg",
        background: "games/lessons/background.jpg",
        madeWith: "Bitsy",
        author: "Kaitlin Bonfiglio",
        invited: true,
        location: "Los Angeles, USA",
        estimatedPlayTime: "Less than 5 minutes.",
        contentWarning: "Mentions of blood, especially pain with sex, medical gaslighting. No graphic visual content.",
        instructions: "Use the arrow keys to move and interact.",
        overWhen: "The game restarts.",
        statement: `<p>We are constantly rethinking and renegotiating and relearning and reexploring our bodies. I thought about the first time I had sex, and the first time I had sex that was pleasurable to me. Both were first moves that, though tentative, influenced the trajectory of my life. As someone with chronic pelvic pain, pain and pleasure have always danced too close for comfort in my own sexual journey. I can't seem to have one without the other. I wanted to explore that intersection, or bond, or duality. It was a challenge to represent — especially in the constrained environment of Bitsy as a game-making tool. I loved how much it reminded me of writing poetry, capturing a deep emotional moment in just a handful of words & lines. Each decision demanded thoughtfulness and care. This is not unlike the process of negotiating consent and pleasure in intimacy.</p>`
    },
    {
        typeOfPage: "game",
        title: "Vincent",
        slug: "vincent",
        src: "games/vincent/index.html",
        themeColor: "#3C4E62",
        cover: "games/vincent/cover.avif",
        background: "games/vincent/background.avif",
        madeWith: "Unity",
        author: "Melanie Wigger",
        location: "Bern, Switzerland",
        estimatedPlayTime: "Less than 5 minutes.",
        instructions: "Use the mouse to interact.",
        overWhen: "You reach the end screen.",
        statement: `<p>The game-poem mirrors the moment of reaching for a familiar tool, only to find it's changed and no longer makes sense. Each attempt reflects how even the simplest first step can become unstable and disorienting.</p>`
    },
    {
        typeOfPage: "game",
        title: "Asunder",
        slug: "asunder",
        src: "games/asunder/index.html",
        themeColor: "#4F1521",
        madeWith: "Unity",
        author: "Ash Rezvani, Brittany Westlund, Kate Lloyd",
        location: "Missoula, USA",
        estimatedPlayTime: "5-10 minutes",
        contentWarning: "Soundscape may be triggering for those who struggle with auditory hallucinations.",
        instructions: "Use the mouse to interact.",
        overWhen: "You escape the chaos. (At least for a time.)",
        statement: `<p>We think chaos can be beautiful and generative, but sometimes, internal chaos feels like a spreading wound. The hardest part of healing is taking the first step, making the first move, starting the process of calming the mind.</p><p>It's a daily, Sisyphean task: clearing your head so that you can enjoy the music life has to offer.</p>`
    },
    {
        typeOfPage: "game",
        title: "SNAKISMS 2: Snakes We Live By, Volume 1: A-M",
        slug: "snakisms",
        src: "games/snakisms/index.html",
        madeWith: "Phaser",
        author: "Pippin Barr",
        invited: true,
        location: "Montréal, Canada",
        estimatedPlayTime: "Less than 5 minutes.",
        instructions: "Use the arrow keys to interact.",
        overWhen: "You choose to depart.",
        statement: `<p>Agroterrorism! Snakisms! Escapism! Snakisms! Monotheism! Idealism! Snakisms! Snakisms! It's all Snake to me!</p><p>SNAKISMS 2: Snakes We Live By, Volume 1: A-M is a sequel to SNAKISMS based on the observation that some "ism" words describe the basic game of Snake (or its player, or its designer) accurately or interestingly from different philosophical, political, social, or other positions.</p>`
    },
    {
        typeOfPage: "game",
        title: "Gambit",
        slug: "gambit",
        src: "games/gambit/index.html",
        themeColor: "#071821",
        madeWith: "GB Studio",
        author: "Caitlin DeRosa",
        location: "West Islip, USA",
        estimatedPlayTime: "Less than 5 minutes.",
        instructions: "It's a Game Boy game, so on a computer the controls indicated on screen are different than what they will be on the keyboard (for example, the game will say \"Press Start Button\"). All controls are mapped to Z for interaction and the arrow keys to move.",
        overWhen: "You reach the end screen.",
        statement: `<p>My intent with Gambit was to create an experience that reflects the feeling of being trapped in what you are doing. I wanted to parallel my own experiences of working "on autopilot" by emphasizing repetition and retrieval of trivial items in the gameplay.</p><p>I am doing labor that is unfulfilling due to its repetitive nature, but I find it stable and familiar for those same reasons, which makes it hard to justify leaving.</p>`
    },
    {
        typeOfPage: "game",
        title: "A look of glass stops you.",
        slug: "look-of-glass",
        src: "games/look-of-glass/index.html",
        madeWith: "Bitsy",
        author: "Brendan Allen",
        location: "Toronto, Canada",
        estimatedPlayTime: "Less than 5 minutes.",
        instructions: "Use the arrow keys to move and interact.",
        overWhen: "The game restarts.",
        statement: `<p>Meeting strangers is hard.<br/>Perceiving them is harder.<br/>Try, and try again.</p><p>—<br/>Built in Bitsy (engine by Adam Le Doux). Supplemented further by Rob Duarte's "Old Bitsy" archive of Bitsy 7.12, Sean S. Leblanc's "dialog pause" hack, and Max Bradbury's "Pixsy." Line art adapted from reference key to the painting, "The Old Club" by J.E. Sampson, as found on the wall of the Arts & Letters Club of Toronto. Made with immense love for John Ashbery's poem, "As One Put Drunk Into the Packet-Boat" (from which I've borrowed a few lines).</p>`
    },
    {
        typeOfPage: "game",
        title: "Tropic of Dinosaur",
        slug: "tropic",
        src: "games/tropic/index.html",
        themeColor: "#6E2923",
        madeWith: "Unity",
        author: "Roman Gvozdev",
        location: "Nizhni Novgorod, Russia",
        estimatedPlayTime: "10-20 minutes.",
        contentWarning: "Intense visual landscape that could be uncomfortable for players sensitive to motion sickness.",
        instructions: "Move your mouse to drag. Press space to pause or leave the game.",
        overWhen: "The game fades to black.",
        statement: `<p>This game poem is a reflection of my own aging, excitement about the past, about life, the world around me, my anxiety about how I've been living my life, and if I ever was a master of my own being or always have been dragged by somebody or something.</p>`
    },
    {
        typeOfPage: "game",
        title: "The Ur Game",
        slug: "ur-game",
        src: "games/ur-game/index.html",
        cover: "games/ur-game/cover.jpg",
        background: "games/ur-game/background.jpg",
        madeWith: "Godot",
        author: "Gregory Avery-Weir",
        editor: true,
        location: "Charlotte, USA",
        estimatedPlayTime: "10-20 minutes. Note: when loading, the game may appear stuck on the '...' loading screen, but will usually load within a minute or two.",
        instructions: "Click to interact. The game is a riddle, but there is an ending.",
        overWhen: "The game fades to white.",
        statement: `<p>Ursula K. Le Guin said that the power of capitalism "seems inescapable; so did the divine right of kings." When you internalize the supposed rules of a game, it's hard to remember that we made up those rules. At any moment, we can stop playing the game... but what could life possibly look like afterward?</p><p>We can't manifest a world without cruelty, oppression, and poverty if we play by the rules of our current game. The rules cannot imagine a just world, because the rich and powerful who maintain those rules want to prevent that world from being born. Our current world is imprisoned by unjust rules, and transforming it into a nurturing one will require an act of magic.</p><p>You know why it's so hard to beat a magician at cards? They cheat.</p>`
    },
    {
        typeOfPage: "game",
        title: "[começar coisas terminadas]",
        slug: "terminadas",
        src: "games/terminadas/index.html",
        madeWith: "Unity",
        author: "Isaque Sanches",
        location: "Bucharest, Romania",
        estimatedPlayTime: "Less than 5 minutes.",
        instructions: "Use the arrow keys to interact.",
        overWhen: "",
        statement: `<p>I had the idea of making "começar coisas terminadas" (trans. "to start ended things") when I was driving my car through a long road in Portugal in the summer of 2020. The global pandemic lockdown had just started, and I was extremely vulnerable at the moment.</p>
                        <p>My father died when I was 12, in a car crash; in a road that was quite similar to the one I was in, and not too far from where I was now either, almost two decades later. He died an instant death.</p>
                        <p>More than his absence, I think what had a bigger impact on me as a child was his sudden, unannounced and unceremonious departure.</p>`
    },
    {
        typeOfPage: "text",
        title: "Credits & Colophon",
        background: "background.png",
        themeColor: "0000bf",
        pageContent: `
                <div class="column">
                    [Cover image here]
                </div>
                <div class="column">
                    <h2>Cover</h2>
                    <p>Cover art by Yifan Yuan.</p>
                    <h2>Type</h2>
                    <p><em>Casual Encounter</em> font by Anna Anthropy. <em>04</em> font by Yuji Oshimoto. <em>Inter</em> font by Rasmus Andersson.</p>
                    <h2>Honoraria</h2>
                    <p>Honoraria are offered with support from Winchester School of Art, University of Southampton.</p>
               </div>
               <div class="column">
                    <h2>Accessibility</h2>
                    <p>We use WAVE and other standard HTML5 accessibility tools to test for accessibility issues. If you have any concerns or suggestions, please contact us.</p>
                    <h2>Independence</h2>
                    <p><em>Game Poems</em> is an independent publication.</p>
                    <h2>Contact</h2>
                    <p>Web: GamePoems.com<br/>Email: info@gamepoems.com</p>
                </div>
                <div class="column">
                    <h2>License</h2>
                    <p><em>Game Poems</em> is an open access publication, distributed under a CC&nbsp;BY&nbsp;4.0 license. You are free to copy and redistribute the magazine and the games published within it as long as you give appropriate credit, provide a link to the license, and indicate if changes were made. Full license details can be found at creativecommons.org/licenses/by/4.0/.</p>
                </div>
            `
    }
];

// --- DOM references ----------------------------------------------------

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

// --- Rendering functions ----------------------------------------------

function updateNav() {
    const page = pages[currentIndex];
    navTitleEl.textContent = page.title || "Page";
    pageIndicatorEl.textContent = `Page ${currentIndex + 1} of ${pages.length}`;
    prevBtnEl.disabled = currentIndex === 0;
    nextBtnEl.disabled = currentIndex === pages.length - 1;
}

function showCover(index) {
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
prevBtnEl.addEventListener("click", () => showCover(currentIndex - 1));
nextBtnEl.addEventListener("click", () => showCover(currentIndex + 1));

// Preload all cover + background images in the background
window.addEventListener("load", () => {
    preloadImages();
});

// --- Init --------------------------------------------------------------

// Grab current page from url param (?page=N)
if (pages.length > 0) {
    const params = new URLSearchParams(window.location.search);
    const pageParam = parseInt(params.get("page"), 10);

    let initialIndex = 0;
    if (!Number.isNaN(pageParam)) {
        // convert 1-based ?page=N into 0-based index
        initialIndex = Math.min(Math.max(pageParam - 1, 0), pages.length - 1);
    }

    showCover(initialIndex);
}