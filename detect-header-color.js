/**
 * Скрипт для автоматического определения цвета хедера
 * и применения правильных стилей к переключателю языка
 */
(function() {
    'use strict';

    function updateLangSwitcherColor() {
        const switcher = document.getElementById('lang-switcher');
        if (!switcher) return;

        const button = switcher.querySelector('.lang-current');
        if (!button) return;

        // Получить nav элемент для проверки цвета ссылок
        const nav = document.querySelector('header nav');
        const firstLink = nav ? nav.querySelector('ul.sf-menu > li > a') : null;

        if (firstLink) {
            // Получить вычисленный цвет ссылки навигации
            const linkColor = window.getComputedStyle(firstLink).color;
            
            // Применить тот же цвет к кнопке переключателя
            button.style.color = linkColor;
            
            // Определить, темный ли цвет (для границы)
            const rgb = linkColor.match(/\d+/g);
            if (rgb) {
                const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
                
                if (brightness > 125) {
                    // Светлый текст - светлая граница
                    button.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                } else {
                    // Темный текст - темная граница
                    button.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                }
            }
        }
    }

    // Обновить цвет при загрузке
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateLangSwitcherColor);
    } else {
        updateLangSwitcherColor();
    }

    // Обновить при полной загрузке
    window.addEventListener('load', updateLangSwitcherColor);

    // Обновить при прокрутке (когда хедер меняет цвет)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateLangSwitcherColor, 100);
    });

    // Обновить через небольшие интервалы для WordPress анимаций
    setTimeout(updateLangSwitcherColor, 500);
    setTimeout(updateLangSwitcherColor, 1000);
    setTimeout(updateLangSwitcherColor, 2000);

    // Наблюдать за изменениями класса на header
    const header = document.querySelector('#header-outer, header#top');
    if (header) {
        const observer = new MutationObserver(updateLangSwitcherColor);
        observer.observe(header, {
            attributes: true,
            attributeFilter: ['class', 'style']
        });
    }

    // Экспорт функции обновления
    window.updateLangSwitcherColor = updateLangSwitcherColor;
})();
