/* =========================================================
   NAVBAR SCROLL EFFECT
   ========================================================= */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(7,14,26,0.96)";
        navbar.style.boxShadow  = "0 4px 30px rgba(0,0,0,0.4)";
    } else {
        navbar.style.background = "rgba(10,15,30,0.7)";
        navbar.style.boxShadow  = "none";
    }
});

/* =========================================================
   CONTACT FORM
   ========================================================= */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        // Validación básica
        let valid = true;
        contactForm.querySelectorAll('[required]').forEach(field => {
            field.classList.remove('error');
            if (!field.value.trim()) {
                field.classList.add('error');
                valid = false;
            }
        });

        if (!valid) return;

        // Simular envío
        const btn = contactForm.querySelector('.cta-primary');
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            contactForm.reset();
            btn.style.display = 'none';
            formSuccess.classList.add('visible');
        }, 1200);
    });

    // Quitar error al escribir
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => field.classList.remove('error'));
    });
}

/* =========================================================
   BACK TO TOP
   ========================================================= */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================================================
   HAMBURGER MENU
   ========================================================= */
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
}

/* =========================================================
   SMOOTH SCROLL
   ========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('open');
        if (hamburger) hamburger.classList.remove('active');
    });
});

/* =========================================================
   PARTICLES
   ========================================================= */
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx  = canvas.getContext('2d');
    const hero = canvas.parentElement;

    let W, H, particles;
    const COUNT      = 140;
    const NAV_HEIGHT = 90;

    function resize() {
        W = canvas.width  = hero.offsetWidth;
        H = canvas.height = hero.offsetHeight;
    }

    class Particle {
        constructor() { this.reset(true); }

        reset(initial = false) {
            this.x     = Math.random() * W;
            this.y     = initial
                ? NAV_HEIGHT + Math.random() * (H - NAV_HEIGHT)
                : H + 5;
            this.r     = Math.random() * 2.5 + 1;
            this.vx    = (Math.random() - 0.5) * 0.4;
            this.vy    = -(Math.random() * 0.4 + 0.15);
            this.alpha = Math.random() * 0.5 + 0.4;
            const purple = Math.random() > 0.5;
            this.rgb   = purple ? '167,139,250' : '6,182,212';
            this.color = `rgba(${this.rgb},${this.alpha})`;
            this.glow  = `rgba(${this.rgb},0.6)`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.y < NAV_HEIGHT) this.reset();
            if (this.x < 0)  this.x = W;
            if (this.x > W)  this.x = 0;
        }

        draw() {
            ctx.save();
            ctx.shadowBlur  = 10;
            ctx.shadowColor = this.glow;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    function init() {
        resize();
        particles = Array.from({ length: COUNT }, () => new Particle());
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize);
    init();
    loop();
})();

/* =========================================================
   HERO — ENTRADA ORDENADA
   ========================================================= */
(function heroEntrance() {
    const sequence = [
        document.querySelector('.hero h1'),
        document.querySelector('.hero-subtext'),
        document.querySelector('.hero-offer'),
        document.querySelector('.hero .cta-primary'),
    ];

    sequence.forEach((el, i) => {
        if (!el) return;
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(22px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        setTimeout(() => {
            el.style.opacity   = '1';
            el.style.transform = 'translateY(0)';
        }, 150 + i * 180);
    });
})();

/* =========================================================
   TYPEWRITER — MULTI-FRASE CON LOOP
   ========================================================= */
(function initTypewriter() {
    const el     = document.getElementById('typewriter-target');
    const cursor = document.querySelector('.tw-cursor');
    if (!el) return;

    const phrases = [
        'Reescribimos las reglas',
        'Convertimos marcas en referentes',
        'Diseñamos resultados medibles',
        'Hacemos que te busquen',
    ];

    const TYPE_SPEED   = 58;   // ms por carácter al escribir
    const DELETE_SPEED = 28;   // ms por carácter al borrar
    const PAUSE_AFTER  = 2000; // pausa al terminar de escribir
    const PAUSE_BEFORE = 380;  // pausa antes de empezar la siguiente

    let phraseIdx  = 0;
    let charIdx    = 0;
    let isDeleting = false;

    el.textContent = '';

    function tick() {
        const current = phrases[phraseIdx];

        if (!isDeleting) {
            charIdx++;
            el.textContent = current.slice(0, charIdx);

            if (charIdx === current.length) {
                isDeleting = true;
                setTimeout(tick, PAUSE_AFTER);
                return;
            }
            setTimeout(tick, TYPE_SPEED + Math.random() * 22);

        } else {
            charIdx--;
            el.textContent = current.slice(0, charIdx);

            if (charIdx === 0) {
                isDeleting  = false;
                phraseIdx   = (phraseIdx + 1) % phrases.length;
                setTimeout(tick, PAUSE_BEFORE);
                return;
            }
            setTimeout(tick, DELETE_SPEED);
        }
    }

    // Esperar a que el h1 termine su animación de entrada (~150 + 700 ms)
    setTimeout(tick, 950);
})();

/* =========================================================
   3D CARD TILT
   ========================================================= */
document.querySelectorAll('.service-card').forEach(card => {
    card.style.willChange = 'transform';

    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x    = e.clientX - rect.left;
        const y    = e.clientY - rect.top;
        const rotX = ((y / rect.height) - 0.5) * -28;
        const rotY = ((x / rect.width)  - 0.5) *  28;

        card.style.transition = 'box-shadow 0.3s ease, background 0.4s ease';
        card.style.transform  = `perspective(500px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04) translateZ(20px)`;

        card.style.setProperty('--mx', ((x / rect.width)  * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((y / rect.height) * 100).toFixed(1) + '%');
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease, box-shadow 0.4s ease, background 0.4s ease';
        card.style.transform  = '';
    });
});

/* =========================================================
   REVEAL — CARGA ORDENADA POR POSICIÓN EN EL DOM
   ========================================================= */
const revealEls = document.querySelectorAll(
    '.service-card, .problem-grid div, .benefit, .features li, .faq-item'
);

// Stagger basado en el índice del elemento dentro de su contenedor padre
revealEls.forEach(el => {
    const siblings = Array.from(el.parentElement.children);
    el.dataset.revealDelay = siblings.indexOf(el) * 110;
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(35px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.revealDelay) || 0;
        setTimeout(() => {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
        }, delay);
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* =========================================================
   FAQ ACCORDION
   ========================================================= */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.querySelector('h3').addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

/* =========================================================
   STATS COUNTER
   ========================================================= */
function animateCounter(el) {
    const original = el.textContent.trim();
    const isNeg    = original.startsWith('-');
    const match    = original.match(/\d+/);
    if (!match) return;

    const target   = parseInt(match[0]);
    const suffix   = original.replace(/[+\-]?\d+/, '');
    const prefix   = isNeg ? '-' : '+';
    const duration = 1800;
    let   start    = null;

    const step = ts => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = original;
    };

    requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.benefit h3 .stat-num').forEach(el => statsObserver.observe(el));
