# BDShips — Google Tag Manager (GTM) Implementation Plan

> **Status:** Foundation ready. Container `GTM-K8P2P9G8` is live in `<head>` (src/app/layout.js).
> This document is the **single source of truth** for connecting GTM to the site.
> Every event, variable, trigger, tag and QA step for the future is defined here.

---

## 1. How the system works (architecture)

```
Component (user action)
   │  calls a helper 👇
   ▼
src/utils/gtm.js  ← CENTRAL HOOK FILE — the only file that writes to dataLayer
   │  window.dataLayer.push({ event, ...params })
   ▼
Google Tag Manager container (GTM-K8P2P9G8)
   │  Triggers match the event name → Tags fire
   ▼
GA4 / Google Ads / Meta / etc.
```

**Rules (always):**
1. Components **never** call `window.dataLayer.push()` directly — always via `src/utils/gtm.js`.
2. The **event name** in code must **exactly match** the **Custom Event trigger** name in GTM.
3. Every key in the payload = a **Data Layer Variable** you create in GTM (see §5-A).
4. New helper functions are added **only** in `src/utils/gtm.js`, then documented here.

---

## 2. File map (what exists / what connects where)

| File | Role | Status |
|---|---|---|
| `src/app/layout.js` | GTM snippet in `<head>` + `DataLayerProvider` mount in `<body>` | ✅ done (already live) |
| `src/utils/gtm.js` | Central hook file — all `dataLayer` helpers live here | ✅ done (new) |
| `src/components/shared/DataLayerProvider.jsx` | Pushes `page_view` on SPA route changes | ✅ done (new, wired in layout) |
| `src/components/tour/ContactForm/ContactForm.jsx` | `generate_lead` → on form submit success | ⬜ add call (Phase 1) |
| `src/components/tour/packageCarousel/packageCarousel.js` | `begin_checkout` + `click_contact` on "Book Now"/"Call Now" | ⬜ add call (Phase 1) |
| `src/components/SearchBar/Ship/ShipsSearch.js` | `search` → in `handleSearch()` after navigation | ⬜ add call (Phase 1) |
| `src/components/tour/Property/PropertyContactButtons.js` | `click_contact` (floating call/WhatsApp) | ⬜ add call (Phase 1) |
| `src/components/shared/BookMeHeader/BookmeHeader.jsx` | `click_contact` (header phone/WhatsApp) | ⬜ add call (Phase 1) |
| `src/app/contact/page.jsx` | `click_contact` (phone/whatsapp/messenger/email cards) | ⬜ add call (Phase 1) |
| `src/utils/TourSwiper.js` | `select_content` + `click_cta` (Home destination cards / "See all") | ⬜ add call (Phase 2) |
| `src/components/Faq/Faq.jsx` | `faq_toggle` (details onToggle) | ⬜ add call (Phase 3) |
| `src/app/not-found.jsx` / `src/pages/404.js` | `not_found` | ⬜ add call (Phase 3) |
| `pre-footer-content/*` (blog) | `click_outbound` | ⬜ add call (Phase 3) |

> "⬜ add call" = add the one-line helper call listed in §5-C. Example pattern:
> ```js
> import { trackSearch } from "@/utils/gtm";
> // inside handler
> trackSearch({ search_term: selectedItem.name, result_type: selectedItem.type, result_id: selectedItem.id });
> ```

---

## 3. Event inventory (everything we track)

| # | Event | Fires when | Code file to hook | Key params |
|---|---|---|---|---|
| 1 | `page_view` | SPA route change (after first load) | `DataLayerProvider.jsx` (auto) | `page_path`, `page_title`, `page_location` |
| 2 | `search` | Search result opened from home/listing | `ShipsSearch.js` → `handleSearch` | `search_term`, `result_type`, `result_id` |
| 3 | `select_content` | Home destination card clicked | `TourSwiper.js` | `content_type`, `content_id`, `destination` |
| 4 | `view_item_list` | Ships listing shown | `Property.js` | `item_list_name` |
| 5 | `view_item` | Package detail viewed (swiper slide in view) | `packageCarousel.js` | `item_id`, `item_name`, `item_category`, `price`, `currency`, `items` |
| 6 | `begin_checkout` | "Book Now" (WhatsApp) clicked on a package | `packageCarousel.js` | `item_id`, `item_name`, `item_category`, `price`, `contact_channel` |
| 7 | `generate_lead` | Consultancy/Contact form submitted OK | `ContactForm.jsx` → `onSubmit` | `lead_type`, `property_name`, `category`, `has_phone` |
| 8 | `click_contact` | Phone / WhatsApp / Messenger / Email clicked | Header, PropertyContactButtons, contact page | `contact_channel`, `contact_location` |
| 9 | `click_cta` | CTA link/button ("Book Ship Tickets", "See all") | `TourSwiper.js`, FAQ, CTASection | `cta_text`, `cta_location`, `cta_url` |
| 10 | `faq_toggle` | FAQ item opened | `Faq.jsx` | `faq_question` |
| 11 | `form_error` | Form submit failure / validation error | `ContactForm.jsx` catch & errors | `form_id`, `error_message` |
| 12 | `click_outbound` | Outbound/blog/external link | `pre-footer-content/*` | `link_url`, `link_text` |
| 13 | `not_found` | 404 page rendered | `not-found.jsx` | `page_path` |

**Naming convention:** event names are lowercase snake_case. GTM triggers use the **same string**.

---

## 4. dataLayer payload examples (same shape as code sends)

```js
// page_view (auto)
window.dataLayer.push({
  event: "page_view",
  page_path: "/ships/Sundarban/2",
  page_title: "Sundarban Ship Tours & Cruises | BookMe",
  page_location: "https://bdships.com/ships/Sundarban/2",
});

// search
{
  event: "search",
  search_term: "Sundarban",
  result_type: "property",
  result_id: 391,
}

// view_item
{
  event: "view_item",
  currency: "BDT",
  value: 8500,
  items: [{ item_id: "530", item_name: "Attached High Commode Couple Cabin",
            item_category: "ship_package", price: 8500, quantity: 1 }],
}

// begin_checkout
{
  event: "begin_checkout",
  currency: "BDT",
  value: 8500,
  items: [{ item_id: "530", item_name: "Attached High Commode Couple Cabin",
            item_category: "ship_package", price: 8500, quantity: 1 }],
  contact_channel: "whatsapp",
}

// generate_lead  ⚠️ NO raw phone/email on purpose (GA4 PII policy)
{
  event: "generate_lead",
  lead_type: "property_consultancy",
  property_name: "MV Coastal Cruise",
  category: "tour",
  has_phone: true,
}

// click_contact
{
  event: "click_contact",
  contact_channel: "whatsapp",   // or phone | messenger | email
  contact_location: "package_card", // or header | listing_property | contact_page
}
---

## 5. GTM Container Setup (do once in tagmanager.google.com)

### A. Variables to create (Type = Data Layer Variable)

| Variable name (in GTM) | Data Layer Variable Name | Used by events |
|---|---|---|
| `dL_page_path` / `dL_page_title` / `dL_page_location` | `page_path` / `page_title` / `page_location` | page_view |
| `dL_search_term` / `dL_result_type` / `dL_result_id` | `search_term` / `result_type` / `result_id` | search |
| `dL_content_type` / `dL_content_id` / `dL_destination` | `content_type` / `content_id` / `destination` | select_content |
| `dL_item_list_name` | `item_list_name` | view_item_list |
| `dL_item_id` | `items.0.item_id` | view_item, begin_checkout |
| `dL_item_name` | `items.0.item_name` | view_item, begin_checkout |
| `dL_item_category` | `items.0.item_category` | view_item, begin_checkout |
| `dL_item_price` | `items.0.price` | view_item, begin_checkout |
| `dL_currency` / `dL_value` | `currency` / `value` | view_item, begin_checkout |
| `dL_contact_channel` | `contact_channel` | begin_checkout, click_contact |
| `dL_contact_location` | `contact_location` | click_contact |
| `dL_lead_type` / `dL_property_name` / `dL_category` / `dL_has_phone` | `lead_type` / `property_name` / `category` / `has_phone` | generate_lead |
| `dL_cta_text` / `dL_cta_location` / `dL_cta_url` | `cta_text` / `cta_location` / `cta_url` | click_cta |
| `dL_faq_question` | `faq_question` | faq_toggle |
| `dL_form_id` / `dL_error_message` | `form_id` / `error_message` | form_error |
| `dL_link_url` / `dL_link_text` | `link_url` / `link_text` | click_outbound |
| `dL_page_path_404` | `page_path` | not_found |

> **GA4 ecommerce:** `items[]` arrays are read natively by GA4 Enhanced
> Ecommerce (`items.0.item_id`, `items.0.price`, …). The `dL_*` variables above
> are for custom HTML tags / Google Ads. GA4 golden params (`items`, `value`,
> `currency`, `search_term`) work automatically.

### B. Triggers to create (all type = **Custom Event**)

| Trigger name | Event name (= code event) |
|---|---|
| `CE - page_view` | `page_view` |
| `CE - search` | `search` |
| `CE - select_content` | `select_content` |
| `CE - view_item_list` | `view_item_list` |
| `CE - view_item` | `view_item` |
| `CE - begin_checkout` | `begin_checkout` |
| `CE - generate_lead` | `generate_lead` |
| `CE - click_contact` | `click_contact` |
| `CE - click_cta` | `click_cta` |
| `CE - faq_toggle` | `faq_toggle` |
| `CE - form_error` | `form_error` |
| `CE - click_outbound` | `click_outbound` |
| `CE - not_found` | `not_found` |

Plus built-in **`All Pages`** trigger for the initial page load (no code needed).

### C. Tags to create

| Tag name | Tag type | Trigger | Purpose |
|---|---|---|---|
| `GA4 - Config` | GA4 Configuration (`G-XXXXXXX`) | All Pages | Base session + initial page_view |
| `GA4 - Virtual pageview` | GA4 Event, name `page_view` | `CE - page_view` | SPA route changes |
| `GA4 - Search` | GA4 Event, name `search` | `CE - search` | Site search |
| `GA4 - ViewItemList` | GA4 Event, name `view_item_list` | `CE - view_item_list` | EEC impressions |
| `GA4 - ViewItem` | GA4 Event, name `view_item` | `CE - view_item` | EEC detail + remarketing |
| `GA4 - BeginCheckout` | GA4 Event, name `begin_checkout` | `CE - begin_checkout` | EEC checkout start (conversion) |
| `GA4 - GenerateLead` | GA4 Event, name `generate_lead` | `CE - generate_lead` | Lead conversion |
| `GA4 - Contact Click` | GA4 Event, name `click_contact` | `CE - click_contact` | Channel tracking |
| `GA4 - SelectContent` | GA4 Event, name `select_content` | `CE - select_content` | Content engagement |
| `GA4 - CTA` | GA4 Event, name `click_cta` | `CE - click_cta` | CTA tracking |
| `GA4 - FAQ` | GA4 Event, name `faq_toggle` | `CE - faq_toggle` | Content depth |
| `GA4 - Outbound` | GA4 Event, name `click_outbound` | `CE - click_outbound` | Outbound links |
| `GA4 - Form Error` | GA4 Event, name `form_error` | `CE - form_error` | Failure diagnostics |
| `Ads - Remarketing` | Google Ads Conversion/Remarketing | `view_item`, `begin_checkout`, `generate_lead` | Ads audiences |

For **GA4 Event tags**: `Send to` = your GA4 Measurement ID, `Event Name` = the event,
and (optional) map parameters via the Data Layer Variables (§5-A).

### D. GA4 property settings

1. **Data Stream** → enable **Enhanced Measurement** (site search optional — our events already cover it).
2. **Ecommerce** flag ON (Enhanced Ecommerce) so `begin_checkout`, `view_item` populate funnel reports.
3. **Admin → Conversions** → mark **`generate_lead`** and **`begin_checkout`** as conversions.

### E. Google Ads

- Conversion actions for `generate_lead` (primary) and `begin_checkout` (secondary).
- Dynamic remarketing via `view_item` `item_id` (= ship `unit_id`) if a Merchant feed exists;
  otherwise build audience on `item_name` / destination.

---

## 6. Implementation checklist (code side — for devs)

Foundation (already done & deployed):
- [x] `src/utils/gtm.js` — central hook file (all helpers written)
- [x] `src/components/shared/DataLayerProvider.jsx` — SPA page_view
- [x] `src/app/layout.js` — GTM snippet + provider mount

**Phase 1 (core conversion events):**
- [ ] `ContactForm.jsx` `onSubmit`: after `toast.success` →
  `trackGenerateLead({ lead_type: "property_consultancy", property_name: propertyDetails, category, has_phone: true })`
- [ ] `packageCarousel.js`: "Book Now" → `trackBeginCheckout({ item_id: pkg.unit_id, item_name: pkg.unit_name, item_category: "ship_package", price: pkg.price[0]?.price })`; "Call Now" → `trackContactClick({ contact_channel: "phone", contact_location: "package_card" })`
- [ ] `ShipsSearch.js` `handleSearch`: `trackSearch({ search_term: selectedItem.name, result_type: selectedItem.type, result_id: selectedItem.id })`
- [ ] `PropertyContactButtons.js`: `trackContactClick({ contact_channel: "phone"|"whatsapp", contact_location: "listing_property" })`
- [ ] `BookmeHeader.jsx`: `trackContactClick({ contact_channel: "phone"|"whatsapp", contact_location: "header" })`
- [ ] `contact/page.jsx`: `trackContactClick({ contact_channel, contact_location: "contact_page" })` on 4 cards

**Phase 2 (ecommerce / remarketing):**
- [ ] `TourSwiper.js`: card click → `trackSelectContent({ content_type: "dest_card", content_id, destination: title })`; "See all" → `trackCtaClick({ cta_text: "See all", cta_location: title, cta_url: seeMoreLink })`
- [ ] `Property.js`: `trackViewItemList`-equivalent on listing render
- [ ] `packageCarousel.js` swiper `afterChange`: `trackViewItem({ item_id, item_name, item_category, price })`

**Phase 3 (engagement / diagnostics):**
- [ ] `Faq.jsx`: `trackFaqToggle({ faq_question })`
- [ ] `not-found.jsx`: `trackNotFound({ page_path })`
- [ ] `pre-footer-content/*`: `trackOutboundClick({ link_url, link_text })`

> Remember: add `import { trackX } from "@/utils/gtm";` at the top of each component.

---

## 7. QA / Testing (after each deploy)

1. DevTools → Console → `window.dataLayer` → confirm pushed objects (events) exist.
2. **GTM Preview** (tagmanager.google.com → Preview → bdships.com): perform actions on site,
   confirm matching tags fire in Tag Assistant.
3. **GA4 DebugView / Realtime**: search → package detail → "Book Now" → form submit;
   confirm `search`, `view_item`, `begin_checkout`, `generate_lead` appear.
4. **SPA page_view test**: click Home → Sundarban → back; expect a `page_view` in dataLayer per route change.
5. **No double pageview** on first load (only the GA4 Config tag should fire `page_view` once).
6. Every push to `main` auto-deploys — re-run quick QA after each deploy.

---

## 8. Notes & gotchas

- **Initial load vs route change:** our code only pushes `page_view` on route change;
  the first load is covered by GTM `All Pages`. Never remove the `isFirstRender` guard in
  `DataLayerProvider.jsx` — it prevents double pageviews.
- **PII:** do not push raw phone numbers or emails as dataLayer values
  (GA4 policy + GTM Preview clutter). `generate_lead` sends `has_phone: true` only.
- **No `purchase` event** (booking is off-site via WhatsApp/phone). `begin_checkout` is the
  deepest in-funnel event; `generate_lead` is the primary conversion.
- Currency is always **`BDT`** (hardcoded in helpers — no per-event currency param needed).
- If online payment is added later, add `add_to_cart`, `add_payment_info`, `purchase`
  in the same pattern and update §3/§4 of this doc.

---

## 9. Rollout order (recommended)

1. Phase 1 events + GTM tags → deploy → QA (§7)
2. Phase 2 (EEC + remarketing) → deploy → QA
3. Phase 3 (engagement/diagnostics) → deploy → QA
4. Mark GA4 conversions + create Google Ads conversion actions
5. Weekly GA4 report review — funnel: `page_view → view_item → begin_checkout → generate_lead`