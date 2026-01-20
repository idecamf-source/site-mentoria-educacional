import { useAuth } from "@/_core/hooks/useAuth";

import Hero from "@/components/Hero";
import Disponibilidade from "@/components/Disponibilidade";
import Pilares from "@/components/Pilares";
import Mentora from "@/components/Mentora";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import { usePageView, useTracking } from "@/hooks/useTracking";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  // Rastrear visualização da página
  usePageView("home");

  const { track } = useTracking();

  const handleScheduleClick = () => {
    track("button_click", { button: "agendar_horario", location: "cta_final" });
    window.open("https://calendly.com/patricia-dias-amf/mentoria-educacional", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <main className="flex-grow">
        <Hero />
        <VideoSection />
        <Disponibilidade />
        <Pilares />
        <Mentora />

        {/* CTA Final Section */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.webp?v=3')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          <div className="container relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">
              Pronto para impulsionar sua jornada acadêmica?
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Agende agora sua sessão de mentoria e dê o próximo passo em direção ao seu sucesso pessoal e profissional.
            </p>
            <Button
              size="lg"
              onClick={handleScheduleClick}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-10 h-16 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <CalendarCheck className="mr-2 h-6 w-6" />
              Agendar Horário
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
