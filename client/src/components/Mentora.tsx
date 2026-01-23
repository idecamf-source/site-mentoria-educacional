export default function Mentora() {
  return (
    <section id="mentora" className="py-24 bg-background overflow-hidden content-auto">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Imagem da Mentora */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-secondary/20 rounded-2xl transform translate-x-4 translate-y-4" />
              <img
                src="/images/mentora-patricia-v2.webp"
                alt="Prof. Patrícia da Silva Dias"
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl z-10 bg-white"
                loading="lazy"
              />

              {/* Card Flutuante com Shimmer */}
              <div className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-xl shadow-xl max-w-[200px] hidden md:block border border-gray-100 overflow-hidden group">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

                <p className="text-4xl font-serif font-bold text-primary mb-1 relative z-10">15+</p>
                <p className="text-sm text-muted-foreground font-medium relative z-10">Anos de experiência em educação</p>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Conheça a Mentora
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prof. Patrícia da Silva Dias
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Coordenadora Psicopedagógica do Serviço de Mentoria Educacional Universitária da Antonio Meneghetti Faculdade.
                Dedicada a transformar a jornada acadêmica dos alunos através de um acompanhamento humanizado e estratégico.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary border-b border-gray-100 pb-2">Formação Acadêmica</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span>Doutoranda em Educação em Ciências: Química da Vida e Saúde (UFSM)</span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span>Mestrado em Ensino de Ciências (UNIPAMPA)</span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span>Especialização em Gestão Educacional (UFSM)</span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span>Bacharelanda em Ontopsicologia (AMF)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary border-b border-gray-100 pb-2">Atuação Profissional</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span>Professora no Curso de Licenciatura em Pedagogia (AMF)</span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span>Professora FOIL (AMF)</span>
                </li>
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span>Orientadora Educacional e Gestora Escolar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
