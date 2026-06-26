import type { Material } from "@/app/data/materials";
import { DownloadModal } from "./DownloadModal";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Серверный компонент: тело статьи рендерится на сервере (в исходном HTML),
// поэтому Nayda переводит его и клиентская гидрация не затирает перевод.
export function ArticleBody({
  material: m,
  published,
}: {
  material: Material;
  published: string;
}) {
  return (
    <>
      <section className="learn-hero">
        <div className="learn-hero-inner">
          <span className="tag">{m.categoryLabel}</span>
          <h1>{m.title}</h1>
          <div className="learn-date">{formatDate(published)}</div>
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
          buttonText="Download PDF"
          pdfs={m.pdfs}
        />
      </article>
    </>
  );
}
