import { Clock, MapPin, Mail } from "lucide-react";

const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Antonio+Meneghetti+Faculdade+Recanto+Maestro+RS";

const linkClass =
  "underline decoration-[#FFF8EE]/30 decoration-1 underline-offset-4 transition-colors hover:decoration-ouro hover:text-[#FFF8EE]";

export default function Footer() {
  return (
    <footer className="bg-madrugada py-16 text-[#FFF8EE]/85">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="inline-flex rounded-2xl bg-[#FFF8EE] px-4 py-3">
              <img src="/images/logo-mentoria.webp" alt="Mentoria Educacional Universitária" className="h-14 w-auto" loading="lazy" width="716" height="394" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed">
              Um serviço dedicado ao desenvolvimento integral dos alunos da Antonio Meneghetti Faculdade,
              oferecendo suporte acadêmico, emocional e profissional.
            </p>
          </div>

          <div>
            <h3 className="text-lg text-[#FFF8EE]">Horários de Atendimento</h3>
            <p className="mt-4 flex gap-3 text-sm leading-relaxed">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ouro" />
              <span>
                <strong className="text-[#FFF8EE]">Segunda, quarta e quinta</strong>
                <br />
                Horários das 18:30 às 22:00
                <br />
                Sessões de 30 minutos
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-lg text-[#FFF8EE]">Contato e Localização</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ouro" />
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Antonio Meneghetti Faculdade, Recanto Maestro, RS
                </a>
              </li>
              <li className="flex gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ouro" />
                <a href="mailto:patricia.dias@amf.edu.br" className={linkClass}>
                  patricia.dias@amf.edu.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-[#FFF8EE]/10 pt-6 text-center text-xs text-[#FFF8EE]/60">
          &copy; {new Date().getFullYear()} Mentoria Educacional Universitária - Antonio Meneghetti Faculdade. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
