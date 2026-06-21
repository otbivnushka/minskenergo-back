import { join, isAbsolute } from 'node:path';

export function getUploadsDir(): string {
  const raw = process.env['UPLOADS_DIR'] ?? 'uploads';
  return isAbsolute(raw) ? raw : join(process.cwd(), raw);
}
