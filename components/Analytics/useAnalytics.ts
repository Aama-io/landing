import { useCallback } from 'react';
import { event } from './analytics';

export function useAnalytics() {
  const trackEvent = useCallback(
    ({ action, category, label, value }: {
      action: string;
      category: string;
      label?: string;
      value?: number;
    }) => {
      event({ action, category, label, value });
    },
    []
  );

  return {
    trackEvent,
  };
} 