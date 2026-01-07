#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Translate Korean values to English in i18n_categorized.json
Preserves all keys, only translates values
"""

import json
import re

# Translation dictionary for common healthcare/medical terms
TRANSLATIONS = {
    # Organization
    "건강의학연구센터": "Healthcare Research Center",

    # Research & Development
    "연구": "Research",
    "개발": "Development",
    "기술": "Technology",
    "혁신": "Innovation",
    "플랫폼": "Platform",

    # Healthcare terms
    "건강": "Health",
    "의학": "Medicine",
    "질병": "Disease",
    "예방": "Prevention",
    "치료": "Treatment",
    "진단": "Diagnosis",
    "백신": "Vaccine",
    "환자": "Patient",

    # AI & Data
    "인공지능": "Artificial Intelligence",
    "AI": "AI",
    "데이터": "Data",
    "분석": "Analysis",
    "빅데이터": "Big Data",

    # Business & Collaboration
    "협력": "Collaboration",
    "파트너": "Partner",
    "네트워크": "Network",
    "솔루션": "Solution",
    "서비스": "Service",
    "제품": "Product",

    # People & Organizations
    "연구기관": "Research Institute",
    "공공기관": "Public Institution",
    "산업체": "Industry",
    "기업": "Company",
    "대학": "University",

    # Adjectives
    "미래지향적": "Future-oriented",
    "개인_맞춤형": "Personalized",
    "실질적": "Practical",
    "종합적": "Comprehensive",

    # Common phrases - Full sentences
    "Wellio leads the way in advanced glucose monitoring by combining cutting-edge technology with smart data analysis. Through collaboration with health experts and research partners, we provide practical solutions for managing blood glucose and supporting a healthier life":
        "Healthcare Research Center leads future-oriented research and technology development through collaboration with leading domestic and international research institutes, public institutions, and industries. Through close networks with recognized partners in each field, we create practical solutions for disease prevention and treatment.",

    "AI 기반 건강 데이터 분석 플랫폼 개발":
        "AI-based Health Data Analysis Platform Development",

    "개인 맞춤형 건강 플랫폼 및 디지털 치료제":
        "Personalized Health Platform and Digital Therapeutics",

    "질병 예방을 위한 빅데이터 기반 예측 모델":
        "Big Data-based Prediction Model for Disease Prevention",

    "신종 감염병 백신 개발 및 임상 연구":
        "New Infectious Disease Vaccine Development and Clinical Research",

    "유전자 분석 기술을 활용한 맞춤형 의학":
        "Personalized Medicine Using Gene Analysis Technology",

    # Form fields
    "성함": "Name",
    "이름": "Name",
    "이메일": "Email",
    "전화번호": "Phone",
    "연락처": "Contact",
    "내용": "Message",
    "문의": "Inquiry",
    "제목": "Subject",

    # Actions
    "문의하기": "Submit Inquiry",
    "검색": "Search",
    "보기": "View",
    "View list": "View List",
    "더보기": "See More",
    "다운로드": "Download",
    "제출": "Submit",
    "보내기": "Send",

    # Navigation
    "소개": "About",
    "연락처": "Contact",
    "위치": "Location",
    "역사": "History",

    # Locations
    "서울특별시": "Seoul",
    "강남구": "Gangnam-gu",
    "경기도": "Gyeonggi Province",
    "부산광역시": "Busan",
    "본사": "Headquarters",

    # Contact info
    "대표전화": "Main Phone",
    "팩스": "Fax",
    "주소": "Address",

    # Dates/Time
    "년": "Year",
    "월": "Month",
    "일": "Day",
}


def translate_text(text):
    """
    Translate Korean text to English
    Uses dictionary-based translation for common terms
    """
    if not isinstance(text, str):
        return text

    # Check if it's already in English (contains mostly Latin characters)
    if re.match(r'^[A-Za-z0-9\s\-\.,!?()@:/&]+$', text):
        return text

    # Try exact match first
    if text in TRANSLATIONS:
        return TRANSLATIONS[text]

    # For complex strings, try to translate word by word
    translated = text
    for korean, english in sorted(TRANSLATIONS.items(), key=lambda x: -len(x[0])):
        if korean in translated and len(korean) > 2:  # Only replace longer terms
            translated = translated.replace(korean, english)

    # If no translation found but it's Korean, return as is (manual translation needed)
    # We'll mark it for manual review
    if any('\uac00' <= char <= '\ud7a3' for char in text):
        # Contains Korean characters - needs manual translation
        return text  # Keep original for now

    return translated


def translate_json_values(data):
    """
    Recursively translate all values in JSON structure
    Preserves all keys unchanged
    """
    if isinstance(data, dict):
        return {key: translate_json_values(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [translate_json_values(item) for item in data]
    elif isinstance(data, str):
        return translate_text(data)
    else:
        return data


def main():
    input_file = 'i18n_categorized.json'
    output_file = 'i18n_categorized_english.json'

    print(f"Loading {input_file}...")

    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Translating values to English...")
    print(f"Total categories: {len(data.get('strings', {}))}")

    # Translate all values
    translated_data = translate_json_values(data)

    # Save to new file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(translated_data, f, ensure_ascii=False, indent=2)

    print(f"✅ Translation complete!")
    print(f"Saved to: {output_file}")
    print(f"\nTo use the English version:")
    print(f"1. Backup original: cp i18n_categorized.json i18n_categorized_korean.json")
    print(f"2. Replace with English: cp {output_file} i18n_categorized.json")
    print(f"3. Refresh browser (Cmd+Shift+R)")

    # Count translated vs untranslated
    def count_korean(obj):
        count = 0
        if isinstance(obj, dict):
            for v in obj.values():
                count += count_korean(v)
        elif isinstance(obj, str):
            if any('\uac00' <= char <= '\ud7a3' for char in v):
                count += 1
        return count

    korean_count = count_korean(translated_data)
    print(f"\n⚠️  Strings still containing Korean: {korean_count}")
    if korean_count > 0:
        print("These may need manual translation.")


if __name__ == '__main__':
    main()
