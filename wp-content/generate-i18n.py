#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Генератор полного i18n.js файла на основе extracted-texts.json
Автоматически создает структурированный файл переводов
"""

import json
import re
from pathlib import Path

def load_extracted_texts():
    """Загрузка извлеченных текстов из JSON"""
    with open('extracted-texts.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def create_key_from_text(text, category):
    """Создание ключа из текста"""
    # Удаляем специальные символы и создаем camelCase ключ
    # Для корейского текста используем транслитерацию или порядковый номер
    key = re.sub(r'[^\w\s가-힣]', '', text)
    key = key.strip()

    # Если текст слишком длинный, берем первые слова
    words = key.split()
    if len(words) > 5:
        key = ' '.join(words[:5])

    # Создаем уникальный ключ
    return key[:50]  # Ограничиваем длину

def categorize_text(text, context, files):
    """Категоризация текста по контексту и файлам"""
    # Определяем категорию на основе контекста и путей файлов

    # Footer
    if any('footer' in str(f).lower() for f in files):
        return 'footer'

    # Navigation
    if context in ['nav', 'menu'] or any('nav' in str(f).lower() for f in files):
        return 'nav'

    # History page
    if any('history' in str(f).lower() for f in files):
        return 'history'

    # Overview/Intro page
    if any(('intro' in str(f).lower() or 'overview' in str(f).lower()) for f in files):
        return 'overview'

    # Projects/Portfolio
    if any(('portfolio' in str(f).lower() or 'project' in str(f).lower()) for f in files):
        return 'projects'

    # FAQ
    if any('faq' in str(f).lower() for f in files):
        return 'faq'

    # Location
    if any('location' in str(f).lower() for f in files):
        return 'location'

    # Research/Development
    if any(('research' in str(f).lower() or 'development' in str(f).lower()) for f in files):
        return 'research'

    # News
    if any('news' in str(f).lower() for f in files):
        return 'news'

    # Gallery
    if any('gallery' in str(f).lower() for f in files):
        return 'gallery'

    # Contact/Inquiry
    if any(('contact' in str(f).lower() or 'inquiry' in str(f).lower()) for f in files):
        return 'contact'

    # По типу контекста
    if context == 'title':
        return 'pageTitles'
    elif context in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
        return 'headings'
    elif context == 'p':
        return 'content'
    elif context == 'a':
        return 'links'
    elif context == 'button':
        return 'buttons'

    return 'common'

def generate_js_object(data, indent=2):
    """Генерация JavaScript объекта из Python словаря"""
    def format_value(v, level=0):
        ind = ' ' * (indent * level)
        next_ind = ' ' * (indent * (level + 1))

        if isinstance(v, dict):
            if not v:
                return '{}'
            items = []
            for key, val in v.items():
                # Экранируем ключ если нужно
                if re.match(r'^[a-zA-Z_$][a-zA-Z0-9_$]*$', key):
                    formatted_key = key
                else:
                    formatted_key = f"'{key}'"
                items.append(f"{next_ind}{formatted_key}: {format_value(val, level + 1)}")
            return '{\n' + ',\n'.join(items) + f'\n{ind}}}'
        elif isinstance(v, str):
            # Экранируем специальные символы
            v = v.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n').replace('\r', '\\r')
            return f"'{v}'"
        elif isinstance(v, (int, float)):
            return str(v)
        elif isinstance(v, bool):
            return 'true' if v else 'false'
        elif v is None:
            return 'null'
        elif isinstance(v, list):
            if not v:
                return '[]'
            items = [f"{next_ind}{format_value(item, level + 1)}" for item in v]
            return '[\n' + ',\n'.join(items) + f'\n{ind}]'
        else:
            return str(v)

    return format_value(data)

def main():
    print("🚀 Загрузка извлеченных текстов...")
    data = load_extracted_texts()

    # Структура для i18n
    i18n_structure = {
        'ko': {},
        'en': {},
        'ru': {}
    }

    # Счетчики
    total_texts = 0
    categorized = {}

    print("\n📊 Обработка корейских текстов...")
    korean_data = data.get('korean', {})

    for text_type, texts in korean_data.items():
        print(f"  - {text_type}: {len(texts)} записей")

        for item in texts:
            text = item['text']
            context = item['context']
            files = item['files']

            # Определяем категорию
            category = categorize_text(text, context, files)

            # Инициализируем категорию если нужно
            if category not in i18n_structure['ko']:
                i18n_structure['ko'][category] = {}
                categorized[category] = 0

            # Создаем уникальный ключ
            base_key = f"text{categorized[category] + 1}"
            categorized[category] += 1

            # Добавляем текст
            i18n_structure['ko'][category][base_key] = text

            # Для английского и русского пока оставляем заглушки
            if category not in i18n_structure['en']:
                i18n_structure['en'][category] = {}
            if category not in i18n_structure['ru']:
                i18n_structure['ru'][category] = {}

            i18n_structure['en'][category][base_key] = f"[EN] {text}"
            i18n_structure['ru'][category][base_key] = f"[RU] {text}"

            total_texts += 1

    print(f"\n✅ Обработано {total_texts} текстов")
    print("\n📁 Распределение по категориям:")
    for cat, count in sorted(categorized.items()):
        print(f"  - {cat}: {count} текстов")

    # Генерация JavaScript файла
    print("\n📝 Генерация i18n-full.js...")

    js_content = f"""// Auto-generated i18n file
// Generated from extracted-texts.json
// Total texts: {total_texts}

const i18nFull = {{
  currentLanguage: 'ko',

  translations: {generate_js_object(i18n_structure)},

  // Функция для получения текста
  t: function(key) {{
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];

    for (let k of keys) {{
      if (value && value.hasOwnProperty(k)) {{
        value = value[k];
      }} else {{
        console.warn(`Translation key "${{key}}" not found for language "${{this.currentLanguage}}"`);
        return key;
      }}
    }}

    return value;
  }},

  // Функция для смены языка
  setLanguage: function(lang) {{
    if (this.translations.hasOwnProperty(lang)) {{
      this.currentLanguage = lang;
      return true;
    }}
    return false;
  }},

  // Получить список категорий
  getCategories: function(lang = this.currentLanguage) {{
    return Object.keys(this.translations[lang] || {{}});
  }},

  // Получить все тексты категории
  getCategoryTexts: function(category, lang = this.currentLanguage) {{
    return this.translations[lang]?.[category] || {{}};
  }},

  // Статистика
  getStats: function() {{
    const stats = {{}};
    for (const lang in this.translations) {{
      stats[lang] = {{}};
      for (const category in this.translations[lang]) {{
        stats[lang][category] = Object.keys(this.translations[lang][category]).length;
      }}
    }}
    return stats;
  }}
}};

// Export
if (typeof module !== 'undefined' && module.exports) {{
  module.exports = i18nFull;
}}
"""

    # Сохранение файла
    output_file = 'i18n-full.js'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"\n✅ Файл сохранен: {output_file}")
    print(f"📊 Размер файла: {len(js_content) / 1024:.2f} KB")

    # Статистика
    print("\n📈 Статистика по языкам:")
    for lang in ['ko', 'en', 'ru']:
        total = sum(len(v) for v in i18n_structure[lang].values())
        print(f"  - {lang}: {total} текстов в {len(i18n_structure[lang])} категориях")

if __name__ == '__main__':
    main()
