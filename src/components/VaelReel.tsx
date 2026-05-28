'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

interface VideoItem {
  id: string;
  title: string;
  category: string;
}

interface VideoCardProps {
  video: VideoItem;
  aspectRatio: string;
  className?: string;
  onClick: (video: VideoItem) => void;
}

const VideoCard = ({ video, aspectRatio, className = "", onClick }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Chrome-less YouTube embed with autoplay, mute, and loop for the grid preview
  const getPreviewUrl = (id: string) => {
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&loop=1&playlist=${id}&enablejsapi=1`;
  };

  return (
    <motion.div
      className={`relative overflow-hidden bg-black border border-white/5 group cursor-pointer ${aspectRatio} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(video)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 z-0">
        <iframe
          className={`w-full h-full scale-[1.3] transition-transform duration-1000 ease-out ${isHovered ? 'scale-[1.4]' : ''}`}
          src={getPreviewUrl(video.id)}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10" />
      <div className="absolute inset-0 cinematic-vignette opacity-50 z-10" />
      
      {/* Play Icon Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-primary/40 bg-black/20 backdrop-blur-md flex items-center justify-center">
          <Play className="w-5 h-5 md:w-6 md:h-6 text-primary fill-primary" />
        </div>
      </div>
      
      {/* Animated Border on Hover - Cinematic Yellow */}
      <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
    </motion.div>
  );
};

export function VaelReel() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const videos: Record<string, VideoItem> = {
    h1: { id: "gJKxIAmhbvg", title: "Hawthorn", category: "Narrative" },
    h2: { id: "QdEZtNyJb5g", title: "Vermilion", category: "Short Film" },
    h3: { id: "O1p-JVaAQV0", title: "Nocturne", category: "Documentary" },
    h4: { id: "xTrPSfbWa0w", title: "Aureate", category: "Commissioned" },
    f1: { id: "4UATuJFYKfg", title: "Stillwater", category: "Feature" },
    m1: { id: "sroIT5FQMqs", title: "Echoes", category: "Experimental" },
    m2: { id: "BYhQMzGxHmg", title: "Prism", category: "Brand Story" },
    v1: { id: "eFhx307ykrk", title: "Solace", category: "Documentary" },
    v2: { id: "lya8BHX-8SY", title: "Kinetic", category: "Fashion" },
    v3: { id: "4UATuJFYKfg", title: "Stillwater (Vert)", category: "Feature" },
    v4: { id: "gJKxIAmhbvg", title: "Hawthorn (Vert)", category: "Narrative" },
  };

  const getFullUrl = (id: string) => {
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0`;
  };

  return (
    <section id="reel" className="py-24 md:py-32 bg-background overflow-hidden border-t border-border/10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 space-y-4 md:space-y-8">
        
        {/* Row 1: 2 Horizontal Cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          <VideoCard video={videos.h1} aspectRatio="aspect-video" onClick={setSelectedVideo} />
          <VideoCard video={videos.h2} aspectRatio="aspect-video" onClick={setSelectedVideo} />
        </div>

        {/* Row 2: 2 Horizontal Cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          <VideoCard video={videos.h3} aspectRatio="aspect-video" onClick={setSelectedVideo} />
          <VideoCard video={videos.h4} aspectRatio="aspect-video" onClick={setSelectedVideo} />
        </div>

        {/* Row 3: 1 Large Featured Section */}
        <div className="w-full">
          <VideoCard video={videos.f1} aspectRatio="aspect-[21/9] aspect-video" onClick={setSelectedVideo} />
        </div>

        {/* Row 4: 2 Medium Horizontal Cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          <VideoCard video={videos.m1} aspectRatio="aspect-[16/10]" onClick={setSelectedVideo} />
          <VideoCard video={videos.m2} aspectRatio="aspect-[16/10]" onClick={setSelectedVideo} />
        </div>

        {/* Row 5: 4 Vertical Reel-Style Cards */}
        <div className="grid grid-cols-4 gap-2 md:gap-8">
          <VideoCard video={videos.v1} aspectRatio="aspect-[9/16]" onClick={setSelectedVideo} />
          <VideoCard video={videos.v2} aspectRatio="aspect-[9/16]" onClick={setSelectedVideo} />
          <VideoCard video={videos.v3} aspectRatio="aspect-[9/16]" onClick={setSelectedVideo} />
          <VideoCard video={videos.v4} aspectRatio="aspect-[9/16]" onClick={setSelectedVideo} />
        </div>
        
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-[85vw] bg-black/95 backdrop-blur-2xl border-white/5 p-0 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] rounded-none aspect-video flex flex-col items-center justify-center">
          <DialogTitle className="sr-only">
            {selectedVideo?.title} — {selectedVideo?.category}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Viewing {selectedVideo?.title} directed by Errol Aditya.
          </DialogDescription>
          
          <AnimatePresence>
            {selectedVideo && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <iframe
                  className="w-full h-full"
                  src={getFullUrl(selectedVideo.id)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                <div className="absolute top-6 left-6 z-[70] pointer-events-none">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] tracking-[0.4em] text-primary uppercase font-bold">{selectedVideo.category}</span>
                      <span className="text-xl md:text-2xl tracking-[0.1em] text-white italic font-headline">{selectedVideo.title}</span>
                   </div>
                </div>

                <DialogClose className="absolute top-6 right-6 z-[70] text-white/30 hover:text-white transition-all duration-300 hover:rotate-90">
                  <X className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
                  <span className="sr-only">Close Player</span>
                </DialogClose>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}