# Интернационализация проекта healthcare-web

## 📋 Оглавление

1. [Обзор](#обзор)
2. [Быстрый старт](#быстрый-старт)
3. [Структура файлов](#структура-файлов)
4. [Использование](#использование)
5. [Категории строк](#категории-строк)
6. [Примеры](#примеры)
7. [FAQ](#faq)

## 🎯 Обзор

Из **73 HTML файлов** проекта автоматически извлечено **483 уникальных текстовых строки**, которые распределены по **10 категориям**:

- 🧭 Navigation (28) - навигация
- 🔘 Buttons (9) - кнопки
- 📝 Forms (8) - формы
- 📞 Contact (99) - контакты
- 📅 Dates (7) - даты
- 🏢 Company (6) - компания
- 🔬 Research (25) - исследования
- 💼 Services (12) - сервисы
- 🇰🇷 Content Korean (51) - корейский контент
- 🇬🇧 Content English (238) - английский контент

## 🚀 Быстрый старт

### Вариант 1: JavaScript/React

```javascript
// Импорт
import TEXT_STRINGS from './text_strings.js';

// Использование
function MyComponent() {
  return <button>{TEXT_STRINGS['검색']}</button>;
}
```

### Вариант 2: С категориями

```javascript
import categorized from './i18n_categorized.json';

const { strings } = categorized;

function MyComponent() {
  return (
    <div>
      <button>{strings.buttons.search}</button>
      <input placeholder={strings.forms.email} />
    </div>
  );
}
```

### Вариант 3: TypeScript

```typescript
import { I18nStrings } from './i18n';
import categorized from './i18n_categorized.json';

const strings: I18nStrings = categorized.strings;

// Теперь IDE будет подсказывать все доступные ключи!
function MyComponent() {
  return <h1>{strings.navigation.about}</h1>;
}
```

## 📁 Структура файлов

```
healthcare-web/
├── text_strings.json              # Простой JSON (343 KB)
├── text_strings.js                # ES6 модуль (343 KB)
├── i18n_categorized.json          # Категоризированный (356 KB)
├── i18n_flat.json                 # Плоская структура (358 KB)
├── i18n.d.ts                      # TypeScript типы (25 KB)
├── extracted_text_content.json    # Полная структура (344 KB)
├── TEXT_EXTRACTION_REPORT.md      # Детальный отчет
├── TEXT_SUMMARY.md                # Краткая сводка
├── example_usage.jsx              # Примеры использования
└── README_i18n.md                 # Эта инструкция
```

### Какой файл использовать?

| Файл | Когда использовать |
|------|-------------------|
| `text_strings.json` | Простое использование без категорий |
| `text_strings.js` | Импорт в JavaScript/React без TypeScript |
| `i18n_categorized.json` | Организованный доступ по категориям |
| `i18n_flat.json` | Плоская структура для некоторых i18n библиотек |
| `i18n.d.ts` | TypeScript проект для type safety |

## 💡 Использование

### 1. Простая подстановка текста

```jsx
import strings from './text_strings.js';

export function Header() {
  return (
    <header>
      <h1>{strings['건강의학연구센터']}</h1>
      <nav>
        <a href="/about">{strings.ABOUT}</a>
        <a href="/faq">{strings.FAQ}</a>
      </nav>
    </header>
  );
}
```

### 2. Работа с категориями

```jsx
import { strings } from './i18n_categorized.json';

export function ContactForm() {
  return (
    <form>
      {/* Поля формы */}
      <input
        type="text"
        placeholder={strings.forms.name}  // 성함
      />
      <input
        type="email"
        placeholder={strings.forms.email}  // 이메일
      />
      <input
        type="tel"
        placeholder={strings.forms.phone}  // 전화번호
      />

      {/* Кнопка */}
      <button type="submit">
        {strings.buttons.submit_inquiry}  // 문의하기
      </button>
    </form>
  );
}
```

### 3. Создание мультиязычности

#### Шаг 1: Создайте переводы

```javascript
// locales/ko.json
{
  "navigation": {
    "about": "소개",
    "research": "연구",
    "contact": "연락처"
  },
  "buttons": {
    "search": "검색",
    "submit": "제출"
  }
}

// locales/en.json
{
  "navigation": {
    "about": "About",
    "research": "Research",
    "contact": "Contact"
  },
  "buttons": {
    "search": "Search",
    "submit": "Submit"
  }
}
```

#### Шаг 2: Создайте i18n контекст

```jsx
import React, { createContext, useContext, useState } from 'react';
import ko from './locales/ko.json';
import en from './locales/en.json';

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('ko');

  const messages = {
    ko,
    en
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = messages[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
```

#### Шаг 3: Используйте в компонентах

```jsx
function App() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div>
      <nav>
        <a href="/about">{t('navigation.about')}</a>
        <a href="/research">{t('navigation.research')}</a>
      </nav>

      <button onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}>
        {locale === 'ko' ? 'English' : '한국어'}
      </button>
    </div>
  );
}
```

### 4. Интеграция с react-i18next

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import categorized from './i18n_categorized.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: {
        translation: categorized.strings
      }
    },
    lng: 'ko',
    fallbackLng: 'ko'
  });

// Использование
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('navigation.about')}</h1>
      <button>{t('buttons.search')}</button>
    </div>
  );
}
```

## 📚 Категории строк

### Navigation (28)
Элементы навигации и меню
```javascript
strings.navigation = {
  about: "ABOUT",
  research: "Research",
  faq: "FAQ",
  news: "NEWS",
  gallery: "Gallery",
  inquiry: "Inquiry",
  // ...
}
```

### Buttons (9)
Кнопки и действия
```javascript
strings.buttons = {
  search: "검색",
  submit_inquiry: "문의하기",
  view_list: "목록보기",
  see_more: "See more",
  // ...
}
```

### Forms (8)
Поля форм
```javascript
strings.forms = {
  name: "성함",
  email: "이메일",
  phone: "전화번호",
  message: "내용",
  // ...
}
```

### Contact (99)
Контактная информация
```javascript
strings.contact = {
  "서울특별시_강남구_테헤란로_123": "...",
  "12345678900": "+886-3-535-5949",
  // ...
}
```

### Research (25)
Исследовательский контент
```javascript
strings.research = {
  "ai_기반_건강_데이터_분석_플랫폼_개발": "...",
  "개인_맞춤형_건강_플랫폼_및_디지털_치료제": "...",
  // ...
}
```

## 📖 Примеры

### Полный пример React приложения

См. файл `example_usage.jsx` для полных примеров, включающих:
- ✅ Простое использование
- ✅ Использование с категориями
- ✅ TypeScript с type safety
- ✅ Кастомный i18n хук
- ✅ Интеграция с react-i18next
- ✅ Утилиты для работы со строками

### Переключение языков

```jsx
function LanguageSwitcher() {
  const [lang, setLang] = useState('ko');

  const strings = lang === 'ko' ? koStrings : enStrings;

  return (
    <div>
      <button onClick={() => setLang('ko')}>한국어</button>
      <button onClick={() => setLang('en')}>English</button>

      <h1>{strings.navigation.about}</h1>
    </div>
  );
}
```

## ❓ FAQ

### Q: Как добавить новый язык?

1. Скопируйте `i18n_categorized.json`
2. Переведите значения на нужный язык
3. Сохраните как `i18n_[код_языка].json`
4. Импортируйте в свое приложение

```javascript
import ko from './i18n_categorized.json';
import en from './i18n_en.json';  // Ваш перевод
import ja from './i18n_ja.json';  // Ваш перевод

const translations = { ko, en, ja };
```

### Q: Почему некоторые ключи содержат технические строки?

Автоматическое извлечение включило некоторые REST API endpoints. Вы можете их отфильтровать:

```javascript
// Фильтр технических строк
function cleanStrings(strings) {
  const cleaned = {};

  for (const [category, items] of Object.entries(strings)) {
    cleaned[category] = {};

    for (const [key, value] of Object.entries(items)) {
      // Пропустить строки с "namespace", "methods" и т.д.
      if (!value.includes('namespace') &&
          !value.includes('methods') &&
          !value.includes('mwpdemo')) {
        cleaned[category][key] = value;
      }
    }
  }

  return cleaned;
}
```

### Q: Как улучшить ключи?

Создайте mapping файл:

```javascript
// keyMapping.js
export const keyMapping = {
  // Старый ключ -> Новый ключ
  'ai_기반_건강_데이터_분석_플랫폼_개발': 'research.ai.platform',
  '개인_맞춤형_건강_플랫폼_및_디지털_치료제': 'research.personalized.platform',
  // ...
};

// Использование
function t(oldKey) {
  const newKey = keyMapping[oldKey] || oldKey;
  return strings[newKey];
}
```

### Q: Можно ли использовать с Vue.js?

Да! Все файлы совместимы с Vue.js и vue-i18n:

```javascript
// main.js
import { createI18n } from 'vue-i18n';
import categorized from './i18n_categorized.json';

const i18n = createI18n({
  locale: 'ko',
  messages: {
    ko: categorized.strings
  }
});

app.use(i18n);
```

```vue
<!-- Component.vue -->
<template>
  <div>
    <h1>{{ $t('navigation.about') }}</h1>
    <button>{{ $t('buttons.search') }}</button>
  </div>
</template>
```

### Q: Как обновить строки при изменении HTML?

Просто запустите скрипт заново:

```bash
python3 extract_text_content.py
python3 create_i18n_structure.py
```

## 🔧 Дополнительные утилиты

### Поиск строки

```javascript
function findString(searchText, strings) {
  const results = [];

  for (const [category, items] of Object.entries(strings)) {
    for (const [key, value] of Object.entries(items)) {
      if (value.toLowerCase().includes(searchText.toLowerCase())) {
        results.push({ category, key, value });
      }
    }
  }

  return results;
}

// Использование
const results = findString('건강', categorized.strings);
console.log(results);
```

### Получение статистики

```javascript
function getStats(strings) {
  const stats = {};

  for (const [category, items] of Object.entries(strings)) {
    stats[category] = Object.keys(items).length;
  }

  return stats;
}

console.log(getStats(categorized.strings));
// { navigation: 28, buttons: 9, forms: 8, ... }
```

## 📝 Лицензия

Эти файлы созданы автоматически из HTML файлов проекта healthcare-web.

## 🤝 Поддержка

Для вопросов и предложений обращайтесь к команде разработки.

---

**Создано:** 2025-12-23
**Версия:** 1.0.0
**Инструмент:** Claude Code
