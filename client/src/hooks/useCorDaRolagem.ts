import { useEffect } from "react";

// Cor da barra de rolagem por seção: [puxador, trilho].
// O trilho acompanha o fundo da seção visível; o puxador contrasta com ele.
const CORES: Record<string, [string, string]> = {
  "18:00": ["#101D33", "#F2B84B"], // ouro
  "19:00": ["#101D33", "#E98A4A"], // damasco
  "20:00": ["#FFF8EE", "#AE4A5E"], // rosa
  "21:00": ["#FFF8EE", "#5B3C74"], // violeta
  "22:00": ["#F2B84B", "#101D33"], // noite
  rodape: ["#F2B84B", "#0A1322"], // madrugada
};

// A barra de rolagem do navegador muda de cor conforme a seção que está no meio da tela.
export function useCorDaRolagem() {
  useEffect(() => {
    const raiz = document.documentElement;
    const alvos = Array.from(document.querySelectorAll<HTMLElement>("[data-hora], footer"));

    const aplicar = (chave: string) => {
      const [puxador, trilho] = CORES[chave] ?? CORES["18:00"];
      raiz.style.scrollbarColor = `${puxador} ${trilho}`;
    };

    const observer = new IntersectionObserver(
      entradas => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          const el = entrada.target as HTMLElement;
          aplicar(el.tagName === "FOOTER" ? "rodape" : el.dataset.hora ?? "18:00");
        }
      },
      // Vale a seção que cruza a linha do meio da tela.
      { rootMargin: "-50% 0px -50% 0px" }
    );

    alvos.forEach(alvo => observer.observe(alvo));
    return () => {
      observer.disconnect();
      raiz.style.scrollbarColor = "";
    };
  }, []);
}
