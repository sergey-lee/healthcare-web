#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Детальный анализ всех текстов проекта
Создает структурированный каталог с категоризацией
"""

import json
from collections import defaultdict

def load_data():
    """Загрузка извлеченных данных"""
    with open('extracted-texts.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def analyze_korean_texts(data):
    """Детальный анализ корейских текстов"""
    korean = data.get('korean', {})

    catalog = {
        'navigation': [],
        'footer': [],
        'history': [],
        'overview': [],
        'projects': [],
        'faq': [],
        'location': [],
        'research': [],
        'news': [],
        'gallery': [],
        'contact': [],
        'buttons': [],
        'forms': [],
        'meta': [],
        'uncategorized': []
    }

    # Ключевые слова для категоризации
    keywords = {
        'navigation': ['연구및개발', '고객지원', '회사소개', 'FAQ', 'Inquiry', 'Overview', 'History', 'Development'],
        'footer': ['상호', '대표명', '주소', '전화번호', '사업자등록번호', '팩스', '디펄스', 'DiagnoX'],
        'history': ['설립', '연구성과', '글로벌 협력', 'AI 기반', '지속 가능', '건강의학연구센터 설립', '인프라 구축'],
        'overview': ['의료와 기술', '건강 혁신', '건강한 삶', '비전', '로고', '건강의학연구센터를 찾아주신'],
        'projects': ['Project', '의료기관', '연구소', '개인 건강 관리', '머신러닝', '데이터 처리', '헬스테크'],
        'faq': ['질문', '답변', 'FAQ', '자주 묻는'],
        'location': ['본사', '연구소 안내', '위치', '주소', '오시는 길'],
        'research': ['연구', '개발', 'R&D', '기술', '혁신', '데이터 분석'],
        'news': ['신제품 출시', '본사 이전', '추석 연휴', '서버 점검', '이벤트', '안내'],
        'gallery': ['갤러리', '사진', '이미지'],
        'contact': ['문의', '연락', '이메일', '전화'],
        'buttons': ['검색', '제출', '보내기', '확인'],
        'forms': ['이름', '전화', '이메일', '메시지', '내용'],
    }

    # Обработка всех типов текстов
    for text_type, texts in korean.items():
        for item in texts:
            text = item['text']
            context = item['context']
            files = item['files']

            # Определяем категорию
            category = 'uncategorized'

            # Проверяем по ключевым словам
            for cat, words in keywords.items():
                if any(word in text for word in words):
                    category = cat
                    break

            # Проверяем по путям файлов
            if category == 'uncategorized':
                file_str = ' '.join(str(f) for f in files).lower()
                if 'history' in file_str:
                    category = 'history'
                elif 'intro' in file_str or 'overview' in file_str:
                    category = 'overview'
                elif 'portfolio' in file_str or 'project' in file_str:
                    category = 'projects'
                elif 'faq' in file_str:
                    category = 'faq'
                elif 'location' in file_str:
                    category = 'location'
                elif 'research' in file_str or 'development' in file_str:
                    category = 'research'
                elif 'news' in file_str or 'post-news' in file_str:
                    category = 'news'
                elif 'gallery' in file_str:
                    category = 'gallery'
                elif 'contact' in file_str or 'inquiry' in file_str:
                    category = 'contact'

            # Специальная обработка для footer
            if len(files) > 50:  # Если текст встречается в большинстве файлов
                category = 'footer'

            # Добавляем в каталог
            catalog[category].append({
                'text': text,
                'type': text_type,
                'context': context,
                'count': len(files),
                'files': files[:3]  # Только первые 3 файла для примера
            })

    return catalog

def generate_markdown_report(catalog, korean_data):
    """Генерация отчета в формате Markdown"""

    report = """# Полный каталог текстов проекта Healthcare Web

## Общая статистика

"""

    # Подсчет статистики
    total = 0
    for cat, items in catalog.items():
        count = len(items)
        total += count
        if count > 0:
            report += f"- **{cat.upper()}**: {count} текстов\n"

    report += f"\n**ВСЕГО**: {total} уникальных корейских текстов\n\n"
    report += "---\n\n"

    # Детальный каталог по категориям
    for category, items in catalog.items():
        if not items:
            continue

        report += f"## {category.upper()}\n\n"
        report += f"Всего текстов: {len(items)}\n\n"

        # Группируем по типу
        by_type = defaultdict(list)
        for item in items:
            by_type[item['type']].append(item)

        for text_type, type_items in sorted(by_type.items()):
            report += f"### {text_type.capitalize()}\n\n"

            for item in type_items:
                report += f"#### `{item['text'][:100]}{'...' if len(item['text']) > 100 else ''}`\n\n"
                report += f"- **Контекст**: `{item['context']}`\n"
                report += f"- **Встречается**: {item['count']} раз\n"
                report += f"- **Примеры файлов**:\n"
                for f in item['files']:
                    filename = f.split('/')[-1]
                    report += f"  - {filename}\n"
                report += "\n"

        report += "---\n\n"

    return report

def generate_csv_catalog(catalog):
    """Генерация каталога в формате CSV"""
    csv_lines = ["Category,Type,Text,Context,Count,Example Files"]

    for category, items in catalog.items():
        for item in items:
            text = item['text'].replace('"', '""')  # Escape quotes
            files = '; '.join(f.split('/')[-1] for f in item['files'])
            csv_lines.append(f'"{category}","{item["type"]}","{text}","{item["context"]}",{item["count"]},"{files}"')

    return '\n'.join(csv_lines)

def main():
    print("📚 Загрузка данных...")
    data = load_data()

    print("🔍 Анализ корейских текстов...")
    catalog = analyze_korean_texts(data)

    # Статистика
    print("\n📊 Статистика по категориям:")
    total = 0
    for cat, items in sorted(catalog.items()):
        count = len(items)
        total += count
        if count > 0:
            print(f"  {cat:20} : {count:3} текстов")

    print(f"\n  {'ВСЕГО':20} : {total:3} текстов")

    # Генерация отчета в Markdown
    print("\n📝 Генерация Markdown отчета...")
    korean_data = data.get('korean', {})
    markdown_report = generate_markdown_report(catalog, korean_data)

    with open('texts-catalog.md', 'w', encoding='utf-8') as f:
        f.write(markdown_report)

    print(f"✅ Markdown отчет сохранен: texts-catalog.md")

    # Генерация CSV каталога
    print("📊 Генерация CSV каталога...")
    csv_catalog = generate_csv_catalog(catalog)

    with open('texts-catalog.csv', 'w', encoding='utf-8') as f:
        f.write(csv_catalog)

    print(f"✅ CSV каталог сохранен: texts-catalog.csv")

    # Сохранение структурированного JSON
    print("💾 Сохранение структурированного JSON...")
    with open('texts-catalog.json', 'w', encoding='utf-8') as f:
        json.dump(catalog, f, ensure_ascii=False, indent=2)

    print(f"✅ JSON каталог сохранен: texts-catalog.json")

    print("\n✨ Анализ завершен!")
    print(f"\nСоздано 3 файла:")
    print(f"  - texts-catalog.md   (Markdown отчет)")
    print(f"  - texts-catalog.csv  (CSV таблица)")
    print(f"  - texts-catalog.json (JSON структура)")

if __name__ == '__main__':
    main()
