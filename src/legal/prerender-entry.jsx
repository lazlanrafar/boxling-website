// Server entry for scripts/prerender.mjs: renders each legal route to static HTML at build time.
import { renderToString } from "react-dom/server";
import LegalPage, { legalTitle } from "./LegalPage.jsx";
import { legalDocuments } from "../data/legal";
import { legalRoutes } from "../data/legalRoutes";

export { legalRoutes };

export function renderLegal(docKey, lang = "id") {
  const doc = legalDocuments.find(item => item.key === docKey);
  return {
    html: renderToString(<LegalPage docKey={docKey} lang={lang} />),
    title: legalTitle(doc, lang),
    description: doc.summary[lang],
  };
}
