'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const handleWheel = (e: any) => {
      // If we are at the top and scrolling up, contract the media
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 10) {
        setMediaFullyExpanded(false);
        e.preventDefault();
        return;
      }
      
      // If we haven't expanded yet, intercept scroll to progress the expansion
      if (!mediaFullyExpanded) {
        e.preventDefault();
        const delta = e.deltaY * 0.001;
        const next = Math.min(Math.max(scrollProgress + delta, 0), 1);
        setScrollProgress(next);

        if (next >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (next < 0.8) {
          setShowContent(false);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scrollProgress, mediaFullyExpanded]);

  // Touch handling for mobile expansion
  useEffect(() => {
     const handleTouchStart = (e: any) => setTouchStartY(e.touches[0].clientY);
     const handleTouchMove = (e: any) => {
        if (mediaFullyExpanded) return;
        
        const currentY = e.touches[0].clientY;
        const delta = (touchStartY - currentY) * 0.002;
        const next = Math.min(Math.max(scrollProgress + delta, 0), 1);
        
        // Prevent default only if we are still in the expansion phase
        if (next > 0 && next < 1) {
          e.preventDefault();
        }

        setScrollProgress(next);
        if (next >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        }
        setTouchStartY(currentY);
     };

     window.addEventListener('touchstart', handleTouchStart, { passive: false });
     window.addEventListener('touchmove', handleTouchMove, { passive: false });
     return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
     };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 600 : 1200);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 300 : 500);
  const textTranslateX = scrollProgress * (isMobileState ? 200 : 400);

  const titleWords = title ? title.split(' ') : [];
  const firstPart = titleWords.slice(0, 1).join(' ');
  const secondPart = titleWords.slice(1).join(' ');

  return (
    <div ref={sectionRef} className="bg-background relative">
      <section className="relative min-h-screen overflow-hidden flex flex-col items-center">
        {/* Cinematic Background Layer */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: 1 - scrollProgress }}
        >
          <Image
            src={bgImageSrc}
            alt="Cinematic background"
            fill
            className="object-cover grayscale opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-background/20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40" />
        </motion.div>

        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Immersive Center Area */}
          <div className="h-screen w-full flex flex-col items-center justify-center relative">
            
            {/* Expanding Media Box */}
            <motion.div
              className="absolute z-10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.1)] bg-black"
              style={{
                width: mediaWidth,
                height: mediaHeight,
                maxWidth: '100vw',
                maxHeight: '100vh',
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            >
              {mediaType === 'video' ? (
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
                />
              ) : (
                <Image src={mediaSrc} alt="Film highlight" fill className="object-cover grayscale brightness-90" />
              )}
              {/* Subtle brand tint inside box */}
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            </motion.div>

            {/* Cinematic Typography Layer */}
            <div className={cn(
              "relative z-20 flex flex-col items-center text-center px-4 w-full",
              textBlend ? "mix-blend-difference" : ""
            )}>
              <motion.div
                className="flex flex-col items-center justify-center gap-0 md:gap-2"
                style={{ y: -scrollProgress * 100 }}
              >
                <motion.h1 
                  className="font-headline text-[clamp(2.5rem,12vw,9rem)] leading-[0.85] italic text-foreground tracking-tighter"
                  style={{ x: -textTranslateX }}
                >
                  {firstPart}
                </motion.h1>
                <motion.h1 
                  className="font-headline text-[clamp(2.5rem,12vw,9rem)] leading-[0.85] text-primary tracking-tighter"
                  style={{ x: textTranslateX }}
                >
                  {secondPart}
                </motion.h1>
              </motion.div>

              <div className="mt-16 md:mt-24 space-y-4">
                <motion.p 
                  className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-primary font-bold"
                  style={{ opacity: 1 - scrollProgress * 3 }}
                >
                  {date}
                </motion.p>
                <motion.p 
                  className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground"
                  style={{ opacity: 1 - scrollProgress * 3 }}
                >
                  {scrollToExpand}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Revealed Portfolio Content */}
          <AnimatePresence>
            {mediaFullyExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full relative z-30 bg-background"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Scroll indicator for hero interaction */}
      {!mediaFullyExpanded && (
        <motion.div 
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
           <div className="w-[1px] h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
           </div>
        </motion.div>
      )}
    </div>
  );
};

export default ScrollExpandMedia;
