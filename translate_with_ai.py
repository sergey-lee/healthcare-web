#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Translate all Korean text to English in i18n_categorized.json
Uses comprehensive translation for all Korean strings
"""

import json
import re


def is_korean(text):
    """Check if text contains Korean characters"""
    if not isinstance(text, str):
        return False
    return any('\uac00' <= char <= '\ud7a3' for char in text)


def translate_korean_to_english(text):
    """
    Comprehensive Korean to English translation
    This is a reference translation - you may want to adjust based on context
    """

    # Dictionary of comprehensive translations
    translations = {
        # Full sentences and phrases
        "건강의학연구센터는 국내외 유수의 연구기관, 공공기관, 그리고 산업체와의 협력을 통해 미래지향적인 연구와 기술 개발을 선도하고 있습니다. 각 분야에서 인정받은 파트너와의 긴밀한 네트워크를 통해, 질병 예방과 치료를 위한 실질적인 솔루션을 만들어갑니다.":
            "The Healthcare Research Center leads future-oriented research and technology development through collaboration with leading domestic and international research institutes, public institutions, and industries. Through close networks with recognized partners in each field, we create practical solutions for disease prevention and treatment.",

        "출시 기념으로 한정 기간 동안 특별 할인 이벤트를 진행하오니 많은 관심과 참여 부탁드립니다.":
            "We are holding a special discount event for a limited time to celebrate the launch. We look forward to your interest and participation.",

        "출시 및 유지 보수": "Launch and Maintenance",

        "클라우드 환경을 활용한 데이터 관리 및 처리로, 유연하고 확장 가능한 시스템을 제공합니다. 사용자와 데이터가 분산되어 있어, 더 안전하고 빠르게 서비스를 제공합니다.":
            "We provide a flexible and scalable system through data management and processing using cloud environments. With distributed users and data, we deliver services more securely and quickly.",

        "풍성한 한가위 되시길 바랍니다.": "Wishing you a prosperous Chuseok (Korean Thanksgiving).",

        "필요한 자료가 없거나 추가 문의가 있으시면 언제든 저희에게 알려주세요.":
            "If you need any additional materials or have further inquiries, please feel free to contact us anytime.",

        "건강의학연구센터 설립": "Healthcare Research Center Establishment",
        "건강의학연구센터는 어떤 곳인가요?": "What is the Healthcare Research Center?",
        "At Wellio, our mission is to empower people with precise and painless glucose monitoring. I am proud to guide our talented team toward innovation that transforms daily healthcare and enhances quality of life worldwide.": "Thank you sincerely for visiting the Healthcare Research Center.",
        "건강의학연구센터에 대한 주요 질문과 답변": "Frequently Asked Questions about the Healthcare Research Center",
        "건강의학연구센터에 대한 주요 질문과 답변을 확인하실 수 있습니다.": "You can find answers to frequently asked questions about the Healthcare Research Center.",
        "건강의학연구센터의 연구와 활동 현장을 사진으로 만나보세요.": "Explore the research and activities of the Healthcare Research Center through photos.",
        "건강의학연구센터의 최신 뉴스, 연구 발표, 보도자료를 확인하세요.": "Check out the latest news, research announcements, and press releases from the Healthcare Research Center.",

        "경기도 연구소": "Gyeonggi Province Research Institute",
        "고객 만족도 향상을 위한 설문 조사 참여 요청 및 경품 안내": "Request to participate in customer satisfaction survey and prize information",

        # Organization names
        "건강의학연구센터": "Healthcare Research Center",
        "건강 의학 연구 센터": "Healthcare Research Center",

        # Common terms
        "성함": "Name",
        "이름": "Name",
        "이메일": "Email",
        "전화번호": "Phone Number",
        "연락처": "Contact",
        "내용": "Message",
        "문의": "Inquiry",
        "제목": "Subject",
        "주소": "Address",

        # Actions
        "문의하기": "Submit Inquiry",
        "검색": "Search",
        "목록보기": "View List",
        "더보기": "See More",
        "보기": "View",
        "다운로드": "Download",

        # Research terms
        "AI 기반 건강 데이터 분석 플랫폼 개발": "AI-based Health Data Analysis Platform Development",
        "개인 맞춤형 건강 플랫폼 및 디지털 치료제": "Personalized Health Platform and Digital Therapeutics",
        "질병 예방을 위한 빅데이터 기반 예측 모델": "Big Data-based Prediction Model for Disease Prevention",
        "신종 감염병 백신 개발 및 임상 연구": "New Infectious Disease Vaccine Development and Clinical Research",
        "유전자 분석 기술을 활용한 맞춤형 의학": "Personalized Medicine Using Gene Analysis Technology",

        # Locations
        "서울특별시 강남구": "Gangnam-gu, Seoul",
        "경기도": "Gyeonggi Province",
        "부산광역시": "Busan Metropolitan City",
        "본사": "Headquarters",

        # Single words - common
        "연구": "Research",
        "개발": "Development",
        "건강": "Health",
        "의학": "Medicine",
        "기술": "Technology",
        "혁신": "Innovation",
        "데이터": "Data",
        "분석": "Analysis",
        "플랫폼": "Platform",
        "솔루션": "Solution",
        "서비스": "Service",
        "제품": "Product",
        "협력": "Collaboration",
        "파트너": "Partner",
    }

    if not isinstance(text, str):
        return text

    # If already English, return as is
    if not is_korean(text):
        return text

    # Try exact match first
    if text in translations:
        return translations[text]

    # Try partial matching for longer phrases
    for korean, english in sorted(translations.items(), key=lambda x: -len(x[0])):
        if len(korean) > 5 and korean in text:
            text = text.replace(korean, english)

    # If still contains Korean after all translations, return original
    # (needs manual translation)
    return text


def process_json_recursively(obj):
    """Recursively process JSON structure and translate Korean values"""
    if isinstance(obj, dict):
        return {key: process_json_recursively(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [process_json_recursively(item) for item in obj]
    elif isinstance(obj, str):
        return translate_korean_to_english(obj)
    else:
        return obj


def main():
    input_file = 'i18n_categorized.json'
    output_file = 'i18n_english.json'

    print(f"📖 Loading {input_file}...")

    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"🔄 Translating Korean text to English...")

    # Translate all values
    translated_data = process_json_recursively(data)

    # Save result
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(translated_data, f, ensure_ascii=False, indent=2)

    print(f"✅ Translation complete!")
    print(f"📁 Saved to: {output_file}")
    print(f"\n📝 Next steps:")
    print(f"1. Review {output_file} for any remaining Korean text")
    print(f"2. Backup original: cp i18n_categorized.json i18n_korean_backup.json")
    print(f"3. Apply English version: cp {output_file} i18n_categorized.json")
    print(f"4. Refresh browser: Cmd+Shift+R on http://localhost:8000/test-i18n.html")

    # Count remaining Korean strings
    korean_count = 0
    def count_korean_recursive(obj):
        nonlocal korean_count
        if isinstance(obj, dict):
            for v in obj.values():
                count_korean_recursive(v)
        elif isinstance(obj, list):
            for item in obj:
                count_korean_recursive(item)
        elif isinstance(obj, str) and is_korean(obj):
            korean_count += 1

    count_korean_recursive(translated_data)

    if korean_count > 0:
        print(f"\n⚠️  Note: {korean_count} strings still contain Korean text")
        print("These may need manual translation for better accuracy.")
    else:
        print(f"\n🎉 All Korean text has been translated!")


if __name__ == '__main__':
    main()
