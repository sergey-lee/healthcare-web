#!/usr/bin/env python3
"""
Replace hardcoded strings in HTML files with data-i18n attributes (Version 2)
Preserves HTML formatting and styles
"""

import os
import json
import re
from pathlib import Path
from bs4 import BeautifulSoup
import html as html_lib

# Загрузка JSON с переводами
def load_i18n_json():
    """Загрузить структуру переводов из JSON"""
    json_path = Path(__file__).parent / 'i18n_categorized.json'

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    return data.get('strings', {})

# Создание плоского словаря для поиска
def flatten_dict(d, parent_key='', sep='.'):
    """Преобразовать вложенный словарь в плоский"""
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

# Создание обратного словаря (текст -> ключ)
def create_reverse_map(flat_dict):
    """Создать словарь для быстрого поиска ключа по тексту"""
    reverse_map = {}

    for key, value in flat_dict.items():
        if isinstance(value, str) and value.strip():
            # Нормализуем текст для поиска
            normalized = value.strip()
            reverse_map[normalized] = key

    return reverse_map

# Очистка текста для сравнения
def normalize_text(text):
    """Нормализовать текст для сравнения"""
    if not text:
        return ""

    # Убрать лишние пробелы
    text = ' '.join(text.split())
    # Убрать HTML entities
    text = html_lib.unescape(text)

    return text.strip()

# Обработка одного HTML файла с сохранением форматирования
def process_html_file(file_path, reverse_map, dry_run=False):
    """Обработать один HTML файл с сохранением оригинального форматирования"""
    print(f"\n{'[DRY RUN] ' if dry_run else ''}Processing: {file_path}")

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original_content = f.read()

        # Используем lxml парсер для лучшего сохранения структуры
        soup = BeautifulSoup(original_content, 'lxml')

        processed_count = 0

        # Обработка всех элементов
        for element in soup.find_all():
            if not hasattr(element, 'name') or element.name is None:
                continue

            # Пропускаем script и style теги
            if element.name in ['script', 'style', 'noscript']:
                continue

            # Обработка атрибутов
            if hasattr(element, 'has_attr'):
                # placeholder
                if element.has_attr('placeholder'):
                    placeholder = normalize_text(element['placeholder'])
                    if placeholder in reverse_map and not element.has_attr('data-i18n-placeholder'):
                        element['data-i18n-placeholder'] = reverse_map[placeholder]
                        processed_count += 1
                        print(f"  [placeholder] {placeholder[:50]} -> {reverse_map[placeholder]}")

                # title
                if element.has_attr('title'):
                    title = normalize_text(element['title'])
                    if title in reverse_map and not element.has_attr('data-i18n-title'):
                        element['data-i18n-title'] = reverse_map[title]
                        processed_count += 1
                        print(f"  [title] {title[:50]} -> {reverse_map[title]}")

                # alt для изображений
                if element.name == 'img' and element.has_attr('alt'):
                    alt = normalize_text(element['alt'])
                    if alt in reverse_map and not element.has_attr('data-i18n-alt'):
                        element['data-i18n-alt'] = reverse_map[alt]
                        processed_count += 1
                        print(f"  [alt] {alt[:50]} -> {reverse_map[alt]}")

                # aria-label
                if element.has_attr('aria-label'):
                    aria = normalize_text(element['aria-label'])
                    if aria in reverse_map and not element.has_attr('data-i18n-aria'):
                        element['data-i18n-aria'] = reverse_map[aria]
                        processed_count += 1
                        print(f"  [aria-label] {aria[:50]} -> {reverse_map[aria]}")

            # Обработка текстового контента (только прямой текст)
            if element.string and element.string.strip():
                text = normalize_text(element.string)

                if text in reverse_map and not element.has_attr('data-i18n'):
                    element['data-i18n'] = reverse_map[text]
                    processed_count += 1
                    print(f"  [text] {text[:50]} -> {reverse_map[text]}")

        if processed_count > 0:
            print(f"  ✓ Replaced {processed_count} strings")

            if not dry_run:
                # КРИТИЧЕСКИ ВАЖНО: используем formatter=None для сохранения форматирования
                modified_html = str(soup.prettify(formatter=None))

                # Удаляем добавленные lxml теги <html> и <body>, если их не было
                if not original_content.strip().startswith('<!DOCTYPE html>'):
                    # Восстанавливаем оригинальную структуру
                    modified_html = str(soup)

                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(modified_html)
                print(f"  ✓ Saved changes to {file_path}")
        else:
            print(f"  - No matches found")

        return processed_count

    except Exception as e:
        print(f"  ✗ Error processing {file_path}: {e}")
        import traceback
        traceback.print_exc()
        return 0

# Основная функция
def main():
    """Главная функция"""
    import argparse

    parser = argparse.ArgumentParser(description='Replace hardcoded strings with data-i18n attributes (v2 - preserves formatting)')
    parser.add_argument('--dry-run', action='store_true', help='Preview changes without modifying files')
    parser.add_argument('--limit', type=int, help='Limit number of files to process (for testing)')
    parser.add_argument('--restore', action='store_true', help='Restore original files from .backup')
    args = parser.parse_args()

    if args.restore:
        print("Restoring original files from backups...")
        root_dir = Path(__file__).parent
        backup_files = list(root_dir.glob('**/*.html.backup'))

        for backup_file in backup_files:
            original_file = backup_file.with_suffix('')
            if backup_file.exists():
                import shutil
                shutil.copy2(backup_file, original_file)
                print(f"  ✓ Restored {original_file}")

        print(f"\n✓ Restored {len(backup_files)} files")
        return

    print("=" * 60)
    print("Healthcare Web - String Replacement Tool v2")
    print("(Preserves HTML formatting and styles)")
    print("=" * 60)

    # Загрузка переводов
    print("\n1. Loading translations from i18n_categorized.json...")
    i18n_strings = load_i18n_json()
    flat_dict = flatten_dict(i18n_strings)
    reverse_map = create_reverse_map(flat_dict)

    print(f"   ✓ Loaded {len(flat_dict)} translation keys")
    print(f"   ✓ Created reverse map with {len(reverse_map)} unique strings")

    # Поиск всех HTML файлов
    print("\n2. Finding HTML files...")
    root_dir = Path(__file__).parent
    html_files = list(root_dir.glob('**/*.html'))

    # Исключаем некоторые директории
    excluded_dirs = {'wp-includes', 'wp-admin', 'node_modules', '.git'}
    html_files = [
        f for f in html_files
        if not any(excluded in f.parts for excluded in excluded_dirs)
    ]

    if args.limit:
        html_files = html_files[:args.limit]

    print(f"   ✓ Found {len(html_files)} HTML files to process")

    # Создаем бэкапы перед изменением
    if not args.dry_run:
        print("\n3. Creating backups...")
        for html_file in html_files:
            backup_file = html_file.with_suffix('.html.backup')
            if not backup_file.exists():
                import shutil
                shutil.copy2(html_file, backup_file)
        print(f"   ✓ Created {len(html_files)} backup files")

    # Обработка файлов
    print(f"\n4. {'Preview mode' if args.dry_run else 'Processing files'}...")

    total_replacements = 0
    processed_files = 0

    for html_file in html_files:
        count = process_html_file(html_file, reverse_map, dry_run=args.dry_run)
        if count > 0:
            total_replacements += count
            processed_files += 1

    # Итоги
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Total files processed: {len(html_files)}")
    print(f"Files with replacements: {processed_files}")
    print(f"Total string replacements: {total_replacements}")

    if args.dry_run:
        print("\n⚠️  DRY RUN MODE - No files were modified")
        print("Run without --dry-run to apply changes")
    else:
        print("\n✓ All changes saved successfully!")
        print("\nBackup files created with .backup extension")
        print("To restore: python3 replace_hardcoded_strings_v2.py --restore")
        print("\nNext steps:")
        print("1. Test the pages in a browser")
        print("2. If styles are broken, run: python3 replace_hardcoded_strings_v2.py --restore")
        print("3. If everything works, commit changes to git")

if __name__ == '__main__':
    main()
