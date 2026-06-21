const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const TARGET_COUNT = 5;

const fallbackPairs = [
  ['auto_konsep', 'Konsep utama', 'Materi utama yang dipelajari'],
  ['auto_contoh', 'Contoh tepat', 'Contoh yang sesuai materi'],
  ['auto_manfaat', 'Manfaat belajar', 'Kegunaan materi dalam kehidupan'],
  ['auto_praktik', 'Latihan mandiri', 'Kegiatan untuk memahami materi'],
  ['auto_kesimpulan', 'Kesimpulan', 'Ringkasan hasil belajar'],
];

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

function uniqueId(base, usedIds) {
  let candidate = base.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '') || 'item';
  let suffix = 2;

  while (usedIds.has(candidate)) {
    candidate = `${base}_${suffix}`.replace(/[^a-zA-Z0-9_-]+/g, '_');
    suffix += 1;
  }

  usedIds.add(candidate);
  return candidate;
}

function buildItemLookup(items) {
  return new Map(items.map((item) => [item.matchId || item.id, item]));
}

function targetPairsFromGame(game) {
  const items = Array.isArray(game.draggableItems) ? game.draggableItems : [];
  const itemLookup = buildItemLookup(items);
  const pairs = [];
  const usedMatchIds = new Set();

  for (const target of game.droppableTargets || []) {
    const correctIds = target.correctItems || (target.correctItem ? [target.correctItem] : []);

    for (const correctId of correctIds) {
      if (usedMatchIds.has(correctId)) continue;

      const item = itemLookup.get(correctId);
      if (!item) continue;

      pairs.push({
        item: { ...item, matchId: item.matchId },
        targetLabel: target.correctItems
          ? `${target.label}: ${item.label}`
          : target.label,
        targetImage: target.image,
      });
      usedMatchIds.add(correctId);
    }
  }

  for (const item of items) {
    const matchId = item.matchId || item.id;
    if (usedMatchIds.has(matchId)) continue;

    pairs.push({
      item: { ...item, matchId: item.matchId },
      targetLabel: `Pasangkan: ${item.label}`,
      targetImage: item.image,
    });
    usedMatchIds.add(matchId);
  }

  return pairs;
}

function addFallbackPairs(game, pairs) {
  const usedItemIds = new Set(pairs.map(({ item }) => item.id));
  const grade = game.grade || 'x';
  const subject = String(game.subject || game.mataPelajaran || 'mapel').toLowerCase();

  for (const [baseId, itemLabel, targetLabel] of fallbackPairs) {
    if (pairs.length >= TARGET_COUNT) break;

    const id = uniqueId(`${baseId}_${grade}_${subject}`, usedItemIds);
    pairs.push({
      item: {
        id,
        label: itemLabel,
        matchId: id,
      },
      targetLabel,
      targetImage: undefined,
    });
  }
}

function normalizeGame(game) {
  const pairs = targetPairsFromGame(game);
  addFallbackPairs(game, pairs);

  const selectedPairs = pairs.slice(0, TARGET_COUNT);
  const usedTargetIds = new Set();

  game.draggableItems = selectedPairs.map(({ item }) => {
    const normalized = { ...item };
    if (normalized.matchId === normalized.id || normalized.matchId == null) {
      delete normalized.matchId;
    }
    return normalized;
  });

  game.droppableTargets = selectedPairs.map(({ item, targetLabel, targetImage }, index) => {
    const targetId = uniqueId(`t_${item.id}`, usedTargetIds);
    const target = {
      id: targetId,
      label: targetLabel,
      correctItem: item.matchId || item.id,
    };

    if (targetImage) {
      target.image = targetImage;
    }

    return target;
  });
}

let changedFiles = 0;
let changedGames = 0;

for (const filePath of collectGameFiles(DATA_DIR)) {
  const before = fs.readFileSync(filePath, 'utf8');
  const games = JSON.parse(before);

  for (const game of games) {
    const oldItemCount = Array.isArray(game.draggableItems) ? game.draggableItems.length : 0;
    const oldTargetCount = Array.isArray(game.droppableTargets) ? game.droppableTargets.length : 0;

    normalizeGame(game);

    if (oldItemCount !== TARGET_COUNT || oldTargetCount !== TARGET_COUNT) {
      changedGames += 1;
    }
  }

  const after = `${JSON.stringify(games, null, 2)}\n`;
  if (after !== before) {
    fs.writeFileSync(filePath, after, 'utf8');
    changedFiles += 1;
  }
}

console.log(`Selesai: ${changedGames} game dinormalisasi menjadi ${TARGET_COUNT} item dan ${TARGET_COUNT} kotak target di ${changedFiles} file.`);
