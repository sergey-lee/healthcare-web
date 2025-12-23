# Система интернационализации (i18n) для Healthcare Web

## Описание

Эта система позволяет управлять всеми текстами на сайте через переменные JavaScript и легко переключаться между языками (корейский, английский, русский).

## Файлы

1. **i18n.js** - Основной файл с переводами на все языки
2. **i18n-replacer.js** - Скрипт для автоматической замены текстов в HTML
3. **I18N_README.md** - Данная инструкция

## Установка

### Шаг 1: Подключите скрипты в HTML

Добавьте эти строки в `<head>` секцию вашего HTML файла (перед закрывающим тегом `</head>`):

```html
<!-- i18n - Система интернационализации -->
<script src="wp-content/i18n.js"></script>
<script src="wp-content/i18n-replacer.js"></script>
```

### Шаг 2: Добавьте переключатель языков (опционально)

Добавьте кнопки для переключения языков в любом месте вашего сайта:

```html
<div class="language-switcher">
  <button onclick="changeLanguage('ko')">한국어</button>
  <button onclick="changeLanguage('en')">English</button>
  <button onclick="changeLanguage('ru')">Русский</button>
</div>
```

## Использование

### Базовое использование

После подключения скриптов, вы можете использовать систему переводов:

```javascript
// Получить перевод на текущем языке
const greeting = i18n.t('overview.message.greeting');
console.log(greeting); // На корейском: "안녕하십니까,", на английском: "Greetings,"

// Переключить язык
i18n.setLanguage('en'); // Переключить на английский
i18n.setLanguage('ru'); // Переключить на русский
i18n.setLanguage('ko'); // Переключить на корейский

// Переключить язык и обновить все тексты на странице
changeLanguage('en'); // Автоматически заменит все тексты на английский
```

### Структура ключей переводов

Все переводы организованы по категориям:

```javascript
// RSS и мета-информация
i18n.t('rss.feed')
i18n.t('rss.commentsFeed')

// Навигация
i18n.t('nav.researchDev')
i18n.t('nav.development')
i18n.t('nav.customerSupport')
i18n.t('nav.faq')
i18n.t('nav.inquiry')
i18n.t('nav.companyInfo')
i18n.t('nav.overview')
i18n.t('nav.history')

// Категории
i18n.t('categories.gallery')
i18n.t('categories.news')
i18n.t('categories.webzine')

// Общие элементы
i18n.t('common.by')
i18n.t('common.author')
i18n.t('common.authorOf')
i18n.t('common.noComments')

// Footer
i18n.t('footer.companyName')
i18n.t('footer.representative')
i18n.t('footer.address')
i18n.t('footer.phone')
// ... и т.д.

// История компании
i18n.t('history.title')
i18n.t('history.intro1')
i18n.t('history.period1.title')
// ... и т.д.

// О компании (Overview)
i18n.t('overview.mainTitle')
i18n.t('overview.intro1')
i18n.t('overview.message.title')
// ... и т.д.

// Проекты
i18n.t('projects.title')
i18n.t('projects.case1.title')
// ... и т.д.

// Новости
i18n.t('news.officeRelocation.title')
i18n.t('news.holidayShipping.title')
i18n.t('news.serverMaintenance.title')
// ... и т.д.
```

### Использование в HTML с data-атрибутами

Вы можете пометить элементы атрибутом `data-i18n` для автоматического перевода:

```html
<h1 data-i18n="history.title">건강과 과학의 조화를 통해 만들어온 혁신의 여정</h1>
<p data-i18n="overview.message.p1">건강의학연구센터를 찾아주신 여러분께 진심으로 감사드립니다.</p>
```

При переключении языка эти элементы автоматически обновятся.

## Добавление новых переводов

### Шаг 1: Добавьте перевод в i18n.js

Откройте файл `wp-content/i18n.js` и добавьте новый ключ во все языки:

```javascript
ko: {
  myNewSection: {
    title: '새로운 섹션 제목',
    description: '새로운 섹션 설명',
  }
},
en: {
  myNewSection: {
    title: 'New Section Title',
    description: 'New section description',
  }
},
ru: {
  myNewSection: {
    title: 'Заголовок новой секции',
    description: 'Описание новой секции',
  }
}
```

### Шаг 2: Используйте новый ключ

```javascript
const title = i18n.t('myNewSection.title');
```

Или в HTML:

```html
<h2 data-i18n="myNewSection.title">새로운 섹션 제목</h2>
```

## Доступные языки

- `ko` - Корейский (기본, по умолчанию)
- `en` - Английский
- `ru` - Русский

## API

### i18n.t(key)
Получить перевод по ключу на текущем языке.

```javascript
i18n.t('footer.companyName') // "상호" (ko) / "Company Name" (en) / "Название компании" (ru)
```

### i18n.setLanguage(lang)
Установить текущий язык (не обновляет DOM).

```javascript
i18n.setLanguage('en') // Переключить на английский
```

### changeLanguage(lang)
Переключить язык и автоматически обновить все тексты на странице.

```javascript
changeLanguage('ru') // Переключить на русский и обновить страницу
```

### i18n.getAvailableLanguages()
Получить список доступных языков.

```javascript
i18n.getAvailableLanguages() // ['ko', 'en', 'ru']
```

## Примеры использования

### Пример 1: Динамическая замена текста

```javascript
// При клике на кнопку меняем язык
document.getElementById('lang-en').addEventListener('click', function() {
  changeLanguage('en');
});
```

### Пример 2: Программное получение перевода

```javascript
// Создаем элемент с переведенным текстом
const title = document.createElement('h1');
title.textContent = i18n.t('overview.mainTitle');
document.body.appendChild(title);
```

### Пример 3: Определение языка браузера

```javascript
// Автоматически определяем язык браузера
const browserLang = navigator.language.split('-')[0]; // 'en', 'ko', 'ru', etc.
if (['ko', 'en', 'ru'].includes(browserLang)) {
  changeLanguage(browserLang);
} else {
  changeLanguage('en'); // Английский по умолчанию
}
```

## Стилизация переключателя языков

```css
.language-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.language-switcher button {
  margin: 0 5px;
  padding: 8px 16px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.language-switcher button:hover {
  background: #f0f0f0;
}

.language-switcher button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}
```

## Поддержка

Если у вас возникли вопросы или нужна помощь:
1. Проверьте консоль браузера на наличие ошибок
2. Убедитесь, что скрипты подключены в правильном порядке
3. Проверьте, что ключи переводов существуют в файле i18n.js

## Расширение системы

Чтобы добавить поддержку нового языка:

1. Откройте `wp-content/i18n.js`
2. Добавьте новый объект языка в `translations`:

```javascript
translations: {
  ko: { /* существующие переводы */ },
  en: { /* существующие переводы */ },
  ru: { /* существующие переводы */ },
  // Новый язык
  de: {
    rss: {
      feed: 'Feed',
      commentsFeed: 'Kommentar-Feed',
    },
    // ... все остальные переводы
  }
}
```

3. Теперь можно использовать `changeLanguage('de')`
