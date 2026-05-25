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
      "Temperature errors during thawing cost more than any equipment failure. Here’s what actually matters.",
    downloadTitle: "Download: Semen Storage & Handling Checklist",
    downloadButtonText: "Download PDF →",
    downloadDescription:
      "Enter your email to download this checklist and get free access to new content with a subscription.",
    content: [
      {
        heading: "The problem",
        paragraph:
          "Temperature variation above 1.5°C during handling damages the protein responsible for oocyte penetration. The sperm looks normal under microscope — but it can’t fertilize.",
      },
      {
        heading: "10 critical steps",
        items: [
          "Remove canister from nitrogen tank, work below frost line — max 10 seconds",
          "Use precooled tweezers, transfer straw to thaw bath in 5 seconds or less",
          "Thaw at 95°F (35°C) for 45–60 seconds in temperature-controlled bath",
          "Pull 3 straws at a time — never 10+",
          "Pre-warm gun to prevent cold shock",
          "Remove straw, dry with clean towel — do not touch with bare hands",
          "Load straw in gun, plug end first",
          "Cut straw at right angle at semen level",
          "Use within 5 minutes of thawing",
          "Record: date, cow, bull, technician",
        ],
      },
      {
        heading: "Storage rules",
        items: [
          "Keep canisters below frost line at all times",
          "Check nitrogen level weekly, keep above 4 inches (10 cm)",
          "Store tank raised off ground in dry environment",
          "Update inventory every time semen enters or exits the tank",
        ],
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
