import { useState } from "react";
import { CalendarCheck, Mail, MessageSquare, Phone, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";

// ──────────────────────────────────────────────
//  Formspree endpoint – replace the ID if needed
// ──────────────────────────────────────────────
const FORMSPREE_URL = "https://formspree.io/f/xnjyaybb";

type Status = "idle" | "submitting" | "success" | "error";

export default function ConfirmBooking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    booking_details: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", booking_details: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // ── Shared input styling ──────────────────────
  const inputClass =
    "w-full rounded-xl bg-neutral-800 border border-neutral-700 focus:border-[#D4AF37]/60 outline-none px-4 py-3 text-neutral-50 text-sm placeholder:text-neutral-500 transition-colors duration-200";

  const labelClass =
    "flex items-center gap-1.5 text-[#D4AF37] text-xs font-medium mb-1.5";

  return (
    <section
      id="confirm-booking"
      className="w-full min-h-screen flex items-center justify-center bg-neutral-950 px-4 py-24"
    >
      <div className="w-full max-w-lg">
        {/* ── Card shell ── */}
        <div className="rounded-3xl bg-neutral-900 border border-[#D4AF37]/25 shadow-[0_25px_80px_rgba(0,0,0,0.8)] p-6 sm:p-10">

          {/* ── Header ── */}
          <div className="text-center mb-8">
            <div className="inline-flex uppercase text-[#D4AF37] text-xs tracking-[4px] mb-3 items-center gap-2">
              <span className="bg-[#D4AF37] w-6 h-px" />
              Reserve Your Home
              <span className="bg-[#D4AF37] w-6 h-px" />
            </div>
            <h1 className="font-serif font-semibold text-neutral-50 text-3xl leading-tight">
              Confirm Your Booking
            </h1>
            <p className="text-[#a1a1a1] text-sm mt-2 leading-relaxed">
              Fill in your details below and our luxury consultant will
              reach&nbsp;out within 24&nbsp;hours.
            </p>
          </div>

          {/* ── Success state ── */}
          {status === "success" ? (
            <div className="text-center py-10 flex flex-col items-center gap-4">
              <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-bounce">
                <ShieldCheck className="size-8" />
              </div>
              <h2 className="text-neutral-50 font-semibold text-xl">
                Booking Confirmed!
              </h2>
              <p className="text-[#a1a1a1] text-sm max-w-xs">
                We've received your details. Our team will get back to you
                shortly.
              </p>
              <Button
                onClick={() => setStatus("idle")}
                className="mt-2 bg-[#D4AF37] hover:bg-[#c9a430] text-[#0B0B0B] font-semibold px-8"
              >
                Submit Another Request
              </Button>
            </div>
          ) : (
            /* ── Form ── */
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

              {/* Full Name */}
              <div>
                <label htmlFor="cb-name" className={labelClass}>
                  <User className="size-3.5" />
                  Full Name
                </label>
                <input
                  id="cb-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="cb-email" className={labelClass}>
                  <Mail className="size-3.5" />
                  Email Address
                </label>
                <input
                  id="cb-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="cb-phone" className={labelClass}>
                  <Phone className="size-3.5" />
                  Phone Number
                </label>
                <input
                  id="cb-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 00000 00000"
                  className={inputClass}
                />
              </div>

              {/* Booking Details */}
              <div>
                <label htmlFor="cb-booking-details" className={labelClass}>
                  <MessageSquare className="size-3.5" />
                  Booking Details or Message
                </label>
                <textarea
                  id="cb-booking-details"
                  rows={4}
                  name="booking_details"
                  value={formData.booking_details}
                  onChange={handleChange}
                  required
                  placeholder="Tell us your preferred flat type, visit date, or any questions..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Error message */}
              {status === "error" && (
                <p className="text-red-400 text-xs text-center">
                  Something went wrong. Please check your network and try
                  again.
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="w-full mt-1 shadow-[0_0_30px_rgba(212,175,55,0.4)] bg-[#D4AF37] hover:bg-[#c9a430] text-[#0B0B0B] font-semibold py-3 gap-2 disabled:opacity-50 transition-all duration-200"
              >
                <CalendarCheck className="size-5" />
                {status === "submitting" ? "Submitting…" : "Confirm Booking"}
              </Button>

              {/* Trust badge */}
              <p className="text-center text-[#a1a1a1] text-xs flex items-center justify-center gap-1.5">
                <ShieldCheck className="size-3.5 text-[#D4AF37]" />
                Your information is 100% secure and never shared.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
