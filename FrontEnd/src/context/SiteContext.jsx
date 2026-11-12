import { createContext, useContext, useEffect, useState } from 'react';
import { fetchSiteSettings } from '../api/settings.api.js';
import { SITE_DEFAULTS, mergeSiteSettings } from '../constants/siteDefaults.js';

const SiteContext = createContext(SITE_DEFAULTS);

/**
 * Site-wide content (company details, hero, stats, process, team, …).
 * Renders immediately with the bundled defaults, then swaps in whatever
 * has been saved from the admin panel once the API answers.
 */
export function SiteProvider({ children }) {
  const [site, setSite] = useState(SITE_DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings()
      .then((response) => {
        if (!cancelled) setSite(mergeSiteSettings(response.data));
      })
      .catch(() => {
        // Keep the defaults: the site must still render if the API is down.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
