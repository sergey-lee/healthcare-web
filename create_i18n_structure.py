#!/usr/bin/env python3
"""
Create improved i18n structure with categorized strings
"""
import json
import re

def load_extracted_strings():
    """Load the extracted strings from JSON"""
    with open('/Users/meditor/Projects/healthcare-web/text_strings.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def categorize_string(text):
    """Categorize string based on content"""

    # Email
    if '@' in text and re.match(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text):
        return 'contact'

    # Phone number
    if re.search(r'[\d\-+()]{8,}', text) and any(c.isdigit() for c in text):
        return 'contact'

    # Address
    if any(keyword in text for keyword in ['street', 'city', '주소', '시', '구', '도', '빌딩', '층']):
        return 'contact'

    # Dates
    if re.search(r'\d{4}년', text) or re.search(r'\d{2}월', text):
        return 'dates'

    # Navigation/Menu
    if text.upper() in ['ABOUT', 'CONTACT', 'FAQ', 'NEWS', 'GALLERY', 'WEBZINE', 'INQUIRY',
                        'DOWNLOAD', 'RESEARCH', 'HISTORY', 'LOCATION', 'OVERVIEW', 'DEVELOPMENT']:
        return 'navigation'

    if text in ['About', 'Menu', 'Search', 'Filter', 'Previous', 'Next', 'Close Search',
                'Skip to main content', 'Back to top', 'Main Menu', 'Navigation Menu']:
        return 'navigation'

    # Form labels
    if text in ['Name', 'Email', 'Phone', 'Message', 'Subject', '성함', '이메일', '전화번호', '내용', '문의유형']:
        return 'forms'

    # Buttons/Actions
    if text in ['Submit', 'Send', 'Download', 'Search', 'View', 'More', 'See more', 'More Details',
                'Play Video', 'Share', 'Pin', 'Love', '검색', '문의하기', 'View list']:
        return 'buttons'

    # Korean content
    if re.search(r'[가-힣]', text):
        # Research/Medical terms
        if any(keyword in text for keyword in ['연구', '개발', '건강', '의료', '치료', '예방', '진단']):
            return 'research'

        # Company info
        if any(keyword in text for keyword in ['센터', '본사', '연구소', '회사', '설립']):
            return 'company'

        # Services
        if any(keyword in text for keyword in ['서비스', '제품', '솔루션', '플랫폼', '기술']):
            return 'services'

        # General Korean content
        return 'content_ko'

    # English content
    return 'content_en'

def create_semantic_key(text, category):
    """Create a more semantic key for the text"""

    # Special cases for common UI elements
    ui_mapping = {
        'Search': 'search',
        'Menu': 'menu',
        'About': 'about',
        'Contact': 'contact',
        'FAQ': 'faq',
        'News': 'news',
        'Gallery': 'gallery',
        'Download': 'download',
        'Previous': 'previous',
        'Next': 'next',
        'Submit': 'submit',
        'Send': 'send',
        'View': 'view',
        'More': 'more',
        'Share': 'share',
        'Pin': 'pin',
        'Love': 'love',
    }

    if text in ui_mapping:
        return ui_mapping[text]

    # For Korean text, create transliteration or simple identifier
    korean_mapping = {
        '검색': 'search',
        '메뉴': 'menu',
        '소개': 'about',
        '연락처': 'contact',
        '문의': 'inquiry',
        '다운로드': 'download',
        '연구': 'research',
        '개발': 'development',
        '갤러리': 'gallery',
        '뉴스': 'news',
        '웹진': 'webzine',
        '역사': 'history',
        '위치': 'location',
        '성함': 'name',
        '이메일': 'email',
        '전화번호': 'phone',
        '내용': 'message',
        '문의하기': 'submit_inquiry',
        'View list': 'view_list',
    }

    if text in korean_mapping:
        return korean_mapping[text]

    # Generate key from text
    # Remove special characters, limit length
    key = re.sub(r'[^\w\s가-힣]', '', text)
    key = re.sub(r'\s+', '_', key.strip())[:50]
    key = key.lower()

    return key

def main():
    """Main function to create improved i18n structure"""

    strings_dict = load_extracted_strings()

    # Categorize all strings
    categorized = {
        'navigation': {},
        'buttons': {},
        'forms': {},
        'contact': {},
        'dates': {},
        'company': {},
        'research': {},
        'services': {},
        'content_ko': {},
        'content_en': {},
        'other': {}
    }

    # Track used keys to avoid duplicates
    used_keys = set()

    for old_key, text in strings_dict.items():
        category = categorize_string(text)
        semantic_key = create_semantic_key(text, category)

        # Handle duplicate keys
        original_key = semantic_key
        counter = 1
        while semantic_key in used_keys:
            semantic_key = f"{original_key}_{counter}"
            counter += 1

        used_keys.add(semantic_key)

        if category in categorized:
            categorized[category][semantic_key] = text
        else:
            categorized['other'][semantic_key] = text

    # Create final i18n structure
    i18n_structure = {
        'metadata': {
            'project': 'healthcare-web',
            'extracted_date': '2025-12-23',
            'total_strings': sum(len(cat) for cat in categorized.values()),
            'categories': {cat: len(strings) for cat, strings in categorized.items() if strings}
        },
        'strings': categorized
    }

    # Save categorized structure
    output_file = '/Users/meditor/Projects/healthcare-web/i18n_categorized.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(i18n_structure, f, ensure_ascii=False, indent=2)

    print(f"Categorized i18n structure saved to: {output_file}")
    print(f"\nCategory breakdown:")
    for category, strings in sorted(categorized.items()):
        if strings:
            print(f"  {category:20} {len(strings):4} strings")

    # Create flat version for easy use
    flat_strings = {}
    for category, strings in categorized.items():
        for key, value in strings.items():
            flat_key = f"{category}.{key}"
            flat_strings[flat_key] = value

    flat_output_file = '/Users/meditor/Projects/healthcare-web/i18n_flat.json'
    with open(flat_output_file, 'w', encoding='utf-8') as f:
        json.dump(flat_strings, f, ensure_ascii=False, indent=2)

    print(f"\nFlat i18n structure saved to: {flat_output_file}")

    # Create TypeScript interface
    ts_output_file = '/Users/meditor/Projects/healthcare-web/i18n.d.ts'
    with open(ts_output_file, 'w', encoding='utf-8') as f:
        f.write("// Auto-generated TypeScript definitions for i18n strings\n")
        f.write("// Generated on 2025-12-23\n\n")
        f.write("export interface I18nStrings {\n")

        for category, strings in sorted(categorized.items()):
            if strings:
                f.write(f"  {category}: {{\n")
                for key in sorted(strings.keys()):
                    f.write(f"    {key}: string;\n")
                f.write(f"  }};\n")

        f.write("}\n\n")
        f.write("export const i18nStrings: I18nStrings;\n")

    print(f"TypeScript definitions saved to: {ts_output_file}")

if __name__ == '__main__':
    main()
