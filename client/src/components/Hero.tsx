import { GlowButton } from "@/components/ui/glow-button";
import { ArrowRight } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

export default function Hero() {
  const { track } = useTracking();

  return (
    // AJUSTE 1: Container simplificado.
    // h-auto e min-h-[550px] garantem altura no mobile sem cortar conteúdo.
    // py-16 dá um respiro equilibrado em cima e embaixo no mobile.
    <section className="relative h-auto min-h-[550px] py-16 md:min-h-[80vh] md:py-0 flex flex-col justify-center overflow-hidden bg-[#1a3a52]">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src="/images/hero-bg.webp?v=4"
          srcSet="/images/hero-bg-400w.webp?v=4 400w, /images/hero-bg-600w.webp?v=4 600w, /images/hero-bg-sm.webp?v=4 800w, /images/hero-bg-md.webp?v=4 1200w, /images/hero-bg.webp?v=4 1920w"
          sizes="100vw"
          alt="Ambiente acadêmico acolhedor"
          // Mantivemos object-top para focar no nome da faculdade
          className="w-full h-full object-cover object-top"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />

        {/* Overlay Escuro Principal (Mantido) */}
        <div className="absolute inset-0 w-full h-full bg-[#1a3a52]/[0.65] md:bg-[#1a3a52]/[0.55]" />

        {/* Overlay Escuro Extra para Mobile (Mantido para legibilidade) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/60 opacity-90 md:opacity-0" />

        {/* AJUSTE 2: CORREÇÃO DO FADE BRANCO (A solução simples) */}
        {/* Mobile: 'hidden' remove o fade branco completamente. O bloco escuro termina seco contra o branco abaixo. */}
        {/* Desktop: 'md:block' mostra o fade, e 'md:h-32' garante que ele seja apenas uma faixa curta no rodapé, sem lavar a imagem toda. */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 w-full md:h-32 bg-gradient-to-t from-background to-transparent opacity-100" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center text-white space-y-6 md:space-y-8 px-4">
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

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 pt-2">
          <GlowButton
            onClick={() => track("button_click", { button: "agendar_mentoria", location: "hero" })}
            href="https://calendly.com/patricia-dias-amf/mentoria-educacional"
            // Ajustei ligeiramente o tamanho do botão no mobile para ficar mais proporcional
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg md:text-2xl px-8 md:px-16 h-14 md:h-20 shadow-2xl group"
          >
            Agendar Horário
            <ArrowRight className="ml-2 h-5 w-5 md:h-8 md:w-8 transition-transform duration-300 group-hover:translate-x-2 animate-[bounce-x_1.5s_ease-in-out_infinite]" />
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
