import AgendarButton from "@/components/AgendarButton";

const links = [
  { href: "#disponibilidade", label: "Disponibilidade" },
  { href: "#pilares", label: "Pilares" },
  { href: "#mentora", label: "Conheça a Mentora" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-noite/92 text-[#FFF8EE] backdrop-blur-md">
      <nav aria-label="Principal" className="container flex h-16 items-center justify-between gap-4">
        <a href="#" className="flex flex-col leading-none" aria-label="Mentoria Educacional Universitária, voltar ao início">
          <span className="font-display text-lg font-bold tracking-tight">Mentoria Educacional</span>
          <span className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ouro">Universitária · AMF</span>
        </a>

        <div className="flex items-center gap-7">
          <ul className="hidden items-center gap-7 md:flex">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.95rem] font-bold text-[#FFF8EE]/80 underline-offset-[7px] decoration-ouro decoration-2 transition-colors hover:text-[#FFF8EE] hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <AgendarButton location="navbar" size="sm" tone="ouro" />
        </div>
      </nav>
    </header>
  );
}
