import { Button } from "@/components/ui/button";
import { Link } from "wouter";


export default function Navbar() {


  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <picture>
              <source srcSet="/images/logo.webp" type="image/webp" />
              <img
                src="/images/logo.png"
                alt="Mentoria Educacional Universitária"
                className="h-12 w-auto object-contain cursor-pointer"
                width="150"
                height="48"
              />
            </picture>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("disponibilidade")}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Disponibilidade
          </button>
          <button
            onClick={() => scrollToSection("pilares")}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Pilares
          </button>
          <button
            onClick={() => scrollToSection("mentora")}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Conheça a Mentora
          </button>

          <Button
            onClick={() => window.open("https://calendly.com/patricia-dias-amf/mentoria-educacional", "_blank")}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
          >
            Agendar Horário
          </Button>
        </div>
      </div>
    </nav>
  );
}
