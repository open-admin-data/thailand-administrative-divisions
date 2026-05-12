/**
 * build.js — Thailand Administrative Divisions static generator
 * Reads source data from thai-data-core/data/thai-geography.json and generates:
 *   - data/ aggregate files (JSON, NDJSON, CSV, hierarchy)
 *   - divisions/ hierarchy with README.md + data files per level
 *   - docs/ AI-friendly files (llms.txt, llms-full per province)
 *   - Root README.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Configuration ===
const SOURCE_FILE = path.resolve(__dirname, '../../thai-data-core/data/thai-geography.json');
const VILLAGES_DIR = path.resolve(__dirname, '../../Villages_Thailand');
const OUTPUT_DIR = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const AI_CONTENT_DIR = path.join(__dirname, 'ai-content');

const GITHUB_ORG = 'open-admin-data';
const GITHUB_REPO = 'thailand-administrative-divisions';
const GITHUB_USER = 'jakkrapongt';
const GITHUB_RAW = `https://raw.githubusercontent.com/${GITHUB_ORG}/${GITHUB_REPO}/main`;
const GITHUB_URL = `https://github.com/${GITHUB_ORG}/${GITHUB_REPO}`;
const TODAY = new Date().toISOString().split('T')[0];

// ThaiAddress.org URL slug format: {name-slug}-{id}
function thaiAddressSlug(nameEn, id) {
  const slug = nameEn
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug}-${id}`;
}

// Region mapping (source uses English lowercase keys)
const REGION_MAP = {
  'central':   { th: 'ภาคกลาง', en: 'Central' },
  'north':     { th: 'ภาคเหนือ', en: 'Northern' },
  'northeast': { th: 'ภาคตะวันออกเฉียงเหนือ', en: 'Northeastern' },
  'east':      { th: 'ภาคตะวันออก', en: 'Eastern' },
  'west':      { th: 'ภาคตะวันตก', en: 'Western' },
  'south':     { th: 'ภาคใต้', en: 'Southern' },
};

// === Utilities ===
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function renderTemplate(name, data) {
  const tplPath = path.join(TEMPLATES_DIR, `${name}.ejs`);
  const tpl = fs.readFileSync(tplPath, 'utf8');
  return ejs.render(tpl, data, { filename: tplPath });
}

function loadAiContent(filename) {
  const p = path.join(AI_CONTENT_DIR, filename);
  if (fs.existsSync(p)) return fs.readFileSync(p, 'utf8').trim();
  return '';
}

function csvEscape(val) {
  if (val == null) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

// === Step 1: Load source data ===
console.log('Step 1: Loading source data...');

if (!fs.existsSync(SOURCE_FILE)) {
  console.error(`\nSource data not found: ${SOURCE_FILE}`);
  console.error('Expected thai-data-core/data/thai-geography.json relative to project root.');
  process.exit(1);
}

const geo = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
console.log(`  Provinces: ${geo.provinces.length}, Districts: ${geo.districts.length}, Subdistricts: ${geo.subdistricts.length}`);

// === Step 2: Compute relationships ===
console.log('Step 2: Computing relationships...');

// Build province records
const provincesMap = new Map();
for (const p of geo.provinces) {
  const slug = createSlug(p.name_en);
  const region = REGION_MAP[p.region] || { th: p.region, en: p.region };
  provincesMap.set(p.id, {
    id: p.id,
    level: 1,
    level_name: { th: 'จังหวัด', en: 'province' },
    name: { th: p.name_th, en: p.name_en, slug },
    code: {
      dopa: p.id,
      iso: `TH-${p.id}`,
    },
    parent: null,
    ancestors: [],
    children_count: { districts: 0, subdistricts: 0, villages: 0 },
    metadata: {
      is_special_province: p.id === '10', // Bangkok
      region,
    },
    geo: { lat: p.lat || null, lon: p.lon || null },
    source: { url: `https://thaiaddress.org/province/${thaiAddressSlug(p.name_en, p.id)}/` },
  });
}

// Build district records
const districtsMap = new Map();
for (const d of geo.districts) {
  const slug = createSlug(d.name_en);
  const province = provincesMap.get(d.province_id);
  const isBangkok = d.province_id === '10';
  districtsMap.set(d.id, {
    id: d.id,
    level: 2,
    level_name: { th: isBangkok ? 'เขต' : 'อำเภอ', en: 'district' },
    name: { th: d.name_th, en: d.name_en, slug },
    code: { dopa: d.id },
    parent: province ? {
      id: province.id,
      level: 1,
      name: { ...province.name },
    } : null,
    ancestors: province ? [{
      id: province.id,
      level: 1,
      name: { ...province.name },
    }] : [],
    children_count: { subdistricts: 0, villages: 0 },
    metadata: { is_special_province: isBangkok },
    geo: { lat: d.lat || null, lon: d.lon || null },
    source: { url: `https://thaiaddress.org/district/${thaiAddressSlug(d.name_en, d.id)}/` },
  });
}

// Build subdistrict records
const subdistrictsMap = new Map();
for (const s of geo.subdistricts) {
  const slug = createSlug(s.name_en);
  const province = provincesMap.get(s.province_id);
  const district = districtsMap.get(s.district_id);
  const isBangkok = s.province_id === '10';
  subdistrictsMap.set(s.id, {
    id: s.id,
    level: 3,
    level_name: { th: isBangkok ? 'แขวง' : 'ตำบล', en: 'subdistrict' },
    name: { th: s.name_th, en: s.name_en, slug },
    code: { dopa: s.id },
    parent: district ? {
      id: district.id,
      level: 2,
      name: { ...district.name },
    } : null,
    ancestors: [
      ...(province ? [{ id: province.id, level: 1, name: { ...province.name } }] : []),
      ...(district ? [{ id: district.id, level: 2, name: { ...district.name } }] : []),
    ],
    children_count: { villages: 0 },
    zip_codes: s.zip_code ? [s.zip_code] : [],
    metadata: { is_special_province: isBangkok },
    geo: { lat: s.lat || null, lon: s.lon || null },
    source: { url: `https://thaiaddress.org/subdistrict/${thaiAddressSlug(s.name_en, s.id)}/` },
  });
}

// Load village name mapping from Ahoerstemeier/tambon (Thai + English)
const VILLAGE_NAMES_FILE = path.join(__dirname, 'village-names-tambon.json');
const villageNamesMap = fs.existsSync(VILLAGE_NAMES_FILE)
  ? JSON.parse(fs.readFileSync(VILLAGE_NAMES_FILE, 'utf8'))
  : {};
console.log(`  Village names (tambon) loaded: ${Object.keys(villageNamesMap).length}`);

// Load AI-generated transliteration for villages not in tambon
const VILLAGE_AI_FILE = path.join(__dirname, 'village-names-ai.json');
const villageAiMap = fs.existsSync(VILLAGE_AI_FILE)
  ? JSON.parse(fs.readFileSync(VILLAGE_AI_FILE, 'utf8'))
  : {};
console.log(`  Village names (AI transliteration) loaded: ${Object.keys(villageAiMap).length}`);

// Load village data from Villages_Thailand (ChangSittikon)
console.log('  Loading village data...');
const villagesMap = new Map();
if (fs.existsSync(VILLAGES_DIR)) {
  const vilFiles = fs.readdirSync(VILLAGES_DIR).filter(f => f.startsWith('villages_') && f.endsWith('.json'));
  for (const f of vilFiles) {
    const vilData = JSON.parse(fs.readFileSync(path.join(VILLAGES_DIR, f), 'utf8'));
    for (const v of vilData) {
      if (!v.mcode) continue;
      // Derive subdistrict ID from mcode (first 6 digits)
      const subdistrictId = v.mcode.substring(0, 6);
      const subdistrict = subdistrictsMap.get(subdistrictId);
      if (!subdistrict) continue;
      const province = subdistrict.ancestors.find(a => a.level === 1);
      const district = subdistrict.ancestors.find(a => a.level === 2);
      const slug = createSlug(v.mcode);
      villagesMap.set(v.mcode, {
        id: v.mcode,
        level: 4,
        level_name: { th: 'หมู่บ้าน', en: 'village' },
        name: {
          th: villageNamesMap[v.mcode]?.th || v.mname || '',
          en: villageNamesMap[v.mcode]?.en || villageAiMap[v.mcode] || '',
          slug,
        },
        code: { dopa: v.mcode },
        parent: {
          id: subdistrict.id,
          level: 3,
          name: { ...subdistrict.name },
        },
        ancestors: [
          ...(province ? [{ id: province.id, level: province.level, name: { ...province.name } }] : []),
          ...(district ? [{ id: district.id, level: district.level, name: { ...district.name } }] : []),
          { id: subdistrict.id, level: 3, name: { ...subdistrict.name } },
        ],
        children_count: {},
        metadata: {},
        geo: {
          lat: v.oct_side15_lat || null,
          lon: v.oct_side15_lon || null,
        },
        source: {},
      });
    }
  }
}

// Convert to sorted arrays
const provinces = [...provincesMap.values()].sort((a, b) => a.id.localeCompare(b.id));
const districts = [...districtsMap.values()].sort((a, b) => a.id.localeCompare(b.id));
const subdistricts = [...subdistrictsMap.values()].sort((a, b) => a.id.localeCompare(b.id));
const villages = [...villagesMap.values()].sort((a, b) => a.id.localeCompare(b.id));

// Compute children counts (bottom-up)
const villagesBySubdistrict = new Map();
for (const v of villages) {
  if (!v.parent) continue;
  const key = v.parent.id;
  if (!villagesBySubdistrict.has(key)) villagesBySubdistrict.set(key, []);
  villagesBySubdistrict.get(key).push(v);
}

for (const s of subdistricts) {
  s.children_count.villages = (villagesBySubdistrict.get(s.id) || []).length;
}

const subdistrictsByDistrict = new Map();
for (const s of subdistricts) {
  if (!s.parent) continue;
  const key = s.parent.id;
  if (!subdistrictsByDistrict.has(key)) subdistrictsByDistrict.set(key, []);
  subdistrictsByDistrict.get(key).push(s);
}

for (const d of districts) {
  const subs = subdistrictsByDistrict.get(d.id) || [];
  d.children_count.subdistricts = subs.length;
  d.children_count.villages = subs.reduce((sum, s) => sum + s.children_count.villages, 0);
}

const districtsByProvince = new Map();
for (const d of districts) {
  if (!d.parent) continue;
  const key = d.parent.id;
  if (!districtsByProvince.has(key)) districtsByProvince.set(key, []);
  districtsByProvince.get(key).push(d);
}

for (const p of provinces) {
  const dists = districtsByProvince.get(p.id) || [];
  p.children_count.districts = dists.length;
  p.children_count.subdistricts = dists.reduce((sum, d) => sum + d.children_count.subdistricts, 0);
  p.children_count.villages = dists.reduce((sum, d) => sum + d.children_count.villages, 0);
}

console.log(`  Provinces: ${provinces.length}`);
console.log(`  Districts: ${districts.length}`);
console.log(`  Subdistricts: ${subdistricts.length}`);
console.log(`  Villages: ${villages.length}`);

// === Step 3: Generate aggregate data files ===
console.log('Step 3: Generating aggregate data files...');

const dataDir = path.join(OUTPUT_DIR, 'data');
ensureDir(dataDir);

// all-provinces.json
fs.writeFileSync(path.join(dataDir, 'all-provinces.json'), JSON.stringify(provinces, null, 2));

// all-districts.json
fs.writeFileSync(path.join(dataDir, 'all-districts.json'), JSON.stringify(districts, null, 2));

// all-subdistricts.json
fs.writeFileSync(path.join(dataDir, 'all-subdistricts.json'), JSON.stringify(subdistricts, null, 2));

// villages-by-province/ (split to avoid GitHub 100MB limit)
const villagesByProvinceDir = path.join(dataDir, 'villages-by-province');
ensureDir(villagesByProvinceDir);
for (const prov of provinces) {
  const provVillages = villages.filter(v =>
    v.ancestors.some(a => a.id === prov.id)
  );
  fs.writeFileSync(
    path.join(villagesByProvinceDir, `${prov.name.slug}.json`),
    JSON.stringify(provVillages, null, 2)
  );
}

// all-flat.json + all-flat.ndjson (levels 1-3 only; villages in villages-by-province/)
const allFlat = [...provinces, ...districts, ...subdistricts]
  .sort((a, b) => a.id.localeCompare(b.id));

fs.writeFileSync(path.join(dataDir, 'all-flat.json'), JSON.stringify(allFlat, null, 2));
fs.writeFileSync(path.join(dataDir, 'all-flat.ndjson'),
  allFlat.map(r => JSON.stringify(r)).join('\n') + '\n');

// all-flat.csv
const CSV_HEADERS = [
  'id', 'level', 'level_name.th', 'level_name.en',
  'name.th', 'name.en', 'name.slug',
  'code.dopa', 'code.iso',
  'parent.id', 'parent.name.th', 'parent.name.en',
  'children_count.districts', 'children_count.subdistricts', 'children_count.villages',
  'zip_codes',
  'geo.lat', 'geo.lon',
  'metadata.is_special_province', 'metadata.region.th', 'metadata.region.en',
  'source.url',
];

function recordToCsvRow(r) {
  return [
    r.id, r.level, r.level_name?.th || '', r.level_name?.en || '',
    r.name.th, r.name.en, r.name.slug,
    r.code?.dopa || '', r.code?.iso || '',
    r.parent?.id || '', r.parent?.name?.th || '', r.parent?.name?.en || '',
    r.children_count?.districts ?? '', r.children_count?.subdistricts ?? '', r.children_count?.villages ?? '',
    r.zip_codes?.join(';') || '',
    r.geo?.lat || '', r.geo?.lon || '',
    r.metadata?.is_special_province ?? '', r.metadata?.region?.th || '', r.metadata?.region?.en || '',
    r.source?.url || '',
  ].map(csvEscape).join(',');
}

const csvContent = [CSV_HEADERS.join(','), ...allFlat.map(recordToCsvRow)].join('\n') + '\n';
fs.writeFileSync(path.join(dataDir, 'all-flat.csv'), csvContent);

// hierarchy.json (nested tree)
function buildHierarchyTree() {
  return provinces.map(p => ({
    id: p.id,
    name: p.name,
    code: p.code,
    metadata: p.metadata,
    districts: (districtsByProvince.get(p.id) || []).map(d => ({
      id: d.id,
      name: d.name,
      code: d.code,
      subdistricts: (subdistrictsByDistrict.get(d.id) || []).map(s => ({
        id: s.id,
        name: s.name,
        code: s.code,
        villages: (villagesBySubdistrict.get(s.id) || []).map(v => ({
          id: v.id,
          name: v.name,
          code: v.code,
        })),
      })),
    })),
  }));
}

fs.writeFileSync(path.join(dataDir, 'hierarchy.json'), JSON.stringify(buildHierarchyTree(), null, 2));

console.log('  Generated aggregate data files');

// === Step 4: Generate hierarchy folders ===
console.log('Step 4: Generating hierarchy folders...');

const divisionsDir = path.join(OUTPUT_DIR, 'divisions');
ensureDir(divisionsDir);

// Stats for templates
const stats = {
  provinces: provinces.length,
  districts: districts.length,
  subdistricts: subdistricts.length,
  villages: villages.length,
};

// divisions/README.md (provinces index)
const divisionsIndexReadme = renderTemplate('divisions-index', {
  provinces,
  stats,
  aiIntro: loadAiContent('divisions-index-intro.md'),
});
fs.writeFileSync(path.join(divisionsDir, 'README.md'), divisionsIndexReadme);

// Per province
let provinceGenCount = 0;
let districtGenCount = 0;
let subdistrictGenCount = 0;

for (const prov of provinces) {
  const provDir = path.join(divisionsDir, prov.name.slug);
  ensureDir(provDir);

  const provDistricts = (districtsByProvince.get(prov.id) || [])
    .sort((a, b) => a.name.en.localeCompare(b.name.en));

  // province.json
  fs.writeFileSync(path.join(provDir, 'province.json'), JSON.stringify(prov, null, 2));

  // districts.json
  fs.writeFileSync(path.join(provDir, 'districts.json'), JSON.stringify(provDistricts, null, 2));

  // districts.csv
  const distCsvHeaders = ['id', 'name.th', 'name.en', 'name.slug', 'code.dopa', 'children_count.subdistricts', 'children_count.villages', 'geo.lat', 'geo.lon'];
  const distCsvRows = provDistricts.map(d =>
    [d.id, d.name.th, d.name.en, d.name.slug, d.code.dopa, d.children_count.subdistricts, d.children_count.villages, d.geo?.lat || '', d.geo?.lon || '']
      .map(csvEscape).join(',')
  );
  fs.writeFileSync(path.join(provDir, 'districts.csv'),
    [distCsvHeaders.join(','), ...distCsvRows].join('\n') + '\n');

  // Province README
  const provReadme = renderTemplate('province-readme', {
    province: prov,
    districts: provDistricts,
  });
  fs.writeFileSync(path.join(provDir, 'README.md'), provReadme);
  provinceGenCount++;

  // Per district
  for (const dist of provDistricts) {
    const distDir = path.join(provDir, dist.name.slug);
    ensureDir(distDir);

    const distSubdistricts = (subdistrictsByDistrict.get(dist.id) || [])
      .sort((a, b) => a.name.en.localeCompare(b.name.en));

    // district.json
    fs.writeFileSync(path.join(distDir, 'district.json'), JSON.stringify(dist, null, 2));

    // subdistricts.json
    fs.writeFileSync(path.join(distDir, 'subdistricts.json'), JSON.stringify(distSubdistricts, null, 2));

    // subdistricts.csv
    const subCsvHeaders = ['id', 'name.th', 'name.en', 'name.slug', 'code.dopa', 'children_count.villages', 'zip_codes', 'geo.lat', 'geo.lon'];
    const subCsvRows = distSubdistricts.map(s =>
      [s.id, s.name.th, s.name.en, s.name.slug, s.code.dopa, s.children_count.villages, s.zip_codes?.join(';') || '', s.geo?.lat || '', s.geo?.lon || '']
        .map(csvEscape).join(',')
    );
    fs.writeFileSync(path.join(distDir, 'subdistricts.csv'),
      [subCsvHeaders.join(','), ...subCsvRows].join('\n') + '\n');

    // District README
    const distReadme = renderTemplate('district-readme', {
      province: prov,
      district: dist,
      subdistricts: distSubdistricts,
    });
    fs.writeFileSync(path.join(distDir, 'README.md'), distReadme);
    districtGenCount++;

    // Per subdistrict
    for (const sub of distSubdistricts) {
      const subDir = path.join(distDir, sub.name.slug);
      ensureDir(subDir);

      const subVillages = (villagesBySubdistrict.get(sub.id) || [])
        .sort((a, b) => a.id.localeCompare(b.id));

      // subdistrict.json
      fs.writeFileSync(path.join(subDir, 'subdistrict.json'), JSON.stringify(sub, null, 2));

      // villages.json
      fs.writeFileSync(path.join(subDir, 'villages.json'), JSON.stringify(subVillages, null, 2));

      // villages.csv
      const vilCsvHeaders = ['id', 'name.th', 'name.en', 'name.slug', 'code.dopa', 'geo.lat', 'geo.lon'];
      const vilCsvRows = subVillages.map(v =>
        [v.id, v.name.th, v.name.en, v.name.slug, v.code.dopa, v.geo?.lat || '', v.geo?.lon || '']
          .map(csvEscape).join(',')
      );
      fs.writeFileSync(path.join(subDir, 'villages.csv'),
        [vilCsvHeaders.join(','), ...vilCsvRows].join('\n') + '\n');

      // Subdistrict README
      const subReadme = renderTemplate('subdistrict-readme', {
        province: prov,
        district: dist,
        subdistrict: sub,
        villages: subVillages,
      });
      fs.writeFileSync(path.join(subDir, 'README.md'), subReadme);
      subdistrictGenCount++;
    }
  }
}

console.log(`  Generated: ${provinceGenCount} provinces, ${districtGenCount} districts, ${subdistrictGenCount} subdistricts`);

// === Step 5: Generate AI files ===
console.log('Step 5: Generating AI files...');

const docsDir = path.join(OUTPUT_DIR, 'docs');
ensureDir(docsDir);

// llms.txt
const llmsTxt = renderTemplate('llms-txt', {
  provinces,
  stats,
  lastUpdated: TODAY,
  githubUser: GITHUB_USER,
  githubRaw: GITHUB_RAW,
  githubUrl: GITHUB_URL,
});
fs.writeFileSync(path.join(docsDir, 'llms.txt'), llmsTxt);

// llms-full.txt
const llmsFullTxt = renderTemplate('llms-full-txt', {
  provinces,
  stats,
  lastUpdated: TODAY,
  githubUrl: GITHUB_URL,
});
fs.writeFileSync(path.join(docsDir, 'llms-full.txt'), llmsFullTxt);

// Per-province llms-full files
const llmsFullDir = path.join(docsDir, 'llms-full');
ensureDir(llmsFullDir);

for (const prov of provinces) {
  const provDistricts = (districtsByProvince.get(prov.id) || [])
    .sort((a, b) => a.name.en.localeCompare(b.name.en));
  const provSubdistricts = subdistricts.filter(s =>
    s.ancestors.some(a => a.id === prov.id)
  );

  const content = renderTemplate('llms-full-province', {
    province: prov,
    districts: provDistricts,
    subdistricts: provSubdistricts,
    villagesBySubdistrict,
    lastUpdated: TODAY,
  });
  fs.writeFileSync(path.join(llmsFullDir, `${prov.name.slug}.txt`), content);
}

// methodology.md
const methodology = loadAiContent('methodology.md');
if (methodology) {
  fs.writeFileSync(path.join(docsDir, 'methodology.md'), methodology);
}

// === Step 6: Generate root README ===
console.log('Step 6: Generating root README...');

const rootReadme = renderTemplate('root-readme', {
  provinces,
  stats,
  lastUpdated: TODAY,
  githubUser: GITHUB_USER,
  githubRaw: GITHUB_RAW,
  githubUrl: GITHUB_URL,
  aiIntro: loadAiContent('root-intro.md'),
});
fs.writeFileSync(path.join(OUTPUT_DIR, 'README.md'), rootReadme);

// === Done ===
console.log(`\nBuild complete!`);
console.log(`  Provinces: ${provinces.length}`);
console.log(`  Districts: ${districts.length}`);
console.log(`  Subdistricts: ${subdistricts.length}`);
console.log(`  Villages: ${villages.length}`);
console.log(`  Output: ${OUTPUT_DIR}`);
