export type MaterialCategory = "guide" | "case" | "protocol";

export interface ContentSection {
  heading?: string;
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
  pdfs?: { label: string; url: string }[];
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
    description:
      "Temperature errors during thawing cost more than any equipment failure. Here's what actually matters.",
    downloadTitle: "Download: Semen Storage & Handling Checklist",
    downloadButtonText: "Download PDF",
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
    slug: "semen-quality-analysis",
    title:
      "Check Avare App for Yourself: A Field QA Protocol vs CASA and Manual Count",
    category: "protocol",
    categoryLabel: "Protocol",
    tagClass: "tag-protocol",
    emoji: "🔬",
    coverImage:
      "https://raw.githubusercontent.com/AvareBiotech/Avare-Biotech-website/main/assets/media/images/Article-semen-quality-analysis.png",
    description:
      "This protocol confirms that Avare App reads motility and concentration as accurately as CASA and manual count — and works where no lab system is within reach.",
    downloadTitle: "Download: Avare App QA Protocol",
    downloadButtonText: "Download PDF",
    downloadDescription:
      "Enter your email to download this protocol and get free access to new content with a subscription.",
    pdfs: [
      {
        label: "English",
        url: "https://raw.githubusercontent.com/AvareBiotech/Avare-Biotech-website/main/assets/media/qa-protocols/02_Semen_QA_Protocol_Avare_Biotech_en.pdf",
      },
      {
        label: "Português",
        url: "https://raw.githubusercontent.com/AvareBiotech/Avare-Biotech-website/main/assets/media/qa-protocols/01_Protocolo_QA_semen_Avare_Biotech_pt.pdf",
      },
      {
        label: "العربية",
        url: "https://raw.githubusercontent.com/AvareBiotech/Avare-Biotech-website/main/assets/media/qa-protocols/03_QA_Protocol_Avare_Biotech_ar.pdf",
      },
    ],
    content: [
      {
        heading: "A wrong number does not look wrong",
        paragraph:
          "Every insemination starts with three numbers: total motility, progressive motility, concentration. Those numbers decide whether a straw goes into a cow or into the bin. They decide whether a bull stays in the catalog. They decide how a dose is split. And here is the uncomfortable part — when one of those numbers is wrong, nothing on your screen tells you so. A motility reading that is 20% too high looks exactly like a motility reading that is correct. You do not find out at the microscope. You find out 35 days later, as an empty uterus on ultrasound, and by then it is written off as a bad cycle, stress, or the weather.",
      },
      {
        paragraph:
          "You put enormous effort into handling semen correctly — pulling three straws at a time, keeping the thaw bath in range, using the dose within minutes. Then you hand the final judgment to a measurement method and assume it is right. That assumption is worth checking. This is exactly what a QA protocol is for: to confirm that Avare App puts a number you can trust behind every insemination — especially where no lab system is within reach.",
      },
      {
        heading: "Avare App works where CASA can't reach",
        paragraph:
          "Avare App (MAKSA technology) puts semen analysis in your smartphone: total motility, progressive motility, and concentration — next to every inseminator, in the field, with no tie to a lab bench. This is not an attempt to replace CASA. CASA is an excellent reference where it exists: precise, repeatable, a deserved gold standard. But it is expensive, fixed to the lab, and physically absent from most field stations and farms. That is exactly the gap Avare App fills — a reliable read at the point where insemination actually happens and where there is no CASA.",
      },
      {
        paragraph:
          "In studies, MAKSA correlates with CASA systems at r > 0.90 — meaning results are statistically equivalent for field use. The QA protocol lets you see that on your own samples: cross-check Avare App's readings against recognized references and confirm the numbers line up in your conditions. There are two references:",
      },
      {
        items: [
          "CASA — a precise, repeatable reference where the system is available on site. The ideal second pair of eyes for the cross-check.",
          "Manual counting — a reference available almost everywhere. But it is only as steady as the hand and eye behind it: an internal audit at one AI center found an 18-point conception gap between three technicians handling identical semen from the same bull on the same day. If technique varies that much on the floor, it varies at the counting chamber too.",
        ],
      },
      {
        paragraph:
          "The point of the protocol is to make your semen analysis more accurate and more reliable. You compare Avare App's readings against other systems on the same sample, on the same day, in your conditions, and confirm the numbers agree. Confirmed agreement means one thing: the app's result can be trusted, and the quality of your analysis stays steady from straw to straw.",
      },
      {
        heading: "How the protocol works: one sample, cross-checked",
        paragraph:
          "You take 3–5 frozen–thawed straws from different animals. For each straw you take a reading in Avare App, then run the same sample through the references — CASA (if available on site) and a manual count under the microscope. You record total motility, progressive motility, and concentration for every method, side by side, and see how far the app's readings sit from the references.",
      },
      {
        paragraph:
          "That is the entire logic. The discipline is in the execution: thaw the straw correctly (37 °C, 30–45 seconds), pre-warm the slide to 37–38 °C, and — this matters more than people expect — match the loaded volume to your cover-slip size. Too much or too little sample under the glass changes the depth of the field, and a wrong depth quietly biases concentration and motility for every method at once. The full protocol includes the cover-slip-to-volume table, the recording sheet, and the step-by-step so the comparison is fair.",
      },
      {
        heading: "The number that tells you whether to trust the number",
        paragraph:
          "This is where the validation protocol stops being a suggestion and becomes a standard. The acceptance criterion is simple:",
      },
      {
        items: [
          "±10–15% difference between Avare App and the references = acceptable. The app agrees with CASA and the manual count. Trust the number.",
          "More than 15% deviation = investigate. Attach photo or video evidence, and repeat with a fresh slide.",
        ],
      },
      {
        paragraph:
          "A spread above 15% is not a rounding error — it is the method telling you something is off: loading volume, slide temperature, an air bubble, or a real discrepancy worth chasing before it reaches a cow. Most \"the app and CASA disagree\" complaints disappear the moment volume is matched to cover-slip size and the slide is properly warmed. The threshold turns a vague worry into a clear pass/fail you can put in a report.",
      },
      {
        heading: "You don't have to waste the straw",
        paragraph:
          "The most common objection to validation is that it burns inventory. It doesn't. Pulling 10 µL from a 0.25–0.5 mL straw does not prevent insemination if it is done immediately. Best practice at AI stations is to take a single drop from the straw for the Avare analysis and inseminate the remaining ~90% right away. You validate your method and breed the cow from the same straw. There is no trade-off to manage.",
      },
      {
        heading: "Why a 15% error is not a 15% problem",
        paragraph:
          "A measurement error does not stay inside the spreadsheet. It walks straight into your conception rate. Reject a good batch on a falsely low motility read and you have discarded paid-for genetics. Approve a weak batch on a falsely high read and you have inseminated cows that will come back open. The cost is the same one that runs through every article on this site: a cow that fails to conceive at first service costs roughly $622 in repeat treatment, management, and a stretched calving interval, and cows needing three or more services cost over $205 per head per year. Across a 500-cow herd, the gap between a 44% and a 56% conception rate is 60 open cows. A measurement you cannot trust is not cheaper than a good one — it is the most expensive instrument in the station, because it bills you 35 days after the mistake, with interest.",
      },
      {
        heading: "What this means for practice",
        paragraph:
          "Validating your analysis method is not a research exercise — it is a production control, the same way pre-cooling tweezers and timing the thaw are production controls. Run the QA protocol at the start of each season, after any equipment or software change, and any time a method gives you a result you would not have expected from that bull. Three to five straws and one afternoon buy you a season of numbers you can actually act on. Everything else you do — handling, storage, dose math — assumes the analysis is right. This is how you stop assuming and start knowing.",
      },
      {
        heading: "Download the protocol",
        paragraph:
          "Download the full Avare App QA Protocol PDF — the complete step-by-step, the cover-slip-to-volume table, the example recording sheet, and the ±15% validation thresholds. Run Avare App against CASA and manual count this season, confirm it for yourself, and put a trusted number behind every insemination.",
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