import { AGENDAR_URL, AGENDAR_VIA_WHATSAPP } from "@/const";
import { useTracking } from "@/hooks/useTracking";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type AgendarButtonProps = {
  location: string;
  size?: "sm" | "lg";
  /** "noite": pílula azul-noite (para fundos claros). "ouro": pílula dourada (para fundos escuros). */
  tone?: "noite" | "ouro";
  className?: string;
};

const sizes = {
  sm: "h-10 pl-4 pr-3.5 text-[0.95rem] gap-1.5",
  lg: "h-14 md:h-16 pl-7 pr-6 md:pl-8 md:pr-7 text-lg md:text-xl gap-2.5",
};

const tones = {
  noite: "bg-noite text-[#FFF8EE] hover:bg-[#1b2c4a] shadow-[0_10px_24px_-12px_rgb(16_29_51/0.7)]",
  ouro: "bg-ouro text-noite hover:bg-[#f6c562] shadow-[0_10px_24px_-12px_rgb(0_0_0/0.6)]",
};

// Link real (não window.open): abre sem atraso, funciona no Safari/iOS
// e permite copiar o endereço ou abrir com o botão do meio.
export default function AgendarButton({ location, size = "lg", tone = "noite", className }: AgendarButtonProps) {
  const { track } = useTracking();

  return (
    <a
      href={AGENDAR_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("button_click", { button: "agendar_horario", location })}
      className={cn(
        "group inline-flex items-center justify-center rounded-full font-bold whitespace-nowrap",
        "transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0",
        sizes[size],
        tones[tone],
        className
      )}
    >
      {size === "sm" ? "Agendar" : "Agendar horário"}
      <ArrowUpRight
        aria-hidden="true"
        className={cn(
          "shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          size === "lg" ? "size-6" : "size-4"
        )}
      />
      <span className="sr-only">
        {AGENDAR_VIA_WHATSAPP ? "(abre o WhatsApp em nova aba)" : "(abre a agenda em nova aba)"}
      </span>
    </a>
  );
}
