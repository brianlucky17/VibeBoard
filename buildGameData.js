/**
 * buildGameData.js
 * 
 * Script untuk otomatis merge semua file JSON per kelas & mapel
 * menjadi satu gameData.json yang digunakan aplikasi.
 * 
 * Struktur folder:
 *   src/data/
 *     kelas1/ ppkn.json, bi.json, mat.json, ...
 *     kelas2/ ppkn.json, bi.json, mat.json, ...
 *     ...
 *     gameData.json  <-- hasil merge (auto-generated)
 * 
 * Cara pakai:
 *   node buildGameData.js
 */

import fs   from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'src', 'data');
const OUTPUT   = path.join(DATA_DIR, 'gameData.json');
const SUBJECTS = ['ppkn', 'bi', 'mat', 'ipa', 'ips', 'eng', 'sen', 'pjok', 'tik'];
const GRADES   = [1, 2, 3, 4, 5, 6];

execFileSync(process.execPath, [path.join(__dirname, 'scripts', 'validate_cp.cjs')], {
  stdio: 'inherit',
});

let allGames = [];

GRADES.forEach(grade => {
  const gradeDir = path.join(DATA_DIR, `kelas${grade}`);
  if (!fs.existsSync(gradeDir)) return;

  SUBJECTS.forEach(subject => {
    const file = path.join(gradeDir, `${subject}.json`);
    if (!fs.existsSync(file)) return;

    try {
      const games = JSON.parse(fs.readFileSync(file, 'utf8'));
      allGames = allGames.concat(games);
      console.log(`  ✅ kelas${grade}/${subject}.json — ${games.length} game`);
    } catch (e) {
      console.error(`  ❌ Error parsing kelas${grade}/${subject}.json:`, e.message);
    }
  });
});

fs.writeFileSync(OUTPUT, JSON.stringify(allGames, null, 2), 'utf8');
console.log(`\n🎉 Total: ${allGames.length} game → gameData.json`);
