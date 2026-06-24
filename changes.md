# Изменения: Модуль schedule (генерация расписания)

## 1. Новые зависимости

- `docxtemplater` — рендеринг docx по шаблону
- `pizzip` — ZIP-обработка docx
- `@types/pizzip` — типы

## 2. Утилита `src/utils/docx-renderer.ts`

Две функции:

### `renderDocx(templatePath, data, outputPath)`
Читает шаблон `.docx`, рендерит данные, сохраняет результат.

### `renderDocxToBuffer(templatePath, data)`
То же самое, но возвращает `Buffer` вместо записи в файл.

Шаблон использует синтаксис `{variable}` и `{#loop}{/loop}` (docxtemplater).

## 3. Новый модуль: `schedule`

### Эндпоинты `/api/v1/schedule`

#### `POST /api/v1/schedule/template` — admin (JWT)

`Content-Type: multipart/form-data`

| Поле | Тип | Описание |
|------|-----|----------|
| `file` | file (binary) | Файл шаблона `.docx`, макс. 10 MB |

Сохраняется как `schedule-template.docx` в директории `UPLOADS_DIR`.

**Ответ 201:** `{ "message": "Template uploaded successfully" }`
**Ответ 400:** если файл не передан.

#### `POST /api/v1/schedule/generate/:groupId` — admin/methodist (JWT)

Генерирует расписание для группы. Данные подставляются:

| Переменная шаблона | Источник |
|--------------------|----------|
| `{groupName}` | `group.name` |
| `{course}` | `group.curriculum.name` |
| `{dateFrom}` | `group.dateStart` (формат: "18 мая 2026") |
| `{dateTo}` | `group.dateEnd` (формат: "22 мая 2026") |
| `{#lessons}{day}` | "Понедельник 18.05.2026" |
| `{time}` | "12.00-14.00" (HH.mm-HH.mm) |
| `{topic}` | `topic.name` |
| `{type}` | `lessonType.name` |
| `{place}` | `classroom.name` |
| `{/lessons}` | — |

**Ответ 200** — бинарный `.docx` с `Content-Disposition: attachment; filename="schedule-group-{id}.docx"`.
**Ответ 400** — если шаблон не загружен.
**Ответ 404** — если группа не найдена.

