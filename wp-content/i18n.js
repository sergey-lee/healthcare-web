// Internationalization (i18n) - Языковые переменные проекта
// Healthcare Web - DiagnoX

const i18n = {
  // Текущий язык
  currentLanguage: 'ko', // 'ko' - корейский, 'en' - английский, 'ru' - русский

  // Переводы
  translations: {
    // ========================================
    // КОРЕЙСКИЙ (기본)
    // ========================================
    ko: {
      // Meta и RSS
      rss: {
        feed: '피드',
        commentsFeed: '댓글 피드',
      },

      // Навигация и меню
      nav: {
        researchDev: '연구및개발',
        development: 'Development',
        customerSupport: '고객지원',
        faq: 'FAQ',
        inquiry: 'Inquiry',
        companyInfo: '회사소개',
        overview: 'Overview',
        history: 'History',
      },

      // Категории
      categories: {
        gallery: '갤러리',
        news: '새소식',
        webzine: '웹진',
      },

      // Общие элементы
      common: {
        by: 'By',
        author: '작성자',
        authorOf: '의 글',
        noComments: 'No Comments',
      },

      // Footer - Информация о компании
      footer: {
        companyName: '상호',
        companyNameValue: 'DiagnoX',
        representative: '대표명',
        representativeValue: '디펄스',
        address: '주소',
        addressValue: '서울특별시 중구 세종대로 110',
        phone: '전화번호',
        phoneValue: '1234-5678',
        businessNumber: '사업자등록번호',
        businessNumberValue: '000-12-34567',
        fax: '팩스',
        faxValue: '012-435-6789',
      },

      // История компании (History)
      history: {
        title: '건강과 과학의 조화를 통해 만들어온 혁신의 여정',
        intro1: '우리의 History은 단순히 시간의 기록이 아니라, 건강한 세상을 만들기 위한 헌신과 열정의 역사입니다.',
        intro2: '주요 성과와 이정표를 통해,  건강의학연구센터가 어떤 가치를 창출해왔는지 확인하세요.',

        period1: {
          title: '설립 및 초기 기반 구축',
          item1Title: '건강의학연구센터 설립',
          item1Desc: '현대인의 건강 증진과 질병 예방을 목표로 설립.',
          item2Title: '연구소 인프라 구축',
          item2Desc: '주요 실험실 및 데이터 분석 인프라 완 비.',
        },

        period2: {
          title: '연구성과와 글로벌 협력 확대',
          item1Title: '세계보건기구(WHO) 연구 네트워크 합류',
          item1Desc: '만성질환 예방 Project에 주요 연구기관으로 참여.',
          item2Title: '국내 1호 건강관리 소프트웨어 출시',
          item2Desc: '과학적 데이터를 활용한 맞춤형 건강관리 플랫폼 개발.',
        },

        period3: {
          title: 'AI 기반 건강 데이터 분석 플랫폼 개발',
          item1: '빅데이터를 활용한 의료 분석 솔루션 출시.',
          item2: '주요 국제 학술대회에서 연구 성과 발표.',
        },

        period4: {
          title: '지속 가능한 성장과 글로벌 영향력',
          item1Title: 'UN 지속 가능 발전 목표(SDGs) 관련 Project 시작',
          item1Desc: '전 세계 건강 격차 해소를 위한 연구 착수.',
          item2Title: '센터 확장 및 리브랜딩',
          item2Desc: '새로운 로고와 비전 발표, 연구소 시설 확장.',
        },
      },

      // Overview (О компании)
      overview: {
        mainTitle: '우리는 의료와 기술의 경계를 허물고, 건강 혁신의 새로운 패러다임을 창조합니다.',
        intro1: '2010년 설립된 전문 연구기관으로, 현대인의 건강 증진과 질병 예방을 위한 혁신적인 연구와 개발을 수행하고 있습니다.',
        intro2: '최신 의학 기술과 데이터를 기반으로, 건강관리 솔루션과 의학적 통찰을 제공하며, 글로벌 의료 및 연구 커뮤니티와 협력하여 사람들의 삶의 질을 향상시키는 데 기여하고 있습니다.',

        message: {
          title: '건강한 삶을 위한 과학, 우리 모두를 위한 미래',
          greeting: '안녕하십니까,',
          p1: '건강의학연구센터를 찾아주신 여러분께 진심으로 감사드립니다.',
          p2: '우리 센터는 건강 증진과 질병 예방을 위한 연구를 통해 현대인의 삶의 질을 향상시키는 데 전념하고 있습니다. 급변하는 의료 환경 속에서 과학적 근거와 최신 기술을 바탕으로, 실질적이고 지속 가능한 솔루션을 제공하고자 노력하고 있습니다.',
          p3: '"과학으로 건강한 삶을 설계한다"는 비전 아래, 우리는 각종 만성질환의 예방 연구, 개인 맞춤형 건강 관리 기술 개발, 의료 데이터 분석을 통한 새로운 인사이트를 제시하며 글로벌 헬스케어 분야의 혁신을 선도하고 있습니다.',
          p4: '우리의 노력은 단순히 연구에 머무르지 않습니다. 여러분의 신뢰와 협력을 바탕으로, 건강한 내일을 함께 만들어가는 동반자가 되고자 합니다. 앞으로도 최고의 전문성과 열정으로, 여러분의 건강과 행복을 위해 최선을 다하겠습니다.',
          thanks: '감사합니다.',
        },

        ci: {
          title: '건강을 위한 비전과 열정을 담은 로고',
          description: '우리 센터의 CI는 건강 증진과 미래지향적 비전을 담아 디자인되었습니다.심볼과 로고는 과학적 전문성, 신뢰, 그리고 사람 중심의 가치를 상징합니다. 모든 CI 요소는 우리 센터의 정체성을 유지하는 데 중요한 역할을 하므로, 가이드라인에 따라 사용해 주시기 바랍니다.',
        },
      },

      // Projects / Portfolio
      projects: {
        title: 'Project 현장과 순간을 담다',
        intro1: '건강의학연구센터의 연구와 활동 현장을 사진으로 만나보세요.',
        intro2: '우리가 만들어가는 혁신의 과정을 시각적으로 경험해 보실 수 있습니다.',

        table: {
          focus: '만성질환 예방 및 AI 기반 건강 솔루션',
          tech1: '머신러닝 알고리즘,',
          tech2: '실시간 데이터 처리 시스템',
          location1: '헬스테크 혁신 센터 (ISO 13485 인증)',
          service: '개인 맞춤형 건강 플랫폼 및 디지털 치료제',
          location2: '글로벌 헬스 사이언스 파크, 보스턴, 매사추세츠',
        },

        case1: {
          title: '의료기관',
          problem: '한 대형 병원은 만성질환 환자의 증가와 정밀한 예측의 필요성을 느끼고 있었습니다.',
          solution: '데이터 기반 진단의 효율성을 높이기 위해 우리 센터의 AI 건강 예측 시스템을 도입했습니다.',
        },

        case2: {
          title: '연구소',
          problem: '신약 개발 과정에서 막대한 양의 생물학적 데이터를 처리하는 데 어려움을 겪고 있던 연구소는 데이터 분석의 정확성과 속도를 높이기 위해 우리 기술을 채택했습니다.',
        },

        case3: {
          title: '개인 건강 관리',
          problem: '한 보험사는 고객의 건강 증진을 지원하며 장기적으로 의료비를 절감하기 위해 개인 맞춤형 건강관리 앱을 기획했습니다.',
        },
      },

      // Новости и статьи
      news: {
        officeRelocation: {
          title: '본사 이전 안내',
          greeting: '안녕하세요, 고객 여러분.',
          p1: '저희 XYZ 회사는 더 나은 서비스 제공과 업무 환경 개선을 위해 본사를 새로운 장소로 이전하게 되었습니다. 새로운 사무실에서 더욱 발전된 모습으로 고객 여러분을 맞이하겠습니다.',
          addressTitle: '새로운 주소:',
          address: '서울특별시 강남구 테헤란로 123, ABC 빌딩 10층',
          scheduleTitle: '이전 일정:',
          schedule: '2024년 8월 1일(목)부터 새로운 주소지에서 업무를 시작합니다.',
          p2: '기존의 전화번호와 이메일 주소는 변동 없이 그대로 사용 가능합니다. 본사 이전으로 인해 불편을 끼쳐드린 점 양해 부탁드리며, 앞으로도 많은 관심과 성원 부탁드립니다.',
          thanks: '감사합니다.',
          signature: 'XYZ 회사 드림',
        },

        holidayShipping: {
          title: '추석 연휴 기간 배송 일정 안내',
          greeting: '안녕하세요, 고객 여러분.',
          p1: '다가오는 추석 연휴를 맞이하여 배송 일정에 대해 안내드립니다. 연휴 기간 동안에는 배송이 지연될 수 있으니, 아래 일정을 참고하여 주문해 주시기 바랍니다.',
          scheduleTitle: '배송 일정:',
          schedule1: '추석 연휴 전 마지막 배송: 2024년 9월 25일(수)',
          schedule2: '추석 연휴 후 배송 재개: 2024년 10월 2일(수)',
          p2: '연휴 기간 동안 고객센터 운영도 잠시 중단되며, 문의 사항은 이메일을 통해 남겨주시면 연휴 후 신속히 답변드리겠습니다.',
          wishes: '풍성한 한가위 되시길 바랍니다.',
          thanks: '감사합니다.',
          signature: 'XYZ 회사 드림',
        },

        serverMaintenance: {
          title: '정기 서버 점검 안내 (2024년 6월 15일)',
          greeting: '안녕하세요, 고객 여러분.',
          p1: '더 나은 서비스를 제공하기 위해 2024년 6월 15일(토) 00:00 ~ 06:00 동안 정기 서버 점검을 실시할 예정입니다. 점검 시간 동안에는 홈페이지 및 일부 서비스 이용이 일시 중단될 수 있으니 이 점 양해 부탁드립니다.',
          scheduleTitle: '점검 일시:',
          schedule: '2024년 6월 15일(토) 00:00 ~ 06:00',
          p2: '점검이 완료되는 대로 모든 서비스를 정상적으로 이용하실 수 있도록 최선을 다하겠습니다.',
          thanks: '감사합니다.',
          signature: 'XYZ 회사 드림',
        },

        newProduct2024: {
          title: '2024년 신제품 출시 안내',
          greeting: '안녕하세요, 고객 여러분.',
          p1: '저희 XYZ 회사는 2024년 7월 1일에 최신 기술이 적용된 신제품 ABC 모델을 출시하게 되었습니다. 이번 신제품은 성능과 디자인 모두에서 혁신적인 변화를 이루어냈으며, 고객 여러분께 최고의 만족을 드릴 수 있을 것입니다.',
          featuresTitle: '신제품 ABC 모델의 주요 특징:',
          feature1: '향상된 배터리 수명',
          feature2: '새로운 디자인과 다양한 색상',
          feature3: '고속 충전 기능 추가',
          feature4: '최첨단 센서 기술 적용',
          p2: '출시 기념으로 한정 기간 동안 특별 할인 이벤트를 진행하오니 많은 관심과 참여 부탁드립니다.',
          thanks: '감사합니다.',
          signature: 'XYZ 회사 드림',
        },

        preOrder: {
          title: '신제품 출시 및 사전 예약 이벤트 안내',
        },

        serviceMaintenance: {
          title: '정기 서버 점검 및 서비스 일시 중단 공지',
        },

        survey: {
          title: '고객 만족도 향상을 위한 설문 조사 참여 요청 및 경품 안내',
        },

        newService: {
          title: '신규 서비스 런칭 기념 이벤트 및 참여 방법 안내',
        },
      },
    },

    // ========================================
    // АНГЛИЙСКИЙ
    // ========================================
    en: {
      // Meta и RSS
      rss: {
        feed: 'Feed',
        commentsFeed: 'Comments Feed',
      },

      // Навигация и меню
      nav: {
        researchDev: 'Research & Development',
        development: 'Development',
        customerSupport: 'Customer Support',
        faq: 'FAQ',
        inquiry: 'Inquiry',
        companyInfo: 'Company Info',
        overview: 'Overview',
        history: 'History',
      },

      // Категории
      categories: {
        gallery: 'Gallery',
        news: 'News',
        webzine: 'Webzine',
      },

      // Общие элементы
      common: {
        by: 'By',
        author: 'Author',
        authorOf: "'s posts",
        noComments: 'No Comments',
      },

      // Footer - Информация о компании
      footer: {
        companyName: 'Company Name',
        companyNameValue: 'DiagnoX',
        representative: 'Representative',
        representativeValue: 'DePulse',
        address: 'Address',
        addressValue: '110 Sejong-daero, Jung-gu, Seoul',
        phone: 'Phone',
        phoneValue: '1234-5678',
        businessNumber: 'Business Registration Number',
        businessNumberValue: '000-12-34567',
        fax: 'Fax',
        faxValue: '012-435-6789',
      },

      // История компании (History)
      history: {
        title: 'The Journey of Innovation Through the Harmony of Health and Science',
        intro1: 'Our history is not just a record of time, but a testament to dedication and passion for creating a healthier world.',
        intro2: 'Explore the values the Health and Medical Research Center has created through key achievements and milestones.',

        period1: {
          title: 'Establishment and Initial Infrastructure Development',
          item1Title: 'Health and Medical Research Center Established',
          item1Desc: 'Founded with the goal of promoting modern health and preventing diseases.',
          item2Title: 'Research Facility Infrastructure Development',
          item2Desc: 'Completion of major laboratories and data analysis infrastructure.',
        },

        period2: {
          title: 'Research Achievements and Global Collaboration Expansion',
          item1Title: 'Joined WHO Research Network',
          item1Desc: 'Participated as a key research institution in chronic disease prevention projects.',
          item2Title: 'Launch of First Domestic Health Management Software',
          item2Desc: 'Development of personalized health management platform using scientific data.',
        },

        period3: {
          title: 'AI-Based Health Data Analysis Platform Development',
          item1: 'Launch of medical analysis solutions utilizing big data.',
          item2: 'Presentation of research achievements at major international conferences.',
        },

        period4: {
          title: 'Sustainable Growth and Global Impact',
          item1Title: 'Launch of UN Sustainable Development Goals (SDGs) Related Project',
          item1Desc: 'Initiated research to address global health disparities.',
          item2Title: 'Center Expansion and Rebranding',
          item2Desc: 'Announcement of new logo and vision, expansion of research facilities.',
        },
      },

      // Overview (О компании)
      overview: {
        mainTitle: 'We break down the boundaries between medicine and technology, creating a new paradigm of health innovation.',
        intro1: 'Established in 2010, we are a specialized research institution conducting innovative research and development for modern health promotion and disease prevention.',
        intro2: 'Based on the latest medical technology and data, we provide health management solutions and medical insights, contributing to improving people\'s quality of life through collaboration with the global medical and research community.',

        message: {
          title: 'Science for Healthy Living, Future for All of Us',
          greeting: 'Greetings,',
          p1: 'We sincerely thank you for visiting the Health and Medical Research Center.',
          p2: 'Our center is dedicated to improving the quality of life for modern people through research for health promotion and disease prevention. In a rapidly changing medical environment, we strive to provide practical and sustainable solutions based on scientific evidence and the latest technology.',
          p3: 'Under the vision of "Designing a healthy life through science," we lead innovation in the global healthcare field by presenting new insights through research on preventing various chronic diseases, developing personalized health management technologies, and analyzing medical data.',
          p4: 'Our efforts do not stop at research alone. Based on your trust and cooperation, we aim to become a partner in creating a healthier tomorrow together. We will continue to do our best for your health and happiness with the highest expertise and passion.',
          thanks: 'Thank you.',
        },

        ci: {
          title: 'Logo Embodying Vision and Passion for Health',
          description: 'Our center\'s CI is designed to embody health promotion and a future-oriented vision. The symbol and logo represent scientific expertise, trust, and people-centered values. All CI elements play an important role in maintaining our center\'s identity, so please use them according to the guidelines.',
        },
      },

      // Projects / Portfolio
      projects: {
        title: 'Capturing Project Sites and Moments',
        intro1: 'Experience the research and activities of the Health and Medical Research Center through photos.',
        intro2: 'You can visually experience the process of innovation we are creating.',

        table: {
          focus: 'Chronic Disease Prevention and AI-Based Health Solutions',
          tech1: 'Machine Learning Algorithms,',
          tech2: 'Real-time Data Processing System',
          location1: 'HealthTech Innovation Center (ISO 13485 Certified)',
          service: 'Personalized Health Platform and Digital Therapeutics',
          location2: 'Global Health Science Park, Boston, Massachusetts',
        },

        case1: {
          title: 'Medical Institution',
          problem: 'A large hospital was experiencing an increase in chronic disease patients and recognized the need for precise predictions.',
          solution: 'To improve the efficiency of data-based diagnosis, they adopted our center\'s AI health prediction system.',
        },

        case2: {
          title: 'Research Institute',
          problem: 'A research institute struggling to process massive amounts of biological data during drug development adopted our technology to improve the accuracy and speed of data analysis.',
        },

        case3: {
          title: 'Personal Health Management',
          problem: 'An insurance company planned a personalized health management app to support customer health improvement and reduce medical costs in the long term.',
        },
      },

      // Новости и статьи
      news: {
        officeRelocation: {
          title: 'Headquarters Relocation Notice',
          greeting: 'Hello, valued customers.',
          p1: 'XYZ Company will be relocating our headquarters to a new location to provide better services and improve the work environment. We will welcome you with a more advanced appearance in our new office.',
          addressTitle: 'New Address:',
          address: '10th Floor, ABC Building, 123 Teheran-ro, Gangnam-gu, Seoul',
          scheduleTitle: 'Relocation Schedule:',
          schedule: 'We will start operations at the new address from Thursday, August 1, 2024.',
          p2: 'Existing phone numbers and email addresses will remain unchanged. We apologize for any inconvenience caused by the headquarters relocation and ask for your continued interest and support.',
          thanks: 'Thank you.',
          signature: 'XYZ Company',
        },

        holidayShipping: {
          title: 'Chuseok Holiday Shipping Schedule Notice',
          greeting: 'Hello, valued customers.',
          p1: 'We would like to inform you about the shipping schedule for the upcoming Chuseok holiday. Deliveries may be delayed during the holiday period, so please refer to the schedule below when placing orders.',
          scheduleTitle: 'Shipping Schedule:',
          schedule1: 'Last delivery before Chuseok: Wednesday, September 25, 2024',
          schedule2: 'Shipping resumes after Chuseok: Wednesday, October 2, 2024',
          p2: 'Customer service will also be temporarily suspended during the holiday period. If you have any inquiries, please leave them via email and we will respond promptly after the holiday.',
          wishes: 'We wish you a bountiful Chuseok.',
          thanks: 'Thank you.',
          signature: 'XYZ Company',
        },

        serverMaintenance: {
          title: 'Regular Server Maintenance Notice (June 15, 2024)',
          greeting: 'Hello, valued customers.',
          p1: 'To provide better service, we will conduct regular server maintenance from 00:00 to 06:00 on Saturday, June 15, 2024. During the maintenance period, the website and some services may be temporarily unavailable. We appreciate your understanding.',
          scheduleTitle: 'Maintenance Schedule:',
          schedule: 'Saturday, June 15, 2024, 00:00 ~ 06:00',
          p2: 'We will do our best to ensure that all services are available normally as soon as the maintenance is completed.',
          thanks: 'Thank you.',
          signature: 'XYZ Company',
        },

        newProduct2024: {
          title: '2024 New Product Launch Notice',
          greeting: 'Hello, valued customers.',
          p1: 'XYZ Company is pleased to announce the launch of the ABC model, featuring the latest technology, on July 1, 2024. This new product has achieved innovative changes in both performance and design, and we are confident it will provide the highest satisfaction to our customers.',
          featuresTitle: 'Key Features of the ABC Model:',
          feature1: 'Improved battery life',
          feature2: 'New design and various colors',
          feature3: 'Fast charging feature added',
          feature4: 'Application of cutting-edge sensor technology',
          p2: 'To commemorate the launch, we will hold a special discount event for a limited time. We ask for your interest and participation.',
          thanks: 'Thank you.',
          signature: 'XYZ Company',
        },

        preOrder: {
          title: 'New Product Launch and Pre-order Event Notice',
        },

        serviceMaintenance: {
          title: 'Regular Server Maintenance and Service Suspension Notice',
        },

        survey: {
          title: 'Customer Satisfaction Survey Participation Request and Prize Notice',
        },

        newService: {
          title: 'New Service Launch Event and Participation Method Notice',
        },
      },
    },

    // ========================================
    // РУССКИЙ
    // ========================================
    ru: {
      // Meta и RSS
      rss: {
        feed: 'Лента',
        commentsFeed: 'Лента комментариев',
      },

      // Навигация и меню
      nav: {
        researchDev: 'Исследования и разработка',
        development: 'Разработка',
        customerSupport: 'Поддержка клиентов',
        faq: 'FAQ',
        inquiry: 'Запросы',
        companyInfo: 'О компании',
        overview: 'Обзор',
        history: 'История',
      },

      // Категории
      categories: {
        gallery: 'Галерея',
        news: 'Новости',
        webzine: 'Веб-журнал',
      },

      // Общие элементы
      common: {
        by: 'Автор',
        author: 'Автор',
        authorOf: ' - статьи',
        noComments: 'Нет комментариев',
      },

      // Footer - Информация о компании
      footer: {
        companyName: 'Название компании',
        companyNameValue: 'DiagnoX',
        representative: 'Представитель',
        representativeValue: 'DePulse',
        address: 'Адрес',
        addressValue: 'Сеул, Чунгу, Седжон-даэро, 110',
        phone: 'Телефон',
        phoneValue: '1234-5678',
        businessNumber: 'Регистрационный номер',
        businessNumberValue: '000-12-34567',
        fax: 'Факс',
        faxValue: '012-435-6789',
      },

      // История компании (History)
      history: {
        title: 'Путь инноваций через гармонию здоровья и науки',
        intro1: 'Наша история - это не просто запись времени, а свидетельство преданности и страсти к созданию более здорового мира.',
        intro2: 'Узнайте о ценностях, которые создал Центр медицинских исследований через ключевые достижения и вехи.',

        period1: {
          title: 'Основание и развитие начальной инфраструктуры',
          item1Title: 'Основан Центр медицинских исследований',
          item1Desc: 'Основан с целью укрепления современного здоровья и профилактики заболеваний.',
          item2Title: 'Развитие инфраструктуры исследовательского центра',
          item2Desc: 'Завершение строительства основных лабораторий и инфраструктуры анализа данных.',
        },

        period2: {
          title: 'Исследовательские достижения и расширение глобального сотрудничества',
          item1Title: 'Присоединение к исследовательской сети ВОЗ',
          item1Desc: 'Участие в качестве ключевой исследовательской организации в проектах по профилактике хронических заболеваний.',
          item2Title: 'Запуск первого отечественного программного обеспечения для управления здоровьем',
          item2Desc: 'Разработка персонализированной платформы управления здоровьем на основе научных данных.',
        },

        period3: {
          title: 'Разработка платформы анализа данных о здоровье на основе ИИ',
          item1: 'Запуск решений для медицинского анализа с использованием больших данных.',
          item2: 'Презентация результатов исследований на крупных международных конференциях.',
        },

        period4: {
          title: 'Устойчивый рост и глобальное влияние',
          item1Title: 'Запуск проекта, связанного с Целями устойчивого развития ООН (ЦУР)',
          item1Desc: 'Начало исследований по устранению глобального неравенства в области здравоохранения.',
          item2Title: 'Расширение центра и ребрендинг',
          item2Desc: 'Объявление нового логотипа и видения, расширение исследовательских объектов.',
        },
      },

      // Overview (О компании)
      overview: {
        mainTitle: 'Мы разрушаем границы между медициной и технологиями, создавая новую парадигму инноваций в здравоохранении.',
        intro1: 'Основанная в 2010 году, мы являемся специализированным исследовательским учреждением, проводящим инновационные исследования и разработки для укрепления современного здоровья и профилактики заболеваний.',
        intro2: 'На основе новейших медицинских технологий и данных мы предоставляем решения для управления здоровьем и медицинские инсайты, способствуя повышению качества жизни людей через сотрудничество с глобальным медицинским и исследовательским сообществом.',

        message: {
          title: 'Наука для здоровой жизни, будущее для всех нас',
          greeting: 'Здравствуйте,',
          p1: 'Мы искренне благодарим вас за посещение Центра медицинских исследований.',
          p2: 'Наш центр посвящен повышению качества жизни современных людей через исследования для укрепления здоровья и профилактики заболеваний. В быстро меняющейся медицинской среде мы стремимся предоставлять практичные и устойчивые решения на основе научных данных и новейших технологий.',
          p3: 'Под девизом "Проектируем здоровую жизнь через науку" мы возглавляем инновации в глобальной области здравоохранения, представляя новые инсайты через исследования по профилактике различных хронических заболеваний, разработку персонализированных технологий управления здоровьем и анализ медицинских данных.',
          p4: 'Наши усилия не ограничиваются только исследованиями. На основе вашего доверия и сотрудничества мы стремимся стать партнером в создании более здорового завтра вместе. Мы продолжим делать все возможное для вашего здоровья и счастья с высочайшим профессионализмом и энтузиазмом.',
          thanks: 'Спасибо.',
        },

        ci: {
          title: 'Логотип, воплощающий видение и страсть к здоровью',
          description: 'CI нашего центра разработан для воплощения укрепления здоровья и перспективного видения. Символ и логотип представляют научный профессионализм, доверие и ценности, ориентированные на людей. Все элементы CI играют важную роль в поддержании идентичности нашего центра, поэтому, пожалуйста, используйте их в соответствии с рекомендациями.',
        },
      },

      // Projects / Portfolio
      projects: {
        title: 'Запечатлевая проектные площадки и моменты',
        intro1: 'Познакомьтесь с исследованиями и деятельностью Центра медицинских исследований через фотографии.',
        intro2: 'Вы можете визуально ощутить процесс инноваций, которые мы создаем.',

        table: {
          focus: 'Профилактика хронических заболеваний и решения для здоровья на основе ИИ',
          tech1: 'Алгоритмы машинного обучения,',
          tech2: 'Система обработки данных в реальном времени',
          location1: 'Инновационный центр здравоохранения (сертификат ISO 13485)',
          service: 'Персонализированная платформа здоровья и цифровая терапия',
          location2: 'Глобальный научный парк здравоохранения, Бостон, Массачусетс',
        },

        case1: {
          title: 'Медицинское учреждение',
          problem: 'Крупная больница столкнулась с увеличением числа пациентов с хроническими заболеваниями и признала необходимость точных прогнозов.',
          solution: 'Для повышения эффективности диагностики на основе данных они внедрили нашу систему прогнозирования здоровья на основе ИИ.',
        },

        case2: {
          title: 'Исследовательский институт',
          problem: 'Исследовательский институт, испытывающий трудности с обработкой огромных объемов биологических данных в процессе разработки лекарств, принял нашу технологию для повышения точности и скорости анализа данных.',
        },

        case3: {
          title: 'Управление личным здоровьем',
          problem: 'Страховая компания запланировала персонализированное приложение для управления здоровьем, чтобы поддержать улучшение здоровья клиентов и снизить медицинские расходы в долгосрочной перспективе.',
        },
      },

      // Новости и статьи
      news: {
        officeRelocation: {
          title: 'Уведомление о переезде головного офиса',
          greeting: 'Здравствуйте, уважаемые клиенты.',
          p1: 'Компания XYZ переезжает в новое место для предоставления лучших услуг и улучшения рабочей среды. Мы встретим вас в более современном облике в нашем новом офисе.',
          addressTitle: 'Новый адрес:',
          address: '10-й этаж, здание ABC, 123 Тэхэран-ро, Каннам-гу, Сеул',
          scheduleTitle: 'График переезда:',
          schedule: 'Мы начнем работу по новому адресу с четверга, 1 августа 2024 года.',
          p2: 'Существующие номера телефонов и адреса электронной почты остаются без изменений. Приносим извинения за любые неудобства, вызванные переездом головного офиса, и просим вашей постоянной поддержки.',
          thanks: 'Спасибо.',
          signature: 'Компания XYZ',
        },

        holidayShipping: {
          title: 'Уведомление о графике доставки на праздник Чусок',
          greeting: 'Здравствуйте, уважаемые клиенты.',
          p1: 'Мы хотели бы сообщить вам о графике доставки на предстоящий праздник Чусок. Доставка может быть задержана во время праздников, поэтому при размещении заказов обращайтесь к графику ниже.',
          scheduleTitle: 'График доставки:',
          schedule1: 'Последняя доставка перед Чусоком: среда, 25 сентября 2024 года',
          schedule2: 'Возобновление доставки после Чусока: среда, 2 октября 2024 года',
          p2: 'Служба поддержки клиентов также будет временно приостановлена во время праздников. Если у вас есть вопросы, пожалуйста, оставьте их по электронной почте, и мы оперативно ответим после праздников.',
          wishes: 'Желаем вам обильного Чусока.',
          thanks: 'Спасибо.',
          signature: 'Компания XYZ',
        },

        serverMaintenance: {
          title: 'Уведомление о регулярном обслуживании сервера (15 июня 2024 года)',
          greeting: 'Здравствуйте, уважаемые клиенты.',
          p1: 'Для предоставления лучшего сервиса мы проведем регулярное обслуживание сервера с 00:00 до 06:00 в субботу, 15 июня 2024 года. Во время обслуживания веб-сайт и некоторые сервисы могут быть временно недоступны. Благодарим за понимание.',
          scheduleTitle: 'График обслуживания:',
          schedule: 'Суббота, 15 июня 2024 года, 00:00 ~ 06:00',
          p2: 'Мы сделаем все возможное, чтобы все сервисы были доступны в обычном режиме сразу после завершения обслуживания.',
          thanks: 'Спасибо.',
          signature: 'Компания XYZ',
        },

        newProduct2024: {
          title: 'Уведомление о запуске нового продукта в 2024 году',
          greeting: 'Здравствуйте, уважаемые клиенты.',
          p1: 'Компания XYZ рада сообщить о запуске модели ABC с новейшими технологиями 1 июля 2024 года. Этот новый продукт достиг инновационных изменений как в производительности, так и в дизайне, и мы уверены, что он обеспечит высочайшее удовлетворение наших клиентов.',
          featuresTitle: 'Основные характеристики модели ABC:',
          feature1: 'Улучшенный срок службы батареи',
          feature2: 'Новый дизайн и различные цвета',
          feature3: 'Добавлена функция быстрой зарядки',
          feature4: 'Применение передовой сенсорной технологии',
          p2: 'В честь запуска мы проведем специальную акцию со скидкой на ограниченное время. Просим вашего интереса и участия.',
          thanks: 'Спасибо.',
          signature: 'Компания XYZ',
        },

        preOrder: {
          title: 'Уведомление о запуске нового продукта и мероприятии по предварительному заказу',
        },

        serviceMaintenance: {
          title: 'Уведомление о регулярном обслуживании сервера и приостановке сервиса',
        },

        survey: {
          title: 'Запрос на участие в опросе по повышению удовлетворенности клиентов и уведомление о призах',
        },

        newService: {
          title: 'Уведомление о мероприятии по запуску нового сервиса и методах участия',
        },
      },
    },
  },

  // Функция для получения текста на текущем языке
  t: function(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];

    for (let k of keys) {
      if (value && value.hasOwnProperty(k)) {
        value = value[k];
      } else {
        console.warn(`Translation key "${key}" not found for language "${this.currentLanguage}"`);
        return key;
      }
    }

    return value;
  },

  // Функция для смены языка
  setLanguage: function(lang) {
    if (this.translations.hasOwnProperty(lang)) {
      this.currentLanguage = lang;
      console.log(`Language changed to: ${lang}`);
      return true;
    } else {
      console.error(`Language "${lang}" is not supported`);
      return false;
    }
  },

  // Функция для получения всех доступных языков
  getAvailableLanguages: function() {
    return Object.keys(this.translations);
  }
};

// Экспорт для использования в других модулях (если используется ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = i18n;
}
