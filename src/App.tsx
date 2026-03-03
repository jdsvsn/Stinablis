/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1, force3D: true });
      gsap.to(followerRef.current, { x: e.clientX - 10, y: e.clientY - 10, duration: 0.25, force3D: true });
    };

    const handleHover = () => {
      gsap.to(cursorRef.current, { scale: 2.5, backgroundColor: 'var(--color-primary)', force3D: true });
      gsap.to(followerRef.current, { scale: 1.5, opacity: 0, force3D: true });
    };

    const handleLeave = () => {
      gsap.to(cursorRef.current, { scale: 1, backgroundColor: 'rgba(223, 241, 34, 0.6)', force3D: true });
      gsap.to(followerRef.current, { scale: 1, opacity: 1, force3D: true });
    };

    window.addEventListener('mousemove', moveCursor);
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, .cursor-pointer');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
      gsap.killTweensOf([cursorRef.current, followerRef.current]);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block gpu-accelerated" />
      <div ref={followerRef} className="custom-cursor-follower hidden md:block gpu-accelerated" />
    </>
  );
}

function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, { yPercent: -100, duration: 1, ease: 'expo.inOut', onComplete, force3D: true });
      }
    });

    tl.fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', force3D: true })
      .to(progressRef.current, { width: '100%', duration: 2, ease: 'power4.inOut', force3D: true })
      .to(textRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power3.in', force3D: true });

    return () => {
      tl.kill();
      gsap.killTweensOf([containerRef.current, progressRef.current, textRef.current]);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{ backgroundColor: '#000000', willChange: 'transform' }}>
      <div ref={textRef} className="mb-8 font-display font-bold text-2xl tracking-widest uppercase" style={{ color: 'var(--color-accent)', willChange: 'transform, opacity' }}>
        Welcome to Stinablis
      </div>
      <div className="w-64 h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
        <div ref={progressRef} className="h-full" style={{ width: '0%', backgroundColor: 'var(--color-accent)', boxShadow: '0 0 15px color-mix(in srgb, var(--color-accent) 80%, transparent)', willChange: 'width' }} />
      </div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
