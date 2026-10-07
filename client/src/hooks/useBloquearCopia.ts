import { useEffect } from "react";

// Impede copiar/recortar texto da página (Ctrl/Cmd+C, menu "Copiar").
// A seleção em si é bloqueada no CSS (user-select: none em index.css).
export function useBloquearCopia() {
  useEffect(() => {
    const bloquear = (e: ClipboardEvent) => e.preventDefault();
    document.addEventListener("copy", bloquear);
    document.addEventListener("cut", bloquear);
    return () => {
      document.removeEventListener("copy", bloquear);
      document.removeEventListener("cut", bloquear);
    };
  }, []);
}
