import { GlowButton } from "@/components/ui/glow-button";
import { ArrowRight } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

export default function Hero() {
  const { track } = useTracking();

  return (
    // MUDANÇA TOTAL DE ESTRUTURA: USANDO GRID
    // Isso cria uma pilha única. Onde houver conteúdo, haverá fundo.
    <section className="grid grid-cols-1 w-full min-h-[600px] md:min-h-[85vh] bg-[#1a3a52] overflow-hidden">
      
      {/* CAMADA 1: A IMAGEM DE FUNDO (Estica junto com a célula do Grid) */}
      {/* col-start-1 row-start-1: Obriga a ficar na mesma posição do texto */}
      <div className="col-start-1 row-start-1 w-full h-full relative">
        <img
          src="/images/hero-bg.webp?v=4"
          srcSet="/images/hero-bg-400w.webp?v=4 400w, /images/hero-bg-600w.webp?v=4 600w, /images/hero-bg-sm.webp?v=4 800w, /images/hero-bg-md.webp?v=4 1200w, /images/hero-bg.webp?v=4 1920w"
          sizes="100vw"
          alt="Ambiente acadêmico acolhedor"
          // object-cover: Garante o zoom para cobrir tudo
          // object-top: Garante que o nome da faculdade não corte
          className="absolute inset-0 w-full h-full object-cover object-top"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />

        {/* Overlay Escuro para o texto aparecer */}
        <div className="absolute inset-0 bg-black/55" />

        {/* O Fade da base - Fixo no fundo da imagem */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* CAMADA 2: O CONTEÚDO (Texto e Botão) */}
      {/* col-start-1 row-start-1: Fica EM CIMA da imagem, forçando a altura da célula */}
      {/* self-center: Centraliza verticalmente se sobrar espaço */}
      <div className="col-start-1 row-start-1 relative z-10 flex flex-col items-center justify-center text-center text-white px-4 py-24 md:py-0">
        
        <div className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-1000 mb-6 md:mb-8">
          <span className="px-4 py-2 rounded-full bg-secondary/20 border border-secondary/50 text-secondary text-sm font-bold tracking-wider uppercase backdrop-blur-sm">
            Antonio Meneghetti Faculdade
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 text-white drop-shadow-lg mb-6 md:mb-8">
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
          className="text-lg md:text-xl text-white max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 font-medium mb-8 md:mb-10"
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
