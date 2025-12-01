import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, GraduationCap, Heart, Users, Briefcase } from "lucide-react";

const pilares = [
  {
    title: "Apoio nas Dificuldades de Aprendizagem",
    description: "Desenvolvimento de estratégias personalizadas para auxiliar você a superar desafios acadêmicos e alcançar seu máximo potencial.",
    icon: Brain,
  },
  {
    title: "Apoio ao Bem Estar Emocional",
    description: "Um ambiente seguro e acolhedor para discutir questões emocionais, como ansiedade, estresse e outros desafios relacionados à saúde mental.",
    icon: Heart,
  },
  {
    title: "Acessibilidade e Inclusão",
    description: "Acesso igualitário a todos os alunos, oferecendo oportunidades, recursos e adaptações necessárias para atender às diversas necessidades.",
    icon: Users,
  },
  {
    title: "Orientação Profissional",
    description: "Auxílio individual e sigiloso na definição de objetivos profissionais e no desenvolvimento de um plano de carreira estruturado.",
    icon: Briefcase,
  },
  {
    title: "Desenvolvimento de Relações Interpessoais",
    description: "Suporte para o desenvolvimento de habilidades de comunicação e interação, promovendo relações saudáveis e produtivas.",
    icon: GraduationCap,
  },
];

export default function Pilares() {
  return (
    <section id="pilares" className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Pilares de Atuação</h2>
          <p className="text-muted-foreground text-lg">
            A Mentoria Educacional atua em cinco frentes principais para garantir o seu desenvolvimento integral durante a graduação.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {pilares.map((pilar, index) => (
            <Card key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card group">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <pilar.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                  {pilar.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {pilar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
