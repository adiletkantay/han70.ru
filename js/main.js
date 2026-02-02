// Khan Stretch Ceilings - Main JavaScript Functions

// Global variables
let isMenuOpen = false;
let isLoading = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize quick contact
    initializeQuickContact();
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Initialize gallery functionality
    initializeGallery();
    
    // Initialize service calculator
    initializeServiceCalculator();
    
    // Initialize loading states
    initializeLoadingStates();
    
    // Initialize header auto-hide
    initializeHeaderAutoHide();
    
    console.log('Khan Stretch Ceilings app initialized');
}



// Mobile Menu Management
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.nav-overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    
    if (!menuToggle || !mobileMenu) return;
    
    // Toggle menu
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking links
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    if (isMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.nav-overlay');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!mobileMenu) return;
    
    isMenuOpen = true;
    mobileMenu.classList.add('active');
    if (menuOverlay) menuOverlay.classList.add('active');
    if (menuToggle) menuToggle.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add animation class
    setTimeout(() => {
        mobileMenu.classList.add('animated');
    }, 10);
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.nav-overlay');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!mobileMenu) return;
    
    isMenuOpen = false;
    mobileMenu.classList.remove('active', 'animated');
    if (menuOverlay) menuOverlay.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
}



// Smooth Scrolling
function initializeSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                smoothScrollTo(target);
            }
        });
    });
}

function smoothScrollTo(target, offset = 80) {
    const targetPosition = target.offsetTop - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (required && !value) {
        showFieldError(field, getTranslation('validation.required'));
        return false;
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, getTranslation('validation.email'));
            return false;
        }
    }
    
    // Phone validation
    if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, getTranslation('validation.phone'));
            return false;
        }
    }
    
    // Name validation
    if (field.name === 'name' && value) {
        if (value.length < 2) {
            showFieldError(field, getTranslation('validation.name'));
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function validateForm(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function handleFormSubmission(form) {
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    showFormLoading(form);
    
    // Simulate form submission
    setTimeout(() => {
        hideFormLoading(form);
        showFormSuccess(form);
        form.reset();
    }, 2000);
}

function showFormLoading(form) {
    const submitBtn = form.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + getTranslation('form.sending');
    }
}

function hideFormLoading(form) {
    const submitBtn = form.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = getTranslation('form.submit');
    }
}

function showFormSuccess(form) {
    let successElement = form.querySelector('.success-message');
    if (!successElement) {
        successElement = document.createElement('div');
        successElement.className = 'success-message';
        form.insertBefore(successElement, form.firstChild);
    }
    
    successElement.textContent = getTranslation('form.success');
    successElement.classList.add('show');
    
    setTimeout(() => {
        successElement.classList.remove('show');
    }, 5000);
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    animatedElements.forEach(el => observer.observe(el));
}

// Quick Contact
function initializeQuickContact() {
    const quickContactBtn = document.querySelector('.quick-contact-btn');
    const quickContactMenu = document.querySelector('.quick-contact-menu');
    
    if (!quickContactBtn || !quickContactMenu) return;
    
    quickContactBtn.addEventListener('click', function() {
        quickContactMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.quick-contact')) {
            quickContactMenu.classList.remove('active');
        }
    });
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// Gallery Functionality
function initializeGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close');
    
    // Filter functionality
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Modal functionality - fixed selectors
    galleryItems.forEach(item => {
        const imgEl = item.querySelector('img') || item.querySelector('.gallery-image');
        const title = item.querySelector('.gallery-title')?.textContent || item.querySelector('h3')?.textContent || '';
        const description = item.querySelector('.gallery-description')?.textContent || item.querySelector('p')?.textContent || '';

        if (!imgEl) return; // Nothing to bind to

        const handleClick = () => {
            if (modal && modalImg) {
                modal.style.display = 'block';

                let src = '';
                let alt = '';
                if (imgEl.tagName && imgEl.tagName.toLowerCase() === 'img') {
                    src = imgEl.src;
                    alt = imgEl.alt || '';
                } else {
                    // Extract URL from background-image style if present
                    const bg = window.getComputedStyle(imgEl).backgroundImage;
                    if (bg && bg.startsWith('url(')) {
                        src = bg.slice(4, -1).replace(/["']/g, '');
                    }
                }

                if (src) modalImg.src = src;
                modalImg.alt = alt || title || 'Изображение галереи';
                if (modalTitle) modalTitle.textContent = title;
                if (modalDescription) modalDescription.textContent = description;
                
                // Add fade-in animation
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            }
        };

        imgEl.addEventListener('click', handleClick);
    });
    
    // Close modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', closeGalleryModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeGalleryModal();
            }
        });
    }
}

function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Service Calculator
function initializeServiceCalculator() {
    const calculator = document.querySelector('.service-calculator');
    if (!calculator) return;
    
    const areaInput = calculator.querySelector('#area');
    const typeSelect = calculator.querySelector('#ceiling-type');
    const priceDisplay = calculator.querySelector('.price-display');
    
    if (!areaInput || !typeSelect || !priceDisplay) return;
    
    // Price per square meter for different types
    const prices = {
        'glossy': 800,
        'matte': 700,
        'satin': 750,
        'multilevel': 1200,
        'photo': 1500
    };
    
    function calculatePrice() {
        const area = parseFloat(areaInput.value) || 0;
        const type = typeSelect.value;
        const pricePerSqm = prices[type] || 700;
        const totalPrice = area * pricePerSqm;
        
        priceDisplay.textContent = formatPrice(totalPrice);
    }
    
    areaInput.addEventListener('input', calculatePrice);
    typeSelect.addEventListener('change', calculatePrice);
    
    // Initial calculation
    calculatePrice();
}

// Loading States
function initializeLoadingStates() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class when everything is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 500);
    });
}

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}

function getTranslation(key) {
    // This will be implemented by translation files
    // For now, return the key as fallback
    return key;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
function optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call image optimization when DOM is loaded
document.addEventListener('DOMContentLoaded', optimizeImages);

// Export functions for global access
window.KhanCeilings = {
    toggleMobileMenu,
    closeMobileMenu,
    smoothScrollTo,
    validateForm,
    formatPrice,
    getTranslation,
    debounce,
    throttle,
    initializeHeaderAutoHide
};

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Add Telegram functionality for CTA buttons
function initializeTelegramIntegration() {
    const telegramURL = 'https://t.me/HanKRG';

    // Bind explicit data attributes first
    document.querySelectorAll('[data-telegram]').forEach(el => {
        if (!el.dataset.telegramBound) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(telegramURL, '_blank');
            });
            el.dataset.telegramBound = 'true';
        }
    });

    // Fallback: Target buttons with specific texts
    const buttonTexts = [
        'Получить консультацию',
        'Рассчитать стоимость', 
        'Заказать',
        'Заказать замер',
        'Связаться с нами'
    ];
    
    buttonTexts.forEach(text => {
        const buttons = document.querySelectorAll(`button:not([type="submit"]):not(.filter-btn), a.btn`);
        buttons.forEach(button => {
            if (button.textContent.trim().includes(text) && !button.dataset.telegramBound) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open(telegramURL, '_blank');
                });
                button.dataset.telegramBound = 'true';
            }
        });
    });
}

// Initialize Telegram integration on page load
document.addEventListener('DOMContentLoaded', initializeTelegramIntegration);

// Header Auto-Hide Functionality
function initializeHeaderAutoHide() {
    let lastScrollTop = 0;
    let isHeaderHidden = false;
    const header = document.querySelector('.header');
    const scrollThreshold = 8; // Small threshold for smooth hiding
    const scrollSpeed = 2; // Minimal scroll speed to trigger action
    
    if (!header) return;
    
    // Add CSS transition for smooth animation
    header.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
    
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDifference = Math.abs(currentScrollTop - lastScrollTop);
        
        // Only act if scroll difference is significant enough
        if (scrollDifference < scrollSpeed) {
            return;
        }
        
        // Scrolling down and not already hidden
        if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold && !isHeaderHidden) {
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0';
            header.style.visibility = 'hidden';
            isHeaderHidden = true;
        }
        // Scrolling up and header is hidden
        else if (currentScrollTop < lastScrollTop && isHeaderHidden) {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
            header.style.visibility = 'visible';
            isHeaderHidden = false;
        }
        // At the top of the page, always show header
        else if (currentScrollTop <= scrollThreshold && isHeaderHidden) {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
            header.style.visibility = 'visible';
            isHeaderHidden = false;
        }
        
        lastScrollTop = currentScrollTop;
    }
    
    // Use throttled scroll event for better performance
    window.addEventListener('scroll', throttle(handleScroll, 16)); // ~60fps
}