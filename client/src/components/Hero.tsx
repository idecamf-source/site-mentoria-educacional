import { GlowButton } from "@/components/ui/glow-button";
import { ArrowRight } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

export default function Hero() {
  const { track } = useTracking();

  return (
    // SOLUÇÃO "AMIGO WEB DESIGNER" (CSS BACKGROUND):
    // Em vez de elementos separados, a imagem é aplicada como propriedade do container.
    // 'bg-cover': Garante o preenchimento total (zoom automático).
    // 'bg-top': Garante que o topo (nome da faculdade) não corte.
    // 'bg-no-repeat': Evita repetições.
    <section 
      className="relative w-full min-h-[650px] md:min-h-[85vh] flex flex-col justify-center overflow-hidden bg-[#2e7cb7]"
      style={{
        backgroundImage: "url('/images/hero-bg.webp?v=4')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat"
      }}
    >
      
      {/* CAMADA 1: OVERLAY ESCURO (Para o texto aparecer) */}
      {/* Como a imagem é background, o overlay é o primeiro filho absoluto */}
      <div className="absolute inset-0 bg-black/60 md:bg-[#1a3a52]/55 z-0" />

      {/* CAMADA 2: FADE SUAVE NO RODAPÉ */}
      {/* Apenas um toque suave na base para conectar com a próxima seção */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

      {/* CAMADA 3: CONTEÚDO (TEXTO + BOTÃO) */}
      {/* 'py-24': Garante margem interna generosa para o botão nunca colar no fundo */}
      <div className="container relative z-20 flex flex-col items-center text-center text-white space-y-8 px-4 py-24 md:py-0">
        
        <div className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="px-4 py-2 rounded-full bg-secondary/20 border border-secondary/50 text-secondary text-sm font-bold tracking-wider uppercase backdrop-blur-sm">
            Antonio Meneghetti Faculdade
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 text-white drop-shadow-lg">
          style={{
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)"
            }}
          >
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

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 pt-6">
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
