import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Reveal with SplitType - "Jump in" effect
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: 'words,chars' });
        gsap.set(split.chars, { 
          y: 60, 
          opacity: 0,
          scale: 0.6,
          rotateX: -30,
        });
        
        gsap.to(split.chars, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: 'back.out(1.5)',
          force3D: true
        });
      }

      // Content Reveal
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
        x: -30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        force3D: true
      });

      // Image Reveal with Parallax - Optimized
      gsap.fromTo(imageRef.current, 
        { 
          y: 60,
          opacity: 0,
          scale: 0.95,
        },
        {
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 90%',
            end: 'bottom 20%',
            scrub: 1,
          },
          y: -30,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          force3D: true
        }
      );

      // Grid Animation
      gsap.fromTo(gridRef.current, 
        { opacity: 0 }, 
        { 
          opacity: 0.2, 
          duration: 1.5, 
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Stats Stagger
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 90%',
          },
          y: 20,
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.5)',
          force3D: true
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      // Kill all tweens on cleanup
      gsap.killTweensOf([
        contentRef.current,
        titleRef.current,
        imageRef.current,
        statsRef.current,
        gridRef.current
      ]);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gray-50 overflow-hidden relative">
      {/* Tech Grid Background */}
      <div 
        ref={gridRef}
        className="absolute inset-0 -z-10 opacity-0 pointer-events-none gpu-accelerated"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={contentRef} className="gpu-accelerated">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">About Us</h2>
            <h3 ref={titleRef} className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight overflow-hidden gpu-accelerated">
              We create digital experiences that people love.
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Company Name is a forward-thinking studio dedicated to crafting beautiful and functional 
              digital products. Our team of experts combines design, technology, and strategy to help 
              businesses grow in the digital age.
            </p>
            <div ref={statsRef} className="grid grid-cols-2 gap-8 gpu-accelerated">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-4xl font-bold text-blue-600 mb-1">10+</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Years Experience</div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-4xl font-bold text-indigo-600 mb-1">200+</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Projects Completed</div>
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className="relative gpu-accelerated">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl group">
              <img 
                src="https://picsum.photos/seed/team/800/800" 
                alt="Our Team" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-white p-6 rounded-[2rem] shadow-2xl hidden md:block animate-float">
              <div className="w-full h-full bg-blue-50 rounded-2xl flex items-center justify-center text-center p-6 border border-blue-100">
                <p className="text-sm font-bold text-blue-900 leading-relaxed">
                  "Innovation is at the core of everything we do."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
