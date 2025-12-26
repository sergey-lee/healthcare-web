#!/bin/bash

# Скрипт для замены кнопки поиска на переключатель языка во всех HTML файлах

echo "🔍 Поиск HTML файлов с кнопкой поиска..."

# Найти все HTML файлы с кнопкой поиска
files=$(find . -maxdepth 3 -name "index.html" -type f -exec grep -l 'id="search-btn"' {} \;)

count=0
for file in $files; do
    echo "📝 Обработка: $file"
    
    # Создать резервную копию
    cp "$file" "$file.backup_lang_switcher"
    
    # Заменить кнопку поиска на переключатель языка
    sed -i '' '/<li id="search-btn">/,/<\/li>/{
        /<li id="search-btn">/c\
<li id="lang-switcher">\
<div class="lang-switcher-wrap">\
<a href="#" class="lang-current">\
<span class="lang-flag">🇺🇸</span>\
<span class="lang-name">English</span>\
</a>\
<ul class="lang-dropdown">\
<li><a href="#" data-lang="en"><span class="lang-flag">🇺🇸</span> English</a></li>\
<li><a href="#" data-lang="zh-TW"><span class="lang-flag">🇹🇼</span> 繁體中文</a></li>\
</ul>\
</div>\
</li>
        /<\/li>/d
    }' "$file"
    
    # Добавить CSS и JS, если их еще нет
    if ! grep -q "lang-switcher.css" "$file"; then
        # Найти закрывающий тег </head> и вставить перед ним
        sed -i '' 's|</head>|<link rel="stylesheet" href="/lang-switcher.css" type="text/css"/>\
<script src="/lang-switcher.js" defer></script>\
</head>|' "$file"
        echo "  ✅ Добавлены CSS и JS"
    fi
    
    ((count++))
done

echo ""
echo "🎉 Готово! Обновлено файлов: $count"
echo "📦 Резервные копии сохранены как *.backup_lang_switcher"
