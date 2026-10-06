const formacao = [
  "Doutoranda em Educação em Ciências: Química da Vida e Saúde (UFSM)",
  "Mestrado em Ensino de Ciências (UNIPAMPA)",
  "Especialização em Gestão Educacional (UFSM)",
  "Bacharelanda em Ontopsicologia (AMF)",
];

const atuacao = [
  "Professora no Curso de Licenciatura em Pedagogia (AMF)",
  "Professora FOIL (AMF)",
  "Orientadora Educacional e Gestora Escolar",
];

function Lista({ titulo, itens }: { titulo: string; itens: string[] }) {
  return (
    <div>
      <h3 className="text-xl text-ouro">{titulo}</h3>
      <ul className="mt-4 space-y-3">
        {itens.map(item => (
          <li key={item} className="flex gap-3 leading-snug text-[#FFF8EE]/85">
            <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-ouro" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Mentora() {
  return (
    <section
      id="mentora"
      data-hora="22:00"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-violeta)_0%,var(--color-noite)_5rem,var(--color-noite)_100%)] py-20 text-[#FFF8EE] md:py-28"
    >
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 max-w-6xl mx-auto lg:pt-8">
          <div>
            <h2 className="text-4xl leading-[1.02] md:text-6xl">Prof. Patrícia da Silva Dias</h2>
            <p className="mt-5 font-display text-2xl font-bold text-ouro md:text-3xl">15+ anos de experiência em educação</p>
          </div>

          <div>
            <p className="max-w-[56ch] text-lg leading-relaxed text-[#FFF8EE]/90 md:text-xl">
              Coordenadora Psicopedagógica do Serviço de Mentoria Educacional Universitária da Antonio Meneghetti Faculdade.
              Dedicada a transformar a jornada acadêmica dos alunos através de um acompanhamento humanizado e estratégico.
            </p>

            <div className="mt-10 grid gap-10 border-t border-[#FFF8EE]/15 pt-8 md:grid-cols-2">
              <Lista titulo="Formação Acadêmica" itens={formacao} />
              <Lista titulo="Atuação Profissional" itens={atuacao} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
