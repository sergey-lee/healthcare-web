/**
 * Language Switcher - English / 繁體中文 (Taiwan)
 */
(function() {
    'use strict';

    // Доступные языки
    const languages = {
        'en': {
            name: 'English',
            flag: '🇺🇸',
            jsonFile: '/i18n_categorized.json'
        },
        'zh-TW': {
            name: '繁體中文',
            flag: '🇹🇼',
            jsonFile: '/i18n_categorized_zh-tw.json'
        }
    };

    // Получить текущий язык из localStorage или установить по умолчанию 'en'
    let currentLang = localStorage.getItem('preferred-language') || 'en';
    let initialized = false;

    // Обновить UI переключателя
    function updateSwitcherUI() {
        const switcher = document.getElementById('lang-switcher');
        if (switcher) {
            const button = switcher.querySelector('.lang-current');
            if (button) {
                const langInfo = languages[currentLang];
                const newHTML = `<span class="lang-flag">${langInfo.flag}</span> <span class="lang-name">${langInfo.name}</span>`;

                // Обновить только если содержимое отличается
                if (button.innerHTML !== newHTML) {
                    button.innerHTML = newHTML;
                    console.log(`[lang-switcher] Updated button to: ${langInfo.name}`);
                }
            }
        }
    }

    // Принудительное обновление UI с повторными попытками
    function forceUpdateUI() {
        updateSwitcherUI();
        // Повторить через короткие интервалы
        setTimeout(updateSwitcherUI, 500);
        setTimeout(updateSwitcherUI, 1000);
        setTimeout(updateSwitcherUI, 2000);
    }

    // Переключить язык
    function switchLanguage(lang) {
        if (lang === currentLang) return;

        // Сохранить выбор языка ПЕРЕД перезагрузкой
        currentLang = lang;
        localStorage.setItem('preferred-language', lang);

        console.log(`[lang-switcher] Switching to ${lang}, reloading page...`);

        // Перезагрузка страницы для применения нового языка
        location.reload();
    }

    // Инициализация при загрузке DOM
    function init() {
        console.log(`[lang-switcher] Init called, initialized: ${initialized}`);

        // Создать UI переключателя, если его еще нет
        const existingSwitcher = document.getElementById('lang-switcher');

        if (!existingSwitcher) {
            console.log(`[lang-switcher] Switcher element not found`);
            return;
        }

        // Проверить, уже ли добавлены обработчики событий
        const hasHandlers = existingSwitcher.hasAttribute('data-handlers-attached');
        if (hasHandlers) {
            console.log(`[lang-switcher] Handlers already attached, updating UI only`);
            updateSwitcherUI();
            return;
        }

        console.log(`[lang-switcher] Initializing with language: ${currentLang}`);
        if (!existingSwitcher) {
            // Найти место для вставки (в buttons ul)
            const buttonsUl = document.querySelector('nav ul.buttons.sf-menu');
            if (buttonsUl) {
                const li = document.createElement('li');
                li.id = 'lang-switcher';
                li.innerHTML = `
                    <div class="lang-switcher-wrap">
                        <a href="#" class="lang-current">
                            <span class="lang-flag">${languages[currentLang].flag}</span>
                            <span class="lang-name">${languages[currentLang].name}</span>
                        </a>
                        <ul class="lang-dropdown">
                            <li><a href="#" data-lang="en"><span class="lang-flag">🇺🇸</span> English</a></li>
                            <li><a href="#" data-lang="zh-TW"><span class="lang-flag">🇹🇼</span> 繁體中文</a></li>
                        </ul>
                    </div>
                `;
                buttonsUl.appendChild(li);

                // Добавить обработчики событий
                const currentBtn = li.querySelector('.lang-current');
                const dropdown = li.querySelector('.lang-dropdown');

                currentBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdown.classList.toggle('show');
                });

                dropdown.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const lang = e.currentTarget.getAttribute('data-lang');
                        dropdown.classList.remove('show');
                        switchLanguage(lang);
                    });
                });

                // Закрыть dropdown при клике вне его
                document.addEventListener('click', (e) => {
                    if (!li.contains(e.target)) {
                        dropdown.classList.remove('show');
                    }
                });
            }
        } else {
            // Элемент уже существует в HTML - обновить UI и добавить обработчики событий
            const currentBtn = existingSwitcher.querySelector('.lang-current');
            const dropdown = existingSwitcher.querySelector('.lang-dropdown');

            // Обновить текст кнопки в соответствии с текущим языком
            if (currentBtn) {
                const langInfo = languages[currentLang];
                currentBtn.innerHTML = `<span class="lang-flag">${langInfo.flag}</span> <span class="lang-name">${langInfo.name}</span>`;
            }

            if (currentBtn && dropdown) {
                currentBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdown.classList.toggle('show');
                });

                dropdown.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const lang = e.currentTarget.getAttribute('data-lang');
                        dropdown.classList.remove('show');
                        switchLanguage(lang);
                    });
                });

                // Закрыть dropdown при клике вне его
                document.addEventListener('click', (e) => {
                    if (!existingSwitcher.contains(e.target)) {
                        dropdown.classList.remove('show');
                    }
                });

                // Отметить, что обработчики добавлены
                existingSwitcher.setAttribute('data-handlers-attached', 'true');
                console.log(`[lang-switcher] Event handlers attached successfully`);
            }
        }

        // Принудительно обновить UI с повторными попытками (для борьбы с WordPress)
        forceUpdateUI();

        // Отметить как инициализированный
        initialized = true;
    }

    // Запуск при загрузке DOM с задержкой для WordPress
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Задержка для WordPress скриптов
            setTimeout(init, 100);
        });
    } else {
        // Если DOM уже загружен, запускаем с небольшой задержкой
        setTimeout(init, 100);
    }

    // Дополнительная инициализация после полной загрузки страницы
    window.addEventListener('load', () => {
        setTimeout(init, 200);
    });

    // Экспорт в глобальную область
    window.langSwitcher = {
        switchLanguage: switchLanguage,
        getCurrentLang: () => currentLang,
        getLanguages: () => languages
    };

})();
