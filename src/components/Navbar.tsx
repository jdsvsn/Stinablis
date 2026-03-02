import { motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0 flex items-center cursor-pointer">
            <img
              src={logo}
              alt="Stinablis Logo"
              className="h-24 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                {link.name}
              </a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-6 py-2.5 bg-black text-white rounded-full text-sm font-semibold overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Reach Us Out <ArrowRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-black p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-white border-b border-gray-100"
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4">
            <button className="w-full px-6 py-4 bg-black text-white rounded-xl text-base font-semibold flex items-center justify-center gap-2">
              Reach Us Out <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
