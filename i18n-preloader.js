/**
 * i18n Pre-loader - Загружает переводы СИНХРОННО в <head>
 * Выполняется ДО всех WordPress скриптов
 */
(function() {
    'use strict';

    // Синхронная загрузка JSON
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/i18n_categorized.json', false); // false = синхронно
    xhr.send(null);

    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const strings = data.strings || {};

        console.log('[i18n-preloader] Loaded:', Object.keys(strings).length, 'categories');

        // Функция получения строки
        function getString(path) {
            const keys = path.split('.');
            let value = strings;
            for (const key of keys) {
                if (value && typeof value === 'object') {
                    value = value[key];
                } else {
                    return path;
                }
            }
            return value || path;
        }

        // Применяем переводы сразу
        function applyNow() {
            let count = 0;
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = getString(key);

                if (translation && translation !== key) {
                    element.textContent = translation;
                    count++;
                }
            });
            console.log('[i18n-preloader] Applied', count, 'translations');
        }

        // Применяем сразу если DOM готов
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', applyNow);
        } else {
            applyNow();
        }

        // Экспорт для использования
        window.i18nPreloader = { getString, strings };
    } else {
        console.error('[i18n-preloader] Failed to load JSON:', xhr.status);
    }
})();
