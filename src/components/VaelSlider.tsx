
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SlideItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
}

const slides: SlideItem[] = [
  {
    id: '1',
    title: 'HUECO MUNDO',
    category: 'camera',
    imageUrl: 'https://picsum.photos/seed/slide1/1200/800',
    videoUrl: 'https://aquasaferoworks.sirv.com/1103193_1080p_Endurance_1280x720.mp4',
  },
  {
    id: '2',
    title: 'AUREATE',
    category: 'narrative',
    imageUrl: 'https://picsum.photos/seed/slide2/1200/800',
    videoUrl: 'https://aquasaferoworks.sirv.com/6013655_People_Men_1280x720.mp4',
  },
  {
    id: '3',
    title: 'NOCTURNE',
    category: 'cinematography',
    imageUrl: 'https://picsum.photos/seed/slide3/1200/800',
  },
  {
    id: '4',
    title: 'STILLWATER',
    category: 'direction',
    imageUrl: 'https://picsum.photos/seed/slide4/1200/800',
  },
];

export function VaelSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center',
      skipSnaps: false,
      duration: 35
    }, 
    [Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full bg-[#f5f5f3] py-24 md:py-32 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-8 mb-12">
        <span className="text-[10px] tracking-[0.5em] uppercase text-primary/60 block mb-2 font-medium">Portfolio Showcase</span>
        <h2 className="text-4xl md:text-7xl font-headline italic tracking-tighter">Cinematic <span className="text-primary not-italic">Vision</span></h2>
      </div>

      <div className="embla overflow-visible" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => {
            const isActive = selectedIndex === index;
            
            return (
              <div 
                key={slide.id} 
                className="embla__slide flex-[0_0_85%] md:flex-[0_0_70%] min-w-0 px-4 md:px-8 relative"
              >
                <motion.div
                  initial={false}
                  animate={{ 
                    scale: isActive ? 1 : 0.92,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="relative aspect-[21/10] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] bg-black group cursor-grab active:cursor-grabbing border border-black/5"
                >
                  {/* Background Image */}
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    className="object-cover transition-transform duration-[3s] ease-out group-hover:scale-105"
                    priority={index === 0}
                  />
                  
                  {/* Play UI if it's a video item */}
                  {slide.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/40">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 z-10" />

                  {/* Text Content */}
                  <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 z-30 pointer-events-none">
                    <motion.div
                      animate={{ 
                        y: isActive ? 0 : 30,
                        opacity: isActive ? 1 : 0 
                      }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="space-y-1 md:space-y-3"
                    >
                      <h3 className="text-4xl md:text-[7rem] font-bold leading-[0.8] tracking-tighter text-white uppercase font-body">
                        {slide.title}
                      </h3>
                      <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/50 font-medium">
                        {slide.category}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-3 mt-16">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "h-1 transition-all duration-700 rounded-full",
              selectedIndex === i ? "w-16 bg-primary" : "w-8 bg-border hover:bg-muted-foreground/30"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
