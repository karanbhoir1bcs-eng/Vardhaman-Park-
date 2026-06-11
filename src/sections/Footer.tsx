import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import vardhamanCrest from "@/assets/vardhaman-park-crest.png";
import MahaReraQr from "../components/MahaReraQr";

export default function Footer({ setIsModalOpen }: { setIsModalOpen: (val: boolean) => void }) {
  return (
    <footer className="border-t border-[#D4AF37]/15 bg-neutral-950 pt-12 pb-8">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 mb-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1">
            <a href="#home" className="flex items-center gap-[11px] mb-4">
              <img
                src={vardhamanCrest}
                alt="Park 2.0 Phase 2"
                className="h-10 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <span className="font-serif font-semibold text-white text-lg tracking-[1.5px] uppercase mt-0.5">
                Vardhaman Park
              </span>
            </a>
            <p className="text-white text-sm leading-6 mb-5">
              An exclusive enclave of meticulously crafted residences designed for those who expect nothing less than extraordinary.
            </p>
            <div className="flex items-center gap-3">
              {/* Social icons */}
              {[
                { label: "Instagram", icon: <Instagram className="size-4 text-white group-hover:text-[#D4AF37] transition-colors" />, path: "https://www.instagram.com/vardhamanpark/" },
                { label: "Facebook", icon: <Facebook className="size-4 text-white group-hover:text-[#D4AF37] transition-colors" />, path: "https://www.facebook.com/profile.php?id=61589541251624" },
                { label: "YouTube", icon: <Youtube className="size-4 text-white group-hover:text-[#D4AF37] transition-colors" />, path: "https://www.youtube.com/@VardhamanDevelopers" },
                { label: "LinkedIn", icon: <Linkedin className="size-4 text-white group-hover:text-[#D4AF37] transition-colors" />, path: "https://www.linkedin.com/in/vardhaman-developers-bb374040b/" },
              ].map(({ label, icon, path }) => (
                <a
                  key={label}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="size-9 rounded-full bg-neutral-800 border border-neutral-700 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 flex items-center justify-center transition-colors group"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-white text-base mb-5">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Project", href: "#project" },
                { label: "Amenities", href: "#amenities" },
                { label: "Gallery", href: "#gallery" },
                { label: "Location", href: "#location" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-white text-sm hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                    <span className="w-4 h-px bg-[#D4AF37]/40 group-hover:w-6 group-hover:bg-[#D4AF37] transition-all duration-300" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h3 className="font-serif font-semibold text-white text-base mb-5">Project Info</h3>
            <ul className="flex flex-col gap-3">
              {["1 BHK Residences", "2 BHK Residences", "3 BHK Residences", "Master Plan", "Floor Plans", "Price List", "RERA Details"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white text-sm hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                    <span className="w-4 h-px bg-[#D4AF37]/40 group-hover:w-6 group-hover:bg-[#D4AF37] transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-white text-base mb-5">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="size-8 shrink-0 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center mt-0.5">
                  <MapPin className="size-4 text-[#D4AF37]" />
                </div>
                <address className="text-white text-sm leading-5 not-italic">
                  Park 2.0 Phase 2,<br />
                  Dhakate Shahad, Shahad,<br />
                  Kalyan, Maharashtra - 421103
                </address>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-8 shrink-0 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center">
                  <Phone className="size-4 text-[#D4AF37]" />
                </div>
                <a href="tel:+911234567890" className="text-white text-sm hover:text-[#D4AF37] transition-colors">
                  +91 12345 67890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-8 shrink-0 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center">
                  <Mail className="size-4 text-[#D4AF37]" />
                </div>
                <a href="mailto:info@vardhamanpark.com" className="text-white text-sm hover:text-[#D4AF37] transition-colors">
                  info@vardhamanpark.com
                </a>
              </li>
            </ul>

            {/* Book Visit CTA */}
            <Button
              className="mt-6 w-full shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-[#D4AF37] hover:bg-[#c9a430] text-[#0B0B0B] gap-2 font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              <CalendarCheck className="size-4" />
              Book a Visit
            </Button>
          </div>

          {/* QR Code Column */}
          <div>
            <h3 className="font-serif font-semibold text-white text-base mb-5">Official Registration</h3>
            <div className="w-full max-w-[280px]">
              <MahaReraQr />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#D4AF37]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white text-xs">
            © 2025 Park 2.0 Phase 2. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-white text-xs">
            <ShieldCheck className="size-3.5 text-[#D4AF37]" />
            RERA Approved &nbsp;·&nbsp; MahaRERA No. P52100XXXXX
          </div>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Use", "Disclaimer"].map((item) => (
              <a key={item} href="#" className="text-white text-xs hover:text-[#D4AF37] transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
