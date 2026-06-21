# Изменения: Изображения (images)

## 1. Новая таблица в БД

### `images`

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | Int (PK, автоинкремент) | |
| `filename` | VarChar(500) | Уникальное имя файла на диске (`uuid.ext`) |
| `original_name` | VarChar(500) | Оригинальное имя файла |
| `created_at` | Timestamptz | Дата загрузки |

SQL: `CREATE TABLE images (...)` (через Prisma migrate)

## 2. Новые эндпоинты: `/api/v1/images`

### `GET /api/v1/images` — публичный

**Ответ 200:**
```json
[
  {
    "id": 1,
    "filename": "550e8400-e29b-41d4-a716-446655440000.jpg",
    "originalName": "photo.jpg",
    "url": "/uploads/550e8400-e29b-41d4-a716-446655440000.jpg",
    "createdAt": "2026-06-20T12:00:00.000Z"
  }
]
```

### `POST /api/v1/images` — admin (JWT)

`Content-Type: multipart/form-data`

| Поле | Тип | Описание |
|------|-----|----------|
| `file` | file (binary) | Файл изображения, макс. 10 MB |

**Ответ 201:**
```json
{
  "id": 1,
  "filename": "550e8400-...jpg",
  "originalName": "photo.jpg",
  "url": "/uploads/550e8400-...jpg",
  "createdAt": "2026-06-20T12:00:00.000Z"
}
```

**Ответ 400:** если файл не передан.

### `DELETE /api/v1/images/:id` — admin (JWT)

Удаляет файл с диска и запись из БД.

**Ответ 200.**
**404** если не найдено.

### Статическая раздача

Файлы доступны по `GET /uploads/{filename}` — без авторизации (просмотр по прямой ссылке).

## 3. Конфигурация

- **Переменная окружения:** `UPLOADS_DIR` (по умолчанию `./uploads`)
- Директория создаётся автоматически при первом запросе на загрузку
- Директория добавлена в `.gitignore`

## 4. Изменённые файлы

| Файл | Изменение |
|------|-----------|
| `prisma/schema.prisma` | Добавлена модель `Image` |
| `src/main.ts` | Типизирован как `NestExpressApplication`, добавлена статическая раздача `/uploads` |
| `src/modules/images/` | Новый модуль (controller, service, module) |
| `src/app.module.ts` | Добавлен импорт `ImagesModule` |
| `.gitignore` | Добавлена директория `/uploads` |

---

# Изменения: Слайды (slides)

## 1. Реализован модуль `slides`

Модуль существовал как заглушка (пустые controller/service, `@Module({})`). Добавлена полная CRUD-реализация.

### Эндпоинты `/api/v1/slides`

| Метод | Путь | Auth | Описание |
|-------|------|------|----------|
| `GET` | `/slides` | public | Список слайдов |
| `GET` | `/slides/:id` | public | Один слайд |
| `POST` | `/slides` | admin | Создать |
| `PUT` | `/slides/:id` | admin | Обновить |
| `DELETE` | `/slides/:id` | admin | Удалить |

### `POST /api/v1/slides` — admin (JWT)

**Body:**
```json
{
  "title": "Заголовок",
  "subtitle": "Подзаголовок",
  "imageId": 1
}
```

**Ответ 201** — созданный слайд с включённым объектом `image`.

### `PUT /api/v1/slides/:id` — admin (JWT)

**Body:** любые поля из CreateSlideDto (все опциональны через `PartialType`).

**Ответ 200** — обновлённый слайд с `image`.
**404** если не найден.

### `DELETE /api/v1/slides/:id` — admin (JWT)

**Ответ 200.**
**404** если не найден.

## 2. Исправления

- **`create-slide.dto.ts`**: поле `description` переименовано в `subtitle` (приведено к Prisma-модели), `imageId` исправлен с `string` на `number`
- **`app.module.ts`**: исправлен импорт модуля (добавлено расширение `.js`)

---