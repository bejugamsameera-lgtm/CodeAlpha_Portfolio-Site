/**
 * Sameera Portfolio - Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cursor Glow Follower
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        // Smoothly interpolate position for organic feel
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        if (cursorGlow) {
            cursorGlow.style.transform = `translate(${currentX - 250}px, ${currentY - 250}px)`;
        }
        
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // 2. Mobile Menu Toggle
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileNavToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.contains('open');
        if (isOpen) {
            mobileNav.classList.remove('open');
            mobileNav.classList.add('translate-y-full');
        } else {
            mobileNav.classList.add('open');
            mobileNav.classList.remove('translate-y-full');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            mobileNav.classList.add('translate-y-full');
        });
    });

    // 3. Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Smooth Navigation Active State (Optional but nice)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-white');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-white');
            }
        });
    });

    // 5. Contact Form Simulation (since no backend)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Message Sent';
            btn.classList.replace('bg-white', 'bg-green-500');
            btn.classList.add('text-white');
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.replace('bg-green-500', 'bg-white');
                btn.classList.remove('text-white');
                contactForm.reset();
            }, 3000);
        });
    }
});
