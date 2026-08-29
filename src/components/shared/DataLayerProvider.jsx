"use client";

/**
 * SPA page-view tracking for Google Tag Manager.
 * - Mounts in root layout (src/app/layout.js) inside <body>.
 * - Pushes a `page_view` event on every route change (except the very first
 *   full page load, which GTM's own "All Pages" trigger already covers).
 *
 * GTM setup for this event → see GTM-PLAN.md §5 (trigger: Custom Event
 * "page_view", GA4 Event tag with event name `page_view`).
 */
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/utils/gtm";

export default function DataLayerProvider({ children }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      // Initial load is handled by GTM "All Pages" trigger — skip to avoid
      // double-firing page_view on first paint.
      isFirstRender.current = false;
      return;
    }

    trackPageView({
      page_path: window.location.pathname + window.location.search,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [pathname]);

  return children;
}