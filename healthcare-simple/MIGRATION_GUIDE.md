# Руководство по миграции с WordPress на чистый HTML/CSS/JS

## 📋 Обзор

Этот документ описывает процесс миграции healthcare website с WordPress на простую HTML/CSS/JS структуру.

## 🔄 Что было изменено

### Удалено из WordPress версии:

| Компонент | WordPress | Новая версия |
|-----------|-----------|--------------|
| Backend | PHP + MySQL | Только статика |
| Тема | Salient Premium Theme | Vanilla CSS |
| Плагины | 5+ плагинов | Чистый JavaScript |
| Размер | ~89 MB | ~2-5 MB |
| Зависимости | WordPress 6.8.3 | Нет зависимостей |

### Сохранено:

✅ **Система i18n** - Полностью перенесена со всеми 483 строками переводов
✅ **Структура навигации** - Все меню и подменю
✅ **Дизайн** - Адаптивный, современный дизайн
✅ **Функционал** - Основные функции сайта
✅ **Контент** - Весь текстовый контент через i18n

## 🔧 Технические изменения

### 1. Стили (CSS)

**Было (WordPress):**
```html
<!-- Множество CSS файлов WordPress -->
<link rel="stylesheet" href="wp-includes/css/dist/block-library/style.min.css">
<link rel="stylesheet" href="wp-content/themes/salient/css/build/style.css">
<link rel="stylesheet" href="wp-content/plugins/contact-form-7/includes/css/styles.css">
<!-- + еще 15+ файлов CSS -->
```

**Стало:**
```html
<!-- Всего 5 организованных CSS файлов -->
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/header.css">
<link rel="stylesheet" href="css/footer.css">
<link rel="stylesheet" href="css/responsive.css">
```

### 2. JavaScript

**Было (WordPress):**
```html
<!-- WordPress core JS -->
<script src="wp-includes/js/wp-emoji-release.min.js"></script>
<!-- jQuery -->
<script src="wp-includes/js/jquery/jquery.min.js"></script>
<!-- Множество плагинов -->
<script src="wp-content/themes/salient/js/init.js"></script>
<!-- + еще 20+ файлов JS -->
```

**Стало:**
```html
<!-- Всего 4 простых JS файла -->
<script src="js/i18n-loader.js"></script>
<script src="js/lang-switcher.js"></script>
<script src="js/main.js"></script>
<script src="js/navigation.js"></script>
```

### 3. HTML структура

**Было (WordPress):**
```php
<?php get_header(); ?>
<?php while (have_posts()) : the_post(); ?>
    <h1><?php the_title(); ?></h1>
    <?php the_content(); ?>
<?php endwhile; ?>
<?php get_footer(); ?>
```

**Стало:**
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <!-- Clean, simple meta tags -->
</head>
<body>
    <header id="main-header">
        <!-- Static header -->
    </header>
    <main>
        <!-- Content -->
    </main>
    <footer id="main-footer">
        <!-- Static footer -->
    </footer>
</body>
</html>
```

## 📊 Сравнение производительности

| Метрика | WordPress | Новая версия | Улучшение |
|---------|-----------|--------------|-----------|
| Размер страницы | ~500KB | ~50KB | **10x меньше** |
| Время загрузки | ~2-3 сек | ~0.3-0.5 сек | **6x быстрее** |
| HTTP запросов | 40+ | 10-15 | **3x меньше** |
| JavaScript | ~300KB | ~50KB | **6x меньше** |
| CSS | ~200KB | ~30KB | **7x меньше** |

## 🎯 Пошаговая миграция контента

### Шаг 1: Подготовка

1. **Сделайте бэкап WordPress сайта**
```bash
# Экспортируйте базу данных
mysqldump -u user -p database > backup.sql

# Архивируйте файлы
tar -czf wordpress-backup.tar.gz /path/to/wordpress
```

2. **Экспортируйте контент**
- Тексты уже в `i18n_categorized.json`
- Скачайте изображения из `wp-content/uploads/`
- Сохраните важные настройки

### Шаг 2: Перенос изображений

```bash
# Из WordPress
cp -r wordpress/wp-content/uploads/* healthcare-simple/images/

# Оптимизируйте изображения
# Используйте imagemagick или онлайн сервисы
mogrify -resize 1920x1080\> -quality 85 images/*.jpg
```

### Шаг 3: Перенос страниц

Для каждой WordPress страницы:

1. **Откройте WordPress страницу в браузере**
2. **Скопируйте контент**
3. **Создайте новый HTML файл**
```html
<!-- pages/your-page.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Your Page</title>
    <!-- Include CSS -->
</head>
<body>
    <!-- Include header -->
    <!-- Your content -->
    <!-- Include footer -->
</body>
</html>
```

4. **Добавьте data-i18n атрибуты**
```html
<h1 data-i18n="page.title">Title</h1>
<p data-i18n="page.content">Content</p>
```

### Шаг 4: Формы

**WordPress Contact Form 7 → Vanilla JS**

Было:
```html
[contact-form-7 id="123" title="Contact form"]
```

Стало:
```html
<form id="contact-form">
    <input type="text" name="name" required>
    <input type="email" name="email" required>
    <textarea name="message" required></textarea>
    <button type="submit">Send</button>
</form>

<script>
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Handle form submission
    // Send to backend API or email service
});
</script>
```

**Варианты отправки:**
1. **Formspree** (бесплатно до 50 форм/месяц)
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

2. **EmailJS** (JavaScript email service)
```javascript
emailjs.send("service_id", "template_id", formData);
```

3. **Собственный backend**
```javascript
fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
});
```

### Шаг 5: Навигация

Обновите все ссылки:

**WordPress URL:**
```
https://example.com/portfolio/project-1/
```

**Новая структура:**
```
pages/portfolio.html#project-1
или
pages/project-1.html
```

### Шаг 6: SEO

1. **Перенесите мета-теги:**
```html
<meta name="description" content="Из WordPress SEO плагина">
<meta name="keywords" content="Ключевые слова">
```

2. **Настройте редиректы (.htaccess):**
```apache
# WordPress URL → Новый URL
Redirect 301 /old-page/ /pages/new-page.html
Redirect 301 /portfolio/project-1/ /pages/project-1.html
```

3. **Создайте sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://example.com/</loc>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://example.com/pages/contact.html</loc>
        <priority>0.8</priority>
    </url>
</urlset>
```

## 🔌 Замена WordPress плагинов

### Contact Form 7 → Vanilla JS + Email Service
```javascript
// Используйте Formspree, EmailJS, или свой backend
```

### Salient Portfolio → Простые HTML карточки
```html
<div class="portfolio-grid">
    <div class="portfolio-item">
        <img src="image.jpg" alt="Project">
        <h3>Project Name</h3>
    </div>
</div>
```

### WordPress Gallery → CSS Grid Gallery
```html
<div class="gallery">
    <img src="1.jpg" alt="Photo 1">
    <img src="2.jpg" alt="Photo 2">
</div>

<style>
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
}
</style>
```

## 🚀 Деплой новой версии

### Вариант 1: Замена на том же хостинге

```bash
# 1. Бэкап WordPress
mv public_html public_html_wordpress_backup

# 2. Загрузите новые файлы
mkdir public_html
# Upload healthcare-simple/* to public_html/

# 3. Настройте редиректы
# Создайте .htaccess с редиректами
```

### Вариант 2: Новый хостинг (Static)

**Netlify (Рекомендуется):**
```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Деплой
cd healthcare-simple
netlify deploy --prod
```

**GitHub Pages:**
```bash
# 1. Push в GitHub
git add .
git commit -m "Static site"
git push origin main

# 2. Settings → Pages → Source: main branch
```

**Vercel:**
```bash
npm i -g vercel
cd healthcare-simple
vercel --prod
```

## 📝 Checklist миграции

- [ ] Экспортирован весь контент
- [ ] Скачаны все изображения
- [ ] Созданы все необходимые страницы
- [ ] Настроены переводы i18n
- [ ] Формы работают
- [ ] Протестирована адаптивность
- [ ] Настроены редиректы
- [ ] Создан sitemap.xml
- [ ] Настроен robots.txt
- [ ] Проверены все ссылки
- [ ] Оптимизированы изображения
- [ ] Протестирована производительность
- [ ] Настроена аналитика
- [ ] Проведено SEO тестирование

## ⚠️ Важные замечания

### Что теряется при переходе с WordPress:

1. **Админ-панель** - Нет GUI для редактирования
   - Решение: Используйте CMS-lite (Netlify CMS, Forestry)

2. **Динамический контент** - Нет базы данных
   - Решение: Используйте headless CMS или API

3. **Комментарии** - Нет встроенной системы
   - Решение: Disqus, utterances, или собственный backend

4. **Поиск по сайту** - Нет встроенного поиска
   - Решение: Algolia, Lunr.js, или Google Custom Search

5. **Автоматические обновления** - Нужно обновлять вручную
   - Решение: Это и есть преимущество - больше контроля!

### Преимущества новой версии:

✅ **Безопасность** - Нет PHP уязвимостей
✅ **Скорость** - Статика грузится мгновенно
✅ **Стоимость** - Дешевле хостинг или бесплатно
✅ **Простота** - Понятный код
✅ **Надежность** - Меньше точек отказа
✅ **Масштабируемость** - CDN легко

## 🛠️ Дополнительные инструменты

### Для работы с формами:
- [Formspree](https://formspree.io/) - Email forms
- [EmailJS](https://www.emailjs.com/) - JS email service
- [Netlify Forms](https://www.netlify.com/products/forms/) - Built-in

### Для добавления CMS:
- [Netlify CMS](https://www.netlifycms.org/) - Git-based CMS
- [Forestry](https://forestry.io/) - Git-based CMS
- [Tina CMS](https://tina.io/) - Visual editing

### Для поиска:
- [Algolia](https://www.algolia.com/) - Powerful search
- [Lunr.js](https://lunrjs.com/) - Client-side search
- [Fuse.js](https://fusejs.io/) - Fuzzy search

### Для аналитики:
- [Google Analytics](https://analytics.google.com/)
- [Plausible](https://plausible.io/) - Privacy-focused
- [Fathom](https://usefathom.com/) - Simple analytics

## 📞 Поддержка

Если что-то не работает:

1. Проверьте консоль браузера (F12)
2. Убедитесь, что все пути к файлам корректны
3. Проверьте, что i18n файлы загружаются
4. Проверьте мобильную версию

---

**Успешной миграции! 🚀**
