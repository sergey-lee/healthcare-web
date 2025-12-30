// Language Switcher Component
(function() {
    'use strict';

    const LANGUAGES = {
        'ko': { name: '한국어', flag: '🇰🇷' },
        'en': { name: 'English', flag: '🇺🇸' },
        'zh-tw': { name: '繁體中文', flag: '🇹🇼' }
    };

    const STORAGE_KEY = 'preferred_language';
    const DEFAULT_LANGUAGE = 'ko';

    class LanguageSwitcher {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) {
                console.warn('Language switcher container not found');
                return;
            }

            this.currentLang = this.getCurrentLanguage();
            this.init();
        }

        getCurrentLanguage() {
            // Check localStorage first
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && LANGUAGES[stored]) {
                return stored;
            }

            // Check URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const langParam = urlParams.get('lang');
            if (langParam && LANGUAGES[langParam]) {
                return langParam;
            }

            // Check HTML lang attribute
            const htmlLang = document.documentElement.lang;
            if (htmlLang && LANGUAGES[htmlLang]) {
                return htmlLang;
            }

            return DEFAULT_LANGUAGE;
        }

        init() {
            this.render();
            this.attachEventListeners();

            // Apply initial language
            this.applyLanguage(this.currentLang);
        }

        render() {
            const current = LANGUAGES[this.currentLang];

            this.container.innerHTML = `
                <div class="lang-switcher">
                    <button class="lang-switcher-toggle" aria-label="Select Language" aria-expanded="false">
                        <span class="lang-flag">${current.flag}</span>
                        <span class="lang-name">${current.name}</span>
                        <i class="fa fa-chevron-down"></i>
                    </button>
                    <div class="lang-switcher-dropdown">
                        ${Object.entries(LANGUAGES).map(([code, lang]) => `
                            <button
                                class="lang-option ${code === this.currentLang ? 'active' : ''}"
                                data-lang="${code}"
                                aria-label="${lang.name}"
                            >
                                <span class="lang-flag">${lang.flag}</span>
                                <span class="lang-name">${lang.name}</span>
                                ${code === this.currentLang ? '<i class="fa fa-check"></i>' : ''}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;

            this.addStyles();
        }

        addStyles() {
            if (document.getElementById('lang-switcher-styles')) return;

            const style = document.createElement('style');
            style.id = 'lang-switcher-styles';
            style.textContent = `
                .lang-switcher {
                    position: relative;
                }

                .lang-switcher-toggle {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    background: white;
                    border: 1px solid #e1e8ed;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 14px;
                    color: #2c3e50;
                }

                .lang-switcher-toggle:hover {
                    border-color: #0693e3;
                    box-shadow: 0 2px 8px rgba(6, 147, 227, 0.1);
                }

                .lang-switcher-toggle .fa-chevron-down {
                    font-size: 12px;
                    transition: transform 0.2s;
                }

                .lang-switcher-toggle[aria-expanded="true"] .fa-chevron-down {
                    transform: rotate(180deg);
                }

                .lang-flag {
                    font-size: 18px;
                    line-height: 1;
                }

                .lang-name {
                    font-weight: 500;
                }

                .lang-switcher-dropdown {
                    position: absolute;
                    top: calc(100% + 8px);
                    right: 0;
                    background: white;
                    border: 1px solid #e1e8ed;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    min-width: 180px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-10px);
                    transition: all 0.2s;
                    z-index: 1000;
                }

                .lang-switcher-dropdown.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .lang-option {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                    padding: 12px 16px;
                    background: none;
                    border: none;
                    border-bottom: 1px solid #f0f3f5;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    text-align: left;
                    font-size: 14px;
                    color: #2c3e50;
                }

                .lang-option:last-child {
                    border-bottom: none;
                }

                .lang-option:hover {
                    background-color: #f8f9fa;
                }

                .lang-option.active {
                    background-color: #e3f2fd;
                    color: #0693e3;
                }

                .lang-option .fa-check {
                    margin-left: auto;
                    color: #0693e3;
                }

                @media (max-width: 768px) {
                    .lang-switcher-toggle .lang-name {
                        display: none;
                    }

                    .lang-switcher-dropdown {
                        right: auto;
                        left: 50%;
                        transform: translateX(-50%) translateY(-10px);
                    }

                    .lang-switcher-dropdown.show {
                        transform: translateX(-50%) translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        attachEventListeners() {
            const toggle = this.container.querySelector('.lang-switcher-toggle');
            const dropdown = this.container.querySelector('.lang-switcher-dropdown');
            const options = this.container.querySelectorAll('.lang-option');

            // Toggle dropdown
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !isExpanded);
                dropdown.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                toggle.setAttribute('aria-expanded', 'false');
                dropdown.classList.remove('show');
            });

            // Prevent dropdown from closing when clicking inside
            dropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            // Language selection
            options.forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.dataset.lang;
                    if (lang !== this.currentLang) {
                        this.switchLanguage(lang);
                    }
                    toggle.setAttribute('aria-expanded', 'false');
                    dropdown.classList.remove('show');
                });
            });
        }

        applyLanguage(lang) {
            // Update HTML lang attribute
            document.documentElement.lang = lang;

            // Store preference
            localStorage.setItem(STORAGE_KEY, lang);

            // Trigger i18n update if available
            if (window.I18n && typeof window.I18n.setLanguage === 'function') {
                window.I18n.setLanguage(lang);
            }
        }

        switchLanguage(lang) {
            this.currentLang = lang;
            this.applyLanguage(lang);

            // Reload page with language parameter
            const url = new URL(window.location);
            url.searchParams.set('lang', lang);
            window.location.href = url.toString();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new LanguageSwitcher('lang-switcher');
        });
    } else {
        new LanguageSwitcher('lang-switcher');
    }

    // Export for external use
    window.LanguageSwitcher = LanguageSwitcher;
})();
