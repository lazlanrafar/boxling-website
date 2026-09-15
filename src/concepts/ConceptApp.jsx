import { useEffect, useState } from "react";
import "../styles/concepts.css";
import { menuDeck } from "../data/content.js";

const concepts = [
  { slug: "technical-distinctive", family: "Technical Systems", approach: "Distinctive fallback", reference: "DRONE — Mapping OS", thesis: "A cart-finding field instrument." },
  { slug: "technical-impeccable", family: "Technical Systems", approach: "Impeccable", reference: "DRONE — Thermal Specimen", thesis: "A precise location specimen sheet." },
  { slug: "brutalist-distinctive", family: "Neobrutalism", approach: "Distinctive fallback", reference: "MONOLITH", thesis: "Coffee utility as a street poster." },
  { slug: "brutalist-impeccable", family: "Neobrutalism", approach: "Impeccable", reference: "SPADE", thesis: "A loud pickup-first operating board." },
  { slug: "editorial-distinctive", family: "Editorial minimal", approach: "Distinctive fallback", reference: "AMBIENTICA", thesis: "A gallery-like mobile coffee story." },
  { slug: "editorial-impeccable", family: "Editorial minimal", approach: "Impeccable", reference: "Stillpage", thesis: "A warm field journal for coffee nearby." },
];

const IconPin = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
const IconBag = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
const IconArrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5"/></svg>;

function CompareRail({ active }) {
  return <aside className="concept-rail" aria-label="Pilihan konsep"><a href="/concepts">Semua konsep</a>{concepts.map((item, i) => <a key={item.slug} className={active === item.slug ? "is-active" : ""} href={`/concepts/${item.slug}`} aria-label={`${item.family}, ${item.approach}`}>{i + 1}</a>)}</aside>;
}

function ConceptHeader({ concept, open, setOpen }) {
  const base = `/concepts/${concept.slug}`;
  return <header className="c-header"><a href={base} className="c-logo"><img src="/brand/boxling-wordmark-white.png" alt="Boxling Coffee & Milkbar" /></a><button className="c-menu" aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? "Tutup" : "Menu"}</button><nav className={open ? "is-open" : ""}><a href={`${base}#locate`} onClick={() => setOpen(false)}>Lokasi</a><a href={`${base}/menu`} onClick={() => setOpen(false)}>Menu</a><a href={`${base}/kelebihan`} onClick={() => setOpen(false)}>Kelebihan</a><a href={`${base}#how`} onClick={() => setOpen(false)}>Cara kerja</a><a href="/concepts">Bandingkan</a></nav><a className="c-header-cta" href={`${base}#download`}>Download app <IconArrow /></a><span className="c-ref">Ref · {concept.reference}</span></header>;
}

function HeroCopy() { return <div className="hero-copy"><p className="hero-context">Kopi keliling modern · Bali</p><h1>Kopi enak,<br/><span>selalu dekat.</span></h1><p className="hero-lede">Temukan cart Boxling terdekat, pesan dari aplikasi, lalu ambil kopimu tanpa perlu antre.</p><div className="hero-actions"><a href="#locate">Cari cart terdekat <IconPin /></a><a href="#download">Download aplikasi</a></div><p className="pickup"><IconBag /> Pickup only · bukan layanan delivery</p></div> }

function Hero({ slug }) {
  const copy = <HeroCopy/>;
  if (slug === "technical-distinctive") return <section className="c-hero hero-map" id="top"><div className="map-ruler">115°E <i/> BALI FIELD / PICKUP</div>{copy}<div className="media-window"><video src="/media/portal-transition.mp4" poster="/media/portal-app.jpg" muted loop autoPlay playsInline /><span>LOCATION INPUT</span><b>APP PREVIEW</b></div><div className="map-contour"/><div className="telemetry"><span>SYSTEM</span><b>LOCATION READY</b><span>FULFILMENT</span><b>SELF-PICKUP</b></div></section>;
  if (slug === "technical-impeccable") return <section className="c-hero hero-spec" id="top"><div className="spec-title">( NEARBY COFFEE SYSTEM )</div><div className="spec-rail"><h2>Boxling</h2><dl><dt>Market</dt><dd>Bali</dd><dt>Mode</dt><dd>Order ahead</dd><dt>Handover</dt><dd>Self-pickup</dd><dt>Location</dt><dd>User initiated</dd></dl></div><div className="spec-media"><video src="/media/boxling-hero.mp4" muted loop autoPlay playsInline /><span>VISUAL FEED / BOXLING</span></div>{copy}<div className="spec-side">Find cart<br/>Select menu<br/>Pay in app<br/>Pick up</div></section>;
  if (slug === "brutalist-distinctive") return <section className="c-hero hero-mono" id="top">{copy}<div className="mono-media"><video src="/media/boxling-hero.mp4" muted loop autoPlay playsInline /></div><div className="mono-stamp"><IconBag /> NO DELIVERY</div><div className="giant-word">BOXLING</div></section>;
  if (slug === "brutalist-impeccable") return <section className="c-hero hero-board" id="top"><div className="board-tape">BALI ON THE MOVE · PICKUP ONLY · ORDER AHEAD ·</div>{copy}<div className="board-media"><img src="/media/portal-app.jpg" alt="Aplikasi Boxling di ponsel" /></div><div className="board-note"><b>01</b><span>Find it.</span><b>02</b><span>Order it.</span><b>03</b><span>Pick it up.</span></div></section>;
  if (slug === "editorial-distinctive") return <section className="c-hero hero-gallery" id="top">{copy}<div className="gallery-media"><video src="/media/boxling-hero.mp4" muted loop autoPlay playsInline /></div><p className="gallery-caption">Coffee carts moving through Bali.<br/>Your next cup starts with a location.</p></section>;
  return <section className="c-hero hero-journal" id="top"><div className="journal-coord">BALI · INDONESIA</div>{copy}<div className="journal-media"><img src="/media/portal-cup.jpg" alt="Gelas Boxling di langit Bali" /><span>FIELD NOTE · COFFEE NEARBY</span></div><div className="journal-line">Find the cart that fits your route.</div></section>;
}

function Locator() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("Belum ada lokasi dipilih.");
  const submit = e => { e.preventDefault(); setMessage(query.trim() ? `Pencarian area “${query.trim()}” siap dihubungkan ke data cart.` : "Masukkan area di Bali untuk memulai pencarian."); };
  return <section className="locator c-section" id="locate"><div className="section-heading"><h2>Dari lokasimu<br/>ke kopi terdekat.</h2><p>Berikan izin lokasi saat kamu siap, atau cari area secara manual. Daftar cart aktif akan tampil setelah data operasional terhubung.</p></div><form onSubmit={submit}><label htmlFor="area">Cari area di Bali</label><div><input id="area" value={query} onChange={e => setQuery(e.target.value)} placeholder="Contoh: nama area"/><button type="submit" aria-label="Cari area"><IconArrow /></button></div><button type="button" className="locate-button" onClick={() => setMessage("Permintaan lokasi akan muncul setelah integrasi lokasi diaktifkan.")}><IconPin /> Gunakan lokasiku</button><p role="status">{message}</p></form><div className="locator-map" aria-hidden="true"><i/><i/><i/><b>YOUR ROUTE</b><span>Cart data<br/>coming from operations</span></div></section>;
}

const steps = [["Temukan", "Pilih cart yang sesuai rute dan lihat statusnya."],["Pilih", "Lihat menu yang tersedia untuk cart pilihanmu."],["Pesan", "Bayar dari aplikasi sebelum kamu tiba."],["Ambil", "Datang saat pesanan siap. Tidak ada pengantaran."]];
function Flow() { return <section className="flow c-section" id="how"><div className="section-heading"><h2>Empat langkah.<br/>Satu pickup yang jelas.</h2><p>Alur yang sama dari pencarian hingga serah terima, tanpa ekspektasi delivery.</p></div><div className="flow-list">{steps.map(([title, copy], i) => <article key={title}><b>{String(i+1).padStart(2,"0")}</b><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="flow-media"><video src="/media/portal-transition.mp4" poster="/media/portal-app.jpg" muted loop autoPlay playsInline /><span>FROM CUP → TO APP</span></div></section> }

function DiscoverMore({ concept }) {
  const base = `/concepts/${concept.slug}`;
  return <section className="discover-more c-section"><a href={`${base}/menu`}><span>Menu Boxling</span><strong>Kopi, non-kopi, dan Milkbar yang tersedia mengikuti cart.</strong><IconArrow /></a><a href={`${base}/kelebihan`}><span>Kelebihan Boxling</span><strong>Pickup cepat yang menyatu dengan rute harianmu.</strong><IconArrow /></a></section>;
}

function Download() {
  const [note, setNote] = useState("Link resmi store belum tersedia pada prototype ini.");
  return <section className="download-concept c-section" id="download"><div><h2>Temukan.<br/>Pesan.<br/><span>Ambil.</span></h2><p>Aplikasi Boxling menyatukan lokasi cart, menu yang relevan, pemesanan, dan status siap diambil.</p><p className="pickup"><IconBag /> Self-pickup only</p></div><div className="store-panel"><button onClick={() => setNote("URL resmi App Store belum terhubung.")}>Download di <b>App Store</b><IconArrow /></button><button onClick={() => setNote("URL resmi Google Play belum terhubung.")}>Dapatkan di <b>Google Play</b><IconArrow /></button><p role="status">{note}</p></div></section>;
}

function Footer({ concept }) { return <footer className="c-footer"><img src="/brand/boxling-wordmark-red.png" alt="Boxling Coffee & Milkbar"/><p>{concept.family} · {concept.approach}</p><nav><a href="#top">Atas</a><a href="/concepts">Semua konsep</a><a href="/">Website lama</a></nav><small>Prototype · Bali · Pickup only</small></footer> }

export function ConceptPage({ slug }) {
  const concept = concepts.find(item => item.slug === slug) || concepts[0];
  const [open, setOpen] = useState(false);
  useEffect(() => { document.title = `Boxling — ${concept.family} / ${concept.approach}`; window.scrollTo(0,0); }, [concept]);
  return <div className={`concept concept--${slug}`}><a className="c-skip" href="#locate">Lewati ke konten</a><ConceptHeader concept={concept} open={open} setOpen={setOpen}/><CompareRail active={slug}/><main><Hero slug={slug}/><Locator/><Flow/><DiscoverMore concept={concept}/><Download/></main><Footer concept={concept}/></div>;
}

const benefits = [
  ["Lewati antre pesan", "Pilih menu dan bayar lewat aplikasi sebelum tiba. Di cart, fokusmu tinggal mengambil pesanan yang sudah siap."],
  ["Tidak perlu cari parkir kedai", "Cart dirancang sebagai titik singgah cepat di dekat rute harian, bukan destinasi yang memaksamu masuk ke area parkir kedai."],
  ["Ambil tanpa turun dari motor", "Pada titik pickup yang mendukung, tunjukkan kode pesanan dan ambil langsung dari kendaraanmu."],
  ["Tetap searah tujuan", "Pilih cart yang paling masuk akal terhadap perjalananmu, lalu lanjutkan aktivitas setelah pickup."],
];

function SubPageHero({ type }) {
  return <section className="sub-hero" id="top"><p>Boxling Coffee & Milkbar · Bali</p><h1>{type === "menu" ? <>Menu yang<br/><span>mengikuti cart.</span></> : <>Kopi yang<br/><span>mengikuti rute.</span></>}</h1><p>{type === "menu" ? "Pilih lokasi lebih dulu untuk melihat pilihan yang benar-benar tersedia di cart tersebut." : "Pesan sebelum tiba, singgah sebentar, ambil dari titik pickup, lalu lanjutkan perjalananmu."}</p></section>;
}

function MenuPage({ concept }) {
  const base = `/concepts/${concept.slug}`;
  return <main><SubPageHero type="menu"/><section className="menu-page c-section"><div className="menu-page-note"><strong>Tidak ada menu generik.</strong><p>Stok dan pilihan aktual mengikuti cart yang kamu pilih di aplikasi. Prototype ini tidak menampilkan harga sebelum datanya diverifikasi.</p></div><div className="menu-categories">{menuDeck.map((item, index) => <article key={item.name}><div className="menu-photo">{index === 1 ? <img src="/media/portal-cup.jpg" alt="Minuman Boxling"/> : <video src={index === 0 ? "/media/boxling-hero.mp4" : "/media/portal-transition.mp4"} muted loop autoPlay playsInline/>}</div><div><p>{item.eyebrow}</p><h2>{item.name}</h2><ul>{item.features.map(feature => <li key={feature}>{feature}</li>)}</ul><a href={`${base}#download`}>Lihat menu aktual di aplikasi <IconArrow/></a></div></article>)}</div></section><DiscoverMore concept={concept}/></main>;
}

function BenefitsPage({ concept }) {
  const base = `/concepts/${concept.slug}`;
  return <main><SubPageHero type="benefits"/><section className="benefits-page c-section"><div className="benefits-media"><video src="/media/portal-transition.mp4" poster="/media/portal-app.jpg" muted loop autoPlay playsInline/><span>ORDER AHEAD · PICKUP · CONTINUE</span></div><div className="benefit-list">{benefits.map(([title, copy], index) => <article key={title}><b>{String(index + 1).padStart(2,"0")}</b><h2>{title}</h2><p>{copy}</p></article>)}</div><a className="benefits-cta" href={`${base}#locate`}>Cari cart di rute harianmu <IconArrow/></a></section><DiscoverMore concept={concept}/></main>;
}

export function ConceptSubPage({ slug, type }) {
  const concept = concepts.find(item => item.slug === slug) || concepts[0];
  const [open, setOpen] = useState(false);
  useEffect(() => { document.title = `Boxling — ${type === "menu" ? "Menu" : "Kelebihan"} / ${concept.family}`; window.scrollTo(0,0); }, [concept, type]);
  return <div className={`concept concept--${slug} concept-subpage concept-subpage--${type}`}><a className="c-skip" href="#content">Lewati ke konten</a><ConceptHeader concept={concept} open={open} setOpen={setOpen}/><CompareRail active={slug}/><div id="content">{type === "menu" ? <MenuPage concept={concept}/> : <BenefitsPage concept={concept}/>}</div><Footer concept={concept}/></div>;
}

export function ConceptsIndex() {
  useEffect(() => { document.title = "Boxling — Enam Konsep Landing Page"; }, []);
  return <main className="concept-index"><header><img src="/brand/boxling-wordmark-red.png" alt="Boxling Coffee & Milkbar"/><a href="/">Buka website lama</a></header><div className="index-intro"><p>Design comparison · 3 × 2</p><h1>Enam cara<br/>menemukan <span>Boxling.</span></h1><p>Satu produk, satu alur konversi, enam komposisi yang berbeda. Pilih konsep untuk membuka prototipe responsif lengkap.</p></div><div className="concept-grid">{concepts.map((item, i) => <a href={`/concepts/${item.slug}`} className={`concept-card concept-card--${item.slug}`} key={item.slug}><span>0{i+1}</span><div className="card-art"><img src={i % 3 === 0 ? "/media/portal-app.jpg" : i % 3 === 1 ? "/media/portal-cup.jpg" : "/brand/boxling-icon-white.png"} alt=""/></div><p>{item.approach}</p><h2>{item.family}</h2><p>{item.thesis}</p><small>{item.reference} →</small></a>)}</div><footer><p>Astra Design Skill tidak tersedia; tiga varian berlabel “Distinctive fallback” memakai pendekatan distinctive-web-design secara transparan.</p></footer></main>;
}
