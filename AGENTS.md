# minskenergo-back

NestJS 11 API for учебный центр.

## Commands

| Action | Command |
|---|---|
| dev (watch) | `npm run start:dev` |
| build | `npm run build` (`nest build`) |
| lint | `npm run lint` (ESLint flat config + fix) |
| format | `npm run format` (Prettier — singleQuote, trailingComma: all) |
| prisma generate | `npm run prisma:generate` |
| prisma studio | `npm run prisma:studio` |
| prisma seed | `npm run prisma:seed` |
| prisma migrate dev | `npx prisma migrate dev --name <name>` |

## Conventions & gotchas

- **Module resolution**: tsconfig uses `nodenext` — local imports need `.js` extension. Always use `nest build` / `nest start`, never `tsc` directly.
- **ESLint**: flat config (`eslint.config.mjs`). All `no-unsafe-*` rules are `warn` only, `no-explicit-any` is off. Prettier integrated with `endOfLine: "auto"`.
- **TypeScript**: `strictNullChecks: true`, `noImplicitAny: false`. Decorators enabled (`emitDecoratorMetadata`, `experimentalDecorators`).
- **Build output**: `./dist`, cleaned before each build (`deleteOutDir: true`).
- **Entrypoint**: `src/main.ts` — listens on `process.env.PORT ?? 3000`, CORS origin from `CORS_ORIGIN` env, global `ValidationPipe` + `HttpExceptionFilter`.

## Prisma

- **Provider**: PostgreSQL. Config in `prisma.config.ts` constructs `DATABASE_URL` from `DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME`.
- **Client output**: `generated/prisma/` (gitignored — regenerate after schema changes).
- **NestJS integration**: `PrismaModule` (`@Global()`) + `PrismaService` (uses `@prisma/adapter-pg`, connects on module init).
- Import PrismaClient as `from '../../generated/prisma/client.js'` (`.js` suffix required by `nodenext`).
- Prisma 7 requires an adapter (`PrismaPg`) — passed in the `PrismaService` constructor.

## Architecture

```
src/
├── main.ts
├── app.module.ts
├── prisma/          # PrismaModule + PrismaService (global)
├── auth/            # JWT auth (login, me)
├── common/          # Guards, decorators, filters
└── modules/
    ├── users/           # CRUD users (admin only)
    ├── groups/          # CRUD groups + public schedule endpoint
    ├── lessons/         # CRUD lessons (admin/methodist)
    ├── curriculums/     # CRUD учебные программы + many-to-many с темами
    ├── classrooms/      # CRUD справочник аудиторий
    ├── topics/          # CRUD справочник тем
    ├── lesson-types/    # CRUD справочник видов занятий
    ├── departments/     # public GET + admin CRUD
    ├── contacts/        # public GET + admin PUT
    ├── appeal-info/     # public GET, admin PUT (3 статьи об обращениях граждан)
    ├── about-sections/  # public GET + admin CRUD
    ├── images/          # public GET, admin POST/DELETE (файлы в UPLOADS_DIR)
    ├── schedule/        # admin/methodist POST generate (docx)
    ├── slides/          # public GET, admin CRUD (слайды на главной)
    ├── warnings/        # public GET, admin/methodist CRUD
    └── appeals/         # public POST + admin GET/PUT/DELETE
```

## API

- **Base URL**: `/api/v1`
- **Public** (no auth): groups list, group schedule, curriculums list+item, departments, contacts, about, images list, appeals POST
- **Auth**: JWT Bearer token via `POST /auth/login`. Guards: `JwtAuthGuard` + `RolesGuard` with roles `admin` / `methodist`.
- **Users**: admin-only password hashing (bcrypt, 10 rounds).
- **Lessons**: time fields use Prisma `DateTime @db.Time` — construct as `new Date("2000-01-01T{HH:mm}:00")`.
- **Error format**: `{ error: string, code: number }`.
- **Contacts**: single-row table, public GET returns snake_case keys.

## Auth

- JWT config: secret from `JWT_SECRET` env, 24h expiry.
- Passport strategy: `passport-jwt`, extracts from `Authorization: Bearer <token>`.
- Role check: `@Roles('admin')` or `@Roles('admin', 'methodist')` with `@UseGuards(JwtAuthGuard, RolesGuard)`.
