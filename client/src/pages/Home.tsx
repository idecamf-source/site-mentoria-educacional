import { useAuth } from "@/_core/hooks/useAuth";
import { lazy, Suspense } from "react";

// Critical above-the-fold component - loaded immediately
import Hero from "@/components/Hero";

// Lazy load below-the-fold components to reduce initial JS bundle
const VideoSection = lazy(() => import("@/components/VideoSection"));
const Disponibilidade = lazy(() => import("@/components/Disponibilidade"));
const Pilares = lazy(() => import("@/components/Pilares"));
const Mentora = lazy(() => import("@/components/Mentora"));
const Footer = lazy(() => import("@/components/Footer"));
const ScrollToTop = lazy(() => import("@/components/ScrollToTop"));
const CTAFinal = lazy(() => import("@/components/CTAFinal"));

import { usePageView } from "@/hooks/useTracking";

// Lightweight loading placeholder for sections
function SectionSkeleton() {
  return (
    <div className="py-16 animate-pulse">
      <div className="container">
        <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8" />
        <div className="h-4 bg-muted rounded w-2/3 mx-auto mb-4" />
        <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
      </div>
    </div>
  );
}

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  // Rastrear visualização da página
  usePageView("home");

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <main className="flex-grow">
        {/* Hero is critical - loaded immediately */}
        <Hero />
        
        {/* Below-the-fold sections - lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <VideoSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <Disponibilidade />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <Pilares />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <Mentora />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <CTAFinal />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </div>
  );
}
