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
    /* footer chrome */
    footerDownload: "Download the App",
    footerProduct: "Product",
    footerPricing: "Pricing",
    footerCases: "Case Studies",
    footerVideo: "Video Instruction",
    footerProtocol: "Protocol",
    footerFaq: "FAQ",
    footerLegal: "Legal",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Use",
    footerSupport: "Support",
    footerContact: "Contact Support",
    /* footer + popups */
    faqTitle: "Frequently Asked Questions",
    videoTitle: "Video Instruction",
    protocolTitle: "Semen QA Protocol",
    protocolView: "View",
    protocolDownload: "Download",
    faqQ1: "What is MAKSA?",
    faqA1: "MAKSA (Mobile Assisted Key Semen Analysis) is a smartphone app that analyzes livestock semen quality using AI. It measures total motility, progressive motility, and concentration without expensive CASA equipment.",
    faqQ2: "How accurate is MAKSA compared to CASA?",
    faqA2: "MAKSA achieves a correlation of r > 0.90 with traditional CASA systems, validated across 500K+ labeled cells over 3 years of R&D.",
    faqQ3: "What equipment do I need?",
    faqA3: "You only need a smartphone and a basic microscope. No servers, no expensive hardware, no consumables required.",
    faqQ4: "Which species are supported?",
    faqA4: "MAKSA is validated for 5 species: cattle, horses, sheep, goats, and camels.",
    faqQ5: "Is there a free trial?",
    faqA5: "Yes, we offer 10 free tests to get started. Contact us for a demo and early adopter discounts of up to 50% off.",
    faqQ6: "Which microscopes are compatible with MAKSA?",
    faqA6: "Any standard bright-field microscope at 100–200x magnification. Phase contrast microscopes are not compatible.",
    faqQ7: "What affects the accuracy of results?",
    faqA7: "Video quality is the key factor. Unstable footage, incorrect magnification, or wrong dilution factor reduce accuracy.",
    faqQ8: "Can MAKSA be used for post-thaw semen checks?",
    faqA8: "Yes, MAKSA delivers results in 30–60 seconds right in the field.",
    faqQ9: "I already evaluate semen under a microscope — why do I need MAKSA?",
    faqA9: "Subjective evaluation is not reproducible. MAKSA generates a timestamped PDF report that protects you in any dispute.",
    faqQ10: "How accurate is concentration measurement?",
    faqA10: "Motility is the primary indicator — MAKSA measures it with r > 0.90 correlation vs CASA.",
    faqQ11: "We already have CASA — why would we need this?",
    faqA11: "MAKSA goes where CASA can't — into the field, onto the farm, to technicians without lab infrastructure.",
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
    /* footer chrome */
    footerDownload: "Baixar o App",
    footerProduct: "Produto",
    footerPricing: "Preços",
    footerCases: "Estudos de Caso",
    footerVideo: "Instrução em Vídeo",
    footerProtocol: "Protocolo",
    footerFaq: "FAQ",
    footerLegal: "Legal",
    footerPrivacy: "Política de Privacidade",
    footerTerms: "Termos de Uso",
    footerSupport: "Suporte",
    footerContact: "Contatar Suporte",
    /* footer + popups */
    faqTitle: "Perguntas Frequentes",
    videoTitle: "Instrução em Vídeo",
    protocolTitle: "Protocolo QA Sêmen",
    protocolView: "Ver",
    protocolDownload: "Baixar",
    faqQ1: "O que é o MAKSA?",
    faqA1: "MAKSA (Mobile Assisted Key Semen Analysis) é um aplicativo de smartphone que analisa a qualidade do sêmen de animais usando IA. Mede motilidade total, motilidade progressiva e concentração sem equipamento CASA caro.",
    faqQ2: "Qual a precisão do MAKSA comparado ao CASA?",
    faqA2: "O MAKSA alcança uma correlação de r > 0.90 com sistemas CASA tradicionais, validado em 500K+ células rotuladas ao longo de 3 anos de P&D.",
    faqQ3: "Que equipamento eu preciso?",
    faqA3: "Você só precisa de um smartphone e um microscópio básico. Sem servidores, sem hardware caro, sem consumíveis.",
    faqQ4: "Quais espécies são suportadas?",
    faqA4: "O MAKSA é validado para 5 espécies: bovinos, equinos, ovinos, caprinos e camelos.",
    faqQ5: "Existe teste gratuito?",
    faqA5: "Sim, oferecemos 10 testes gratuitos para começar. Entre em contato para uma demonstração e descontos para early adopters de até 50%.",
    faqQ6: "Quais microscópios são compatíveis com o MAKSA?",
    faqA6: "Qualquer microscópio padrão de campo claro a 100–200x de ampliação. Microscópios de contraste de fase não são compatíveis.",
    faqQ7: "O que afeta a precisão dos resultados?",
    faqA7: "A qualidade do vídeo é o fator principal. Imagens instáveis, ampliação incorreta ou fator de diluição errado reduzem a precisão.",
    faqQ8: "O MAKSA pode ser usado para verificação pós-descongelamento?",
    faqA8: "Sim, é exatamente para isso que o MAKSA foi feito. O MAKSA entrega resultados em 30–60 segundos no campo.",
    faqQ9: "Já avalia o sêmen sob microscópio — por que preciso do MAKSA?",
    faqA9: "A avaliação subjetiva não é reproduzível. O MAKSA gera um relatório PDF com data e hora que protege você em qualquer disputa.",
    faqQ10: "Quão precisa é a medição de concentração?",
    faqA10: "Motilidade é o principal indicador — o MAKSA a mede com correlação r > 0,90 vs CASA.",
    faqQ11: "Já temos CASA — por que precisaríamos disso?",
    faqA11: "O MAKSA vai onde o CASA não pode — ao campo, à fazenda, a técnicos sem infraestrutura de laboratório.",
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
    /* footer chrome */
    footerDownload: "Descargar la App",
    footerProduct: "Producto",
    footerPricing: "Precios",
    footerCases: "Casos de Estudio",
    footerVideo: "Instrucción en Video",
    footerProtocol: "Protocolo",
    footerFaq: "FAQ",
    footerLegal: "Legal",
    footerPrivacy: "Política de Privacidad",
    footerTerms: "Términos de Uso",
    footerSupport: "Soporte",
    footerContact: "Contactar Soporte",
    /* footer + popups */
    faqTitle: "Preguntas Frecuentes",
    videoTitle: "Instrucción en Video",
    protocolTitle: "Protocolo QA Semen",
    protocolView: "Ver",
    protocolDownload: "Descargar",
    faqQ1: "¿Qué es MAKSA?",
    faqA1: "MAKSA (Mobile Assisted Key Semen Analysis) es una aplicación de smartphone que analiza la calidad del semen de animales usando IA. Mide la motilidad total, la motilidad progresiva y la concentración sin equipos CASA costosos.",
    faqQ2: "¿Qué tan preciso es MAKSA comparado con CASA?",
    faqA2: "MAKSA logra una correlación de r > 0.90 con sistemas CASA tradicionales, validado en 500K+ células etiquetadas durante 3 años de I+D.",
    faqQ3: "¿Qué equipo necesito?",
    faqA3: "Solo necesitas un smartphone y un microscopio básico. Sin servidores, sin hardware costoso, sin consumibles.",
    faqQ4: "¿Qué especies son compatibles?",
    faqA4: "MAKSA está validado para 5 especies: bovinos, equinos, ovinos, caprinos y camellos.",
    faqQ5: "¿Hay prueba gratuita?",
    faqA5: "Sí, ofrecemos 10 pruebas gratuitas para comenzar. Contáctanos para una demostración y descuentos para early adopters de hasta 50%.",
    faqQ6: "¿Qué microscopios son compatibles con MAKSA?",
    faqA6: "Cualquier microscopio estándar de campo brillante a 100–200x de ampliación. Los microscopios de contraste de fase no son compatibles.",
    faqQ7: "¿Qué afecta la precisión de los resultados?",
    faqA7: "La calidad del video es el factor clave. Imágenes inestables, una ampliación incorrecta o un factor de dilución equivocado reducen la precisión.",
    faqQ8: "¿Se puede usar MAKSA para verificación post-descongelación?",
    faqA8: "Sí, para eso está hecho MAKSA exactamente. MAKSA entrega resultados en 30–60 segundos directamente en el campo.",
    faqQ9: "Ya evalúo semen bajo microscopio — ¿por qué necesito MAKSA?",
    faqA9: "La evaluación subjetiva no es reproducible. MAKSA genera un informe PDF con marca de tiempo que te protege en cualquier disputa.",
    faqQ10: "¿Qué tan precisa es la medición de concentración?",
    faqA10: "La motilidad es el principal indicador — MAKSA la mide con correlación r > 0.90 vs CASA.",
    faqQ11: "Ya tenemos CASA — ¿por qué necesitaríamos esto?",
    faqA11: "MAKSA va donde CASA no puede — al campo, a la granja, a técnicos sin infraestructura de laboratorio.",
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
