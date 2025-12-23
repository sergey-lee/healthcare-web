#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Translate Korean texts to Traditional Chinese (Taiwan)
Replaces Russian translations with Chinese in i18n-full.js
"""

import re
import json

# Manual translations for all 216 Korean texts to Traditional Chinese (Taiwan)
# This is a comprehensive mapping based on the Korean originals

translations = {
    # Projects (76 texts)
    "projects.text1": "2024年新產品發布公告",
    "projects.text2": "開發與實施",
    "projects.text3": "個人健康管理",
    "projects.text4": "圖庫",
    "projects.text5": "健康醫學研究中心總部及研究所指南",
    "projects.text6": "健康醫學研究中心常見問題與解答",
    "projects.text7": "您可以查看健康醫學研究中心的常見問題與解答。",
    "projects.text8": "查看健康醫學研究中心的最新消息、研究公告、新聞稿。",
    "projects.text9": "京畿道研究所",
    "projects.text10": "邀請參與提高客戶滿意度的問卷調查及獎品公告",
    "projects.text11": "以客戶為中心",
    "projects.text12": "科學與健康故事",
    "projects.text13": "全球合作夥伴網絡",
    "projects.text14": "為更健康的明天創新",
    "projects.text15": "數位醫療平台建設",
    "projects.text16": "免疫增強疫苗開發",
    "projects.text17": "如有任何疑問，請隨時告訴我們。",
    "projects.text18": "聯絡我們",
    "projects.text19": "介紹我們在解決未來問題中發揮重要作用的核心技術。",
    "projects.text20": "總部",
    "projects.text21": "總部搬遷公告",
    "projects.text22": "總部搬遷公告及新地址信息通知",
    "projects.text23": "釜山研究所",
    "projects.text24": "上半年員工研討會日程及參與指南",
    "projects.text25": "最新消息",
    "projects.text26": "設計與原型開發",
    "projects.text27": "符合國際標準的認證",
    "projects.text28": "新服務上線紀念活動及參與方式指南",
    "projects.text29": "新藥開發的生物數據研究",
    "projects.text30": "新產品發布及預購活動公告",
    "projects.text31": "構思創意及需求分析",
    "projects.text32": "請通過下面的表格發送研究資料請求、合作提案、其他諮詢事項。",
    "projects.text33": "研究所",
    "projects.text34": "透過視覺體驗我們創造的科學與健康故事。",
    "projects.text35": "我們通過尖端技術和數據驅動的研究引領健康管理創新。",
    "projects.text36": "網路雜誌",
    "projects.text37": "醫療機構",
    "projects.text38": "常見問題",
    "projects.text39": "定期維護工程日程及服務使用限制公告",
    "projects.text40": "定期伺服器檢查及服務暫停通知",
    "projects.text41": "제품 품질 개선을 위한 리콜 안내 및 고객 대응 방법",
    "projects.text42": "추석 연휴 기간 업무 일정 및 배송 공지",
    "projects.text43": "추석 연휴 기간 배송 일정 안내",
    "projects.text44": "추석 명절 맞이 할인 이벤트 및 특가 상품 안내",
    "projects.text45": "테스트 및 품질 검증",
    "projects.text46": "프로젝트 리스트",
    "projects.text47": "혁신적인 기술로 만드는 건강한 미래",
    "projects.text48": "Project 현장과 순간을 담다",
    "projects.text49": "건강의학연구센터의 연구와 활동 현장을 사진으로 만나보세요.",
    "projects.text50": "우리가 만들어가는 혁신의 과정을 시각적으로 경험해 보실 수 있습니다.",
    "projects.text51": "만성질환 예방 및 AI 기반 건강 솔루션",
    "projects.text52": "머신러닝 알고리즘,",
    "projects.text53": "실시간 데이터 처리 시스템",
    "projects.text54": "헬스테크 혁신 센터 (ISO 13485 인증)",
    "projects.text55": "개인 맞춤형 건강 플랫폼 및 디지털 치료제",
    "projects.text56": "혁신과 전문성",
    "projects.text57": "정확성",
    "projects.text58": "협력과 신뢰",
    "projects.text59": "의료진 교육 프로그램",
    "projects.text60": "바이오메디컬 장비 공급",
    "projects.text61": "데이터 기반 질병 예측 시스템",
    "projects.text62": "딥러닝 모델, 클라우드 분석 플랫폼",
    "projects.text63": "글로벌 헬스케어 데이터 센터",
    "projects.text64": "국제 협력",
    "projects.text65": "사회적 책임",
    "projects.text66": "유전체 분석 및 바이오마커 연구",
    "projects.text67": "NGS 시퀀싱 기술, 바이오인포매틱스",
    "projects.text68": "글로벌 바이오 연구센터 (GMP 인증)",
    "projects.text69": "항암제 및 희귀질환 치료제 개발",
    "projects.text70": "지속 가능성",
    "projects.text71": "Developed by 건강의학연구센터.",
    "projects.text72": "Privacy Policy",
    "projects.text73": "Terms of Service",
    "projects.text74": "More details",
    "projects.text75": "관련 연구소",
    "projects.text76": "Contact Info",

    # Research (38 texts)
    "research.text1": "癌症研究",
    "research.text2": "我們的研究所正在進行癌症預防和治療方法開發的尖端研究。",
    "research.text3": "開發與實施",
    "research.text4": "研究與開發",
    "research.text5": "우리의 연구 분야",
    "research.text6": "암 연구",
    "research.text7": "예방 의학",
    "research.text8": "만성질환 관리",
    "research.text9": "디지털 헬스케어",
    "research.text10": "바이오테크놀로지",
    "research.text11": "임상시험",
    "research.text12": "글로벌 협력 프로젝트",
    "research.text13": "건강 데이터 분석",
    "research.text14": "AI 의료 진단",
    "research.text15": "정밀 의학",
    "research.text16": "우리의 연구 성과",
    "research.text17": "최신 논문 발표",
    "research.text18": "특허 및 인증",
    "research.text19": "수상 경력",
    "research.text20": "연구팀 소개",
    "research.text21": "연구 시설",
    "research.text22": "파트너십",
    "research.text23": "연구 윤리",
    "research.text24": "데이터 보안",
    "research.text25": "연구 지원",
    "research.text26": "장학금 프로그램",
    "research.text27": "인턴십 기회",
    "research.text28": "연구 협력 제안",
    "research.text29": "기술 이전",
    "research.text30": "라이센싱",
    "research.text31": "연구 데이터베이스",
    "research.text32": "발표 자료",
    "research.text33": "백서",
    "research.text34": "사례 연구",
    "research.text35": "뉴스레터",
    "research.text36": "블로그",
    "research.text37": "이벤트",
    "research.text38": "세미나",

    # News (41 texts)
    "news.text1": "2024年新產品發布公告",
    "news.text2": "總部搬遷公告",
    "news.text3": "中秋連假期間配送日程公告",
    "news.text4": "定期伺服器檢查公告（2024年6月15日）",
    "news.text5": "各位客戶，您好。",
    "news.text6": "謝謝。",
    "news.text7": "XYZ公司敬上",
    "news.text8": "고객님께 드리는 공지",
    "news.text9": "시스템 업그레이드",
    "news.text10": "서비스 개선",
    "news.text11": "보안 강화",
    "news.text12": "새로운 기능 추가",
    "news.text13": "사용자 경험 향상",
    "news.text14": "긴급 공지",
    "news.text15": "일정 변경",
    "news.text16": "이벤트 안내",
    "news.text17": "할인 혜택",
    "news.text18": "프로모션",
    "news.text19": "신규 회원 혜택",
    "news.text20": "포인트 적립",
    "news.text21": "쿠폰 발행",
    "news.text22": "회원 등급",
    "news.text23": "VIP 혜택",
    "news.text24": "배송 정보",
    "news.text25": "반품 정책",
    "news.text26": "환불 안내",
    "news.text27": "교환 절차",
    "news.text28": "고객 지원",
    "news.text29": "FAQ",
    "news.text30": "1:1 문의",
    "news.text31": "전화 상담",
    "news.text32": "이메일 지원",
    "news.text33": "채팅 상담",
    "news.text34": "운영 시간",
    "news.text35": "휴무일",
    "news.text36": "긴급 연락처",
    "news.text37": "본사 위치",
    "news.text38": "지점 안내",
    "news.text39": "오시는 길",
    "news.text40": "주차 안내",
    "news.text41": "대중교통",

    # History (11 texts)
    "history.text1": "透過健康與科學的和諧創造的創新之旅",
    "history.text2": "創立及初期基礎建設",
    "history.text3": "研究成果與全球合作擴大",
    "history.text4": "健康醫學研究中心創立",
    "history.text5": "以現代人健康促進和疾病預防為目標創立。",
    "history.text6": "研究所基礎設施建設",
    "history.text7": "主要實驗室及數據分析基礎設施完備。",
    "history.text8": "加入世界衛生組織（WHO）研究網絡",
    "history.text9": "作為主要研究機構參與慢性疾病預防項目。",
    "history.text10": "國內首個健康管理軟體發布",
    "history.text11": "開發利用科學數據的個性化健康管理平台。",

    # Overview (9 texts)
    "overview.text1": "我們打破醫療與技術的界限，創造健康創新的新範式。",
    "overview.text2": "為健康生活的科學，為我們所有人的未來",
    "overview.text3": "承載健康願景與熱情的標誌",
    "overview.text4": "您好，",
    "overview.text5": "衷心感謝您訪問健康醫學研究中心。",
    "overview.text6": "成立於2010年的專業研究機構，致力於現代人的健康促進和疾病預防的創新研究與開發。",
    "overview.text7": "基於最新醫學技術和數據，提供健康管理解決方案和醫學見解，並與全球醫療和研究社群合作，致力於提高人們的生活品質。",
    "overview.text8": "설립 목표",
    "overview.text9": "핵심 가치",

    # Footer (16 texts)
    "footer.text1": "© 2024 建康醫學研究中心. 版權所有。",
    "footer.text2": "隱私權政策",
    "footer.text3": "服務條款",
    "footer.text4": "聯絡我們",
    "footer.text5": "關於我們",
    "footer.text6": "研究領域",
    "footer.text7": "公司名稱",
    "footer.text8": "代表人姓名",
    "footer.text9": "DiPulse",
    "footer.text10": "商業登記號碼",
    "footer.text11": "首爾特別市中區世宗大路110號",
    "footer.text12": "電話號碼",
    "footer.text13": "地址",
    "footer.text14": "傳真",
    "footer.text15": "000-12-34567",
    "footer.text16": "1234-5678",

    # FAQ (5 texts)
    "faq.text1": "健康醫學研究中心的主要問題與解答",
    "faq.text2": "您可以查看健康醫學研究中心的主要問題與解答。",
    "faq.text3": "자주 묻는 질문",
    "faq.text4": "답변 보기",
    "faq.text5": "더 많은 FAQ",

    # Location (5 texts)
    "location.text1": "健康醫學研究中心總部及研究所指南",
    "location.text2": "京畿道研究所",
    "location.text3": "찾아오시는 길",
    "location.text4": "위치 안내",
    "location.text5": "오시는 방법",

    # Contact (9 texts)
    "contact.text1": "聯絡我們",
    "contact.text2": "문의 유형",
    "contact.text3": "이름",
    "contact.text4": "이메일",
    "contact.text5": "전화번호",
    "contact.text6": "제목",
    "contact.text7": "내용",
    "contact.text8": "보내기",
    "contact.text9": "필수 입력 사항",

    # Buttons (3 texts)
    "buttons.text1": "搜尋",
    "buttons.text2": "더보기",
    "buttons.text3": "확인",

    # Categories (3 texts)
    "categories.gallery": "圖庫",
    "categories.news": "最新消息",
    "categories.webzine": "網路雜誌",

    # Forms (remaining texts from projects that weren't categorized above)
    "projects.text41": "產品品質改善召回公告及客戶應對方法",
    "projects.text42": "中秋連假期間業務日程及配送公告",
    "projects.text43": "中秋連假期間配送日程公告",
    "projects.text44": "中秋佳節折扣活動及特價商品公告",
    "projects.text45": "測試與品質驗證",
    "projects.text46": "專案列表",
    "projects.text47": "以創新技術創造健康未來",
    "projects.text48": "捕捉專案現場與瞬間",
    "projects.text49": "透過照片了解健康醫學研究中心的研究與活動現場。",
    "projects.text50": "您可以視覺化體驗我們創造的創新過程。",
    "projects.text51": "慢性疾病預防及AI健康解決方案",
    "projects.text52": "機器學習演算法，",
    "projects.text53": "即時數據處理系統",
    "projects.text54": "健康科技創新中心（ISO 13485認證）",
    "projects.text55": "個人化健康平台及數位療法",
    "projects.text56": "創新與專業",
    "projects.text57": "準確性",
    "projects.text58": "合作與信任",
    "projects.text59": "醫護人員培訓計畫",
    "projects.text60": "生物醫學設備供應",
    "projects.text61": "數據驅動疾病預測系統",
    "projects.text62": "深度學習模型、雲端分析平台",
    "projects.text63": "全球醫療數據中心",
    "projects.text64": "國際合作",
    "projects.text65": "社會責任",
    "projects.text66": "基因組分析及生物標記研究",
    "projects.text67": "NGS定序技術、生物資訊學",
    "projects.text68": "全球生物研究中心（GMP認證）",
    "projects.text69": "抗癌藥物及罕見疾病治療劑開發",
    "projects.text70": "可持續性",
    "projects.text71": "由健康醫學研究中心開發。",
    "projects.text72": "隱私權政策",
    "projects.text73": "服務條款",
    "projects.text74": "更多詳情",
    "projects.text75": "相關研究所",
    "projects.text76": "聯絡資訊",

    # Research (remaining)
    "research.text5": "我們的研究領域",
    "research.text6": "癌症研究",
    "research.text7": "預防醫學",
    "research.text8": "慢性疾病管理",
    "research.text9": "數位醫療",
    "research.text10": "生物科技",
    "research.text11": "臨床試驗",
    "research.text12": "全球合作項目",
    "research.text13": "健康數據分析",
    "research.text14": "AI醫療診斷",
    "research.text15": "精準醫學",
    "research.text16": "我們的研究成果",
    "research.text17": "最新論文發表",
    "research.text18": "專利與認證",
    "research.text19": "獲獎記錄",
    "research.text20": "研究團隊介紹",
    "research.text21": "研究設施",
    "research.text22": "合作夥伴關係",
    "research.text23": "研究倫理",
    "research.text24": "數據安全",
    "research.text25": "研究支援",
    "research.text26": "獎學金計畫",
    "research.text27": "實習機會",
    "research.text28": "研究合作提案",
    "research.text29": "技術轉移",
    "research.text30": "授權",
    "research.text31": "研究數據庫",
    "research.text32": "發表資料",
    "research.text33": "白皮書",
    "research.text34": "案例研究",
    "research.text35": "電子報",
    "research.text36": "部落格",
    "research.text37": "活動",
    "research.text38": "研討會",

    # News (remaining)
    "news.text8": "致客戶的公告",
    "news.text9": "系統升級",
    "news.text10": "服務改善",
    "news.text11": "安全強化",
    "news.text12": "新增功能",
    "news.text13": "使用者體驗提升",
    "news.text14": "緊急公告",
    "news.text15": "日程變更",
    "news.text16": "活動指南",
    "news.text17": "折扣優惠",
    "news.text18": "促銷活動",
    "news.text19": "新會員優惠",
    "news.text20": "積分累積",
    "news.text21": "優惠券發行",
    "news.text22": "會員等級",
    "news.text23": "VIP優惠",
    "news.text24": "配送資訊",
    "news.text25": "退貨政策",
    "news.text26": "退款指南",
    "news.text27": "換貨程序",
    "news.text28": "客戶支援",
    "news.text29": "常見問題",
    "news.text30": "一對一諮詢",
    "news.text31": "電話諮詢",
    "news.text32": "電子郵件支援",
    "news.text33": "聊天諮詢",
    "news.text34": "營業時間",
    "news.text35": "休息日",
    "news.text36": "緊急聯絡方式",
    "news.text37": "總部位置",
    "news.text38": "分店指南",
    "news.text39": "交通指南",
    "news.text40": "停車指南",
    "news.text41": "大眾運輸",

    # Overview (remaining)
    "overview.text8": "創立目標",
    "overview.text9": "核心價值",

    # FAQ (remaining)
    "faq.text3": "常見問題",
    "faq.text4": "查看解答",
    "faq.text5": "更多常見問題",

    # Location (remaining)
    "location.text3": "交通指南",
    "location.text4": "位置指南",
    "location.text5": "交通方式",

    # Contact (remaining)
    "contact.text2": "諮詢類型",
    "contact.text3": "姓名",
    "contact.text4": "電子郵件",
    "contact.text5": "電話號碼",
    "contact.text6": "標題",
    "contact.text7": "內容",
    "contact.text8": "發送",
    "contact.text9": "必填項目",

    # Buttons (remaining)
    "buttons.text2": "更多",
    "buttons.text3": "確認",
}

def read_i18n_file():
    """Read the current i18n-full.js file"""
    with open('i18n-full.js', 'r', encoding='utf-8') as f:
        return f.read()

def replace_russian_with_chinese(content):
    """Replace Russian (ru) section with Chinese (zh)"""

    # Find the Russian section
    ru_pattern = r'ru:\s*\{[^}]*\}(?:\s*\},)?'

    # Build Chinese translations string
    zh_translations = "zh: {\n"

    # Group by category
    categories = {}
    for key, value in translations.items():
        category, text_id = key.split('.')
        if category not in categories:
            categories[category] = {}
        categories[category][text_id] = value

    # Build the translation object
    for category in sorted(categories.keys()):
        zh_translations += f"    {category}: {{\n"
        for text_id in sorted(categories[category].keys()):
            value = categories[category][text_id]
            # Escape quotes
            value = value.replace("'", "\\'")
            zh_translations += f"      {text_id}: '{value}',\n"
        zh_translations += "    },\n"

    zh_translations += "  },"

    # Replace ru with zh
    new_content = re.sub(ru_pattern, zh_translations, content, flags=re.DOTALL)

    return new_content

def update_language_references(content):
    """Update any references from 'ru' to 'zh' in the file"""
    # This will catch any remaining references
    content = content.replace("'ru'", "'zh'")
    content = content.replace('"ru"', '"zh"')
    return content

def main():
    print("📖 Reading i18n-full.js...")
    content = read_i18n_file()

    print("🔄 Replacing Russian with Traditional Chinese (Taiwan)...")
    content = replace_russian_with_chinese(content)
    content = update_language_references(content)

    print("💾 Writing updated file...")
    with open('i18n-full.js', 'w', encoding='utf-8') as f:
        f.write(content)

    print("✅ Done! Russian has been replaced with Traditional Chinese (繁體中文)")
    print(f"📊 Total translations: {len(translations)}")

if __name__ == "__main__":
    main()
