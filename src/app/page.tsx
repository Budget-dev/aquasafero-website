import { VaelHeader } from '@/components/VaelHeader';
import { VaelAbout } from '@/components/VaelAbout';
import { VaelFilms } from '@/components/VaelFilms';
import { VaelReel } from '@/components/VaelReel';
import { VaelAwards } from '@/components/VaelAwards';
import { VaelContact } from '@/components/VaelContact';
import { VaelFooter } from '@/components/VaelFooter';
import ScrollExpandMedia from '@/components/ScrollExpandMedia';

export default function Home() {
  const heroBg = "https://picsum.photos/seed/vael-hero/1920/1080";
  // Using a direct MP4 source for the hero as requested (no YouTube)
  const heroVideo = "https://player.vimeo.com/external/494252666.hd.mp4?s=2f5577346418342774d009fa5d60893325c8991b&profile_id=175";
  
  return (
    <main className="relative selection:bg-primary/30">
      <VaelHeader />
      
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={heroVideo}
        bgImageSrc={heroBg}
        title="Architecture of Emotion"
        date="2026 Directing Reel"
        scrollToExpand="Scroll to Experience"
        textBlend={false}
      >
        <VaelAbout />
        <VaelFilms />
        <VaelReel />
        <VaelAwards />
        <VaelContact />
        <VaelFooter />
      </ScrollExpandMedia>
      
      {/* Background grain consistent through the site */}
      <div className="fixed inset-0 pointer-events-none grain-overlay z-[200] opacity-5" />
    </main>
  );
}
