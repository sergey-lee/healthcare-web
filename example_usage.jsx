/**
 * Пример использования извлеченных текстовых строк в React приложении
 *
 * Этот файл демонстрирует различные способы использования
 * извлеченного текстового контента для интернационализации
 */

// ============================================================================
// СПОСОБ 1: Простое использование с text_strings.js
// ============================================================================

import TEXT_STRINGS from './text_strings.js';

export function SimpleExample() {
  return (
    <div>
      <h1>{TEXT_STRINGS['건강의학연구센터']}</h1>
      <button>{TEXT_STRINGS['검색']}</button>
      <a href="/inquiry">{TEXT_STRINGS['문의하기']}</a>
    </div>
  );
}

// ============================================================================
// СПОСОБ 2: Использование категоризированной структуры
// ============================================================================

import categorized from './i18n_categorized.json';

const strings = categorized.strings;

export function Navigation() {
  return (
    <nav>
      <a href="/about">{strings.navigation.about}</a>
      <a href="/research">{strings.navigation.research}</a>
      <a href="/faq">{strings.navigation.faq}</a>
      <a href="/news">{strings.navigation.news}</a>
      <a href="/gallery">{strings.navigation.gallery_2}</a>
      <a href="/inquiry">{strings.navigation.inquiry}</a>
    </nav>
  );
}

export function ContactForm() {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">{strings.forms.name}</label>
        <input
          type="text"
          id="name"
          placeholder={strings.forms.name}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">{strings.forms.email}</label>
        <input
          type="email"
          id="email"
          placeholder={strings.forms.email}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">{strings.forms.phone}</label>
        <input
          type="tel"
          id="phone"
          placeholder={strings.forms.phone}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">{strings.forms.message}</label>
        <textarea
          id="message"
          placeholder={strings.forms.message}
        />
      </div>

      <button type="submit">
        {strings.buttons.submit_inquiry}
      </button>
    </form>
  );
}

export function ButtonGroup() {
  return (
    <div className="button-group">
      <button className="btn-search">
        {strings.buttons.search}
      </button>
      <button className="btn-view">
        {strings.buttons.view_list}
      </button>
      <button className="btn-more">
        {strings.buttons.see_more}
      </button>
    </div>
  );
}

// ============================================================================
// СПОСОБ 3: TypeScript с type safety
// ============================================================================

// example_usage.tsx
/*
import { I18nStrings } from './i18n';
import categorized from './i18n_categorized.json';

const strings: I18nStrings = categorized.strings;

export function TypeSafeComponent() {
  // IDE будет автоматически подсказывать доступные ключи!
  return (
    <div>
      <h1>{strings.research.ai_기반_건강_데이터_분석_플랫폼_개발}</h1>
      <button>{strings.buttons.search}</button>
    </div>
  );
}
*/

// ============================================================================
// СПОСОБ 4: Создание кастомного i18n хука
// ============================================================================

import React, { createContext, useContext, useState } from 'react';
import koStrings from './i18n_categorized.json';

// Создайте английскую версию путем перевода
const enStrings = {
  strings: {
    navigation: {
      about: "About",
      research: "Research",
      faq: "FAQ",
      news: "News",
      gallery_2: "Gallery",
      inquiry: "Inquiry"
    },
    buttons: {
      search: "Search",
      submit_inquiry: "Submit Inquiry",
      view_list: "View List",
      see_more: "See More"
    },
    forms: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message"
    }
  }
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('ko');

  const strings = locale === 'ko' ? koStrings.strings : enStrings.strings;

  const t = (category, key) => {
    return strings[category]?.[key] || `Missing: ${category}.${key}`;
  };

  const value = {
    locale,
    setLocale,
    t,
    strings
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

// Использование хука
export function Header() {
  const { t, locale, setLocale } = useI18n();

  return (
    <header>
      <nav>
        <a href="/about">{t('navigation', 'about')}</a>
        <a href="/research">{t('navigation', 'research')}</a>
        <a href="/faq">{t('navigation', 'faq')}</a>
        <button onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}>
          {locale === 'ko' ? 'EN' : 'KO'}
        </button>
      </nav>
    </header>
  );
}

export function SearchForm() {
  const { t } = useI18n();

  return (
    <div className="search-form">
      <input
        type="text"
        placeholder={t('buttons', 'search')}
      />
      <button>{t('buttons', 'search')}</button>
    </div>
  );
}

// ============================================================================
// СПОСОБ 5: Использование с react-i18next
// ============================================================================

/*
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import categorized from './i18n_categorized.json';

// Инициализация i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: {
        translation: {
          navigation: categorized.strings.navigation,
          buttons: categorized.strings.buttons,
          forms: categorized.strings.forms,
          research: categorized.strings.research,
        }
      },
      en: {
        translation: {
          // Здесь должны быть переводы на английский
          navigation: {
            about: "About",
            research: "Research",
            // ...
          }
        }
      }
    },
    lng: 'ko',
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false
    }
  });

export function I18nextExample() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <nav>
        <a href="/about">{t('navigation.about')}</a>
        <a href="/research">{t('navigation.research')}</a>
      </nav>

      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
      <button onClick={() => i18n.changeLanguage('ko')}>
        한국어
      </button>
    </div>
  );
}
*/

// ============================================================================
// ПОЛНЫЙ ПРИМЕР: App с интернационализацией
// ============================================================================

export function App() {
  return (
    <I18nProvider>
      <div className="app">
        <Header />

        <main>
          <section className="hero">
            <h1>{strings.research['건강한_삶을_위한_과학_우리_모두를_위한_미래']}</h1>
            <SearchForm />
          </section>

          <section className="navigation">
            <Navigation />
          </section>

          <section className="contact">
            <h2>{strings.navigation.inquiry}</h2>
            <ContactForm />
          </section>

          <section className="buttons">
            <ButtonGroup />
          </section>
        </main>
      </div>
    </I18nProvider>
  );
}

// ============================================================================
// УТИЛИТЫ ДЛЯ РАБОТЫ СО СТРОКАМИ
// ============================================================================

/**
 * Получить все строки определенной категории
 */
export function getCategoryStrings(category) {
  return categorized.strings[category] || {};
}

/**
 * Поиск строки по части текста
 */
export function findString(searchText) {
  const results = [];

  Object.entries(categorized.strings).forEach(([category, strings]) => {
    Object.entries(strings).forEach(([key, value]) => {
      if (value.toLowerCase().includes(searchText.toLowerCase())) {
        results.push({
          category,
          key,
          value
        });
      }
    });
  });

  return results;
}

/**
 * Получить статистику по категориям
 */
export function getStats() {
  const stats = {};

  Object.entries(categorized.strings).forEach(([category, strings]) => {
    stats[category] = Object.keys(strings).length;
  });

  return stats;
}

// Пример использования утилит
console.log('Статистика:', getStats());
console.log('Кнопки:', getCategoryStrings('buttons'));
console.log('Поиск "건강":', findString('건강'));

export default App;
