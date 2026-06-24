import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { readFileSync, writeFileSync } from 'node:fs';

export function renderDocx(
  templatePath: string,
  data: Record<string, unknown>,
  outputPath: string,
): void {
  const content = readFileSync(templatePath);
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip);
  doc.render(data);
  const buffer = doc.getZip().generate({ type: 'nodebuffer' });
  writeFileSync(outputPath, buffer);
}

export function renderDocxToBuffer(
  templatePath: string,
  data: Record<string, unknown>,
): Buffer {
  const content = readFileSync(templatePath);
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip);
  doc.render(data);
  return doc.getZip().generate({ type: 'nodebuffer' });
}
