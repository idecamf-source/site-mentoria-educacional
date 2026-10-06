import { Play } from "lucide-react";
import { useRef, useState } from "react";

const VIDEO_SRC = "/videos/mentoria-educacional.mp4";
const VIDEO_POSTER = "/videos/mentoria-educacional-capa.jpg";

export default function VideoSection() {
  // preload="none": o vídeo (~20 MB) só é baixado depois do clique em reproduzir.
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // play() precisa ser chamado dentro do próprio clique (exigência do Safari/iOS).
  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play().catch(() => {
      // Se o navegador bloquear, os controles nativos já estão visíveis para tocar manualmente.
    });
  };

  return (
    <section data-hora="19:00" className="relative bg-damasco text-noite pt-20 pb-14 md:pt-28 md:pb-20">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 max-w-2xl md:mb-12">
            <h2 className="text-4xl leading-[1.02] md:text-6xl">
              Veja como funciona a Mentoria Educacional
            </h2>
            <p className="mt-5 text-lg md:text-xl">
              Assista ao vídeo e descubra como a mentoria pode transformar sua jornada acadêmica.
            </p>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-noite shadow-[0_30px_70px_-30px_rgb(16_29_51/0.75)]">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full bg-black"
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              title="Mentoria Educacional Universitária"
              controls={isPlaying}
              playsInline
              preload="none"
            />
            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Reproduzir vídeo: Mentoria Educacional Universitária (3 minutos)"
                className="group absolute inset-0 h-full w-full"
              >
                <img
                  src={VIDEO_POSTER}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                  width="1280"
                  height="720"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-noite/20 transition-colors duration-300 group-hover:bg-noite/5" />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 flex size-18 md:size-22 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-noite text-ouro shadow-[0_10px_30px_-6px_rgb(10_25_38/0.55)] ring-8 ring-[#FFF8EE]/30 transition-transform duration-300 ease-out group-hover:scale-105"
                >
                  <Play className="ml-1 size-8 md:size-9 fill-current" />
                </span>
              </button>
            )}
          </div>

          <p className="mt-6 text-[0.95rem] font-bold">
            Duração: 3 minutos • Conheça os benefícios e como agendar sua sessão
          </p>
        </div>
      </div>
    </section>
  );
}
