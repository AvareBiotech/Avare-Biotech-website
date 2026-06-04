"use client";

import { useState, useCallback } from "react";
import type { Material } from "@/app/data/materials";
import { DownloadModalDialog, useSubscribed } from "./DownloadModal";
import { useLang, useUI, localize } from "./i18n";

export function Carousel({ items }: { items: Material[] }) {
  const [page, setPage] = useState(0);
  const [dlMaterial, setDlMaterial] = useState<Material | null>(null);
  const closeModal = useCallback(() => setDlMaterial(null), []);
  const subscribed = useSubscribed();
  const { lang } = useLang();
  const t = useUI();
  const totalPages = items.length;

  const dl = dlMaterial ? localize(dlMaterial, lang) : null;

  return (
    <div className="carousel">
      <div className="learn-others-title">{t("moreFromKb")}</div>
      <div className="carousel-stage">
        <button
          className="carousel-arrow carousel-arrow-left"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{ transform: `translateX(calc(-${page} * (100% + 16px)))` }}
          >
            {items.map((base) => {
              const m = localize(base, lang);
              return (
                <div key={m.slug} className="learn-card">
                  <a href={`/learn/${m.slug}`} className="learn-card-link">
                    <div className="learn-card-img" style={m.coverImage ? { padding: 0 } : undefined}>
                      {m.coverImage ? (
                        <img
                          src={m.coverImage}
                          alt={m.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      ) : (
                        m.emoji
                      )}
                    </div>
                    <div className="learn-card-body">
                      <div className="learn-card-tags">
                        <span className={`tag ${m.tagClass}`}>{m.categoryLabel}</span>
                      </div>
                      <div className="learn-card-title">{m.title}</div>
                      <div className="learn-card-desc">{m.description}</div>
                    </div>
                  </a>
                  <div className="learn-card-actions">
                    <a href={`/learn/${m.slug}`} className="learn-card-read">{t("read")}</a>
                    <button
                      className="learn-card-dl"
                      onClick={() => setDlMaterial(base)}
                      style={subscribed ? { opacity: 1, color: "var(--text)" } : {}}
                    >
                      {subscribed ? "↓ " : "🔒 "}{t("downloadPdf")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          className="carousel-arrow carousel-arrow-right"
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
          aria-label="Next"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <DownloadModalDialog
        open={dlMaterial !== null}
        onClose={closeModal}
        title={dl?.downloadTitle ?? ""}
        description={dl?.downloadDescription ?? ""}
        buttonText={t("downloadPdf")}
        pdfs={dl?.pdfs}
      />
    </div>
  );
}
