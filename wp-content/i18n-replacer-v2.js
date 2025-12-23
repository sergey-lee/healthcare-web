// i18n Text Replacer V2 - Улучшенная версия с автоматическим поиском
// Healthcare Web - DiagnoX

(function() {
  'use strict';

  // Проверяем наличие i18nFull
  if (typeof i18nFull === 'undefined') {
    console.error('i18n-replacer-v2.js: i18nFull не найден! Подключите i18n-full.js перед этим скриптом.');
    return;
  }

  // Маппинг корейских текстов на ключи i18n (из texts-catalog.json)
  const textToKeyMap = {
    // Footer
    '상호': 'footer.text7',
    '대표명': 'footer.text8',
    '디펄스': 'footer.text9',
    '사업자등록번호': 'footer.text10',
    '서울특별시 중구 세종대로 110': 'footer.text11',
    '전화번호': 'footer.text12',
    '주소': 'footer.text13',
    '팩스': 'footer.text14',
    '000-12-34567': 'footer.text15',
    '1234-5678': 'footer.text16',

    // History
    '건강과 과학의 조화를 통해 만들어온 혁신의 여정': 'history.text1',
    '설립 및 초기 기반 구축': 'history.text2',
    '연구성과와 글로벌 협력 확대': 'history.text3',
    '건강의학연구센터 설립': 'history.text4',
    '현대인의 건강 증진과 질병 예방을 목표로 설립.': 'history.text5',
    '연구소 인프라 구축': 'history.text6',
    '주요 실험실 및 데이터 분석 인프라 완 비.': 'history.text7',
    '세계보건기구(WHO) 연구 네트워크 합류': 'history.text8',
    '만성질환 예방 Project에 주요 연구기관으로 참여.': 'history.text9',
    '국내 1호 건강관리 소프트웨어 출시': 'history.text10',
    '과학적 데이터를 활용한 맞춤형 건강관리 플랫폼 개발.': 'history.text11',

    // Overview
    '우리는 의료와 기술의 경계를 허물고, 건강 혁신의 새로운 패러다임을 창조합니다.': 'overview.text1',
    '건강한 삶을 위한 과학, 우리 모두를 위한 미래': 'overview.text2',
    '건강을 위한 비전과 열정을 담은 로고': 'overview.text3',
    '안녕하십니까,': 'overview.text4',
    '건강의학연구센터를 찾아주신 여러분께 진심으로 감사드립니다.': 'overview.text5',
    '2010년 설립된 전문 연구기관으로, 현대인의 건강 증진과 질병 예방을 위한 혁신적인 연구와 개발을 수행하고 있습니다.': 'overview.text6',
    '최신 의학 기술과 데이터를 기반으로, 건강관리 솔루션과 의학적 통찰을 제공하며, 글로벌 의료 및 연구 커뮤니티와 협력하여 사람들의 삶의 질을 향상시키는 데 기여하고 있습니다.': 'overview.text7',

    // Projects
    'Project 현장과 순간을 담다': 'projects.text1',
    '건강의학연구센터의 연구와 활동 현장을 사진으로 만나보세요.': 'projects.text2',
    '우리가 만들어가는 혁신의 과정을 시각적으로 경험해 보실 수 있습니다.': 'projects.text3',
    '의료기관': 'projects.text4',
    '연구소': 'projects.text5',
    '개인 건강 관리': 'projects.text6',
    '만성질환 예방 및 AI 기반 건강 솔루션': 'projects.text7',
    '머신러닝 알고리즘,': 'projects.text8',
    '실시간 데이터 처리 시스템': 'projects.text9',
    '헬스테크 혁신 센터 (ISO 13485 인증)': 'projects.text10',
    '개인 맞춤형 건강 플랫폼 및 디지털 치료제': 'projects.text11',
    '암 연구': 'research.text1',
    '우리 연구소는 암 예방 및 치료법 개발을 위한 첨단 연구를 진행하고 있습니다.': 'research.text2',

    // Research
    '개발 및 구현': 'research.text3',
    '연구 및 개발': 'research.text4',

    // News
    '2024년 신제품 출시 안내': 'news.text1',
    '본사 이전 안내': 'news.text2',
    '추석 연휴 기간 배송 일정 안내': 'news.text3',
    '정기 서버 점검 안내 (2024년 6월 15일)': 'news.text4',
    '안녕하세요, 고객 여러분.': 'news.text5',
    '감사합니다.': 'news.text6',
    'XYZ 회사 드림': 'news.text7',

    // Categories
    '갤러리': 'categories.gallery',
    '새소식': 'categories.news',
    '웹진': 'categories.webzine',

    // FAQ
    '건강의학연구센터에 대한 주요 질문과 답변': 'faq.text1',
    '건강의학연구센터에 대한 주요 질문과 답변을 확인하실 수 있습니다.': 'faq.text2',

    // Location
    '건강의학연구센터 본사 및 연구소 안내': 'location.text1',
    '경기도 연구소': 'location.text2',

    // Contact
    '문의하기': 'contact.text1',

    // Buttons
    '검색': 'buttons.text1',
  };

  // Функция проверки, является ли текст корейским
  function isKorean(text) {
    return /[가-힣]/.test(text);
  }

  // Функция для замены текста в текстовых узлах
  function replaceTextInNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();

      if (text && isKorean(text)) {
        // Проверяем, есть ли точное совпадение
        if (textToKeyMap[text]) {
          const key = textToKeyMap[text];
          const translated = i18nFull.t(key);

          if (translated && translated !== key) {
            node.textContent = node.textContent.replace(text, translated);
          }
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Обрабатываем дочерние узлы
      Array.from(node.childNodes).forEach(child => {
        replaceTextInNode(child);
      });
    }
  }

  // Функция для обработки элементов с data-i18n атрибутом
  function processDataI18nElements() {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = i18nFull.t(key);

      if (translated && translated !== key) {
        // Заменяем только текстовое содержимое, сохраняя HTML структуру
        if (el.children.length === 0) {
          // Простой текст
          el.textContent = translated;
        } else {
          // Есть дочерние элементы - заменяем только прямые текстовые узлы
          Array.from(el.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent.trim();
              if (text) {
                node.textContent = translated;
              }
            }
          });
        }
      }
    });
  }

  // Функция для замены всех текстов на странице
  function replaceAllTexts() {
    console.log('🔄 Начинаю замену текстов...');

    // 1. Сначала обрабатываем элементы с data-i18n
    processDataI18nElements();

    // 2. Затем обрабатываем все остальные тексты
    replaceTextInNode(document.body);

    console.log(`✅ Замена завершена на язык: ${i18nFull.currentLanguage}`);
  }

  // Функция для переключения языка
  window.changeLanguage = function(lang) {
    console.log(`🌐 Переключение языка на: ${lang}`);

    if (i18nFull.setLanguage(lang)) {
      // Сохраняем выбор в localStorage
      localStorage.setItem('selectedLanguage', lang);

      // Заменяем все тексты
      replaceAllTexts();

      // Обновляем активное состояние кнопок
      updateLanguageButtons(lang);

      console.log(`✅ Язык изменен на: ${lang}`);
      return true;
    } else {
      console.error(`❌ Язык ${lang} не поддерживается`);
      return false;
    }
  };

  // Обновление активного состояния кнопок переключателя
  function updateLanguageButtons(activeLang) {
    const buttons = document.querySelectorAll('.language-switcher button, .language-switcher-header button, [data-lang-btn], .lang-btn');

    console.log(`🔘 Updating buttons for language: ${activeLang}, found ${buttons.length} buttons`);

    buttons.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang') ||
                      btn.getAttribute('onclick')?.match(/changeLanguage\('(\w+)'\)/)?.[1];

      if (btnLang === activeLang) {
        btn.classList.add('active');
        console.log(`  ✓ Activated button for: ${btnLang}`);
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Инициализация при загрузке страницы
  function init() {
    console.log('🚀 i18n-replacer-v2 инициализирован');

    // Проверяем сохраненный язык
    const savedLang = localStorage.getItem('selectedLanguage');

    if (savedLang && ['ko', 'en', 'zh'].includes(savedLang)) {
      // Восстанавливаем сохраненный язык
      i18nFull.setLanguage(savedLang);
      replaceAllTexts();
      updateLanguageButtons(savedLang);
      console.log(`📌 Восстановлен сохраненный язык: ${savedLang}`);
    } else {
      // Определяем язык браузера
      const browserLang = navigator.language.split('-')[0];

      if (['ko', 'en', 'zh'].includes(browserLang)) {
        i18nFull.setLanguage(browserLang);
        replaceAllTexts();
        updateLanguageButtons(browserLang);
        console.log(`🌍 Установлен язык браузера: ${browserLang}`);
      } else {
        console.log(`📍 Используется язык по умолчанию: ${i18nFull.currentLanguage}`);
        replaceAllTexts();
        updateLanguageButtons(i18nFull.currentLanguage);
      }
    }

    console.log('💡 Используйте changeLanguage("en"), changeLanguage("zh") или changeLanguage("ko") для смены языка');
  }

  // Запуск при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Экспорт API
  window.i18nReplacer = {
    replaceAllTexts: replaceAllTexts,
    changeLanguage: window.changeLanguage,
    getCurrentLanguage: () => i18nFull.currentLanguage,
    getSupportedLanguages: () => ['ko', 'en', 'zh'],
    textToKeyMap: textToKeyMap
  };

})();
