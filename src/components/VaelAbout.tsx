import VideoPlayer from '@/components/VideoPlayer';

export function VaelAbout() {
  return (
    <section id="about" className="py-32 md:py-48 px-8 md:px-16 bg-gradient-to-b from-background via-card to-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative w-full">
          <VideoPlayer src="https://player.vimeo.com/external/494252666.hd.mp4?s=2f5577346418342774d009fa5d60893325c8991b&profile_id=175" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-primary/20 -z-10" />
          <div className="absolute top-10 right-[-10px] writing-vertical-rl text-[10px] tracking-[0.5em] text-primary/40 uppercase">
            Est. 2010
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.5em] uppercase text-primary/60 block">The Narrative</span>
            <h2 className="text-4xl md:text-6xl font-headline leading-tight italic">
              Where <span className="text-primary not-italic">silence</span> <br /> speaks loudest.
            </h2>
            <p className="text-muted-foreground leading-relaxed font-body text-base md:text-lg">
              With over a decade behind the lens, Errol Aditya has carved a singular language in world cinema — intimate yet epic, quiet yet thunderous. From global festivals to commercial excellence, the work speaks before any word is said.
            </p>
            <p className="text-muted-foreground leading-relaxed font-body text-sm md:text-base">
              Rooted in the belief that every frame holds a heartbeat, Errol collaborates with ambitious brands, studios, and storytellers to create images that endure beyond the screen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}