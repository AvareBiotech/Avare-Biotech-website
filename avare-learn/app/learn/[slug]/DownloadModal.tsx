"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const LEARN_SCRIPT =
  "https://script.google.com/macros/s/AKfycbwuKsYVg_3x3RbBnxY0RUlFjE4tldmErUWRddqPDXg4xQxsOqqT19wTeGsxRqcW5jyK/exec";

export function DownloadModalDialog({
  open,
  onClose,
  title,
  description,
  buttonText,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonText: string;
}) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

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
      setDone(true);
      setSending(false);
    }, 700);
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
                <p className="learn-success-detail">
                  Download link sent to{" "}
                  <strong style={{ color: "var(--text)" }}>{email}</strong>
                </p>
                <button
                  className="learn-download-btn"
                  style={{ marginTop: 16 }}
                  onClick={() => alert("PDF download — link coming soon")}
                >
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
}: {
  title: string;
  description: string;
  buttonText: string;
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
      />
    </>
  );
}
