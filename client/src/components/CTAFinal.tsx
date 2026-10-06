import AgendarButton from "@/components/AgendarButton";

export default function CTAFinal() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-[#FFF8EE] md:py-36">
      {/* 22:00 → madrugada: a noite do próprio site se aprofunda até o rodapé */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-noite)_0%,var(--color-madrugada)_100%)]" />

      <div className="container text-center">
        <h2 className="mx-auto max-w-4xl text-4xl leading-[1.02] md:text-7xl">
          Pronto para impulsionar sua jornada acadêmica?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#FFF8EE]/85 md:text-xl">
          Agende agora sua sessão de mentoria e dê o próximo passo em direção ao seu sucesso pessoal e profissional.
        </p>
        <div className="mt-10">
          <AgendarButton location="cta_final" tone="ouro" />
        </div>
      </div>
    </section>
  );
}
