export default function Footer() {
  return (
    <footer className="py-12 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <a href="#home" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-3 h-3 bg-black rounded-sm rotate-45" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white">Company Name</span>
          </a>
          
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>

          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Company Name. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
