"use client";

import { useState } from "react";
import { useUI, LangSwitcher } from "./i18n";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useUI();

  return (
    <nav className="learn-nav">
      <a href="https://avareit.com" className="learn-nav-logo">
        <img
          src="https://raw.githubusercontent.com/AvareBiotech/Avare-Biotech-website/main/assets/media/images/49.png"
          alt="Avare Biotech"
        />
      </a>

      <button
        className={`learn-burger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`learn-nav-pill${menuOpen ? " mobile-open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <a href="https://avareit.com" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
            <path d="M12 2.1L1 12h3v9h7v-6h2v6h7v-9h3L12 2.1z" />
          </svg>
          {t("navHome")}
        </a>
        <a href="/learn" className="nav-kb">
          {t("navKb")}
        </a>
        <a
          href="https://avareit.com/#contacts"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("navContacts")}
        </a>
        <LangSwitcher />
      </div>
    </nav>
  );
}
