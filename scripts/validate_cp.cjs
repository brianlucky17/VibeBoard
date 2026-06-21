const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');
const officialCpPath = path.join(dataDir, 'officialCp.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normalizeKeyPart(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildCpKey(record) {
  return [
    record.fase,
    record.mataPelajaran || record.subject,
    record.elemenCP,
  ].map(normalizeKeyPart).join('__');
}

function normalizeCpText(value) {
  return String(value || '')
    .normalize('NFKC')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function collectGameFiles(dir) {
  const files = [];

  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...collectGameFiles(fullPath));
      continue;
    }

    if (/src[\\/]data[\\/]kelas\d+[\\/][^\\/]+\.json$/.test(fullPath)) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

function findDuplicateOfficialKeys(entries) {
  const seen = new Set();
  const duplicates = new Set();

  for (const entry of entries) {
    if (seen.has(entry.id)) duplicates.add(entry.id);
    seen.add(entry.id);
  }

  return [...duplicates];
}

const officialCp = readJson(officialCpPath);
const duplicateKeys = findDuplicateOfficialKeys(officialCp.entries || []);
const officialById = new Map((officialCp.entries || []).map((entry) => [entry.id, entry]));
const officialByText = new Map(
  (officialCp.entries || []).map((entry) => [normalizeCpText(entry.cp), entry])
);
const errors = [];
let checked = 0;

if (duplicateKeys.length > 0) {
  errors.push(`Duplicate official CP keys: ${duplicateKeys.join(', ')}`);
}

for (const filePath of collectGameFiles(dataDir)) {
  const games = readJson(filePath);
  const relativeFile = path.relative(rootDir, filePath);

  games.forEach((game, index) => {
    checked += 1;

    const key = buildCpKey(game);
    const official = officialById.get(key);
    const label = `${relativeFile}[${index}] ${game.id || game.title || '(tanpa id)'}`;

    if (!official) {
      errors.push(`${label}: CP resmi tidak ditemukan untuk key "${key}".`);
      return;
    }

    if (normalizeCpText(game.cp) !== normalizeCpText(official.cp)) {
      errors.push(`${label}: teks CP berbeda dari officialCp.json untuk key "${key}".`);
    }
  });
}

const vrDataPath = path.join(dataDir, 'vrSubjectsData.js');
if (fs.existsSync(vrDataPath)) {
  const vrData = fs.readFileSync(vrDataPath, 'utf8');
  const cpRegex = /cp:\s*(['"`])([\s\S]*?)\1\s*,/g;
  let match;
  let vrCpCount = 0;

  while ((match = cpRegex.exec(vrData)) !== null) {
    vrCpCount += 1;
    checked += 1;

    if (!officialByText.has(normalizeCpText(match[2]))) {
      errors.push(`src/data/vrSubjectsData.js CP #${vrCpCount}: teks CP tidak ditemukan di officialCp.json.`);
    }
  }
}

if (errors.length > 0) {
  console.error('\nValidasi CP gagal. CP harus sama dengan database resmi Kepka BSKAP No. 046/H/KR/2025.\n');
  errors.slice(0, 30).forEach((error) => console.error(`- ${error}`));
  if (errors.length > 30) {
    console.error(`- ... ${errors.length - 30} error lainnya`);
  }
  process.exit(1);
}

console.log(`Validasi CP berhasil: ${checked} game cocok dengan ${officialById.size} entri CP resmi.`);
