#!/bin/bash
# Исправить дублирование i18n-loader.js

echo "🔍 Поиск дублей i18n-loader.js..."

files=$(find . -maxdepth 3 -name "index.html" -type f 2>/dev/null)

count=0
for file in $files; do
    # Проверить дубликаты
    if grep -q "i18n-loader.js.*i18n-loader.js" "$file"; then
        echo "🔧 Исправление $file"

        # Создать резервную копию
        cp "$file" "$file.before_fix"

        # Убрать дубликаты - оставить только одну строку
        sed -i '' 's|<script src="/i18n-loader.js"[^>]*></script><script src="/i18n-loader.js"[^>]*></script>|<script src="/i18n-loader.js?v=3" defer></script>|g' "$file"

        ((count++))
    fi
done

echo ""
echo "✅ Исправлено файлов: $count"
