/* =====================================================
   HASSAN EL-SHEIKHA - PERSONAL WEBSITE
   JavaScript - Animations & Interactivity
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initRevealAnimations();
    initSmoothScroll();
    initParallax();
});

/* =====================================================
   NAVIGATION
   ===================================================== */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navigation
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for background
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* =====================================================
   REVEAL ANIMATIONS
   ===================================================== */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index within viewport
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

/* =====================================================
   SMOOTH SCROLL
   ===================================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =====================================================
   PARALLAX EFFECTS
   ===================================================== */
function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = scrollY * speed;
            orb.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Mouse parallax for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;
            
            orbs.forEach((orb, index) => {
                const intensity = (index + 1) * 20;
                const x = xPercent * intensity;
                const y = yPercent * intensity;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}

/* =====================================================
   TYPING EFFECT (Optional Enhancement)
   ===================================================== */
function initTypingEffect() {
    const element = document.querySelector('.hero-name');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--accent-primary)';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            element.style.borderRight = 'none';
        }
    }, 100);
}

/* =====================================================
   COUNTER ANIMATION
   ===================================================== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-value, .highlight-value');
    
    const counterOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent;
                const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
                
                if (!isNaN(numericValue) && numericValue > 0) {
                    animateCounter(target, numericValue, value);
                }
                
                observer.unobserve(target);
            }
        });
    }, counterOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target, originalText) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = originalText;
            clearInterval(timer);
        } else {
            // Preserve original format (e.g., "4.0" vs "180+")
            if (originalText.includes('.')) {
                element.textContent = current.toFixed(1);
            } else if (originalText.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current);
            }
        }
    }, 16);
}

/* =====================================================
   MAGNETIC BUTTONS (Desktop Only)
   ===================================================== */
function initMagneticButtons() {
    if (window.innerWidth < 1024) return;
    
    const buttons = document.querySelectorAll('.btn, .contact-card');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

/* =====================================================
   LOAD COMPLETE HANDLER
   ===================================================== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize additional effects after load
    initCounters();
    initMagneticButtons();
    
    // Add loaded animation to hero
    const heroElements = document.querySelectorAll('.hero .reveal');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, 200 + (index * 150));
    });
});

/* =====================================================
   PERFORMANCE: Throttle Scroll Events
   ===================================================== */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    // Any additional scroll handlers can be added here
}, 16));


