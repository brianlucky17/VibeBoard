import officialCpData from '../data/officialCp.json';

const normalizeKeyPart = (value) =>
  String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const normalizeCpText = (value) =>
  String(value || '')
    .normalize('NFKC')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

export const buildCpKey = ({ fase, mataPelajaran, subject, elemenCP }) =>
  [fase, mataPelajaran || subject, elemenCP].map(normalizeKeyPart).join('__');

const cpEntriesById = new Map(
  officialCpData.entries.map((entry) => [entry.id, entry])
);

const cpEntriesByText = new Map(
  officialCpData.entries.map((entry) => [normalizeCpText(entry.cp), entry])
);

export function getOfficialCp(record) {
  const entry = cpEntriesById.get(buildCpKey(record));
  return entry?.cp || '';
}

export function getOfficialCpEntry(record) {
  return cpEntriesById.get(buildCpKey(record)) || null;
}

export function getOfficialCpByText(cpText) {
  return cpEntriesByText.get(normalizeCpText(cpText))?.cp || '';
}

export function getOfficialCpMetadata() {
  return officialCpData.metadata;
}
