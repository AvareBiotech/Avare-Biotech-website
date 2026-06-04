"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useUI } from "./i18n";

const LEARN_SCRIPT =
  "https://script.google.com/macros/s/AKfycbwuKsYVg_3x3RbBnxY0RUlFjE4tldmErUWRddqPDXg4xQxsOqqT19wTeGsxRqcW5jyK/exec";

const PDF_URL =
  "https://raw.githubusercontent.com/AvareBiotech/Avare-Biotech-website/main/assets/media/learn-pdf/semen-storage-handling.pdf";

export function useSubscribed() {
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSubscribed(localStorage.getItem("learn_subscribed") === "1");
    }
    function onSubscribe() {
      setSubscribed(true);
    }
    window.addEventListener("learn_subscribed", onSubscribe);
    return () => window.removeEventListener("learn_subscribed", onSubscribe);
  }, []);
  return subscribed;
}

export function DownloadModalDialog({
  open,
  onClose,
  title,
  description,
  buttonText,
  pdfUrl,
  pdfs,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonText: string;
  pdfUrl?: string;
  pdfs?: { label: string; url: string }[];
}) {
  const t = useUI();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const langs = pdfs && pdfs.length > 0 ? pdfs : null;
  const downloadUrl = pdfUrl || (langs ? langs[0].url : PDF_URL);

  useEffect(() => {
    if (open && typeof window !== "undefined") {
      if (localStorage.getItem("learn_subscribed") === "1") {
        setDone(true);
      }
    }
    if (!open) {
      setEmail("");
      setSending(false);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  async function handleSubmit() {
    if (!email || !email.includes("@")) {
      alert(t("invalidEmail"));
      return;
    }
    setSending(true);
    try {
      await fetch(
        LEARN_SCRIPT +
          "?" +
          new URLSearchParams({ type: "learn_subscribe", email }).toString(),
        { method: "GET", mode: "no-cors" }
      );
    } catch {
      // silent
    }
    setTimeout(() => {
      localStorage.setItem("learn_subscribed", "1");
      window.dispatchEvent(new Event("learn_subscribed"));
      setDone(true);
      setSending(false);
      if (!langs) {
        downloadFrom(downloadUrl);
      }
    }, 700);
  }

  function downloadFrom(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop() || "download.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handleDirectDownload() {
    downloadFrom(downloadUrl);
  }

  return (
    <div
      ref={overlayRef}
      className={`learn-modal-overlay${open ? " open" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="learn-modal">
        <div className="learn-modal-header">
          <div className="learn-modal-title">{title}</div>
          <button className="learn-modal-close" onClick={onClose}>
            &#10005;
          </button>
        </div>
        <div className="learn-modal-body">
          <div className="learn-lock-form">
            {done ? (
              <>
                <p className="learn-success-msg">&#10003; {t("subscribedMsg")}</p>
                {langs ? (
                  <>
                    <p
                      className="learn-success-detail"
                      style={{ marginBottom: "12px" }}
                    >
                      {t("chooseLanguage")}
                    </p>
                    {langs.map((p) => (
                      <button
                        key={p.url}
                        className="learn-lock-submit"
                        style={{ marginBottom: "8px" }}
                        onClick={() => downloadFrom(p.url)}
                      >
                        &darr; {p.label}
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    <p className="learn-success-detail" style={{ marginBottom: "16px" }}>
                      {t("downloadingMsg")}{" "}
                      <a href={downloadUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline" }}>{t("clickHere")}</a>.
                    </p>
                    <button className="learn-lock-submit" onClick={handleDirectDownload}>
                      {buttonText}
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="learn-lock-label">{t("enterEmailLabel")}</div>
                <p>{description}</p>
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit();
                  }}
                />
                <button
                  className="learn-lock-submit"
                  onClick={handleSubmit}
                  disabled={sending}
                >
                  {sending ? t("sending") : buttonText}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DownloadModal({
  title,
  description,
  buttonText,
  pdfUrl,
  pdfs,
}: {
  title: string;
  description: string;
  buttonText: string;
  pdfUrl?: string;
  pdfs?: { label: string; url: string }[];
}) {
  const [open, setOpen] = useState(false);
  const subscribed = useSubscribed();
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button className="learn-download-btn" onClick={() => setOpen(true)}>
        {subscribed ? "↓ " : "🔒 "}{buttonText}
      </button>
      <DownloadModalDialog
        open={open}
        onClose={close}
        title={title}
        description={description}
        buttonText={buttonText}
        pdfUrl={pdfUrl}
        pdfs={pdfs}
      />
    </>
  );
}