import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";

const diasSemana = [
  { dia: "Segunda-feira", horarios: "18:00 - 22:00" },
  { dia: "Terça-feira", horarios: "18:00 - 22:00" },
  { dia: "Quarta-feira", horarios: "18:00 - 22:00" },
  { dia: "Quinta-feira", horarios: "18:00 - 22:00" },
  { dia: "Sexta-feira", horarios: "18:00 - 22:00" },
];

export default function Disponibilidade() {
  return (
    <section id="disponibilidade" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Horários de Atendimento
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A Mentoria Educacional está disponível de segunda a sexta-feira, entre as 18:00 e 22:00, 
            com sessões de 30 minutos. Agende seu horário através do Calendly.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
          {diasSemana.map((item, index) => (
            <Card 
              key={index}
              className="group w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[220px] 
                         transition-all duration-300 hover:-translate-y-2 
                         border-2 border-transparent hover:border-secondary
                         shadow-md hover:shadow-xl hover:shadow-secondary/20"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-secondary/20 transition-colors duration-300">
                    <Calendar className="h-6 w-6 text-primary group-hover:text-secondary transition-colors duration-300 
                                         group-hover:animate-[tilt_0.3s_ease-in-out]" />
                  </div>
                </div>
                <CardTitle className="text-center text-lg font-bold text-primary group-hover:text-secondary transition-colors duration-300">
                  {item.dia}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{item.horarios}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Sessões de 30 minutos
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block p-6 bg-secondary/10 rounded-lg border-2 border-secondary/30">
            <p className="text-sm text-muted-foreground mb-2">
              <strong className="text-primary">Importante:</strong> Os horários podem sofrer alterações devido a compromissos da mentora.
            </p>
            <p className="text-sm text-muted-foreground">
              Sempre verifique a disponibilidade atualizada no Calendly antes de agendar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
