// ======================
// 🔥 APPLY LOADING CLASS (INSTANT LOCK VIA CSS)
// ======================
document.documentElement.classList.add("loading");
document.body.classList.add("loading");

// ✅ LOCK SCROLL COMPLETELY (NEW)
function preventScroll(e) {
    e.preventDefault();
}

function lockScroll() {
    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("wheel", preventScroll, { passive: false });
}

function unlockScroll() {
    document.body.style.overflow = "";
    document.removeEventListener("touchmove", preventScroll);
    document.removeEventListener("wheel", preventScroll);
}

// 🔒 lock immediately
lockScroll();


// ALWAYS START PAGE FROM TOP
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};


// ======================
// 🔥 LOADER + LOAD COMPLETE
// ======================
window.addEventListener("load", function () {

    const loader = document.getElementById("pageLoader");

    requestAnimationFrame(() => {
        window.scrollTo(0, 0);
    });

    setTimeout(() => {
        window.scrollTo(0, 0);

        // ✅ hide loader (NEW)
        if (loader) {
            loader.classList.add("hide");
        }

        // ✅ Unlock scroll
        document.documentElement.classList.remove("loading");
        document.body.classList.remove("loading");

        unlockScroll();

    }, 500); // ⬅️ important delay for smooth load
});


// ======================
// ELEMENTS
// ======================
const overlay = document.getElementById("scratchOverlay");
const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
const section = document.querySelector(".intro-section");

let isDrawing = false;
let revealed = false;


// ======================
// CANVAS SETUP
// ======================
function resizeCanvas() {
    canvas.width = overlay.offsetWidth;
    canvas.height = overlay.offsetHeight;

    ctx.globalCompositeOperation = "source-over";
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    gradient.addColorStop(0, "#b8962e");
    gradient.addColorStop(0.25, "#d4af37");
    gradient.addColorStop(0.5, "#f2d57e");
    gradient.addColorStop(0.75, "#d4af37");
    gradient.addColorStop(1, "#8c6b1f");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


// ======================
// INTERSECTION OBSERVER (UNCHANGED)
// ======================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio === 1 && !revealed) {
            lockScroll();
        } else if (!revealed) {
            unlockScroll();
        }
    });
}, { threshold: 1.0 });

observer.observe(section);


// ======================
// SCRATCH FUNCTION (UNCHANGED)
// ======================
function scratch(e) {
    if (!isDrawing || revealed) return;

    const rect = canvas.getBoundingClientRect();

    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    checkReveal();
}


// ======================
// CHECK SCRATCH %
// ======================
function checkReveal() {
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;

    for (let i = 3; i < pixels.data.length; i += 4) {
        if (pixels.data[i] === 0) transparent++;
    }

    let percent = transparent / (pixels.data.length / 4);

    if (percent > 0.15) {
        revealNow();
    }
}


// ======================
// FINAL REVEAL (UNCHANGED)
// ======================
function revealNow() {
    if (revealed) return;
    revealed = true;

    // ✅ 2. Fade out scratch canvas
    canvas.style.transition = "opacity 0.6s ease";
    canvas.style.opacity = "0";

    // ✅ 3. UNLOCK SCROLL (no delay)
    unlockScroll();

    // ✅ 4. TRIGGER CONFETTI (sections already visible)
    triggerConfetti();
}


// ======================
// EVENTS
// ======================
canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", scratch);

canvas.addEventListener("touchstart", () => {
    isDrawing = true;
}, { passive: true });

canvas.addEventListener("touchmove", (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    scratch(e);
}, { passive: false });

canvas.addEventListener("touchend", () => isDrawing = false);


// ======================
// CONFETTI
// ======================
function triggerConfetti() {
    if (typeof confetti !== "function") return;

    confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        scalar: 0.6,
        colors: ["#5c2018", "#c9b18f", "#f4e1d2", "#ffffff"]
    });

    confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        scalar: 1.4,
        colors: ["#d4af37", "#5c2018", "#ffffff"],
        shapes: ["circle"]
    });

    setTimeout(() => {
        confetti({
            particleCount: 80,
            spread: 120,
            scalar: 1,
            colors: ["#d4af37", "#c9b18f", "#ffffff"]
        });
    }, 300);

    // ✅ 1. SHOW ALL SECTIONS IMMEDIATELY
    const belowSections = document.querySelectorAll(
      ".save-date-section, .wedding-text-section, .love-quote-section, .map-section, .rsvp-section"
    );

    belowSections.forEach(sec => {
        sec.classList.remove("hidden");
        sec.classList.add("visible");
    });
}


// ======================
// SCROLL ANIMATION
// ======================
const animatedElements = document.querySelectorAll(".animate-on-scroll");

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

animatedElements.forEach(el => {
    scrollObserver.observe(el);
});

document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector(".banner-video");

    if (video) {
        video.muted = true;
        video.setAttribute("muted", "true");

        video.play().catch(() => {
            console.log("Autoplay blocked");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("rsvpForm");
  const popup = document.getElementById("successPopup");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(window.location.pathname, {  // ✅ submit to current page
      method: "POST",
      body: formData
    })
    .then(() => {
      form.reset();

      setTimeout(() => popup.classList.add("show"), 300);
      setTimeout(() => popup.classList.remove("show"), 2300);

    })
    .catch(() => {
      alert("Something went wrong");
    });
  });
});
