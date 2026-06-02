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
  coverImage?: string;
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
    coverImage: "https://raw.githubusercontent.com/AvareBiotech/Avare-Biotech-website/main/assets/media/images/semen-storage-handling.png",
    downloadTitle: "Download: Semen Storage & Handling Checklist",
    downloadButtonText: "Download PDF →",
    downloadDescription:
      "Enter your email to download this checklist and get free access to new content with a subscription.",
    content: [
      {
        heading: "Some mistakes are visible right away",
        paragraph:
          "A straw dropped on the ground. A thaw bath not heated to the right temperature. Unsterilized equipment. These mistakes are easy to fix — because you can see them. But there is another category of mistakes. The ones you cannot see at all. The semen looks normal. It moves. It passes visual evaluation. And still does not fertilize. This is what the story of Luciano Penteado is about — and the field trial on 280 cows that changed the understanding of what actually drives the outcome of artificial insemination.",
      },
      {
        heading: "The Experiment That Should Not Have Been Necessary",
        paragraph:
          "Luciano Penteado is the owner of Firmasa Tecnologia Para Pecuaria, one of Brazil's leading companies in artificial insemination. Not a student. Not a theorist. A practitioner with years of experience. But it was at an inseminator training course that he first heard about the sensitivity of sperm proteins to temperature fluctuations during the transfer from the nitrogen tank to the thaw bath. And he decided to test it in the field. The experimental conditions were deliberately tight: the same semen, the same protocol, the same day, the same inseminators. The only variable was the number of straws pulled at one time.",
      },
      {
        heading: "The test",
        items: [
          "Group A: 10 straws at a time. Temperature fluctuations exceeded 1.5 degrees C.",
          "Group B: 3 straws at a time. Temperature fluctuations stayed within 1.5 degrees C.",
          "Result: 44% versus 56% fertilization. A 12 percentage point difference from a single handling step.",
        ],
        paragraph:
          "If you want to make sure your team is not losing results at this stage — download the practical checklist PDF \"Semen Storage & Handling: 10 Critical Steps\". It covers every step of semen handling from the tank to the moment of insemination.",
      },
      {
        heading: "Why Semen Looks Normal but Does Not Work",
        paragraph:
          "This is the most uncomfortable part. Because standard visual evaluation - motility, concentration, morphology - does not show the damage being described here. When straws are pulled from the nitrogen tank in large numbers, the temperature in the neck of the vessel rises sharply. Each fluctuation triggers a chain of molecular damage. The stages of cooling, freezing, and thawing harm sperm quality and cause dramatic changes in the cells. The formation of intracellular ice crystals, osmotic injury, and structural damage from oxidative stress reduce sperm viability and motility by up to 50%, while acrosome damage directly contributes to reduced fertility. Sublethal freezing damage remains an important limitation of the cryopreservation process, inevitably leading to reduced fertility in vivo. In other words: semen can be alive and incapable of fertilization at the same time. And no visual inspection will show that.",
      },
      {
        heading: "What Science Says About the Cost of Careless Handling",
        paragraph:
          "Penteado's study should not be seen as an isolated case. The scientific body of evidence accumulated over the past two decades tells the same story. Experts in bovine embryo transfer indicate that improper semen handling is likely a common cause of unfertilized ova collected from donor cows. Most people who work daily with frozen semen - including veterinarians - have never received formal training in safe long-term storage and handling. Research on Brahman bulls showed that to achieve the maximum fertility rate in an AI program, the overall quality of frozen-thawed semen in all aspects is critical. Studies show that even a 2-3 second difference in thawing time at the same temperature affects the final temperature of the straw - and this is reflected in non-return rates of cows after insemination. This is not about theoretical risks. It is about money already lost.",
      },
      {
        heading: "The Economics of One Mistake",
        paragraph:
          "A 12 percentage point difference is an abstraction until you start counting money. Research shows that a cow that fails to conceive at first insemination costs the operation an additional $622 per animal - covering expenses for repeated treatment, management, and losses from an extended calving interval. Another study found that in cows requiring three or more inseminations per conception, profit drops by more than $205 per year per head. Take a herd of 500 cows. With a 44% conception rate you get 220 pregnant cows. At 56% you get 280. The difference: 60 cows that did not conceive in this cycle. At $205 per head in additional losses - that is $12,300 per season in direct costs alone, not counting the missed calf or the extended calving interval. None of those cows will come back with an obviously empty result. Some simply will not become pregnant - and that will be written off as a bad cycle, stress, or the weather. Anything but a temperature spike during straw extraction.",
      },
      {
        heading: "The Industry's Invisible Problem",
        paragraph:
          "The most uncomfortable thing about this topic is that the problem is systemic. Not because people are irresponsible. But because standard semen evaluation does not show functional protein damage. Despite decades of refinement in cryopreservation protocols, extenders, and additives, post-thaw fertility remains unpredictable. The molecular mechanisms driving sperm cell damage and survival during freezing and thawing are still not fully understood. Visual assessment of motility and morphology does not see acrosomal protein damage. It does not see DNA fragmentation. It does not see what happened to the cell between the nitrogen tank and the insemination gun. This is exactly why handling errors remain invisible for so long. And this is exactly why Penteado's experiment is so valuable: it translated molecular biology into concrete numbers, measured in the field, on real animals, under real conditions.",
      },
      {
        heading: "What This Means for Practice",
        paragraph:
          "The conclusion from everything above is simple, but requires discipline. Semen is not just a liquid in a straw. It is a complex biological system sensitive to temperature changes even within 1-2 degrees. Every time the tank neck rises above the frost line, every time a straw lingers in the hand for extra seconds, every time equipment is not pre-cooled - invisible damage occurs that cannot be corrected at the next step. And that damage will not show up when you look through a microscope. It will show up 35 days later - as an empty uterus on ultrasound. A semen handling protocol is not a set of nice-to-have recommendations. It is a production standard that directly determines the financial outcome of every insemination cycle.",
      },
      {
        heading: "Download the checklist",
        paragraph:
          "Download the practical checklist PDF \"Semen Storage & Handling: 10 Critical Steps\" — specific steps that protect semen at every stage of handling, from the tank to the moment of insemination. Implement it in your team's protocol today.",
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
          "Luciano Penteado, owner of Firmasa Tecnologia Para Pecuaria — one of Brazil's leading FTAI specialists — ran a field test on 280 cows. Same semen. Same protocol. Same day. Two groups differing only in straw handling.",
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
          "Compare against the bull's historical baseline if available",
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