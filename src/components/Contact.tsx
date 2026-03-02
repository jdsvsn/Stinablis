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
      // Info Reveal
      gsap.from(infoRef.current, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        force3D: true
      });

      // Form Reveal
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        force3D: true
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.killTweensOf([infoRef.current, formRef.current]);
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-black text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -z-10 gpu-accelerated" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div ref={infoRef} className="gpu-accelerated">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Contact Us</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              Ready to start your <br />
              <span className="text-blue-400">next project?</span>
            </h3>
            <p className="text-xl text-gray-400 mb-12 max-w-md">
              Reach out to us today and let's discuss how we can help you achieve your goals.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Email Us</div>
                  <div className="text-lg font-medium">hello@companyname.com</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Call Us</div>
                  <div className="text-lg font-medium">+1 (555) 000-0000</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Visit Us</div>
                  <div className="text-lg font-medium">123 Innovation Way, Tech City</div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={formRef}
            className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 gpu-accelerated"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 transition-colors resize-none"
                />
              </div>
              <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
