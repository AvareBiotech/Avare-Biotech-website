"use client";

import { useState, useCallback } from "react";
import type { Material } from "@/app/data/materials";
import { DownloadModalDialog, useSubscribed } from "./DownloadModal";

export function Carousel({ items }: { items: Material[] }) {
  const [page, setPage] = useState(0);
  const [dlMaterial, setDlMaterial] = useState<Material | null>(null);
  const closeModal = useCallback(() => setDlMaterial(null), []);
  const subscribed = useSubscribed();
  const totalPages = items.length;

  return (
    <div className="carousel">
      <div className="learn-others-title">More from the Knowledge Base</div>
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
            {items.map((m) => (
              <div key={m.slug} className="learn-card">
                <a href={`/learn/${m.slug}`} className="learn-card-link">
                  <div className="learn-card-img">{m.emoji}</div>
                  <div className="learn-card-body">
                    <div className="learn-card-tags">
                      <span className={`tag ${m.tagClass}`}>{m.categoryLabel}</span>
                    </div>
                    <div className="learn-card-title">{m.title}</div>
                    <div className="learn-card-desc">{m.description}</div>
                  </div>
                </a>
                <div className="learn-card-actions">
                  <a href={`/learn/${m.slug}`} className="learn-card-read">Read</a>
                  <button
                    className="learn-card-dl"
                    onClick={() => setDlMaterial(m)}
                    style={subscribed ? { opacity: 1, color: "var(--text)" } : {}}
                  >
                    {subscribed ? "↓ Download" : "🔒 Download"}
                  </button>
                </div>
              </div>
            ))}
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
        title={dlMaterial?.downloadTitle ?? ""}
        description={dlMaterial?.downloadDescription ?? ""}
        buttonText={dlMaterial?.downloadButtonText ?? "Download PDF →"}
        pdfUrl={dlMaterial?.coverImage}
      />
    </div>
  );
}