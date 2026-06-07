/* --- Sri Vidhya Loganathan's 21st Birthday Surprise JS --- */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- QUERY PARAMETER OR HASH BYPASS (For testing/previewing before June 10) ---
    const urlParams = new URLSearchParams(window.location.search);
    const bypassCountdown = urlParams.get('bypass') === 'true' || window.location.hash === '#bypass';

    // --- INITIALIZE LUCIDE ICONS ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- PRELOADER ANIMATION ---
    const preloader = document.getElementById("preloader");
    const loaderBar = document.querySelector(".loader-bar");
    const mainContent = document.getElementById("main-content");
    let progress = 0;

    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Fade out preloader and fade in main content
            setTimeout(() => {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
                
                // Show main content with GSAP
                mainContent.style.opacity = "1";
                gsap.to(mainContent, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        initScrollAnimations();
                    }
                });
            }, 600);
        }
        loaderBar.style.width = progress + "%";
    }, 120);


    // --- TYPEWRITER EFFECT ---
    const typingTextEl = document.getElementById("typing-text");
    const phrases = [
        "A special surprise made just for you...",
        "Celebrating 21 beautiful years...",
        "Tap the cards to explore why you're special...",
        "Hope this brings a huge smile to your face! ❤️"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30; // Delete faster
        } else {
            typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 70; // Type normal
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2500; // Pause at the end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting next phrase
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typewriter
    setTimeout(typeEffect, 1000);


    // --- LIVE COUNTDOWN TIMER ---
    // Target Date: 10 June 2026, 12:00 AM Indian Standard Time (GMT+05:30)
    // Note: JS Date constructor accepts a string or values. Using UTC values matches GMT+05:30:
    // June 10 is month index 5. June 9 at 18:30:00 UTC is June 10 at 00:00:00 IST.
    const targetDate = new Date(Date.UTC(2026, 5, 9, 18, 30, 0)); 
    
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    
    const enterBtn = document.getElementById("enter-btn");
    const btnHint = document.getElementById("btn-hint");
    const heroTitle = document.getElementById("hero-title");

    let timerInterval;

    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;

        if (bypassCountdown || difference <= 0) {
            // Target date reached!
            clearInterval(timerInterval);
            
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            
            // Unlock Website
            enterBtn.classList.remove("disabled");
            enterBtn.removeAttribute("disabled");
            btnHint.innerHTML = "Surprise unlocked! Click above to enter ✨";
            btnHint.style.color = "var(--sweet-rose)";
            heroTitle.textContent = "🎉 It's Finally Your Day Sri Vidhya! 🎉";
            
            // Trigger automatic initial confetti blast!
            if (!enterBtn.dataset.triggered) {
                triggerConfettiExplosion();
                enterBtn.dataset.triggered = "true";
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately

    // Hero Enter Button scrolls to Meet Section
    enterBtn.addEventListener("click", () => {
        if (enterBtn.classList.contains("disabled")) return;
        
        triggerConfettiExplosion();
        
        const nextSection = document.getElementById("profile-section");
        nextSection.scrollIntoView({ behavior: "smooth" });
    });


    // --- FLOATING PARTICLES & BALLOONS SYSTEM ---
    const particleContainer = document.getElementById("particle-container");
    const maxParticles = 25;
    let activeParticlesCount = 0;

    const particleSVGs = {
        heart: `<svg viewBox="0 0 32 29.6" class="floating-particle-svg" style="fill: var(--sweet-rose); width: 100%; height: 100%;"><path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/></svg>`,
        butterfly: `<svg viewBox="0 0 50 50" class="floating-particle-svg" style="fill: var(--accent-lavender); width: 100%; height: 100%;"><path d="M25,18 C23.5,13 18,10 13,11 C8,12 5,17 7,23 C8.5,27.5 13,31 22,34.5 C20,38 16,40.5 11,40 C7,39.5 5,43 8,45 C11,47 18,45 22,41.5 C23.5,43 25,43 25,43 C25,43 26.5,43 28,41.5 C32,45 39,47 42,45 C45,43 43,39.5 39,40 C34,40.5 30,38 28,34.5 C37,31 41.5,27.5 43,23 C45,17 42,12 37,11 C32,10 26.5,13 25,18 Z"/></svg>`,
        sparkle: `<svg viewBox="0 0 24 24" class="floating-particle-svg" style="fill: var(--gold-glow); width: 100%; height: 100%;"><path d="M12,0 L14.7,9.3 L24,12 L14.7,14.7 L12,24 L9.3,14.7 L0,12 L9.3,9.3 Z"/></svg>`
    };

    function spawnParticle() {
        if (activeParticlesCount >= maxParticles) return;

        const particle = document.createElement("div");
        particle.className = "floating-particle";
        
        // Randomly choose a particle type
        const types = ["heart", "butterfly", "sparkle", "glow"];
        const chosenType = types[Math.floor(Math.random() * types.length)];
        
        let size = Math.floor(Math.random() * 20) + 12; // 12px to 32px
        if (chosenType === "glow") size = Math.floor(Math.random() * 12) + 6; 
        
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        
        // Set content
        if (chosenType === "glow") {
            particle.style.borderRadius = "50%";
            particle.style.background = "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(195,164,255,0.4) 60%, transparent 100%)";
            particle.style.boxShadow = "0 0 10px rgba(195,164,255,0.8)";
        } else {
            particle.innerHTML = particleSVGs[chosenType];
        }

        // Random horizontal start position
        const xPos = Math.random() * 100;
        particle.style.left = xPos + "vw";
        
        particleContainer.appendChild(particle);
        activeParticlesCount++;

        const duration = Math.random() * 8 + 6; // 6 to 14 seconds
        const delay = Math.random() * 2;
        const drift = (Math.random() * 140) - 70;
        const scaleEnd = Math.random() * 0.4 + 0.7;

        // GSAP animate
        gsap.fromTo(particle, 
            { 
                y: 0, 
                opacity: 0, 
                scale: 0.5,
                rotation: Math.random() * 45 - 22.5
            },
            {
                y: -(window.innerHeight + 100),
                x: drift,
                opacity: Math.random() * 0.35 + 0.35, 
                scale: scaleEnd,
                rotation: Math.random() * 360 - 180,
                duration: duration,
                delay: delay,
                ease: "power1.out",
                onComplete: () => {
                    particle.remove();
                    activeParticlesCount--;
                }
            }
        );
    }

    // Continuously spawn background particles
    setInterval(spawnParticle, 550);


    // --- DEDICATED BALLOON FLOATING SYSTEM ---
    const balloonColors = [
        "hsl(340, 100%, 82%)", // Pastel Pink
        "hsl(270, 100%, 88%)", // Pastel Lavender
        "hsl(260, 100%, 80%)", // Pastel Purple
        "hsl(45, 100%, 80%)",  // Pastel Gold
        "hsl(343, 100%, 73%)", // Pastel Rose Pink
        "hsl(190, 100%, 82%)", // Pastel Cyan/Teal
        "hsl(15, 100%, 82%)"   // Pastel Peach
    ];

    function spawnBalloon() {
        const balloon = document.createElement("div");
        balloon.className = "floating-balloon";
        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        const size = Math.floor(Math.random() * 35) + 40; // 40px to 75px
        
        balloon.style.width = size + "px";
        balloon.style.height = (size * 2.2) + "px";
        
        // Inject shiny balloon SVG with reflection and wavy string
        balloon.innerHTML = `
            <svg viewBox="0 0 30 70" style="width: 100%; height: 100%;">
                <ellipse cx="15" cy="20" rx="13" ry="17" fill="${color}"/>
                <ellipse cx="10" cy="14" rx="3.5" ry="5.5" fill="rgba(255,255,255,0.45)"/>
                <polygon points="15,37 11,41 19,41" fill="${color}"/>
                <path d="M15,41 Q11,50 18,59 T13,70" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
            </svg>
        `;

        const xPos = Math.random() * 92; // slightly off edges
        balloon.style.left = xPos + "vw";
        balloon.style.position = "absolute";
        balloon.style.bottom = "-180px";
        balloon.style.pointerEvents = "none";
        balloon.style.opacity = "0";
        balloon.style.zIndex = "2"; // Above background, below main text cards
        
        particleContainer.appendChild(balloon);

        const duration = Math.random() * 8 + 12; // 12 to 20 seconds (slow graceful rise)
        const drift = (Math.random() * 180) - 90;
        const scale = Math.random() * 0.4 + 0.8;

        gsap.fromTo(balloon,
            {
                y: 0,
                opacity: 0,
                scale: 0.5,
                rotation: Math.random() * 20 - 10
            },
            {
                y: -(window.innerHeight + 280),
                x: drift,
                opacity: Math.random() * 0.35 + 0.45, 
                scale: scale,
                rotation: Math.random() * 60 - 30,
                duration: duration,
                ease: "none", // Constant speed
                onComplete: () => {
                    balloon.remove();
                }
            }
        );
    }

    // Spawn balloons continuously
    setInterval(spawnBalloon, 900);

    // Initial populate system so balloons are on screen immediately
    function spawnInitialBalloon() {
        const balloon = document.createElement("div");
        balloon.className = "floating-balloon";
        const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        const size = Math.floor(Math.random() * 35) + 40;
        
        balloon.style.width = size + "px";
        balloon.style.height = (size * 2.2) + "px";
        
        balloon.innerHTML = `
            <svg viewBox="0 0 30 70" style="width: 100%; height: 100%;">
                <ellipse cx="15" cy="20" rx="13" ry="17" fill="${color}"/>
                <ellipse cx="10" cy="14" rx="3.5" ry="5.5" fill="rgba(255,255,255,0.45)"/>
                <polygon points="15,37 11,41 19,41" fill="${color}"/>
                <path d="M15,41 Q11,50 18,59 T13,70" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
            </svg>
        `;

        const xPos = Math.random() * 92;
        balloon.style.left = xPos + "vw";
        balloon.style.position = "absolute";
        
        // Random vertical height starting point
        const startY = Math.random() * (window.innerHeight - 100);
        balloon.style.bottom = startY + "px";
        balloon.style.pointerEvents = "none";
        balloon.style.opacity = "0";
        balloon.style.zIndex = "2";
        
        particleContainer.appendChild(balloon);

        const fraction = (window.innerHeight - startY) / window.innerHeight;
        const duration = (Math.random() * 8 + 12) * fraction;
        const drift = ((Math.random() * 180) - 90) * fraction;
        const scale = Math.random() * 0.4 + 0.8;

        gsap.fromTo(balloon,
            {
                opacity: 0,
                scale: 0.5,
                rotation: Math.random() * 20 - 10
            },
            {
                y: -(window.innerHeight - startY + 280),
                x: drift,
                opacity: Math.random() * 0.35 + 0.45,
                scale: scale,
                rotation: Math.random() * 60 - 30,
                duration: duration,
                ease: "none",
                onComplete: () => {
                    balloon.remove();
                }
            }
        );
    }

    // Populate screen with 7 initial balloons at various heights on load
    for (let i = 0; i < 7; i++) {
        setTimeout(spawnInitialBalloon, i * 250);
    }


    // --- WHY YOU'RE SO SPECIAL CARDS (Click/Tap support) ---
    const flipCards = document.querySelectorAll(".flip-card");
    flipCards.forEach(card => {
        card.addEventListener("click", (e) => {
            // Toggle flipped state on click (handles mobile touch)
            card.classList.toggle("flipped");
        });
    });


    // --- ENVELOPE / MESSAGE INTERACTION ---
    const envelope = document.getElementById("envelope");
    const toggleEnvelopeBtn = document.getElementById("toggle-envelope-btn");
    const toggleEnvelopeBtnText = toggleEnvelopeBtn.querySelector("span");

    function toggleEnvelope() {
        envelope.classList.toggle("open");
        
        if (envelope.classList.contains("open")) {
            toggleEnvelopeBtnText.textContent = "Close Letter 💌";
            // Trigger a minor cute confetti blast
            confetti({
                particleCount: 40,
                angle: 90,
                spread: 60,
                origin: { y: 0.8 }
            });
        } else {
            toggleEnvelopeBtnText.textContent = "Click to Open Letter 💌";
        }
    }

    envelope.addEventListener("click", toggleEnvelope);
    toggleEnvelopeBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Avoid double toggle since envelope lies within clickable region
        toggleEnvelope();
    });


    // --- 3D CSS GIFT BOX & FINAL SURPRISE ---
    const giftBox = document.getElementById("gift-box");
    const openGiftBtn = document.getElementById("open-gift-btn");
    const finalSurpriseReveal = document.getElementById("final-surprise-reveal");

    function openSurpriseGift() {
        if (giftBox.classList.contains("open")) return;
        
        giftBox.classList.add("open");
        openGiftBtn.style.opacity = "0";
        openGiftBtn.style.pointerEvents = "none";
        
        // Trigger large screen-wide confetti show!
        triggerConfettiCascade();
        
        // Start fireworks!
        startFireworksDisplay();

        // Reveal final surprise card
        setTimeout(() => {
            finalSurpriseReveal.classList.remove("final-reveal-hidden");
            finalSurpriseReveal.classList.add("final-reveal-visible");
            
            // Trigger cake cutting animation after card fades in
            setTimeout(() => {
                const cakeScene = document.querySelector(".cake-cutting-scene");
                if (cakeScene) {
                    cakeScene.classList.add("start-cut");
                }
            }, 600);
            
            // Scroll final surprise card into center view smoothly
            finalSurpriseReveal.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 1200);
    }

    giftBox.addEventListener("click", openSurpriseGift);
    openGiftBtn.addEventListener("click", openSurpriseGift);


    // --- CONFETTI FUNCTIONS (Canvas-Confetti) ---
    function triggerConfettiExplosion() {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.65 }
        });
    }

    function triggerConfettiCascade() {
        const duration = 7 * 1000; // 7 seconds
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // Confetti falling from top-left and top-right corners
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }


    // --- FIREWORKS CANVAS RENDERING ENGINE ---
    const canvas = document.getElementById("fireworks-canvas");
    const ctx = canvas.getContext("2d");
    let fireworks = [];
    let fireworkParticles = [];
    let isFireworksActive = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Firework shell class
    class FireworkShell {
        constructor(startX, startY, targetX, targetY) {
            this.x = startX;
            this.y = startY;
            this.targetX = targetX;
            this.targetY = targetY;
            this.distanceToTarget = calculateDistance(startX, startY, targetX, targetY);
            this.distanceTraveled = 0;
            this.coordinates = [];
            this.coordinateCount = 3;
            while (this.coordinateCount--) {
                this.coordinates.push([this.x, this.y]);
            }
            this.angle = Math.atan2(targetY - startY, targetX - startX);
            this.speed = 2.5;
            this.acceleration = 1.05;
            this.brightness = randomInRange(50, 70);
            this.hue = randomInRange(290, 360); // pink to lavender/purple hues
        }

        update(index) {
            this.coordinates.pop();
            this.coordinates.unshift([this.x, this.y]);
            this.speed *= this.acceleration;
            let vx = Math.cos(this.angle) * this.speed;
            let vy = Math.sin(this.angle) * this.speed;
            this.distanceTraveled = calculateDistance(this.x, this.y, this.x + vx, this.y + vy);
            
            if (this.distanceTraveled >= this.distanceToTarget) {
                createExplosion(this.targetX, this.targetY, this.hue);
                fireworks.splice(index, 1);
            } else {
                this.x += vx;
                this.y += vy;
                this.distanceToTarget -= this.distanceTraveled;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    // Firework explosion particle class
    class FireworkParticle {
        constructor(x, y, hue) {
            this.x = x;
            this.y = y;
            this.coordinates = [];
            this.coordinateCount = 5;
            while (this.coordinateCount--) {
                this.coordinates.push([this.x, this.y]);
            }
            this.angle = randomInRange(0, Math.PI * 2);
            this.speed = randomInRange(1, 10);
            this.friction = 0.95;
            this.gravity = 1;
            this.hue = randomInRange(hue - 15, hue + 15);
            this.brightness = randomInRange(50, 80);
            this.alpha = 1;
            this.decay = randomInRange(0.015, 0.03);
        }

        update(index) {
            this.coordinates.pop();
            this.coordinates.unshift([this.x, this.y]);
            this.speed *= this.friction;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed + this.gravity;
            this.alpha -= this.decay;
            
            if (this.alpha <= this.decay) {
                fireworkParticles.splice(index, 1);
            }
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
            ctx.lineWidth = randomInRange(1.5, 3.5);
            ctx.stroke();
        }
    }

    function calculateDistance(p1x, p1y, p2x, p2y) {
        return Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2));
    }
    
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createExplosion(x, y, hue) {
        let particleCount = 70;
        while (particleCount--) {
            fireworkParticles.push(new FireworkParticle(x, y, hue));
        }
    }

    function fireworkLoop() {
        if (!isFireworksActive) return;
        requestAnimationFrame(fireworkLoop);

        // Alpha trail effect
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';

        let i = fireworks.length;
        while (i--) {
            fireworks[i].draw();
            fireworks[i].update(i);
        }

        let j = fireworkParticles.length;
        while (j--) {
            fireworkParticles[j].draw();
            fireworkParticles[j].update(j);
        }

        // Auto spawn rocket shells
        if (Math.random() < 0.04) {
            const startX = canvas.width / 2 + randomInRange(-100, 100);
            const startY = canvas.height;
            const targetX = randomInRange(100, canvas.width - 100);
            const targetY = randomInRange(100, canvas.height / 2);
            fireworks.push(new FireworkShell(startX, startY, targetX, targetY));
        }
    }

    function startFireworksDisplay() {
        if (isFireworksActive) return;
        isFireworksActive = true;
        
        // Empty out arrays first
        fireworks = [];
        fireworkParticles = [];
        
        fireworkLoop();

        // Stop auto spawning after 12 seconds to save performance
        setTimeout(() => {
            isFireworksActive = false;
            // Clear canvas cleanly
            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 2000);
        }, 12000);
    }


    // --- GSAP SCROLL TRIGGER ANIMATIONS ---
    function initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Reveal section headers
        document.querySelectorAll(".section-header").forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });
        });

        // Meet Section card anims
        gsap.from(".profile-card", {
            scrollTrigger: {
                trigger: ".profile-grid",
                start: "top 80%"
            },
            opacity: 0,
            x: -80,
            duration: 1.2,
            ease: "power4.out"
        });

        gsap.from(".illustration-card", {
            scrollTrigger: {
                trigger: ".profile-grid",
                start: "top 80%"
            },
            opacity: 0,
            x: 80,
            duration: 1.2,
            ease: "power4.out"
        });

        // Special Section flip cards sequence
        gsap.from(".special-cards-grid .flip-card", {
            scrollTrigger: {
                trigger: ".special-cards-grid",
                start: "top 80%"
            },
            opacity: 0,
            y: 60,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.4)"
        });

        // Polaroid Gallery cards loading
        gsap.from(".polaroid-card", {
            scrollTrigger: {
                trigger: ".masonry-gallery",
                start: "top 80%"
            },
            opacity: 0,
            scale: 0.7,
            y: 80,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out"
        });

        // Timeline items staggered slide in
        document.querySelectorAll(".timeline-item").forEach((item, index) => {
            const direction = index % 2 === 0 ? -100 : 100;
            
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%"
                },
                opacity: 0,
                x: direction,
                duration: 1.2,
                ease: "power4.out"
            });

            gsap.from(item.querySelector(".timeline-icon"), {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%"
                },
                scale: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "back.out(2)"
            });
        });

        // Envelope fade in
        gsap.from(".envelope-wrapper", {
            scrollTrigger: {
                trigger: ".envelope-wrapper",
                start: "top 80%"
            },
            opacity: 0,
            y: 80,
            duration: 1.2,
            ease: "power3.out"
        });
    }

});
