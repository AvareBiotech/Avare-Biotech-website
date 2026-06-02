"use client";

import { useState, useRef, useCallback, useEffect } from "react";

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
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonText: string;
  pdfUrl?: string;
}) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const downloadUrl = pdfUrl || PDF_URL;

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
      alert("Please enter a valid email.");
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
      setDone(true);
      setSending(false);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = downloadUrl.split("/").pop() || "download.pdf";
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 700);
  }

  function handleDirectDownload() {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = downloadUrl.split("/").pop() || "download.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
                <p className="learn-success-msg">&#10003; Subscribed!</p>
                <p className="learn-success-detail" style={{ marginBottom: "16px" }}>
                  Your PDF is downloading. If it did not start,{" "}
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline" }}>click here</a>.
                </p>
                <button className="learn-lock-submit" onClick={handleDirectDownload}>
                  {buttonText}
                </button>
              </>
            ) : (
              <>
                <div className="learn-lock-label">
                  &darr; Download — enter your email
                </div>
                <p>{description}</p>
                <input
                  type="email"
                  placeholder="Email address"
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
                  {sending ? "Sending..." : buttonText}
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
}: {
  title: string;
  description: string;
  buttonText: string;
  pdfUrl?: string;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button className="learn-download-btn" onClick={() => setOpen(true)}>
        {buttonText}
      </button>
      <DownloadModalDialog
        open={open}
        onClose={close}
        title={title}
        description={description}
        buttonText={buttonText}
        pdfUrl={pdfUrl}
      />
    </>
  );
}