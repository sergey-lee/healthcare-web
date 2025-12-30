// Main JavaScript
(function() {
    'use strict';

    // Set current year in footer
    function setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Sticky header on scroll
    function initStickyHeader() {
        const header = document.getElementById('main-header');
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Lazy load images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // Animation on scroll
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            animatedElements.forEach(el => observer.observe(el));
        } else {
            animatedElements.forEach(el => el.classList.add('animated'));
        }
    }

    // Load news data (placeholder - replace with actual data loading)
    function loadNews() {
        const newsContainer = document.getElementById('news-container');
        if (!newsContainer) return;

        // Example news data - replace with actual API call or data source
        const newsItems = [
            {
                title: 'Latest Healthcare Innovation',
                date: '2024-01-15',
                excerpt: 'Discover our latest breakthrough in healthcare technology...',
                image: 'images/news-1.jpg',
                link: 'pages/news-detail.html'
            },
            {
                title: 'Research Achievement',
                date: '2024-01-10',
                excerpt: 'Our research team has made significant progress...',
                image: 'images/news-2.jpg',
                link: 'pages/news-detail.html'
            },
            {
                title: 'Community Outreach',
                date: '2024-01-05',
                excerpt: 'Join us in our community healthcare initiative...',
                image: 'images/news-3.jpg',
                link: 'pages/news-detail.html'
            }
        ];

        newsContainer.innerHTML = newsItems.map(item => `
            <div class="news-card">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='images/placeholder.jpg'">
                <div class="news-card-content">
                    <h3>${item.title}</h3>
                    <div class="news-card-meta">
                        <i class="fa fa-calendar"></i> ${formatDate(item.date)}
                    </div>
                    <p>${item.excerpt}</p>
                    <a href="${item.link}" class="btn btn-outline" data-i18n="buttons.read_more">Read More</a>
                </div>
            </div>
        `).join('');
    }

    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(document.documentElement.lang, options);
    }

    // Back to top button
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize all functions when DOM is ready
    function init() {
        setCurrentYear();
        initStickyHeader();
        initSmoothScroll();
        initLazyLoading();
        initScrollAnimations();
        loadNews();
        initBackToTop();

        // Trigger i18n update after content is loaded
        if (window.I18n && typeof window.I18n.translatePage === 'function') {
            setTimeout(() => {
                window.I18n.translatePage();
            }, 100);
        }
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for external use
    window.App = {
        formatDate,
        loadNews
    };
})();
