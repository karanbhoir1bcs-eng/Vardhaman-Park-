import { useState, useEffect } from "react";
import {
  Armchair,
  Award,
  Baby,
  Building,
  Building2,
  CalendarCheck,
  Car,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import vardhamanLogo from "@/assets/vardhaman-park-logo.png";
import luxuryFacade from "@/assets/luxury-facade.jpg";
import masterPlan from "@/assets/master-plan.jpg";
import heroBg1 from "@/assets/hero-1.jpg";
import heroBg2 from "@/assets/hero-2.jpg";
import heroBg3 from "@/assets/hero-3.jpg";

// Web3Forms Access Key. Get a free key at https://web3forms.com/ to receive submissions in your Gmail.
const WEB3FORMS_ACCESS_KEY = "c89693eb-c8df-4a6c-9419-f52ba6873523";

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
        className="relative z-10 w-full max-w-lg rounded-3xl bg-neutral-900 border border-[#D4AF37]/25 shadow-[0_25px_80px_rgba(0,0,0,0.8)] p-8"
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
            <div className="grid grid-cols-2 gap-4">
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

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    "https://images.unsplash.com/photo-1762838039677-d8dcb61ad942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlJTIwbmlnaHR8ZW58MXwwfHx8MTc4MDMwNzgxMHww&ixlib=rb-4.1.0&q=80&w=1600",
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
      <div className="bg-neutral-950 text-neutral-50 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <header className="sticky z-50 backdrop-blur-xl bg-neutral-950/70 border-[#D4AF37]/20 border-t-0 border-r-0 border-b-1 border-l-0 border-solid top-0 w-full">
          <div className="max-w-[1140px] flex mx-auto px-8 justify-between items-center h-20">
            <a href="#home" className="flex items-center">
              <img
                src={vardhamanLogo}
                alt="Vardhaman Park"
                className="h-10 w-auto object-contain"
              />
            </a>
            <nav className="flex justify-center items-center gap-1">
              <a href="#home" className="text-[#D4AF37] text-sm leading-5 px-3 gap-2 inline-flex items-center hover:bg-neutral-800/50 rounded-md py-2 transition-colors">
                <Home className="size-4" />
                Home
              </a>
              <a href="#about" className="text-[#a1a1a1] text-sm leading-5 px-3 gap-2 inline-flex items-center hover:text-neutral-50 hover:bg-neutral-800/50 rounded-md py-2 transition-colors">
                <Info className="size-4" />
                About
              </a>
              <a href="#project" className="text-[#a1a1a1] text-sm leading-5 px-3 gap-2 inline-flex items-center hover:text-neutral-50 hover:bg-neutral-800/50 rounded-md py-2 transition-colors">
                <Building2 className="size-4" />
                Project
              </a>
              <a href="#amenities" className="text-[#a1a1a1] text-sm leading-5 px-3 gap-2 inline-flex items-center hover:text-neutral-50 hover:bg-neutral-800/50 rounded-md py-2 transition-colors">
                <Sparkles className="size-4" />
                Amenities
              </a>
              <a href="#gallery" className="text-[#a1a1a1] text-sm leading-5 px-3 gap-2 inline-flex items-center hover:text-neutral-50 hover:bg-neutral-800/50 rounded-md py-2 transition-colors">
                <Image className="size-4" />
                Gallery
              </a>
              <a href="#location" className="text-[#a1a1a1] text-sm leading-5 px-3 gap-2 inline-flex items-center hover:text-neutral-50 hover:bg-neutral-800/50 rounded-md py-2 transition-colors">
                <MapPin className="size-4" />
                Location
              </a>
              <a href="#contact" className="text-[#a1a1a1] text-sm leading-5 px-3 gap-2 inline-flex items-center hover:text-neutral-50 hover:bg-neutral-800/50 rounded-md py-2 transition-colors">
                <Phone className="size-4" />
                Contact
              </a>
            </nav>
            <Button className="shadow-[0_0_25px_rgba(212,175,55,0.4)] bg-[#D4AF37] text-[#0B0B0B] gap-2" onClick={() => setIsModalOpen(true)}>
              <CalendarCheck className="size-4" />
              Book Visit
            </Button>
          </div>
        </header>
        <section id="home" className="relative w-full h-190 overflow-hidden">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {heroSlides.map((slide, index) => {
              const isActive = index === currentSlide;
              const isPrevious = index === (currentSlide - 1 + heroSlides.length) % heroSlides.length;
              
              let translateStyle = "translate-x-full";
              let zStyle = "z-0";
              
              if (isActive) {
                translateStyle = "translate-x-0";
                zStyle = "z-10";
              } else if (isPrevious) {
                translateStyle = "-translate-x-full";
                zStyle = "z-10";
              }
              
              return (
                <img
                  key={index}
                  alt={`Vardhaman Park luxury residences ${index + 1}`}
                  className={`size-full object-cover absolute inset-0 transition-transform duration-1000 ease-in-out ${translateStyle} ${zStyle}`}
                  src={slide}
                />
              );
            })}
          </div>
          <div className="bg-[#0b0b0b]/90 absolute inset-0 z-20" />
          <div className="relative z-30 max-w-[1140px] flex mx-auto px-8 flex-col justify-center h-full">
            <div className="max-w-2xl">
              <div className="inline-flex backdrop-blur-md rounded-full bg-[#D4AF37]/10 border-[#D4AF37]/40 border-1 border-solid mb-6 px-4 py-1.5 items-center gap-2">
                <Star className="size-3.5 text-[#D4AF37]" />
                <span className="uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px]">
                  Pre-Launch · RERA Approved
                </span>
              </div>
              <h1 className="font-serif font-semibold text-neutral-50 text-6xl leading-[63px] tracking-tight">
                Where Luxury Meets
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#f5e3a3] to-[#D4AF37] bg-clip-text text-transparent">
                  Timeless Living
                </span>
              </h1>
              <p className="max-w-xl leading-relaxed text-[#a1a1a1] text-lg leading-7 mt-6">
                An exclusive enclave of meticulously crafted residences,
                world-class amenities, and uncompromising elegance — designed
                for those who expect nothing less than extraordinary.
              </p>
              <div className="flex mt-8 flex-wrap items-center gap-4">
                <Button
                  className="shadow-[0_0_30px_rgba(212,175,55,0.5)] bg-[#D4AF37] text-[#0B0B0B] px-7 gap-2"
                  size="lg"
                >
                  <Compass className="size-5" />
                  Explore Project
                </Button>
                <Button
                  className="backdrop-blur-md bg-neutral-950/30 text-neutral-50 border-[#D4AF37]/50 border-0 border-solid px-7 gap-2"
                  size="lg"
                  variant="outline"
                  onClick={() => setIsModalOpen(true)}
                >
                  <CalendarCheck className="size-5" />
                  Book Site Visit
                </Button>
              </div>
            </div>
          </div>
          <div className="left-1/2 max-w-[1140px] -translate-x-1/2 absolute bottom-8 px-8 w-full">
            <div className="grid grid-cols-4 gap-4">
              <div className="backdrop-blur-xl rounded-2xl bg-neutral-900/60 border-[#D4AF37]/20 border-1 border-solid p-6">
                <p className="font-serif font-semibold text-[#D4AF37] text-3xl leading-9">
                  25+
                </p>
                <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                  Acres of Greenery
                </p>
              </div>
              <div className="backdrop-blur-xl rounded-2xl bg-neutral-900/60 border-[#D4AF37]/20 border-1 border-solid p-6">
                <p className="font-serif font-semibold text-[#D4AF37] text-3xl leading-9">
                  1200+
                </p>
                <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                  Luxury Residences
                </p>
              </div>
              <div className="backdrop-blur-xl rounded-2xl bg-neutral-900/60 border-[#D4AF37]/20 border-1 border-solid p-6">
                <p className="font-serif font-semibold text-[#D4AF37] text-3xl leading-9">
                  40+
                </p>
                <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                  World-Class Amenities
                </p>
              </div>
              <div className="backdrop-blur-xl rounded-2xl bg-neutral-900/60 border-[#D4AF37]/20 border-1 border-solid p-6">
                <p className="font-serif font-semibold text-[#D4AF37] text-3xl leading-9">
                  18 Yrs
                </p>
                <p className="text-[#a1a1a1] text-sm leading-5 mt-1">
                  of Trusted Legacy
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="max-w-[1140px] mx-auto px-8 py-20">
          <div className="grid grid-cols-2 items-center gap-12">
            <div className="relative">
              <div className="rounded-3xl border-[#D4AF37]/20 border-1 border-solid overflow-hidden">
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
              <div className="backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-2xl bg-neutral-900/80 border-[#D4AF37]/30 border-1 border-solid absolute -right-6 -bottom-6 p-6">
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
            </div>
            <div>
              <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] mb-4 items-center gap-2">
                <span className="bg-[#D4AF37] w-8 h-px" />
                About Vardhaman Park
              </div>
              <h2 className="leading-tight font-serif font-semibold text-neutral-50 text-4xl leading-10">
                A Legacy of Elegance, Built for Generations
              </h2>
              <p className="leading-relaxed text-[#a1a1a1] mt-5">
                For over 18 years, Vardhaman Park has redefined the art of
                luxury living. Each residence is a testament to architectural
                mastery — where timeless design meets modern innovation, and
                every detail is crafted to perfection.
              </p>
              <div className="grid grid-cols-2 mt-8 gap-4">
                <Card className="bg-neutral-900 border-[#D4AF37]/20 border-0 border-solid p-5 gap-2">
                  <CardHeader className="p-0 gap-2">
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
                <Card className="bg-neutral-900 border-[#D4AF37]/20 border-0 border-solid p-5 gap-2">
                  <CardHeader className="p-0 gap-2">
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
              </div>
            </div>
          </div>
        </section>
        <section id="project" className="border-y bg-neutral-900/30 border-[#D4AF37]/10 border-0 border-solid py-20">
          <div className="max-w-[1140px] mx-auto px-8">
            <div className="text-center mb-12">
              <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] mb-3 items-center gap-2">
                <span className="bg-[#D4AF37] w-8 h-px" />
                Project Highlights
                <span className="bg-[#D4AF37] w-8 h-px" />
              </div>
              <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10">
                Crafted for the Discerning Few
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <Card className="group transition-all bg-neutral-900 border-[#D4AF37]/15 border-0 border-solid p-6 gap-3">
                <CardHeader className="p-0 gap-3">
                  <div className="size-12 transition-all rounded-xl bg-[#D4AF37]/10 border-[#D4AF37]/30 border-1 border-solid flex justify-center items-center">
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
              <Card className="group transition-all bg-neutral-900 border-[#D4AF37]/15 border-0 border-solid p-6 gap-3">
                <CardHeader className="p-0 gap-3">
                  <div className="size-12 transition-all rounded-xl bg-[#D4AF37]/10 border-[#D4AF37]/30 border-1 border-solid flex justify-center items-center">
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
              <Card className="group transition-all bg-neutral-900 border-[#D4AF37]/15 border-0 border-solid p-6 gap-3">
                <CardHeader className="p-0 gap-3">
                  <div className="size-12 transition-all rounded-xl bg-[#D4AF37]/10 border-[#D4AF37]/30 border-1 border-solid flex justify-center items-center">
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
              <Card className="group transition-all bg-neutral-900 border-[#D4AF37]/15 border-0 border-solid p-6 gap-3">
                <CardHeader className="p-0 gap-3">
                  <div className="size-12 transition-all rounded-xl bg-[#D4AF37]/10 border-[#D4AF37]/30 border-1 border-solid flex justify-center items-center">
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
              <Card className="group transition-all bg-neutral-900 border-[#D4AF37]/15 border-0 border-solid p-6 gap-3">
                <CardHeader className="p-0 gap-3">
                  <div className="size-12 transition-all rounded-xl bg-[#D4AF37]/10 border-[#D4AF37]/30 border-1 border-solid flex justify-center items-center">
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
              <Card className="group transition-all bg-neutral-900 border-[#D4AF37]/15 border-0 border-solid p-6 gap-3">
                <CardHeader className="p-0 gap-3">
                  <div className="size-12 transition-all rounded-xl bg-[#D4AF37]/10 border-[#D4AF37]/30 border-1 border-solid flex justify-center items-center">
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
            </div>
          </div>
        </section>
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-[1140px] mx-auto px-8">
            <div className="grid grid-cols-2 items-center gap-12">
              <div>
                <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] mb-4 items-center gap-2">
                  <span className="bg-[#D4AF37] w-8 h-px" />
                  Why Choose Us
                </div>
                <h2 className="leading-tight font-serif font-semibold text-neutral-50 text-4xl leading-10">
                  The Distinction of Excellence
                </h2>
                <div className="flex mt-8 flex-col gap-5">
                  <div className="group border-transparent transition-all rounded-2xl border-black/1 border-1 border-solid flex p-3 gap-4">
                    <div className="size-11 shrink-0 rounded-full bg-[#D4AF37]/10 border-[#D4AF37]/40 border-1 border-solid flex justify-center items-center">
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
                  <div className="group border-transparent transition-all rounded-2xl border-black/1 border-1 border-solid flex p-3 gap-4">
                    <div className="size-11 shrink-0 rounded-full bg-[#D4AF37]/10 border-[#D4AF37]/40 border-1 border-solid flex justify-center items-center">
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
                  <div className="group border-transparent transition-all rounded-2xl border-black/1 border-1 border-solid flex p-3 gap-4">
                    <div className="size-11 shrink-0 rounded-full bg-[#D4AF37]/10 border-[#D4AF37]/40 border-1 border-solid flex justify-center items-center">
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
                </div>
              </div>
              <div className="relative rounded-3xl border-[#D4AF37]/20 border-1 border-solid overflow-hidden">
                <img
                  alt="Luxury facade"
                  className="object-cover w-full h-115"
                  src={luxuryFacade}
                />
                <div className="bg-[#0b0b0b]/60 absolute inset-0" />
              </div>
            </div>
          </div>
        </section>
        <section className="border-y bg-neutral-900/30 border-[#D4AF37]/10 border-0 border-solid py-20">
          <div className="max-w-[1140px] mx-auto px-8">
            <div className="text-center mb-12">
              <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] mb-3 items-center gap-2">
                <span className="bg-[#D4AF37] w-8 h-px" />
                Master Plan
                <span className="bg-[#D4AF37] w-8 h-px" />
              </div>
              <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10">
                A Vision Beautifully Planned
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 relative rounded-3xl border-[#D4AF37]/20 border-1 border-solid overflow-hidden">
                <img
                  alt="Master plan"
                  className="object-cover w-full h-105"
                  src={masterPlan}
                />
                <div className="bg-[#0b0b0b]/50 absolute inset-0" />
                <div className="left-[28%] top-[35%] flex absolute items-center gap-2">
                  <span className="size-4 animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.8)] rounded-full bg-[#D4AF37] flex justify-center items-center" />
                  <span className="backdrop-blur-md rounded-full bg-neutral-900/80 text-neutral-50 text-xs leading-4 border-[#D4AF37]/40 border-1 border-solid px-3 py-1">
                    Tower A
                  </span>
                </div>
                <div className="left-[60%] top-[55%] flex absolute items-center gap-2">
                  <span className="size-4 animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.8)] rounded-full bg-[#D4AF37] flex justify-center items-center" />
                  <span className="backdrop-blur-md rounded-full bg-neutral-900/80 text-neutral-50 text-xs leading-4 border-[#D4AF37]/40 border-1 border-solid px-3 py-1">
                    Clubhouse
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Card className="bg-neutral-900 border-[#D4AF37]/20 border-0 border-solid p-5 gap-2">
                  <CardHeader className="p-0 gap-1">
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
                <Card className="bg-neutral-900 border-[#D4AF37]/20 border-0 border-solid p-5 gap-2">
                  <CardHeader className="p-0 gap-1">
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
                <Card className="bg-neutral-900 border-[#D4AF37]/20 border-0 border-solid p-5 gap-2">
                  <CardHeader className="p-0 gap-1">
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
              </div>
            </div>
          </div>
        </section>
        <section id="amenities" className="max-w-[1140px] mx-auto px-8 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] mb-3 items-center gap-2">
              <span className="bg-[#D4AF37] w-8 h-px" />
              World-Class Amenities
              <span className="bg-[#D4AF37] w-8 h-px" />
            </div>
            <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10">
              Indulge in Everyday Luxury
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="group relative col-span-2 rounded-3xl border-[#D4AF37]/20 border-1 border-solid overflow-hidden">
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
            <div className="group relative rounded-3xl border-[#D4AF37]/20 border-1 border-solid overflow-hidden">
              <img
                alt="Gym"
                className="object-cover transition-transform duration-700 w-full h-65 group-hover:scale-105"
                data-authorname="gina lin"
                data-authorurl="https://unsplash.com/@shuttch"
                data-blurhash="LOL|S[ITElR+.Sofsmoe}l%MM|od"
                data-photoid="m27OTMegUyA"
                src="https://images.unsplash.com/photo-1542766788-a2f588f447ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjBmaXRuZXNzJTIwY2VudGVyJTIwbHV4dXJ5fGVufDF8MHx8fDE3ODAzMDc4MTB8MA&ixlib=rb-4.1.0&q=80&w=500"
              />
              <div className="bg-[#0b0b0b]/30 absolute inset-0 transition-all duration-300 group-hover:bg-[#0b0b0b]/10" />
              <div className="flex absolute left-5 bottom-5 items-center gap-2 backdrop-blur-md bg-[#0b0b0b]/60 border border-[#D4AF37]/20 rounded-xl px-4 py-2">
                <Dumbbell className="size-5 text-[#D4AF37]" />
                <span className="font-serif font-semibold text-neutral-50 text-xl leading-7">
                  Fitness Studio
                </span>
              </div>
            </div>
            <div className="group relative rounded-3xl border-[#D4AF37]/20 border-1 border-solid overflow-hidden">
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
            <div className="group relative col-span-2 rounded-3xl border-[#D4AF37]/20 border-1 border-solid overflow-hidden">
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
          </div>
          <div className="grid grid-cols-5 mt-6 gap-4">
            <div className="rounded-xl bg-neutral-900 border-[#D4AF37]/15 border-1 border-solid flex p-4 items-center gap-2">
              <Footprints className="size-5 text-[#D4AF37]" />
              <span className="text-neutral-50 text-sm leading-5">
                Jogging Track
              </span>
            </div>
            <div className="rounded-xl bg-neutral-900 border-[#D4AF37]/15 border-1 border-solid flex p-4 items-center gap-2">
              <Baby className="size-5 text-[#D4AF37]" />
              <span className="text-neutral-50 text-sm leading-5">
                Kids Play Area
              </span>
            </div>
            <div className="rounded-xl bg-neutral-900 border-[#D4AF37]/15 border-1 border-solid flex p-4 items-center gap-2">
              <ShieldCheck className="size-5 text-[#D4AF37]" />
              <span className="text-neutral-50 text-sm leading-5">
                Security
              </span>
            </div>
            <div className="rounded-xl bg-neutral-900 border-[#D4AF37]/15 border-1 border-solid flex p-4 items-center gap-2">
              <Car className="size-5 text-[#D4AF37]" />
              <span className="text-neutral-50 text-sm leading-5">Parking</span>
            </div>
            <div className="rounded-xl bg-neutral-900 border-[#D4AF37]/15 border-1 border-solid flex p-4 items-center gap-2">
              <Users className="size-5 text-[#D4AF37]" />
              <span className="text-neutral-50 text-sm leading-5">
                Community Hall
              </span>
            </div>
          </div>
        </section>
        <section id="gallery" className="border-y bg-neutral-900/30 border-[#D4AF37]/10 border-0 border-solid py-20">
          <div className="max-w-[1140px] mx-auto px-8">
            <div className="text-center mb-12">
              <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] mb-3 items-center gap-2">
                <span className="bg-[#D4AF37] w-8 h-px" />
                Gallery
                <span className="bg-[#D4AF37] w-8 h-px" />
              </div>
              <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10">
                Glimpses of Grandeur
              </h2>
            </div>
            <div className="grid grid-cols-4 grid-rows-2 gap-4">
              <div className="group relative row-span-2 rounded-2xl border-[#D4AF37]/15 border-1 border-solid overflow-hidden">
                <img
                  alt="Kitchen"
                  className="object-cover transition-transform duration-700 w-full h-full"
                  data-authorname="Alexey Aladashvili"
                  data-authorurl="https://unsplash.com/@alexeyaladashvili61"
                  data-blurhash="LMEySlt5IVWB9Fxus.t7~qRjR*of"
                  data-photoid="hE9OVVyZN-Y"
                  src="https://images.unsplash.com/photo-1738748444653-2fb1388aef1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwbHV4dXJ5JTIwbWFyYmxlfGVufDF8MXx8fDE3ODAzMDc4MjF8MA&ixlib=rb-4.1.0&q=80&w=500"
                />
                <div className="transition-all opacity-0 bg-[#0B0B0B]/0 flex absolute inset-0 justify-center items-center">
                  <Maximize2 className="size-7 text-[#D4AF37]" />
                </div>
              </div>
              <div className="group relative rounded-2xl border-[#D4AF37]/15 border-1 border-solid overflow-hidden">
                <img
                  alt="Bedroom"
                  className="object-cover transition-transform duration-700 w-full h-50"
                  data-authorname="Le Quan"
                  data-authorurl="https://unsplash.com/@mrkheu"
                  data-blurhash="LFEVf_9EtR01_2IU-;9F0KNKoL-:"
                  data-photoid="anLoz4xfC8c"
                  src="https://images.unsplash.com/photo-1699800900071-ae073285ca02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBlbGVnYW50fGVufDF8MHx8fDE3ODAyMjgwNzV8MA&ixlib=rb-4.1.0&q=80&w=500"
                />
                <div className="transition-all opacity-0 bg-[#0B0B0B]/0 flex absolute inset-0 justify-center items-center">
                  <Maximize2 className="size-7 text-[#D4AF37]" />
                </div>
              </div>
              <div className="group relative col-span-2 rounded-2xl border-[#D4AF37]/15 border-1 border-solid overflow-hidden">
                <img
                  alt="Skyline"
                  className="object-cover transition-transform duration-700 w-full h-50"
                  data-authorname="OJ Serrano"
                  data-authorurl="https://unsplash.com/@senyor_oj"
                  data-blurhash="L*I}@if6a}of~qj]jtjs-;WBj[WB"
                  data-photoid="iacKpANQHNA"
                  src="https://images.unsplash.com/photo-1596564309076-01c1868b07a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjB2aWV3JTIwbW9kZXJuJTIwY2l0eSUyMHNreWxpbmUlMjB0d2lsaWdodHxlbnwxfDB8fHwxNzgwMzA3ODIxfDA&ixlib=rb-4.1.0&q=80&w=700"
                />
                <div className="transition-all opacity-0 bg-[#0B0B0B]/0 flex absolute inset-0 justify-center items-center">
                  <Maximize2 className="size-7 text-[#D4AF37]" />
                </div>
              </div>
              <div className="group relative rounded-2xl border-[#D4AF37]/15 border-1 border-solid overflow-hidden">
                <img
                  alt="Bathroom"
                  className="object-cover transition-transform duration-700 w-full h-50"
                  data-authorname="Amira Aboalnaga"
                  data-authorurl="https://unsplash.com/@amiraaboalnaga"
                  data-blurhash="L6I#GW0LM{nh-T%Ms,-:V?IAt8aK"
                  data-photoid="O7WjrXiKy_s"
                  src="https://images.unsplash.com/photo-1576698483491-8c43f0862543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMG1vZGVybiUyMGRlc2lnbnxlbnwxfDF8fHwxNzgwMzA3ODIxfDA&ixlib=rb-4.1.0&q=80&w=500"
                />
                <div className="transition-all opacity-0 bg-[#0B0B0B]/0 flex absolute inset-0 justify-center items-center">
                  <Maximize2 className="size-7 text-[#D4AF37]" />
                </div>
              </div>
              <div className="group relative col-span-2 rounded-2xl border-[#D4AF37]/15 border-1 border-solid overflow-hidden">
                <img
                  alt="Living"
                  className="object-cover transition-transform duration-700 w-full h-50"
                  data-authorname="Lotus Design N Print"
                  data-authorurl="https://unsplash.com/@lotusdnp"
                  data-blurhash="LJHC7jM|ad%M_N-;j[WWI9M{bIoe"
                  data-photoid="n5RsUiVf5T0"
                  src="https://images.unsplash.com/photo-1611094016919-36b65678f3d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb20lMjBlbGVnYW50fGVufDF8MHx8fDE3ODAzMDc4MTB8MA&ixlib=rb-4.1.0&q=80&w=700"
                />
                <div className="transition-all opacity-0 bg-[#0B0B0B]/0 flex absolute inset-0 justify-center items-center">
                  <Maximize2 className="size-7 text-[#D4AF37]" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="location" className="max-w-[1140px] mx-auto px-8 py-20">
          <div className="grid grid-cols-2 items-center gap-12">
            <div>
              <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] mb-4 items-center gap-2">
                <span className="bg-[#D4AF37] w-8 h-px" />
                Location Advantage
              </div>
              <h2 className="leading-tight font-serif font-semibold text-neutral-50 text-4xl leading-10">
                Connected to Everything That Matters
              </h2>
              <div className="grid grid-cols-2 mt-8 gap-4">
                <div className="rounded-xl bg-neutral-900 border-[#D4AF37]/15 border-1 border-solid flex p-4 items-center gap-3">
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
                <div className="rounded-xl bg-neutral-900 border-[#D4AF37]/15 border-1 border-solid flex p-4 items-center gap-3">
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
                <div className="rounded-xl bg-neutral-900 border-[#D4AF37]/15 border-1 border-solid flex p-4 items-center gap-3">
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
                <div className="rounded-xl bg-neutral-900 border-[#D4AF37]/15 border-1 border-solid flex p-4 items-center gap-3">
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
                <div className="rounded-xl bg-neutral-900 border-[#D4AF37]/15 border-1 border-solid flex p-4 items-center gap-3">
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
                <div className="rounded-xl bg-neutral-900 border-[#D4AF37]/15 border-1 border-solid flex p-4 items-center gap-3">
                  <Plane className="size-5 text-[#D4AF37]" />
                  <div>
                    <p className="font-medium text-neutral-50 text-sm leading-5">
                      Airport
                    </p>
                    <p className="text-[#a1a1a1] text-xs leading-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-[1140px] mx-auto px-8 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] mb-3 items-center gap-2">
              <span className="bg-[#D4AF37] w-8 h-px" />
              Get In Touch
              <span className="bg-[#D4AF37] w-8 h-px" />
            </div>
            <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10">
              We'd Love to Hear From You
            </h2>
            <p className="text-[#a1a1a1] mt-3 max-w-xl mx-auto text-sm leading-6">
              Reach out to our luxury consultants for pricing, site visits, or any queries about Vardhaman Park.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl bg-neutral-900 border border-[#D4AF37]/20 p-6 flex items-start gap-4">
                <div className="size-12 shrink-0 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                  <MapPin className="size-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-serif font-semibold text-neutral-50 text-base mb-1">Visit Us</p>
                  <p className="text-[#a1a1a1] text-sm leading-5">Vardhaman Park, Sector 12,<br />New Delhi – 110 001, India</p>
                </div>
              </div>
              <div className="rounded-2xl bg-neutral-900 border border-[#D4AF37]/20 p-6 flex items-start gap-4">
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
              <div className="rounded-2xl bg-neutral-900 border border-[#D4AF37]/20 p-6 flex items-start gap-4">
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
            </div>

            {/* Contact Form */}
            <div className="col-span-2 rounded-3xl bg-neutral-900 border border-[#D4AF37]/20 p-8">
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
                  <div className="grid grid-cols-2 gap-4">
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

                  <div className="flex gap-3 mt-1">
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
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#D4AF37]/15 bg-neutral-950 pt-16 pb-8">
          <div className="max-w-[1140px] mx-auto px-8">

            {/* Top grid */}
            <div className="grid grid-cols-4 gap-10 mb-12">

              {/* Brand */}
              <div className="col-span-1">
                <a href="#home" className="flex items-center mb-4">
                  <img
                    src={vardhamanLogo}
                    alt="Vardhaman Park"
                    className="h-10 w-auto object-contain"
                  />
                </a>
                <p className="text-[#a1a1a1] text-sm leading-6 mb-5">
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-[#a1a1a1] hover:text-[#D4AF37]">
                        <path d={path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-serif font-semibold text-neutral-50 text-base mb-5">Quick Links</h4>
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
                      <a href={href} className="text-[#a1a1a1] text-sm hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                        <span className="w-4 h-px bg-[#D4AF37]/40 group-hover:w-6 group-hover:bg-[#D4AF37] transition-all duration-300" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Project Info */}
              <div>
                <h4 className="font-serif font-semibold text-neutral-50 text-base mb-5">Project Info</h4>
                <ul className="flex flex-col gap-3">
                  {["2 BHK Residences", "3 BHK Residences", "4 BHK Penthouses", "Master Plan", "Floor Plans", "Price List", "RERA Details"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-[#a1a1a1] text-sm hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
                        <span className="w-4 h-px bg-[#D4AF37]/40 group-hover:w-6 group-hover:bg-[#D4AF37] transition-all duration-300" />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-serif font-semibold text-neutral-50 text-base mb-5">Contact Us</h4>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <div className="size-8 shrink-0 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center mt-0.5">
                      <MapPin className="size-4 text-[#D4AF37]" />
                    </div>
                    <p className="text-[#a1a1a1] text-sm leading-5">
                      Vardhaman Park, Sector 12,<br />
                      New Delhi – 110 001, India
                    </p>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="size-8 shrink-0 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center">
                      <Phone className="size-4 text-[#D4AF37]" />
                    </div>
                    <a href="tel:+911234567890" className="text-[#a1a1a1] text-sm hover:text-[#D4AF37] transition-colors">
                      +91 12345 67890
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="size-8 shrink-0 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center">
                      <Mail className="size-4 text-[#D4AF37]" />
                    </div>
                    <a href="mailto:info@vardhamanpark.com" className="text-[#a1a1a1] text-sm hover:text-[#D4AF37] transition-colors">
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
              <p className="text-[#a1a1a1] text-xs">
                © 2025 Vardhaman Park. All rights reserved.
              </p>
              <div className="flex items-center gap-1 text-[#a1a1a1] text-xs">
                <ShieldCheck className="size-3.5 text-[#D4AF37]" />
                RERA Approved &nbsp;·&nbsp; MahaRERA No. P52100XXXXX
              </div>
              <div className="flex items-center gap-4">
                {["Privacy Policy", "Terms of Use", "Disclaimer"].map((item) => (
                  <a key={item} href="#" className="text-[#a1a1a1] text-xs hover:text-[#D4AF37] transition-colors">
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
