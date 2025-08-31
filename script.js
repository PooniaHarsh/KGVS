// KGVS Scripts - script.js

// Update footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Device detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768 && window.innerWidth <= 1024;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Modern Navigation Management
function initModernNavigation() {
    const header = document.querySelector('.modern-header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNav = document.querySelector('.mobile-nav');
    
    // Scroll effect for header
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Mobile menu toggle
    if (mobileToggle && mobileOverlay && mobileNav) {
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = mobileToggle.classList.contains('active');
            
            if (isActive) {
                // Close menu
                mobileToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
            } else {
                // Open menu
                mobileToggle.classList.add('active');
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            }
        });
        
        // Close mobile menu when clicking overlay
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991 && mobileOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Function to close mobile menu
        function closeMobileMenu() {
            mobileToggle.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
        
        // Prevent body scroll when mobile menu is open
        mobileOverlay.addEventListener('touchmove', (e) => {
            if (mobileOverlay.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initialize scroll state
    handleScroll();
}

// Chatbot functionality (if needed later)
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const chatMessages = document.getElementById('chat-messages');
const chatText = document.getElementById('chat-text');
const chatSend = document.getElementById('chat-send');

// Initialize chatbot if elements exist
if (chatbotToggle && chatbot && chatMessages && chatText && chatSend) {
    chatbotToggle.addEventListener('click', () => {
        chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
    });

    function appendMessage(text, type) {
        const div = document.createElement('div');
        div.className = type === 'user' ? 'user-msg' : 'bot-msg';
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function botReply(userText) {
        let reply = "Sorry, I didn't understand that.";
        if (userText.includes('hello') || userText.includes('hi')) {
            reply = "Hello! Welcome to KGVS. We work in rural development, farming, and empowerment.";
        } else if (userText.includes('focus')) {
            reply = "Our focus areas: sustainable farming, women empowerment, SHGs, youth skill development, organic farming.";
        } else if (userText.includes('contact')) {
            reply = "You can reach us at jaipalsinghkgvs@gmail.com or call +91-9413366031, +91-7568304591.";
        } else if (userText.includes('program')) {
            reply = "We partner with NABARD, NRLM, and government departments for livelihood programs.";
        } else if (userText.includes('award')) {
            reply = "We've won several awards including NABARD's SHG Bank Linkage prize and Best Kissan Club awards.";
        }
        appendMessage(reply, 'bot');
    }

    chatSend.addEventListener('click', () => {
        const text = chatText.value.trim();
        if (text) {
            appendMessage(text, 'user');
            chatText.value = '';
            setTimeout(() => botReply(text.toLowerCase()), 600);
        }
    });

    chatText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatSend.click();
        }
    });
    
    // Close chatbot when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatbot.contains(e.target) && !chatbotToggle.contains(e.target)) {
            chatbot.style.display = 'none';
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.modern-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add animation on scroll for cards
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    document.querySelectorAll('.card, #thrust li, #awards li').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Responsive image loading
function initResponsiveImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading="lazy" for better performance
        img.setAttribute('loading', 'lazy');
        
        // Add error handling
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
}

// Touch gesture support for mobile
function initTouchGestures() {
    if (isTouchDevice) {
        let startY = 0;
        let startX = 0;
        
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
        });
        
        document.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const endX = e.changedTouches[0].clientX;
            const diffY = startY - endY;
            const diffX = startX - endX;
            
            // Swipe up gesture
            if (diffY > 50 && Math.abs(diffX) < 50) {
                // Could be used for special mobile interactions
            }
            
            // Swipe down gesture
            if (diffY < -50 && Math.abs(diffX) < 50) {
                // Could be used for special mobile interactions
            }
        });
    }
}

// Performance optimization
function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based animations or effects
        }, 16); // ~60fps
    });
    
    // Optimize animations for mobile
    if (isMobile) {
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
}

// Accessibility improvements
function initAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#focus';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.setAttribute('tabindex', '0');
    
    const style = document.createElement('style');
    style.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--green);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s;
        }
        .skip-link:focus {
            top: 6px;
        }
    `;
    document.head.appendChild(style);
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels
    document.querySelectorAll('.card').forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        card.setAttribute('aria-label', `Information card ${index + 1}`);
    });
    
    // Add ARIA labels for mobile navigation
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-controls', 'mobile-nav');
        
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        });
    }
}

// Initialize all features
function initAllFeatures() {
    initModernNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initResponsiveImages();
    initTouchGestures();
    initPerformanceOptimizations();
    initAccessibility();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllFeatures);
} else {
    initAllFeatures();
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
        // Reinitialize responsive features if needed
        if (window.innerWidth <= 991 && !document.querySelector('.mobile-menu-toggle')) {
            initModernNavigation();
        }
    }, 250);
});

// Add loading states for better UX
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading animation styles
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        body.loaded {
            opacity: 1;
        }
        .loading-shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
    `;
    document.head.appendChild(style);
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}
