# Сайт-карточка к годовщине

Статический сайт с главной страницей и отдельными страницами ключевых событий.

## Структура проекта

```text
.
|-- index.html
|-- assets/
|   |-- icons/
|   `-- images/
|       |-- events/
|       |   |-- favorite-trip/
|       |   |-- first-date/
|       |   `-- first-meeting/
|       |-- gallery/
|       `-- hero/
|-- content/
|   `-- site-content.js
|-- pages/
|   |-- favorite-trip.html
|   |-- first-date.html
|   `-- first-meeting.html
|-- scripts/
|   `-- main.js
`-- styles/
    |-- animations.css
    |-- base.css
    |-- event-page.css
    `-- sections.css
```

## Что редактировать

- Основные тексты и данные блоков: `content/site-content.js`
- Главная разметка: `index.html`
- Страницы событий: `pages/first-meeting.html`, `pages/first-date.html`, `pages/favorite-trip.html`
- Базовые стили (цвета, шрифты, отступы): `styles/base.css`
- Стили главной страницы: `styles/sections.css`
- Стили страниц событий: `styles/event-page.css`
- Анимации появления: `styles/animations.css`
- Рендер данных на главной: `scripts/main.js`

## Куда класть фото событий

- Первая встреча: `assets/images/events/first-meeting/`
- Первое свидание: `assets/images/events/first-date/`
- Любимое путешествие: `assets/images/events/favorite-trip/`

На каждой странице используются файлы:

- `main.jpg`
- `photo-01.jpg`
- `photo-02.jpg`
- `photo-03.jpg`

## Быстрый старт

Для локального просмотра:

```bash
python3 -m http.server 4173
```

Открой `http://localhost:4173`.
