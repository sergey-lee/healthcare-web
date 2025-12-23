// i18n Text Replacer - Автоматическая замена текстов в HTML на основе переменных i18n
// Healthcare Web - DiagnoX

// Подключаем i18n (должен быть загружен перед этим скриптом)
// <script src="wp-content/i18n.js"></script>
// <script src="wp-content/i18n-replacer.js"></script>

(function() {
  'use strict';

  // Маппинг корейских текстов на пути к переменным i18n
  const textMapping = {
    // RSS
    '피드': 'rss.feed',
    '댓글 피드': 'rss.commentsFeed',

    // Навигация
    '연구및개발': 'nav.researchDev',
    'Development': 'nav.development',
    '고객지원': 'nav.customerSupport',
    'FAQ': 'nav.faq',
    'Inquiry': 'nav.inquiry',
    '회사소개': 'nav.companyInfo',
    'Overview': 'nav.overview',
    'History': 'nav.history',

    // Категории
    '갤러리': 'categories.gallery',
    '새소식': 'categories.news',
    '웹진': 'categories.webzine',

    // Общие
    'By': 'common.by',
    '작성자': 'common.author',
    '의 글': 'common.authorOf',
    'No Comments': 'common.noComments',

    // Footer
    '상호': 'footer.companyName',
    '대표명': 'footer.representative',
    '디펄스': 'footer.representativeValue',
    '주소': 'footer.address',
    '서울특별시 중구 세종대로 110': 'footer.addressValue',
    '전화번호': 'footer.phone',
    '1234-5678': 'footer.phoneValue',
    '사업자등록번호': 'footer.businessNumber',
    '000-12-34567': 'footer.businessNumberValue',
    '팩스': 'footer.fax',
    '012-435-6789': 'footer.faxValue',

    // History
    '건강과 과학의 조화를 통해 만들어온 혁신의 여정': 'history.title',
    '우리의 History은 단순히 시간의 기록이 아니라, 건강한 세상을 만들기 위한 헌신과 열정의 역사입니다.': 'history.intro1',
    '주요 성과와 이정표를 통해,  건강의학연구센터가 어떤 가치를 창출해왔는지 확인하세요.': 'history.intro2',
    '설립 및 초기 기반 구축': 'history.period1.title',
    '건강의학연구센터 설립': 'history.period1.item1Title',
    '현대인의 건강 증진과 질병 예방을 목표로 설립.': 'history.period1.item1Desc',
    '연구소 인프라 구축': 'history.period1.item2Title',
    '주요 실험실 및 데이터 분석 인프라 완 비.': 'history.period1.item2Desc',
    '연구성과와 글로벌 협력 확대': 'history.period2.title',
    '세계보건기구(WHO) 연구 네트워크 합류': 'history.period2.item1Title',
    '만성질환 예방 Project에 주요 연구기관으로 참여.': 'history.period2.item1Desc',
    '국내 1호 건강관리 소프트웨어 출시': 'history.period2.item2Title',
    '과학적 데이터를 활용한 맞춤형 건강관리 플랫폼 개발.': 'history.period2.item2Desc',
    'AI 기반 건강 데이터 분석 플랫폼 개발': 'history.period3.title',
    '빅데이터를 활용한 의료 분석 솔루션 출시.': 'history.period3.item1',
    '주요 국제 학술대회에서 연구 성과 발표.': 'history.period3.item2',
    '지속 가능한 성장과 글로벌 영향력': 'history.period4.title',
    'UN 지속 가능 발전 목표(SDGs) 관련 Project 시작': 'history.period4.item1Title',
    '전 세계 건강 격차 해소를 위한 연구 착수.': 'history.period4.item1Desc',
    '센터 확장 및 리브랜딩': 'history.period4.item2Title',
    '새로운 로고와 비전 발표, 연구소 시설 확장.': 'history.period4.item2Desc',

    // Overview
    '우리는 의료와 기술의 경계를 허물고, 건강 혁신의 새로운 패러다임을 창조합니다.': 'overview.mainTitle',
    '2010년 설립된 전문 연구기관으로, 현대인의 건강 증진과 질병 예방을 위한 혁신적인 연구와 개발을 수행하고 있습니다.': 'overview.intro1',
    '최신 의학 기술과 데이터를 기반으로, 건강관리 솔루션과 의학적 통찰을 제공하며, 글로벌 의료 및 연구 커뮤니티와 협력하여 사람들의 삶의 질을 향상시키는 데 기여하고 있습니다.': 'overview.intro2',
    '건강한 삶을 위한 과학, 우리 모두를 위한 미래': 'overview.message.title',
    '안녕하십니까,': 'overview.message.greeting',
    '건강의학연구센터를 찾아주신 여러분께 진심으로 감사드립니다.': 'overview.message.p1',
    '건강을 위한 비전과 열정을 담은 로고': 'overview.ci.title',

    // Projects
    'Project 현장과 순간을 담다': 'projects.title',
    '건강의학연구센터의 연구와 활동 현장을 사진으로 만나보세요.': 'projects.intro1',
    '우리가 만들어가는 혁신의 과정을 시각적으로 경험해 보실 수 있습니다.': 'projects.intro2',
    '만성질환 예방 및 AI 기반 건강 솔루션': 'projects.table.focus',
    '머신러닝 알고리즘,': 'projects.table.tech1',
    '실시간 데이터 처리 시스템': 'projects.table.tech2',
    '헬스테크 혁신 센터 (ISO 13485 인증)': 'projects.table.location1',
    '개인 맞춤형 건강 플랫폼 및 디지털 치료제': 'projects.table.service',
    '글로벌 헬스 사이언스 파크, 보스턴, 매사추세츠': 'projects.table.location2',
    '의료기관': 'projects.case1.title',
    '연구소': 'projects.case2.title',
    '개인 건강 관리': 'projects.case3.title',

    // News
    '본사 이전 안내': 'news.officeRelocation.title',
    '안녕하세요, 고객 여러분.': 'news.officeRelocation.greeting',
    '추석 연휴 기간 배송 일정 안내': 'news.holidayShipping.title',
    '정기 서버 점검 안내 (2024년 6월 15일)': 'news.serverMaintenance.title',
    '2024년 신제품 출시 안내': 'news.newProduct2024.title',
    '신제품 출시 및 사전 예약 이벤트 안내': 'news.preOrder.title',
    '정기 서버 점검 및 서비스 일시 중단 공지': 'news.serviceMaintenance.title',
    '고객 만족도 향상을 위한 설문 조사 참여 요청 및 경품 안내': 'news.survey.title',
    '신규 서비스 런칭 기념 이벤트 및 참여 방법 안내': 'news.newService.title',
    '감사합니다.': 'news.officeRelocation.thanks',
    'XYZ 회사 드림': 'news.officeRelocation.signature',
  };

  // Функция для замены текста в элементе
  function replaceTextInElement(element, koreanText, i18nKey) {
    if (!element) return;

    // Рекурсивно обходим дочерние узлы
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    const nodesToReplace = [];

    // Собираем все текстовые узлы
    while (node = walker.nextNode()) {
      if (node.nodeValue && node.nodeValue.trim() === koreanText.trim()) {
        nodesToReplace.push(node);
      }
    }

    // Заменяем текст
    nodesToReplace.forEach(node => {
      const translatedText = i18n.t(i18nKey);
      if (translatedText && translatedText !== i18nKey) {
        node.nodeValue = node.nodeValue.replace(koreanText.trim(), translatedText);
      }
    });
  }

  // Функция для замены текста по селектору
  function replaceBySelector(selector, i18nKey) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      const translatedText = i18n.t(i18nKey);
      if (translatedText && translatedText !== i18nKey) {
        el.textContent = translatedText;
      }
    });
  }

  // Функция для замены текста по data-атрибуту
  function addDataI18n(koreanText, i18nKey) {
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      if (el.textContent && el.textContent.trim() === koreanText.trim()) {
        el.setAttribute('data-i18n', i18nKey);
      }
    });
  }

  // Основная функция замены всех текстов
  function replaceAllTexts() {
    console.log('Starting i18n text replacement...');

    // Проходим по всем маппингам
    for (const [koreanText, i18nKey] of Object.entries(textMapping)) {
      // Ищем все элементы с этим текстом
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        // Проверяем только текстовые узлы
        Array.from(el.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue.trim();
            if (text === koreanText || text.includes(koreanText)) {
              const translatedText = i18n.t(i18nKey);
              if (translatedText && translatedText !== i18nKey) {
                node.nodeValue = node.nodeValue.replace(koreanText, translatedText);
              }
            }
          }
        });
      });
    }

    console.log('i18n text replacement completed!');
  }

  // Функция для применения переводов ко всем элементам с data-i18n атрибутом
  function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translatedText = i18n.t(key);
      if (translatedText && translatedText !== key) {
        el.textContent = translatedText;
      }
    });
  }

  // Функция для переключения языка и обновления всех текстов
  window.changeLanguage = function(lang) {
    if (i18n.setLanguage(lang)) {
      replaceAllTexts();
      applyTranslations();
      console.log(`Language changed to: ${lang}`);
    }
  };

  // Автоматическая замена при загрузке страницы
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Не заменяем автоматически, ждем пока пользователь выберет язык
      console.log('i18n ready. Use changeLanguage("en") or changeLanguage("ru") to switch languages.');
    });
  } else {
    console.log('i18n ready. Use changeLanguage("en") or changeLanguage("ru") to switch languages.');
  }

  // Экспорт функций
  window.i18nReplacer = {
    replaceAllTexts: replaceAllTexts,
    applyTranslations: applyTranslations,
    changeLanguage: window.changeLanguage,
    addDataI18n: addDataI18n
  };

})();
