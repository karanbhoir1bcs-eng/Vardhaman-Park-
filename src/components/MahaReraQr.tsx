
export default function MahaReraQr() {
  return (
    <div className="flex flex-col items-center justify-center p-5 bg-neutral-900 border border-solid border-[#D4AF37]/20 rounded-2xl max-w-[220px] shadow-lg hover:border-[#D4AF37]/50 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(212,175,55,0.08)] transition-all duration-300">
      <a 
        href="https://maharera.maharashtra.gov.in/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block transition-transform duration-300 hover:scale-105"
        aria-label="Verify MahaRERA Registration on official website"
      >
        <img 
          src="/VARDHAMAN_MAHARERA_SCANNER.png" 
          alt="MahaRERA QR Code for Park 2.0 Phase 2" 
          className="w-28 h-28 object-contain rounded-lg bg-white p-1.5 mb-3 mx-auto border border-[#D4AF37]/30"
          loading="lazy"
        />
      </a>
      <div className="text-center w-full space-y-1">
        <p className="text-neutral-50 font-medium text-xs font-serif tracking-wide">
          Scan to verify MahaRERA
        </p>
        <a 
          href="https://maharera.maharashtra.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[#D4AF37] hover:text-white text-xs transition-colors underline decoration-[#D4AF37]/30 hover:decoration-white/50"
        >
          Visit MahaRERA Website
        </a>
      </div>
    </div>
  );
}
