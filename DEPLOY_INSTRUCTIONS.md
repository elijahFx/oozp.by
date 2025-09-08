# Инструкция по развертыванию сайта на hb.by

## Важно! Требования к хостингу

Ваш сайт использует Next.js с Server-Side Rendering (SSR), что требует:
- **Поддержки Node.js** на хостинге
- **Возможности запуска серверных приложений**
- **Доступа к командной строке** (SSH или панель управления)

## Шаг 1: Проверка поддержки Node.js

1. Войдите в панель управления hb.by
2. Проверьте, поддерживает ли ваш тарифный план Node.js
3. Если поддержки нет, обратитесь в службу поддержки или рассмотрите VPS

## Шаг 2: Подготовка проекта

### На локальной машине:

```bash
# Установите зависимости
npm install

# Соберите проект для продакшена
npm run build

# Проверьте, что сборка прошла успешно
npm start
```

## Шаг 3: Загрузка файлов на сервер

Загрузите следующие файлы и папки на сервер:

### Обязательные файлы:
- `package.json`
- `package-lock.json`
- `next.config.js`
- `tailwind.config.ts`
- `tsconfig.json`
- `postcss.config.js`
- `components.json`
- `.eslintrc.json`

### Обязательные папки:
- `.next/` (результат сборки)
- `public/` (статические ресурсы)
- `app/` (страницы приложения)
- `components/` (компоненты)
- `lib/` (библиотеки)
- `hooks/` (хуки)
- `api/` (API роуты)

### Дополнительные файлы:
- `ecosystem.config.js` (для PM2)
- `.htaccess` (для Apache)

## Шаг 4: Установка зависимостей на сервере

```bash
# Установите только продакшн зависимости
npm install --production

# Или установите все зависимости
npm install
```

## Шаг 5: Запуск приложения

### Вариант 1: Простой запуск
```bash
npm start
```

### Вариант 2: С PM2 (рекомендуется)
```bash
# Установите PM2 глобально
npm install -g pm2

# Запустите приложение
pm2 start ecosystem.config.js

# Сохраните конфигурацию PM2
pm2 save
pm2 startup
```

## Шаг 6: Настройка веб-сервера

### Для Apache (.htaccess уже создан):
Файл `.htaccess` настроен для проксирования запросов к Next.js приложению.

### Для Nginx:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Шаг 7: Проверка работы

1. Откройте ваш сайт в браузере
2. Проверьте, что все страницы загружаются
3. Проверьте API роуты: `/api/articles`, `/api/legal-documents`
4. Проверьте динамические страницы: `/news/[slug]`, `/legal-documents/[id]`

## Возможные проблемы и решения

### Проблема: "Cannot find module"
**Решение:** Убедитесь, что все зависимости установлены:
```bash
npm install
```

### Проблема: "Port 3000 is already in use"
**Решение:** Измените порт в `ecosystem.config.js` или остановите другие процессы.

### Проблема: API не работает
**Решение:** Проверьте, что приложение запущено и проксирование настроено правильно.

### Проблема: Статические файлы не загружаются
**Решение:** Убедитесь, что папка `public/` загружена на сервер.

## Мониторинг и обслуживание

### Просмотр логов:
```bash
# С PM2
pm2 logs oozp-website

# Без PM2
npm start
```

### Перезапуск приложения:
```bash
# С PM2
pm2 restart oozp-website

# Без PM2
# Остановите процесс (Ctrl+C) и запустите снова
npm start
```

### Обновление сайта:
1. Загрузите новые файлы
2. Пересоберите проект: `npm run build`
3. Перезапустите приложение

## Контакты для поддержки

Если у вас возникли проблемы:
1. Обратитесь в службу поддержки hb.by
2. Проверьте логи приложения
3. Убедитесь, что все файлы загружены правильно

---

**Примечание:** Если hb.by не поддерживает Node.js, рассмотрите альтернативы:
- VPS с поддержкой Node.js
- Vercel (бесплатно для Next.js)
- Netlify
- DigitalOcean App Platform
