#!/bin/bash
# Добавить i18n-loader.js во все HTML файлы с data-i18n атрибутами

echo "🔍 Поиск HTML файлов с data-i18n атрибутами..."

# Найти все файлы
files=$(grep -l "data-i18n=" */index.html */*/index.html 2>/dev/null)

count=0
for file in $files; do
    # Проверить, есть ли уже i18n-loader
    if grep -q "i18n-loader.js" "$file"; then
        echo "⏭️  Пропуск $file (уже есть i18n-loader)"
        continue
    fi

    # Добавить скрипт перед </body>
    if grep -q "</body>" "$file"; then
        # Создать резервную копию
        cp "$file" "$file.bak"

        # Добавить скрипт
        sed -i '' 's|</body>|<script src="/i18n-loader.js" defer></script>\n</body>|' "$file"

        echo "✅ Добавлено в $file"
        ((count++))
    else
        echo "⚠️  Предупреждение: </body> не найден в $file"
    fi
done

echo ""
echo "🎉 Готово! Обновлено файлов: $count"
echo ""
echo "📝 Резервные копии сохранены как *.bak"
echo "🌐 Откройте http://localhost:8000/index.html и нажмите Cmd+Shift+R"
