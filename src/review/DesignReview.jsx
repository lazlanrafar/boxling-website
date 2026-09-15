import { useEffect } from "react";
import "../styles/design-review.css";

const AppleLogo = () => (
  <svg viewBox="0 0 32 38" aria-hidden="true">
    <path fill="currentColor" d="M26.9 20.1c0-5.3 4.4-7.8 4.6-7.9a10 10 0 0 0-7.9-4.3c-3.3-.4-6.5 2-8.2 2-1.8 0-4.5-1.9-7.4-1.8A10.9 10.9 0 0 0-1.2 13c-3.9 6.8-1 16.8 2.8 22.2 1.9 2.6 4.1 5.6 7 5.5 2.8-.1 3.9-1.8 7.3-1.8 3.4 0 4.4 1.8 7.4 1.7 3.1 0 5-2.7 6.8-5.4a23.8 23.8 0 0 0 3.1-6.3 9.2 9.2 0 0 1-6.3-8.8ZM21.4 4.4A9.3 9.3 0 0 0 23.6-3a10.2 10.2 0 0 0-6.7 3.4 8.9 8.9 0 0 0-2.3 7 8.3 8.3 0 0 0 6.8-3Z" transform="translate(0 2) scale(.84)" />
  </svg>
);

const GooglePlayLogo = () => (
  <svg viewBox="0 0 42 46" aria-hidden="true">
    <path fill="#34A853" d="M3 2.9A4.6 4.6 0 0 0 1.5 6v34a4.6 4.6 0 0 0 1.6 3.2L24.8 23 3 2.9Z" />
    <path fill="#4285F4" d="m28.1 19.9-7-6.5L4.6 1.8A4.8 4.8 0 0 1 9 .9l25.4 14.4-6.3 4.6Z" />
    <path fill="#FBBC04" d="m4.6 44.2 16.5-11.6 7-6.5 6.4 4.7L9 45.2a4.8 4.8 0 0 1-4.4-1Z" />
    <path fill="#EA4335" d="m40 20.1-5.6-4.8-6.3 4.6-3.3 3.1 3.3 3.1 6.4 4.7 5.5-3.1c3.3-1.9 3.3-5.7 0-7.6Z" />
  </svg>
);

function StoreBadge({ store }) {
  const apple = store === "apple";
  return (
    <button className="review-store-badge" type="button" aria-label={`${apple ? "App Store" : "Google Play"} — tautan belum tersedia`}>
      {apple ? <AppleLogo /> : <GooglePlayLogo />}
      <span>
        <small>{apple ? "Download on the" : "GET IT ON"}</small>
        <strong>{apple ? "App Store" : "Google Play"}</strong>
      </span>
    </button>
  );
}

function ReviewHeader() {
  return (
    <header className="review-header">
      <a href="#review-top" aria-label="Boxling home">
        <img src="/brand/boxling-wordmark-white.png" alt="Boxling Coffee & Milkbar" />
      </a>
      <nav aria-label="Navigasi konsep">
        <a href="#benefits">Kenapa Boxling</a>
        <a href="#download-review">Download</a>
      </nav>
      <a className="review-header__cta" href="#download-review">Ambil kopi tanpa antre</a>
    </header>
  );
}

export default function DesignReview() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Boxling — Hero & CTA Design Review";
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="design-review" id="review-top">
      <ReviewHeader />

      <section className="review-hero" aria-labelledby="review-headline">
        <div className="review-hero__copy">
          <h1 id="review-headline">Kopi enak.<br /><span>Selalu dekat.</span></h1>
          <p>Temukan cart Boxling di dekat rute harianmu, pesan dari aplikasi, lalu ambil saat kopimu siap.</p>
          <a className="review-primary-cta" href="#download-review">
            Download aplikasi
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 16 8-8M9 8h7v7" /></svg>
          </a>
          <p className="review-pickup-note">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h14l-1 12H6L5 9Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
            Pesan dulu. Ambil sendiri. Bukan delivery.
          </p>
        </div>

        <div className="review-hero__media" aria-label="Crew Boxling membawa kopi">
          <video src="/media/boxling-hero.mp4" autoPlay muted loop playsInline />
          <div className="review-hero__stamp"><strong>BALI</strong><span>COFFEE<br />ON THE MOVE</span></div>
        </div>

        <div className="review-hero__route" aria-hidden="true">
          <span>YOU</span><i /><img src="/brand/boxling-icon-red.png" alt="" /><i /><span>COFFEE</span>
        </div>
      </section>

      <section className="review-benefits" id="benefits" aria-labelledby="benefits-title">
        <div className="review-benefits__lead">
          <h2 id="benefits-title">Lebih cepat sampai ke kopimu.</h2>
          <p>Boxling mengikuti ritmemu—bukan meminta kamu berhenti lama untuk sekadar memesan.</p>
        </div>
        <div className="review-benefits__list">
          <article><strong>01</strong><h3>Tak perlu antre pesan</h3><p>Pilih menu dan bayar sebelum kamu sampai di cart.</p></article>
          <article><strong>02</strong><h3>Tak perlu cari parkir lama</h3><p>Pilih titik pickup yang paling pas dengan rute perjalananmu.</p></article>
          <article><strong>03</strong><h3>Tak perlu turun lama</h3><p>Datang ketika siap, tunjukkan pesanan, lalu lanjut jalan.</p></article>
        </div>
      </section>

      <section className="review-download" id="download-review" aria-labelledby="download-title">
        <div className="review-download__copy">
          <h2 id="download-title">Yang dekat,<br />sekarang bisa ditemukan.</h2>
          <p>Lihat cart yang aktif, pilih menu yang tersedia, dan siapkan pesananmu untuk diambil sendiri.</p>
        </div>
        <div className="review-download__action">
          <p>Download aplikasi Boxling</p>
          <div className="review-store-row"><StoreBadge store="apple" /><StoreBadge store="play" /></div>
          <small>Tautan store akan diaktifkan setelah URL resmi tersedia.</small>
        </div>
        <img className="review-download__mark" src="/brand/boxling-icon-white.png" alt="" aria-hidden="true" />
      </section>

      <footer className="review-footer">
        <span>UI CONCEPT · FOR REVIEW ONLY</span>
        <span>Geist · Boxling Red · Bali Sky</span>
      </footer>
    </main>
  );
}
