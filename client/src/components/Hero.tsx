import AgendarButton from "@/components/AgendarButton";
import { Clock } from "lucide-react";

export default function Hero() {
  return (
    <section
      data-hora="18:00"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-ouro)_0%,var(--color-ouro)_55%,var(--color-damasco)_100%)] text-noite"
    >
      <div className="container grid items-end gap-10 pt-8 md:pt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 lg:pt-6">
        <div className="pb-6 lg:pb-12 lg:pt-2">

          {/* Símbolo da Mentoria em azul-noite (versão de uma cor: a figura dourada sumiria no fundo dourado).
              Centralizado no celular, alinhado ao título no computador. */}
          <div className="mb-5 flex justify-center lg:justify-start">
            <img
              src="/images/logo-simbolo-noite.webp"
              alt="Símbolo da Mentoria Educacional Universitária"
              width="207"
              height="400"
              className="h-16 w-auto lg:h-20"
            />
          </div>

          <h1 className="text-[clamp(2.9rem,5.6vw,5.25rem)] leading-[0.95]">
            Mentoria Educacional Universitária
          </h1>

          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed md:text-xl">
            Um espaço seguro e acolhedor para o seu desenvolvimento acadêmico, profissional e pessoal.
            Supere desafios e alcance seu máximo potencial.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <AgendarButton location="hero" />
            <a
              href="#disponibilidade"
              className="font-bold underline decoration-2 underline-offset-[6px] decoration-noite/40 transition-colors hover:decoration-noite"
            >
              Ver horários
            </a>
          </div>

          <p className="mt-6 flex items-start gap-2 text-[0.95rem] text-noite/85">
            <Clock aria-hidden="true" className="mt-[0.2em] size-4 shrink-0" />
            <span>
              <strong className="text-noite">Segunda, quarta e quinta</strong> · 18:30 às 22:00 · sessões de 30 minutos
            </span>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] lg:mr-0 lg:max-w-none lg:w-auto">
          <img
            src="/images/mentora-patricia-perfil.webp"
            alt="Prof. Patrícia da Silva Dias, mentora do serviço"
            width="853"
            height="1280"
            fetchPriority="high"
            className="aspect-[4/5] w-full rounded-t-full object-cover object-[50%_18%] shadow-[0_-20px_60px_-30px_rgb(16_29_51/0.45)] lg:h-[min(36rem,calc(100svh-9.5rem))] lg:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
