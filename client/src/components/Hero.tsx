import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTracking } from "@/hooks/useTracking";

export default function Hero() {
  const { track } = useTracking();

  const handleScheduleClick = () => {
    track("button_click", { button: "agendar_mentoria", location: "hero" });
    window.open("https://calendly.com/patricia-dias-amf/mentoria-educacional", "_blank");
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-bg.jpg" 
          alt="Ambiente acadêmico acolhedor" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center text-white space-y-8 px-4">
        <div className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="px-4 py-2 rounded-full bg-secondary/20 border border-secondary/50 text-secondary text-sm font-bold tracking-wider uppercase backdrop-blur-sm">
            Antonio Meneghetti Faculdade
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 text-white">
          Mentoria Educacional <span className="text-secondary">Universitária</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          Um espaço seguro e acolhedor para o seu desenvolvimento acadêmico, profissional e pessoal. 
          Supere desafios e alcance seu máximo potencial.
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
          <Button 
            size="lg"
            onClick={handleScheduleClick}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-transform font-bold text-xl px-12 h-16 shadow-2xl"
          >
            Agendar Horário
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
