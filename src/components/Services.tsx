import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Layout, Smartphone, Globe, BarChart, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: 'Web Design', description: 'Modern, responsive websites that convert visitors into customers.', icon: Globe, colorKey: 'primary' },
  { title: 'Mobile Apps', description: 'Native and cross-platform mobile applications for iOS and Android.', icon: Smartphone, colorKey: 'primary-dark' },
  { title: 'UI/UX Design', description: 'User-centric design that provides seamless digital experiences.', icon: Layout, colorKey: 'primary' },
  { title: 'Data Analytics', description: 'Actionable insights from your data to drive business growth.', icon: BarChart, colorKey: 'primary-dark' },
  { title: 'Cyber Security', description: 'Protecting your digital assets with enterprise-grade security.', icon: Shield, colorKey: 'primary' },
  { title: 'Cloud Solutions', description: 'Scalable and reliable cloud infrastructure for your business.', icon: Zap, colorKey: 'primary-dark' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: 'chars' });
        gsap.from(split.chars, {
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
          y: 50, opacity: 0, rotateX: -90, duration: 0.8, stagger: 0.02, ease: 'back.out(1.7)', force3D: true
        });
      }

      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          y: 60, opacity: 0, scale: 0.9, duration: 1, stagger: 0.15, ease: 'expo.out', force3D: true
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.killTweensOf([titleRef.current, cardsRef.current]);
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-primary)' }}>
            Our Services
          </h2>
          <h3 ref={titleRef} className="text-4xl md:text-5xl font-display font-bold overflow-hidden gpu-accelerated" style={{ color: 'var(--color-dark)' }}>
            Solutions for every challenge.
          </h3>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gpu-accelerated">
          {services.map((service) => (
            <div key={service.title} className="p-8 rounded-3xl border transition-all group cursor-pointer relative overflow-hidden gpu-accelerated"
              style={{ backgroundColor: 'white', borderColor: 'color-mix(in srgb, var(--color-muted) 30%, transparent)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 15%, transparent), transparent)` }} />
              <div className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, white)', color: 'var(--color-primary)' }}>
                <service.icon className="w-6 h-6" />
              </div>
              <h4 className="relative z-10 text-xl font-display font-bold mb-3 transition-colors" style={{ color: 'var(--color-dark)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-dark)')}>
                {service.title}
              </h4>
              <p className="relative z-10 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
