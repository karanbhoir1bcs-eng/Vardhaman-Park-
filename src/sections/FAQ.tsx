import React, { useEffect, useRef } from "react";
import { faqData } from "../data/faqData";

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

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <section id="faq" className="max-w-[1180px] mx-auto px-6 sm:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="flex flex-col items-center mb-8">
        <FadeIn type="letter-expand" delay={100} duration={600} className="text-center">
          <div className="inline-flex uppercase text-[#D4AF37] text-xs leading-4 tracking-[4px] items-center gap-2">
            <span className="bg-[#D4AF37] w-8 h-px" />
            FAQ
            <span className="bg-[#D4AF37] w-8 h-px" />
          </div>
        </FadeIn>
        <FadeIn type="fade-up" delay={200} duration={800} className="text-center mt-3">
          <h2 className="font-serif font-semibold text-neutral-50 text-4xl leading-10">
            Frequently Asked Questions
          </h2>
        </FadeIn>
      </div>
      <div className="flex flex-col gap-4">
        {faqData.map((faq, i) => (
          <FadeIn key={i} delay={300 + i * 100} type="fade-up">
            <details className="group border border-solid border-[#D4AF37]/20 rounded-xl bg-neutral-900/50 p-5 cursor-pointer [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between font-serif font-semibold text-neutral-50 text-lg outline-none">
                {faq.q}
                <span className="text-[#D4AF37] group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
              </summary>
              <p className="text-[#a1a1a1] text-sm mt-4 leading-relaxed pl-2 border-l-2 border-[#D4AF37]/30">
                {faq.a}
              </p>
            </details>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
