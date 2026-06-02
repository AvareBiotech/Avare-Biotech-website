export type MaterialCategory = "guide" | "case" | "protocol";

export interface ContentSection {
  heading: string;
  paragraph?: string;
  items?: string[];
}

export interface Material {
  slug: string;
  title: string;
  category: MaterialCategory;
  categoryLabel: string;
  tagClass: string;
  emoji: string;
  description: string;
  downloadTitle: string;
  downloadButtonText: string;
  downloadDescription: string;
  content: ContentSection[];
}

export const materials: Material[] = [
  {
    slug: "semen-storage-handling",
    title: "Semen Storage & Handling: 10 Critical Steps",
    category: "guide",
    categoryLabel: "Guide",
    tagClass: "tag-guide",
    emoji: "🧊",
    description:
      "Temperature errors during thawing cost more than any equipment failure. Here's what actually matters.",
    downloadTitle: "Download: Semen Storage & Handling Checklist",
    downloadButtonText: "Download PDF →",
    downloadDescription:
      "Enter your email to download this checklist and get free access to new content with a subscription.",
    content: [
      {
        heading: "Some mistakes are visible right away",
        paragraph:
          "A straw dropped on the ground. A thaw bath not heated to the right temperature. Unsterilized equipment. These mistakes are easy to fix — because you can see them. But there is another category of mistakes. The ones you cannot see at all. The semen looks normal. It moves. It passes visual evaluation. And still does not fertilize.",
      },
      {
        heading: "The experiment that should not have been necessary",
        paragraph:
          "Luciano Penteado is the owner of Firmasa Tecnologia Para Pecuaria, one of Brazil's leading companies in artificial insemination. At an inseminator training course he first heard about the sensitivity of sperm proteins to temperature fluctuations during the transfer from the nitrogen tank to the thaw bath. And he decided to test it in the field.\n\nThe conditions were tight: same semen, same protocol, same day, same inseminators. The only variable was the number of straws pulled at one time.\n\n→ Group A: 10 straws at a time. Temperature fluctuations exceeded 1.5°C.\n→ Group B: 3 straws at a time. Temperature fluctuations stayed within 1.5°C.\n\nResult: 44% versus 56% fertilization. A 12 percentage point difference from a single handling step.",
      },
      {
        heading: "Why semen looks normal but does not work",
        paragraph:
          "Standard visual evaluation — motility, concentration, morphology — does not show this damage. When straws are pulled in large numbers, temperature in the tank neck rises sharply. Each fluctuation triggers a chain of molecular damage. Sublethal freezing damage inevitably leads to reduced fertility in vivo — including alterations to sperm proteins responsible for fertilization. Semen can be alive and incapable of fertilization at the same time. No visual inspection will show that.",
      },
      {
        heading: "What science says about the cost of careless handling",
        items: [
          "Most people who work daily with frozen semen — including veterinarians — have never received formal training in safe long-term storage and handling (Stroud, 2012)",
          "To achieve maximum fertility in an AI program, overall quality of frozen-thawed semen must be controlled at every stage of handling and distribution",
          "Even a 2–3 second difference in thawing time at the same temperature affects the final straw temperature — and non-return rates after insemination",
        ],
      },
      {
        heading: "The economics of one mistake",
        paragraph:
          "A cow that fails to conceive at first insemination costs the operation an additional $622 per animal — covering repeated treatment, management, and losses from an extended calving interval. In cows requiring three or more inseminations per conception, profit drops by more than $205 per year per head.\n\nTake a herd of 500 cows. At 44% conception: 220 pregnant. At 56%: 280 pregnant. Difference: 60 cows. At $205 per head in additional losses — that is $12,300 per season in direct costs alone. Not counting the missed calf or the extended calving interval.",
      },
      {
        heading: "The industry's invisible problem",
        paragraph:
          "Despite decades of refinement in cryopreservation protocols, post-thaw fertility remains unpredictable. Visual assessment of motility and morphology does not see acrosomal protein damage. It does not see DNA fragmentation. It does not see what happened to the cell between the nitrogen tank and the insemination gun. This is why handling errors remain invisible for so long — and why a standardized protocol is not a recommendation. It is a production standard.",
      },
      {
        heading: "What this means for practice",
        paragraph:
          "Every time the tank neck rises above the frost line, every time a straw lingers in the hand for extra seconds, every time equipment is not pre-cooled — invisible damage occurs that cannot be corrected at the next step. That damage will not show up when you look through a microscope. It will show up 35 days later — as an empty uterus on ultrasound.",
      },
      {
        heading: "Download the checklist",
        paragraph:
          "Download "Semen Storage & Handling: 10 Critical Steps" — specific steps that protect semen at every stage of handling, from the tank to the moment of insemination.",
      },
    ],
  },
  {
    slug: "temperature-conception-study",
    title: "How 1.5°C Cost 12 Conception Points",
    category: "case",
    categoryLabel: "Case Study",
    tagClass: "tag-case",
    emoji: "📊",
    description:
      "280 cows, same semen, same protocol, same day. One handling variable changed everything.",
    downloadTitle: "Download: How 1.5°C Cost 12 Conception Points",
    downloadButtonText: "Download PDF →",
    downloadDescription:
      "Enter your email to download this case study and get free access to new content with a subscription.",
    content: [
      {
        heading: "Background",
        paragraph:
          "Luciano Penteado, owner of Firmasa Tecnologia Para Pecuaria — one of Brazil’s leading FTAI specialists — ran a field test on 280 cows. Same semen. Same protocol. Same day. Two groups differing only in straw handling.",
      },
      {
        heading: "The test",
        items: [
          "Group A: pulled 10 straws at a time — temperature variation above 1.5°C",
          "Group B: pulled 3 straws at a time — variation kept below 1.5°C",
        ],
      },
      {
        heading: "Result",
        paragraph:
          "44% vs 56% conception. 12 percentage points. From one handling step. The sperm looked normal — it would pass a visual assessment — but a specific protein responsible for oocyte penetration was damaged during the temperature drop.",
      },
      {
        heading: "Practical checklist",
        items: [
          "Pull straws 3 at a time — never 10+",
          "Transfer from tank to bath in under 5 seconds",
          "Thaw at 35–37°C for minimum 30 seconds (45–60 best)",
          "Use within 5 minutes of thawing",
          "Check one straw from the batch before committing the rest",
        ],
      },
    ],
  },
  {
    slug: "pre-season-checklist",
    title: "Pre-Season Semen Quality Checklist",
    category: "protocol",
    categoryLabel: "Protocol",
    tagClass: "tag-protocol",
    emoji: "📋",
    description:
      "What to verify before the season starts. Equipment, storage, team readiness — one page, printable.",
    downloadTitle: "Download Pre-Season Semen Quality Checklist",
    downloadButtonText: "Download PDF →",
    downloadDescription:
      "Enter your email to download this checklist and get free access to new content with a subscription.",
    content: [
      {
        heading: "Equipment",
        items: [
          "Thawing bath calibrated to 35–37°C",
          "Tweezers precooled in nitrogen vapor",
          "Insemination guns cleaned and warmed",
          "Thermometer calibrated and working",
          "Clean dry towels available at station",
        ],
      },
      {
        heading: "Storage",
        items: [
          "Nitrogen level above 4 inches (10 cm)",
          "Tank inventory updated and verified",
          "Canister positions documented",
          "Tank stored off ground, dry environment",
        ],
      },
      {
        heading: "Team",
        items: [
          "All technicians briefed on 5-second transfer rule",
          "Recording sheets ready (date / cow / bull / tech)",
          "Backup equipment available on-site",
        ],
      },
    ],
  },
  {
    slug: "semen-analysis-report",
    title: "Reading a Semen Analysis Report: What the Numbers Actually Mean",
    category: "guide",
    categoryLabel: "Guide",
    tagClass: "tag-guide",
    emoji: "🔬",
    description:
      "Motility, morphology, concentration — how to interpret results and what to do when numbers are borderline.",
    downloadTitle: "Download: Reading a Semen Analysis Report",
    downloadButtonText: "Download PDF →",
    downloadDescription:
      "Enter your email to download this guide and get free access to new content with a subscription.",
    content: [
      {
        heading: "Understanding the numbers",
        items: [
          "Total motility: percentage of all moving sperm — minimum 50% for approval",
          "Progressive motility: sperm moving forward in a straight line — minimum 30%",
          "Concentration: sperm cells per ml — varies by species and dose requirements",
          "Morphology: percentage of normal-shaped sperm — minimum 70% normal",
        ],
      },
      {
        heading: "Borderline results — what to do",
        items: [
          "Re-test with a fresh straw from the same batch before rejecting",
          "Check thawing protocol — temperature errors cause false-low motility",
          "Compare against the bull’s historical baseline if available",
          "Consider dose adjustment rather than full batch rejection",
        ],
      },
      {
        heading: "MAKSA vs CASA correlation",
        paragraph:
          "MAKSA correlates with CASA systems at r > 0.90, meaning results are statistically equivalent for field use. Minor differences in absolute values are normal — use consistent methodology for trend tracking.",
      },
    ],
  },
  {
    slug: "ai-center-benchmark",
    title: "AI Center Benchmark: 3 Technicians, Same Bull, Different Results",
    category: "case",
    categoryLabel: "Case Study",
    tagClass: "tag-case",
    emoji: "🐄",
    description:
      "Why conception rates varied 18 points between technicians handling identical semen on the same day.",
    downloadTitle: "Download: AI Center Benchmark Case Study",
    downloadButtonText: "Download PDF →",
    downloadDescription:
      "Enter your email to download this case study and get free access to new content with a subscription.",
    content: [
      {
        heading: "Background",
        paragraph:
          "An internal audit at a large AI center compared conception rates across 3 technicians handling identical semen batches from the same bull on the same day.",
      },
      {
        heading: "The findings",
        items: [
          "Technician A: 61% conception rate",
          "Technician B: 54% conception rate",
          "Technician C: 43% conception rate",
        ],
        paragraph: "An 18-point gap. Same bull. Same semen. Same day.",
      },
      {
        heading: "Root causes identified",
        items: [
          "Differences in straw exposure time during canister retrieval (3 sec vs 11 sec)",
          "Inconsistent thawing bath temperature maintenance between straws",
          "Variation in gun pre-warming practice",
          "Different straw handling — one technician used bare hands",
        ],
      },
      {
        heading: "What changed after the audit",
        items: [
          "Standardized handling protocol posted at every insemination station",
          "Pre-season semen quality checks introduced for all technicians",
          "Conception rate gap narrowed to 4 points within one season",
        ],
      },
    ],
  },
  {
    slug: "conception-rate-tracking",
    title: "Seasonal Conception Rate Tracking Template",
    category: "protocol",
    categoryLabel: "Protocol",
    tagClass: "tag-protocol",
    emoji: "📈",
    description:
      "Spreadsheet template for tracking conception rates by bull, technician, and date. Includes benchmarks.",
    downloadTitle: "Download: Conception Rate Tracking Template",
    downloadButtonText: "Download Excel →",
    downloadDescription:
      "Enter your email to download this template and get free access to new content with a subscription.",
    content: [
      {
        heading: "Overview",
        paragraph:
          "Track conception rates by bull, technician, date, and season. Identify underperformers early and benchmark against your historical baseline.",
      },
      {
        heading: "What the template includes",
        items: [
          "Monthly conception rate by bull and technician",
          "Season-over-season comparison columns",
          "Automatic average calculation per bull and per technician",
          "Industry benchmark reference: 50–60% for cattle, 65–75% for sheep",
          "Notes column for protocol changes and environmental factors",
        ],
      },
      {
        heading: "How to use it",
        items: [
          "Enter results within 24 hours of each insemination session",
          "Review weekly with your team — flag any technician below 45%",
          "Use the season summary tab for annual reporting",
        ],
      },
    ],
  },
];

export function getMaterialBySlug(slug: string): Material | undefined {
  return materials.find((m) => m.slug === slug);
}

export function getOtherMaterials(slug: string): Material[] {
  return materials.filter((m) => m.slug !== slug);
}
