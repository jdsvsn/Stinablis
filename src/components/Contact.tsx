import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(infoRef.current, {
        scrollTrigger: { trigger: infoRef.current, start: 'top 80%' },
        x: -50, opacity: 0, duration: 1, ease: 'power3.out', force3D: true
      });
      gsap.from(formRef.current, {
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
        y: 50, opacity: 0, duration: 1, ease: 'power3.out', force3D: true
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.killTweensOf([infoRef.current, formRef.current]);
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 overflow-hidden relative" style={{ backgroundColor: 'var(--color-dark)', color: 'white' }}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full -z-10 gpu-accelerated"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)', filter: 'blur(120px)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div ref={infoRef} className="gpu-accelerated">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-accent)' }}>Contact Us</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              Ready to start your <br />
              <span style={{ color: 'var(--color-accent)' }}>next project?</span>
            </h3>
            <p className="text-xl mb-12 max-w-md" style={{ color: 'var(--color-muted)' }}>
              Reach out to us today and let's discuss how we can help you achieve your goals.
            </p>

            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email Us', value: 'hello@companyname.com' },
                { icon: Phone, label: 'Call Us', value: '+1 (555) 000-0000' },
                { icon: MapPin, label: 'Visit Us', value: '123 Innovation Way, Tech City' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                    <Icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <div>
                    <div className="text-sm uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>{label}</div>
                    <div className="text-lg font-medium">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={formRef} className="backdrop-blur-xl p-8 md:p-12 rounded-3xl gpu-accelerated"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>Full Name</label>
                  <input type="text" placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-xl focus:outline-none transition-colors"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>Email Address</label>
                  <input type="email" placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-xl focus:outline-none transition-colors"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>Subject</label>
                <input type="text" placeholder="How can we help?"
                  className="w-full px-6 py-4 rounded-xl focus:outline-none transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>Message</label>
                <textarea rows={4} placeholder="Tell us about your project..."
                  className="w-full px-6 py-4 rounded-xl focus:outline-none transition-colors resize-none"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
              </div>
              <button className="w-full py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group"
                style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-accent)', boxShadow: '0 0 30px color-mix(in srgb, var(--color-primary) 40%, transparent)' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}>
                Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
