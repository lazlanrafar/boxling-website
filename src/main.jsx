import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";
import "./styles/annotations.css";
import { ConceptPage, ConceptSubPage, ConceptsIndex } from "./concepts/ConceptApp.jsx";
import DesignReview from "./review/DesignReview.jsx";

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

createRoot(document.getElementById("root")).render(<Screen {...screenProps} />);
