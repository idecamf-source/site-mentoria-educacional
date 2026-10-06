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
    <section
      id="pilares"
      data-hora="21:00"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-rosa)_0%,var(--color-violeta)_5rem,var(--color-violeta)_100%)] py-20 text-[#FFF8EE] md:py-28"
    >
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 max-w-6xl mx-auto">
          <div className="lg:self-start lg:pt-7">
            <h2 className="text-4xl leading-[1.02] md:text-6xl">Nossos Pilares de Atuação</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[#FFF8EE]/90 md:text-xl">
              A Mentoria Educacional atua em cinco frentes principais para garantir o seu desenvolvimento integral durante a graduação.
            </p>
          </div>

          <ul>
            {pilares.map(pilar => (
              <li key={pilar.title} className="flex gap-5 border-t border-[#FFF8EE]/20 py-7 md:gap-6 md:py-8">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ouro text-noite">
                  <pilar.icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl">{pilar.title}</h3>
                  <p className="mt-2 max-w-prose leading-relaxed text-[#FFF8EE]/85">{pilar.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
