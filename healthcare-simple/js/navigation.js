// Navigation Component
(function() {
    'use strict';

    class Navigation {
        constructor() {
            this.nav = document.getElementById('main-nav');
            this.menuToggle = document.querySelector('.mobile-menu-toggle');
            this.navMenu = document.querySelector('.nav-menu');
            this.dropdownItems = document.querySelectorAll('.has-dropdown');

            if (!this.nav || !this.menuToggle || !this.navMenu) {
                console.warn('Navigation elements not found');
                return;
            }

            this.init();
        }

        init() {
            this.setupMobileMenu();
            this.setupDropdowns();
            this.handleResize();
        }

        setupMobileMenu() {
            // Toggle mobile menu
            this.menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.nav.contains(e.target) && this.navMenu.classList.contains('active')) {
                    this.closeMenu();
                }
            });

            // Close menu when clicking on a link (except dropdown triggers)
            this.navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', (e) => {
                    // Don't close if it's a dropdown trigger
                    if (!link.parentElement.classList.contains('has-dropdown') ||
                        window.innerWidth > 768) {
                        this.closeMenu();
                    }
                });
            });

            // Prevent menu from closing when clicking inside
            this.navMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        setupDropdowns() {
            this.dropdownItems.forEach(item => {
                const link = item.querySelector('a');
                const dropdown = item.querySelector('.dropdown');

                if (!link || !dropdown) return;

                // Mobile: toggle dropdown on click
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();

                        // Close other dropdowns
                        this.dropdownItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                            }
                        });

                        // Toggle current dropdown
                        item.classList.toggle('active');
                    }
                });

                // Desktop: hover behavior is handled by CSS
            });
        }

        toggleMenu() {
            const isActive = this.navMenu.classList.toggle('active');
            this.menuToggle.setAttribute('aria-expanded', isActive);

            // Toggle icon
            const icon = this.menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }

            // Prevent body scroll when menu is open
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        closeMenu() {
            this.navMenu.classList.remove('active');
            this.menuToggle.setAttribute('aria-expanded', 'false');

            const icon = this.menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            // Close all dropdowns
            this.dropdownItems.forEach(item => {
                item.classList.remove('active');
            });

            document.body.style.overflow = '';
        }

        handleResize() {
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    if (window.innerWidth > 768) {
                        this.closeMenu();

                        // Remove mobile-specific classes
                        this.dropdownItems.forEach(item => {
                            item.classList.remove('active');
                        });
                    }
                }, 250);
            });
        }

        // Public method to highlight active page
        highlightActivePage() {
            const currentPath = window.location.pathname;
            const links = this.navMenu.querySelectorAll('a');

            links.forEach(link => {
                const linkPath = new URL(link.href).pathname;
                if (linkPath === currentPath) {
                    link.classList.add('active');

                    // If it's in a dropdown, highlight parent too
                    const parentDropdown = link.closest('.has-dropdown');
                    if (parentDropdown) {
                        const parentLink = parentDropdown.querySelector(':scope > a');
                        if (parentLink) {
                            parentLink.classList.add('active-parent');
                        }
                    }
                }
            });
        }
    }

    // Initialize when DOM is ready
    function init() {
        const navigation = new Navigation();
        navigation.highlightActivePage();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for external use
    window.Navigation = Navigation;
})();
