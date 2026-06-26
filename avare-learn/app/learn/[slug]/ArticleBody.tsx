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

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/*
  Тело статьи рендерится как «сырой» HTML через dangerouslySetInnerHTML.
  React не реконсилит содержимое такого блока при гидрации, поэтому перевод,
  который Nayda вставляет в серверный HTML, НЕ затирается английским из данных гидрации.
  Структура DOM 1:1 с прежней вёрсткой (CSS на классах/потомках — не ломается).
*/
function heroCoverHtml(m: Material, published: string): string {
  const cover = m.coverImage
    ? `<img src="${esc(m.coverImage)}" alt="${esc(m.title)}" style="width:100%;height:100%;object-fit:cover;border-radius:12px" />`
    : esc(m.emoji || "");
  return (
    `<section class="learn-hero"><div class="learn-hero-inner">` +
    `<span class="tag">${esc(m.categoryLabel)}</span>` +
    `<h1>${esc(m.title)}</h1>` +
    `<div class="learn-date">${esc(formatDate(published))}</div>` +
    `</div></section>` +
    `<div class="learn-cover"><div class="learn-cover-img">${cover}</div></div>`
  );
}

function sectionsHtml(m: Material): string {
  return m.content
    .map((section) => {
      let inner = "";
      if (section.heading) inner += `<h2>${esc(section.heading)}</h2>`;
      if (section.items) {
        inner +=
          `<ul>` +
          section.items.map((it) => `<li>${esc(it)}</li>`).join("") +
          `</ul>`;
      }
      if (section.paragraph) inner += `<p>${esc(section.paragraph)}</p>`;
      return `<div>${inner}</div>`;
    })
    .join("");
}

export function ArticleBody({
  material: m,
  published,
}: {
  material: Material;
  published: string;
}) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: heroCoverHtml(m, published) }} />
      <article className="learn-content">
        <div dangerouslySetInnerHTML={{ __html: sectionsHtml(m) }} />
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
