"use client";

import { useState } from "react";

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

const RAW = "https://raw.githubusercontent.com/AvareBiotech/Avare-Biotech-website/main/assets/media";
const VIDEOS = [
  { label: "English", id: "CdFFHB0CZUg" },
  { label: "Portugu\u00eas", id: "B8y8rR0Y4Xw" },
];
const PROTOCOLS = [
  { name: "Semen QA Protocol (English)", file: RAW + "/qa-protocols/02_Semen_QA_Protocol_Avare_Biotech_en.pdf" },
  { name: "Protocolo QA Semen (Portugu\u00eas)", file: RAW + "/qa-protocols/01_Protocolo_QA_semen_Avare_Biotech_pt.pdf" },
];

export function LearnFooter() {
  const t = useUI();
  const [faqOpen, setFaqOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [protocolOpen, setProtocolOpen] = useState(false);
  const [playerSrc, setPlayerSrc] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pdfSrc, setPdfSrc] = useState("");

  const openView = (file: string) =>
    setPdfSrc("https://docs.google.com/gview?url=" + file + "&embedded=true");

  return (
    <>
      <footer>
        <div className="av-footer-main">
          <div className="av-footer-main__map">
            <img src={RAW + "/images/premium_dotted_world_map_avare%203.svg"} alt="" />
          </div>
          <div className="av-footer-main__grid">
            <div className="av-footer-main__col">
              <div className="av-footer-main__title">{t("footerDownload")}</div>
              <div className="av-footer-main__stores">
                <a href="https://apps.apple.com/ae/app/avare-biotech/id6744607449" target="_blank" rel="noopener" className="av-footer-main__store-btn"><img src={RAW + "/images/apple-white.svg"} alt="" /> App Store</a>
                <a href="https://play.google.com/store/apps/details?id=com.biotech.app.android&hl=en" target="_blank" rel="noopener" className="av-footer-main__store-btn"><img src="https://www.logo.wine/a/logo/Google_Play/Google_Play-Icon-Logo.wine.svg" alt="" style={{ width: 18, height: 18 }} /> Google Play</a>
              </div>
            </div>
            <div className="av-footer-main__col">
              <div className="av-footer-main__title">{t("footerProduct")}</div>
              <div className="av-footer-main__links">
                <a href="https://avareit.com/#maksa" className="av-footer-main__link">MAKSA</a>
                <a href="https://avareit.com/learn" className="av-footer-main__link">Blog</a>
                <a href="https://avareit.com/#pricing" className="av-footer-main__link">{t("footerPricing")}</a>
                <a href="https://avareit.com/" target="_blank" rel="noopener" className="av-footer-main__link">{t("footerCases")}</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setVideoOpen(true); }} className="av-footer-main__link">{t("footerVideo")}</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setProtocolOpen(true); }} className="av-footer-main__link">{t("footerProtocol")}</a>
                <a href="#" onClick={(e) => { e.preventDefault(); setFaqOpen(true); }} className="av-footer-main__link">{t("footerFaq")}</a>
              </div>
            </div>
            <div className="av-footer-main__col">
              <div className="av-footer-main__title">{t("footerLegal")}</div>
              <div className="av-footer-main__links">
                <a href="https://avareit.com/privacy-policy" target="_blank" rel="noopener" className="av-footer-main__link">{t("footerPrivacy")}</a>
                <a href="https://avareit.com/terms-of-use" target="_blank" rel="noopener" className="av-footer-main__link">{t("footerTerms")}</a>
              </div>
            </div>
            <div className="av-footer-main__col">
              <div className="av-footer-main__title">{t("footerSupport")}</div>
              <div className="av-footer-main__links">
                <a href="https://api.whatsapp.com/send/?phone=971506412775&text&type=phone_number&app_absent=0" target="_blank" rel="noopener" className="av-footer-main__link">{t("footerContact")}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="av-footer"><span className="av-footer__copy">{t("rights")}</span></div>
      </footer>

      {/* FAQ */}
      <div className={"av-faq-overlay" + (faqOpen ? " open" : "")} onClick={(e) => { if (e.target === e.currentTarget) setFaqOpen(false); }}>
        <div className="av-faq-popup">
          <button className="av-faq-close" onClick={() => setFaqOpen(false)}>&#10005;</button>
          <div className="av-faq-title">{t("faqTitle")}</div>
          <div className="av-faq-list">
            {Array.from({ length: 11 }, (_, k) => k + 1).map((i) => (
              <div key={i} className={"av-faq-item" + (openFaq === i ? " open" : "")}>
                <div className="av-faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{t("faqQ" + i)}</span>
                  <span className="av-faq-arrow">&#9660;</span>
                </div>
                <div className="av-faq-answer">{t("faqA" + i)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video */}
      <div className={"av-video-overlay" + (videoOpen ? " open" : "")} onClick={(e) => { if (e.target === e.currentTarget) setVideoOpen(false); }}>
        <div className="av-video-popup">
          <button className="av-video-close" onClick={() => setVideoOpen(false)}>&#10005;</button>
          <div className="av-video-title">{t("videoTitle")}</div>
          <div className="av-video-grid">
            {VIDEOS.map((v) => (
              <div className="av-video-item" key={v.id}>
                <div className="av-video-thumb" onClick={() => setPlayerSrc("https://www.youtube.com/embed/" + v.id + "?autoplay=1")}>
                  <img src={"https://img.youtube.com/vi/" + v.id + "/hqdefault.jpg"} alt={v.label} />
                  <div className="av-video-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></div>
                </div>
                <span className="av-video-label">{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={"av-video-player-overlay" + (playerSrc ? " open" : "")} onClick={(e) => { if (e.target === e.currentTarget) setPlayerSrc(""); }}>
        <div className="av-video-player-wrap">
          <button className="av-video-close" onClick={() => setPlayerSrc("")}>&#10005;</button>
          <iframe src={playerSrc} frameBorder={0} allow="autoplay; fullscreen" allowFullScreen></iframe>
        </div>
      </div>

      {/* Protocol */}
      <div className={"av-protocol-overlay" + (protocolOpen ? " open" : "")} onClick={(e) => { if (e.target === e.currentTarget) setProtocolOpen(false); }}>
        <div className="av-protocol-popup">
          <button className="av-protocol-close" onClick={() => setProtocolOpen(false)}>&#10005;</button>
          <div className="av-protocol-title">{t("protocolTitle")}</div>
          <div className="av-protocol-files">
            {PROTOCOLS.map((pf) => (
              <div className="av-protocol-file" key={pf.file}>
                <span className="av-protocol-file-badge">PDF</span>
                <span className="av-protocol-file-name">{pf.name}</span>
                <div className="av-protocol-file-actions">
                  <button className="av-protocol-file-btn av-protocol-view-btn" onClick={() => openView(pf.file)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> {t("protocolView")}
                  </button>
                  <a href={pf.file} download className="av-protocol-file-btn av-protocol-download-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg> {t("protocolDownload")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF preview (встроенный просмотр протокола) */}
      <div className={"av-pdf-overlay" + (pdfSrc ? " open" : "")} onClick={(e) => { if (e.target === e.currentTarget) setPdfSrc(""); }}>
        <div className="av-pdf-wrap">
          <button className="av-pdf-close" onClick={() => setPdfSrc("")}>&#10005;</button>
          <iframe src={pdfSrc} frameBorder={0}></iframe>
        </div>
      </div>
    </>
  );
}
