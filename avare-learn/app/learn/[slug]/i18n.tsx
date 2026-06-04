"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Material } from "@/app/data/materials";
import { translations } from "@/app/data/translations";

export type Lang = "en" | "pt" | "es";
const SUPPORTED: Lang[] = ["en", "pt", "es"];

function readLang(): Lang {
  if (typeof window === "undefined") return "en";
  const h = window.location.hash.replace("#", "").toLowerCase();
  if ((SUPPORTED as string[]).includes(h)) return h as Lang;
  const s = (localStorage.getItem("av_lang") || "en").toLowerCase();
  return (SUPPORTED as string[]).includes(s) ? (s as Lang) : "en";
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  // SSR-safe default = "en" (matches statically rendered HTML), then sync on client
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(readLang());
    const id = setInterval(() => {
      const l = readLang();
      setLangState((cur) => (l !== cur ? l : cur));
    }, 400);
    const onHash = () => setLangState(readLang());
    window.addEventListener("hashchange", onHash);
    return () => {
      clearInterval(id);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const setLang = useCallback((l: Lang) => {
    if (!(SUPPORTED as string[]).includes(l)) return;
    localStorage.setItem("av_lang", l);
    try {
      history.replaceState(
        null,
        "",
        l === "en" ? location.pathname + location.search : "#" + l
      );
    } catch {
      // ignore
    }
    setLangState(l);
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/* ---------- UI strings (chrome) ---------- */
export const UI: Record<Lang, Record<string, string>> = {
  en: {
    navHome: "Home",
    navKb: "Knowledge Base",
    navContacts: "Contacts",
    downloadPdf: "Download PDF",
    moreFromKb: "More from the Knowledge Base",
    read: "Read",
    chooseLanguage: "Choose your language:",
    subscribedMsg: "Subscribed!",
    downloadingMsg: "Your PDF is downloading. If it did not start,",
    clickHere: "click here",
    enterEmailLabel: "↓ Download — enter your email",
    emailPlaceholder: "Email address",
    sending: "Sending...",
    invalidEmail: "Please enter a valid email.",
    rights: "© 2026 Avare Biotech. All rights reserved.",
  },
  pt: {
    navHome: "Início",
    navKb: "Base de Conhecimento",
    navContacts: "Contatos",
    downloadPdf: "Baixar PDF",
    moreFromKb: "Mais da Base de Conhecimento",
    read: "Ler",
    chooseLanguage: "Escolha seu idioma:",
    subscribedMsg: "Inscrito!",
    downloadingMsg: "Seu PDF está sendo baixado. Se não começou,",
    clickHere: "clique aqui",
    enterEmailLabel: "↓ Baixar — informe seu e-mail",
    emailPlaceholder: "Endereço de e-mail",
    sending: "Enviando...",
    invalidEmail: "Informe um e-mail válido.",
    rights: "© 2026 Avare Biotech. Todos os direitos reservados.",
  },
  es: {
    navHome: "Inicio",
    navKb: "Base de Conocimiento",
    navContacts: "Contactos",
    downloadPdf: "Descargar PDF",
    moreFromKb: "Más de la Base de Conocimiento",
    read: "Leer",
    chooseLanguage: "Elige tu idioma:",
    subscribedMsg: "¡Suscrito!",
    downloadingMsg: "Tu PDF se está descargando. Si no comenzó,",
    clickHere: "haz clic aquí",
    enterEmailLabel: "↓ Descargar — ingresa tu correo",
    emailPlaceholder: "Correo electrónico",
    sending: "Enviando...",
    invalidEmail: "Ingresa un correo válido.",
    rights: "© 2026 Avare Biotech. Todos los derechos reservados.",
  },
};

export function useUI() {
  const { lang } = useLang();
  return (k: string) => UI[lang][k] || UI.en[k] || "";
}

/* ---------- localized date ---------- */
const LOCALE: Record<Lang, string> = { en: "en-US", pt: "pt-BR", es: "es-ES" };
export function useDateFmt() {
  const { lang } = useLang();
  return (iso: string) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    try {
      return new Intl.DateTimeFormat(LOCALE[lang], {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }).format(new Date(Date.UTC(y, m - 1, d)));
    } catch {
      return iso;
    }
  };
}

/* ---------- per-article localization ---------- */
export function localize(m: Material, lang: Lang): Material {
  if (lang === "en") return m;
  const t = translations[lang]?.[m.slug];
  if (!t) return m;
  return {
    ...m,
    title: t.title ?? m.title,
    description: t.description ?? m.description,
    categoryLabel: t.categoryLabel ?? m.categoryLabel,
    downloadTitle: t.downloadTitle ?? m.downloadTitle,
    downloadDescription: t.downloadDescription ?? m.downloadDescription,
    content: t.content ?? m.content,
  };
}

/* ---------- language switcher ---------- */
export function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const wrap = document.getElementById("learnArticleLang");
      if (wrap && !wrap.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <>
      <span className="sep" />
      <div className="av-lang" id="learnArticleLang">
        <button
          className="av-lang__toggle"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
        >
          {lang.toUpperCase()} <span className="av-lang__arrow">&#9660;</span>
        </button>
        {open && (
          <div className="av-lang__dropdown" style={{ display: "block" }}>
            {(["en", "pt", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                className={`av-lang__opt${l === lang ? " active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLang(l);
                  setOpen(false);
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="nav-lang-mob">
        {(["en", "pt", "es"] as Lang[]).map((l) => (
          <button
            key={l}
            className={l === lang ? "active" : ""}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}
