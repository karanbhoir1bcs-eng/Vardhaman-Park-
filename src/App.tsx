import { useState, useEffect, useRef } from "react";
import {
  Armchair,
  Award,
  Baby,
  BookOpen,
  Building,
  Building2,
  BusFront,
  CalendarCheck,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  Dumbbell,
  Eye,
  Flower2,
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
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Sunset,
  Swords,
  Target,
  TrainFront,
  Trees,
  User,
  Users,
  Utensils,
  Waves,
  Wind,
  X,
  ZoomIn,
  Menu,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import GeoSummary from "./components/GeoSummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import vardhamanCrest from "@/assets/vardhaman-park-crest.png";
import masterPlan from "@/assets/master-plan-new.jpg";
import vardhamanBuilding from "@/assets/vardhaman-building.jpg";

import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import heroNew from "@/assets/hero-new.jpg";
import heroCityscapeNew from "@/assets/hero-cityscape-new.jpg";
// TODO: Place your new images in src/assets/ and import them here like this:
// import hero1 from "@/assets/your-new-hero-1.jpg";
// import hero2 from "@/assets/your-new-hero-2.jpg";
import galleryLiving1 from "@/assets/gallery-living-1.jpg";
import galleryBedroom1 from "@/assets/gallery-bedroom-1.jpg";
import galleryLiving2 from "@/assets/gallery-living-2.jpg";
import galleryBedroom2 from "@/assets/gallery-bedroom-2.jpg";
import FAQ from "./sections/FAQ";
import Footer from "./sections/Footer";// Google Apps Script endpoint – submissions go directly to your Google Sheets.
// Replace the URL below with your deployed Google Apps Script Web App URL.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx_DbLdcNXUxruq9BvMwflDQC6-jDqhHpdVQedRXsZKn4D0jmdiZ9VjvkgFd1K48A/exec";

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
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

  let initialClasses = "animate-on-scroll";
  switch (type) {
    case "fade-up":
      initialClasses += " animate-fade-up";
      break;
    case "fade-down":
      initialClasses += " animate-fade-down";
      break;
    case "fade-left":
      initialClasses += " animate-fade-left";
      break;
    case "fade-right":
      initialClasses += " animate-fade-right";
      break;
    case "scale-up":
      initialClasses += " animate-scale-up";
      break;
    case "clip-reveal":
      initialClasses += " animate-clip-reveal";
      break;
    case "letter-expand":
      initialClasses += " animate-letter-expand";
      break;
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`${initialClasses} ${className}`}
    >
      {children}
    </div>
  );
}

function sendTourBookingToZoho(data: any) {
    const zohoWebhookURL = "https://flow.zoho.in/60073630205/flow/webhook/incoming?zapikey=1001.4ce725db549fa43d8717b9b2256da867.25618e1fae87591b4184bc0374259505&isdebug=false";

    const params = new URLSearchParams();
    params.append("Timestamp", new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    params.append("Full Name", data.name);
    params.append("Mobile Number", data.phone);
    params.append("Email Address", data.email);
    params.append("Preferred Visit Date", data.date);
    params.append("Message", data.message);
    params.append("Project Name", data.project);

    return fetch(zohoWebhookURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
    })
    .then(() => {
        // When using no-cors, we can't read the response, so we just assume it was sent successfully
    });
}

function BookingModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    project: "Park 2.0 Phase 2",
    date: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let newValue = value;
    
    if (name === "phone") {
      // Keep only digits and slice to exactly 10
      newValue = newValue.replace(/\D/g, '').slice(0, 10);
    }
    
    if (name === "email") {
      // Remove all spaces
      newValue = newValue.replace(/\s/g, '');
    }
    
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.phone.length < 10) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");

    try {
      await sendTourBookingToZoho(formData);
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", project: "Park 2.0 Phase 2", date: "", message: "" });
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
            Experience the elegance of Park 2.0 Phase 2 in person.<br />
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
                  id="fullName"
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
                  id="mobileNumber"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 00000 00000"
                  className="rounded-xl bg-neutral-800 border border-neutral-700 focus:border-[#D4AF37]/60 outline-none px-4 py-3 text-neutral-50 text-sm placeholder:text-neutral-500 transition-colors"
                  maxLength={10}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-medium">
                  <Mail className="size-3.5" />
                  Email Address
                </label>
                <input
                  id="emailAddress"
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
                  id="visitDate"
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
                id="message"
                rows={3}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us about your preferences or any questions..."
                className="rounded-xl bg-neutral-800 border border-neutral-700 focus:border-[#D4AF37]/60 outline-none px-4 py-3 text-neutral-50 text-sm placeholder:text-neutral-500 transition-colors resize-none"
                maxLength={1000}
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

  // Hero background images — autoplay crossfade slider
  const heroImages = [vardhamanBuilding, hero2, hero3, heroNew, heroCityscapeNew];
  const [floorPlanGallery, setFloorPlanGallery] = useState<{ images: { src: string; alt: string; label: string }[]; index: number } | null>(null);

  // Image sets for floor plan galleries — SEO-optimized alt tags for Google, AEO & GEO
  const bhk1Images = [
    { src: '/1bhk-plan.jpg',           alt: '1 BHK Apartment Floor Plan Layout at Park 2.0 Phase 2 Shahad Kalyan – 425 to 475 sq ft Vastu Compliant Design with Bedroom Kitchen Living Room and Patio', label: '1 BHK Floor Plan' },
    { src: '/typical-floor-plan.jpg',  alt: 'Park 2.0 Phase 2 Typical Floor Plan Drawing with Room Dimensions – 1 BHK and 2 BHK Apartment Layouts Showing All Unit Configurations on Each Floor', label: 'Typical Floor Plan' },
    { src: '/building-elevation.jpg',  alt: 'Park 2.0 Phase 2 Residential Tower Front Elevation – Premium High-Rise Apartments in Shahad Mumbai with Modern Architecture and Balconies', label: 'Building Elevation' },
    { src: '/aerial-view.jpg',         alt: 'Park 2.0 Phase 2 Aerial Bird Eye View – Luxury Housing Project in Shahad Mumbai with Sports Court Children Play Area Landscaped Gardens and Parking', label: 'Aerial Site View' },
  ];

  const bhk2Images = [
    { src: '/2bhk-plan.jpg',           alt: '2 BHK Apartment Floor Plan Layout at Park 2.0 Phase 2 Shahad Kalyan – 650 to 720 sq ft Vastu Compliant Design with Master Bedroom Second Bedroom Kitchen Living Room and Patio', label: '2 BHK Floor Plan' },
    { src: '/typical-floor-plan.jpg',  alt: 'Park 2.0 Phase 2 Typical Floor Plan Drawing with Room Dimensions – 1 BHK and 2 BHK Apartment Layouts Showing All Unit Configurations on Each Floor', label: 'Typical Floor Plan' },
    { src: '/building-elevation.jpg',  alt: 'Park 2.0 Phase 2 Residential Tower Front Elevation – Premium High-Rise Apartments in Shahad Mumbai with Modern Architecture and Balconies', label: 'Building Elevation' },
    { src: '/aerial-view.jpg',         alt: 'Park 2.0 Phase 2 Aerial Bird Eye View – Luxury Housing Project in Shahad Mumbai with Sports Court Children Play Area Landscaped Gardens and Parking', label: 'Aerial Site View' },
  ];

  // Keyboard navigation for floor plan gallery
  useEffect(() => {
    if (!floorPlanGallery) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setFloorPlanGallery(null); }
      else if (e.key === 'ArrowRight') { setFloorPlanGallery(prev => prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null); }
      else if (e.key === 'ArrowLeft') { setFloorPlanGallery(prev => prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [floorPlanGallery]);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const toggleService = (key: string) => setExpandedService((prev) => (prev === key ? null : key));

  // Autoplay: advance slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);


  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    email: "",
    project: "Park 2.0 Phase 2",
    date: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let newValue = value;
    
    if (name === "phone") {
      // Keep only digits and slice to exactly 10
      newValue = newValue.replace(/\D/g, '').slice(0, 10);
    }
    
    if (name === "email") {
      // Remove all spaces
      newValue = newValue.replace(/\s/g, '');
    }
    
    setContactData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contactData.phone.length < 10) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setContactStatus("submitting");

    try {
      const formBody = new FormData();
      Object.keys(contactData).forEach((key) => formBody.append(key, contactData[key as keyof typeof contactData]));

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formBody,
        mode: "no-cors",
      });

      // When using no-cors, the response is opaque, so we assume success if no network error is thrown.
      setContactStatus("success");
      setContactData({ name: "", phone: "", email: "", project: "Park 2.0 Phase 2", date: "", message: "" });
    } catch (error) {
      console.error("Contact Form submit error:", error);
      setContactStatus("error");
    }
  };

  return (
    <div>
      {isModalOpen && <BookingModal onClose={() => setIsModalOpen(false)} />}
      <div className="bg-neutral-950 text-neutral-50 w-full min-h-screen overflow-x-hidden">
        {/* Global RealEstateAgent Schema for GEO & SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Vardhaman Developers",
          "image": "https://vardhamanpark.com/logo.png",
          "@id": "https://vardhamanpark.com",
          "url": "https://vardhamanpark.com",
          "telephone": "+911234567890",
          "priceRange": "$$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Park 2.0 Phase 2, Dhakate Shahad",
            "addressLocality": "Kalyan",
            "addressRegion": "Maharashtra",
            "postalCode": "421103",
            "addressCountry": "IN"
          }
        })}} />
        <header className="fixed left-0 right-0 top-0 z-50 w-full px-4 py-3 sm:px-8">
          <div className="max-w-[1180px] flex mx-auto px-5 sm:px-8 justify-between items-center h-16 rounded-[2rem] border border-white/15 bg-neutral-950/95 md:bg-neutral-950/55 shadow-[0_18px_50px_rgba(0,0,0,0.35)] md:backdrop-blur-xl">
            <a href="#home" className="flex items-center shrink-0 gap-[11px] -ml-1 animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both">
              <img
                src={vardhamanCrest}
                alt="Park 2.0 Phase 2"
                className="h-9 w-auto object-contain"
                decoding="async"
              />
              <span className="font-serif font-semibold text-white text-base sm:text-lg tracking-[1.5px] uppercase mt-0.5 whitespace-nowrap">
                Vardhaman Park
              </span>
            </a>
            <nav className="hidden xl:flex justify-center items-center gap-1 xl:gap-2 xl:ml-auto xl:mr-6">
              <a href="#home" className="text-white/90 text-sm leading-5 px-3 inline-flex items-center hover:text-white hover:bg-white/10 rounded-full py-2 transition-colors animate-in fade-in slide-in-from-top-2 duration-500 delay-75 fill-mode-both">
                Home
              </a>
              <a href="#about" className="text-white/80 text-sm leading-5 px-3 inline-flex items-center hover:text-white hover:bg-white/10 rounded-full py-2 transition-colors animate-in fade-in slide-in-from-top-2 duration-500 delay-100 fill-mode-both">
                About
              </a>
              <a href="#highlights" className="text-white/80 text-sm leading-5 px-3 inline-flex items-center hover:text-white hover:bg-white/10 rounded-full py-2 transition-colors animate-in fade-in slide-in-from-top-2 duration-500 delay-150 fill-mode-both">
                Highlights
              </a>
              <a href="#lifestyle" className="text-white/80 text-sm leading-5 px-3 inline-flex items-center hover:text-white hover:bg-white/10 rounded-full py-2 transition-colors animate-in fade-in slide-in-from-top-2 duration-500 delay-200 fill-mode-both">
                Lifestyle
              </a>
              <a href="#floor-plans" className="text-white/80 text-sm leading-5 px-3 inline-flex items-center hover:text-white hover:bg-white/10 rounded-full py-2 transition-colors animate-in fade-in slide-in-from-top-2 duration-500 delay-250 fill-mode-both">
                Plans
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
            <div className="hidden xl:flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-500 delay-1000 fill-mode-both">
              <Button className="rounded-full bg-white text-[#101010] hover:bg-white/90 px-5 gap-2" onClick={() => setIsModalOpen(true)}>
                <CalendarCheck className="size-4" />
                Book Visit
              </Button>
            </div>
            
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex xl:hidden p-2 text-neutral-50 hover:bg-white/10 rounded-full transition-colors border-0 bg-transparent cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-neutral-950/95 border border-white/15 backdrop-blur-xl fixed top-22 left-4 right-4 z-40 rounded-2xl py-6 px-6 flex flex-col gap-4">
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
              href="#highlights"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#a1a1a1] text-base font-medium py-2 border-b border-neutral-850 hover:text-neutral-50 flex items-center gap-2"
            >
              <Building2 className="size-5" />
              Highlights
            </a>
            <a
              href="#lifestyle"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#a1a1a1] text-base font-medium py-2 border-b border-neutral-850 hover:text-neutral-50 flex items-center gap-2"
            >
              <Sparkles className="size-5" />
              Lifestyle
            </a>
            <a
              href="#floor-plans"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#a1a1a1] text-base font-medium py-2 border-b border-neutral-850 hover:text-neutral-50 flex items-center gap-2"
            >
              <LayoutGrid className="size-5" />
              Plans
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
          {/* Crossfade background image slider – one image at a time */}
          <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ transform: 'translateZ(0)' }}>
            {heroImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Park 2.0 Phase 2 luxury residences ${i + 1}`}
                className={`hero-bg-slide${i === currentSlide ? ' active' : ''}`}
                decoding="async"
                loading={i === 0 ? undefined : "lazy"}
              />
            ))}
          </div>
          <div className="absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.48)_48%,rgba(0,0,0,0.32)_100%)]" />
          <div className="absolute inset-0 z-20 bg-black/20" />

          <div className="relative z-30 mx-auto flex min-h-[520px] max-w-[1180px] flex-col justify-start px-4 pb-4 pt-24 sm:min-h-[560px] sm:px-6 sm:pb-6 md:min-h-[600px] md:px-8 md:pb-8">
            <div className="max-w-[790px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 md:backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-both">
                <Star className="size-3.5 text-[#D4AF37]" />
                <span className="uppercase text-white/90 text-xs leading-4 tracking-[3px]">
                  Pre-Launch | RERA Approved
                </span>
              </div>
              <h1 className="mt-3 max-w-[780px] font-serif font-semibold text-white text-4xl leading-[1.05] sm:text-5xl md:text-6xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both">
                <span className="sr-only">Park 2.0 Phase 2 – Premium 1 & 2 BHK Homes in Shahad, Kalyan. </span>
                Discover Elevated Living at Park 2.0 Phase 2
              </h1>
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-6 text-white/80 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
                Explore premium residences crafted around green views, quiet luxury, and effortless city access.
              </p>
            </div>

            <div className="mt-[60px] w-full max-w-2xl rounded-2xl border border-white/15 bg-black/40 p-6 md:backdrop-blur-md animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both flex flex-col sm:flex-row gap-5 items-center">
              <div className="flex-1 text-white/90 text-center sm:text-left">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-1">Interested in this project?</h2>
                <p className="text-sm text-white/70">Get the latest pricing, floor plans, and brochure.</p>
              </div>
              <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto min-h-[56px] rounded-xl bg-[#D4AF37] px-8 text-[#0B0B0B] hover:bg-white transition-colors gap-2 font-bold text-base shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                <CalendarCheck className="size-5" />
                Get Pricing
              </Button>
            </div>

          </div>
        </section>
        {/* ── TRUST BAR ─────────────────────────────────────── */}
        <section className="bg-neutral-900 border-y border-solid border-[#D4AF37]/10 py-6 md:py-8 z-40 relative">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 items-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <FadeIn type="fade-up" delay={100} duration={600} className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0 first:pt-0">
                <ShieldCheck className="size-8 text-[#D4AF37] mb-3" />
                <h3 className="font-serif font-semibold text-neutral-50 text-lg">RERA Registered</h3>
                <p className="text-[#a1a1a1] text-xs mt-1">P517000XXXXX</p>
              </FadeIn>
              <FadeIn type="fade-up" delay={200} duration={600} className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0">
                <Award className="size-8 text-[#D4AF37] mb-3" />
                <h3 className="font-serif font-semibold text-neutral-50 text-lg">Award Winning</h3>
                <p className="text-[#a1a1a1] text-xs mt-1">Best Residential Project 2024</p>
              </FadeIn>
              <FadeIn type="fade-up" delay={300} duration={600} className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0">
                <Milestone className="size-8 text-[#D4AF37] mb-3" />
                <h3 className="font-serif font-semibold text-neutral-50 text-lg">18+ Years Legacy</h3>
                <p className="text-[#a1a1a1] text-xs mt-1">Delivering Excellence</p>
              </FadeIn>
            </div>
          </div>
        </section>
        <section id="about" className="max-w-[1180px] mx-auto px-6 sm:px-8 py-12">
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
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </FadeIn>
            <div className="flex flex-col">
              <FadeIn type="letter-expand" delay={100} duration={600}>
                <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] mb-4 items-center gap-2">
                  <span className="bg-[#D4AF37] w-8 h-px" />
                  About Park 2.0 Phase 2
                </div>
              </FadeIn>
              <FadeIn type="fade-up" delay={200} duration={800}>
                <h2 className="leading-tight font-serif font-semibold text-neutral-50 text-3xl md:text-4xl leading-10">
                  A Legacy of Elegance, Built for Generations
                </h2>
              </FadeIn>
              <FadeIn type="fade-up" delay={350} duration={800}>
                <p className="leading-relaxed text-[#a1a1a1] mt-5">
                  For over 18 years, Park 2.0 Phase 2 has redefined the art of
                  luxury living. Each residence is a testament to architectural
                  mastery — where timeless design meets modern innovation, and
                  every detail is crafted to perfection. Discover our <a href="#project" className="text-[#D4AF37] hover:underline">premium amenities</a> and <a href="#floor-plans" className="text-[#D4AF37] hover:underline">thoughtfully designed floor plans</a> today.
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
<section id="highlights" className="relative py-12 overflow-hidden">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
              <div className="flex flex-col">
                <FadeIn type="letter-expand" delay={100} duration={600}>
                  <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] mb-4 items-center gap-2">
                    <span className="bg-[#D4AF37] w-8 h-px" />
                    Why Choose Us
                  </div>
                </FadeIn>
                <FadeIn type="fade-up" delay={200} duration={800}>
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
                  alt="Park 2.0 Phase 2 Building"
                  className="object-cover w-full h-72 sm:h-115"
                  src={vardhamanBuilding}
                  loading="lazy"
                  decoding="async"
                />
              </FadeIn>
            </div>
          </div>
        </section>
{/* ── PROJECT HIGHLIGHTS ───────────────────────────────── */}
        <section id="project" className="border-y border-solid border-[#D4AF37]/10 bg-neutral-900/30 py-12">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex flex-col items-center mb-8">
              <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
                <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                  <span className="bg-[#D4AF37] w-8 h-px" />
                  Project Highlights
                  <span className="bg-[#D4AF37] w-8 h-px" />
                </div>
              </FadeIn>
              <FadeIn type="fade-up" delay={200} duration={800} className="text-center mt-3">
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
                <section className="border-y border-solid border-[#D4AF37]/10 bg-neutral-900/30 py-12">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex flex-col items-center mb-8">
              <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
                <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                  <span className="bg-[#D4AF37] w-8 h-px" />
                  Master Plan
                  <span className="bg-[#D4AF37] w-8 h-px" />
                </div>
              </FadeIn>
              <FadeIn type="fade-up" delay={200} duration={800} className="text-center mt-3">
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
                  loading="lazy"
                  decoding="async"
                />
                <div className="bg-[#0b0b0b]/50 absolute inset-0" />
                <div className="left-[28%] top-[35%] flex absolute items-center gap-2">
                  <span className="size-4 animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.8)] rounded-full bg-[#D4AF37] flex justify-center items-center" />
                  <span className="rounded-full bg-neutral-900 md:bg-neutral-900/80 md:backdrop-blur-md text-neutral-50 text-xs leading-4 border border-solid border-[#D4AF37]/40 px-3 py-1">
                    Tower A
                  </span>
                </div>
                <div className="left-[60%] top-[55%] flex absolute items-center gap-2">
                  <span className="size-4 animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.8)] rounded-full bg-[#D4AF37] flex justify-center items-center" />
                  <span className="rounded-full bg-neutral-900 md:bg-neutral-900/80 md:backdrop-blur-md text-neutral-50 text-xs leading-4 border border-solid border-[#D4AF37]/40 px-3 py-1">
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
        </section>
        <section id="lifestyle" className="max-w-[1180px] mx-auto px-6 sm:px-8 py-12">
          <div className="flex flex-col items-center mb-8">
            <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
              <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                <span className="bg-[#D4AF37] w-8 h-px" />
                World-Class Amenities
                <span className="bg-[#D4AF37] w-8 h-px" />
              </div>
            </FadeIn>
            <FadeIn type="fade-up" delay={200} duration={800} className="text-center mt-3">
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
                  loading="lazy"
                  decoding="async"
                />
                <div className="bg-[#0b0b0b]/30 absolute inset-0 transition-all duration-300 group-hover:bg-[#0b0b0b]/10" />
                <div className="flex absolute left-5 bottom-5 items-center gap-2 bg-[#0b0b0b] md:bg-[#0b0b0b]/60 md:backdrop-blur-md border border-[#D4AF37]/20 rounded-xl px-4 py-2">
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
                  loading="lazy"
                  decoding="async"
                />
                <div className="bg-[#0b0b0b]/30 absolute inset-0 transition-all duration-300 group-hover:bg-[#0b0b0b]/10" />
                <div className="flex absolute left-5 bottom-5 items-center gap-2 bg-[#0b0b0b] md:bg-[#0b0b0b]/60 md:backdrop-blur-md border border-[#D4AF37]/20 rounded-xl px-4 py-2">
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
                  loading="lazy"
                  decoding="async"
                />
                <div className="bg-[#0b0b0b]/30 absolute inset-0 transition-all duration-300 group-hover:bg-[#0b0b0b]/10" />
                <div className="flex absolute left-5 bottom-5 items-center gap-2 bg-[#0b0b0b] md:bg-[#0b0b0b]/60 md:backdrop-blur-md border border-[#D4AF37]/20 rounded-xl px-4 py-2">
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
                  loading="lazy"
                  decoding="async"
                />
                <div className="bg-[#0b0b0b]/30 absolute inset-0 transition-all duration-300 group-hover:bg-[#0b0b0b]/10" />
                <div className="flex absolute left-5 bottom-5 items-center gap-2 bg-[#0b0b0b] md:bg-[#0b0b0b]/60 md:backdrop-blur-md border border-[#D4AF37]/20 rounded-xl px-4 py-2">
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
        {/* ── OUR SERVICES ─────────────────────────────────────── */}
        <section className="max-w-[1180px] mx-auto px-6 sm:px-8 py-12">
          <div className="flex flex-col items-center mb-8">
            <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
              <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                <span className="bg-[#D4AF37] w-8 h-px" />
                Our Services
                <span className="bg-[#D4AF37] w-8 h-px" />
              </div>
            </FadeIn>
            <FadeIn type="fade-up" delay={200} duration={800} className="text-center mt-3">
              <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10">
                Lifestyle Curated for You
              </h2>
            </FadeIn>
            <FadeIn type="fade-up" delay={300} duration={600} className="text-center mt-4 max-w-xl">
              <p className="text-[#a1a1a1] leading-relaxed">
                An extraordinary collection of services designed to elevate every moment of your daily life at Park 2.0 Phase 2.
              </p>
            </FadeIn>
          </div>

          {/* Services Grid (2x2 Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

            {(([
              {
                key: "zen",
                icon: <Wind className="size-6 text-[#D4AF37]" />,
                title: "Zen Garden",
                desc: "A serene sanctuary for quiet contemplation and mindful relaxation.",
                subs: [
                  { icon: <Leaf className="size-5 text-[#D4AF37]" />, label: "Herbs & Spice Garden", desc: "Fresh aromatic herbs and spices grown in your community garden." },
                  { icon: <Trees className="size-5 text-[#D4AF37]" />, label: "Fruit Garden", desc: "Lush orchards brimming with seasonal fruits at your doorstep." },
                  { icon: <Flower2 className="size-5 text-[#D4AF37]" />, label: "Flower Garden", desc: "Vibrant blooms creating a breathtaking open landscape." },
                ],
              },
              {
                key: "pool",
                icon: <Waves className="size-6 text-[#D4AF37]" />,
                title: "Swimming Pool",
                desc: "A resort-style pool offering refreshing swims for all residents.",
                subs: [
                  { icon: <Baby className="size-5 text-[#D4AF37]" />, label: "Kids' Pool Area", desc: "A safe, fun-filled splash zone designed for the little ones." },
                  { icon: <Sparkles className="size-5 text-[#D4AF37]" />, label: "Badminton / Multi-Purpose Hall", desc: "A versatile sports hall for badminton, events, and gatherings." },
                ],
              },
              {
                key: "gym",
                icon: <Dumbbell className="size-6 text-[#D4AF37]" />,
                title: "Gym & Pilates",
                desc: "A fully-equipped gym with a dedicated pilates studio.",
                subs: [
                  { icon: <GraduationCap className="size-5 text-[#D4AF37]" />, label: "Yoga / Meditation Room", desc: "A tranquil space for yoga practice and spiritual wellness." },
                  { icon: <BookOpen className="size-5 text-[#D4AF37]" />, label: "Library", desc: "A curated collection in a quiet, elegant reading space." },
                  { icon: <Sunset className="size-5 text-[#D4AF37]" />, label: "Salon", desc: "Premium in-house grooming and beauty services." },
                ],
              },
              {
                key: "senior",
                icon: <Users className="size-6 text-[#D4AF37]" />,
                title: "Senior Citizen Fitness Area",
                desc: "Outdoor fitness stations designed for the health needs of seniors.",
                subs: [
                  { icon: <Swords className="size-5 text-[#D4AF37]" />, label: "Cards / Carrom Room", desc: "An indoor games room for social bonding and recreation." },
                  { icon: <Milestone className="size-5 text-[#D4AF37]" />, label: "Foot Reflexology Path", desc: "Therapeutic cobblestone paths for holistic wellness." },
                  { icon: <Footprints className="size-5 text-[#D4AF37]" />, label: "Nature Trail", desc: "Meandering pathways through lush greenery for daily strolls." },
                ],
              },
            ] as const)).map((card, i) => {
              const isOpen = expandedService === card.key;
              return (
                <div key={card.key} className={isOpen ? "col-span-full" : ""}>
                  {/* ── Main Card ── */}
                  <FadeIn type="scale-up" delay={80 * i} duration={600}>
                    <div
                      onClick={() => toggleService(card.key)}
                      className={`group cursor-pointer rounded-2xl bg-neutral-900/60 backdrop-blur-sm border border-solid p-6 md:p-8 flex gap-5 items-start shadow-md transition-all duration-500 ${
                        isOpen
                          ? "border-[#D4AF37]/55 shadow-[0_8px_30px_rgba(212,175,55,0.15)] bg-neutral-900"
                          : "border-[#D4AF37]/15 hover:border-[#D4AF37]/50 hover:bg-neutral-900 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(212,175,55,0.1)]"
                      }`}
                    >
                      <div className={`size-14 shrink-0 rounded-xl border border-solid flex justify-center items-center transition-all duration-500 ${isOpen ? "bg-[#D4AF37]/20 border-[#D4AF37]/40 scale-105" : "bg-[#D4AF37]/5 border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/15 group-hover:border-[#D4AF37]/40 group-hover:scale-110"}`}>
                        {card.icon}
                      </div>
                      <div className="flex flex-col gap-2 flex-1 min-w-0 pt-1">
                        <h3 className="font-serif font-semibold text-neutral-50 text-xl md:text-2xl leading-tight group-hover:text-[#D4AF37] transition-colors duration-300">{card.title}</h3>
                        <p className="text-[#a1a1a1] text-sm md:text-base leading-relaxed">{card.desc}</p>
                      </div>
                      <div className={`size-8 shrink-0 mt-1 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/5 flex justify-center items-center transition-all duration-500 group-hover:bg-[#D4AF37]/20 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                        <ChevronDown className="size-4 text-[#D4AF37]" />
                      </div>
                    </div>
                  </FadeIn>

                  {/* ── Sub-cards row (revealed on click) ── */}
                  {isOpen && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-3 duration-400">
                      {card.subs.map((sub, si) => (
                        <div
                          key={sub.label}
                          className="rounded-2xl bg-neutral-800/60 border border-solid border-[#D4AF37]/20 p-5 flex gap-4 items-start shadow-sm hover:border-[#D4AF37]/40 hover:bg-neutral-800 transition-all duration-300"
                          style={{ animationDelay: `${si * 60}ms` }}
                        >
                          <div className="size-10 shrink-0 rounded-xl bg-[#D4AF37]/10 border border-solid border-[#D4AF37]/25 flex justify-center items-center">
                            {sub.icon}
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="font-serif font-semibold text-neutral-100 text-base leading-5">{sub.label}</h3>
                            <p className="text-[#a1a1a1] text-sm leading-5">{sub.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

                {/* Floor Plans Section — SEO semantic section with proper heading hierarchy, structured data for AEO/GEO */}
            <section id="floor-plans" aria-labelledby="floor-plans-heading" className="max-w-[1180px] mx-auto px-6 sm:px-8 pt-4 pb-12">
              {/* JSON-LD Structured Data for Floor Plans — improves AEO & GEO discoverability */}
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Park 2.0 Phase 2 Floor Plans – 1 BHK & 2 BHK Apartments Shahad Mumbai",
                "description": "Explore architect-designed, Vastu-compliant floor plans for luxury 1 BHK and 2 BHK apartments at Park 2.0 Phase 2, Shahad, Mumbai. View typical floor plans, building elevation, and aerial site views.",
                "numberOfItems": 2,
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "1 BHK Apartment Floor Plan – 425 to 475 sq ft",
                    "description": "Vastu-compliant 1 BHK apartment layout at Park 2.0 Phase 2 featuring bedroom, kitchen, living room, dining area and patio with carpet area ranging from 425 to 475 sq ft."
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "2 BHK Apartment Floor Plan – 650 to 720 sq ft",
                    "description": "Spacious Vastu-compliant 2 BHK apartment layout at Park 2.0 Phase 2 featuring master bedroom, second bedroom, kitchen, living room, dining area and patio with carpet area ranging from 650 to 720 sq ft."
                  }
                ]
              }) }} />

              <FadeIn type="letter-expand" delay={100} duration={600} className="text-center mb-3">
                <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                  <span className="bg-[#D4AF37] w-8 h-px" />
                  Floor Plans
                  <span className="bg-[#D4AF37] w-8 h-px" />
                </div>
              </FadeIn>
              <FadeIn type="fade-up" delay={150} duration={700} className="text-center mb-2">
                <h2 id="floor-plans-heading" className="font-serif font-semibold text-neutral-50 text-3xl md:text-4xl leading-tight">
                  1 BHK &amp; 2 BHK Floor Plans
                </h2>
              </FadeIn>
              <FadeIn type="fade-up" delay={200} duration={600} className="text-center mb-10">
                <p className="text-[#a1a1a1] text-sm max-w-2xl mx-auto leading-relaxed">
                  Explore Vastu-compliant, architect-designed floor plans for our 1 BHK (425–475 sq.ft.) and 2 BHK (650–720 sq.ft.) luxury apartments at Park 2.0 Phase 2, Shahad, Mumbai. View detailed layouts, building elevation, and aerial site views.
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
                {/* ── 1 BHK Floor Plan Card ── */}
                <FadeIn delay={200} duration={600}>
                  <article id="1bhk-floor-plan" aria-labelledby="1bhk-heading" className="h-full">
                    <Card className="group h-full transition-all duration-300 bg-neutral-900 border border-solid border-[#D4AF37]/15 p-4 flex flex-col gap-4 shadow-md hover:border-[#D4AF37]/45 hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)] overflow-hidden">
                      {/* Main preview image – click opens full gallery */}
                      <figure
                        className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black flex items-center justify-center cursor-pointer"
                        onClick={() => setFloorPlanGallery({ images: bhk1Images, index: 0 })}
                        role="button"
                        aria-label="View 1 BHK floor plan gallery with 4 high-resolution images"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFloorPlanGallery({ images: bhk1Images, index: 0 }); }}}
                      >
                        <img
                          src="/1bhk-plan.jpg"
                          alt="1 BHK Apartment Floor Plan Layout at Park 2.0 Phase 2 Shahad Kalyan – 425 to 475 sq ft Vastu Compliant Design"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          decoding="async"
                          width="800"
                          height="600"
                        />
                        {/* Hover overlay with image count badge */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 rounded-lg">
                          <ZoomIn className="text-[#D4AF37] size-10 drop-shadow-lg" />
                          <span className="text-white text-xs font-semibold bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3 py-1 rounded-full backdrop-blur-sm">
                            {bhk1Images.length} Photos
                          </span>
                        </div>
                        <figcaption className="sr-only">1 BHK apartment floor plan showing room layout and dimensions at Park 2.0 Phase 2</figcaption>
                      </figure>

                      {/* Inline thumbnail gallery grid – 3 additional images */}
                      <div className="grid grid-cols-3 gap-2" role="list" aria-label="1 BHK gallery thumbnails">
                        {bhk1Images.slice(1).map((img, i) => (
                          <button
                            key={img.src + '-thumb-' + i}
                            onClick={() => setFloorPlanGallery({ images: bhk1Images, index: i + 1 })}
                            className="relative aspect-[4/3] rounded-md overflow-hidden border border-neutral-700 hover:border-[#D4AF37]/60 transition-all duration-300 cursor-pointer group/thumb bg-black"
                            aria-label={`View ${img.label} – Image ${i + 2} of ${bhk1Images.length}`}
                            role="listitem"
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                              loading="lazy"
                              decoding="async"
                              width="400"
                              height="300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-1.5">
                              <span className="text-white text-[10px] font-medium tracking-wide">{img.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      <CardHeader className="p-0 text-center">
                        <CardTitle className="font-serif text-neutral-50 text-2xl">
                          <h3 id="1bhk-heading" className="font-serif font-semibold text-neutral-50 text-2xl m-0">1 BHK Configuration</h3>
                        </CardTitle>
                        <p className="text-[#a1a1a1] text-sm mt-1">Carpet Area: 425 – 475 sq.ft. | Vastu Compliant</p>
                        <p className="text-[#a1a1a1]/60 text-xs mt-2 leading-relaxed">
                          Thoughtfully designed 1 BHK apartments featuring a spacious bedroom, modern kitchen, well-lit living room, dining area, and private patio — ideal for couples and young professionals in Shahad, Kalyan.
                        </p>
                      </CardHeader>
                      <CardContent className="p-0 flex justify-center mt-2">
                        <button
                          id="btn-view-1bhk-gallery"
                          onClick={() => setFloorPlanGallery({ images: bhk1Images, index: 0 })}
                          className="bg-[#D4AF37] hover:bg-[#b5952f] text-neutral-950 font-semibold py-2.5 px-6 rounded-full transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
                        >
                          <Eye className="size-4" />
                          View All Plans
                        </button>
                      </CardContent>
                    </Card>
                  </article>
                </FadeIn>

                {/* ── 2 BHK Floor Plan Card ── */}
                <FadeIn delay={300} duration={600}>
                  <article id="2bhk-floor-plan" aria-labelledby="2bhk-heading" className="h-full">
                    <Card className="group h-full transition-all duration-300 bg-neutral-900 border border-solid border-[#D4AF37]/15 p-4 flex flex-col gap-4 shadow-md hover:border-[#D4AF37]/45 hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)] overflow-hidden">
                      {/* Main preview image – click opens full gallery */}
                      <figure
                        className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black flex items-center justify-center cursor-pointer"
                        onClick={() => setFloorPlanGallery({ images: bhk2Images, index: 0 })}
                        role="button"
                        aria-label="View 2 BHK floor plan gallery with 4 high-resolution images"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFloorPlanGallery({ images: bhk2Images, index: 0 }); }}}
                      >
                        <img
                          src="/2bhk-plan.jpg"
                          alt="2 BHK Apartment Floor Plan Layout at Park 2.0 Phase 2 Shahad Kalyan – 650 to 720 sq ft Vastu Compliant Design"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          decoding="async"
                          width="800"
                          height="600"
                        />
                        {/* Hover overlay with image count badge */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 rounded-lg">
                          <ZoomIn className="text-[#D4AF37] size-10 drop-shadow-lg" />
                          <span className="text-white text-xs font-semibold bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3 py-1 rounded-full backdrop-blur-sm">
                            {bhk2Images.length} Photos
                          </span>
                        </div>
                        <figcaption className="sr-only">2 BHK apartment floor plan showing room layout and dimensions at Park 2.0 Phase 2</figcaption>
                      </figure>

                      {/* Inline thumbnail gallery grid – 3 additional images */}
                      <div className="grid grid-cols-3 gap-2" role="list" aria-label="2 BHK gallery thumbnails">
                        {bhk2Images.slice(1).map((img, i) => (
                          <button
                            key={img.src + '-thumb-' + i}
                            onClick={() => setFloorPlanGallery({ images: bhk2Images, index: i + 1 })}
                            className="relative aspect-[4/3] rounded-md overflow-hidden border border-neutral-700 hover:border-[#D4AF37]/60 transition-all duration-300 cursor-pointer group/thumb bg-black"
                            aria-label={`View ${img.label} – Image ${i + 2} of ${bhk2Images.length}`}
                            role="listitem"
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                              loading="lazy"
                              decoding="async"
                              width="400"
                              height="300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-1.5">
                              <span className="text-white text-[10px] font-medium tracking-wide">{img.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      <CardHeader className="p-0 text-center">
                        <CardTitle className="font-serif text-neutral-50 text-2xl">
                          <h3 id="2bhk-heading" className="font-serif font-semibold text-neutral-50 text-2xl m-0">2 BHK Configuration</h3>
                        </CardTitle>
                        <p className="text-[#a1a1a1] text-sm mt-1">Carpet Area: 650 – 720 sq.ft. | Vastu Compliant</p>
                        <p className="text-[#a1a1a1]/60 text-xs mt-2 leading-relaxed">
                          Spacious 2 BHK apartments with master bedroom, second bedroom, modern kitchen, generous living and dining area, and private patio — perfect for growing families seeking premium living in Shahad, Kalyan.
                        </p>
                      </CardHeader>
                      <CardContent className="p-0 flex justify-center mt-2">
                        <button
                          id="btn-view-2bhk-gallery"
                          onClick={() => setFloorPlanGallery({ images: bhk2Images, index: 0 })}
                          className="bg-[#D4AF37] hover:bg-[#b5952f] text-neutral-950 font-semibold py-2.5 px-6 rounded-full transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
                        >
                          <Eye className="size-4" />
                          View All Plans
                        </button>
                      </CardContent>
                    </Card>
                  </article>
                </FadeIn>
              </div>

              {/* AEO/GEO — Premium Interactive FAQ block for answer engines */}
              <FadeIn type="fade-up" delay={400} duration={600} className="mt-16 w-full">
                <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-[#D4AF37]/30 to-transparent">
                  <div className="bg-neutral-950/80 backdrop-blur-md rounded-2xl p-8 sm:p-10">
                    <div className="flex items-center justify-center gap-4 mb-10">
                      <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/60"></span>
                      <h3 className="font-serif text-neutral-50 text-2xl md:text-3xl font-semibold text-center tracking-wide">
                        Floor Plan Insights
                      </h3>
                      <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/60"></span>
                    </div>
                    
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div className="group bg-neutral-900/40 hover:bg-neutral-900/80 border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-500 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1">
                        <dt className="text-neutral-50 font-serif font-medium text-lg mb-3 flex items-start gap-3 group-hover:text-[#D4AF37] transition-colors">
                          <span className="text-[#D4AF37] opacity-60 mt-0.5">01.</span>
                          1 BHK Carpet Area
                        </dt>
                        <dd className="text-[#a1a1a1] leading-relaxed pl-8">
                          The 1 BHK apartments at Park 2.0 Phase 2, Shahad range from <strong className="text-neutral-200 font-medium">425 to 475 sq.ft.</strong> carpet area. Each unit includes a bedroom, kitchen, living room, dining area, and a private patio with a Vastu-compliant layout.
                        </dd>
                      </div>

                      <div className="group bg-neutral-900/40 hover:bg-neutral-900/80 border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-500 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1">
                        <dt className="text-neutral-50 font-serif font-medium text-lg mb-3 flex items-start gap-3 group-hover:text-[#D4AF37] transition-colors">
                          <span className="text-[#D4AF37] opacity-60 mt-0.5">02.</span>
                          2 BHK Carpet Area
                        </dt>
                        <dd className="text-[#a1a1a1] leading-relaxed pl-8">
                          The 2 BHK apartments at Park 2.0 Phase 2, Shahad range from <strong className="text-neutral-200 font-medium">650 to 720 sq.ft.</strong> carpet area. Each unit includes a master bedroom, second bedroom, kitchen, spacious living and dining area, and a private patio.
                        </dd>
                      </div>

                      <div className="group bg-neutral-900/40 hover:bg-neutral-900/80 border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-500 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 md:col-span-2">
                        <dt className="text-neutral-50 font-serif font-medium text-lg mb-3 flex items-start gap-3 group-hover:text-[#D4AF37] transition-colors">
                          <span className="text-[#D4AF37] opacity-60 mt-0.5">03.</span>
                          Vastu Compliance
                        </dt>
                        <dd className="text-[#a1a1a1] leading-relaxed pl-8">
                          Yes, all 1 BHK and 2 BHK apartments at Park 2.0 Phase 2 are meticulously designed with Vastu-compliant orientations, ensuring positive energy flow, abundant natural light, and optimal cross-ventilation for a harmonious lifestyle.
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </FadeIn>
            </section>
        <section id="gallery" className="border-y border-solid border-[#D4AF37]/10 bg-neutral-900/30 py-12">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex flex-col items-center mb-8">
              <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
                <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                  <span className="bg-[#D4AF37] w-8 h-px" />
                  Gallery
                  <span className="bg-[#D4AF37] w-8 h-px" />
                </div>
              </FadeIn>
              <FadeIn type="fade-up" delay={200} duration={800} className="text-center mt-3">
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
                          decoding="async"
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
                              <h3 className="text-neutral-50 font-serif font-semibold text-lg leading-6">
                                {item.title}
                              </h3>
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

          {/* ── Floor Plan Gallery Lightbox ───────────────────────── */}
          {floorPlanGallery !== null && (() => {
            const { images, index } = floorPlanGallery;
            const current = images[index];
            const total = images.length;
            const goPrev = (e: React.MouseEvent) => { e.stopPropagation(); setFloorPlanGallery(prev => prev ? { ...prev, index: (prev.index - 1 + total) % total } : null); };
            const goNext = (e: React.MouseEvent) => { e.stopPropagation(); setFloorPlanGallery(prev => prev ? { ...prev, index: (prev.index + 1) % total } : null); };
            return (
              <div
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/97 backdrop-blur-xl"
                onClick={() => setFloorPlanGallery(null)}
                role="dialog"
                aria-modal="true"
                aria-label="Floor Plan Gallery"
              >
                {/* Close */}
                <button
                  onClick={(e) => { e.stopPropagation(); setFloorPlanGallery(null); }}
                  className="absolute top-5 right-5 z-[70] p-2 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-400 hover:text-white hover:border-[#D4AF37]/50 transition-all cursor-pointer"
                  aria-label="Close gallery"
                >
                  <X className="size-6" />
                </button>

                {/* Image counter */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[70] px-4 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 text-sm font-medium">
                  {index + 1} / {total}
                </div>

                {/* Prev button */}
                <button
                  onClick={goPrev}
                  className="absolute left-3 sm:left-6 z-[70] p-3 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-400 hover:text-white hover:border-[#D4AF37]/50 transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-7" />
                </button>

                {/* Next button */}
                <button
                  onClick={goNext}
                  className="absolute right-3 sm:right-6 z-[70] p-3 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-400 hover:text-white hover:border-[#D4AF37]/50 transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="size-7" />
                </button>

                {/* Main image */}
                <div
                  className="flex flex-col items-center gap-4 max-w-[90vw] select-none px-14"
                  onClick={(e) => e.stopPropagation()}
                >
                  <figure className="flex flex-col items-center gap-3">
                    <img
                      key={current.src}
                      src={current.src}
                      alt={current.alt}
                      className="max-h-[65vh] max-w-full object-contain rounded-xl border border-[#D4AF37]/20 shadow-[0_0_60px_rgba(212,175,55,0.1)] animate-in fade-in duration-300"
                      decoding="async"
                      loading="eager"
                    />
                    <figcaption className="text-center">
                      <p className="text-[#D4AF37] text-xs uppercase tracking-[3px] font-medium">{current.label}</p>
                    </figcaption>
                  </figure>

                  {/* Thumbnail strip */}
                  <div className="flex gap-2 flex-wrap justify-center mt-1">
                    {images.map((img, i) => (
                      <button
                        key={img.src + i}
                        onClick={(e) => { e.stopPropagation(); setFloorPlanGallery(prev => prev ? { ...prev, index: i } : null); }}
                        className={`relative w-14 h-10 sm:w-18 sm:h-12 rounded-md overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                          i === index
                            ? 'border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)] scale-105'
                            : 'border-neutral-700 hover:border-[#D4AF37]/50 opacity-60 hover:opacity-100'
                        }`}
                        aria-label={`View image ${i + 1}: ${img.label}`}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Keyboard hint */}
                  <p className="text-neutral-600 text-xs hidden sm:block">Use ← → arrow keys to navigate · Esc to close</p>
                </div>
              </div>
            );
          })()}

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
                  decoding="async"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-neutral-50 font-serif font-semibold text-xl">
                    {galleryItems[lightboxIndex].title}
                  </h3>
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
        {/* ── TESTIMONIALS ───────────────────────────────────────── */}
        <section id="testimonials" className="border-y border-solid border-[#D4AF37]/10 bg-neutral-900/30 pt-12 pb-4">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8">
            <div className="flex flex-col items-center mb-8">
              <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
                <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                  <span className="bg-[#D4AF37] w-8 h-px" />
                  Testimonials
                  <span className="bg-[#D4AF37] w-8 h-px" />
                </div>
              </FadeIn>
              <FadeIn type="fade-up" delay={200} duration={800} className="text-center mt-3">
                <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10">
                  Hear From Our Residents
                </h2>
              </FadeIn>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Rahul Deshmukh", text: "The quality of construction and attention to detail is truly exceptional. We found our dream home.", role: "Homeowner" },
                { name: "Priya Sharma", text: "From booking to possession, the process was seamless. The amenities are world-class and perfect for my family.", role: "Resident" },
                { name: "Anand Patil", text: "Investing in Park 2.0 Phase 2 was the best decision. The connectivity and luxury lifestyle offered here are unmatched.", role: "Investor" }
              ].map((t, i) => (
                <FadeIn key={i} delay={300 + i * 150} type="fade-up" className="h-full">
                  <Card className="bg-neutral-800/40 border border-solid border-[#D4AF37]/10 p-6 h-full flex flex-col justify-between hover:border-[#D4AF37]/30 transition-colors">
                    <p className="text-[#a1a1a1] italic text-sm leading-relaxed">"{t.text}"</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="size-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-serif font-bold">{t.name[0]}</div>
                      <div>
                        <p className="text-neutral-50 font-semibold text-sm">{t.name}</p>
                        <p className="text-[#D4AF37] text-xs">{t.role}</p>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
        <section id="location" className="max-w-[1180px] mx-auto px-6 sm:px-8 pt-4 pb-12" itemScope itemType="https://schema.org/Place">
          <div className="flex flex-col items-center mb-8">
            <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
              <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                <span className="bg-[#D4AF37] w-8 h-px" />
                Location Advantage
                <span className="bg-[#D4AF37] w-8 h-px" />
              </div>
            </FadeIn>
            <FadeIn type="fade-up" delay={200} duration={800} className="text-center mt-3">
              <h2 className="font-serif font-semibold text-neutral-50 text-3xl md:text-4xl leading-10">
                Connected to Everything That Matters
              </h2>
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {/* 1. Railway Station */}
            <FadeIn type="scale-up" delay={100} duration={500}>
              <div 
                className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-4 hover:border-[#D4AF37]/50 hover:bg-neutral-800 transition-all duration-300 h-full shadow-lg group"
                itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification"
              >
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors">
                  <TrainFront className="size-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-50 text-sm md:text-base leading-5" itemProp="name">
                    Shahad Railway Station
                  </p>
                  <p className="text-[#a1a1a1] text-xs md:text-sm leading-4 mt-1" itemProp="value">
                    5 min walk (~200m)
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* 2. Schools */}
            <FadeIn type="scale-up" delay={150} duration={500}>
              <div 
                className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-4 hover:border-[#D4AF37]/50 hover:bg-neutral-800 transition-all duration-300 h-full shadow-lg group"
                itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification"
              >
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors">
                  <GraduationCap className="size-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-50 text-sm md:text-base leading-5" itemProp="name">
                    Schools & Colleges
                  </p>
                  <p className="text-[#a1a1a1] text-xs md:text-sm leading-4 mt-1" itemProp="value">
                    Nearby
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* 3. Bus Stops */}
            <FadeIn type="scale-up" delay={200} duration={500}>
              <div 
                className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-4 hover:border-[#D4AF37]/50 hover:bg-neutral-800 transition-all duration-300 h-full shadow-lg group"
                itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification"
              >
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors">
                  <BusFront className="size-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-50 text-sm md:text-base leading-5" itemProp="name">
                    Two Bus Stops
                  </p>
                  <p className="text-[#a1a1a1] text-xs md:text-sm leading-4 mt-1" itemProp="value">
                    Nearby
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* 4. D-Mart */}
            <FadeIn type="scale-up" delay={250} duration={500}>
              <div 
                className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-4 hover:border-[#D4AF37]/50 hover:bg-neutral-800 transition-all duration-300 h-full shadow-lg group"
                itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification"
              >
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors">
                  <ShoppingCart className="size-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-50 text-sm md:text-base leading-5" itemProp="name">
                    D-Mart
                  </p>
                  <p className="text-[#a1a1a1] text-xs md:text-sm leading-4 mt-1" itemProp="value">
                    Nearby
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* 5. Patel Mart & Super Mart */}
            <FadeIn type="scale-up" delay={300} duration={500}>
              <div 
                className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-4 hover:border-[#D4AF37]/50 hover:bg-neutral-800 transition-all duration-300 h-full shadow-lg group"
                itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification"
              >
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors">
                  <Store className="size-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-50 text-sm md:text-base leading-5" itemProp="name">
                    Patel Mart & Super Mart
                  </p>
                  <p className="text-[#a1a1a1] text-xs md:text-sm leading-4 mt-1" itemProp="value">
                    Nearby
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* 6. Hospitals */}
            <FadeIn type="scale-up" delay={350} duration={500}>
              <div 
                className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-4 hover:border-[#D4AF37]/50 hover:bg-neutral-800 transition-all duration-300 h-full shadow-lg group"
                itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification"
              >
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors">
                  <Hospital className="size-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-50 text-sm md:text-base leading-5" itemProp="name">
                    Hospitals
                  </p>
                  <p className="text-[#a1a1a1] text-xs md:text-sm leading-4 mt-1" itemProp="value">
                    Nearby
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* 7. Temple */}
            <FadeIn type="scale-up" delay={400} duration={500}>
              <div 
                className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-4 hover:border-[#D4AF37]/50 hover:bg-neutral-800 transition-all duration-300 h-full shadow-lg group"
                itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification"
              >
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors">
                  <MapPin className="size-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-50 text-sm md:text-base leading-5" itemProp="name">
                    Temple
                  </p>
                  <p className="text-[#a1a1a1] text-xs md:text-sm leading-4 mt-1" itemProp="value">
                    Nearby
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* 8. Local Market */}
            <FadeIn type="scale-up" delay={450} duration={500}>
              <div 
                className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-4 hover:border-[#D4AF37]/50 hover:bg-neutral-800 transition-all duration-300 h-full shadow-lg group"
                itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification"
              >
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors">
                  <ShoppingBag className="size-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-50 text-sm md:text-base leading-5" itemProp="name">
                    Local Market
                  </p>
                  <p className="text-[#a1a1a1] text-xs md:text-sm leading-4 mt-1" itemProp="value">
                    Nearby
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* 9. Vegetarian Hotels */}
            <FadeIn type="scale-up" delay={500} duration={500}>
              <div 
                className="rounded-xl bg-neutral-900 border border-solid border-[#D4AF37]/15 flex p-4 items-center gap-4 hover:border-[#D4AF37]/50 hover:bg-neutral-800 transition-all duration-300 h-full shadow-lg group"
                itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification"
              >
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors">
                  <Utensils className="size-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-50 text-sm md:text-base leading-5" itemProp="name">
                    Veg Hotels & Restaurants
                  </p>
                  <p className="text-[#a1a1a1] text-xs md:text-sm leading-4 mt-1" itemProp="value">
                    Nearby
                  </p>
                </div>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────── */}
        <FAQ />

        <section id="contact" className="max-w-[1180px] mx-auto px-6 sm:px-8 py-12">
          <div className="flex flex-col items-center mb-8">
            <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
              <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
                <span className="bg-[#D4AF37] w-8 h-px" />
                Get In Touch
                <span className="bg-[#D4AF37] w-8 h-px" />
              </div>
            </FadeIn>
            <FadeIn type="fade-up" delay={200} duration={800} className="text-center mt-3">
              <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10">
                We'd Love to Hear From You
              </h2>
            </FadeIn>
            <FadeIn type="fade-up" delay={300} duration={800} className="text-center mt-3">
              <p className="text-[#a1a1a1] max-w-xl mx-auto text-sm leading-6">
                Reach out to our luxury consultants for pricing, site visits, or any queries about Park 2.0 Phase 2.
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
                    <p className="text-[#a1a1a1] text-sm leading-5">Park 2.0 Phase 2,<br />Dhakate Shahad, Shahad,<br />Kalyan, Maharashtra - 421103</p>
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
              <FadeIn type="fade-right" delay={450} duration={600}>
                <div className="rounded-2xl bg-neutral-900 border border-[#D4AF37]/20 p-6 flex items-start gap-4 h-full">
                  <div className="size-12 shrink-0 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                    <Users className="size-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-neutral-50 text-base mb-2">Follow Us</p>
                    <div className="flex items-center gap-4">
                      <a href="https://www.instagram.com/vardhamanpark/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram" className="text-[#a1a1a1] hover:text-[#D4AF37] transition-colors">
                        <Instagram className="size-5" />
                      </a>
                      <a href="https://www.facebook.com/profile.php?id=61589541251624" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook" className="text-[#a1a1a1] hover:text-[#D4AF37] transition-colors">
                        <Facebook className="size-5" />
                      </a>
                      <a href="https://www.youtube.com/@VardhamanDevelopers" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube" className="text-[#a1a1a1] hover:text-[#D4AF37] transition-colors">
                        <Youtube className="size-5" />
                      </a>
                      <a href="https://www.linkedin.com/in/vardhaman-developers-bb374040b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className="text-[#a1a1a1] hover:text-[#D4AF37] transition-colors">
                        <Linkedin className="size-5" />
                      </a>
                    </div>
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
                        maxLength={10}
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
                      maxLength={1000}
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
        <Footer setIsModalOpen={setIsModalOpen} />

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/919876543210" 
          target="_blank" 
          rel="noreferrer"
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center size-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300"
          aria-label="Chat on WhatsApp"
        >
          <svg className="size-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
        </a>

        {/* 100% Safe Isolated AI Summary for GEO */}
        <GeoSummary />
      </div>
    </div>
  );
}
