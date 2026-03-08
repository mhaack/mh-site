# Agent 1: Data Analysis — 2025 Solar System Performance

## Data Source Notes

Data is from the home energy monitoring system, exported as monthly Wh values. All CSV values are in Wh and converted to kWh (divide by 1000). There is a ~1.5% systematic discrepancy between CSV-derived totals and figures published in the 2024 article — the CSV data is used as the authoritative source here.

Columns in CSVs:
- Produktion = PV production (Wh)
- Zur Batterie = Charged to battery (Wh)
- Ins Netz = Exported to grid (Wh)
- Ins Haus / Aus Solarenergie = Directly from PV to household (Wh)
- Verbrauch = Total consumption (Wh)
- Von der Batterie = Discharged from battery (Wh)
- Vom Netz = Purchased from grid (Wh)

System specs:
- System size: **9.45 kWp** (confirmed)
- Installation year: 2021 (first year of data)
- Location: Southern Germany (based on yield profile)
- Battery storage: Yes (data shows To Battery / From Battery flows)

---

## 2021 Data — From Raw CSV (Updated)

**Source:** energy-chart-data-2021.csv — authoritative raw data, recalculated from Wh monthly values.

### 2021 Monthly Breakdown

| Month | Production (kWh) | Consumption (kWh) | Grid Purchased (kWh) | Direct Solar (kWh) | From Battery (kWh) | Self-consumed (kWh) |
|-------|-----------------|-------------------|----------------------|--------------------|--------------------|---------------------|
| Jan   | 95.4            | 920.1             | 822.2                | 77.5               | 20.4               | 97.9                |
| Feb   | 276.9           | 879.2             | 662.5                | 125.5              | 91.3               | 216.7               |
| Mar   | 674.2           | 808.1             | 307.1                | 279.8              | 221.2              | 501.0               |
| Apr   | 900.8           | 707.5             | 139.0                | 316.7              | 251.7              | 568.5               |
| May   | 1,165.9         | 658.0             | 59.6                 | 363.5              | 234.9              | 598.4               |
| Jun   | 1,280.8         | 784.4             | 66.2                 | 461.2              | 257.0              | 718.2               |
| Jul   | 1,178.8         | 887.2             | 124.3                | 506.5              | 256.5              | 762.9               |
| Aug   | 936.0           | 767.4             | 139.3                | 390.8              | 237.3              | 628.1               |
| Sep   | 736.4           | 757.3             | 208.7                | 310.0              | 238.5              | 548.6               |
| Oct   | 544.0           | 777.6             | 321.0                | 235.6              | 221.0              | 456.6               |
| Nov   | 178.5           | 960.7             | 781.3                | 105.8              | 73.7               | 179.4               |
| Dec   | 97.7            | 1,018.7           | 917.5                | 77.6               | 23.6               | 101.1               |

### 2021 Annual Totals (from CSV)

- **Total PV Production:** 8,065 kWh
- **Total Household Consumption:** 9,926 kWh
- **Grid Electricity Purchased:** 4,549 kWh
- **Exported to Grid (feed-in):** 2,724 kWh
- **Directly from PV to house:** 3,250 kWh
- **From battery to house:** 2,127 kWh
- **Total Self-consumed Solar:** 5,377 kWh (direct + battery)
- **Solar Coverage Ratio:** 5,377 / 9,926 = **54.2%**
- **Self-consumption Rate:** 5,377 / 8,065 = **66.7%**
- **Best production month:** June 2021 — 1,280.8 kWh
- **Worst production month:** January 2021 — 95.4 kWh

### Note: Discrepancy vs. Previously Published Figures

The figures used in the previously published 2024 article differ from the CSV-derived values:

| Metric | Published (old) | CSV (authoritative) | Difference |
|--------|----------------|---------------------|------------|
| Production | 7,780 kWh | 8,065 kWh | +285 kWh (+3.7%) |
| Consumption | 9,721 kWh | 9,926 kWh | +205 kWh (+2.1%) |
| Grid Purchased | 4,677 kWh | 4,549 kWh | −128 kWh (−2.7%) |
| Self-consumed | 5,044 kWh | 5,377 kWh | +333 kWh (+6.6%) |
| Solar Coverage | 52% | 54% | +2 pp |

The CSV raw data is the authoritative source. The published figures were likely from a different export, rounding, or earlier data cut. All analysis going forward uses the CSV-derived values.

---

## 2025 Monthly Breakdown

| Month | Production (kWh) | Consumption (kWh) | Grid Purchased (kWh) | Direct Solar (kWh) | From Battery (kWh) |
|-------|-----------------|-------------------|----------------------|--------------------|--------------------|
| Jan   | 168.6           | 1,027.9           | 862.3                | 107.2              | 58.4               |
| Feb   | 366.6           | 871.3             | 535.7                | 196.1              | 139.5              |
| Mar   | 769.9           | 871.9             | 350.1                | 301.9              | 220.0              |
| Apr   | 1,003.7         | 675.9             | 184.4                | 299.8              | 191.7              |
| May   | 1,259.6         | 1,049.7           | 280.5                | 506.2              | 263.0              |
| Jun   | 1,290.9         | 932.3             | 160.5                | 523.0              | 248.8              |
| Jul   | 1,073.5         | 822.5             | 104.3                | 493.5              | 224.7              |
| Aug   | 1,135.4         | 961.8             | 226.3                | 502.8              | 232.7              |
| Sep   | 786.8           | 793.1             | 231.1                | 335.7              | 226.4              |
| Oct   | 352.3           | 648.5             | 356.2                | 137.5              | 154.8              |
| Nov   | 250.6           | 895.2             | 662.0                | 123.8              | 109.4              |
| Dec   | 166.2           | 1,164.4           | 1,000.0              | 91.7               | 72.8               |

### 2025 Derived Metrics

- **Total PV Production:** 8,624 kWh
- **Total Household Consumption:** 10,714 kWh
- **Grid Electricity Purchased:** 4,953 kWh
- **Exported to Grid (feed-in):** 2,833 kWh
- **Directly from PV to house:** 3,619 kWh
- **From battery to house:** 2,142 kWh
- **Total Self-consumed Solar:** 5,761 kWh (direct + battery)
- **Solar Coverage Ratio:** 5,761 / 10,714 = **53.8%** (% of total consumption covered by solar)
- **Self-consumption Rate:** 5,761 / 8,624 = **66.8%** (% of production used on-site)
- **Battery charged:** 2,172 kWh | **Battery discharged:** 2,142 kWh
- **Best production month:** June 2025 — 1,290.9 kWh
- **Second best:** May 2025 — 1,259.6 kWh
- **Worst production month:** January 2025 — 168.6 kWh
- **Most grid-independent months:** July (only 104 kWh from grid), June (161 kWh from grid)
- **Most grid-dependent months:** December (1,000 kWh), January (862 kWh)

---

## Year-over-Year: 2025 vs 2024

| Metric | 2024 (CSV) | 2025 (CSV) | Delta | % Change |
|--------|------------|------------|-------|----------|
| Production | 8,706 kWh | 8,624 kWh | −82 kWh | −0.9% |
| Consumption | 10,078 kWh | 10,714 kWh | +636 kWh | +6.3% |
| Grid purchased | 4,661 kWh | 4,953 kWh | +292 kWh | +6.3% |
| Self-consumed solar | 5,418 kWh | 5,761 kWh | +343 kWh | +6.3% |
| Solar coverage | 53.8% | 53.8% | 0% | flat |
| Best month production | Jul 1,299 kWh | Jun 1,291 kWh | — | — |

Notable: Consumption rose 6.3% in 2025. Despite nearly identical solar production, self-consumed solar also rose in proportion — meaning the solar system's relative value increased even though absolute production was flat.

---

## Month-by-Month 2025 vs 2024 Comparison

| Month | 2025 Prod. | 2024 Prod. | Delta |
|-------|-----------|-----------|-------|
| Jan   | 168.6     | 191.4     | −22.8 |
| Feb   | 366.6     | 311.4     | +55.2 |
| Mar   | 769.9     | 723.9     | +46.0 |
| Apr   | 1,003.7   | 983.1     | +20.6 |
| May   | 1,259.6   | 1,160.8   | +98.8 ← strong |
| Jun   | 1,290.9   | 1,264.5   | +26.4 |
| Jul   | 1,073.5   | 1,298.8   | **−225.3** ← notable dip |
| Aug   | 1,135.4   | 1,198.6   | −63.2 |
| Sep   | 786.8     | 819.1     | −32.3 |
| Oct   | 352.3     | 482.2     | **−129.9** ← notable dip |
| Nov   | 250.6     | 186.9     | +63.7 |
| Dec   | 166.2     | 85.4      | +80.8 ← almost double |

Key observation: 2025 had a strong spring (Feb, Mar, Apr, May all above 2024) but significantly weaker July and October. December 2025 was almost double December 2024.

---

## 5-Year Comparison Table (2021–2025)

Notes:
- 2021 values recalculated from raw CSV (energy-chart-data-2021.csv) — see section above
- 2022–2025 calculated from CSV data
- Previously published 2021 figures (Production 7,780 kWh, Coverage 52%) have been superseded by the CSV-derived values

| Year | Production | Consumption | Grid Purchased | Self-consumed | Solar Coverage |
|------|-----------|-------------|----------------|---------------|----------------|
| 2021 | 8,065 kWh | 9,926 kWh   | 4,549 kWh      | 5,377 kWh     | 54%            |
| 2022 | 9,320 kWh | 10,322 kWh  | 4,482 kWh      | 5,840 kWh     | 57%            |
| 2023 | 8,459 kWh | 10,143 kWh  | 4,827 kWh      | 5,317 kWh     | 52%            |
| 2024 | 8,706 kWh | 10,078 kWh  | 4,661 kWh      | 5,418 kWh     | 54%            |
| 2025 | 8,624 kWh | 10,714 kWh  | 4,953 kWh      | 5,761 kWh     | 54%            |

5-year totals (corrected with CSV 2021 data):
- Total PV produced: **43,174 kWh**
- Total consumed: **51,183 kWh**
- Total self-consumed solar: **27,713 kWh**

---

## Specific Yield by Year (kWh/kWp, system size 9.45 kWp)

| Year | Production (kWh) | Specific Yield (kWh/kWp) | Solar Coverage |
|------|-----------------|--------------------------|----------------|
| 2021 | 8,065           | 853                      | 54%            |
| 2022 | 9,320           | 986                      | 57%            |
| 2023 | 8,459           | 895                      | 52%            |
| 2024 | 8,706           | 921                      | 54%            |
| 2025 | 8,624           | 913                      | 54%            |
| **5-yr avg** | **8,635** | **914** | **54%** |

Notes on specific yield:
- 2022 was the best year at 986 kWh/kWp — well above average
- 2021 was the weakest at 853 kWh/kWp (possible system break-in year or atypically poor solar irradiance)
- The 5-year average of 914 kWh/kWp is consistent with typical southern German yields for well-oriented rooftop systems (typical range: 850–1,050 kWh/kWp)

---

## Financial Impact Estimate

Using €0.30/kWh as a reasonable German residential grid price (conservative; current prices are €0.30–0.35/kWh):

### 2025:
- Grid electricity avoided: **5,761 kWh × €0.30 = €1,728 saved**
- Feed-in revenue (2,833 kWh × ~€0.082/kWh, typical German 2025 Einspeisevergütung for systems up to 10 kWp): **~€232**
- Total 2025 benefit: **~€1,960**

### 5-Year cumulative (rough estimate):
- Total self-consumed over 5 years: ~27,713 kWh
- At €0.30/kWh avg (blended across years, accounting for price changes): **~€8,300 saved** from grid
- Feed-in revenue 5 years: rough estimate ~€1,000–1,200 total
- **Total 5-year benefit: ~€9,300–9,500**

<!-- TODO: Insert actual system cost to calculate payback trajectory. If system cost was ~€15,000–20,000 installed, payback trajectory at current benefit rate of ~€1,960/year is 8–10 years from installation. -->

---

## Top 5 Most Interesting Insights

### 1. July 2025 was significantly weaker than July 2024 (−225 kWh, −17%)
July is normally the peak summer month. In 2024 it was the best month (1,299 kWh). In 2025 it dropped to third place at 1,074 kWh — a loss of 225 kWh. This is the most notable month-over-month anomaly. Likely caused by cloudier or rainier July weather in 2025.

### 2. December 2025 was nearly double December 2024 (166 kWh vs 85 kWh)
Consistent with less snow/frost in winter months, December 2025 was the best December in 5 years by a wide margin. This continues a trend noted in the 2024 article of improving winter yields.

### 3. Consumption jumped +6.3% in 2025 — the highest since records began (10,714 kWh)
Total electricity consumption in 2025 was the highest in 5 years. This increase was matched by increased self-consumption from the solar system, keeping the coverage ratio flat at 54%. Reason for increased consumption: <!-- TODO: e.g. EV charging, heat pump use, new appliances — confirm with household context -->

### 4. The system has now avoided purchasing ~27,700 kWh from the grid over 5 years
This is equivalent to roughly €8,300 in grid cost savings over the lifetime so far, assuming a blended average grid price. The annual benefit is increasing as electricity prices rise.

### 5. 2022 remains the best production year — 2025 is the fourth-best out of five
2022 was an exceptional year (9,320 kWh / 986 kWh/kWp). Both 2024 and 2025 came in at ~8,600–8,700 kWh (~913–921 kWh/kWp), suggesting the system has reached a stable production plateau in this range under typical weather conditions.

---

## Additional Notes for Writer

- The system has battery storage (charge/discharge data visible in CSVs). This is worth mentioning as it increases self-consumption and reduces peak grid imports.
- September 2025 was interesting: consumption (793 kWh) nearly matched production (787 kWh), nearly achieving full energy self-sufficiency for the month.
- April 2025 saw the highest feed-in month: 511 kWh exported to grid, with consumption only 676 kWh. The combination of high production and low consumption meant a lot went to the grid.
- The self-consumption quota (coverage ratio) has been remarkably stable: 52–57% across all 5 years, clustering around 53–54% in the last two years.
- The 2021 CSV recalculation shows the system performed better in its first year than previously reported: 8,065 kWh produced (not 7,780 kWh) and 54% solar coverage (not 52%). This suggests the first year was not significantly weaker than subsequent years once the correct data is used.
