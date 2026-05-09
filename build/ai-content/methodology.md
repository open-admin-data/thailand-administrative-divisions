# Methodology / วิธีการจัดทำข้อมูล

## Data Source / แหล่งข้อมูล

This dataset is sourced from **[ThaiAddress.org](https://thaiaddress.org)**, which compiles administrative division data from Thailand's Department of Provincial Administration (DOPA / กรมการปกครอง).

## Processing / การประมวลผล

1. **Export**: Raw data is exported from ThaiAddress.org's database
2. **Validation**: Each record is validated against the JSON Schema (`data/schema.json`)
3. **Relationship Computation**: Parent references, ancestor chains, and children counts are computed
4. **Slug Generation**: English romanized slugs are generated for folder/URL naming
5. **Multi-format Export**: Data is exported to JSON, NDJSON, and CSV formats
6. **Hierarchy Generation**: Folder structure with READMEs is generated via EJS templates

## Update Frequency / ความถี่ในการอัปเดต

Data is updated quarterly or when significant administrative changes occur. Thailand's administrative divisions change infrequently — typically a few subdistrict or village boundary adjustments per year.

## Accuracy / ความถูกต้อง

- All division names, codes, and hierarchy relationships come directly from source data
- No AI-generated facts about specific divisions
- Statistics are always computed from data, never hardcoded
- Build script is idempotent: same input always produces same output

## Codes / รหัส

Division codes follow the DOPA coding system:
- Province: 2 digits (e.g., `10` = Bangkok)
- District: 4 digits (e.g., `1001` = Khet Phra Nakhon)
- Subdistrict: 6 digits (e.g., `100101` = Phra Borom Maha Ratchawang)
- Village: 8 digits (e.g., `10010101`)

ISO 3166-2:TH codes are included for provinces where available.
