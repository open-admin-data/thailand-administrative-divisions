# Thailand Administrative Divisions / การแบ่งเขตการปกครองของประเทศไทย

Open dataset of Thailand's complete administrative hierarchy — from provinces down to villages. This repository provides structured, bilingual (Thai + English) reference data for all four levels of Thailand's administrative divisions, including zip codes (รหัสไปรษณีย์) and geographic coordinates (พิกัด) at every level. Designed for developers, researchers, government agencies, and AI agents.

All data is sourced from [ThaiAddress.org](https://thaiaddress.org) and published under the CC-BY-4.0 license. Browse the hierarchy through GitHub's folder navigation, download aggregate files in JSON/CSV/NDJSON, or integrate directly via raw URLs.

## Overview / ภาพรวม

| รายการ / Item | ข้อมูล / Details |
|---------------|-----------------|
| จังหวัด / Provinces | 77 |
| อำเภอ·เขต / Districts | 928 |
| ตำบล·แขวง / Subdistricts | 7,364 |
| หมู่บ้าน / Villages | 79,818 |
| รหัสไปรษณีย์ / Zip Codes | ✅ Included (subdistrict level) |
| พิกัด / Coordinates | ✅ Included (all levels, including villages) |
| Formats | JSON, NDJSON, CSV |
| License | CC-BY-4.0 (data) + MIT (code) |
| Source | [ThaiAddress.org](https://thaiaddress.org) |
| Last Updated | 2026-05-09 |

## Browse by Province / เรียกดูตามจังหวัด

Each province folder contains its districts, subdistricts, and village data. Click any province to explore.

| # | จังหวัด / Province | ภาค / Region | อำเภอ / Districts | ตำบล / Subdistricts | หมู่บ้าน / Villages | Link |
|---|--------------------|--------------|--------------------|---------------------|---------------------|------|
| 1 | กรุงเทพมหานคร (Bangkok) | ภาคกลาง (Central) | 50 | 154 | 0 | [Browse](divisions/bangkok/) |
| 2 | สมุทรปราการ (Samut Prakan) | ภาคกลาง (Central) | 6 | 50 | 577 | [Browse](divisions/samut-prakan/) |
| 3 | นนทบุรี (Nonthaburi) | ภาคกลาง (Central) | 6 | 52 | 641 | [Browse](divisions/nonthaburi/) |
| 4 | ปทุมธานี (Pathum Thani) | ภาคกลาง (Central) | 7 | 60 | 867 | [Browse](divisions/pathum-thani/) |
| 5 | พระนครศรีอยุธยา (Phra Nakhon Si Ayutthaya) | ภาคกลาง (Central) | 16 | 207 | 1,553 | [Browse](divisions/phra-nakhon-si-ayutthaya/) |
| 6 | อ่างทอง (Ang Thong) | ภาคกลาง (Central) | 7 | 73 | 545 | [Browse](divisions/ang-thong/) |
| 7 | ลพบุรี (Loburi) | ภาคกลาง (Central) | 11 | 121 | 1,168 | [Browse](divisions/loburi/) |
| 8 | สิงห์บุรี (Sing Buri) | ภาคกลาง (Central) | 6 | 43 | 378 | [Browse](divisions/sing-buri/) |
| 9 | ชัยนาท (Chai Nat) | ภาคกลาง (Central) | 8 | 53 | 527 | [Browse](divisions/chai-nat/) |
| 10 | สระบุรี (Saraburi) | ภาคกลาง (Central) | 13 | 109 | 1,049 | [Browse](divisions/saraburi/) |
| 11 | ชลบุรี (Chon Buri) | ภาคตะวันออก (Eastern) | 11 | 92 | 961 | [Browse](divisions/chon-buri/) |
| 12 | ระยอง (Rayong) | ภาคตะวันออก (Eastern) | 8 | 56 | 530 | [Browse](divisions/rayong/) |
| 13 | จันทบุรี (Chanthaburi) | ภาคตะวันออก (Eastern) | 10 | 76 | 770 | [Browse](divisions/chanthaburi/) |
| 14 | ตราด (Trat) | ภาคตะวันออก (Eastern) | 7 | 37 | 264 | [Browse](divisions/trat/) |
| 15 | ฉะเชิงเทรา (Chachoengsao) | ภาคตะวันออก (Eastern) | 11 | 93 | 924 | [Browse](divisions/chachoengsao/) |
| 16 | ปราจีนบุรี (Prachin Buri) | ภาคตะวันออก (Eastern) | 7 | 64 | 720 | [Browse](divisions/prachin-buri/) |
| 17 | นครนายก (Nakhon Nayok) | ภาคกลาง (Central) | 4 | 41 | 434 | [Browse](divisions/nakhon-nayok/) |
| 18 | สระแก้ว (Sa Kaeo) | ภาคตะวันออก (Eastern) | 9 | 59 | 770 | [Browse](divisions/sa-kaeo/) |
| 19 | นครราชสีมา (Nakhon Ratchasima) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 32 | 285 | 3,786 | [Browse](divisions/nakhon-ratchasima/) |
| 20 | บุรีรัมย์ (Buri Ram) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 23 | 189 | 2,587 | [Browse](divisions/buri-ram/) |
| 21 | สุรินทร์ (Surin) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 17 | 159 | 2,161 | [Browse](divisions/surin/) |
| 22 | ศรีสะเกษ (Si Sa Ket) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 22 | 204 | 2,668 | [Browse](divisions/si-sa-ket/) |
| 23 | อุบลราชธานี (Ubon Ratchathani) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 25 | 219 | 2,886 | [Browse](divisions/ubon-ratchathani/) |
| 24 | ยโสธร (Yasothon) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 9 | 79 | 908 | [Browse](divisions/yasothon/) |
| 25 | ชัยภูมิ (Chaiyaphum) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 16 | 124 | 1,645 | [Browse](divisions/chaiyaphum/) |
| 26 | อำนาจเจริญ (Amnat Charoen) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 7 | 56 | 638 | [Browse](divisions/amnat-charoen/) |
| 27 | บึงกาฬ (Buogkan) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 8 | 53 | 617 | [Browse](divisions/buogkan/) |
| 28 | หนองบัวลำภู (Nong Bua Lam Phu) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 6 | 59 | 721 | [Browse](divisions/nong-bua-lam-phu/) |
| 29 | ขอนแก่น (Khon Kaen) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 26 | 199 | 2,484 | [Browse](divisions/khon-kaen/) |
| 30 | อุดรธานี (Udon Thani) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 20 | 155 | 2,036 | [Browse](divisions/udon-thani/) |
| 31 | เลย (Loei) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 14 | 90 | 967 | [Browse](divisions/loei/) |
| 32 | หนองคาย (Nong Khai) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 9 | 62 | 740 | [Browse](divisions/nong-khai/) |
| 33 | มหาสารคาม (Maha Sarakham) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 13 | 133 | 1,961 | [Browse](divisions/maha-sarakham/) |
| 34 | ร้อยเอ็ด (Roi Et) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 20 | 192 | 2,456 | [Browse](divisions/roi-et/) |
| 35 | กาฬสินธุ์ (Kalasin) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 18 | 134 | 1,625 | [Browse](divisions/kalasin/) |
| 36 | สกลนคร (Sakon Nakhon) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 18 | 125 | 1,564 | [Browse](divisions/sakon-nakhon/) |
| 37 | นครพนม (Nakhon Phanom) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 12 | 95 | 1,124 | [Browse](divisions/nakhon-phanom/) |
| 38 | มุกดาหาร (Mukdahan) | ภาคตะวันออกเฉียงเหนือ (Northeastern) | 7 | 53 | 553 | [Browse](divisions/mukdahan/) |
| 39 | เชียงใหม่ (Chiang Mai) | ภาคเหนือ (Northern) | 25 | 199 | 2,127 | [Browse](divisions/chiang-mai/) |
| 40 | ลำพูน (Lamphun) | ภาคเหนือ (Northern) | 8 | 51 | 594 | [Browse](divisions/lamphun/) |
| 41 | ลำปาง (Lampang) | ภาคเหนือ (Northern) | 13 | 97 | 1,025 | [Browse](divisions/lampang/) |
| 42 | อุตรดิตถ์ (Uttaradit) | ภาคเหนือ (Northern) | 9 | 67 | 635 | [Browse](divisions/uttaradit/) |
| 43 | แพร่ (Phrae) | ภาคเหนือ (Northern) | 8 | 78 | 726 | [Browse](divisions/phrae/) |
| 44 | น่าน (Nan) | ภาคเหนือ (Northern) | 15 | 99 | 921 | [Browse](divisions/nan/) |
| 45 | พะเยา (Phayao) | ภาคเหนือ (Northern) | 9 | 68 | 820 | [Browse](divisions/phayao/) |
| 46 | เชียงราย (Chiang Rai) | ภาคเหนือ (Northern) | 18 | 123 | 1,817 | [Browse](divisions/chiang-rai/) |
| 47 | แม่ฮ่องสอน (Mae Hong Son) | ภาคเหนือ (Northern) | 7 | 44 | 413 | [Browse](divisions/mae-hong-son/) |
| 48 | นครสวรรค์ (Nakhon Sawan) | ภาคกลาง (Central) | 15 | 130 | 1,535 | [Browse](divisions/nakhon-sawan/) |
| 49 | อุทัยธานี (Uthai Thani) | ภาคกลาง (Central) | 8 | 69 | 650 | [Browse](divisions/uthai-thani/) |
| 50 | กำแพงเพชร (Kamphaeng Phet) | ภาคกลาง (Central) | 11 | 78 | 990 | [Browse](divisions/kamphaeng-phet/) |
| 51 | ตาก (Tak) | ภาคตะวันตก (Western) | 9 | 60 | 588 | [Browse](divisions/tak/) |
| 52 | สุโขทัย (Sukhothai) | ภาคกลาง (Central) | 9 | 86 | 866 | [Browse](divisions/sukhothai/) |
| 53 | พิษณุโลก (Phitsanulok) | ภาคกลาง (Central) | 9 | 93 | 1,112 | [Browse](divisions/phitsanulok/) |
| 54 | พิจิตร (Phichit) | ภาคกลาง (Central) | 12 | 88 | 930 | [Browse](divisions/phichit/) |
| 55 | เพชรบูรณ์ (Phetchabun) | ภาคกลาง (Central) | 11 | 116 | 1,456 | [Browse](divisions/phetchabun/) |
| 56 | ราชบุรี (Ratchaburi) | ภาคตะวันตก (Western) | 10 | 104 | 1,046 | [Browse](divisions/ratchaburi/) |
| 57 | กาญจนบุรี (Kanchanaburi) | ภาคตะวันตก (Western) | 13 | 95 | 980 | [Browse](divisions/kanchanaburi/) |
| 58 | สุพรรณบุรี (Suphan Buri) | ภาคกลาง (Central) | 10 | 109 | 1,037 | [Browse](divisions/suphan-buri/) |
| 59 | นครปฐม (Nakhon Pathom) | ภาคกลาง (Central) | 7 | 106 | 1,079 | [Browse](divisions/nakhon-pathom/) |
| 60 | สมุทรสาคร (Samut Sakhon) | ภาคกลาง (Central) | 3 | 40 | 359 | [Browse](divisions/samut-sakhon/) |
| 61 | สมุทรสงคราม (Samut Songkhram) | ภาคกลาง (Central) | 3 | 36 | 308 | [Browse](divisions/samut-songkhram/) |
| 62 | เพชรบุรี (Phetchaburi) | ภาคตะวันตก (Western) | 8 | 92 | 739 | [Browse](divisions/phetchaburi/) |
| 63 | ประจวบคีรีขันธ์ (Prachuap Khiri Khan) | ภาคตะวันตก (Western) | 8 | 48 | 489 | [Browse](divisions/prachuap-khiri-khan/) |
| 64 | นครศรีธรรมราช (Nakhon Si Thammarat) | ภาคใต้ (Southern) | 23 | 169 | 1,636 | [Browse](divisions/nakhon-si-thammarat/) |
| 65 | กระบี่ (Krabi) | ภาคใต้ (Southern) | 8 | 52 | 397 | [Browse](divisions/krabi/) |
| 66 | พังงา (Phangnga) | ภาคใต้ (Southern) | 8 | 48 | 337 | [Browse](divisions/phangnga/) |
| 67 | ภูเก็ต (Phuket) | ภาคใต้ (Southern) | 3 | 16 | 137 | [Browse](divisions/phuket/) |
| 68 | สุราษฎร์ธานี (Surat Thani) | ภาคใต้ (Southern) | 19 | 130 | 1,315 | [Browse](divisions/surat-thani/) |
| 69 | ระนอง (Ranong) | ภาคใต้ (Southern) | 5 | 30 | 198 | [Browse](divisions/ranong/) |
| 70 | ชุมพร (Chumphon) | ภาคใต้ (Southern) | 8 | 70 | 798 | [Browse](divisions/chumphon/) |
| 71 | สงขลา (Songkhla) | ภาคใต้ (Southern) | 16 | 127 | 1,325 | [Browse](divisions/songkhla/) |
| 72 | สตูล (Satun) | ภาคใต้ (Southern) | 7 | 36 | 300 | [Browse](divisions/satun/) |
| 73 | ตรัง (Trang) | ภาคใต้ (Southern) | 10 | 90 | 809 | [Browse](divisions/trang/) |
| 74 | พัทลุง (Phatthalung) | ภาคใต้ (Southern) | 11 | 65 | 715 | [Browse](divisions/phatthalung/) |
| 75 | ปัตตานี (Pattani) | ภาคใต้ (Southern) | 12 | 115 | 684 | [Browse](divisions/pattani/) |
| 76 | ยะลา (Yala) | ภาคใต้ (Southern) | 8 | 58 | 449 | [Browse](divisions/yala/) |
| 77 | นราธิวาส (Narathiwat) | ภาคใต้ (Southern) | 13 | 77 | 671 | [Browse](divisions/narathiwat/) |

## Data Files / ไฟล์ข้อมูล

| File | Format | Description |
|------|--------|-------------|
| [all-provinces.json](data/all-provinces.json) | JSON | All 77 province records |
| [all-districts.json](data/all-districts.json) | JSON | All 928 district records |
| [all-subdistricts.json](data/all-subdistricts.json) | JSON | All 7,364 subdistrict records |
| [villages-by-province/](data/villages-by-province/) | JSON | 79,818 villages split by province (bilingual) |
| [all-flat.json](data/all-flat.json) | JSON | Provinces + districts + subdistricts in one file |
| [all-flat.ndjson](data/all-flat.ndjson) | NDJSON | Newline-delimited JSON for streaming |
| [all-flat.csv](data/all-flat.csv) | CSV | Flat CSV format |
| [hierarchy.json](data/hierarchy.json) | JSON | Nested hierarchy tree |
| [schema.json](data/schema.json) | JSON Schema | Data schema definition |

## Quick Start / เริ่มต้นใช้งาน

### Python

```python
import json

# Load all provinces
with open("data/all-provinces.json", "r", encoding="utf-8") as f:
    provinces = json.load(f)

# Find provinces in a region
central = [p for p in provinces if p["metadata"]["region"]["en"] == "Central"]
print(f"Central Thailand has {len(central)} provinces")

# Look up a specific province
for p in provinces:
    if p["name"]["en"] == "Chiang Mai":
        print(f"{p['name']['th']} has {p['children_count']['districts']} districts")
```

### JavaScript / Node.js

```javascript
import { readFileSync } from "fs";

const provinces = JSON.parse(readFileSync("data/all-provinces.json", "utf-8"));

// Districts in Bangkok
const bkk = provinces.find(p => p.name.en === "Bangkok");
console.log(`Bangkok has ${bkk.children_count.districts} districts`);

// All provinces sorted by district count
const sorted = [...provinces].sort((a, b) =>
  b.children_count.districts - a.children_count.districts
);
```

### Villages — Find by Subdistrict

```python
import json

# Load all villages
with open("data/all-villages.json", "r", encoding="utf-8") as f:
    villages = json.load(f)

# Find villages in a specific subdistrict
sub_villages = [v for v in villages if v["parent"]["name"]["en"] == "Si Phum"]
for v in sub_villages:
    print(f"{v['name']['th']} ({v['name']['en']}) — {v['geo']['lat']}, {v['geo']['lon']}")
```

### Villages — Zip Code Lookup

```python
import json

# Load subdistricts with zip codes
with open("data/all-subdistricts.json", "r", encoding="utf-8") as f:
    subdistricts = json.load(f)

# Find subdistricts by zip code
results = [s for s in subdistricts if "50200" in s.get("zip_codes", [])]
for s in results:
    print(f"{s['name']['th']} ({s['name']['en']}) — {s['zip_codes']}")
```

### Streaming (NDJSON)

```javascript
import { createReadStream } from "fs";
import { createInterface } from "readline";

const rl = createInterface({
  input: createReadStream("data/all-flat.ndjson"),
});

for await (const line of rl) {
  const record = JSON.parse(line);
  if (record.level === 4 && record.ancestors[0].name.en === "Phuket") {
    console.log(record.name.th, record.name.en, record.geo.lat, record.geo.lon);
  }
}
```

## Schema / โครงสร้างข้อมูล

Each division record contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique DOPA identifier |
| `level` | integer | 1 (province), 2 (district), 3 (subdistrict), 4 (village) |
| `level_name` | object | Level label in Thai and English |
| `name.th` | string | Thai name |
| `name.en` | string | English (Romanized) name |
| `name.slug` | string | URL-safe slug |
| `code.dopa` | string | DOPA code |
| `code.iso` | string | ISO 3166-2 code (provinces only) |
| `parent` | object/null | Parent division reference |
| `ancestors` | array | Full ancestor chain to root |
| `children_count` | object | Count of immediate children |
| `zip_codes` | array | Postal/zip codes (subdistrict level) |
| `geo.lat` | string | Latitude (WGS84, all levels including villages) |
| `geo.lon` | string | Longitude (WGS84, all levels including villages) |
| `metadata` | object | Region, special flags |
| `source.url` | string | Original page on ThaiAddress.org |

Full schema: [data/schema.json](data/schema.json)

## Hierarchy Browse / เรียกดูตามลำดับชั้น

Browse the administrative hierarchy through GitHub's folder navigation:

```
divisions/{province-slug}/                                → Province overview + districts
divisions/{province-slug}/{district-slug}/                 → District overview + subdistricts
divisions/{province-slug}/{district-slug}/{subdistrict}/   → Subdistrict + village list (inline)
```

Example paths:
- `divisions/bangkok/` — Bangkok province (50 districts)
- `divisions/bangkok/khet-phra-nakhon/` — Phra Nakhon district (12 subdistricts)
- `divisions/chiang-mai/mueang-chiang-mai/si-phum/` — Si Phum subdistrict (villages listed inline)

Villages are listed inline in each subdistrict's README — no separate village folders.

## AI Integration

- [llms.txt](docs/llms.txt) — Quick reference for AI agents
- [llms-full.txt](docs/llms-full.txt) — Summary with per-province links
- [Per-province data](docs/llms-full/) — Full division data by province

## Citation / อ้างอิง

If you use this dataset, please cite:

```
Thailand Administrative Divisions Dataset (CC-BY-4.0)
Author: jakkrapongt
URL: https://github.com/open-admin-data/thailand-administrative-divisions
Source: https://thaiaddress.org
```

See [CITATION.cff](CITATION.cff) for machine-readable citation.

## Source / แหล่งข้อมูล

Administrative hierarchy (provinces, districts, subdistricts) and zip codes are sourced from
[ThaiAddress.org](https://thaiaddress.org), which compiles data from Thailand's Department
of Provincial Administration (DOPA). Village-level data is sourced from the
[National Statistical Office](https://www.nso.go.th/) village registry.

See [docs/methodology.md](docs/methodology.md) for details on data collection and processing.

## License / สัญญาอนุญาต

- **Data** (division records): [CC-BY-4.0](LICENSE)
- **Build code** (build/ directory): [MIT](LICENSE)

You are free to share and adapt this dataset for any purpose, including commercial,
as long as you give appropriate credit.

## Related / โครงการที่เกี่ยวข้อง

- [thai-temples-knowledge](https://github.com/jakkrapongt/thai-temples-knowledge) — Thai Buddhist temple addresses dataset
- [open-admin-data](https://github.com/open-admin-data) — Open administrative data for ASEAN countries
