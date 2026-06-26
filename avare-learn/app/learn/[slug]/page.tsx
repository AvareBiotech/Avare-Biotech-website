import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  materials,
  getMaterialBySlug,
  getOtherMaterials,
} from "@/app/data/materials";
import { Carousel } from "./Carousel";
import { Nav } from "./Nav";
import { LangProvider } from "./i18n";
import { ArticleBody } from "./ArticleBody";
import { LearnFooter } from "./ArticleClient";
import "./learn.css";

// Дата сборки (= день деплоя) как дефолт для статей без явной даты
const BUILD_DATE = new Date().toISOString().slice(0, 10);

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
  const url = `https://avareit.com/learn/${slug}`;
  const images = material.coverImage ? [material.coverImage] : undefined;
  return {
    title: material.title,
    description: material.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: material.title,
      description: material.description,
      siteName: "Avare Biotech",
      images,
      publishedTime: material.datePublished || BUILD_DATE,
    },
    twitter: {
      card: "summary_large_image",
      title: material.title,
      description: material.description,
      images,
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
  const published = material.datePublished || BUILD_DATE;
  const pageUrl = `https://avareit.com/learn/${slug}`;
  const LOGO =
    "https://raw.githubusercontent.com/AvareBiotech/Avare-Biotech-website/main/assets/media/images/fav.png";
  const publisher = {
    "@type": "Organization",
    name: "Avare Biotech Inc.",
    url: "https://avareit.com",
    logo: { "@type": "ImageObject", url: LOGO },
  };
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: material.title,
      description: material.description,
      image: material.coverImage ? [material.coverImage] : undefined,
      inLanguage: "en",
      datePublished: published,
      dateModified: published,
      author: publisher,
      publisher,
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://avareit.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Knowledge Base",
          item: "https://avareit.com/learn",
        },
        { "@type": "ListItem", position: 3, name: material.title, item: pageUrl },
      ],
    },
  ];

  return (
    <LangProvider>
      <div className="learn-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
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

        <ArticleBody material={material} published={published} />

        <hr className="learn-divider" />

        <section className="learn-others">
          <Carousel items={others} />
        </section>

        <LearnFooter />
      </div>
    </LangProvider>
  );
}
