import CTAFinal from "@/components/CTAFinal";
import Disponibilidade from "@/components/Disponibilidade";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Mentora from "@/components/Mentora";
import Navbar from "@/components/Navbar";
import Pilares from "@/components/Pilares";
import ScrollToTop from "@/components/ScrollToTop";
import VideoSection from "@/components/VideoSection";
import { useBloquearCopia } from "@/hooks/useBloquearCopia";
import { useCorDaRolagem } from "@/hooks/useCorDaRolagem";
import { usePageView } from "@/hooks/useTracking";

// Seções carregadas juntas (são leves). O vídeo, o item pesado, só baixa ao clicar em reproduzir.
export default function Home() {
  usePageView("home");
  useCorDaRolagem();
  useBloquearCopia();

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
      <ScrollToTop />
    </div>
  );
}
