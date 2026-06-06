'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Menu, X, Shield } from 'lucide-react';

const navLinks = [
  { href: '#reel', label: 'Work Reel' },
  { href: '#awards', label: 'Honors' },
  { href: '#contact', label: 'Inquiry' },
];

export function VaelHeader() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['reel', 'awards', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const reelYoutubeId = "gJKxIAmhbvg";
  const reelUrl = `https://www.youtube.com/embed/${reelYoutubeId}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&loop=1&playlist=${reelYoutubeId}&enablejsapi=1`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 md:px-16 md:py-6 flex items-center justify-between ${isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent'}`}>
      <Link href="/" className="font-headline text-xl md:text-3xl tracking-tighter hover:text-primary transition-all duration-700 flex-shrink-0 italic font-bold">
        ERROL <span className="text-primary not-italic font-light">ADITYA</span>
      </Link>
      
      <div className="hidden md:flex items-center justify-center gap-12 font-headline text-[12px] tracking-[0.25em] uppercase italic font-bold flex-grow">
        {navLinks.map((link) => (
          <Link 
            key={link.href}
            href={link.href} 
            className={`nav-link-strike hover:text-primary transition-colors ${activeSection === link.href.substring(1) ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link href="/admin" className="hidden lg:flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mr-4">
          <Shield className="w-3 h-3" />
          Manage
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="hidden sm:flex rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground font-headline italic font-bold text-[10px] tracking-[0.2em] uppercase h-auto py-3 px-8 transition-all duration-300 transform hover:-translate-y-0.5">
              Watch Reel
            </Button>
          </DialogTrigger>
          <DialogContent className="z-[250] max-w-6xl bg-black border border-white/10 p-0 rounded-none overflow-hidden aspect-video shadow-[0_0_120px_rgba(0,0,0,1)] outline-none focus:outline-none">
            <DialogTitle className="sr-only">2026 Directing Reel</DialogTitle>
            <DialogDescription className="sr-only">Cinematic showcase of Errol Aditya's directorial work.</DialogDescription>
            <div className="w-full h-full flex items-center justify-center relative group">
              <iframe
                className="w-full h-full"
                src={reelUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              <DialogClose className="absolute top-6 right-6 z-[201] transition-all duration-300 group/close">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-none bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover/close:border-primary/50 group-hover/close:scale-110 transition-all">
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white group-hover/close:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                <span className="sr-only">Close Reel</span>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden rounded-none hover:bg-white/5 h-10 w-10">
              <Menu className="w-6 h-6 text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black/95 backdrop-blur-2xl border-l border-white/5 p-0 w-full sm:max-w-md flex flex-col rounded-none z-[300]">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">Access links to work, awards, and contact information.</SheetDescription>
            
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
              <div className="font-headline text-xl tracking-tighter italic text-white font-bold">
                ERROL <span className="text-primary not-italic font-light">ADITYA</span>
              </div>
              <SheetClose className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <X className="w-5 h-5 text-white" />
              </SheetClose>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 space-y-2">
              <nav className="flex flex-col">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                    className="border-b border-white/5"
                  >
                    <SheetClose asChild>
                      <Link 
                        href={link.href} 
                        className="flex items-center justify-between py-6 group"
                      >
                        <span className="font-headline text-2xl tracking-[0.05em] uppercase text-white/70 italic font-bold group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                        <div className="w-2 h-2 bg-primary transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                      </Link>
                    </SheetClose>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="border-b border-white/5"
                >
                  <SheetClose asChild>
                    <Link href="/admin" className="flex items-center justify-between py-6 group">
                      <span className="font-headline text-2xl tracking-[0.05em] uppercase text-white/40 italic font-bold group-hover:text-primary transition-colors">
                        Archive Manager
                      </span>
                    </Link>
                  </SheetClose>
                </motion.div>
              </nav>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="pt-12"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground font-headline italic font-bold text-[11px] tracking-[0.2em] uppercase h-auto py-5 transition-all">
                      Watch Reel
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="z-[350] w-[95vw] sm:max-w-4xl bg-black border border-white/10 p-0 rounded-none aspect-video shadow-2xl">
                    <DialogTitle className="sr-only">Director Reel</DialogTitle>
                    <DialogDescription className="sr-only">Watch the 2026 directing reel for Errol Aditya.</DialogDescription>
                    <div className="relative w-full h-full">
                       <iframe className="w-full h-full" src={reelUrl} frameBorder="0" allowFullScreen />
                       <DialogClose className="absolute top-4 right-4 bg-black/50 p-2 hover:bg-black/70 transition-colors">
                          <X className="w-5 h-5 text-white" />
                       </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </div>

            <div className="px-8 py-10 border-t border-white/5 bg-white/[0.02]">
              <div className="flex flex-col gap-6">
                <span className="text-[9px] tracking-[0.4em] uppercase text-white/40 block text-center">Social Connect</span>
                <div className="flex justify-between items-center text-[10px] tracking-[0.3em] uppercase text-white/60 font-bold italic">
                  <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                  <a href="#" className="hover:text-primary transition-colors">Vimeo</a>
                  <a href="#" className="hover:text-primary transition-colors">IMDb</a>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
