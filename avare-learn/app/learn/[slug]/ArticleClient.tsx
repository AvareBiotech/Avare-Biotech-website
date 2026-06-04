"use client";

import type { Material } from "@/app/data/materials";
import { useLang, useUI, useDateFmt, localize } from "./i18n";
import { DownloadModal } from "./DownloadModal";

export function ArticleBody({
  material: base,
  published,
}: {
  material: Material;
  published: string;
}) {
  const { lang } = useLang();
  const t = useUI();
  const fmt = useDateFmt();
  const m = localize(base, lang);

  return (
    <>
      <section className="learn-hero">
        <div className="learn-hero-inner">
          <span className="tag">{m.categoryLabel}</span>
          <h1>{m.title}</h1>
          <div className="learn-date">{fmt(published)}</div>
        </div>
      </section>

      <div className="learn-cover">
        <div className="learn-cover-img">
          {m.coverImage ? (
            <img
              src={m.coverImage}
              alt={m.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          ) : (
            m.emoji
          )}
        </div>
      </div>

      <article className="learn-content">
        {m.content.map((section, i) => (
          <div key={i}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.items && (
              <ul>
                {section.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
            {section.paragraph && <p>{section.paragraph}</p>}
          </div>
        ))}

        <DownloadModal
          title={m.downloadTitle}
          description={m.downloadDescription}
          buttonText={t("downloadPdf")}
          pdfs={m.pdfs}
        />
      </article>
    </>
  );
}

export function LearnFooter() {
  const t = useUI();
  return (
    <footer className="learn-footer">
      <span>{t("rights")}</span>
    </footer>
  );
}
