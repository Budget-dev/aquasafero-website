import Image from 'next/image';

const reelItems = [
  { id: 1, color: 'bg-primary/20', seed: 'film1' },
  { id: 2, color: 'bg-accent/20', seed: 'film2' },
  { id: 3, color: 'bg-secondary/20', seed: 'film3' },
  { id: 4, color: 'bg-muted/20', seed: 'film4' },
  { id: 5, color: 'bg-primary/10', seed: 'film5' },
  { id: 6, color: 'bg-accent/10', seed: 'onset' },
  { id: 7, color: 'bg-secondary/10', seed: 'portrait' },
  { id: 8, color: 'bg-muted/10', seed: 'vael-hero' },
];

export function VaelReel() {
  return (
    <section id="reel" className="py-24 bg-card overflow-hidden">
      <div className="px-8 md:px-16 mb-12">
         <span className="text-[10px] tracking-[0.5em] uppercase text-primary/60 block">Kinetic Work Reel — 2024</span>
      </div>
      
      <div className="flex w-full group overflow-hidden">
        <div className="flex gap-4 min-w-full animate-marquee hover:[animation-play-state:paused]">
          {[...reelItems, ...reelItems].map((item, i) => (
            <div 
              key={`${item.id}-${i}`} 
              className="relative w-[300px] md:w-[480px] aspect-video flex-shrink-0 bg-background overflow-hidden cursor-crosshair group/item"
            >
              <Image 
                src={`https://picsum.photos/seed/${item.seed}/800/450`}
                alt="Reel item"
                fill
                className="object-cover opacity-60 group-hover/item:opacity-100 group-hover/item:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 text-[9px] font-body text-white/30 tracking-widest uppercase">
                Scene 00{item.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
