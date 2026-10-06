import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

// Relógio fixo: mostra a "hora" da seção visível (18:00 → 22:00),
// acompanhando a noite que avança enquanto a página rola.
export default function RelogioNoite() {
  const [hora, setHora] = useState("18:00");

  useEffect(() => {
    const secoes = Array.from(document.querySelectorAll<HTMLElement>("[data-hora]"));
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setHora(entry.target.getAttribute("data-hora") ?? "18:00");
        }
      },
      // Conta como "visível" a seção que cruza o meio da tela.
      { rootMargin: "-50% 0px -50% 0px" }
    );
    secoes.forEach(secao => observer.observe(secao));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-noite/90 py-2 pl-3 pr-4 text-[#FFF8EE] shadow-[0_8px_24px_-10px_rgb(0_0_0/0.6)] backdrop-blur-md"
    >
      <Clock className="size-4 text-ouro" />
      <span key={hora} className="font-display text-base font-bold tabular-nums animate-in fade-in slide-in-from-bottom-1 duration-300">
        {hora}
      </span>
    </div>
  );
}
