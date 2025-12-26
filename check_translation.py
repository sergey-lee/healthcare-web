#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import re

def has_korean(text):
    """Check if text contains Korean characters"""
    return bool(re.search(r'[\uac00-\ud7a3]', str(text)))

def check_file(filename):
    """Check a JSON file for Korean text in VALUES only"""
    print(f'\n{"="*80}')
    print(f'📁 Проверка файла: {filename}')
    print(f'{"="*80}')

    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)

    korean_values_found = []
    total_values = 0

    def check_recursive(obj, path=''):
        nonlocal total_values

        if isinstance(obj, dict):
            for key, value in obj.items():
                new_path = f'{path}.{key}' if path else key
                check_recursive(value, new_path)
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                check_recursive(item, f'{path}[{i}]')
        elif isinstance(obj, str):
            total_values += 1
            if has_korean(obj):
                korean_values_found.append({
                    'path': path,
                    'value': obj[:100] + ('...' if len(obj) > 100 else '')
                })

    check_recursive(data)

    print(f'\n📊 Статистика:')
    print(f'   Всего значений (строк): {total_values}')
    print(f'   Значений с корейским: {len(korean_values_found)}')

    if korean_values_found:
        print(f'\n❌ НАЙДЕНЫ НЕПЕРЕВЕДЕННЫЕ ЗНАЧЕНИЯ ({len(korean_values_found)}):\n')
        for i, item in enumerate(korean_values_found[:10], 1):
            print(f'{i}. Путь: {item["path"]}')
            print(f'   Значение: "{item["value"]}"')
            print()

        if len(korean_values_found) > 10:
            print(f'   ... и еще {len(korean_values_found) - 10} строк')
    else:
        print(f'\n✅ ВСЕ ЗНАЧЕНИЯ ПЕРЕВЕДЕНЫ НА АНГЛИЙСКИЙ!')

    return len(korean_values_found)

if __name__ == '__main__':
    print('🔍 ПРОВЕРКА ПЕРЕВОДА i18n ФАЙЛОВ')
    print('Проверяем ТОЛЬКО значения (правая часть JSON), ключи игнорируем\n')

    files = [
        'i18n_categorized.json',
        'i18n_flat.json',
        'text_strings.json'
    ]

    total_korean = 0
    for filename in files:
        try:
            korean_count = check_file(filename)
            total_korean += korean_count
        except Exception as e:
            print(f'❌ Ошибка при проверке {filename}: {e}')

    print(f'\n{"="*80}')
    print(f'🎯 ИТОГО: {total_korean} значений с корейским текстом')
    if total_korean == 0:
        print('✅ ВСЕ ФАЙЛЫ ПОЛНОСТЬЮ ПЕРЕВЕДЕНЫ!')
    else:
        print('❌ ТРЕБУЕТСЯ ДОПОЛНИТЕЛЬНЫЙ ПЕРЕВОД!')
    print(f'{"="*80}')
