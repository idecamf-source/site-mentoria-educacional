import { GlowButton } from "@/components/ui/glow-button";
import { ArrowRight } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

export default function Hero() {
  const { track } = useTracking();

  return (
    // ESTRUTURA NOVA (A MUDANÇA CRUCIAL):
    // Mobile (padrão): 'h-auto block pt-32 pb-24'.
    // - Não usamos mais flex center vertical no mobile.
    // - 'pt-32': Empurra o conteúdo para baixo (dando ar no topo).
    // - 'pb-24': Garante um espaço enorme abaixo do botão, obrigando a seção a crescer.
    // Desktop (md:): Mantém o layout centralizado e alto que já funciona ('md:min-h-[85vh] md:flex ... md:py-0').
    <section className="relative w-full h-auto block pt-32 pb-24 md:min-h-[85vh] md:flex md:flex-col md:justify-center md:py-0 overflow-hidden bg-[#1a3a52]">

      {/* CAMADA DE FUNDO (IMAGEM + OVERLAYS) - Fica inalterada pois já está correta */}
      <div className="absolute inset-0 w-full h-full z-0">
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

        {/* Overlay escuro para leitura */}
        <div className="absolute inset-0 bg-black/60 md:bg-[#1a3a52]/50" />

        {/* FADE DE TRANSIÇÃO (O único necessário) */}
        {/* Fica na borda inferior absoluta da seção. Como a seção agora cresce com o padding, ele sempre estará abaixo do botão. */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      {/* CONTEÚDO (TEXTO + BOTÃO) */}
      {/* Removemos o padding extra daqui no mobile, pois já está no container pai */}
      <div className="container relative z-20 flex flex-col items-center text-center text-white space-y-8 px-4">

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
