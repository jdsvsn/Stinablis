import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Layout, Smartphone, Globe, BarChart, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Web Design',
    description: 'Modern, responsive websites that convert visitors into customers.',
    icon: Globe,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: Smartphone,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    title: 'UI/UX Design',
    description: 'User-centric design that provides seamless digital experiences.',
    icon: Layout,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Data Analytics',
    description: 'Actionable insights from your data to drive business growth.',
    icon: BarChart,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Cyber Security',
    description: 'Protecting your digital assets with enterprise-grade security.',
    icon: Shield,
    color: 'bg-rose-50 text-rose-600',
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable and reliable cloud infrastructure for your business.',
    icon: Zap,
    color: 'bg-amber-50 text-amber-600',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Reveal with SplitType
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: 'chars' });
        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          rotateX: -90,
          duration: 0.8,
          stagger: 0.02,
          ease: 'back.out(1.7)',
          force3D: true
        });
      }

      // Cards Staggered Reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          stagger: 0.15,
          ease: 'expo.out',
          force3D: true
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      // Kill all tweens on cleanup
      gsap.killTweensOf([
        titleRef.current,
        cardsRef.current
      ]);
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
            Our Services
          </h2>
          <h3 ref={titleRef} className="text-4xl md:text-5xl font-display font-bold text-gray-900 overflow-hidden gpu-accelerated">
            Solutions for every challenge.
          </h3>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gpu-accelerated">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-2xl hover:shadow-blue-200/20 transition-all group cursor-pointer relative overflow-hidden gpu-accelerated"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`relative z-10 w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h4 className="relative z-10 text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h4>
              <p className="relative z-10 text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
