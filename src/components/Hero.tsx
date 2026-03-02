import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ArrowRight, Sparkles } from 'lucide-react';

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
      // Text Splitting for Title
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: 'words,chars' });
        
        // Initial state for chars - "Jump in" effect
        gsap.set(split.chars, { 
          y: 80, 
          opacity: 0,
          scale: 0.5,
          rotateX: -45,
        });

        // Entrance Animation for Title
        gsap.to(split.chars, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.03,
          ease: 'back.out(2)', // Jumpy feel
          delay: 0.8,
          force3D: true
        });
      }

      // Interactive "Building the future"
      if (interactiveTextRef.current) {
        const splitInteractive = new SplitType(interactiveTextRef.current, { types: 'chars' });
        splitInteractive.chars?.forEach((char) => {
          char.addEventListener('mouseenter', () => {
            gsap.to(char, {
              y: -15,
              color: '#3b82f6',
              scale: 1.3,
              rotate: Math.random() * 20 - 10,
              duration: 0.2,
              ease: 'back.out(4)',
              force3D: true
            });
            // Glitch effect
            gsap.to(char, {
              x: Math.random() * 4 - 2,
              repeat: 3,
              yoyo: true,
              duration: 0.05,
              force3D: true
            });
          });
          char.addEventListener('mouseleave', () => {
            gsap.to(char, {
              y: 0,
              x: 0,
              color: 'inherit',
              scale: 1,
              rotate: 0,
              duration: 0.5,
              ease: 'power2.out',
              force3D: true
            });
          });
        });
      }

      // Grid Animation
      gsap.fromTo(gridRef.current, 
        { opacity: 0, scale: 1.1 }, 
        { opacity: 0.4, scale: 1, duration: 2, ease: 'power2.out', force3D: true }
      );

      // Entrance Animation for other elements
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', force3D: true } });

      tl.fromTo(badgeRef.current, 
        { opacity: 0, scale: 0.8, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1 },
        0.5
      )
      .fromTo(textRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1 }, 
        1.2
      )
      .fromTo(buttonsRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1 }, 
        1.4
      );

      // Mockup Scroll Animation
      gsap.fromTo(mockupRef.current, 
        { 
          opacity: 0, 
          y: 100, 
          rotateX: -20,
          scale: 0.9,
        }, 
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          scale: 1,
          duration: 1.5,
          ease: 'expo.out',
          force3D: true,
          scrollTrigger: {
            trigger: mockupRef.current,
            start: 'top 95%',
            end: 'top 60%',
            scrub: 1,
          }
        }
      );

      // Mouse Parallax Effect - Optimized with lower frequency/smoothing
      let mouseX = 0;
      let mouseY = 0;
      
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        gsap.to(accent1Ref.current, {
          x: mouseX * 80,
          y: mouseY * 80,
          duration: 1.5,
          ease: 'power2.out',
          force3D: true
        });

        gsap.to(accent2Ref.current, {
          x: -mouseX * 50,
          y: -mouseY * 50,
          duration: 1.5,
          ease: 'power2.out',
          force3D: true
        });

        gsap.to(mockupRef.current, {
          rotateY: mouseX * 8,
          rotateX: -mouseY * 8,
          duration: 1,
          ease: 'power2.out',
          force3D: true
        });

        // Magnetic Buttons - Optimized
        magneticButtonsRef.current.forEach((btn) => {
          if (!btn) return;
          const rect = btn.getBoundingClientRect();
          const btnX = rect.left + rect.width / 2;
          const btnY = rect.top + rect.height / 2;
          const distance = Math.hypot(e.clientX - btnX, e.clientY - btnY);

          if (distance < 120) {
            gsap.to(btn, {
              x: (e.clientX - btnX) * 0.25,
              y: (e.clientY - btnY) * 0.25,
              duration: 0.4,
              ease: 'power2.out',
              force3D: true
            });
          } else {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              force3D: true
            });
          }
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        // Kill all tweens on cleanup
        gsap.killTweensOf([
          accent1Ref.current,
          accent2Ref.current,
          mockupRef.current,
          badgeRef.current,
          titleRef.current,
          textRef.current,
          buttonsRef.current,
          gridRef.current,
          ...magneticButtonsRef.current
        ]);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden perspective-2000">
      {/* Tech Grid Background */}
      <div 
        ref={gridRef}
        className="absolute inset-0 -z-20 opacity-20 pointer-events-none gpu-accelerated"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Particles / Pixels */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div ref={accent1Ref} className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[150px] opacity-40 gpu-accelerated" />
        <div ref={accent2Ref} className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-40 gpu-accelerated" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          ref={badgeRef}
          
        >
          
          
        </div>

        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter text-gray-900 mb-8 leading-[0.9] overflow-hidden gpu-accelerated"
        >
          <span ref={interactiveTextRef} className="inline-block cursor-default">Building the future</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            one pixel at a time.
          </span>
        </h1>

        <p
          ref={textRef}
          className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed gpu-accelerated"
        >
          A mindblowing experience crafted for those who demand perfection. 
          Experience the next generation of landing page design.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 gpu-accelerated"
        >
          <button 
            ref={(el) => (magneticButtonsRef.current[0] = el)}
            className="w-full sm:w-auto px-10 py-5 bg-black text-white rounded-full font-bold text-xl hover:shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-shadow flex items-center justify-center gap-3 cursor-pointer group overflow-hidden relative"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button 
            ref={(el) => (magneticButtonsRef.current[1] = el)}
            className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-full font-bold text-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Learn More
          </button>
        </div>

        {/* Mockup / Image Placeholder */}
        <div
          ref={mockupRef}
          className="mt-24 relative max-w-6xl mx-auto transform-gpu preserve-3d gpu-accelerated"
        >
          <div className="aspect-[16/10] bg-white rounded-[2rem] border border-gray-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden p-4">
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-gray-50 relative group">
              <img 
                src="https://picsum.photos/seed/future/1600/1000" 
                alt="Future Interface" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          {/* Floating UI Elements */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 hidden lg:flex items-center justify-center animate-bounce-slow">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">99%</div>
              <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Efficiency</div>
            </div>
          </div>
          
          <div className="absolute -bottom-12 -left-12 w-64 h-24 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 hidden lg:flex items-center justify-center animate-float">
            <div className="flex items-center gap-4 px-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-gray-900">System Online</div>
                <div className="text-xs text-gray-500">All modules active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
