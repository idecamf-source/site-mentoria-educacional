import { AGENDAR_VIA_WHATSAPP } from "@/const";
import { Info } from "lucide-react";

const diasSemana = ["Segunda-feira", "Quarta-feira", "Quinta-feira"];

// Horários de início das sessões de 30 minutos, iguais nos três dias.
const encaixes = ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

// A cor de cada horário acompanha a noite: do dourado ao violeta.
const corEncaixe = ["#F2B84B", "#EFA449", "#E98A4A", "#D16A50", "#AE4A5E", "#934466", "#77406C", "#5B3C74"];

const ondeAgendar = AGENDAR_VIA_WHATSAPP ? "pelo WhatsApp" : "através do Calendly";

export default function Disponibilidade() {
  return (
    <section
      id="disponibilidade"
      data-hora="20:00"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-damasco)_0%,var(--color-rosa)_5rem,var(--color-rosa)_100%)] py-20 text-[#FFF8EE] md:py-28"
    >
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 max-w-6xl mx-auto">
          <div>
            <h2 className="text-4xl leading-[1.02] md:text-6xl">Horários de Atendimento</h2>
            <p className="mt-5 text-lg leading-relaxed md:text-xl">
              A Mentoria Educacional atende às segundas, quartas e quintas-feiras, com horários das 18:30 às 22:00
              e sessões de 30 minutos. Agende seu horário {ondeAgendar}.
            </p>
            <div className="mt-8 flex gap-3 text-[0.95rem]">
              <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              <p>
                <strong>Importante:</strong> os horários podem sofrer alterações devido a compromissos da mentora.
                Confirme a disponibilidade {ondeAgendar} antes de agendar.
              </p>
            </div>
          </div>

          {/* Grade da semana: cada linha é uma noite, cada bloco é uma sessão de 30 minutos */}
          <div className="self-start rounded-[1.75rem] bg-noite/88 p-5 shadow-[0_30px_70px_-30px_rgb(10_19_34/0.8)] md:p-8">
            <ul className="space-y-5">
              {diasSemana.map(dia => (
                <li key={dia}>
                  <h3 className="flex items-baseline justify-between text-lg">
                    {dia}
                    <span className="font-sans text-sm font-normal tabular-nums text-[#FFF8EE]/70">18:30–22:00</span>
                  </h3>
                  <ul aria-label={`Horários de ${dia}`} className="mt-2.5 grid grid-cols-4 gap-1.5 sm:grid-cols-8">
                    {encaixes.map((hora, i) => (
                      <li
                        key={hora}
                        className={`flex h-9 items-center justify-center rounded-md text-[0.8rem] font-bold tabular-nums ${i < 4 ? "text-noite" : "text-[#FFF8EE]"}`}
                        style={{ background: corEncaixe[i] }}
                      >
                        {hora}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center justify-between border-t border-[#FFF8EE]/15 pt-4 text-sm">
              <span className="font-bold text-ouro">Sessões de 30 minutos</span>
              <span className="tabular-nums text-[#FFF8EE]/70">8 horários por noite</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
