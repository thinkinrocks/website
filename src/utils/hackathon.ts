export function initHeroScroll() {
    const bgImage = document.getElementById("hero-bg-image");
    const parallaxBg = document.getElementById("parallax-bg");

    let handVisible = true;

    // IntersectionObserver to track visibility
    if (bgImage) {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                handVisible = entry.intersectionRatio > 0 && entry.isIntersecting;
            },
            { threshold: 0.01 }
        );
        observer.observe(bgImage);
    }

    let lastHandOpacity: number | null = null;
    let lastHandSaturate: number | null = null;
    let lastHandTransform: string | null = null;
    let lastParallaxTransform: string | null = null;

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Marble hand fade and move
        if (bgImage) {
            const progress = Math.min(1, Math.max(0, scrollY / 400));
            const opacity = 1 - progress;
            const saturate = 1 - progress;
            if (lastHandOpacity !== opacity) {
                bgImage.style.opacity = opacity.toString();
                lastHandOpacity = opacity;
            }
            if (lastHandSaturate !== saturate) {
                bgImage.style.filter = `saturate(${saturate})`;
                lastHandSaturate = saturate;
            }
        }

       

       
    };

    let ticking = false;
    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
}

export function initTimeline() {
    const now = Date.now();
    const events = document.querySelectorAll(".timeline-event");
    const progressLine = document.getElementById("timeline-progress-line");
    if (!progressLine || events.length === 0) return;
    
    let lastPassedTop = 0;
    let lastDate = 0;
    let nextTop = 0;
    let nextDate = 0;

    events.forEach((el) => {
        const dateAttr = el.getAttribute("data-date");
        if (!dateAttr) return;
        
        const timestamp = new Date(dateAttr).getTime();
        const dot = el.querySelector(".timeline-dot");
        const dateText = el.querySelector(".timeline-date");
        const htmlEl = el as HTMLElement;
        const dotTop = htmlEl.offsetTop + 20; // 20px because of top-5

        if (now >= timestamp) {
            if (dot) {
                dot.classList.remove("bg-muted");
                dot.classList.add("bg-fuchsia-500");
            }
            if (dateText) {
                dateText.classList.remove("text-muted-foreground");
                dateText.classList.add("text-fuchsia-500");
            }
            lastPassedTop = dotTop;
            lastDate = timestamp;
        } else {
            if (nextTop === 0) {
                nextTop = dotTop;
                nextDate = timestamp;
            }
        }
    });

    let finalHeight = 0;
    if (lastPassedTop === 0) {
        finalHeight = 0;
    } else if (nextTop === 0) {
        finalHeight = lastPassedTop;
    } else {
        const timeDiff = nextDate - lastDate;
        const timePassed = now - lastDate;
        const ratio = Math.max(0, Math.min(1, timePassed / timeDiff));
        finalHeight = lastPassedTop + (nextTop - lastPassedTop) * ratio;
    }

    progressLine.style.height = `${finalHeight}px`;
}

export function initSmoothScroll() {
    const rulesLink = document.getElementById("view-rules-link");
    if (!rulesLink) return;

    rulesLink.addEventListener("click", (e) => {
        e.preventDefault();
        const rulesSection = document.getElementById("rules");
        if (rulesSection) {
            const targetPosition = rulesSection.getBoundingClientRect().top + window.scrollY;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 1500; // 1.5 seconds duration
            let start: number | null = null;

            window.requestAnimationFrame(function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percent = Math.min(progress / duration, 1);
                
                // easeInOutCubic smoothing
                const easing = percent < 0.5 
                    ? 4 * percent * percent * percent 
                    : 1 - Math.pow(-2 * percent + 2, 3) / 2;

                window.scrollTo(0, startPosition + distance * easing);

                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            });
        }
    });
}
