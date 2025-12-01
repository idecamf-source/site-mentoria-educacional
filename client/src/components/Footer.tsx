import { Clock, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Coluna 1: Sobre */}
          <div className="space-y-6">
            <img 
              src="/images/logo.png" 
              alt="Mentoria Educacional" 
              className="h-16 w-auto brightness-0 invert opacity-90"
            />
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
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
                  <p className="font-medium">Segunda a Sexta</p>
                  <p className="text-primary-foreground/80 text-sm">18:00 às 22:00</p>
                  <p className="text-primary-foreground/60 text-xs mt-1">Sessões de 30 minutos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 3: Contato */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-bold text-secondary">Contato e Localização</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Antonio Meneghetti Faculdade</p>
                  <p className="text-primary-foreground/80 text-sm">Recanto Maestro, RS</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a href="mailto:mentoria@amf.edu.br" className="text-primary-foreground/80 text-sm hover:text-white transition-colors">
                  mentoria@amf.edu.br
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Mentoria Educacional Universitária - Antonio Meneghetti Faculdade. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
