import { useState, useEffect, useRef } from "react";
import {
  Armchair,
  Award,
  Baby,
  Building,
  Building2,
  CalendarCheck,
  Car,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Cpu,
  Dumbbell,
  Eye,
  Footprints,
  Gem,
  GraduationCap,
  HandCoins,
  Home,
  Hospital,
  Image,
  Info,
  LayoutGrid,
  Leaf,
  Mail,
  MapPin,
  Maximize,
  Maximize2,
  MessageSquare,
  Milestone,
  Phone,
  Plane,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  TrainFront,
  Trees,
  User,
  Users,
  Waves,
  X,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import vardhamanCrest from "@/assets/vardhaman-park-crest.png";
import masterPlan from "@/assets/master-plan.jpg";
import heroBg1 from "@/assets/hero-1.jpg";
import heroBg2 from "@/assets/hero-2.jpg";
import heroBg3 from "@/assets/hero-3.jpg";
import heroCityscape from "@/assets/hero-cityscape.jpg";
import vardhamanBuilding from "@/assets/vardhaman-building.jpg";
import galleryLiving1 from "@/assets/gallery-living-1.jpg";
import galleryBedroom1 from "@/assets/gallery-bedroom-1.jpg";
import galleryLiving2 from "@/assets/gallery-living-2.jpg";
import galleryBedroom2 from "@/assets/gallery-bedroom-2.jpg";

// Web3Forms Access Key. Get a free key at https://web3forms.com/ to receive submissions in your Gmail.
const WEB3FORMS_ACCESS_KEY = "c89693eb-c8df-4a6c-9419-f52ba6873523";

function FadeIn({
  children,
  delay = 0,
  duration = 800,
  className = "",
  type = "fade-up",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  type?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "clip-reveal" | "letter-expand";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  let animationClasses = "";
  switch (type) {
    case "fade-up":
      animationClasses = isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";
      break;
    case "fade-down":
      animationClasses = isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8";
      break;
    case "fade-left":
      animationClasses = isIntersecting ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8";
      break;
    case "fade-right":
      animationClasses = isIntersecting ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8";
      break;
    case "scale-up":
      animationClasses = isIntersecting ? "opacity-100 scale-100" : "opacity-0 scale-95";
      break;
    case "clip-reveal":
      animationClasses = isIntersecting ? "clip-reveal-active" : "clip-reveal-inactive";
      break;
    case "letter-expand":
      animationClasses = isIntersecting ? "opacity-100 tracking-wide" : "opacity-0 tracking-[0.5em]";
      break;
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out ${animationClasses} ${className}`}
    >
      {children}
    </div>
  );
}

function BookingModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New Site Visit Booking - Vardhaman Park",
          from_name: "Vardhaman Park Website",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: formData.date,
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", date: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-900 border border-[#D4AF37]/25 shadow-[0_25px_80px_rgba(0,0,0,0.8)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 size-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-neutral-50 hover:bg-neutral-700 transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex uppercase text-[#D4AF37] text-xs tracking-[4px] mb-3 items-center gap-2">
            <span className="bg-[#D4AF37] w-6 h-px" />
            Book Your Visit
            <span className="bg-[#D4AF37] w-6 h-px" />
          </div>
          <h2 className="font-serif font-semibold text-neutral-50 text-3xl leading-tight">
            Schedule a Private Tour
          </h2>
          <p className="text-[#a1a1a1] text-sm mt-2 leading-relaxed">
            Experience the elegance of Vardhaman Park in person.<br />
            Reserve an exclusive guided tour with our luxury consultants.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center py-8 flex flex-col items-center gap-4">
            <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-bounce">
              <ShieldCheck className="size-8" />
            </div>
            <h3 className="text-neutral-50 font-semibold text-xl">Booking Requested Successfully!</h3>
            <p className="text-[#a1a1a1] text-sm max-w-sm">
              Your details have been sent to our luxury consultants via email. We will contact you within 24 hours.
            </p>
            <Button
              onClick={onClose}
              className="mt-4 bg-[#D4AF37] hover:bg-[#c9a430] text-[#0B0B0B] font-semibold px-6"
            >
              Close Window
            </Button>
          </div>
        ) : (
          /* Form */
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-medium">
                  <User className="size-3.5" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="rounded-xl bg-neutral-800 border border-neutral-700 focus:border-[#D4AF37]/60 outline-none px-4 py-3 text-neutral-50 text-sm placeholder:text-neutral-500 transition-colors"
                />
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-medium">
                  <Phone className="size-3.5" />
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 00000 00000"
                  className="rounded-xl bg-neutral-800 border border-neutral-700 focus:border-[#D4AF37]/60 outline-none px-4 py-3 text-neutral-50 text-sm placeholder:text-neutral-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-medium">
                  <Mail className="size-3.5" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="rounded-xl bg-neutral-800 border border-neutral-700 focus:border-[#D4AF37]/60 outline-none px-4 py-3 text-neutral-50 text-sm placeholder:text-neutral-500 transition-colors"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-medium">
                  <CalendarCheck className="size-3.5" />
                  Preferred Visit Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="rounded-xl bg-neutral-800 border border-neutral-700 focus:border-[#D4AF37]/60 outline-none px-4 py-3 text-neutral-50 text-sm placeholder:text-neutral-500 transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-medium">
                <MessageSquare className="size-3.5" />
                Message
              </label>
              <textarea
                rows={3}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us about your preferences or any questions..."
                className="rounded-xl bg-neutral-800 border border-neutral-700 focus:border-[#D4AF37]/60 outline-none px-4 py-3 text-neutral-50 text-sm placeholder:text-neutral-500 transition-colors resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-xs text-center">
                Something went wrong. Please check your network and try again.
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={status === "submitting"}
              className="w-full shadow-[0_0_30px_rgba(212,175,55,0.4)] bg-[#D4AF37] hover:bg-[#c9a430] text-[#0B0B0B] font-semibold py-3 gap-2 mt-1 disabled:opacity-50"
              size="lg"
            >
              <CalendarCheck className="size-5" />
              {status === "submitting" ? "Sending Request..." : "Confirm Booking"}
            </Button>

            <p className="text-center text-[#a1a1a1] text-xs flex items-center justify-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[#D4AF37]" />
              Our luxury consultant will contact you within 24 hours
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

const galleryItems = [
  {
    id: 1,
    title: "Luxury Kitchen",
    category: "interiors",
    src: "https://images.unsplash.com/photo-1738748444653-2fb1388aef1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwbHV4dXJ5JTIwbWFyYmxlfGVufDF8MXx8fDE3ODAzMDc4MjF8MA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 2,
    title: "Elegant Bedroom",
    category: "bedrooms",
    src: "https://images.unsplash.com/photo-1699800900071-ae073285ca02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBlbGVnYW50fGVufDF8MHx8fDE3ODAyMjgwNzV8MA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 3,
    title: "City Skyline",
    category: "exteriors",
    src: "https://images.unsplash.com/photo-1596564309076-01c1868b07a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB2aWV3JTIwbW9kZXJuJTIwY2l0eSUyMHNreWxpbmUlMjB0d2lsaWdodHxlbnwxfDB8fHwxNzgwMzA3ODIxfDA&ixlib=rb-4.1.0&q=80&w=1000",
  },
  {
    id: 4,
    title: "Modern Bathroom",
    category: "interiors",
    src: "https://images.unsplash.com/photo-1576698483491-8c43f0862543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMG1vZGVybiUyMGRlc2lnbnxlbnwxfDF8fHwxNzgwMzA3ODIxfDA&ixlib=rb-4.1.0&q=80&w=800",
  },
  {
    id: 5,
    title: "Premium Living Room",
    category: "living",
    src: "https://images.unsplash.com/photo-1611094016919-36b65678f3d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb20lMjBlbGVnYW50fGVufDF8MHx8fDE3ODAzMDc4MTB8MA&ixlib=rb-4.1.0&q=80&w=1000",
  },
  {
    id: 6,
    title: "Modern Living Space",
    category: "living",
    src: galleryLiving1,
  },
  {
    id: 7,
    title: "Luxury Bedroom",
    category: "bedrooms",
    src: galleryBedroom1,
  },
  {
    id: 8,
    title: "Contemporary Living Room",
    category: "living",
    src: galleryLiving2,
  },
  {
    id: 9,
    title: "Master Suite",
    category: "bedrooms",
    src: galleryBedroom2,
  },
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const heroSlides = [
    heroCityscape,
    vardhamanBuilding,
    heroBg1,
    heroBg2,
    heroBg3,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New General Inquiry - Vardhaman Park",
          from_name: "Vardhaman Park Contact Form",
          name: contactData.name,
          phone: contactData.phone,
          email: contactData.email,
          message: contactData.message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setContactStatus("success");
        setContactData({ name: "", phone: "", email: "", message: "" });
      } else {
        setContactStatus("error");
      }
    } catch (error) {
      console.error("Contact Form submit error:", error);
      setContactStatus("error");
    }
  };

  return (
    <div>
      {isModalOpen && <BookingModal onClose={() => setIsModalOpen(false)} />}
      <div className="bg-neutral-950 text-neutral-50 w-full min-h-screen overflow-x-hidden">
        <header className="fixed left-0 right-0 top-0 z-50 w-full px-4 py-3 sm:px-8">
          <div className="max-w-[1180px] flex mx-auto px-5 sm:px-8 justify-between items-center h-16 rounded-[2rem] border border-white/15 bg-neutral-950/55 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <a href="#home" className="flex items-center gap-[11px] -ml-1 animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both">
              <img
                src={vardhamanCrest}
                alt="Vardhaman Park"
                className="h-9 w-auto object-contain"
              />
              <span className="font-serif font-semibold text-white text-base sm:text-lg tracking-[1.5px] uppercase mt-0.5">
                Vardhaman Park
              </span>
            </a>
            <nav className="hidden md:flex justify-center items-center gap-1 lg:gap-2 md:ml-auto md:mr-6">
              <a href="#home" className="text-white/90 text-sm leading-5 px-3 inline-flex items-center hover:text-white hover:bg-white/10 rounded-full py-2 transition-colors animate-in fade-in slide-in-from-top-2 duration-500 delay-75 fill-mode-both">
                Home
              </a>
              <a href="#about" className="text-white/80 text-sm leading-5 px-3 inline-flex items-center hover:text-white hover:bg-white/10 rounded-full py-2 transition-colors animate-in fade-in slide-in-from-top-2 duration-500 delay-100 fill-mode-both">
                About
              </a>
              <a href="#project" className="text-white/80 text-sm leading-5 px-3 inline-flex items-center hover:text-white hover:bg-white/10 rounded-full py-2 transition-colors animate-in fade-in slide-in-from-top-2 duration-500 delay-150 fill-mode-both">
                Project
              </a>
              <a href="#amenities" className="text-white/80 text-sm leading-5 px-3 inline-flex items-center hover:text-white hover:bg-white/10 rounded-full py-2 transition-colors animate-in fade-in slide-in-from-top-2 duration-500 delay-200 fill-mode-both">
                Amenities
              </a>
              <a href="#gallery" className="text-white/80 text-sm leading-5 px-3 inline-flex items-center hover:text-white hover:bg-white/10 rounded-full py-2 transition-colors animate-in fade-in slide-in-from-top-2 duration-500 delay-300 fill-mode-both">
                Gallery
              </a>
              <a href="#location" className="text-white/80 text-sm leading-5 px-3 inline-flex items-center hover:text-white hover:bg-white/10 rounded-full py-2 transition-colors animate-in fade-in slide-in-from-top-2 duration-500 delay-500 fill-mode-both">
                Location
              </a>
              <a href="#contact" className="text-white/80 text-sm leading-5 px-3 inline-flex items-center hover:text-white hover:bg-white/10 rounded-full py-2 transition-colors animate-in fade-in slide-in-from-top-2 duration-500 delay-700 fill-mode-both">
                Contact
              </a>
            </nav>
            <div className="hidden md:flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-500 delay-1000 fill-mode-both">
              <Button className="rounded-full bg-white text-[#101010] hover:bg-white/90 px-5 gap-2" onClick={() => setIsModalOpen(true)}>
                <CalendarCheck className="size-4" />
                Book Visit
              </Button>
            </div>
            
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden p-2 text-neutral-50 hover:bg-white/10 rounded-full transition-colors border-0 bg-transparent cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-neutral-950/95 border border-white/15 backdrop-blur-xl fixed top-22 left-4 right-4 z-40 rounded-2xl py-6 px-6 flex flex-col gap-4">
            <a
              href="#home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#D4AF37] text-base font-medium py-2 border-b border-neutral-850 flex items-center gap-2"
            >
              <Home className="size-5" />
              Home
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#a1a1a1] text-base font-medium py-2 border-b border-neutral-850 hover:text-neutral-50 flex items-center gap-2"
            >
              <Info className="size-5" />
              About
            </a>
            <a
              href="#project"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#a1a1a1] text-base font-medium py-2 border-b border-neutral-850 hover:text-neutral-50 flex items-center gap-2"
            >
              <Building2 className="size-5" />
              Project
            </a>
            <a
              href="#amenities"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#a1a1a1] text-base font-medium py-2 border-b border-neutral-850 hover:text-neutral-50 flex items-center gap-2"
            >
              <Sparkles className="size-5" />
              Amenities
            </a>
            <a
              href="#gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#a1a1a1] text-base font-medium py-2 border-b border-neutral-850 hover:text-neutral-50 flex items-center gap-2"
            >
              <Image className="size-5" />
              Gallery
            </a>
            <a
              href="#location"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#a1a1a1] text-base font-medium py-2 border-b border-neutral-850 hover:text-neutral-50 flex items-center gap-2"
            >
              <MapPin className="size-5" />
              Location
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#a1a1a1] text-base font-medium py-2 border-b border-neutral-850 hover:text-neutral-50 flex items-center gap-2"
            >
              <Phone className="size-5" />
              Contact
            </a>
            <Button
              className="w-full mt-2 shadow-[0_0_25px_rgba(212,175,55,0.4)] bg-[#D4AF37] text-[#0B0B0B] gap-2 py-6 text-base"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
            >
              <CalendarCheck className="size-5" />
              Book Visit
            </Button>
          </div>
        )}
        <section id="home" className="relative isolate w-full overflow-hidden px-4 pb-4 pt-4 sm:px-6">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {heroSlides.map((slide, index) => {
              const isActive = index === currentSlide;

              return (
                <img
                  key={index}
                  alt={`Vardhaman Park luxury residences ${index + 1}`}
                  className={`size-full object-cover absolute inset-0 transition-all duration-1000 ease-in-out ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                  src={slide}
                />
              );
            })}
          </div>
          <div className="absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.48)_48%,rgba(0,0,0,0.32)_100%)]" />
          <div className="absolute inset-0 z-20 bg-black/20" />

          <div className="relative z-30 mx-auto flex min-h-[520px] max-w-[1180px] flex-col justify-start px-4 pb-4 pt-24 sm:min-h-[560px] sm:px-6 sm:pb-6 md:min-h-[600px] md:px-8 md:pb-8">
            <div className="max-w-[790px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-both">
                <Star className="size-3.5 text-[#D4AF37]" />
                <span className="uppercase text-white/90 text-xs leading-4 tracking-[3px]">
                  Pre-Launch | RERA Approved
                </span>
              </div>
              <h1 className="mt-3 max-w-[780px] font-serif font-semibold text-white text-4xl leading-[1.05] sm:text-5xl md:text-6xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both">
                Discover Elevated Living at Vardhaman Park
              </h1>
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-6 text-white/80 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
                Explore premium residences crafted around green views, quiet luxury, and effortless city access.
              </p>
            </div>

            <div className="mt-[90px] w-full grid grid-cols-1 gap-2.5 rounded-2xl border border-white/15 bg-black/30 p-3 backdrop-blur-md sm:grid-cols-3 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
              <label className="min-w-0 rounded-xl border border-white/15 bg-black/20 px-4 py-3 flex flex-col justify-center gap-1">
                <span className="text-xs leading-4 text-white/60">Location</span>
                <select className="mt-1 w-full bg-transparent text-white text-sm font-medium outline-none">
                  <option className="bg-neutral-950 text-white">New Delhi</option>
                  <option className="bg-neutral-950 text-white">Mumbai</option>
                  <option className="bg-neutral-950 text-white">Pune</option>
                </select>
              </label>
              <label className="min-w-0 rounded-xl border border-white/15 bg-black/20 px-4 py-3 flex flex-col justify-center gap-1">
                <span className="text-xs leading-4 text-white/60">Property</span>
                <select className="mt-1 w-full bg-transparent text-white text-sm font-medium outline-none">
                  <option className="bg-neutral-950 text-white">Luxury Apartment</option>
                  <option className="bg-neutral-950 text-white">Penthouse</option>
                  <option className="bg-neutral-950 text-white">Garden Residence</option>
                </select>
              </label>
              <label className="min-w-0 rounded-xl border border-white/15 bg-black/20 px-4 py-3 flex flex-col justify-center gap-1">
                <span className="text-xs leading-4 text-white/60">Price Range</span>
                <select className="mt-1 w-full bg-transparent text-white text-sm font-medium outline-none">
                  <option className="bg-neutral-950 text-white">Rs. 1.8 Cr - Rs. 3.5 Cr</option>
                  <option className="bg-neutral-950 text-white">Rs. 3.5 Cr - Rs. 5 Cr</option>
                  <option className="bg-neutral-950 text-white">Rs. 5 Cr+</option>
                </select>
              </label>
              <Button asChild className="sm:col-span-3 min-h-[56px] rounded-xl bg-white px-7 text-[#101010] hover:bg-[#D4AF37] hover:text-[#0B0B0B] transition-colors gap-2 font-semibold">
                <a href="#project" className="flex items-center justify-center gap-2">
                  <Compass className="size-4" />
                  Find Now
                </a>
              </Button>
            </div>
          </div>
        </section>
        <section id="about" className="max-w-[1180px] mx-auto px-6 sm:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
            <FadeIn className="relative">
              <div className="rounded-3xl border border-solid border-[#D4AF37]/20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <img
                  alt="Luxury interior"
                  className="object-cover w-full h-110"
                  data-authorname="Lotus Design N Print"
                  data-authorurl="https://unsplash.com/@lotusdnp"
                  data-blurhash="LJHC7jM|ad%M_N-;j[WWI9M{bIoe"
                  data-photoid="n5RsUiVf5T0"
                  src="https://images.unsplash.com/photo-1611094016919-36b65678f3d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb20lMjBlbGVnYW50fGVufDF8MHx8fDE3ODAzMDc4MTB8MA&ixlib=rb-4.1.0&q=80&w=800"
                />
              </div>
              <div className="backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-2xl bg-neutral-900/80 border border-solid border-[#D4AF37]/30 absolute right-0 bottom-0 md:-right-6 md:-bottom-6 p-4 md:p-6 animate-in fade-in zoom-in-50 duration-700 delay-500 fill-mode-both">
                <div className="flex items-center gap-3">
                  <Award className="size-8 text-[#D4AF37]" />
                  <div>
                    <p className="font-serif font-semibold text-neutral-50 text-xl leading-7">
                      Award Winning
                    </p>
                    <p className="text-[#a1a1a1] text-xs leading-4">
                      Best Residential Project 2024
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <div className="flex flex-col">
              <FadeIn type="letter-expand" delay={100} duration={600}>
                <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] mb-4 items-center gap-2">
                  <span className="bg-[#D4AF37] w-8 h-px" />
                  About Vardhaman Park
                </div>
              </FadeIn>
              <FadeIn type="clip-reveal" delay={200} duration={800}>
                <h2 className="leading-tight font-serif font-semibold text-neutral-50 text-3xl md:text-4xl leading-10">
                  A Legacy of Elegance, Built for Generations
                </h2>
              </FadeIn>
              <FadeIn type="fade-up" delay={350} duration={800}>
                <p className="leading-relaxed text-[#a1a1a1] mt-5">
                  For over 18 years, Vardhaman Park has redefined the art of
                  luxury living. Each residence is a testament to architectural
                  mastery — where timeless design meets modern innovation, and
                  every detail is crafted to perfection.
                </p>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 mt-8 gap-4">
                <FadeIn type="scale-up" delay={500} duration={600} className="h-full">
                  <Card className="bg-neutral-900 border border-solid border-[#D4AF37]/20 p-5 flex flex-col gap-2 shadow-lg h-full">
                    <CardHeader className="p-0 gap-2 flex flex-col">
                      <Eye className="size-6 text-[#D4AF37]" />
                      <CardTitle className="font-serif text-neutral-50 text-lg leading-7">
                        Our Vision
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-[#a1a1a1] text-sm leading-5">
                        To create iconic landmarks that elevate the standard of
                        premium living across India.
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
                <FadeIn type="scale-up" delay={600} duration={600} className="h-full">
                  <Card className="bg-neutral-900 border border-solid border-[#D4AF37]/20 p-5 flex flex-col gap-2 shadow-lg h-full">
                    <CardHeader className="p-0 gap-2 flex flex-col">
                      <Target className="size-6 text-[#D4AF37]" />
                      <CardTitle className="font-serif text-neutral-50 text-lg leading-7">
                        Our Mission
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-[#a1a1a1] text-sm leading-5">
                        To deliver homes of enduring value, blending
                        sustainability with uncompromising luxury.
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
        <section id="project" className="border-y border-solid border-[#D4AF37]/10 bg-neutral-900/30 py-20">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex flex-col items-center mb-12">
              <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
                <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                  <span className="bg-[#D4AF37] w-8 h-px" />
                  Project Highlights
                  <span className="bg-[#D4AF37] w-8 h-px" />
                </div>
              </FadeIn>
              <FadeIn type="clip-reveal" delay={200} duration={800} className="text-center mt-3">
                <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10">
                  Crafted for the Discerning Few
                </h2>
              </FadeIn>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FadeIn delay={100} duration={600}>
                <Card className="group h-full transition-all duration-300 bg-neutral-900 border border-solid border-[#D4AF37]/15 p-6 flex flex-col gap-3 shadow-md hover:border-[#D4AF37]/45 hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)]">
                  <CardHeader className="p-0 gap-3 flex flex-col">
                    <div className="size-12 transition-all rounded-xl bg-[#D4AF37]/10 border border-solid border-[#D4AF37]/30 flex justify-center items-center">
                      <MapPin className="size-6 text-[#D4AF37]" />
                    </div>
                    <CardTitle className="font-serif text-neutral-50 text-xl leading-7">
                      Prime Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-[#a1a1a1] text-sm leading-5">
                      Strategically nestled in the city's most coveted address
                      with seamless connectivity.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={200} duration={600}>
                <Card className="group h-full transition-all duration-300 bg-neutral-900 border border-solid border-[#D4AF37]/15 p-6 flex flex-col gap-3 shadow-md hover:border-[#D4AF37]/45 hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)]">
                  <CardHeader className="p-0 gap-3 flex flex-col">
                    <div className="size-12 transition-all rounded-xl bg-[#D4AF37]/10 border border-solid border-[#D4AF37]/30 flex justify-center items-center">
                      <Maximize className="size-6 text-[#D4AF37]" />
                    </div>
                    <CardTitle className="font-serif text-neutral-50 text-xl leading-7">
                      Spacious Residences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-[#a1a1a1] text-sm leading-5">{`Expansive 2, 3 & 4 BHK homes with grand layouts and panoramic vistas.`}</p>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={300} duration={600}>
                <Card className="group h-full transition-all duration-300 bg-neutral-900 border border-solid border-[#D4AF37]/15 p-6 flex flex-col gap-3 shadow-md hover:border-[#D4AF37]/45 hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)]">
                  <CardHeader className="p-0 gap-3 flex flex-col">
                    <div className="size-12 transition-all rounded-xl bg-[#D4AF37]/10 border border-solid border-[#D4AF37]/30 flex justify-center items-center">
                      <Sparkles className="size-6 text-[#D4AF37]" />
                    </div>
                    <CardTitle className="font-serif text-neutral-50 text-xl leading-7">
                      Modern Amenities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-[#a1a1a1] text-sm leading-5">
                      Over 40 curated amenities crafted for wellness, leisure and
                      recreation.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={150} duration={600}>
                <Card className="group h-full transition-all duration-300 bg-neutral-900 border border-solid border-[#D4AF37]/15 p-6 flex flex-col gap-3 shadow-md hover:border-[#D4AF37]/45 hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)]">
                  <CardHeader className="p-0 gap-3 flex flex-col">
                    <div className="size-12 transition-all rounded-xl bg-[#D4AF37]/10 border border-solid border-[#D4AF37]/30 flex justify-center items-center">
                      <Leaf className="size-6 text-[#D4AF37]" />
                    </div>
                    <CardTitle className="font-serif text-neutral-50 text-xl leading-7">
                      Sustainable Living
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-[#a1a1a1] text-sm leading-5">
                      Green-certified design with rainwater harvesting and solar
                      integration.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={250} duration={600}>
                <Card className="group h-full transition-all duration-300 bg-neutral-900 border border-solid border-[#D4AF37]/15 p-6 flex flex-col gap-3 shadow-md hover:border-[#D4AF37]/45 hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)]">
                  <CardHeader className="p-0 gap-3 flex flex-col">
                    <div className="size-12 transition-all rounded-xl bg-[#D4AF37]/10 border border-solid border-[#D4AF37]/30 flex justify-center items-center">
                      <ShieldCheck className="size-6 text-[#D4AF37]" />
                    </div>
                    <CardTitle className="font-serif text-neutral-50 text-xl leading-7">
                      24/7 Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-[#a1a1a1] text-sm leading-5">
                      Multi-tier security with CCTV surveillance and biometric
                      access control.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={350} duration={600}>
                <Card className="group h-full transition-all duration-300 bg-neutral-900 border border-solid border-[#D4AF37]/15 p-6 flex flex-col gap-3 shadow-md hover:border-[#D4AF37]/45 hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)]">
                  <CardHeader className="p-0 gap-3 flex flex-col">
                    <div className="size-12 transition-all rounded-xl bg-[#D4AF37]/10 border border-solid border-[#D4AF37]/30 flex justify-center items-center">
                      <Cpu className="size-6 text-[#D4AF37]" />
                    </div>
                    <CardTitle className="font-serif text-neutral-50 text-xl leading-7">
                      Smart Infrastructure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-[#a1a1a1] text-sm leading-5">
                      Intelligent home automation and high-speed connectivity
                      throughout.
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
              <div className="flex flex-col">
                <FadeIn type="letter-expand" delay={100} duration={600}>
                  <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] mb-4 items-center gap-2">
                    <span className="bg-[#D4AF37] w-8 h-px" />
                    Why Choose Us
                  </div>
                </FadeIn>
                <FadeIn type="clip-reveal" delay={200} duration={800}>
                  <h2 className="leading-tight font-serif font-semibold text-neutral-50 text-3xl md:text-4xl leading-10">
                    The Distinction of Excellence
                  </h2>
                </FadeIn>
                <div className="flex mt-8 flex-col gap-5">
                  <FadeIn type="fade-up" delay={300} duration={600}>
                    <div className="group border border-solid border-transparent hover:border-[#D4AF37]/10 hover:bg-neutral-900/20 transition-all duration-300 rounded-2xl flex p-3 gap-4">
                      <div className="size-11 shrink-0 rounded-full bg-[#D4AF37]/10 border border-solid border-[#D4AF37]/40 flex justify-center items-center">
                        <Gem className="size-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold text-neutral-50 text-lg leading-7">
                          Uncompromising Quality
                        </h3>
                        <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                          Premium imported finishes and craftsmanship in every
                          corner.
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                  <FadeIn type="fade-up" delay={400} duration={600}>
                    <div className="group border border-solid border-transparent hover:border-[#D4AF37]/10 hover:bg-neutral-900/20 transition-all duration-300 rounded-2xl flex p-3 gap-4">
                      <div className="size-11 shrink-0 rounded-full bg-[#D4AF37]/10 border border-solid border-[#D4AF37]/40 flex justify-center items-center">
                        <Clock className="size-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold text-neutral-50 text-lg leading-7">
                          On-Time Delivery
                        </h3>
                        <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                          A proven record of delivering every project ahead of
                          schedule.
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                  <FadeIn type="fade-up" delay={500} duration={600}>
                    <div className="group border border-solid border-transparent hover:border-[#D4AF37]/10 hover:bg-neutral-900/20 transition-all duration-300 rounded-2xl flex p-3 gap-4">
                      <div className="size-11 shrink-0 rounded-full bg-[#D4AF37]/10 border border-solid border-[#D4AF37]/40 flex justify-center items-center">
                        <HandCoins className="size-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold text-neutral-50 text-lg leading-7">
                          Exceptional Value
                        </h3>
                        <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                          Investments that appreciate, designed for lasting
                          returns.
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
              <FadeIn delay={200} className="relative rounded-3xl border border-solid border-[#D4AF37]/20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <img
                  alt="Vardhaman Park Building"
                  className="object-cover w-full h-72 sm:h-115"
                  src={vardhamanBuilding}
                />
              </FadeIn>
            </div>
          </div>
        </section>
        <section className="border-y border-solid border-[#D4AF37]/10 bg-neutral-900/30 py-20">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex flex-col items-center mb-12">
              <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
                <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                  <span className="bg-[#D4AF37] w-8 h-px" />
                  Master Plan
                  <span className="bg-[#D4AF37] w-8 h-px" />
                </div>
              </FadeIn>
              <FadeIn type="clip-reveal" delay={200} duration={800} className="text-center mt-3">
                <h2 className="font-serif font-semibold text-neutral-50 text-3xl md:text-4xl leading-10">
                  A Vision Beautifully Planned
                </h2>
              </FadeIn>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <FadeIn className="col-span-1 lg:col-span-2 relative rounded-3xl border border-solid border-[#D4AF37]/20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <img
                  alt="Master plan"
                  className="object-cover w-full h-72 sm:h-105"
                  src={masterPlan}
                />
                <div className="bg-[#0b0b0b]/50 absolute inset-0" />
                <div className="left-[28%] top-[35%] flex absolute items-center gap-2">
                  <span className="size-4 animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.8)] rounded-full bg-[#D4AF37] flex justify-center items-center" />
                  <span className="backdrop-blur-md rounded-full bg-neutral-900/80 text-neutral-50 text-xs leading-4 border border-solid border-[#D4AF37]/40 px-3 py-1">
                    Tower A
                  </span>
                </div>
                <div className="left-[60%] top-[55%] flex absolute items-center gap-2">
                  <span className="size-4 animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.8)] rounded-full bg-[#D4AF37] flex justify-center items-center" />
                  <span className="backdrop-blur-md rounded-full bg-neutral-900/80 text-neutral-50 text-xs leading-4 border border-solid border-[#D4AF37]/40 px-3 py-1">
                    Clubhouse
                  </span>
                </div>
              </FadeIn>
              <div className="flex flex-col gap-4">
                <FadeIn type="scale-up" delay={150} duration={600}>
                  <Card className="bg-neutral-900 border border-solid border-[#D4AF37]/20 p-5 flex flex-col gap-2 shadow-md">
                    <CardHeader className="p-0 gap-1 flex flex-col">
                      <Building className="size-6 text-[#D4AF37]" />
                      <CardTitle className="font-serif text-neutral-50 text-lg leading-7">
                        8 Premium Towers
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-[#a1a1a1] text-sm leading-5">
                        G+30 storeys with breathtaking skyline views.
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
                <FadeIn type="scale-up" delay={250} duration={600}>
                  <Card className="bg-neutral-900 border border-solid border-[#D4AF37]/20 p-5 flex flex-col gap-2 shadow-md">
                    <CardHeader className="p-0 gap-1 flex flex-col">
                      <Trees className="size-6 text-[#D4AF37]" />
                      <CardTitle className="font-serif text-neutral-50 text-lg leading-7">
                        70% Open Spaces
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-[#a1a1a1] text-sm leading-5">
                        Lush landscaped gardens and walking trails.
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
                <FadeIn type="scale-up" delay={350} duration={600}>
                  <Card className="bg-neutral-900 border border-solid border-[#D4AF37]/20 p-5 flex flex-col gap-2 shadow-md">
                    <CardHeader className="p-0 gap-1 flex flex-col">
                      <LayoutGrid className="size-6 text-[#D4AF37]" />
                      <CardTitle className="font-serif text-neutral-50 text-lg leading-7">
                        Smart Layouts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-[#a1a1a1] text-sm leading-5">
                        Vastu-compliant homes with optimal ventilation.
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>        <section id="amenities" className="max-w-[1180px] mx-auto px-6 sm:px-8 py-20">
          <div className="flex flex-col items-center mb-12">
            <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
              <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                <span className="bg-[#D4AF37] w-8 h-px" />
                World-Class Amenities
                <span className="bg-[#D4AF37] w-8 h-px" />
              </div>
            </FadeIn>
            <FadeIn type="clip-reveal" delay={200} duration={800} className="text-center mt-3">
              <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10">
                Indulge in Everyday Luxury
              </h2>
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn type="scale-up" delay={100} duration={700} className="col-span-1 md:col-span-2">
              <div className="group relative rounded-3xl border border-solid border-[#D4AF37]/20 overflow-hidden shadow-lg h-full">
                <img
                  alt="Swimming pool"
                  className="object-cover transition-transform duration-700 w-full h-65 group-hover:scale-105"
                  data-authorname="Roberto Nickson"
                  data-authorurl="https://unsplash.com/@rpnickson"
                  data-blurhash="LqI;bfXTJ7e.~VNHW=bFxaIVNat6"
                  data-photoid="MA82mPIZeGI"
                  src="https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBsdXh1cnklMjByZXNvcnR8ZW58MXwwfHx8MTc4MDMwNzgxMHww&ixlib=rb-4.1.0&q=80&w=900"
                />
                <div className="bg-[#0b0b0b]/30 absolute inset-0 transition-all duration-300 group-hover:bg-[#0b0b0b]/10" />
                <div className="flex absolute left-5 bottom-5 items-center gap-2 backdrop-blur-md bg-[#0b0b0b]/60 border border-[#D4AF37]/20 rounded-xl px-4 py-2">
                  <Waves className="size-5 text-[#D4AF37]" />
                  <span className="font-serif font-semibold text-neutral-50 text-xl leading-7">
                    Infinity Pool
                  </span>
                </div>
              </div>
            </FadeIn>
            <FadeIn type="scale-up" delay={200} duration={700}>
              <div className="group relative rounded-3xl border border-solid border-[#D4AF37]/20 overflow-hidden shadow-lg h-full">
                <img
                  alt="Gym"
                  className="object-cover transition-transform duration-700 w-full h-65 group-hover:scale-105"
                  data-authorname="gina lin"
                  data-authorurl="https://unsplash.com/@shuttch"
                  data-blurhash="LOL|S[ITElR+.Sofsmoe}l%MM|od"
                  data-photoid="m27OTMegUyA"
                  src="https://images.unsplash.com/photo-1542766788-a2f588f447ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjBmaXRoZXNzJTIwY2VudGVyJTIwbHV4dXJ5fGVufDF8MHx8fDE3ODAzMDc4MTB8MA&ixlib=rb-4.1.0&q=80&w=500"
                />
                <div className="bg-[#0b0b0b]/30 absolute inset-0 transition-all duration-300 group-hover:bg-[#0b0b0b]/10" />
                <div className="flex absolute left-5 bottom-5 items-center gap-2 backdrop-blur-md bg-[#0b0b0b]/60 border border-[#D4AF37]/20 rounded-xl px-4 py-2">
                  <Dumbbell className="size-5 text-[#D4AF37]" />
                  <span className="font-serif font-semibold text-neutral-50 text-xl leading-7">
                    Fitness Studio
                  </span>
                </div>
              </div>
            </FadeIn>
            <FadeIn type="scale-up" delay={150} duration={700}>
              <div className="group relative rounded-3xl border border-solid border-[#D4AF37]/20 overflow-hidden shadow-lg h-full">
                <img
                  alt="Clubhouse"
                  className="object-cover transition-transform duration-700 w-full h-65 group-hover:scale-105"
                  data-authorname="Pontus Wellgraf"
                  data-authorurl="https://unsplash.com/@wellgraf"
                  data-blurhash="L683@Zs;0xwc-9I:J8RiTJt7nOIo"
                  data-photoid="yihqkkTw53M"
                  src="https://images.unsplash.com/photo-1584670380670-28f0d4cabb06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjbHViaG91c2UlMjBsb3VuZ2UlMjBpbnRlcmlvcnxlbnwxfDB8fHwxNzgwMzA3ODEwfDA&ixlib=rb-4.1.0&q=80&w=500"
                />
                <div className="bg-[#0b0b0b]/30 absolute inset-0 transition-all duration-300 group-hover:bg-[#0b0b0b]/10" />
                <div className="flex absolute left-5 bottom-5 items-center gap-2 backdrop-blur-md bg-[#0b0b0b]/60 border border-[#D4AF37]/20 rounded-xl px-4 py-2">
                  <Armchair className="size-5 text-[#D4AF37]" />
                  <span className="font-serif font-semibold text-neutral-50 text-xl leading-7">
                    Grand Clubhouse
                  </span>
                </div>
              </div>
            </FadeIn>
            <FadeIn type="scale-up" delay={250} duration={700} className="col-span-1 md:col-span-2">
              <div className="group relative rounded-3xl border border-solid border-[#D4AF37]/20 overflow-hidden shadow-lg h-full">
                <img
                  alt="Garden"
                  className="object-cover transition-transform duration-700 w-full h-65 group-hover:scale-105"
                  data-authorname="Daniel Zopf"
                  data-authorurl="https://unsplash.com/@daniel_zopf"
                  data-blurhash="LZ9[l5o~H?V=o,o$RfaJyEbKaJj="
                  data-photoid="MFN2HPCWXgY"
                  src="https://images.unsplash.com/photo-1626456877396-5af019036c63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGVkJTIwZ2FyZGVuJTIwcGFyayUyMGdyZWVufGVufDF8MHx8fDE3ODAzMDc4MTB8MA&ixlib=rb-4.1.0&q=80&w=900"
                />
                <div className="bg-[#0b0b0b]/30 absolute inset-0 transition-all duration-300 group-hover:bg-[#0b0b0b]/10" />
                <div className="flex absolute left-5 bottom-5 items-center gap-2 backdrop-blur-md bg-[#0b0b0b]/60 border border-[#D4AF37]/20 rounded-xl px-4 py-2">
                  <Trees className="size-5 text-[#D4AF37]" />
                  <span className="font-serif font-semibold text-neutral-50 text-xl leading-7">
                    Landscaped Gardens
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mt-6 gap-4">
            <FadeIn type="scale-up" delay={200} duration={500}>
              <div className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-2 shadow-xs hover:border-[#D4AF37]/35 transition-colors h-full">
                <Footprints className="size-5 text-[#D4AF37]" />
                <span className="text-neutral-50 text-sm leading-5">
                  Jogging Track
                </span>
              </div>
            </FadeIn>
            <FadeIn type="scale-up" delay={250} duration={500}>
              <div className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-2 shadow-xs hover:border-[#D4AF37]/35 transition-colors h-full">
                <Baby className="size-5 text-[#D4AF37]" />
                <span className="text-neutral-50 text-sm leading-5">
                  Kids Play Area
                </span>
              </div>
            </FadeIn>
            <FadeIn type="scale-up" delay={300} duration={500}>
              <div className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-2 shadow-xs hover:border-[#D4AF37]/35 transition-colors h-full">
                <ShieldCheck className="size-5 text-[#D4AF37]" />
                <span className="text-neutral-50 text-sm leading-5">
                  Security
                </span>
              </div>
            </FadeIn>
            <FadeIn type="scale-up" delay={350} duration={500}>
              <div className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-2 shadow-xs hover:border-[#D4AF37]/35 transition-colors h-full">
                <Car className="size-5 text-[#D4AF37]" />
                <span className="text-neutral-50 text-sm leading-5">Parking</span>
              </div>
            </FadeIn>
            <FadeIn type="scale-up" delay={400} duration={500}>
              <div className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-2 shadow-xs hover:border-[#D4AF37]/35 transition-colors h-full">
                <Users className="size-5 text-[#D4AF37]" />
                <span className="text-neutral-50 text-sm leading-5">
                  Community Hall
                </span>
              </div>
            </FadeIn>
          </div>
        </section>
        <section id="gallery" className="border-y border-solid border-[#D4AF37]/10 bg-neutral-900/30 py-20">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex flex-col items-center mb-12">
              <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
                <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                  <span className="bg-[#D4AF37] w-8 h-px" />
                  Gallery
                  <span className="bg-[#D4AF37] w-8 h-px" />
                </div>
              </FadeIn>
              <FadeIn type="clip-reveal" delay={200} duration={800} className="text-center mt-3">
                <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10 mb-8">
                  Glimpses of Grandeur
                </h2>
              </FadeIn>

              {/* Gallery Filter Tabs */}
              <FadeIn type="fade-up" delay={300} duration={600} className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-10">
                {[
                  { id: "all", label: "All" },
                  { id: "living", label: "Living Room" },
                  { id: "bedrooms", label: "Bedrooms" },
                  { id: "interiors", label: "Kitchen & Bath" },
                  { id: "exteriors", label: "Exteriors" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setGalleryFilter(tab.id)}
                    className={`px-5 py-2 rounded-full border border-solid text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                      galleryFilter === tab.id
                        ? "bg-[#D4AF37] border-[#D4AF37] text-neutral-950 shadow-[0_4px_15px_rgba(212,175,55,0.25)] font-bold"
                        : "border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-[#D4AF37]/45"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </FadeIn>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryItems
                .filter((item) => galleryFilter === "all" || item.category === galleryFilter)
                .map((item, index) => {
                  const originalIndex = galleryItems.findIndex((g) => g.id === item.id);
                  return (
                    <FadeIn
                      key={item.id}
                      type="scale-up"
                      delay={50 * (index % 6)}
                      duration={500}
                    >
                      <div
                        onClick={() => setLightboxIndex(originalIndex)}
                        className="group relative cursor-pointer aspect-[4/3] rounded-2xl border border-solid border-[#D4AF37]/15 overflow-hidden shadow-md bg-neutral-900 animate-in fade-in zoom-in-95 duration-300"
                      >
                        <img
                          alt={item.title}
                          className="object-cover transition-transform duration-700 w-full h-full group-hover:scale-105"
                          src={item.src}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-1">
                                {item.category === "living"
                                  ? "Living Room"
                                  : item.category === "bedrooms"
                                  ? "Bedrooms"
                                  : item.category === "interiors"
                                  ? "Kitchen & Bath"
                                  : "Exteriors"}
                              </p>
                              <h4 className="text-neutral-50 font-serif font-semibold text-lg leading-6">
                                {item.title}
                              </h4>
                            </div>
                            <div className="size-10 shrink-0 rounded-full bg-[#D4AF37]/10 border border-solid border-[#D4AF37]/30 flex justify-center items-center backdrop-blur-xs">
                              <Maximize2 className="size-5 text-[#D4AF37]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
            </div>
          </div>

          {/* Lightbox Modal */}
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-50 transition-colors p-2 z-55 cursor-pointer"
              >
                <X className="size-8" />
              </button>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null
                  );
                }}
                className="absolute left-4 sm:left-6 text-neutral-400 hover:text-neutral-50 transition-colors p-2 z-55 bg-neutral-900/50 hover:bg-neutral-900 rounded-full border border-solid border-neutral-800 cursor-pointer"
              >
                <ChevronLeft className="size-8" />
              </button>

              {/* Main Image Container */}
              <div className="max-w-[90vw] max-h-[80vh] flex flex-col items-center select-none">
                <img
                  src={galleryItems[lightboxIndex].src}
                  alt={galleryItems[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg border border-solid border-neutral-800 shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <h4 className="text-neutral-50 font-serif font-semibold text-xl">
                    {galleryItems[lightboxIndex].title}
                  </h4>
                  <p className="text-sm text-[#D4AF37] uppercase tracking-wider mt-1">
                    {galleryItems[lightboxIndex].category === "living"
                      ? "Living Room"
                      : galleryItems[lightboxIndex].category === "bedrooms"
                      ? "Bedrooms"
                      : galleryItems[lightboxIndex].category === "interiors"
                      ? "Kitchen & Bath"
                      : "Exteriors"}
                  </p>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev !== null ? (prev + 1) % galleryItems.length : null
                  );
                }}
                className="absolute right-4 sm:right-6 text-neutral-400 hover:text-neutral-50 transition-colors p-2 z-55 bg-neutral-900/50 hover:bg-neutral-900 rounded-full border border-solid border-neutral-800 cursor-pointer"
              >
                <ChevronRight className="size-8" />
              </button>
            </div>
          )}
        </section>
        <section id="location" className="max-w-[1180px] mx-auto px-6 sm:px-8 py-20">
          <div className="flex flex-col items-center mb-12">
            <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
              <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                <span className="bg-[#D4AF37] w-8 h-px" />
                Location Advantage
                <span className="bg-[#D4AF37] w-8 h-px" />
              </div>
            </FadeIn>
            <FadeIn type="clip-reveal" delay={200} duration={800} className="text-center mt-3">
              <h2 className="font-serif font-semibold text-neutral-50 text-3xl md:text-4xl leading-10">
                Connected to Everything That Matters
              </h2>
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FadeIn type="scale-up" delay={100} duration={500}>
              <div className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-3 hover:border-[#D4AF37]/35 transition-colors h-full">
                <GraduationCap className="size-5 text-[#D4AF37]" />
                <div>
                  <p className="font-medium text-neutral-50 text-sm leading-5">
                    Top Schools
                  </p>
                  <p className="text-[#a1a1a1] text-xs leading-4">
                    5 min away
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn type="scale-up" delay={150} duration={500}>
              <div className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-3 hover:border-[#D4AF37]/35 transition-colors h-full">
                <Hospital className="size-5 text-[#D4AF37]" />
                <div>
                  <p className="font-medium text-neutral-50 text-sm leading-5">
                    Hospitals
                  </p>
                  <p className="text-[#a1a1a1] text-xs leading-4">
                    8 min away
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn type="scale-up" delay={200} duration={500}>
              <div className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-3 hover:border-[#D4AF37]/35 transition-colors h-full">
                <ShoppingBag className="size-5 text-[#D4AF37]" />
                <div>
                  <p className="font-medium text-neutral-50 text-sm leading-5">
                    Shopping Malls
                  </p>
                  <p className="text-[#a1a1a1] text-xs leading-4">
                    10 min away
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn type="scale-up" delay={250} duration={500}>
              <div className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-3 hover:border-[#D4AF37]/35 transition-colors h-full">
                <Milestone className="size-5 text-[#D4AF37]" />
                <div>
                  <p className="font-medium text-neutral-50 text-sm leading-5">
                    Highway
                  </p>
                  <p className="text-[#a1a1a1] text-xs leading-4">
                    3 min away
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn type="scale-up" delay={300} duration={500}>
              <div className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-3 hover:border-[#D4AF37]/35 transition-colors h-full">
                <TrainFront className="size-5 text-[#D4AF37]" />
                <div>
                  <p className="font-medium text-neutral-50 text-sm leading-5">
                    Railway Station
                  </p>
                  <p className="text-[#a1a1a1] text-xs leading-4">
                    12 min away
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn type="scale-up" delay={350} duration={500}>
              <div className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-3 hover:border-[#D4AF37]/35 transition-colors h-full">
                <Plane className="size-5 text-[#D4AF37]" />
                <div>
                  <p className="font-medium text-neutral-50 text-sm leading-5">
                    Airport
                  </p>
                  <p className="text-[#a1a1a1] text-xs leading-4">
                    25 min away
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="contact" className="max-w-[1180px] mx-auto px-6 sm:px-8 py-20">
          <div className="flex flex-col items-center mb-12">
            <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
              <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                <span className="bg-[#D4AF37] w-8 h-px" />
                Get In Touch
                <span className="bg-[#D4AF37] w-8 h-px" />
              </div>
            </FadeIn>
            <FadeIn type="clip-reveal" delay={200} duration={800} className="text-center mt-3">
              <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10">
                We'd Love to Hear From You
              </h2>
            </FadeIn>
            <FadeIn type="fade-up" delay={300} duration={800} className="text-center mt-3">
              <p className="text-[#a1a1a1] max-w-xl mx-auto text-sm leading-6">
                Reach out to our luxury consultants for pricing, site visits, or any queries about Vardhaman Park.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="flex flex-col gap-5 col-span-1">
              <FadeIn type="fade-right" delay={150} duration={600}>
                <div className="rounded-2xl bg-neutral-900 border border-[#D4AF37]/20 p-6 flex items-start gap-4 h-full">
                  <div className="size-12 shrink-0 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                    <MapPin className="size-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-neutral-50 text-base mb-1">Visit Us</p>
                    <p className="text-[#a1a1a1] text-sm leading-5">Vardhaman Park, Sector 12,<br />New Delhi – 110 001, India</p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn type="fade-right" delay={250} duration={600}>
                <div className="rounded-2xl bg-neutral-900 border border-[#D4AF37]/20 p-6 flex items-start gap-4 h-full">
                  <div className="size-12 shrink-0 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                    <Phone className="size-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-neutral-50 text-base mb-1">Call Us</p>
                    <a href="tel:+911234567890" className="text-[#a1a1a1] text-sm hover:text-[#D4AF37] transition-colors">+91 12345 67890</a>
                    <br />
                    <a href="tel:+910987654321" className="text-[#a1a1a1] text-sm hover:text-[#D4AF37] transition-colors">+91 09876 54321</a>
                  </div>
                </div>
              </FadeIn>
              <FadeIn type="fade-right" delay={350} duration={600}>
                <div className="rounded-2xl bg-neutral-900 border border-[#D4AF37]/20 p-6 flex items-start gap-4 h-full">
                  <div className="size-12 shrink-0 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                    <Mail className="size-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-neutral-50 text-base mb-1">Email Us</p>
                    <a href="mailto:info@vardhamanpark.com" className="text-[#a1a1a1] text-sm hover:text-[#D4AF37] transition-colors">info@vardhamanpark.com</a>
                    <br />
                    <a href="mailto:sales@vardhamanpark.com" className="text-[#a1a1a1] text-sm hover:text-[#D4AF37] transition-colors">sales@vardhamanpark.com</a>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Contact Form */}
            <FadeIn type="fade-left" delay={250} className="col-span-1 lg:col-span-2 rounded-3xl bg-neutral-900 border border-[#D4AF37]/20 p-8">
              <h3 className="font-serif font-semibold text-neutral-50 text-2xl mb-6">Send Us a Message</h3>
              {contactStatus === "success" ? (
                <div className="text-center py-12 flex flex-col items-center gap-4">
                  <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-bounce">
                    <ShieldCheck className="size-8" />
                  </div>
                  <h3 className="text-neutral-50 font-semibold text-xl">Message Sent Successfully!</h3>
                  <p className="text-[#a1a1a1] text-sm max-w-sm">
                    Thank you for contacting us. Your message has been sent to our luxury consultants via email.
                  </p>
                  <Button
                    onClick={() => setContactStatus("idle")}
                    className="mt-4 bg-[#D4AF37] hover:bg-[#c9a430] text-[#0B0B0B] font-semibold px-6"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-medium">
                        <User className="size-3.5" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={contactData.name}
                        onChange={handleContactChange}
                        required
                        placeholder="Enter your full name"
                        className="rounded-xl bg-neutral-800 border border-neutral-700 focus:border-[#D4AF37]/60 outline-none px-4 py-3 text-neutral-50 text-sm placeholder:text-neutral-500 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-medium">
                        <Phone className="size-3.5" />
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={contactData.phone}
                        onChange={handleContactChange}
                        required
                        placeholder="+91 00000 00000"
                        className="rounded-xl bg-neutral-800 border border-neutral-700 focus:border-[#D4AF37]/60 outline-none px-4 py-3 text-neutral-50 text-sm placeholder:text-neutral-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-medium">
                      <Mail className="size-3.5" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleContactChange}
                      required
                      placeholder="you@example.com"
                      className="rounded-xl bg-neutral-800 border border-neutral-700 focus:border-[#D4AF37]/60 outline-none px-4 py-3 text-neutral-50 text-sm placeholder:text-neutral-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-medium">
                      <MessageSquare className="size-3.5" />
                      Message
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={contactData.message}
                      onChange={handleContactChange}
                      required
                      placeholder="Tell us about your requirements or any questions..."
                      className="rounded-xl bg-neutral-800 border border-neutral-700 focus:border-[#D4AF37]/60 outline-none px-4 py-3 text-neutral-50 text-sm placeholder:text-neutral-500 transition-colors resize-none"
                    />
                  </div>

                  {contactStatus === "error" && (
                    <p className="text-red-400 text-xs text-center">
                      Something went wrong. Please check your network and try again.
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 mt-1">
                    <Button
                      type="submit"
                      disabled={contactStatus === "submitting"}
                      className="flex-1 shadow-[0_0_25px_rgba(212,175,55,0.35)] bg-[#D4AF37] hover:bg-[#c9a430] text-[#0B0B0B] font-semibold gap-2 disabled:opacity-50"
                      size="lg"
                    >
                      <MessageSquare className="size-4" />
                      {contactStatus === "submitting" ? "Sending..." : "Send Message"}
                    </Button>
                    <Button
                      type="button"
                      className="flex-1 border border-[#D4AF37]/50 text-[#D4AF37] bg-transparent hover:bg-[#D4AF37]/10 gap-2"
                      size="lg"
                      variant="outline"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <CalendarCheck className="size-4" />
                      Book a Visit
                    </Button>
                  </div>
                </form>
              )}
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#D4AF37]/15 bg-neutral-950 pt-16 pb-8">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">

            {/* Top grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

              {/* Brand */}
              <div className="col-span-1 sm:col-span-2 md:col-span-1">
                <a href="#home" className="flex items-center gap-[11px] mb-4">
                  <img
                    src={vardhamanCrest}
                    alt="Vardhaman Park"
                    className="h-10 w-auto object-contain"
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
                    { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                    { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M6.5 2h11A4.5 4.5 0 0 1 22 6.5v11a4.5 4.5 0 0 1-4.5 4.5h-11A4.5 4.5 0 0 1 2 17.5v-11A4.5 4.5 0 0 1 6.5 2z" },
                    { label: "Twitter", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
                    { label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
                  ].map(({ label, path }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="size-9 rounded-full bg-neutral-800 border border-neutral-700 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 flex items-center justify-center transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-white hover:text-[#D4AF37]">
                        <path d={path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-serif font-semibold text-white text-base mb-5">Quick Links</h4>
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
                <h4 className="font-serif font-semibold text-white text-base mb-5">Project Info</h4>
                <ul className="flex flex-col gap-3">
                  {["2 BHK Residences", "3 BHK Residences", "4 BHK Penthouses", "Master Plan", "Floor Plans", "Price List", "RERA Details"].map((item) => (
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
                <h4 className="font-serif font-semibold text-white text-base mb-5">Contact Us</h4>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <div className="size-8 shrink-0 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center mt-0.5">
                      <MapPin className="size-4 text-[#D4AF37]" />
                    </div>
                    <p className="text-white text-sm leading-5">
                      Vardhaman Park, Sector 12,<br />
                      New Delhi – 110 001, India
                    </p>
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
            </div>

            {/* Divider */}
            <div className="border-t border-[#D4AF37]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-white text-xs">
                © 2025 Vardhaman Park. All rights reserved.
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

      </div>
    </div>
  );
}
