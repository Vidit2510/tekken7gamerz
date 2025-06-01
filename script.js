// Professional Gaming Website JavaScript
// Enhanced functionality with better user experience

class GamingWebsite {
    constructor() {
        this.initializeApp();
        this.bindEvents();
        this.setupMobileMenu();
        this.setupVideoFilters();
        this.setupContactForm();
        this.loadVideos();
    }

    initializeApp() {
        // Set up initial state
        this.isLoading = false;
        this.currentVideoFilter = 'all';
        this.videos = this.getMockVideos(); // In real app, this would come from API
        
        // Add loading class to body initially
        document.body.classList.add('loading');
        
        // Remove loading class once everything is loaded
        window.addEventListener('load', () => {
            document.body.classList.remove('loading');
        });
    }

    bindEvents() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add active state to navigation based on current page
        this.updateActiveNavigation();

        // Handle external links
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', (e) => {
                // Add analytics tracking here if needed
                console.log('External link clicked:', link.href);
            });
        });
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav');

        if (mobileToggle && nav) {
            mobileToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
                    nav.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });

            // Close menu when pressing Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    nav.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }

    updateActiveNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (
                (currentPath === '/' && href === '/') ||
                (currentPath.includes('/videos') && href === '/videos.html') ||
                (currentPath.includes('/contact') && href === '/contact.html')
            ) {
                link.classList.add('active');
            }
        });
    }

    setupVideoFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filter = button.getAttribute('data-filter');
                this.currentVideoFilter = filter;
                
                // Filter and display videos
                this.filterAndDisplayVideos(filter);
            });
        });
    }

    getMockVideos() {
        // Real Cricket 20 Mod Videos - Updated with your actual content
        return [
            {
                id: 1,
                title: "Real cricket 20 5.5 mod apk|| real cricket 20 mod apk latest version",
                category: "mod-apk",
                embedId: "b4mlZKRwUpI",
                description: "Download the latest Real Cricket 20 version 5.5 mod apk with all premium features unlocked"
            },
            {
                id: 2,
                title: "Real cricket 20 5.1 mod apk|| real cricket 20 mod apk latest version",
                category: "mod-apk",
                embedId: "SDLT2CTbOEw",
                description: "Get Real Cricket 20 version 5.1 mod apk with unlimited money and unlocked features"
            },
            {
                id: 3,
                title: "Real cricket 20 5.3 mod apk|| real cricket 20 mod apk latest version",
                category: "mod-apk",
                embedId: "tEBEcj18BWs",
                description: "Install Real Cricket 20 version 5.3 mod apk for the ultimate cricket gaming experience"
            },
            {
                id: 4,
                title: "Download Real Cricket 20 (MOD, Unlimited Money) 3.7 free on android",
                category: "unlimited-money",
                embedId: "cn7lpQTwO1U",
                description: "Free download of Real Cricket 20 mod with unlimited money for Android devices"
            },
            {
                id: 5,
                title: "Unlock real cricket 20||Unlock kitbag||Tournaments||and everything in real cricket 20",
                category: "unlock-features",
                embedId: "CxFZwRlMFlA",
                description: "Complete guide to unlock all features, kitbag, tournaments and everything in Real Cricket 20"
            }
        ];
    }

    loadVideos() {
        const videosContainer = document.getElementById('videos-container');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const noVideos = document.getElementById('noVideos');

        if (!videosContainer) return;

        // Show loading
        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex';
        }

        // Simulate loading delay
        setTimeout(() => {
            this.displayVideos(this.videos);
            
            // Hide loading
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }, 1000);
    }

    filterAndDisplayVideos(filter) {
        const filteredVideos = filter === 'all' 
            ? this.videos 
            : this.videos.filter(video => video.category === filter);

        this.displayVideos(filteredVideos);
    }

    displayVideos(videos) {
        const videosContainer = document.getElementById('videos-container');
        const noVideos = document.getElementById('noVideos');

        if (!videosContainer) return;

        if (videos.length === 0) {
            videosContainer.innerHTML = '';
            if (noVideos) {
                noVideos.style.display = 'block';
            }
            return;
        }

        if (noVideos) {
            noVideos.style.display = 'none';
        }

        const videosHTML = videos.map(video => `
            <div class="video-card" data-category="${video.category}">
                <div class="video-content">
                    <h3>${video.title}</h3>
                    <iframe 
                        src="https://www.youtube.com/embed/${video.embedId}"
                        title="${video.title}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        loading="lazy">
                    </iframe>
                    <p>${video.description}</p>
                </div>
            </div>
        `).join('');

        videosContainer.innerHTML = videosHTML;

        // Animate in the video cards
        const videoCards = videosContainer.querySelectorAll('.video-card');
        videoCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmission(form, formStatus);
        });

        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('error');
        this.removeFieldError(field);

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'text':
                if (field.name === 'name' && value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                    isValid = false;
                }
                break;
            case 'tel':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
                    errorMessage = 'Please enter a valid phone number';
                    isValid = false;
                }
                break;
        }

        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    removeFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        this.removeFieldError(field);
    }

    async handleFormSubmission(form, formStatus) {
        // Validate all fields
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormStatus('Please correct the errors above', 'error');
            return;
        }

        // Get form data
        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            subject: form.subject.value,
            message: form.message.value.trim(),
            timestamp: new Date().toISOString()
        };

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        this.showFormStatus('Sending your message...', 'info');

        try {
            // Simulate API call - replace with actual endpoint
            const response = await this.submitContactForm(formData);
            
            if (response.success) {
                this.showFormStatus('Message sent successfully! We\'ll get back to you soon.', 'success');
                form.reset();
                this.showPopup('Message sent successfully!', true);
            } else {
                throw new Error(response.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormStatus('Something went wrong. Please try again or contact us directly.', 'error');
            this.showPopup('Failed to send message. Please try again.', false);
        } finally {
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    }

    async submitContactForm(formData) {
        // Simulate API call with timeout
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure randomly for demonstration
                // In real implementation, this would be an actual API call
                const success = Math.random() > 0.2; // 80% success rate for demo
                
                if (success) {
                    resolve({
                        success: true,
                        message: 'Message sent successfully',
                        data: formData
                    });
                } else {
                    reject(new Error('Network error or server unavailable'));
                }
            }, 2000); // Simulate network delay
        });
    }

    showFormStatus(message, type) {
        const formStatus = document.getElementById('formStatus');
        if (!formStatus) return;

        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';

        // Auto-hide success and info messages after 5 seconds
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }

    showPopup(message, isSuccess) {
        // Create popup element if it doesn't exist
        let popup = document.getElementById('popup');
        if (!popup) {
            popup = document.createElement('div');
            popup.id = 'popup';
            popup.className = 'popup';
            document.body.appendChild(popup);
        }

        // Set popup content and styling
        popup.textContent = message;
        popup.className = `popup ${isSuccess ? 'success' : 'error'} show`;

        // Auto-hide popup after 4 seconds
        setTimeout(() => {
            popup.classList.remove('show');
        }, 4000);
    }

    // Utility methods for additional functionality
    addScrollToTopButton() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.className = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollButton);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });

        // Scroll to top functionality
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    setupLazyLoading() {
        // Lazy load images and iframes
        const lazyElements = document.querySelectorAll('[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        if (element.tagName === 'IMG' && element.dataset.src) {
                            element.src = element.dataset.src;
                            element.removeAttribute('data-src');
                        }
                        lazyObserver.unobserve(element);
                    }
                });
            });

            lazyElements.forEach(element => {
                lazyObserver.observe(element);
            });
        }
    }

    // Performance monitoring
    logPerformanceMetrics() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Performance:', {
                        'DNS Lookup': perfData.domainLookupEnd - perfData.domainLookupStart,
                        'TCP Connection': perfData.connectEnd - perfData.connectStart,
                        'First Byte': perfData.responseStart - perfData.requestStart,
                        'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.navigationStart,
                        'Page Load Complete': perfData.loadEventEnd - perfData.navigationStart
                    });
                }, 0);
            });
        }
    }

    // Initialize additional features
    initializeExtras() {
        this.addScrollToTopButton();
        this.setupThemeToggle();
        this.setupLazyLoading();
        this.logPerformanceMetrics();
    }
}

// Initialize the gaming website when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const gamingWebsite = new GamingWebsite();
    gamingWebsite.initializeExtras();
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GamingWebsite;
}
