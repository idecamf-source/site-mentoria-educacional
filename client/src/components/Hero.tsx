import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
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

        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
          <Button 
            size="lg"
            onClick={() => window.open("https://calendly.com/mentoriaeducacional/30min", "_blank")}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-8 h-14"
          >
            Agendar Mentoria
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white font-medium text-lg px-8 h-14"
          >
            Saiba Mais
          </Button>
        </div>
      </div>
    </section>
  );
}
