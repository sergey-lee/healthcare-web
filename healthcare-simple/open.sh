#!/bin/bash
echo "🏥 Healthcare Website - Полная копия WordPress"
echo "==============================================="
echo ""
echo "Запускаю сервер..."
cd "$(dirname "$0")"
python3 -m http.server 8000 &
SERVER_PID=$!
sleep 2
echo ""
echo "✅ Сервер запущен!"
echo "📂 URL: http://localhost:8000"
echo ""
echo "Открываю браузер..."
open http://localhost:8000 2>/dev/null || xdg-open http://localhost:8000 2>/dev/null || echo "Откройте вручную: http://localhost:8000"
echo ""
echo "Нажмите Ctrl+C чтобы остановить сервер"
wait $SERVER_PID
