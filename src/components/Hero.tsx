import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const interactiveTextRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const accent1Ref = useRef<HTMLDivElement>(null);
  const accent2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const magneticButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: 'words,chars' });
        gsap.set(split.chars, { y: 80, opacity: 0, scale: 0.5, rotateX: -45 });
        gsap.to(split.chars, {
          y: 0, opacity: 1, scale: 1, rotateX: 0,
          duration: 1, stagger: 0.03, ease: 'back.out(2)', delay: 0.8, force3D: true
        });
      }

      if (interactiveTextRef.current) {
        const splitInteractive = new SplitType(interactiveTextRef.current, { types: 'chars' });
        splitInteractive.chars?.forEach((char) => {
          char.addEventListener('mouseenter', () => {
            gsap.to(char, { y: -15, color: 'var(--color-primary)', scale: 1.3, rotate: Math.random() * 20 - 10, duration: 0.2, ease: 'back.out(4)', force3D: true });
            gsap.to(char, { x: Math.random() * 4 - 2, repeat: 3, yoyo: true, duration: 0.05, force3D: true });
          });
          char.addEventListener('mouseleave', () => {
            gsap.to(char, { y: 0, x: 0, color: 'inherit', scale: 1, rotate: 0, duration: 0.5, ease: 'power2.out', force3D: true });
          });
        });
      }

      gsap.fromTo(gridRef.current, { opacity: 0, scale: 1.1 }, { opacity: 0.4, scale: 1, duration: 2, ease: 'power2.out', force3D: true });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out', force3D: true } });
      tl.fromTo(badgeRef.current, { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1 }, 0.5)
        .fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 1.2)
        .fromTo(buttonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 1.4);

      gsap.fromTo(mockupRef.current,
        { opacity: 0, y: 100, rotateX: -20, scale: 0.9 },
        { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.5, ease: 'expo.out', force3D: true,
          scrollTrigger: { trigger: mockupRef.current, start: 'top 95%', end: 'top 60%', scrub: 1 } }
      );

      const handleMouseMove = (e: MouseEvent) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(accent1Ref.current, { x: mouseX * 80, y: mouseY * 80, duration: 1.5, ease: 'power2.out', force3D: true });
        gsap.to(accent2Ref.current, { x: -mouseX * 50, y: -mouseY * 50, duration: 1.5, ease: 'power2.out', force3D: true });
        gsap.to(mockupRef.current, { rotateY: mouseX * 8, rotateX: -mouseY * 8, duration: 1, ease: 'power2.out', force3D: true });
        magneticButtonsRef.current.forEach((btn) => {
          if (!btn) return;
          const rect = btn.getBoundingClientRect();
          const btnX = rect.left + rect.width / 2;
          const btnY = rect.top + rect.height / 2;
          const distance = Math.hypot(e.clientX - btnX, e.clientY - btnY);
          if (distance < 120) {
            gsap.to(btn, { x: (e.clientX - btnX) * 0.25, y: (e.clientY - btnY) * 0.25, duration: 0.4, ease: 'power2.out', force3D: true });
          } else {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'power2.out', force3D: true });
          }
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        gsap.killTweensOf([accent1Ref.current, accent2Ref.current, mockupRef.current, badgeRef.current, titleRef.current, textRef.current, buttonsRef.current, gridRef.current, ...magneticButtonsRef.current]);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden perspective-2000" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Tech Grid Background */}
      <div ref={gridRef} className="absolute inset-0 -z-20 opacity-20 pointer-events-none gpu-accelerated"
        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, color-mix(in srgb, var(--color-primary) 15%, transparent) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 30%, transparent)', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s` }} />
        ))}
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div ref={accent1Ref} className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full gpu-accelerated"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)', filter: 'blur(150px)', opacity: 0.5 }} />
        <div ref={accent2Ref} className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full gpu-accelerated"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 20%, transparent)', filter: 'blur(120px)', opacity: 0.4 }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={badgeRef} />

        <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-8 leading-[0.9] overflow-hidden gpu-accelerated" style={{ color: 'var(--color-dark)' }}>
          <span ref={interactiveTextRef} className="inline-block cursor-default">Building the future</span> <br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), #1a7a6a, var(--color-primary-dark))' }}>
            one pixel at a time.
          </span>
        </h1>

        <p ref={textRef} className="max-w-2xl mx-auto text-xl md:text-2xl mb-12 leading-relaxed gpu-accelerated" style={{ color: 'var(--color-muted)' }}>
          A mindblowing experience crafted for those who demand perfection.
          Experience the next generation of landing page design.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 gpu-accelerated">
          <button ref={(el) => (magneticButtonsRef.current[0] = el)}
            className="w-full sm:w-auto px-10 py-5 rounded-full font-bold text-xl flex items-center justify-center gap-3 cursor-pointer group overflow-hidden relative transition-shadow"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-accent)' }}>
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'var(--color-primary-dark)' }} />
          </button>
          <button ref={(el) => (magneticButtonsRef.current[1] = el)}
            className="w-full sm:w-auto px-10 py-5 rounded-full font-bold text-xl transition-colors cursor-pointer border-2"
            style={{ backgroundColor: 'white', color: 'var(--color-dark)', borderColor: 'var(--color-muted)' }}>
            Learn More
          </button>
        </div>

        {/* Mockup */}
        <div ref={mockupRef} className="mt-24 relative max-w-6xl mx-auto transform-gpu preserve-3d gpu-accelerated">
          <div className="aspect-[16/10] rounded-[2rem] overflow-hidden p-4"
            style={{ backgroundColor: 'white', border: '1px solid var(--color-muted)', boxShadow: '0 50px 100px -20px rgba(17, 77, 67, 0.15)' }}>
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative group" style={{ backgroundColor: 'var(--color-bg)' }}>
              <img src="https://picsum.photos/seed/future/1600/1000" alt="Future Interface"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div className="absolute -top-12 -right-12 w-48 h-48 backdrop-blur-xl rounded-3xl shadow-2xl hidden lg:flex items-center justify-center animate-bounce-slow"
            style={{ backgroundColor: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.3)' }}>
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color: 'var(--color-primary)' }}>99%</div>
              <div className="text-xs uppercase font-bold tracking-widest" style={{ color: 'var(--color-muted)' }}>Efficiency</div>
            </div>
          </div>

          <div className="absolute -bottom-12 -left-12 w-64 h-24 backdrop-blur-xl rounded-3xl shadow-2xl hidden lg:flex items-center justify-center animate-float"
            style={{ backgroundColor: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.3)' }}>
            <div className="flex items-center gap-4 px-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 30%, white)' }}>
                <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-primary)' }} />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold" style={{ color: 'var(--color-dark)' }}>System Online</div>
                <div className="text-xs" style={{ color: 'var(--color-muted)' }}>All modules active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
