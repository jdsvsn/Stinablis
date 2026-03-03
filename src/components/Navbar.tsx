import { motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(238,244,246,0.85)', borderColor: 'color-mix(in srgb, var(--color-muted) 30%, transparent)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0 flex items-center cursor-pointer">
            <img src={logo} alt="Stinablis Logo" className="h-24 w-auto object-contain" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--color-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-dark)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}>
                {link.name}
              </a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-6 py-2.5 rounded-full text-sm font-semibold overflow-hidden transition-all"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-accent)' }}>
              <span className="relative z-10 flex items-center gap-2">
                Reach Us Out <ArrowRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'var(--color-primary-dark)' }} />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 transition-colors" style={{ color: 'var(--color-muted)' }}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden border-b"
        style={{ backgroundColor: 'var(--color-bg)', borderColor: 'color-mix(in srgb, var(--color-muted) 30%, transparent)' }}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-medium rounded-lg transition-colors"
              style={{ color: 'var(--color-muted)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-dark)'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
              {link.name}
            </a>
          ))}
          <div className="pt-4">
            <button className="w-full px-6 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-accent)' }}>
              Reach Us Out <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
