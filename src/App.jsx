import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { confidenceCards, faqs, howItWorks, media, menuDeck } from "./data/content";
import { useInViewVideo } from "./hooks/useInViewVideo";
import { useReducedMotion } from "./hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const Arrow = () => <span aria-hidden="true">↗</span>;
const BagIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
const AppleMark = () => <svg className="store-mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M17.1 12.5c0-2.4 2-3.6 2.1-3.7a4.5 4.5 0 0 0-3.6-1.9c-1.5-.2-3 1-3.8 1-.8 0-2-1-3.3-1-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.8 1.3 10.3.9 1.2 1.9 2.6 3.2 2.5 1.3-.1 1.8-.8 3.4-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5a11 11 0 0 0 1.4-2.9 4.2 4.2 0 0 1-3-4.3ZM14.6 5.3A4.2 4.2 0 0 0 15.6 2a4.5 4.5 0 0 0-3 1.6 4 4 0 0 0-1 3.2 3.7 3.7 0 0 0 3-1.5Z"/></svg>;
const PlayMark = () => <svg className="store-mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M3.8 2.5a2 2 0 0 0-.5 1.4v16.2c0 .5.2 1 .5 1.4l9.4-9.5-9.4-9.5Zm10.8 10.9-2.4 2.4-7.1 7.1c.4.1.9 0 1.3-.2l11.8-6.8-3.6-2.5Zm3.6-5.3L6.4 1.3a1.8 1.8 0 0 0-1.3-.2l9.5 9.5 3.6-2.5Zm1.6.9-3.7 3 3.7 3c1.2-.7 1.2-1.3 1.2-3s0-2.3-1.2-3Z"/></svg>;
const GooglePlayColorMark = () => <svg className="store-mark" viewBox="0 0 42 46" aria-hidden="true"><path fill="#34A853" stroke="none" d="M3 2.9A4.6 4.6 0 0 0 1.5 6v34a4.6 4.6 0 0 0 1.6 3.2L24.8 23 3 2.9Z"/><path fill="#4285F4" stroke="none" d="m28.1 19.9-7-6.5L4.6 1.8A4.8 4.8 0 0 1 9 .9l25.4 14.4-6.3 4.6Z"/><path fill="#FBBC04" stroke="none" d="m4.6 44.2 16.5-11.6 7-6.5 7 4.7L9 45.2a4.8 4.8 0 0 1-4.4-1Z"/><path fill="#EA4335" stroke="none" d="m40 20.1-5.6-4.8-6.3 4.6-3.3 3.1 3.3 3.1 6.4 4.7 5.5-3.1c3.3-1.9 3.3-5.7 0-7.6Z"/></svg>;

const storeUrls = {
  apple: import.meta.env.VITE_APP_STORE_URL || "",
  play: import.meta.env.VITE_PLAY_STORE_URL || "",
};

function StoreBadge({ store, destination = "#download", onUnavailable, compact = false }) {
  const apple = store === "apple";
  const url = storeUrls[store];
  const className = `store-badge ${compact ? "store-badge--compact" : ""}`.trim();
  const content = <>{apple ? <AppleMark /> : <PlayMark />}<span><small>{apple ? "Download di" : "Dapatkan di"}</small><strong>{apple ? "App Store" : "Google Play"}</strong></span><i aria-hidden="true">↗</i></>;
  if (url) return <a className={className} href={url} target="_blank" rel="noreferrer" data-magnetic>{content}</a>;
  if (onUnavailable) return <button className={className} type="button" onClick={() => onUnavailable(apple ? "App Store" : "Google Play")} data-magnetic>{content}</button>;
  return <a className={className} href={destination} data-magnetic>{content}</a>;
}

function HeroStoreBadge({ store }) {
  const apple = store === "apple";
  const url = storeUrls[store] || "#download";
  return <a className="hero-store-badge" href={url} {...(storeUrls[store] ? { target: "_blank", rel: "noreferrer" } : {})} aria-label={`${apple ? "App Store" : "Google Play"}${storeUrls[store] ? "" : " — tautan belum tersedia"}`}>
    {apple ? <AppleMark /> : <GooglePlayColorMark />}
    <span><small>{apple ? "Download on the" : "GET IT ON"}</small><strong>{apple ? "App Store" : "Google Play"}</strong></span>
  </a>;
}

const BoxlingWordmark = ({ tone = "white", className = "" }) => (
  <img className={`brand-wordmark ${className}`.trim()} src={`/brand/boxling-wordmark-${tone}.png`} alt="Boxling Coffee & Milkbar" />
);

const SectionHead = ({ label, title, copy }) => (
  <div className="section-head reveal">
    <p className="kicker">{label}</p>
    <h2>{title}</h2>
    {copy && <p className="section-copy">{copy}</p>}
  </div>
);

function Loader() {
  return <div className="loader" aria-hidden="true"><img className="loader__mark" src="/brand/boxling-icon-white.png" alt="" /><div className="loader__track"><i /></div></div>;
}

function Cursor() {
  const cursor = useRef(null);
  useEffect(() => {
    if (!matchMedia("(pointer:fine)").matches) return undefined;
    const node = cursor.current;
    const x = gsap.quickTo(node, "x", { duration: .22, ease: "power3" });
    const y = gsap.quickTo(node, "y", { duration: .22, ease: "power3" });
    const move = event => { x(event.clientX); y(event.clientY); };
    const over = event => node.classList.toggle("is-big", Boolean(event.target.closest("a,button,input,[data-magnetic]")));
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerover", over); };
  }, []);
  return <div className="cursor" ref={cursor} />;
}

function Header() {
  return <header className="header">
    <a className="wordmark" href="#top" aria-label="Boxling home"><BoxlingWordmark /></a>
    <nav aria-label="Navigasi utama"><a href="#how">Cara kerja</a><a href="#menu">Menu</a><a href="#faq">FAQ</a></nav>
    <a href="#download" className="pill pill--outline" data-magnetic>Download app <Arrow /></a>
  </header>;
}

function Hero() {
  const video = useRef(null);
  const [sound, setSound] = useState(false);
  useInViewVideo(video, .15);
  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    video.current.muted = !next;
    if (next) video.current.play()?.catch?.(() => {});
  };
  return <section className="hero" id="top">
    <video ref={video} src={media.heroVideo} poster={media.heroPoster} muted loop playsInline preload="auto" aria-label="Suasana Boxling Coffee & Milkbar" />
    <div className="hero__veil" />
    <Header />
    <div className="hero__content">
      <h1><span>Kopi Enak</span><span>Lebih Dekat</span><span>Bareng Boxling</span></h1>
      <p className="hero__description">Temukan Boxling terdekat, pesan kopi favoritmu, bayar lebih mudah, dan nikmati kopi yang datang ke titikmu.</p>
    </div>
    <div className="hero-download-cta">
      <p>Download Sekarang <span aria-hidden="true">👍🏻</span></p>
      <div><HeroStoreBadge store="apple" /><HeroStoreBadge store="play" /></div>
    </div>
    <button className={`sound ${sound ? "on" : ""}`} onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Matikan suara" : "Nyalakan suara"}>
      <span className="sound__bars" aria-hidden="true"><i /><i /><i /></span>{sound ? "Sound on" : "Sound off"}
    </button>
  </section>;
}

function Portal() {
  const section = useRef(null);
  const reduced = useReducedMotion();
  const stats = [
    { value: "30", suffix: "+", label: <>Boxler yang<br />beredar</> },
    { value: "13", label: <>Varian<br />rasa</> },
    { value: "8000", prefix: "Rp", eyebrow: "Mulai dari", label: null },
  ];
  return <section className="portal" ref={section} aria-label="Boxling bergerak lebih dekat">
    <div className="portal__scroll">
      <div className="portal__stage">
      <div
        className="portal-ticker"
        role="note" aria-label="Boxling"
      >
        <div className="portal-ticker__rail" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((copy) => <div className="portal-ticker__group" key={copy}>
            {Array.from({ length: 7 }, (_, index) => <span key={index}>Boxling <i>·</i></span>)}
          </div>)}
        </div>
      </div>
      <div className="portal__story">
        <h2 className="portal__headline">
          <span className="portal__headline-line">Kopi keliling modern</span>
          <span className="portal__headline-line">
            <b>yang</b>
            <span className="portal-media-slot"><span className="portal-photo portal-photo--order" role="img" aria-label="Pesan Boxling melalui aplikasi"><img src="/media/section-two/boxling-contact-sheet.png" alt="" /></span></span>
            <b>selalu bergerak</b>
          </span>
          <span className="portal__headline-line">
            <b>lebih</b>
            <span className="portal-media-slot"><span className="portal-photo portal-photo--cart" role="img" aria-label="Boxling cart berkeliling di Bali"><img src="/media/section-two/boxling-contact-sheet.png" alt="" /></span></span>
            <b>dekat.</b>
          </span>
        </h2>
        <figure className="portal-photo portal-photo--serve"><img src="/media/section-two/boxling-contact-sheet.png" alt="Kopi Boxling diterima langsung dari cart" /></figure>
        <span className="portal__index">02 · Selalu lebih dekat</span>
      </div>
      <div className="portal-stats" aria-label="Boxling dalam angka">
        {stats.map((stat, statIndex) => <article className="portal-stat" key={stat.value}>
          <div className="portal-stat__number">
            <span className="portal-stat__meta">{stat.eyebrow}</span>
            {stat.prefix && <span className="portal-stat__prefix">{stat.prefix}</span>}
            <span className="portal-stat__digits" aria-label={stat.value}>
              {stat.value.split("").map((digit, index) => <span className={`portal-stat__digit${reduced ? " is-static" : ""}`} key={`${statIndex}-${index}`}>
                {reduced ? digit : <span className="portal-stat__rail" data-target={digit}>{Array.from({ length: 10 }, (_, number) => <i key={number}>{number}</i>)}</span>}
              </span>)}
            </span>
            {stat.suffix && <span className="portal-stat__suffix">{stat.suffix}</span>}
          </div>
          {stat.label && <p>{stat.label}</p>}
        </article>)}
      </div>
      </div>
    </div>
  </section>;
}

function TasteShowcase() {
  const items = ["Kopi Susu", "Americano", "Café Latte", "Mont Blanc", "Chocolate", "Matcha", "Milk Coffee", "Seasonal"];
  return <section className="taste-showcase" id="taste" aria-labelledby="taste-title">
    <div className="taste-showcase__intro reveal">
      <h2 id="taste-title">Kopi enak,<br />rasa pas di<br />setiap gelas.</h2>
      <p>Boxling hadir di<br />lokasi-lokasi<br />strategis</p>
      <figure><img src="/media/portal-cup.jpg" alt="Cup merah Boxling di bawah langit Bali" loading="lazy" /></figure>
    </div>
    <div className="taste-showcase__menu reveal">
      <div className="taste-showcase__grid">
        {items.map((item, index) => <article className="taste-card" key={item}>
          <div className="taste-card__visual">
            <img className="taste-card__cup" src="/media/menu-showcase/iced-latte.png" alt="" loading="lazy" />
            <img className="taste-card__mark" src="/brand/boxling-icon-red.png" alt="" />
          </div>
          <h3>{item}</h3>
          <p>Harga di aplikasi</p>
          <span aria-hidden="true">0{index + 1}</span>
        </article>)}
      </div>
      <a className="taste-showcase__cta" href="#menu">Lihat Semua Menu <Arrow /></a>
    </div>
  </section>;
}

function AppExperience() {
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  useInViewVideo(video);
  return <section className="experience section-dark">
    <SectionHead label="Satu aplikasi, satu perjalanan" title="Dari peta sampai kopi di tangan." copy="Aplikasi Boxling menyambungkan lokasi, menu, pembayaran, dan status pickup tanpa mengubahnya menjadi layanan delivery." />
    <div className="experience__grid reveal">
      <div className="experience__reel"><video ref={video} src={media.storyVideo} poster={media.storyPoster} muted loop playsInline preload="metadata" aria-label="Pengalaman aplikasi Boxling" /><button onClick={() => { const next = !playing; setPlaying(next); next ? video.current.play() : video.current.pause(); }}><span>{playing ? "Ⅱ" : "▶"}</span>{playing ? "Pause" : "Play"}</button></div>
      <div className="experience-stat"><p>Alur pickup yang jelas</p><strong data-count="4">0</strong><span>langkah dari menemukan cart sampai mengambil pesanan.</span></div>
    </div>
  </section>;
}

function HowItWorks() {
  return <section className="how section-paper" id="how">
    <SectionHead label="Cara kerja" title="Beli kopi, tanpa menerka." copy="Setiap tahap dibuat jelas agar kamu tahu ke mana pergi, apa yang tersedia, dan kapan harus datang." />
    <div className="steps reveal">
      {howItWorks.map(([number, title, copy, tag]) => <article className="step-row" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><small>{tag}</small><i aria-hidden="true">↗</i></article>)}
    </div>
    <div className="benefit-grid">
      <article className="benefit benefit--red reveal"><span>01 / Find</span><h3>Yang dekat lebih dulu</h3><div className="mini-map"><i /><b /><span>450 m</span><small>Buka sekarang</small></div></article>
      <article className="benefit benefit--cream reveal"><span>02 / Order</span><h3>Menu sesuai cart</h3><div className="ticket-stack"><i>KOPI</i><i>MILK</i><i>TEA</i><i>ORDER</i></div></article>
      <article className="benefit benefit--sky reveal"><span>03 / Pickup</span><h3>Datang saat siap</h3><div className="status-rings"><i /><i /><i /><b /><strong>READY</strong></div></article>
    </div>
  </section>;
}

function MenuDeck() {
  const [order, setOrder] = useState([0, 1, 2]);
  const drag = useRef({ x: 0, moved: false, card: null });
  const pointerDown = (event, cardIndex) => {
    if (cardIndex !== 0) return;
    drag.current = { x: event.clientX, moved: false, card: event.currentTarget };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const pointerMove = event => {
    if (!drag.current.card) return;
    const dx = event.clientX - drag.current.x;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    gsap.set(drag.current.card, { x: dx, rotation: dx * .035 });
  };
  const pointerUp = event => {
    const card = drag.current.card;
    if (!card) return;
    const dx = event.clientX - drag.current.x;
    card.dataset.dragged = drag.current.moved ? "true" : "false";
    if (Math.abs(dx) > 72) {
      gsap.to(card, { x: dx > 0 ? 520 : -520, rotation: dx > 0 ? 13 : -13, opacity: 0, duration: .4, ease: "power3.in", onComplete: () => { setOrder(current => [...current.slice(1), current[0]]); gsap.set(card, { clearProps: "transform,opacity" }); } });
    } else gsap.to(card, { x: 0, rotation: 0, duration: .65, ease: "elastic.out(1,.5)" });
    drag.current.card = null;
  };
  const cycle = direction => setOrder(current => direction > 0 ? [...current.slice(1), current[0]] : [current.at(-1), ...current.slice(0, -1)]);
  return <section className="menu-deck section-paper" id="menu">
    <div className="menu-deck__copy reveal"><p className="kicker">Menu highlights</p><h2>Favoritmu, <em className="serif">di cart pilihanmu.</em></h2><p>Menu dan stok dapat berbeda di setiap cart. Pilih lokasi lebih dulu supaya yang kamu lihat benar-benar relevan.</p><div className="menu-deck__note"><i /> Menu aktual mengikuti cart<br /><i /> Harga tampil di aplikasi</div></div>
    <div className="deck-wrap reveal"><div className="deck-hint"><button onClick={() => cycle(-1)} aria-label="Menu sebelumnya">←</button><p>← Geser kartu untuk jelajah →</p><button onClick={() => cycle(1)} aria-label="Menu berikutnya">→</button></div><div className="deck">
      {order.map((menuIndex, stackIndex) => { const item = menuDeck[menuIndex]; return <article className={`menu-card menu-card--${menuIndex}`} style={{ zIndex: 4 - stackIndex, "--stack": stackIndex }} key={item.name} onPointerDown={event => pointerDown(event, stackIndex)} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
        <div className="menu-card__top"><span>{item.name}</span><span>0{menuIndex + 1}</span></div><p className="menu-card__eyebrow">{item.eyebrow}</p><strong>{item.headline}</strong><ul>{item.features.map(feature => <li key={feature}>{feature}<i>+</i></li>)}</ul><a href="#download" onClick={event => { if (event.currentTarget.closest(".menu-card").dataset.dragged === "true") event.preventDefault(); }}>{item.cta}</a>
      </article>; })}
    </div></div>
  </section>;
}

function Confidence() {
  return <section className="confidence section-paper"><SectionHead label="Sebelum kamu jalan" title="Tidak perlu menebak-nebak." copy="Boxling dirancang untuk memberi kepastian yang kamu butuhkan sebelum menuju cart." />
    <div className="confidence__grid">{confidenceCards.map((card, index) => <article className={`confidence-card confidence-card--${index + 1} reveal`} key={card.number}><span>{card.number}</span><div className="confidence-card__art">{index === 1 ? <img src={media.detail} alt="Detail minuman Boxling" loading="lazy" /> : <><i /><b /></>}</div><h3>{card.title}</h3><p>{card.copy}</p></article>)}</div>
  </section>;
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return <section className="faq section-paper" id="faq"><SectionHead label="Pertanyaan penting" title="Jawaban sebelum berangkat." />
    <div className="accordion reveal">{faqs.map(([question, answer], index) => { const active = open === index; return <div className={`faq-item ${active ? "open" : ""}`} key={question}>
      <button aria-expanded={active} aria-controls={`answer-${index}`} onClick={() => setOpen(active ? -1 : index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><i>{active ? "−" : "+"}</i></button>
      <div className="faq-answer" id={`answer-${index}`} role="region" aria-hidden={!active}><div><p>{answer}</p></div></div>
    </div>; })}</div>
  </section>;
}

function Download() {
  const [storeNote, setStoreNote] = useState("Pilih platform untuk melanjutkan download.");
  const unavailable = platform => setStoreNote(`URL resmi ${platform} belum terhubung. Tambahkan link store untuk mengaktifkan download.`);
  return <section className="download" id="download"><div className="download__circle download__circle--a" /><div className="download__circle download__circle--b" />
    <p className="kicker reveal">Download aplikasi Boxling</p><h2 className="serif reveal">Kopi terdekatmu<br /><em>dimulai dari sini.</em></h2><p className="download__copy reveal">Temukan cart aktif, lihat menu yang tersedia, pesan lebih dulu, lalu ambil saat sudah siap.</p>
    <div className="download-store-grid reveal"><StoreBadge store="apple" onUnavailable={unavailable} /><StoreBadge store="play" onUnavailable={unavailable} /></div>
    <p className="store-note" role="status">{storeNote}</p>
    <p className="pickup-note"><BagIcon /> Semua pesanan diambil sendiri di cart pilihanmu.</p>
  </section>;
}

function Footer() {
  return <footer className="footer"><div className="marquee"><div>NEARBY COFFEE · PICKUP ONLY · BOXLING ·&nbsp;</div><div aria-hidden="true">NEARBY COFFEE · PICKUP ONLY · BOXLING ·&nbsp;</div></div>
    <div className="footer__grid"><div><a className="wordmark" href="#top" aria-label="Boxling home"><BoxlingWordmark tone="red" /></a><p>Kopi keliling modern di Bali. Temukan, pesan, lalu ambil sendiri.</p></div><nav aria-label="Navigasi footer"><a href="#how">Cara kerja</a><a href="#menu">Menu</a><a href="#faq">FAQ</a></nav><nav aria-label="Informasi"><a href="/support">Bantuan</a><a href="/privacy-policy">Kebijakan Privasi</a><a href="/terms-of-service">Ketentuan Layanan</a><a href="/delete-account">Hapus Akun</a><a href="#download">Aplikasi</a></nav><div className="footer__pickup"><BagIcon /><p>Order ahead.<br /><strong>Self-pickup only.</strong></p></div></div>
    <div className="footer__meta"><span>Bali · Indonesia</span><span>© 2026 Boxling Coffee & Milkbar. Merek terdaftar IDM001477043.</span><a href="#top">Kembali ke atas ↑</a></div>
  </footer>;
}

function App() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    document.body.classList.add("is-loading");
    const unlock = () => document.body.classList.remove("is-loading");
    const loader = gsap.timeline({ onComplete: unlock }).to(".loader__track i", { scaleX: 1, duration: .7, ease: "power2.inOut" }).to(".loader", { clipPath: "inset(0 0 100% 0)", duration: .9, ease: "power4.inOut" });
    const context = gsap.context(() => {
      document.querySelectorAll("[data-magnetic]").forEach(element => {
        const move = event => { const bounds = element.getBoundingClientRect(); gsap.to(element, { x: (event.clientX - bounds.left - bounds.width / 2) * .2, y: (event.clientY - bounds.top - bounds.height / 2) * .2, duration: .25 }); };
        const leave = () => gsap.to(element, { x: 0, y: 0, duration: .7, ease: "elastic.out(1,.4)" });
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
      });
      if (reduced) { gsap.set(".reveal", { opacity: 1, y: 0 }); return; }
      gsap.utils.toArray(".reveal").forEach(element => gsap.fromTo(element, { opacity: 0, y: 42 }, { opacity: 1, y: 0, duration: .8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } }));
      gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .8, invalidateOnRefresh: true } }).to(".hero>video", { scale: 1.14, yPercent: 7, ease: "none" }, 0).to(".hero__content,.hero-download-cta", { yPercent: -14, opacity: .16, ease: "none" }, 0).to(".header,.sound", { y: -24, opacity: 0, ease: "none" }, 0);
      const portal = gsap.timeline({ scrollTrigger: { trigger: ".portal__scroll", start: "top top", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true } });
      portal.fromTo(".portal__headline-line", { opacity: .16, yPercent: 22 }, { opacity: 1, yPercent: 0, duration: .42, stagger: .1, ease: "power2.out" }, 0)
        .fromTo(".portal-photo", { opacity: 0, yPercent: 65, scale: .72, rotate: -5 }, { opacity: 1, yPercent: 0, scale: 1, rotate: 0, duration: .34, ease: "power3.out" }, .16)
        .to(".portal__story", { scale: 1.025, duration: .35, ease: "none" }, .62);
      gsap.to(".portal-stat__rail", { y: (_, rail) => -Number(rail.dataset.target) * rail.parentElement.offsetHeight, duration: 1.35, stagger: .07, ease: "power4.out", scrollTrigger: { trigger: ".portal-stats", start: "top 82%", once: true }, invalidateOnRefresh: true });
      gsap.fromTo("[data-count]", { textContent: 0 }, { textContent: 4, snap: { textContent: 1 }, duration: 1.4, ease: "power2.out", scrollTrigger: { trigger: ".experience-stat", start: "top 75%", once: true }, onUpdate() { this.targets()[0].textContent = Math.round(this.targets()[0].textContent); } });
      gsap.utils.toArray(".confidence-card__art").forEach((art, index) => gsap.from(art, { clipPath: index % 2 ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)", duration: 1, ease: "power4.inOut", scrollTrigger: { trigger: art, start: "top 80%", once: true } }));
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);
    }, root);
    const fallback = setTimeout(unlock, 2500);
    return () => { clearTimeout(fallback); loader.kill(); context.revert(); document.body.classList.remove("is-loading"); };
  }, [reduced]);
  return <div ref={root}><a className="skip" href="#main">Lewati ke konten</a><Loader /><Cursor /><main id="main"><Hero /><Portal /><TasteShowcase /><AppExperience /><HowItWorks /><MenuDeck /><Confidence /><FAQ /><Download /></main><Footer /></div>;
}

export default App;
