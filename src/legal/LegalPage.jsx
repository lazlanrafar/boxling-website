import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CONTACT_EMAIL, LEGAL_UPDATED, legalDocuments } from "../data/legal";
import { legalRoutes } from "../data/legalRoutes";
import "../styles/legal.css";

const LANG_KEY = "boxling-lang";
const LANGS = ["id", "en"];

const docsByKey = Object.fromEntries(legalDocuments.map(doc => [doc.key, doc]));
const tabs = Object.entries(legalRoutes).map(([path, key]) => ({ path, key }));

const ui = {
  id: {
    home: "Beranda Boxling",
    skip: "Lewati ke konten",
    tabs: "Dokumen bantuan dan legal",
    language: "Bahasa",
    updated: "Terakhir diperbarui",
    toc: "Di halaman ini",
    tagline: "Kopi keliling modern di Bali. Temukan, pesan, lalu ambil sendiri.",
    siteNav: "Navigasi situs",
    infoNav: "Informasi",
    how: "Cara kerja",
    faq: "FAQ",
    app: "Aplikasi",
    backToTop: "Kembali ke atas ↑",
  },
  en: {
    home: "Boxling home",
    skip: "Skip to content",
    tabs: "Help and legal documents",
    language: "Language",
    updated: "Last updated",
    toc: "On this page",
    tagline: "Modern roaming coffee carts in Bali. Find, order, then pick up yourself.",
    siteNav: "Site navigation",
    infoNav: "Information",
    how: "How it works",
    faq: "FAQ",
    app: "App",
    backToTop: "Back to top ↑",
  },
};

function readStoredLang() {
  try { return localStorage.getItem(LANG_KEY); } catch { return null; }
}

function storeLang(lang) {
  try { localStorage.setItem(LANG_KEY, lang); } catch { /* storage unavailable */ }
}

function initialLang() {
  if (typeof window === "undefined") return "id";
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (LANGS.includes(fromUrl)) {
    // A shared ?lang= link wins over the saved choice; saving it keeps reloads and param-less id links consistent.
    storeLang(fromUrl);
    return fromUrl;
  }
  const stored = readStoredLang();
  return LANGS.includes(stored) ? stored : "id";
}

const withLang = (path, lang) => (lang === "en" ? `${path}?lang=en` : path);

export const legalTitle = (doc, lang) => `${doc.title[lang]} · Boxling Coffee & Milkbar`;

const INLINE_TOKEN = /(\{\{CONTACT_EMAIL\}\}|\(\/(?:privacy-policy|terms-of-service|delete-account|support)\)|boxlingcoffee\.com\/delete-account)/g;

function renderTokens(text, ctx, keyPrefix) {
  return text.split(INLINE_TOKEN).filter(Boolean).map((part, index) => {
    const key = `${keyPrefix}-${index}`;
    if (part === "{{CONTACT_EMAIL}}") {
      return <a key={key} className="legal-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
    }
    if (part === "boxlingcoffee.com/delete-account") {
      return <a key={key} className="legal-link" href={withLang("/delete-account", ctx.lang)}>{part}</a>;
    }
    if (part.startsWith("(/")) {
      const path = part.slice(1, -1);
      return <Fragment key={key}>(<a className="legal-link" href={withLang(path, ctx.lang)}>{path}</a>)</Fragment>;
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

function Inline({ text, ctx }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) => (index % 2
    ? <strong key={index}>{renderTokens(part, ctx, `b${index}`)}</strong>
    : <Fragment key={index}>{renderTokens(part, ctx, `t${index}`)}</Fragment>));
}

function Block({ block, ctx }) {
  const items = block[ctx.lang];
  if (block.type === "ul" || block.type === "ol") {
    const List = block.type;
    return <List className={`legal-list legal-list--${block.type}`}>{items.map((item, index) => <li key={index}><Inline text={item} ctx={ctx} /></li>)}</List>;
  }
  if (block.type === "note") {
    return <div className="legal-note" role="note">{items.map((item, index) => <p key={index}><Inline text={item} ctx={ctx} /></p>)}</div>;
  }
  return items.map((item, index) => <p key={index}><Inline text={item} ctx={ctx} /></p>);
}

function LegalHeader({ activeKey, pagePath, lang, onLang }) {
  const tabList = useRef(null);
  const t = ui[lang];

  useLayoutEffect(() => {
    const list = tabList.current;
    const active = list?.querySelector("[aria-current='page']");
    if (!list || !active) return;
    const offset = active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2;
    list.scrollLeft = Math.max(0, offset);
  }, [activeKey]);

  return <header className="legal-header">
    <div className="legal-header__bar">
      <a className="legal-header__home" href="/" aria-label={t.home}>
        <img src="/brand/boxling-wordmark-white.png" alt="Boxling Coffee & Milkbar" />
      </a>
      <div className="legal-lang" role="group" aria-label={t.language}>
        {LANGS.map(code => <a
          key={code}
          href={`${pagePath}?lang=${code}`}
          hrefLang={code}
          lang={code}
          aria-current={code === lang ? "true" : undefined}
          onClick={event => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
            event.preventDefault();
            onLang(code);
          }}
        >{code.toUpperCase()}</a>)}
      </div>
    </div>
    <nav className="legal-tabs" aria-label={t.tabs}>
      <ul ref={tabList}>
        {tabs.map(({ path, key }) => <li key={key}>
          <a href={withLang(path, lang)} aria-current={key === activeKey ? "page" : undefined}>{docsByKey[key].title[lang]}</a>
        </li>)}
      </ul>
    </nav>
  </header>;
}

function LegalFooter({ lang }) {
  const t = ui[lang];
  return <footer className="legal-footer">
    <div className="legal-footer__grid">
      <div>
        <a className="legal-footer__home" href="/" aria-label={t.home}><img src="/brand/boxling-wordmark-red.png" alt="Boxling Coffee & Milkbar" /></a>
        <p>{t.tagline}</p>
      </div>
      <nav aria-label={t.siteNav}>
        <a href="/#how">{t.how}</a>
        <a href="/#menu">Menu</a>
        <a href="/#faq">{t.faq}</a>
        <a href="/#download">{t.app}</a>
      </nav>
      <nav aria-label={t.infoNav}>
        {tabs.map(({ path, key }) => <a key={key} href={withLang(path, lang)}>{docsByKey[key].title[lang]}</a>)}
      </nav>
    </div>
    <div className="legal-footer__meta">
      <span>Bali · Indonesia</span>
      <span>© 2026 Boxling Coffee & Milkbar</span>
      <a href="#top">{t.backToTop}</a>
    </div>
  </footer>;
}

export default function LegalPage({ docKey, lang: fixedLang }) {
  const [lang, setLang] = useState(() => fixedLang || initialLang());
  const doc = docsByKey[docKey];
  const pagePath = tabs.find(tab => tab.key === docKey).path;
  const t = ui[lang];
  const ctx = { lang };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = legalTitle(doc, lang);
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = doc.summary[lang];
  }, [doc, lang]);

  useEffect(() => {
    if (!window.location.hash) return;
    // Section ids are plain ASCII, so no decoding; decodeURIComponent throws on hashes like #100%.
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (lang === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    if (url.href !== window.location.href) window.history.replaceState(null, "", url);
  }, [lang]);

  const changeLang = next => {
    if (next === lang) return;
    setLang(next);
    storeLang(next);
  };

  return <div className="legal" id="top">
    <a className="skip" href="#legal-content">{t.skip}</a>
    <LegalHeader activeKey={docKey} pagePath={pagePath} lang={lang} onLang={changeLang} />
    <main className="legal-main" id="legal-content" tabIndex={-1}>
      <div className="legal-intro">
        <h1>{doc.title[lang]}</h1>
        <p className="legal-intro__summary">{doc.summary[lang]}</p>
        <p className="legal-intro__updated">{t.updated}: <time dateTime="2026-09-24">{LEGAL_UPDATED[lang]}</time></p>
      </div>
      <div className="legal-body">
        <aside className="legal-toc" aria-labelledby="legal-toc-title">
          <p className="legal-toc__title" id="legal-toc-title">{t.toc}</p>
          <ol>{doc.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.heading[lang]}</a></li>)}</ol>
        </aside>
        <article className="legal-article" lang={lang}>
          {doc.sections.map(section => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`}><a href={`#${section.id}`}>{section.heading[lang]}</a></h2>
            {section.blocks.map((block, index) => <Block key={index} block={block} ctx={ctx} />)}
          </section>)}
        </article>
      </div>
    </main>
    <LegalFooter lang={lang} />
  </div>;
}
