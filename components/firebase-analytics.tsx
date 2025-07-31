"use client"

import { useEffect } from 'react';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export function FirebaseAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && analytics) {
      analytics.then(an => {
        if (an) {
          logEvent(an, 'page_view', {
            page_path: window.location.pathname,
            page_location: window.location.href,
            page_title: document.title,
          });
        }
      });
    }
  }, []);

  return null;
}
