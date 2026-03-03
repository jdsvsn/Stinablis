export default function Footer() {
  return (
    <footer className="py-12 border-t" style={{ backgroundColor: 'var(--color-dark)', color: 'white', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <a href="#home" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-6 h-6 rounded flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--color-accent)' }}>
              <div className="w-3 h-3 rounded-sm rotate-45" style={{ backgroundColor: 'var(--color-dark)' }} />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Company Name</span>
          </a>

          <div className="flex gap-8 text-sm" style={{ color: 'var(--color-muted)' }}>
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-white">Cookies</a>
          </div>

          <div className="text-sm" style={{ color: 'var(--color-muted)' }}>
            © {new Date().getFullYear()} Company Name. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
