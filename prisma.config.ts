import "dotenv/config";
import { defineConfig } from "prisma/config";

const dbUrl = process.env["DATABASE_URL"]
  ?? `postgresql://${process.env["DB_USER"]}:${process.env["DB_PASSWORD"]}@${process.env["DB_HOST"]}:${process.env["DB_PORT"]}/${process.env["DB_NAME"]}`;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: dbUrl,
  },
});
