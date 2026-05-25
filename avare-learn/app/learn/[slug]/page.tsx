import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  materials,
  getMaterialBySlug,
  getOtherMaterials,
} from "@/app/data/materials";
import { DownloadModal } from "./DownloadModal";
import { Carousel } from "./Carousel";
import { Nav } from "./Nav";
import "./learn.css";

export async function generateStaticParams() {
  return materials.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) return {};
  return {
    title: `${material.title} — Avare Biotech`,
    description: material.description,
    openGraph: {
      title: material.title,
      description: material.description,
      siteName: "Avare Biotech",
    },
  };
}

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) notFound();

  const others = getOtherMaterials(slug);

  return (
    <div className="learn-page">
      <link
        rel="preconnect"
        href="https://api.fontshare.com"
      />
      <link
        href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap"
        rel="stylesheet"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://raw.githubusercontent.com/AvareBiotech/Avare-Biotech-website/main/assets/media/images/fav.png"
      />

      <Nav />

      {/* HERO */}
      <section className="learn-hero">
        <div className="learn-hero-inner">
          <span className="tag">{material.categoryLabel}</span>
          <h1>{material.title}</h1>
        </div>
      </section>

      {/* COVER IMAGE */}
      <div className="learn-cover">
        <div className="learn-cover-img">{material.emoji}</div>
      </div>

      {/* CONTENT */}
      <article className="learn-content">
        {material.content.map((section, i) => (
          <div key={i}>
            <h2>{section.heading}</h2>
            {section.paragraph && <p>{section.paragraph}</p>}
            {section.items && (
              <ul>
                {section.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <DownloadModal
          title={material.downloadTitle}
          description={material.downloadDescription}
          buttonText={material.downloadButtonText}
        />
      </article>

      <hr className="learn-divider" />

      {/* OTHER MATERIALS */}
      <section className="learn-others">
        <Carousel items={others} />
      </section>

      {/* FOOTER */}
      <footer className="learn-footer">
        <span>&copy; 2026 Avare Biotech. All rights reserved.</span>
      </footer>
    </div>
  );
}
