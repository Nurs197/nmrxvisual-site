# РезервТех — демонстрационный проект NMRXVisual

Готовая статическая версия для GitHub Pages:
`https://nurs197.github.io/nmrxvisual-site/`

## Обновление существующего репозитория

1. Распакуйте архив.
2. Откройте папку `RezervTech_GitHub_Pages_Fixed`.
3. Загрузите **её содержимое**, а не саму папку и не ZIP-файл, в корень репозитория `nmrxvisual-site`.
4. Замените старые файлы. Папка `assets` должна лежать рядом с `index.html`.
5. Удалите из репозитория старый дубликат `favicon.svg` в корне, если он остался: актуальная иконка находится в `assets/icons/favicon.svg`.
6. В GitHub откройте `Settings → Pages`.
7. Оставьте публикацию из ветки `main` и папки `/ (root)`.
8. Дождитесь завершения публикации и откройте адрес сайта.

Создавать GitHub Pages заново и менять адрес репозитория не нужно.

## Правильная структура

```text
nmrxvisual-site/
├── index.html
├── 404.html
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── .nojekyll
└── assets/
    ├── css/styles.css
    ├── js/main.js
    ├── fonts/
    ├── icons/favicon.svg
    └── images/
```

Основные пути в `index.html` начинаются с `./assets/`. Пути внутри CSS
рассчитываются относительно файла `assets/css/styles.css`, поэтому шрифты и
изображения подключаются через `../fonts/` и `../images/`.

## Контакты автора

- WhatsApp: +7 995 647-88-91
- Email: levigarant26@gmail.com

Форма не требует сервера: после проверки полей она открывает WhatsApp с
подготовленным сообщением. Электронная почта открывается через `mailto:`.
