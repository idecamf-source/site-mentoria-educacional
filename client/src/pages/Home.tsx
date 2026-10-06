import CTAFinal from "@/components/CTAFinal";
import Disponibilidade from "@/components/Disponibilidade";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Mentora from "@/components/Mentora";
import Navbar from "@/components/Navbar";
import Pilares from "@/components/Pilares";
import RelogioNoite from "@/components/RelogioNoite";
import ScrollToTop from "@/components/ScrollToTop";
import VideoSection from "@/components/VideoSection";
import { usePageView } from "@/hooks/useTracking";

// Seções carregadas juntas: são leves, e o relógio da noite precisa de todas no DOM
// para acompanhar a rolagem. O vídeo (o item pesado) só baixa ao clicar em reproduzir.
export default function Home() {
  usePageView("home");

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <VideoSection />
        <Disponibilidade />
        <Pilares />
        <Mentora />
        <CTAFinal />
      </main>
      <Footer />
      <RelogioNoite />
      <ScrollToTop />
    </div>
  );
}
