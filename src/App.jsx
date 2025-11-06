import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// =============================
// LUNA (Language Understanding Neural Assistant)
// One-file React + Tailwind site (Canvas-ready)
// Features:
//  - Light/Dark theme toggle
//  - Floating phone action button + header phone icon (click-to-call)
//  - Cursor-reactive radial highlight
//  - Smooth parallax sections & fade-ins via Framer Motion
//  - Apple-style minimal layout with moon/voice motifs
//  - Animated lightning strokes & sound-wave bars
//  - Case studies, product, FAQ, team, contact
//  - Minimal, clean, cinematic aesthetic
// =============================

// ===== Utility: Theme Toggle Hook =====
function useTheme() {
  const [isDark, setIsDark] = useState(true);
  });
  useEffect(() => {
    const cls = document.documentElement.classList;
    if (isDark) cls.add("dark");
    else cls.remove("dark");
  }, [isDark]);
  return { isDark, setIsDark };
}

// ===== Utility: Cursor Highlight =====
function useCursorGlow() {
  useEffect(() => {
    const handler = (e) => {
      document.documentElement.style.setProperty("--mx", e.clientX + "px");
      document.documentElement.style.setProperty("--my", e.clientY + "px");
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
}

// ====== Icons (inline SVG for zero-dep smoothness) ======
const IconMoon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="g" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e5e7eb" />
        <stop offset="60%" stopColor="#d1d5db" />
        <stop offset="100%" stopColor="#9ca3af" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="22" fill="url(#g)" />
    <circle cx="24" cy="24" r="2.8" fill="#bfc5ce" />
    <circle cx="40" cy="22" r="1.8" fill="#bfc5ce" />
    <circle cx="32" cy="40" r="3" fill="#b7bdc7" />
  </svg>
);

const IconPhone = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M2.25 5.5c0 8.008 6.492 14.5 14.5 14.5.93 0 1.826-.098 2.68-.283a1.5 1.5 0 0 0 1.147-1.88l-.776-2.705a1.5 1.5 0 0 0-1.544-1.081l-2.875.26a2 2 0 0 1-1.69-.66l-1.67-1.9a12.04 12.04 0 0 1-2.8-5.3l-.2-1.02A1.5 1.5 0 0 0 6.19 3.2l-2.49.5A1.5 1.5 0 0 0 2.25 5.5Z"
    />
  </svg>
);

const IconSun = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
    <path strokeWidth="1.8" strokeLinecap="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364-1.414 1.414M8.05 17.95l-1.414 1.414m0-13.9L8.05 6.05m9.9 9.9 1.414 1.414" />
  </svg>
);

const IconMoonCrescent = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
);

const IconSparkles = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 3l1.4 3.6L10 8 6.4 9.4 5 13l-1.4-3.6L0 8l3.6-1.4L5 3Zm14 6 1.2 3 3 1.2-3 1.2L19 18l-1.2-3-3-1.2 3-1.2L19 9Z" />
  </svg>
);

// ===== Visual micro-components =====
const Tag = ({ children }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-zinc-300/60 dark:border-zinc-700/60 px-3 py-1 text-xs text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-900/40 backdrop-blur">
    {children}
  </span>
);

const SectionTitle = ({ kicker, title, subtitle }) => (
  <div className="max-w-3xl mx-auto text-center">
    {kicker && (
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-600 dark:text-zinc-400 mb-2">{kicker}</p>
    )}
    <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-zinc-50">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">{subtitle}</p>
    )}
  </div>
);

// ===== Animated Lightning SVG =====
const Lightning = ({ className = "absolute inset-0" }) => (
  <svg className={className} viewBox="0 0 1200 400" preserveAspectRatio="none">
    <defs>
      <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="50%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#34d399" />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {[...Array(6)].map((_, i) => (
      <path
        key={i}
        d={`M ${50 + i * 180} ${80 + (i % 2) * 20} C ${100 + i * 180} ${10 + i * 5}, ${150 + i * 180} ${150 - i * 3}, ${200 + i * 180} ${90 + (i % 3) * 40}`}
        stroke="url(#lg)"
        strokeWidth="1.5"
        fill="none"
        filter="url(#glow)"
      >
        <animate attributeName="stroke-dasharray" values="0,1000;200,1000;0,1000" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2.6 + i * 0.25}s`} repeatCount="indefinite" />
      </path>
    ))}
  </svg>
);

// ===== Animated Sound Waves =====
const SoundWaves = () => (
  <div className="flex items-end gap-1 h-8">
    {Array.from({ length: 20 }).map((_, i) => (
      <span
        key={i}
        className="w-[3px] rounded-full bg-gradient-to-b from-indigo-400 via-sky-400 to-emerald-400 dark:from-indigo-300 dark:via-sky-300 dark:to-emerald-300"
        style={{ height: 6 + ((i * 13) % 24), animation: `wave 1.2s ease-in-out ${i * 0.05}s infinite` }}
      />
    ))}
  </div>
);

// ====== Data (content adapted from user notes) ======
const COMPANY = {
  name: "LUNA",
  expansion: "Language Understanding Neural Assistant",
  tagline:
    "Voice-powered AI that books, answers and connects — so you can focus on what matters.",
  mission:
    "At LUNA we act as the bridge between businesses and the rapidly evolving world of AI. We connect you with the right voice solutions, tailor them to your operations, and ensure they work seamlessly.",
  about:
    "AI can feel overwhelming. New tools appear every day; the landscape shifts constantly. LUNA makes voice AI calm, clear, and effective — integrating with your processes, respecting your brand, and delivering measurable impact.",
  phone: "+27792419460",
  email: "enagroup.ai@gmail.com",
  location: "South Africa",
};

const PRODUCT_NEXERA = {
  name: "NEXERA",
  pitch:
    "Your intelligent booking automation agent — no more missed calls, no more lost opportunities.",
  can: [
    "Answer business-related questions",
    "Make bookings",
    "Cancel/reschedule bookings",
    "Add extra information to a booking description",
    "Forward calls",
    "Send you messages",
    "Call and speak to you about a client",
  ],
  features: [
    "Affordable",
    "Quick onboarding",
    "Empowers people, does not replace",
    "Customisable",
    "Friendly 24/7",
    "We use our own product",
    "Customisable name",
  ],
  benefits: [
    "Modernisation — keep your business relevant",
    "Increased client acquisition — capture every booking",
    "Seamless bookings — full calendar integration",
    "24/7 availability",
    "Rescheduling & call transferring",
    "Answers to business questions",
    "Tailored to your workflow",
  ],
  limitations: [
    "Answers only from business info provided",
    "If too complex, she will forward to a person",
    "May request clarification if heavy slang is used",
  ],
};

const CASE_STUDIES = [
  {
    title: "Rescheduling in seconds",
    transcript: [
      "NEXERA (Lilly): Good afternoon, thank you for calling Company X. This is Lilly, your virtual assistant. How can I help you today?",
      "Customer: I have an appointment with Dr. Patel on Thursday at 2pm, but I need to reschedule.",
      "NEXERA (Lilly): I see your appointment. The next available times are Friday at 10am or Monday at 3pm. Which works better?",
      "Customer: Friday at 10am.",
      "NEXERA (Lilly): Done — moved to Friday at 10am with Dr. Patel. You'll receive a confirmation email shortly.",
    ],
  },
  {
    title: "Booking + handoff when needed",
    transcript: [
      "NEXERA (Sofia): Hello, thank you for calling Company X! This is Sofia. How can I help?",
      "Customer: I'd like a booking with Sara at 4pm on Saturday; add Y and Z in my notes for a wedding.",
      "NEXERA (Sofia): You're confirmed for Saturday at 4pm, with Y and Z added to your booking notes.",
      "Customer: What's the difference between treatment X and Q?",
      "NEXERA (Sofia): I don't want to mislead you — would you like me to connect you to Mary (treatments) or John (scheduling)?",
      "Customer: Mary, please.",
      "NEXERA (Sofia): Forwarding you to Mary now. Please hold...",
    ],
  },
];

const FAQ = [
  {
    q: "Can NEXERA use my existing number?",
    a: "Yes. We can route your existing number so NEXERA answers automatically or after a ring threshold if no one picks up.",
  },
  {
    q: "Will it double-book me?",
    a: "No. NEXERA checks your calendar and avoids conflicts before confirming any booking.",
  },
  {
    q: "How will I know NEXERA made a booking?",
    a: "You'll be notified via SMS, WhatsApp, or call — and of course, you'll see it on your calendar.",
  },
  {
    q: "What if NEXERA doesn't know the answer?",
    a: "She'll say so and offer to forward the call to a person (or team) you define.",
  },
];

// ===== Reusable Card =====
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/60 shadow-sm backdrop-blur ${className}`}>
    {children}
  </div>
);

// ===== Parallax Hook =====
function useParallax(ref, range = [0, -80]) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], range);
  return y;
}

// ===== Section: Header / Nav =====
const Header = ({ onToggleTheme, isDark }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/[0.65] dark:bg-zinc-950/70 border-b border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 via-violet-200 to-indigo-200 dark:from-zinc-800 dark:via-indigo-900 dark:to-black" />
            {/* craters */}
            <span className="absolute left-1 top-1 w-2 h-2 rounded-full bg-zinc-300/70 dark:bg-zinc-700/70" />
            <span className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-zinc-300/60 dark:bg-zinc-700/60" />
            <span className="absolute left-2/3 bottom-2 w-2.5 h-2.5 rounded-full bg-zinc-300/70 dark:bg-zinc-700/70" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">LUNA</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">Language Understanding Neural Assistant</span>
            </div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-700 dark:text-zinc-300">
          <a href="#product" className="hover:text-indigo-600 dark:hover:text-indigo-400">Product</a>
          <a href="#cases" className="hover:text-indigo-600 dark:hover:text-indigo-400">Case Studies</a>
          <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400">Features</a>
          <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400">FAQ</a>
          <a href="#team" className="hover:text-indigo-600 dark:hover:text-indigo-400">Team</a>
          <a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${COMPANY.phone}`}
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-300/70 dark:border-zinc-700/70 px-3 py-1.5 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Call LUNA"
          >
            <IconPhone className="w-4 h-4 group-hover:scale-110 transition" />
            <span className="hidden sm:inline">{formatPhone(COMPANY.phone)}</span>
          </a>
          <button
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300/70 dark:border-zinc-700/70 px-3 py-1.5 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle theme"
          >
            {isDark ? <IconSun /> : <IconMoonCrescent />}
          </button>
        </div>
      </div>
    </header>
  );
};

// ===== Section: Hero =====
const Hero = () => {
  const ref = useRef(null);
  const y = useParallax(ref, [0, -60]);
  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Cursor reactive radial */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -inset-[30%] opacity-70 mix-blend-overlay" style={{ background: `radial-gradient(600px at var(--mx) var(--my), rgba(99,102,241,0.12), transparent 60%)` }} />
      </div>

      {/* background accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-black" />
      <Lightning className="absolute inset-x-0 top-0 h-[420px] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-16 sm:pb-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div style={{ y }} className="">
          <div className="inline-flex items-center gap-2 mb-4">
            <Tag>
              <IconSparkles />
              <span>AI Voice Automation</span>
            </Tag>
            <Tag>24/7 Friendly</Tag>
            <Tag>Human Handoff</Tag>
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Voice AI that <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500">books, answers</span> and connects.
          </h1>
          <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300 max-w-xl">
            {COMPANY.about}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#product" className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 shadow">
              Explore NEXERA
            </a>
            <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 rounded-full border border-zinc-300/70 dark:border-zinc-700/70 px-4 py-2 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <IconPhone /> Call us
            </a>
          </div>
          <div className="mt-10">
            <SoundWaves />
          </div>
          <div className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Always connected, always ready, and always ahead.</span>
          </div>
        </motion.div>

        {/* Right visual: Pretty girl on the phone (illustrative) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_40%_20%,rgba(79,70,229,0.15),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.12),transparent_50%)]" />
          <Card className="overflow-hidden">
            <img
              src="/Girl_On_Phone.png"
              alt="Customer happily speaking on the phone — LUNA voice assistant illustration"
              className="w-full h-[420px] object-cover"
            />
            <div className="p-4 flex items-center justify-between">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Illustrating the human, friendly nature of our voice assistants.</div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-500">Logo</span>
                <IconMoon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// ===== Section: Product (NEXERA) =====
const Product = () => {
  const ref = useRef(null);
  const y = useParallax(ref, [0, -40]);
  return (
    <section id="product" ref={ref} className="relative py-20 sm:py-28">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(800px_at_80%_10%,rgba(99,102,241,0.08),transparent_60%)]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          kicker="Product"
          title="Meet NEXERA — booking without the bot vibes"
          subtitle={PRODUCT_NEXERA.pitch}
        />

        <motion.div style={{ y }} className="mt-12 grid lg:grid-cols-3 gap-6">
          {/* Capabilities */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">What NEXERA can do</h3>
            <ul className="mt-4 space-y-2 text-zinc-700 dark:text-zinc-300">
              {PRODUCT_NEXERA.can.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Features */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Key features</h3>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-700 dark:text-zinc-300">
              {PRODUCT_NEXERA.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">We dogfood NEXERA daily — building with empathy for your team and clients.</div>
            </div>
          </Card>

          {/* Benefits */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">What you get</h3>
            <ul className="mt-4 space-y-2 text-zinc-700 dark:text-zinc-300">
              {PRODUCT_NEXERA.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Limitations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="mt-6"
        >
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-zinc-900 dark:text-zinc-100 font-medium">Clear & honest limitations</h4>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  We value transparency. Here are a few constraints we intentionally design for, with graceful handoffs when needed:
                </p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {PRODUCT_NEXERA.limitations.map((l, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-6 -z-10 bg-[radial-gradient(400px_at_70%_30%,rgba(20,184,166,0.12),transparent_60%)]" />
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-zinc-600 dark:text-zinc-300">Always-on voice agent</div>
                    <IconMoon className="w-6 h-6" />
                  </div>
                  <div className="mt-4">
                    <SoundWaves />
                  </div>
                  <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">Friendly by default. Human when it counts.</div>
                </Card>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Coming soon */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {["Product 2 — Coming soon","Product 3 — Coming soon"].map((label, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{label}</h4>
                <span className="text-xs text-zinc-500">R&D</span>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">We iterate fast. Share your wishlist — we might already be building it.</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== Section: Case Studies =====
const Cases = () => (
  <section id="cases" className="relative py-20 sm:py-28">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50/60 dark:to-zinc-900/20 pointer-events-none" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <SectionTitle kicker="Case Studies" title="Natural conversations that get things done" subtitle="Realistic call flows handled politely and efficiently." />
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {CASE_STUDIES.map((c, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 + idx * 0.1 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{c.title}</h3>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {c.transcript.map((line, i) => (
                  <p key={i}>
                    <span className="text-indigo-500">{line.startsWith("NEXERA") ? "NEXERA" : line.startsWith("Customer") ? "Customer" : line.split(":")[0]}</span>
                    {": "}
                    <span>{line.split(": ").slice(1).join(": ")}</span>
                  </p>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ===== Section: Features (visual, subtle moon vibe) =====
const Features = () => {
  const items = [
    { title: "Calendar-native", desc: "Reads/writes your calendars to prevent double-booking.", accent: "from-sky-500 to-indigo-500" },
    { title: "Handoff logic", desc: "Routes to a human when a question is out-of-scope.", accent: "from-emerald-500 to-teal-500" },
    { title: "Tone-smart", desc: "Friendly by default; professional when needed.", accent: "from-indigo-500 to-violet-500" },
    { title: "Custom names", desc: "Name and persona aligned to your brand.", accent: "from-fuchsia-500 to-pink-500" },
    { title: "Call flows", desc: "Bookings, reschedules, transfers, FAQs.", accent: "from-yellow-500 to-orange-500" },
    { title: "Omnichannel notifications", desc: "SMS, WhatsApp, or call — your choice.", accent: "from-blue-500 to-cyan-500" },
  ];

  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(500px_at_20%_10%,rgba(99,102,241,0.08),transparent_60%),radial-gradient(600px_at_90%_80%,rgba(16,185,129,0.08),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle kicker="Capabilities" title="Designed for clarity — built for scale" subtitle="Subtle moonlight; crystal voice." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Card className="p-6">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${it.accent} opacity-90`} />
                <h4 className="mt-4 font-medium text-zinc-900 dark:text-zinc-100">{it.title}</h4>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{it.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== Section: FAQ =====
const Faq = () => (
  <section id="faq" className="relative py-20 sm:py-28">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <SectionTitle kicker="FAQ" title="Answers at a glance" subtitle="If you have other questions, just ask — or call us directly." />
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {FAQ.map((item, idx) => (
          <Card key={idx} className="p-6">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{item.q}</h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.a}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// ===== Section: Team =====
const Team = () => (
  <section id="team" className="relative py-20 sm:py-28">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <SectionTitle kicker="Team" title="Meet the engineers behind LUNA" subtitle="Mechanical & chemical engineers with deep AI/ML expertise — building robust, reliable, and scalable voice systems." />
      <div className="mt-12 grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            At LUNA, our strength lies in our people. We bring professionalism shaped by working with global industry leaders, domain expertise across AI and ML technologies, data engineering, and automation, and proven best practices that make our solutions not just cutting-edge, but robust and scalable. We don’t just follow trends — we engineer innovation with measurable impact.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag>AI/ML</Tag>
            <Tag>Data Engineering</Tag>
            <Tag>Automation</Tag>
            <Tag>Voice UX</Tag>
          </div>
        </Card>
        <Card className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={`https://images.unsplash.com/photo-15${70 + i}618${20 + i}0-09${20 + i}c${10 + i}7b?auto=format&fit=crop&w=600&q=60`}
                  alt="Team"
                  className="w-full h-full object-cover"
                  onError={(e)=>{e.currentTarget.style.display='none'}}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </section>
);

// ===== Section: Contact =====
const Contact = () => (
  <section id="contact" className="relative py-20 sm:py-28">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <SectionTitle kicker="Contact" title="Start the conversation" subtitle="Tell us about your workflows and we’ll show you how voice fits — simply." />
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="text-sm text-zinc-600 dark:text-zinc-300 space-y-2">
            <p><span className="font-medium text-zinc-900 dark:text-zinc-100">Location:</span> {COMPANY.location}</p>
            <p><span className="font-medium text-zinc-900 dark:text-zinc-100">Phone:</span> <a className="hover:underline" href={`tel:${COMPANY.phone}`}>{formatPhone(COMPANY.phone)}</a></p>
            <p><span className="font-medium text-zinc-900 dark:text-zinc-100">Email:</span> <a className="hover:underline" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
          </div>
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-emerald-50 dark:from-indigo-950/40 dark:to-emerald-950/40 border border-zinc-200/70 dark:border-zinc-800/70">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">No forms today — call or email and we’ll set up a demo tailored to your systems.</p>
          </div>
        </Card>
        <Card className="p-6">
          <h4 className="font-medium text-zinc-900 dark:text-zinc-100">What happens next</h4>
          <ol className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300 list-decimal list-inside">
            <li>Quick discovery call (10–15 mins)</li>
            <li>Integration review (calendars, numbers, FAQs)</li>
            <li>Guided onboarding (days, not weeks)</li>
            <li>Live in production with ongoing optimization</li>
          </ol>
          <div className="mt-6">
            <SoundWaves />
          </div>
        </Card>
      </div>
    </div>
  </section>
);

// ===== Footer =====
const Footer = () => (
  <footer className="relative border-t border-zinc-200/70 dark:border-zinc-800/70 py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <IconMoon className="w-7 h-7" />
        <div>
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">LUNA</div>
          <div className="text-xs text-zinc-500">{COMPANY.expansion}</div>
        </div>
      </div>
      <div className="text-xs text-zinc-500">
        © {new Date().getFullYear()} LUNA. All rights reserved.
      </div>
      <div className="flex items-center gap-2 text-xs">
        <a href="#product" className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">Product</a>
        <span>•</span>
        <a href="#features" className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">Features</a>
        <span>•</span>
        <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"><IconPhone className="w-4 h-4"/>Call</a>
      </div>
    </div>
  </footer>
);

// ===== Helper: format phone =====
function formatPhone(num) {
  // naive SA local formatting +27 79 241 9460
  const cleaned = ("" + num).replace(/\D/g, "");
  if (!cleaned.startsWith("27")) return num;
  const cc = "+27";
  const r = cleaned.slice(2);
  return `${cc} ${r.slice(0,2)} ${r.slice(2,5)} ${r.slice(5)}`;
}

// ===== Floating Phone FAB =====
const PhoneFAB = () => (
  <a
    href={`tel:${COMPANY.phone}`}
    className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg bg-gradient-to-br from-indigo-600 to-emerald-500 hover:opacity-90 focus:outline-none"
    aria-label="Call LUNA"
  >
    <IconPhone className="w-5 h-5" />
  </a>
);

// ===== Root Component =====
export default function LUNA() {
  const { isDark, setIsDark } = useTheme();
  useCursorGlow();

  // page-level subtle parallax for background moons
  const moons = useMemo(() => [
    { size: 280, x: "10%", y: "18%", opacity: 0.12 },
    { size: 220, x: "80%", y: "72%", opacity: 0.10 },
    { size: 160, x: "70%", y: "24%", opacity: 0.08 },
  ], []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-indigo-200/60 dark:selection:bg-indigo-700/40">
      {/* Global styles for animations */}
      <style>{`
        @keyframes wave { 0%,100% { transform: scaleY(0.6); opacity: .7 } 50% { transform: scaleY(1.3); opacity: 1 } }
      `}</style>

      {/* Decorative moons (parallax-ish using perspective) */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0" style={{ perspective: 1000 }}>
          {moons.map((m, i) => (
            <div key={i} className="absolute" style={{ left: m.x, top: m.y, transform: `translate(-50%, -50%)`, opacity: m.opacity }}>
              <div className="rounded-full" style={{ width: m.size, height: m.size, background: "radial-gradient(circle at 30% 30%, #f4f4f5, #e5e7eb 40%, #cbd5e1 60%)" }} />
            </div>
          ))}
        </div>
      </div>

      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <main>
        {/* HERO */}
        <Hero />

        {/* PRODUCT */}
        <Product />

        {/* CASES */}
        <Cases />

        {/* FEATURES */}
        <Features />

        {/* FAQ */}
        <Faq />

        {/* TEAM */}
        <Team />

        {/* CONTACT */}
        <Contact />
      </main>

      <Footer />

      {/* Floating action phone */}
      <PhoneFAB />
    </div>
  );
}

