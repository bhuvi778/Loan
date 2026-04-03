// Writes a full-screen background-image carousel Hero.js
// node _write_hero4.cjs
const fs = require("fs");
const path = require("path");

const code = `"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, TrendingUp, Shield, BarChart3,
  PiggyBank, ChevronDown, Zap, Play, Pause,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   SLIDE DATA
───────────────────────────────────────────────────────── */
const slides = [
  {
    id: 0,
    tag: "Wealth Management",
    badge: "Top Rated 2025",
    headline: "Grow Your",
    highlight: "Wealth Smarter",
    sub: "Strategic SIPs, equity portfolios and mutual fund advisory by SEBI-registered experts who outperform the market year after year.",
    stats: [
      { value: "\\u20b9500Cr+", label: "Assets Managed" },
      { value: "+34.2%",        label: "Avg Annual Return" },
      { value: "10K+",          label: "Happy Clients" },
    ],
    cta: "Start Investing",
    accent: "#F59E0B",
    accentRgb: "245,158,11",
    Icon: TrendingUp,
    // High-res Unsplash — stock market trading screens
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=90",
  },
  {
    id: 1,
    tag: "Debt Freedom",
    badge: "RBI & SEBI Compliant",
    headline: "Break Free",
    highlight: "From Debt Forever",
    sub: "Restructured repayment plans, bank negotiations and credit score repair that have helped 4,000+ Indians escape the debt trap in under 18 months.",
    stats: [
      { value: "4,000+", label: "Debt-Free Clients" },
      { value: "18 mo",  label: "Avg Timeline"      },
      { value: "98%",    label: "Success Rate"      },
    ],
    cta: "Eliminate My Debt",
    accent: "#EF4444",
    accentRgb: "239,68,68",
    Icon: Shield,
    // High-res — financial documents / planning
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=90",
  },
  {
    id: 2,
    tag: "Tax Advisory",
    badge: "72-hr Plan Delivery",
    headline: "Pay Less Tax",
    highlight: "Legally & Smartly",
    sub: "CA-led advisory maximising 80C, 80D, HRA and NPS benefits. We file your ITR and ensure zero surprises from the Income Tax Department.",
    stats: [
      { value: "40%",   label: "Average Tax Saved" },
      { value: "10K+",  label: "ITRs Filed"        },
      { value: "100%",  label: "Compliance Rate"   },
    ],
    cta: "Save on Taxes Now",
    accent: "#10B981",
    accentRgb: "16,185,129",
    Icon: BarChart3,
    // High-res — calculator & spreadsheets
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=90",
  },
  {
    id: 3,
    tag: "Financial Coaching",
    badge: "Trusted Across India",
    headline: "Build Lifelong",
    highlight: "Financial Freedom",
    sub: "One-on-one mentoring, budgeting frameworks and investment literacy sessions designed for first-time investors starting completely from scratch.",
    stats: [
      { value: "500+",    label: "Sessions / Month" },
      { value: "4.67\\u2605", label: "Client Rating"   },
      { value: "15+",     label: "Cities Covered"   },
    ],
    cta: "Book a Session",
    accent: "#8B5CF6",
    accentRgb: "139,92,246",
    Icon: PiggyBank,
    // High-res — business coaching / meeting
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=90",
  },
];

const AUTOPLAY = 6000;

/* ─────────────────────────────────────────────────────────
   HERO COMPONENT
───────────────────────────────────────────────────────── */
export default function Hero() {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const t0Ref = useRef(null);

  const next = useCallback(() => {
    setDir(1);
    setCur((p) => (p + 1) % slides.length);
    setProgress(0);
    t0Ref.current = performance.now();
  }, []);

  const prev = useCallback(() => {
    setDir(-1);
    setCur((p) => (p - 1 + slides.length) % slides.length);
    setProgress(0);
    t0Ref.current = performance.now();
  }, []);

  const goTo = useCallback((idx) => {
    setDir(idx > cur ? 1 : -1);
    setCur(idx);
    setProgress(0);
    t0Ref.current = performance.now();
  }, [cur]);

  useEffect(() => {
    if (!playing) { cancelAnimationFrame(rafRef.current); return; }
    t0Ref.current = performance.now();
    const tick = (now) => {
      const pct = Math.min(((now - t0Ref.current) / AUTOPLAY) * 100, 100);
      setProgress(pct);
      if (pct >= 100) { next(); } else { rafRef.current = requestAnimationFrame(tick); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cur, playing, next]);

  const slide = slides[cur];

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex flex-col select-none"
    >
      {/* ════════════════════════════════════════
          FULL-SCREEN BACKGROUND IMAGES
          crossfade on slide change
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {slides.map((s, i) =>
          i === cur ? (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <img
                src={s.img}
                alt={s.tag}
                draggable={false}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Dark gradient overlays — keep text readable */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.25) 100%)" }}
      />
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%)" }}
      />

      {/* Accent colour wash that changes per slide */}
      <AnimatePresence>
        <motion.div
          key={"tint" + cur}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: \`radial-gradient(ellipse 60% 80% at 0% 50%, rgba(\${slide.accentRgb},0.12) 0%, transparent 70%)\`,
          }}
        />
      </AnimatePresence>

      {/* Fine grid texture */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* ════════════════════════════════════════
          SLIDE COUNTER top-right
      ════════════════════════════════════════ */}
      <div className="absolute top-24 right-10 z-30 hidden lg:flex items-end gap-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={cur}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="font-black leading-none drop-shadow-2xl"
            style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: slide.accent }}
          >
            0{cur + 1}
          </motion.span>
        </AnimatePresence>
        <span className="text-white/30 text-2xl pb-1">/ 0{slides.length}</span>
      </div>

      {/* Vertical dot rail desktop */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-4">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={"Go to slide " + (i + 1)}
            className="flex items-center gap-3 group"
          >
            <motion.div
              animate={{
                width: i === cur ? 32 : 6,
                background: i === cur ? s.accent : "rgba(255,255,255,0.25)",
              }}
              transition={{ duration: 0.35 }}
              className="h-1.5 rounded-full"
              style={{ boxShadow: i === cur ? \`0 0 10px \${s.accent}\` : "none" }}
            />
            {i === cur && (
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-70" style={{ color: s.accent }}>
                {s.tag}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 xl:px-20 pt-28 pb-6">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={cur}
              custom={dir}
              initial={{ opacity: 0, x: dir > 0 ? 60 : -60, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir > 0 ? -40 : 40, filter: "blur(6px)" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl xl:max-w-3xl"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-7 backdrop-blur-sm"
                style={{
                  background: \`rgba(\${slide.accentRgb},0.15)\`,
                  border: \`1px solid rgba(\${slide.accentRgb},0.4)\`,
                  color: slide.accent,
                }}
              >
                <Zap size={11} fill="currentColor" />
                {slide.badge}
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="font-black text-white leading-[1.0] tracking-tight drop-shadow-2xl"
                style={{ fontSize: "clamp(3rem, 6.5vw, 6.5rem)", textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}
              >
                {slide.headline}
                <br />
                <span
                  style={{
                    background: \`linear-gradient(130deg, \${slide.accent} 0%, \${slide.accent}dd 100%)\`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: \`drop-shadow(0 0 32px rgba(\${slide.accentRgb},0.55))\`,
                  }}
                >
                  {slide.highlight}
                </span>
              </motion.h1>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.55 }}
                className="text-white/70 leading-relaxed mt-6 mb-9"
                style={{ fontSize: "clamp(1rem, 1.25vw, 1.2rem)", textShadow: "0 2px 16px rgba(0,0,0,0.6)", maxWidth: "580px" }}
              >
                {slide.sub}
              </motion.p>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3 mb-12"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, boxShadow: \`0 0 50px rgba(\${slide.accentRgb},0.65)\` }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-9 py-4 rounded-2xl font-black text-black text-base"
                  style={{
                    background: \`linear-gradient(135deg, \${slide.accent}, \${slide.accent}cc)\`,
                    boxShadow: \`0 4px 32px rgba(\${slide.accentRgb},0.45)\`,
                  }}
                >
                  {slide.cta} <ArrowRight size={17} strokeWidth={2.5} />
                </motion.a>
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.12)" }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-9 py-4 rounded-2xl font-semibold text-white text-base backdrop-blur-sm transition-all duration-300"
                  style={{ border: "1px solid rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.06)" }}
                >
                  Explore Services
                </motion.a>
              </motion.div>

              {/* Stat chips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.52 }}
                className="flex flex-wrap gap-3"
              >
                {slide.stats.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-md"
                    style={{
                      background: "rgba(0,0,0,0.45)",
                      border: \`1px solid rgba(\${slide.accentRgb},0.28)\`,
                    }}
                  >
                    <div className="w-0.5 h-8 rounded-full" style={{ background: slide.accent }} />
                    <div>
                      <p
                        className="font-black text-xl leading-none"
                        style={{ color: slide.accent, textShadow: \`0 0 20px rgba(\${slide.accentRgb},0.55)\` }}
                      >
                        {s.value}
                      </p>
                      <p className="text-white/40 text-[10px] mt-0.5 font-medium">{s.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ════════════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════════════ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-16 xl:px-20 pb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Slide thumbnails */}
          <div className="flex items-center gap-3">
            {slides.map((s, i) => {
              const active = i === cur;
              return (
                <button key={i} onClick={() => goTo(i)} className="flex flex-col items-center gap-2 group">
                  {/* Icon chip */}
                  <div
                    className="rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-md"
                    style={{
                      width: active ? 88 : 48,
                      height: active ? 48 : 36,
                      background: active
                        ? \`rgba(\${s.accentRgb},0.22)\`
                        : "rgba(255,255,255,0.06)",
                      border: active
                        ? \`1px solid rgba(\${s.accentRgb},0.5)\`
                        : "1px solid rgba(255,255,255,0.1)",
                      boxShadow: active ? \`0 0 20px rgba(\${s.accentRgb},0.3)\` : "none",
                    }}
                  >
                    <s.Icon size={active ? 20 : 15} style={{ color: active ? s.accent : "rgba(255,255,255,0.3)" }} />
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                    {active && (
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: s.accent, width: progress + "%" }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Prev / Play-Pause / Next */}
          <div className="flex items-center gap-2.5">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white/50 hover:text-white backdrop-blur-md transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)" }}
            >
              <ArrowLeft size={17} />
            </motion.button>

            <motion.button
              onClick={() => setPlaying((p) => !p)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-md transition-all"
              style={{
                border: \`1px solid rgba(\${slide.accentRgb},0.5)\`,
                background: \`rgba(\${slide.accentRgb},0.15)\`,
                color: slide.accent,
              }}
            >
              {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
            </motion.button>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white/50 hover:text-white backdrop-blur-md transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)" }}
            >
              <ArrowRight size={17} />
            </motion.button>
          </div>

          {/* Live indicator */}
          <div className="hidden md:flex items-center gap-2 backdrop-blur-sm px-3 py-2 rounded-xl"
            style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: slide.accent }} />
            <span className="text-xs text-white/50 font-medium tracking-wide">{slide.tag}</span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-1"
      >
        <span className="text-[9px] text-white/20 tracking-widest font-medium uppercase">Scroll</span>
        <ChevronDown size={16} color="rgba(255,255,255,0.15)" />
      </motion.a>
    </section>
  );
}
`;

const outPath = path.join(__dirname, "components", "Hero.js");
fs.writeFileSync(outPath, code, { encoding: "utf8" });
const stat = fs.statSync(outPath);
console.log("Hero.js written. Size:", stat.size, "bytes");

// UTF-8 check
const buf = fs.readFileSync(outPath);
let bad = false;
for (let i = 0; i < buf.length; i++) {
  const b = buf[i];
  if (b < 0x80) continue;
  if ((b & 0xE0) === 0xC0 && i + 1 < buf.length) { i += 1; continue; }
  if ((b & 0xF0) === 0xE0 && i + 2 < buf.length) { i += 2; continue; }
  if ((b & 0xF8) === 0xF0 && i + 3 < buf.length) { i += 3; continue; }
  console.error("Bad byte", b.toString(16), "at offset", i);
  bad = true; break;
}
if (!bad) console.log("UTF-8 OK");
