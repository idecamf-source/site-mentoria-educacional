import { Clock, MapPin, Mail } from "lucide-react";

export default function Footer() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Antonio+Meneghetti+Faculdade+Recanto+Maestro+RS";
  
  return (
    <>
      {/* Wave Transition */}
      <div className="relative h-24 bg-muted/30 overflow-hidden">
        <svg 
          className="absolute bottom-0 w-full h-24" 
          viewBox="0 0 1440 96" 
          preserveAspectRatio="none"
          fill="none"
        >
          <path 
            d="M0,64 C360,96 720,32 1080,64 C1260,80 1380,48 1440,64 L1440,96 L0,96 Z" 
            className="fill-primary"
          />
        </svg>
      </div>

      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Coluna 1: Sobre */}
            <div className="space-y-6">
              <picture>
                <source srcSet="/images/logo.webp" type="image/webp" />
                <img 
                  src="/images/logo.png" 
                  alt="Mentoria Educacional" 
                  className="h-16 w-auto"
                  loading="lazy"
                  width="200"
                  height="142"
                />
              </picture>
              <p className="text-white/90 text-sm leading-relaxed max-w-xs font-medium">
                Um serviço dedicado ao desenvolvimento integral dos alunos da Antonio Meneghetti Faculdade, 
                oferecendo suporte acadêmico, emocional e profissional.
              </p>
            </div>

            {/* Coluna 2: Horários */}
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-secondary">Horários de Atendimento</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Segunda a Sexta</p>
                    <p className="text-white/90 text-sm font-medium">18:00 às 22:00</p>
                    <p className="text-white/70 text-xs mt-1 font-medium">Sessões de 30 minutos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna 3: Contato */}
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-secondary">Contato e Localização</h3>
              <div className="space-y-4">
                {/* Localização com link para Google Maps */}
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <div className="relative">
                    <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5 transition-transform duration-300 group-hover:animate-[bounce-pin_0.5s_ease-in-out]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white relative inline-block">
                      Antonio Meneghetti Faculdade
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full group-hover:left-0" />
                    </p>
                    <p className="text-white/90 text-sm font-medium relative inline-block">
                      Recanto Maestro, RS
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-secondary/70 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                    </p>
                  </div>
                </a>

                {/* E-mail com link mailto */}
                <a 
                  href="mailto:patricia.dias@amf.edu.br" 
                  className="flex items-center gap-3 group"
                >
                  <div className="relative">
                    <Mail className="w-5 h-5 text-secondary shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:animate-[mail-open_0.4s_ease-in-out]" />
                  </div>
                  <span className="text-white/90 text-sm font-medium relative inline-block">
                    patricia.dias@amf.edu.br
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full group-hover:left-0" />
                  </span>
                </a>
              </div>
            </div>

          </div>

          {/* Divisor Elegante com Gradiente */}
          <div className="mt-16 pt-8 text-center text-sm text-white/70 font-medium">
            <div className="h-px mb-8 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <p>&copy; {new Date().getFullYear()} Mentoria Educacional Universitária - Antonio Meneghetti Faculdade. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
