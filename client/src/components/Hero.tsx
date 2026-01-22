import { GlowButton } from "@/components/ui/glow-button";
import { ArrowRight } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

export default function Hero() {
  const { track } = useTracking();

  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#1a3a52]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.webp?v=4"
          srcSet="/images/hero-bg-400w.webp?v=4 400w, /images/hero-bg-600w.webp?v=4 600w, /images/hero-bg-sm.webp?v=4 800w, /images/hero-bg-md.webp?v=4 1200w, /images/hero-bg.webp?v=4 1920w"
          sizes="100vw"
          alt="Ambiente acadêmico acolhedor"
          className="w-full h-full object-contain md:object-cover object-top"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />

        {/* Overlay de Gradiente Azul Marinho - 35% transparência para melhor legibilidade */}
        <div className="absolute inset-0 bg-[#1a3a52]/[0.65] md:bg-[#1a3a52]/[0.55]" />

        {/* Gradiente adicional para suavizar a transição inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 md:opacity-100" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center text-white space-y-8 px-4">
        <div className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="px-4 py-2 rounded-full bg-secondary/20 border border-secondary/50 text-secondary text-sm font-bold tracking-wider uppercase backdrop-blur-sm">
            Antonio Meneghetti Faculdade
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 text-white drop-shadow-lg">
          Mentoria Educacional{" "}
          <span
            className="text-secondary"
            style={{
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)"
            }}
          >
            Universitária
          </span>
        </h1>

        <p
          className="text-lg md:text-xl text-white max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 font-medium"
          style={{
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3), 0 8px 40px rgba(0, 0, 0, 0.2)"
          }}
        >
          Um espaço seguro e acolhedor para o seu desenvolvimento acadêmico, profissional e pessoal.
          Supere desafios e alcance seu máximo potencial.
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
          <GlowButton
            onClick={() => track("button_click", { button: "agendar_mentoria", location: "hero" })}
            href="https://calendly.com/patricia-dias-amf/mentoria-educacional"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-2xl px-16 h-20 shadow-2xl group"
          >
            Agendar Horário
            <ArrowRight className="ml-2 h-8 w-8 transition-transform duration-300 group-hover:translate-x-2 animate-[bounce-x_1.5s_ease-in-out_infinite]" />
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
