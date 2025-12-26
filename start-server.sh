#!/bin/bash

# Простой HTTP сервер для тестирования i18n
echo "======================================"
echo "Healthcare Web - Local Test Server"
echo "======================================"
echo ""
echo "Запуск веб-сервера на http://localhost:8000"
echo ""
echo "Откройте в браузере:"
echo "  - http://localhost:8000/test-i18n.html (тестовая страница)"
echo "  - http://localhost:8000/index.html (главная страница)"
echo ""
echo "Для остановки нажмите Ctrl+C"
echo ""
echo "======================================"

# Запуск Python HTTP сервера
python3 -m http.server 8000
