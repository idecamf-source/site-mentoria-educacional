import { Play } from "lucide-react";
import { useState } from "react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "XewIyn78g-o";

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Play className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Conheça a Mentoria
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Veja como funciona a <span className="text-primary">Mentoria Educacional</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Assista ao vídeo e descubra como a mentoria pode transformar sua jornada acadêmica
            </p>
          </div>

          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/5 backdrop-blur-sm border border-border/50">
            {/* Aspect Ratio Container */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {!isPlaying ? (
                /* Thumbnail Preview */
                <div 
                  className="absolute top-0 left-0 w-full h-full cursor-pointer group"
                  onClick={handlePlay}
                >
                  {/* YouTube Thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Thumbnail do vídeo"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-2xl">
                      <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                /* YouTube Player */
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="Mentoria Educacional Universitária"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    border: 'none',
                  }}
                />
              )}
            </div>
          </div>

          {/* Optional: Video Description */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground italic">
              Duração: 2 minutos • Conheça os benefícios e como agendar sua sessão
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
