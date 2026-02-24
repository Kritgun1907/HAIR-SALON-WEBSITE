/**
 * @file LandingPage.tsx
 * @description Hero landing page — premium minimal design.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ClipboardList, BarChart2, Scissors, Sparkles,
  LogIn, Star, Clock, ShieldCheck, TrendingUp,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import AppLayout from "@/layouts/AppLayout";

// ── Slideshow data ─────────────────────────────────────────────────────────────
const SLIDES = [
  { src: "/experts-hair-1.webp", caption: "Expert Styling & Cuts" },
  { src: "/experts-hair-2.webp", caption: "Colour & Treatments" },
  { src: "/experts-hair-3.webp", caption: "Premium Salon Experience" },
  { src: "/experts-hair-4.webp", caption: "Artist-Level Finishing" },
];

// ── Typewriter hook ────────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 38, startDelay = 900) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// ── Why-Us card data ───────────────────────────────────────────────────────────
const WHY_US = [
  {
    icon: Star,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    title: "Expert Artists",
    desc: "Our certified stylists bring years of experience in cuts, colour, and treatments — delivering salon-quality results every visit.",
  },
  {
    icon: Clock,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    title: "Zero Wait Time",
    desc: "Book your slot in seconds and walk in at your exact time. We respect your schedule as much as we respect your hair.",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    title: "Hygiene Guaranteed",
    desc: "Freshly sterilised tools, clean towels, and a spotless environment — because great hair starts with a safe space.",
  },
  {
    icon: TrendingUp,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
    title: "Transparent Pricing",
    desc: "No hidden charges. See service prices upfront, get digital receipts, and pay seamlessly via Razorpay.",
  },
];

// ── Feature pills data ─────────────────────────────────────────────────────────
const PILLS = [
  { icon: <Scissors className="w-3.5 h-3.5" />, label: "Appointment Booking" },
  { icon: <ClipboardList className="w-3.5 h-3.5" />, label: "Service Tracking" },
  { icon: <BarChart2 className="w-3.5 h-3.5" />, label: "Revenue Analytics" },
  { icon: <Sparkles className="w-3.5 h-3.5" />, label: "Artist Management" },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax
  const heroY = useTransform(scrollY, [0, 500], [0, -110]);
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  // Typewriter on sub-headline
  const sub = useTypewriter(
    "Book appointments, process payments, and track your salon's performance — all in one place.",
    32,
    900,
  );

  return (
    <AppLayout>
      {/* ══════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════ */}
      <div ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "80vh" }}>
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] pt-8 text-center px-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 flex items-center gap-2.5 px-6 py-3 rounded-full border border-stone-300/60 bg-white/80 backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-stone-600 tracking-[0.18em] uppercase">
              Premium Salon Management
            </span>
          </motion.div>

          {/* ── Headline — blur-fade-in with gap between lines ── */}
          <div className="mb-8 select-none flex flex-col items-center gap-2">
            <motion.h1
              initial={{ opacity: 0, filter: "blur(18px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              className="font-black tracking-tight text-stone-900 leading-none"
              style={{ fontSize: "clamp(3.4rem, 10vw, 8rem)" }}
            >
              Expert
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, filter: "blur(18px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.38 }}
              className="font-black tracking-tight text-stone-900 leading-none"
              style={{ fontSize: "clamp(3.4rem, 10vw, 8rem)" }}
            >
              <span className="relative inline-block">
                Hair Dresser
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 1.1 }}
                  className="absolute left-0 right-0 origin-left rounded-full"
                  style={{ bottom: "-4px", height: "4px", background: "linear-gradient(to right, #b8966e, #e0bb7a)" }}
                />
              </span>
            </motion.h1>
          </div>

          {/* Sub-headline — typewriter */}
          <div className="max-w-xl mb-14 min-h-16 flex items-start justify-center">
            <p className="text-lg text-stone-500 leading-relaxed font-light text-center">
              {sub.displayed}
              {!sub.done && (
                <span className="inline-block w-0.5 h-[1.1em] bg-stone-400 ml-0.5 align-middle animate-pulse" />
              )}
            </p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link to="/signin">
              <motion.div
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group relative overflow-hidden flex items-center gap-3 px-9 py-4 rounded-full bg-stone-900 text-white font-semibold text-base shadow-xl shadow-stone-900/20 cursor-pointer"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                <ClipboardList className="w-5 h-5 transition-transform group-hover:rotate-6 duration-300" />
                <span>Get Started</span>
              </motion.div>
            </Link>

            <Link to="/signin">
              <motion.div
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group flex items-center gap-3 px-9 py-4 rounded-full border border-stone-400/50 bg-white/70 backdrop-blur-sm text-stone-800 font-semibold text-base shadow-sm hover:shadow-md hover:bg-white/90 hover:border-stone-500/50 transition-all duration-200 cursor-pointer"
              >
                <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-300" />
                <span>Sign In</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Scroll nudge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          >
            <span className="text-[10px] tracking-[0.18em] uppercase text-stone-400 font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-linear-to-b from-stone-400 to-transparent rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
          SEE US IN ACTION — image carousel
      ══════════════════════════════════════════════════ */}
      <SeeInActionSection />

      {/* ══════════════════════════════════════════════════
          FEATURE PILLS
      ══════════════════════════════════════════════════ */}
      <FeaturePills />

      {/* ══════════════════════════════════════════════════
          WHY US SECTION
      ══════════════════════════════════════════════════ */}
      <section ref={whyRef} className="py-24 px-6">
        <WhyUsHeader />
        {/* Full-width 4-col grid — cards stay square/compact, not elongated */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-7xl mx-auto">
          {WHY_US.map((card, i) => (
            <WhyUsCard key={card.title} {...card} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <Link to="/signin">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden flex items-center gap-3 px-10 py-4 rounded-full bg-stone-900 text-white font-semibold text-base shadow-xl shadow-stone-900/20 cursor-pointer"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/10 to-transparent" />
              <Scissors className="w-4 h-4 transition-transform group-hover:rotate-12 duration-300" />
              <span>Record a Visit</span>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <SiteFooter />
    </AppLayout>
  );
}

// ── See Us In Action carousel ──────────────────────────────────────────────────
function SeeInActionSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const total = SLIDES.length;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % total);
    }, 4000);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const go = (dir: 1 | -1) => {
    setActive((a) => (a + dir + total) % total);
    startTimer(); // reset timer on manual nav
  };

  // indices for the 3 visible cards: prev, active, next
  const prev = (active - 1 + total) % total;
  const next = (active + 1) % total;

  return (
    <section ref={sectionRef} className="py-20 px-4 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase text-stone-400 mb-3">
          See Us In Action
        </span>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-stone-900 leading-tight">
          Built for the salon floor.
        </h2>
        <p className="mt-3 text-base text-stone-400 font-light">
          Real spaces. Real artistry. Real results.
        </p>
      </motion.div>

      {/* Carousel — prev arrow | left card | center card | right card | next arrow */}
      <div className="relative flex items-center justify-center gap-4 max-w-6xl mx-auto">

        {/* Prev arrow */}
        <button
          onClick={() => go(-1)}
          className="z-10 shrink-0 w-10 h-10 rounded-full bg-white border border-stone-200 shadow-md flex items-center justify-center text-stone-600 hover:bg-stone-50 hover:scale-105 transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Left card — dimmed, smaller */}
        <div className="hidden md:block shrink-0 rounded-2xl overflow-hidden shadow-lg opacity-55 transition-all duration-500" style={{ width: "260px", height: "340px" }}>
          <img
            src={SLIDES[prev].src}
            alt={SLIDES[prev].caption}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center card — large, prominent, white bg wrapper like reference */}
        <div className="shrink-0 bg-white rounded-3xl shadow-2xl p-4" style={{ width: "min(660px, 88vw)" }}>
          <div className="relative rounded-2xl overflow-hidden" style={{ height: "min(460px, 56vw)" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={SLIDES[active].src}
                alt={SLIDES[active].caption}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
          {/* Caption below image inside card */}
          <p className="text-center text-sm text-stone-500 font-medium mt-3 pb-1">
            {SLIDES[active].caption}
          </p>
        </div>

        {/* Right card — dimmed, smaller */}
        <div className="hidden md:block shrink-0 rounded-2xl overflow-hidden shadow-lg opacity-55 transition-all duration-500" style={{ width: "260px", height: "340px" }}>
          <img
            src={SLIDES[next].src}
            alt={SLIDES[next].caption}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Next arrow */}
        <button
          onClick={() => go(1)}
          className="z-10 shrink-0 w-10 h-10 rounded-full bg-white border border-stone-200 shadow-md flex items-center justify-center text-stone-600 hover:bg-stone-50 hover:scale-105 transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-7 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); startTimer(); }}
            className={`rounded-full transition-all duration-300 ${
              i === active ? "w-5 h-1.5 bg-stone-700" : "w-1.5 h-1.5 bg-stone-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// ── Feature pills ──────────────────────────────────────────────────────────────
function FeaturePills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="py-10 flex flex-wrap justify-center gap-3 px-6"
    >
      {PILLS.map(({ icon, label }) => (
        <span
          key={label}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-stone-200 text-sm font-medium text-stone-600 shadow-sm hover:shadow-md hover:border-stone-300 transition-all duration-200"
        >
          {icon}{label}
        </span>
      ))}
    </motion.div>
  );
}

// ── Why Us section header ──────────────────────────────────────────────────────
function WhyUsHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="text-center max-w-2xl mx-auto">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
        className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-4"
      >
        Why choose us
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, filter: "blur(12px)", y: 12 }}
        animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
        className="text-4xl sm:text-5xl font-black tracking-tight text-stone-900 leading-tight"
      >
        The Salon That Works
        <br />
        <span className="relative inline-block">
          As Hard As You Do
          <motion.span
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
            className="absolute left-0 right-0 origin-left rounded-full"
            style={{ bottom: "-3px", height: "3px", background: "linear-gradient(to right, #b8966e, #e0bb7a)" }}
          />
        </span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-5 text-base text-stone-400 font-light leading-relaxed"
      >
        We combine top-tier artistry with seamless technology to give you an experience worth returning for.
      </motion.p>
    </div>
  );
}

// ── Individual Why-Us card ─────────────────────────────────────────────────────
function WhyUsCard({
  icon: Icon, iconColor, iconBg, title, desc, index,
}: {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
      whileHover={{ y: -4, boxShadow: "0 16px 40px -8px rgba(0,0,0,0.09)" }}
      className="group bg-white border border-stone-100 rounded-2xl p-6 shadow-sm cursor-default transition-shadow duration-300"
    >
      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <span className="text-[10px] font-semibold tracking-widest text-stone-300 uppercase mb-2 block">
        0{index + 1}
      </span>
      <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug">{title}</h3>
      <p className="text-sm text-stone-400 leading-relaxed font-light">{desc}</p>
    </motion.div>
  );
}

// ── Site Footer ───────────────────────────────────────────────────────────────
function SiteFooter() {
  return (
    <footer
      className="w-full mt-8"
      style={{ background: "linear-gradient(160deg, #2a1a0e 0%, #1c120a 60%, #140d06 100%)" }}
    >
      {/* Top rule */}
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(180,140,60,0.35), transparent)" }} />

      <div className="mx-auto max-w-7xl px-6 pt-14 pb-8">

        {/* ── Three-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">

          {/* Column 1 — brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-600 flex items-center justify-center ring-1 ring-amber-400/25">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">The Experts</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed font-light max-w-xs">
              Premium hair salon in Bengaluru. Expert stylists, zero wait time, seamless digital booking.
            </p>
            {/* Social row */}
            <div className="flex items-center gap-3 mt-1">
              {/* Instagram — real link + icon */}
              <a
                href="https://www.instagram.com/theexpertssalonpatiala/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full flex items-center justify-center text-amber-400/70 hover:text-amber-400 transition-colors duration-150"
                style={{ border: "1px solid rgba(180,140,60,0.25)" }}
              >
                {/* Official Instagram glyph */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook placeholder */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-amber-400/70 hover:text-amber-400 transition-colors duration-150"
                style={{ border: "1px solid rgba(180,140,60,0.25)" }}
              >
                FB
              </a>

              {/* WhatsApp placeholder */}
              <a
                href="#"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-amber-400/70 hover:text-amber-400 transition-colors duration-150"
                style={{ border: "1px solid rgba(180,140,60,0.25)" }}
              >
                WA
              </a>
            </div>
          </div>

          {/* Column 2 — quick links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1">
              Quick Links
            </h4>
            {[
              { label: "Home", to: "/" },
              { label: "About Us", to: "/about" },
              { label: "Contact", to: "/contact" },
              { label: "Visit Entry", to: "/visit-entry" },
              { label: "Sign In", to: "/signin" },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-white/45 hover:text-amber-400 transition-colors duration-150 font-light w-fit"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Column 3 — contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-1">
              Contact Us
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-white/45 font-light">
              <p>
                <span className="text-white/25 text-xs uppercase tracking-widest block mb-0.5">Address</span>
                Near: Sunrise Motel, Sirhind Road Patial, Punjab 147004
              </p>
              <p>
                <span className="text-white/25 text-xs uppercase tracking-widest block mb-0.5">Phone</span>
                <a href="tel:+919814830550" className="hover:text-amber-400 transition-colors duration-150">
                  +91 98148 30550
                </a>
              </p>
              <p>
                <span className="text-white/25 text-xs uppercase tracking-widest block mb-0.5">Email</span>
                <a href="mailto:theexpertssalon@gmail.com" className="hover:text-amber-400 transition-colors duration-150">
                  theexpertssalon@gmail.com
                </a>
              </p>
              <p>
                <span className="text-white/25 text-xs uppercase tracking-widest block mb-0.5">Hours</span>
                Mon – Sat · 09:00 AM – 09:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom rule + copyright ── */}
        <div className="w-full h-px mb-6" style={{ background: "rgba(255,255,255,0.07)" }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/25 tracking-wide">
            © {new Date().getFullYear()} The Experts Hair Salon · All rights reserved
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Terms of Service", to: "/terms-of-service" },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-[11px] text-white/25 hover:text-white/50 transition-colors duration-150 tracking-wide"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
