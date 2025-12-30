/**
 * Healthcare Web - i18n String Loader
 * Автоматически загружает и применяет переводы из i18n_categorized.json
 */

(function() {
    'use strict';

    let i18nStrings = {};

    /**
     * Получить путь к файлу переводов на основе выбранного языка
     */
    function getTranslationFile() {
        const currentLang = localStorage.getItem('preferred-language') || 'en';

        if (currentLang === 'zh-TW') {
            return '/i18n_categorized_zh-tw.json';
        }

        return '/i18n_categorized.json'; // English по умолчанию
    }

    /**
     * Загрузка JSON файла с переводами
     */
    async function loadTranslations() {
        try {
            const translationFile = getTranslationFile();
            console.log('[i18n] Loading translations from:', translationFile);

            const response = await fetch(translationFile);
            const data = await response.json();
            i18nStrings = data.strings || {};
            console.log('[i18n] Loaded translations:', Object.keys(i18nStrings).length, 'categories');
            return i18nStrings;
        } catch (error) {
            console.error('[i18n] Failed to load translations:', error);
            return {};
        }
    }

    /**
     * Получить строку по пути (например: "buttons.search" или "navigation.about")
     */
    function getString(path) {
        const keys = path.split('.');
        let value = i18nStrings;

        for (const key of keys) {
            if (value && typeof value === 'object') {
                value = value[key];
            } else {
                return path; // Возвращаем ключ если перевод не найден
            }
        }

        return value || path;
    }

    /**
     * Применить переводы ко всем элементам с data-i18n атрибутом
     */
    function applyTranslations() {
        // Обработка текстового контента
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getString(key);

            if (translation && translation !== key) {
                const hasChildElements = element.children.length > 0;

                if (!hasChildElements) {
                    // Нет дочерних элементов - безопасно заменяем весь текст
                    element.textContent = translation;
                } else {
                    // Есть дочерние элементы - ищем и заменяем ТОЛЬКО текстовые узлы
                    // НЕ трогаем <span>, <i>, <svg> и другие элементы стилизации
                    let replaced = false;

                    // Проходим по всем прямым дочерним узлам
                    for (let node of Array.from(element.childNodes)) {
                        if (node.nodeType === Node.TEXT_NODE) {
                            const text = node.textContent.trim();
                            // Заменяем только непустые текстовые узлы
                            if (text.length > 0) {
                                node.textContent = translation;
                                replaced = true;
                                break; // Заменяем только первый значимый текстовый узел
                            }
                        }
                    }

                    // Если не нашли текстовые узлы на верхнем уровне,
                    // возможно текст внутри вложенных элементов (WordPress анимации)
                    if (!replaced) {
                        // Получаем весь текст из элемента
                        const currentText = element.textContent.trim();
                        // Если текст совпадает с оригиналом - заменяем через innerHTML
                        // но ТОЛЬКО если это WordPress анимация
                        if (element.hasAttribute('data-text-effect')) {
                            element.textContent = translation; // Удалит анимацию, но покажет перевод
                        }
                    }
                }
            }
        });

        // Обработка placeholder атрибутов
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = getString(key);

            if (translation && translation !== key) {
                element.placeholder = translation;
            }
        });

        // Обработка title атрибутов
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = getString(key);

            if (translation && translation !== key) {
                element.title = translation;
            }
        });

        // Обработка alt атрибутов для изображений
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            const translation = getString(key);

            if (translation && translation !== key) {
                element.alt = translation;
            }
        });

        // Обработка aria-label атрибутов
        document.querySelectorAll('[data-i18n-aria]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            const translation = getString(key);

            if (translation && translation !== key) {
                element.setAttribute('aria-label', translation);
            }
        });

        console.log('[i18n] Translations applied');
    }

    /**
     * Инициализация i18n системы
     */
    async function init(enableObserver = false) {
        console.log('[i18n] Initializing...');
        await loadTranslations();

        // Применяем переводы после небольшой задержки, чтобы дать другим скриптам загрузиться
        requestAnimationFrame(() => {
            applyTranslations();
        });

        // Наблюдатель за новыми элементами (ОПЦИОНАЛЬНО - может конфликтовать с другими скриптами)
        // Включается только если передан параметр enableObserver = true
        if (enableObserver) {
            const observer = new MutationObserver((mutations) => {
                let needsUpdate = false;

                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            if (node.hasAttribute && (
                                node.hasAttribute('data-i18n') ||
                                node.hasAttribute('data-i18n-placeholder') ||
                                node.hasAttribute('data-i18n-title') ||
                                node.hasAttribute('data-i18n-alt') ||
                                node.hasAttribute('data-i18n-aria')
                            )) {
                                needsUpdate = true;
                            }
                        }
                    });
                });

                if (needsUpdate) {
                    applyTranslations();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            console.log('[i18n] MutationObserver enabled');
        }
    }

    // Запуск при загрузке DOM
    // НОВАЯ СТРАТЕГИЯ: Изменяем HTML напрямую ДО запуска WordPress скриптов

    async function smartReplace() {
        console.log('[i18n] Smart replace (preserving structure)...');

        // Загружаем переводы только если еще не загружены
        if (Object.keys(i18nStrings).length === 0) {
            await loadTranslations();
        }

        let replacedCount = 0;
        const elementsWithI18n = document.querySelectorAll('[data-i18n]');
        console.log(`[i18n] Found ${elementsWithI18n.length} elements with data-i18n`);

        elementsWithI18n.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getString(key);

            if (translation && translation !== key) {
                // Проверяем, есть ли у элемента подменю (выпадающие списки)
                const hasSubMenu = element.querySelector('.sub-menu, .dropdown-menu, ul.sub-menu');

                if (hasSubMenu) {
                    // Элемент содержит подменю - осторожно заменяем ТОЛЬКО прямой текст
                    for (let node of Array.from(element.childNodes)) {
                        if (node.nodeType === Node.TEXT_NODE) {
                            const text = node.textContent.trim();
                            if (text.length > 0) {
                                // Сохраняем пробелы для правильного отображения
                                const leadingSpace = node.textContent.match(/^\s*/)[0];
                                const trailingSpace = node.textContent.match(/\s*$/)[0];
                                node.textContent = leadingSpace + translation + trailingSpace;
                                break;
                            }
                        }
                    }
                    return; // Не продолжаем дальнейшую обработку для элементов с подменю
                }

                // Проверяем WordPress анимацию букв
                const letterSpans = element.querySelectorAll('.nectar-split-char, .letter, [class*="char"]');

                if (letterSpans.length > 0) {
                    // WordPress анимация - заменяем по буквам
                    console.log(`[i18n] Found letter animation for "${key.substring(0, 30)}..." with ${letterSpans.length} spans`);
                    const letters = translation.split('');
                    letterSpans.forEach((span, index) => {
                        if (index < letters.length) {
                            span.textContent = letters[index];
                        } else {
                            span.remove();
                        }
                    });

                    if (letters.length > letterSpans.length) {
                        const parent = letterSpans[0]?.parentElement || element;
                        for (let i = letterSpans.length; i < letters.length; i++) {
                            const newSpan = letterSpans[0].cloneNode(false);
                            newSpan.textContent = letters[i];
                            parent.appendChild(newSpan);
                        }
                    }
                    replacedCount++;
                } else {
                    // Обычные элементы - безопасная замена
                    const hasChildElements = element.children.length > 0;

                    if (!hasChildElements) {
                        element.textContent = translation;
                        replacedCount++;
                    } else {
                        // Ищем ТОЛЬКО прямой текстовый узел
                        let replaced = false;
                        for (let node of Array.from(element.childNodes)) {
                            if (node.nodeType === Node.TEXT_NODE) {
                                const text = node.textContent.trim();
                                if (text.length > 0) {
                                    // Сохраняем пробелы
                                    const leadingSpace = node.textContent.match(/^\s*/)[0];
                                    const trailingSpace = node.textContent.match(/\s*$/)[0];
                                    node.textContent = leadingSpace + translation + trailingSpace;
                                    replaced = true;
                                    break;
                                }
                            }
                        }

                        // ТОЛЬКО если это простой элемент без важных дочерних
                        if (!replaced && element.children.length === 0) {
                            element.textContent = translation;
                            replacedCount++;
                        }

                        if (replaced) replacedCount++;
                    }
                }
            }
        });

        console.log(`[i18n] Translations applied: ${replacedCount} elements replaced`);
    }

    // Применяем после загрузки страницы и анимаций WordPress
    // Используем множественные попытки с разными задержками
    function initWithRetries() {
        // Попытка 1: Быстро (после базового рендеринга)
        setTimeout(smartReplace, 100);

        // Попытка 2: Средняя (после WordPress init)
        setTimeout(smartReplace, 500);

        // Попытка 3: Поздняя (после всех анимаций)
        setTimeout(smartReplace, 1500);

        // Попытка 4: Финальная (на всякий случай)
        setTimeout(smartReplace, 3000);
    }

    if (document.readyState === 'complete') {
        initWithRetries();
    } else {
        window.addEventListener('load', initWithRetries);
    }

    // Экспорт в глобальную область для использования в консоли/других скриптах
    window.i18n = {
        getString: getString,
        reload: async function() {
            await loadTranslations();
            applyTranslations();
        },
        enableObserver: function() {
            init(true);
        },
        get strings() {
            return i18nStrings;
        }
    };

})();
