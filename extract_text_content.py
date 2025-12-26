#!/usr/bin/env python3
"""
Extract visible text content from HTML files
"""
import os
import re
import json
from html.parser import HTMLParser
from pathlib import Path
from collections import defaultdict

class TextExtractor(HTMLParser):
    """Extract visible text content from HTML"""

    # Tags to skip (no visible content)
    SKIP_TAGS = {'script', 'style', 'head', 'meta', 'link', 'noscript'}

    # Attributes that contain user-visible text
    TEXT_ATTRIBUTES = {'placeholder', 'alt', 'title', 'aria-label', 'aria-placeholder',
                      'data-title', 'value'}

    def __init__(self):
        super().__init__()
        self.texts = []
        self.current_tag = None
        self.skip_content = False

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        if tag in self.SKIP_TAGS:
            self.skip_content = True
            return

        # Extract text from attributes
        for attr_name, attr_value in attrs:
            if attr_name in self.TEXT_ATTRIBUTES and attr_value:
                # Clean up attribute value
                cleaned = self.clean_text(attr_value)
                if cleaned and not self.is_technical(cleaned):
                    self.texts.append({
                        'text': cleaned,
                        'type': f'attribute:{attr_name}',
                        'tag': tag
                    })

    def handle_endtag(self, tag):
        if tag in self.SKIP_TAGS:
            self.skip_content = False
        self.current_tag = None

    def handle_data(self, data):
        if self.skip_content or not data:
            return

        # Clean and validate text
        cleaned = self.clean_text(data)
        if cleaned and not self.is_technical(cleaned):
            self.texts.append({
                'text': cleaned,
                'type': 'content',
                'tag': self.current_tag
            })

    @staticmethod
    def clean_text(text):
        """Clean and normalize text"""
        if not text:
            return None

        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text.strip())

        # Skip empty or whitespace-only
        if not text or text.isspace():
            return None

        return text

    @staticmethod
    def is_technical(text):
        """Check if text is technical (URL, file path, etc.)"""
        if not text:
            return True

        # Skip very short strings (likely technical)
        if len(text) < 2:
            return True

        # Skip URLs
        if re.match(r'^https?://', text):
            return True

        # Skip file paths
        if re.match(r'^[./].*\.(css|js|jpg|png|gif|svg|woff|ttf|eot)', text, re.I):
            return True

        # Skip class-like or ID-like strings
        if re.match(r'^[a-z0-9_-]+$', text) and '-' in text:
            return True

        # Skip CSS/JS code patterns
        if re.search(r'[{}();:]', text) and len(text) < 50:
            return True

        return False


def extract_from_html_file(file_path):
    """Extract text content from a single HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        parser = TextExtractor()
        parser.feed(content)

        return parser.texts
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return []


def main():
    """Main function to extract text from all HTML files"""
    project_root = Path('/Users/meditor/Projects/healthcare-web')

    # Find all HTML files
    html_files = list(project_root.glob('**/*.html'))
    print(f"Found {len(html_files)} HTML files\n")

    # Storage for all texts
    all_texts = []
    unique_texts = set()
    texts_by_type = defaultdict(set)
    file_texts = {}

    # Process each file
    for html_file in html_files:
        relative_path = html_file.relative_to(project_root)
        texts = extract_from_html_file(html_file)

        if texts:
            file_texts[str(relative_path)] = texts

        for item in texts:
            text = item['text']
            all_texts.append(item)
            unique_texts.add(text)
            texts_by_type[item['type']].add(text)

    # Generate report
    print("=" * 80)
    print("TEXT EXTRACTION REPORT")
    print("=" * 80)
    print(f"\nTotal HTML files processed: {len(html_files)}")
    print(f"Total text items found: {len(all_texts)}")
    print(f"Unique text strings: {len(unique_texts)}")

    print(f"\n\nBREAKDOWN BY TYPE:")
    print("-" * 80)
    for text_type, texts in sorted(texts_by_type.items()):
        print(f"{text_type:30} {len(texts):6} unique strings")

    # Generate unique texts sorted alphabetically
    print(f"\n\nUNIQUE TEXT STRINGS (sorted alphabetically):")
    print("=" * 80)
    for i, text in enumerate(sorted(unique_texts), 1):
        # Truncate long strings for display
        display_text = text if len(text) <= 100 else text[:97] + "..."
        print(f"{i:4}. {display_text}")

    # Prepare data structure for internationalization
    i18n_structure = {
        'metadata': {
            'extracted_at': '2025-12-23',
            'total_files': len(html_files),
            'total_strings': len(unique_texts),
            'project': 'healthcare-web'
        },
        'strings': {}
    }

    # Create keys from text
    for text in sorted(unique_texts):
        # Generate a key (simple version - can be improved)
        key = re.sub(r'[^a-zA-Z0-9]+', '_', text.lower())[:50].strip('_')

        # Handle duplicates
        original_key = key
        counter = 1
        while key in i18n_structure['strings']:
            key = f"{original_key}_{counter}"
            counter += 1

        i18n_structure['strings'][key] = text

    # Save to JSON file
    output_file = project_root / 'extracted_text_content.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(i18n_structure, f, ensure_ascii=False, indent=2)

    print(f"\n\nJSON output saved to: {output_file}")

    # Also create a simpler key-value structure
    simple_structure = {key: value for key, value in sorted(i18n_structure['strings'].items())}

    simple_output_file = project_root / 'text_strings.json'
    with open(simple_output_file, 'w', encoding='utf-8') as f:
        json.dump(simple_structure, f, ensure_ascii=False, indent=2)

    print(f"Simple strings JSON saved to: {simple_output_file}")

    # Create JavaScript/TypeScript version
    js_output_file = project_root / 'text_strings.js'
    with open(js_output_file, 'w', encoding='utf-8') as f:
        f.write("// Auto-generated text strings from HTML files\n")
        f.write("// Generated on 2025-12-23\n\n")
        f.write("export const TEXT_STRINGS = ")
        json.dump(simple_structure, f, ensure_ascii=False, indent=2)
        f.write(";\n\n")
        f.write("export default TEXT_STRINGS;\n")

    print(f"JavaScript version saved to: {js_output_file}")

    print("\n" + "=" * 80)
    print("EXTRACTION COMPLETE!")
    print("=" * 80)


if __name__ == '__main__':
    main()
