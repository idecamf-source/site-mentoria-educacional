import { GlowButton } from "@/components/ui/glow-button";
import { ArrowRight } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

export default function Hero() {
  const { track } = useTracking();

  return (
    // ESTRUTURA BLINDADA:
    // 'relative' e 'overflow-hidden': Seguram tudo dentro da caixa.
    // 'min-h-[600px]': Garante altura mínima no celular.
    // 'md:min-h-[85vh]': Garante imponência no desktop.
    // 'bg-[#1a3a52]': Apenas cor de segurança (a imagem vai cobrir).
    <section className="relative w-full min-h-[600px] md:min-h-[85vh] flex flex-col justify-center overflow-hidden bg-[#1a3a52]">
      
      {/* 1. A IMAGEM DE FUNDO QUE PREENCHE TUDO */}
      {/* 'absolute inset-0' + 'h-full': Obriga a imagem a ir até o último pixel da seção. */}
      {/* 'object-cover': Faz o zoom automático para não sobrar bordas. */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.webp?v=4"
          srcSet="/images/hero-bg-400w.webp?v=4 400w, /images/hero-bg-600w.webp?v=4 600w, /images/hero-bg-sm.webp?v=4 800w, /images/hero-bg-md.webp?v=4 1200w, /images/hero-bg.webp?v=4 1920w"
          sizes="100vw"
          alt="Ambiente acadêmico acolhedor"
          className="w-full h-full object-cover object-top"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />

        {/* 2. OVERLAY ESCURO (LEITURA) */}
        {/* Camada única e sólida para garantir que o texto branco apareça. */}
        <div className="absolute inset-0 bg-black/50 md:bg-[#1a3a52]/50" />

        {/* 3. A TRANSIÇÃO SUAVE (O "FADE") */}
        {/* Apenas no rodapé (bottom-0), curto (h-24) e sutil. */}
        {/* Conecta a imagem ao fundo branco sem criar névoa no meio da tela. */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      {/* 4. O CONTEÚDO (TEXTO E BOTÃO) */}
      {/* 'py-20': Garante que o texto nunca encoste nas bordas em telas pequenas. */}
      {/* 'z-20': Garante que fique SOBRE a imagem e o fade. */}
      <div className="container relative z-20 flex flex-col items-center text-center text-white space-y-8 px-4 py-20">
        
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

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 pt-4">
          <GlowButton
            onClick={() => track("button_click", { button: "agendar_mentoria", location: "hero" })}
            href="https://calendly.com/patricia-dias-amf/mentoria-educacional"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-xl md:text-2xl px-10 md:px-16 h-16 md:h-20 shadow-2xl group"
          >
            Agendar Horário
            <ArrowRight className="ml-2 h-6 w-6 md:h-8 md:w-8 transition-transform duration-300 group-hover:translate-x-2 animate-[bounce-x_1.5s_ease-in-out_infinite]" />
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
