import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";
import "./styles/annotations.css";
import { ConceptPage, ConceptSubPage, ConceptsIndex } from "./concepts/ConceptApp.jsx";
import DesignReview from "./review/DesignReview.jsx";
import { legalRoutes } from "./data/legalRoutes.js";

const path = window.location.pathname.replace(/\/$/, "") || "/";
let Screen = App;
let screenProps = {};
if (path === "/concepts") Screen = ConceptsIndex;
if (path === "/design-review") Screen = DesignReview;
if (path.startsWith("/concepts/")) {
  const parts = path.split("/").filter(Boolean);
  const slug = parts[1];
  const subpage = parts[2];
  Screen = subpage === "menu" || subpage === "kelebihan" ? ConceptSubPage : ConceptPage;
  screenProps = subpage ? { slug, type: subpage === "menu" ? "menu" : "benefits" } : { slug };
}

const RELOAD_KEY = "boxling-legal-reload";
const container = document.getElementById("root");
const root = createRoot(container);
const legalKey = legalRoutes[path];
if (legalKey) renderLegal(legalKey);
else root.render(<Screen {...screenProps} />);

function renderLegal(docKey) {
  // Built legal routes ship prerendered HTML; keep it on screen until the chunk arrives, or for good if it never does.
  const prerendered = Boolean(container.querySelector(".legal"));
  if (!prerendered) root.render(<div style={{ minHeight: "100vh", background: "#f4f0e7" }} />);
  import("./legal/LegalPage.jsx")
    .then(({ default: LegalPage }) => {
      try { sessionStorage.removeItem(RELOAD_KEY); } catch { /* storage unavailable */ }
      root.render(<LegalPage docKey={docKey} />);
    })
    .catch(() => {
      // One reload fixes a stale deploy (old chunk names); storage failure means no reload, so no loop.
      let canReload = false;
      try {
        if (!sessionStorage.getItem(RELOAD_KEY)) {
          sessionStorage.setItem(RELOAD_KEY, "1");
          canReload = true;
        }
      } catch { /* storage unavailable */ }
      if (canReload) window.location.reload();
      else if (!prerendered) root.render(<LegalLoadError />);
    });
}

function LegalLoadError() {
  return <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px 16px", background: "#f4f0e7", color: "#090909", textAlign: "center" }}>
    <div style={{ maxWidth: "28rem" }}>
      <p lang="id" style={{ margin: "0 0 .5rem", fontWeight: 650 }}>Halaman gagal dimuat. Periksa koneksimu, lalu coba lagi.</p>
      <p lang="en" style={{ margin: "0 0 1.5rem", color: "#6c6963" }}>The page failed to load. Check your connection, then try again.</p>
      <button type="button" onClick={() => window.location.reload()} style={{ minHeight: 44, padding: "0 1.25rem", border: 0, borderRadius: 999, background: "#d50101", color: "#fff", font: "inherit", fontWeight: 650, cursor: "pointer" }}>Muat ulang / Reload</button>
    </div>
  </div>;
}
