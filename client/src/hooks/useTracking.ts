import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";

// Gerar um ID de sessão único
function getSessionId() {
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}

export function useTracking() {
  const trackMutation = trpc.tracking.track.useMutation();
  const [sessionId] = useState(getSessionId);

  const track = (eventType: string, eventData?: Record<string, any>) => {
    trackMutation.mutate({
      eventType,
      eventData: eventData ? JSON.stringify(eventData) : undefined,
      sessionId,
    });
  };

  return { track };
}

// Hook para rastrear visualização de página
export function usePageView(pageName: string) {
  const { track } = useTracking();

  useEffect(() => {
    track("page_view", { page: pageName });
    
    // Track pageview no Umami (sem usar unload)
    if (typeof window !== 'undefined' && (window as any).umami) {
      (window as any).umami.track();
    }
  }, [pageName]);
}

// Hook para rastrear visualização de seção
export function useSectionView(sectionName: string) {
  const { track } = useTracking();
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked) {
            track("section_view", { section: sectionName });
            setHasTracked(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(sectionName);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sectionName, hasTracked, track]);
}
