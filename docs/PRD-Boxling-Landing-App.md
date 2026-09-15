# Product Requirements Document (PRD)

## Boxling Landing Page & Pickup Experience

| Field | Detail |
|---|---|
| Document status | Draft v1.0 |
| Date | 30 August 2026 |
| Product | Boxling Coffee & Milkbar |
| Primary market | Bali, Indonesia |
| Product type | Consumer landing page + location discovery + app-assisted self-pickup |
| Primary conversion | Find nearest Boxling cart and download/open the Boxling app |
| Product owner | TBD |
| Design/engineering owner | TBD |

> Naming note: this document uses **Boxling**, following the supplied logo and original design. “Boxlink” must not be used in production unless the brand name is formally changed.

---

## 1. Executive Summary

Boxling is a mobile coffee-cart business operating across strategic locations in Bali. Its digital experience must help customers answer four questions quickly:

1. Where is the nearest Boxling cart?
2. Is it open and available now?
3. What can I order there?
4. How do I order and pick it up?

The website is the acquisition and discovery layer. It introduces Boxling, previews nearby carts and menu items, establishes trust, and drives users to the application. The application is the transactional layer: users select a cart, order and pay, monitor preparation status, and collect the drink themselves.

Boxling is **not a delivery service**. All digital messaging and flows must clearly communicate self-pickup to prevent incorrect expectations.

The existing Venta-derived rebuild currently uses an agency/portfolio structure, including Work, Studio, Plans, projects, service pricing, and agency testimonials. This content model must be replaced rather than reskinned. The new information architecture must be built around locations, operating status, menu availability, ordering, and pickup.

---

## 2. Product Vision

### Vision statement

Make Boxling the easiest coffee cart in Bali to find, order from, and pick up from.

### Core positioning

> **Kopi enak, selalu ada di dekatmu. Temukan cart Boxling terdekat, pesan dari aplikasi, lalu ambil tanpa antre.**

### Product principles

- **Location first:** proximity and availability come before brand storytelling.
- **Pickup clarity:** never imply that Boxling delivers orders.
- **Real operational data:** location, hours, stock, and order status must reflect reality.
- **Fast mobile use:** the primary experience must work well on a phone and weak mobile connections.
- **Low-friction discovery:** users may preview locations without installing the app.
- **App value before app pressure:** explain the benefit before asking users to download.
- **Authentically Boxling:** use real carts, products, crew, customers, and Bali locations.

---

## 3. Problem Statement

Potential customers may discover Boxling through social media, street visibility, search, word of mouth, or a QR code. However, they lack a reliable single place to know where Boxling is operating, whether a cart is open, what is available, and how pickup works.

The original landing-page design has a strong visual identity but does not sufficiently support this decision journey. It prioritizes visual storytelling and app imagery while leaving location discovery, pickup instructions, operational status, trust signals, and conversion logic unclear.

### User problems

- “Aku tidak tahu Boxling yang paling dekat ada di mana.”
- “Cart ini masih buka atau sudah pindah?”
- “Menu yang aku mau tersedia di cart ini atau tidak?”
- “Kalau order dari aplikasi, diantar atau harus diambil?”
- “Kapan pesananku siap supaya aku tidak menunggu lama?”
- “Kenapa aku perlu download aplikasi hanya untuk membeli kopi?”

### Business problems

- Cart traffic depends too heavily on chance discovery and social media.
- App downloads may not convert if the value proposition is unclear.
- Incorrect delivery expectations can create support and refund issues.
- Static or inaccurate cart information can reduce customer trust.
- A generic portfolio-style website does not support coffee sales.

---

## 4. Goals and Non-Goals

### Business goals

- Increase qualified visits to active Boxling carts.
- Increase app store visits and successful app installs.
- Increase first-time pickup orders.
- Increase repeat pickup orders.
- Reduce questions about cart location, operating hours, and delivery.
- Build a measurable acquisition funnel from website visit to completed pickup.

### User goals

- Find the nearest active cart with minimal effort.
- Understand the ordering and pickup process before registering.
- See menu availability and relevant prices.
- Know when an order will be ready.
- Get clear directions to the selected cart.

### Non-goals for MVP

- Delivery logistics or driver tracking.
- Marketplace functionality for other coffee brands.
- Table reservation or dine-in management.
- Franchise/investor portal.
- Full editorial blog platform.
- Complex gamification.
- Multi-city expansion outside Bali unless operationally confirmed.
- Public display of unverified metrics, ratings, or customer claims.

---

## 5. Target Users

### Persona A — Nearby convenience seeker

- Lives, studies, or works near an active cart.
- Wants an affordable drink quickly.
- Primary question: “Yang paling dekat dan buka sekarang yang mana?”
- Success condition: finds a cart and begins an order in under two minutes.

### Persona B — Commuter or scheduled pickup user

- Is travelling to work, a meeting, campus, gym, or another activity.
- Wants to order ahead and avoid waiting.
- Primary question: “Kalau aku datang 10 menit lagi, kopinya sudah siap belum?”
- Success condition: receives a reliable ready-for-pickup notification.

### Persona C — Social discovery user

- Arrives from Instagram, TikTok, an influencer, or a campaign.
- Is attracted by the brand and menu but may not know the cart concept.
- Primary question: “Boxling ini apa dan belinya di mana?”
- Success condition: understands the concept, views a real location, and downloads the app.

### Persona D — Visitor in Bali

- May browse in English and may not know local areas.
- Needs directions, opening status, payment information, and pickup clarity.
- Success condition: can find and navigate to a cart without local knowledge.

---

## 6. Jobs to Be Done

- When I want coffee nearby, help me find an active Boxling cart so I do not travel to the wrong location.
- When I am in a hurry, let me order before arriving so I can pick up without waiting in the ordering queue.
- When I choose a cart, show only items that can actually be fulfilled there.
- When my drink is being prepared, tell me when it is ready so I arrive at the right time.
- When I first discover Boxling, show me enough real information to trust the brand before asking me to install an app.

---

## 7. Product Scope

### 7.1 Landing page scope

The landing page must:

- Explain Boxling within the first viewport.
- Communicate “order ahead, self-pickup” clearly.
- Request location only after a clear user action.
- Preview nearby carts or allow manual area search.
- Display opening status, distance, hours, and directions for each previewed cart.
- Explain the four-step ordering process.
- Show authentic app screens connected to user benefits.
- Present selected menu items and starting prices.
- Provide App Store and Google Play links plus a desktop QR code.
- Include trust signals, FAQs, support, legal links, and a final CTA.
- Support Bahasa Indonesia as the default and English as a planned localization.

### 7.2 Application MVP scope

- Location permission and manual location selection.
- Map and list views of carts.
- Cart details and navigation link.
- Open, closed, temporarily unavailable, and moving status.
- Cart-specific menu and stock.
- Product modifiers where applicable.
- Cart selection before checkout.
- Pickup-only checkout.
- Digital payment.
- Preparation-time estimate.
- Order status and ready notification.
- Order history and repeat order.
- Help and issue reporting.

### 7.3 Operations/admin dependency

The customer experience requires an internal operational interface or integration that lets authorized staff:

- Create and edit carts.
- Update coordinates and operating hours.
- Set operational status.
- Mark a cart as moving or temporarily unavailable.
- Control menu availability and sold-out items.
- Accept, reject, prepare, and complete orders.
- Configure preparation-time estimates.
- Handle cancellation and refund states.

Without reliable operational updates, the location promise must not be marketed as real-time.

---

## 8. Landing Page Information Architecture

| Order | Section | Purpose | Required content | Primary action |
|---|---|---|---|---|
| 1 | Header | Navigation and persistent conversion | Logo, Cara Kerja, Lokasi, Menu, FAQ | Download App |
| 2 | Hero | Explain product and value | Bali context, nearby coffee, order-ahead, pickup clarification, real cart visual | Cari Boxling Terdekat |
| 3 | Location preview | Prove availability | Map/list, cart name, distance, status, hours, directions | Lihat Semua Lokasi |
| 4 | How it works | Remove ordering ambiguity | Find cart, select menu, pay, collect | Pesan Lewat Aplikasi |
| 5 | App benefits | Establish download value | Location, live status, cart-specific menu, order status | Download App |
| 6 | Menu highlights | Create purchase desire | 4–6 best sellers, categories, starting prices | Lihat Menu Lengkap |
| 7 | Boxling story | Build differentiation | Mobile coffee-cart concept, Bali presence, quality promise | Tentang Boxling |
| 8 | Social proof | Build trust | Verified reviews, valid stats, partner/location logos | None |
| 9 | FAQ | Resolve friction | Pickup, payment, hours, locations, cancellations | None |
| 10 | Final CTA | Convert ready users | QR code, store badges, concise benefit | Download Sekarang |
| 11 | Footer | Support and compliance | Contact, Instagram, privacy, terms, refund/pickup policy | Hubungi Kami |

### Hero content recommendation

**Eyebrow:** Kopi keliling modern di Bali

**Headline:** Kopi Enak, Selalu Ada di Dekatmu.

**Supporting copy:** Temukan cart Boxling terdekat, pesan dari aplikasi, dan ambil kopimu tanpa perlu antre.

**Primary CTA:** Cari Boxling Terdekat

**Secondary CTA:** Download Aplikasi

**Required microcopy:** Pickup only · Bukan layanan delivery

---

## 9. Core User Flows

### Flow A — Website to location

1. User opens the landing page.
2. User selects “Cari Boxling Terdekat”.
3. Website explains why location access is helpful.
4. User permits location or enters an area manually.
5. Website displays nearby carts with distance and status.
6. User opens a cart detail or directions.
7. User is invited to open/download the app to order.

### Flow B — First pickup order

1. User opens the app from a store link, QR code, or deep link.
2. User selects or confirms a cart.
3. App displays only the menu available at that cart.
4. User configures items and adds them to the cart.
5. Checkout repeats the selected pickup location and states “Tidak ada pengantaran”.
6. User pays.
7. Cart accepts the order and prepares it.
8. User sees an estimate and status updates.
9. User receives “Siap diambil”.
10. Staff completes handover and the order is marked collected.

### Flow C — Location unavailable

1. Selected cart closes, moves, or cannot accept orders.
2. System prevents new checkout for that cart.
3. User receives a plain-language explanation.
4. System suggests the nearest available alternatives.
5. Existing paid orders follow the cancellation/refund policy.

---

## 10. Functional Requirements

Priority definitions: **P0** is required for launch, **P1** is important soon after launch, and **P2** is a future enhancement.

### Landing page

| ID | Requirement | Priority |
|---|---|---|
| WEB-01 | Hero communicates nearby cart discovery, order ahead, and self-pickup | P0 |
| WEB-02 | Primary CTA opens the location discovery experience | P0 |
| WEB-03 | User can reject GPS and search an area manually | P0 |
| WEB-04 | Location cards display distance, status, hours, and directions | P0 |
| WEB-05 | Store badges use valid destination URLs | P0 |
| WEB-06 | Desktop view provides a scannable download QR code | P0 |
| WEB-07 | App links preserve campaign and location attribution where supported | P1 |
| WEB-08 | Menu highlights use current names and prices from an approved source | P0 |
| WEB-09 | All statistics and testimonials require evidence and approval | P0 |
| WEB-10 | FAQ explicitly explains pickup-only ordering | P0 |
| WEB-11 | Bahasa Indonesia is the default language | P0 |
| WEB-12 | English localization is supported without redesigning the layout | P1 |

### Application

| ID | Requirement | Priority |
|---|---|---|
| APP-01 | Show nearest available carts in map and list views | P0 |
| APP-02 | Allow manual location selection | P0 |
| APP-03 | Show cart status and last operational update | P0 |
| APP-04 | Show cart-specific menu availability | P0 |
| APP-05 | Prevent checkout without a selected pickup cart | P0 |
| APP-06 | Reconfirm pickup cart, address, and self-pickup at checkout | P0 |
| APP-07 | Support configured digital payment methods | P0 |
| APP-08 | Show accepted, preparing, ready, collected, cancelled, and refunded states | P0 |
| APP-09 | Send ready-for-pickup notification | P0 |
| APP-10 | Support order history and repeat order with availability revalidation | P1 |
| APP-11 | Support favorite carts and products | P1 |
| APP-12 | Support scheduled pickup | P2 |
| APP-13 | Support loyalty, referral, and location-based promotions | P2 |

---

## 11. Data Requirements

### Cart/location record

- Unique cart ID.
- Public cart name.
- Address/landmark.
- Latitude and longitude.
- Current operating status.
- Regular and exceptional operating hours.
- Last status update timestamp.
- Cart photo.
- Navigation destination.
- Supported payment methods.
- Current preparation estimate.
- Menu and stock mapping.

### Product record

- Product ID and public name.
- Category.
- Image and description.
- Base price.
- Variants and modifiers.
- Allergen or dietary information where relevant.
- Availability by cart.

### Order record

- Order ID and customer reference.
- Selected cart ID.
- Items, modifiers, price, discount, and total.
- Payment state.
- Order state and timestamps.
- Pickup code/name.
- Cancellation/refund reason where applicable.

---

## 12. Content Requirements

The following inputs must be supplied and approved before production launch:

- Final spelling and legal form of the Boxling brand.
- Final Indonesian and English brand descriptions.
- Complete cart list and coordinates.
- Operating schedules and update responsibility.
- Real cart, crew, product, and customer photography.
- Approved menu, variants, and prices.
- Preparation-time rules.
- Payment methods.
- App Store and Google Play URLs.
- Verified testimonials and permission to publish names/photos.
- Verified business statistics.
- Customer support channel and service hours.
- Privacy policy, terms, pickup policy, cancellation policy, and refund policy.

Placeholder agency content, invented testimonials, unverified percentages, placeholder pricing, and irrelevant portfolio projects must not ship.

---

## 13. Visual and UX Requirements

- Preserve Boxling’s recognizable red, bold typography, street energy, and human/cart photography.
- Use sky blue, white, and dark neutral tones to balance the red.
- Prioritize real cart/location visuals over generic coffee imagery.
- Keep decorative marquees and collage effects subordinate to information.
- Design mobile-first for widths from 320 px upward.
- Maintain a minimum 44 × 44 px interactive target.
- Maintain minimum 4.5:1 text contrast for normal text.
- Use sequential heading hierarchy and visible keyboard focus.
- Provide descriptive alt text for meaningful images.
- Respect reduced-motion preferences.
- Do not rely on hover, color, or animation alone to communicate state.
- Optimize hero media and reserve layout space to prevent visual shifting.
- Location permission must be requested contextually, not automatically on page load.

---

## 14. Non-Functional Requirements

### Performance

- Target Largest Contentful Paint of 2.5 seconds or less at the 75th percentile.
- Target Cumulative Layout Shift below 0.1.
- Target Interaction to Next Paint below 200 ms.
- Compress images to responsive WebP/AVIF variants.
- Lazy-load media outside the first viewport.
- Provide a poster/fallback for video and avoid requiring sound.

### Reliability

- Cart availability must have a defined source of truth.
- Stale operational status must be visible internally and handled safely.
- A temporary API failure must show a retry state and manual contact/directions fallback.
- Payment callbacks and order creation must be idempotent.

### Security and privacy

- Ask only for permissions required for the current action.
- Explain location usage before the system prompt.
- Provide a manual location alternative.
- Do not expose private staff or customer data in location/order APIs.
- Follow applicable Indonesian privacy, payment, consumer, and electronic transaction requirements; legal review is required before launch.

### SEO and discoverability

- Provide indexable brand, menu, and verified location content.
- Use structured organization and local-business data where valid.
- Give each permanent cart/location a shareable URL when operationally appropriate.
- Use accurate page titles and descriptions for Bali and relevant local areas.

---

## 15. Analytics and Success Metrics

### Primary funnel

Website visit → location interaction → cart viewed → app-store/open-app click → install/open → registration → first paid order → completed pickup.

### Required events

- `landing_view`
- `location_cta_click`
- `location_permission_prompted`
- `location_permission_result`
- `manual_location_search`
- `cart_preview_view`
- `directions_click`
- `app_store_click`
- `qr_download_scan`
- `app_open_from_campaign`
- `registration_complete`
- `checkout_started`
- `payment_success`
- `order_ready`
- `order_collected`
- `order_cancelled`
- `repeat_order`

### KPIs

- Landing-to-location interaction rate.
- Landing-to-store-click rate.
- Store-click-to-install/open rate, where measurable.
- Registration-to-first-order conversion.
- Paid-order-to-collected rate.
- Median order preparation time.
- Cancellation and refund rate.
- Seven-day and 30-day repeat-order rate.
- Location data accuracy incidents.
- Support contacts related to “delivery vs pickup”.

Numeric targets must be set after baseline measurement or a controlled launch; they must not be invented in the PRD.

---

## 16. MVP Acceptance Criteria

The MVP is ready to launch when:

- A new visitor can explain what Boxling offers after viewing the hero.
- “Pickup only / bukan delivery” is visible before checkout and within the landing-page journey.
- Users can find a nearby cart using GPS or manual search.
- Every visible cart has an approved location, operational status, and opening hours.
- A closed or unavailable cart cannot accept a new order.
- The selected cart remains visible through menu, cart, payment, and confirmation.
- Menu availability is validated again before payment.
- A paid order receives a clear status and ready notification.
- App Store, Google Play, QR, directions, contact, and legal links have been tested.
- The full primary journey works on current mobile Safari and Chrome.
- The landing page remains usable with reduced motion and keyboard navigation.
- No agency-template copy, fake metric, placeholder image, or unsupported claim remains.
- Analytics capture the full visit-to-pickup funnel without collecting unnecessary personal data.

---

## 17. Rollout Plan

### Phase 0 — Validation and operational preparation

- Confirm the brand name and positioning.
- Audit all carts, coordinates, schedules, menus, and staff workflows.
- Define who owns real-time status updates.
- Test the proposed user flow with five to eight representative customers.
- Establish baseline web, social, and order data.

### Phase 1 — Landing page MVP

- Replace the agency-template information architecture.
- Launch hero, location preview, how-it-works, app benefits, menu, FAQ, final CTA, and footer.
- Connect valid app-store destinations or waitlist fallback.
- Add analytics and campaign attribution.

### Phase 2 — Pickup application MVP

- Launch cart discovery, cart-specific menu, payment, order status, and pickup notification.
- Pilot with a small, operationally stable subset of carts.
- Monitor location accuracy, preparation time, rejected orders, and support issues.

### Phase 3 — Retention and optimization

- Add repeat order, favorites, loyalty, referral, and promotions.
- A/B test hero value proposition and CTA order.
- Improve location ranking using availability, distance, and preparation time.
- Expand English/local-area content based on visitor demand.

---

## 18. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Cart location or hours are inaccurate | High | Clear operational owner, last-updated data, staff status controls, regular audit |
| Users expect delivery | High | Repeat pickup-only language in hero, how-it-works, cart selection, and checkout |
| App download creates too much friction | High | Allow web location preview and explain app-exclusive order value |
| Menu shown but unavailable | High | Cart-level stock controls and revalidation before payment |
| Staff cannot meet preparation estimates | High | Adjustable estimates, capacity controls, temporary order pause |
| Heavy visual media slows mobile use | Medium | Responsive assets, lazy loading, poster images, performance budgets |
| Unverified claims reduce trust | Medium | Evidence and approval required for every public metric/testimonial |
| Tourists cannot understand the flow | Medium | Planned English localization and universally clear pickup instructions |

---

## 19. Open Decisions

These decisions must be resolved before final UX and engineering estimation:

1. Is the official brand name Boxling or Boxlink?
2. How many carts currently operate, and are they fixed, moving, or scheduled?
3. Can cart location be represented as real-time, schedule-based, or manually updated only?
4. Is the application already published? If yes, what are its store URLs and current capabilities?
5. Can customers browse and order on the web, or only in the native application?
6. Which payment providers will be supported?
7. How is stock synchronized per cart?
8. Who accepts orders and changes preparation status at each cart?
9. What are the cancellation, refund, late pickup, and unclaimed-order rules?
10. Is guest checkout allowed, or is registration mandatory?
11. Which Bali areas and languages are included at launch?
12. Which verified metrics and testimonials may be published?

---

## 20. Definition of Product Success

Boxling succeeds when a customer can discover the brand, find an accurate nearby cart, understand that the transaction is self-pickup, place an order with confidence, and collect it with less uncertainty and waiting than an unassisted walk-up purchase.

