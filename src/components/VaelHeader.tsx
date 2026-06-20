'use client';

import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  'all',
  'celebrity',
  'ads',
  'promo',
  'humor',
  'cricketers',
  'vfx',
  'home&living',
  'car',
  'food'
];

export function VaelHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeCategory = searchParams.get('category') || 'all';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    if (cat !== 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const reelYoutubeId = "gJKxIAmhbvg";
  const reelUrl = `https://www.youtube.com/embed/${reelYoutubeId}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&loop=1&playlist=${reelYoutubeId}&enablejsapi=1`;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500">
      <nav className={cn(
        "transition-all duration-500 px-6 py-4 md:px-16 md:py-6 flex items-center justify-between",
        isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent'
      )}>
        {/* Left Side: Empty for Symmetry */}
        <div className="hidden md:flex flex-1" />

        {/* Center: Logo */}
        <div className="flex-none text-center">
          <Link href="/" className="font-headline text-xl md:text-3xl tracking-tighter hover:text-primary transition-all duration-700 italic font-bold uppercase">
            ERROL <span className="text-primary not-italic font-light">ADITYA</span>
          </Link>
        </div>
        
        {/* Right Side: Watch Reel Button */}
        <div className="flex flex-1 items-center justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground font-headline italic font-bold text-[10px] tracking-[0.2em] uppercase h-auto py-3 px-8">
                Watch Reel
              </Button>
            </DialogTrigger>
            <DialogContent className="z-[250] max-w-6xl bg-black border border-white/10 p-0 rounded-none overflow-hidden aspect-video outline-none">
              <DialogTitle className="sr-only">2026 Directing Reel</DialogTitle>
              <DialogDescription className="sr-only">Showcase of directorial works.</DialogDescription>
              <iframe className="w-full h-full" src={reelUrl} frameBorder="0" allow="autoplay; encrypted-media" />
              <DialogClose className="absolute top-6 right-6">
                <div className="w-10 h-10 bg-black/40 border border-white/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-white" />
                </div>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <div className={cn(
        "bg-black/80 backdrop-blur-md border-b border-white/5 transition-all duration-500 overflow-hidden",
        isScrolled ? "h-12" : "h-0 md:h-12"
      )}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 h-full flex items-center overflow-x-auto no-scrollbar gap-8 md:gap-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "relative text-[9px] md:text-[11px] tracking-[0.25em] uppercase whitespace-nowrap transition-all duration-300 font-body py-1",
                activeCategory === cat ? "text-primary font-bold" : "text-muted-foreground hover:text-white"
              )}
            >
              {cat.replace('&', ' & ')}
              {activeCategory === cat && (
                <motion.div layoutId="activeCategory" className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
