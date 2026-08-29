"use client";

/**
 * ============================================================================
 *  BDSHIPS — GTM (Google Tag Manager) Central Hook File
 * ============================================================================
 *  This is the ONLY file that talks to the GTM dataLayer.
 *  Every component/event must call one of the helpers below.
 *
 *  Full documentation: /GTM-PLAN.md  (variables, triggers, tags, QA)
 *  Container ID: GTM-K8P2P9G8  (injected in src/app/layout.js <head>)
 *
 *  Rules:
 *   - Never push raw objects from components. Use these helpers.
 *   - event names here MUST match the "Custom Event" triggers in GTM
 *     (naming table is in GTM-PLAN.md §5).
 * ============================================================================
 */

const GTM_ID = "GTM-K8P2P9G8";

/** Push a raw object into the dataLayer (event + params). */
export function pushDataLayer(event, params = {}) {
  if (typeof window === "undefined") return; // SSR-safe
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/* ============================================================================
 *  PAGE / NAVIGATION
 * ========================================================================= */

/**
 * SPA route change. Called by DataLayerProvider (src/components/shared/
 * DataLayerProvider.jsx). Initial full page load is tracked by GTM's
 * "All Pages" trigger — do NOT push on first render (would double count).
 */
export function trackPageView({ page_path, page_title, page_location } = {}) {
  pushDataLayer("page_view", {
    page_path,
    page_title,
    page_location,
  });
}

/* ============================================================================
 *  SEARCH
 * ========================================================================= */

/** Home / listing search performed (result opened). */
export function trackSearch({ search_term, result_type, result_id } = {}) {
  pushDataLayer("search", {
    search_term,
    result_type, // "property" | "ship"
    result_id,
  });
}

/* ============================================================================
 *  ENGAGEMENT / CONTENT
 * ========================================================================= */

/** Home destination card click (Tangour / Sundarban / Saint Martin). */
export function trackSelectContent({ content_type, content_id, destination } = {}) {
  pushDataLayer("select_content", {
    content_type, // "dest_card"
    content_id,
    destination,
  });
}

/** CTA button click (e.g. "Book Ship Tickets", "See all"). */
export function trackCtaClick({ cta_text, cta_location, cta_url } = {}) {
  pushDataLayer("click_cta", { cta_text, cta_location, cta_url });
}

/** FAQ item opened/closed. */
export function trackFaqToggle({ faq_question } = {}) {
  pushDataLayer("faq_toggle", { faq_question });
}

/** Outbound link (blog / social / external). */
export function trackOutboundClick({ link_url, link_text } = {}) {
  pushDataLayer("click_outbound", { link_url, link_text });
}

/* ============================================================================
 *  E-COMMERCE (GA4 enhanced measurement)
 * ========================================================================= */

/** A package/ship was viewed in detail → dynamic remarketing. */
export function trackViewItem({ item_id, item_name, item_category, price } = {}) {
  pushDataLayer("view_item", {
    currency: "BDT",
    value: price || 0,
    items: [
      {
        item_id: String(item_id),
        item_name,
        item_category,
        price: price || 0,
        quantity: 1,
      },
    ],
  });
}

/** "Book Now" on a package → start of checkout (WhatsApp booking funnel). */
export function trackBeginCheckout({ item_id, item_name, item_category, price, contact_channel = "whatsapp" } = {}) {
  pushDataLayer("begin_checkout", {
    currency: "BDT",
    value: price || 0,
    items: [
      {
        item_id: String(item_id),
        item_name,
        item_category,
        price: price || 0,
        quantity: 1,
      },
    ],
    contact_channel,
  });
}

/* ============================================================================
 *  LEADS / CONVERSIONS
 * ========================================================================= */

/**
 * Contact/consultancy form submitted successfully → primary conversion.
 * IMPORTANT: deliberately NOT sending raw phone/email (GA4 PII policy).
 * `has_phone` boolean is enough for remarketing/lead quality.
 */
export function trackGenerateLead({ lead_type, property_name, category, has_phone = false } = {}) {
  pushDataLayer("generate_lead", {
    lead_type, // "property_consultancy"
    property_name,
    category, // "tour"
    has_phone,
  });
}

/* ============================================================================
 *  CONTACT CHANNEL CLICKS (phone / whatsapp / messenger / email)
 * ========================================================================= */

export function trackContactClick({ contact_channel, contact_location } = {}) {
  pushDataLayer("click_contact", {
    contact_channel, // "phone" | "whatsapp" | "messenger" | "email"
    contact_location, // "header" | "listing_property" | "package_card" | "contact_page"
  });
}

/* ============================================================================
 *  DIAGNOSTICS
 * ========================================================================= */

/** Validation / submit failure on a form. */
export function trackFormError({ form_id, error_message } = {}) {
  pushDataLayer("form_error", { form_id, error_message });
}

/** 404 page rendered. */
export function trackNotFound({ page_path } = {}) {
  pushDataLayer("not_found", { page_path });
}

export { GTM_ID };