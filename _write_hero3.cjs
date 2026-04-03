// Writes an improved carousel Hero.js — run with: node _write_hero3.cjs
const fs = require("fs");
const path = require("path");

const code = `"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, TrendingUp, Shield, BarChart3, PiggyBank, ChevronDown, Zap, Play, Pause, Star } from "lucide-react";

const slides = [
  {
    id: 0,
    tag: "Wealth Management",
    badge: "Top Rated 2025",
    headline: "Grow Your",
    highlight: "Wealth Smarter",
    sub: "Strategic SIPs, equity portfolios and mutual fund advisory designed by SEBI-registered experts who outperform the market year after year.",
    stat1: { value: "\\u20b9500Cr+", label: "Assets Managed" },
    stat2: { value: "+34.2%", label: "Avg Annual Return" },
    stat3: { value: "10K+", label: "Happy Clients" },
    cta: "Start Investing",
    accent: "#F59E0B",
    accentRgb: "245,158,11",
    bg1: "#1a0f00",
    bg2: "#0a0800",
    Icon: TrendingUp,
    shape: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
  },
  {
    id: 1,
    tag: "Debt Freedom",
    badge: "RBI & SEBI Compliant",
    headline: "Break Free",
    highlight: "From Debt Forever",
    sub: "Restructured repayment plans, bank negotiations and credit score repair that have helped 4,000+ Indians escape the debt trap in under 18 months.",
    stat1: { value: "4,000+", label: "Debt-Free Clients" },
    stat2: { value: "18 mo", label: "Avg Timeline" },
    stat3: { value: "98%", label: "Success Rate" },
    cta: "Eliminate My Debt",
    accent: "#EF4444",
    accentRgb: "239,68,68",
    bg1: "#1a0000",
    bg2: "#0a0000",
    Icon: Shield,
    shape: "polygon(0 25%, 50% 0, 100% 25%, 100% 100%, 0 100%)",
  },
  {
    id: 2,
    tag: "Tax Advisory",
    badge: "72-hr Plan Delivery",
    headline: "Pay Less Tax",
    highlight: "Legally & Smartly",
    sub: "CA-led advisory maximising 80C, 80D, HRA and NPS benefits. We file your ITR and ensure zero surprises from the Income Tax Department.",
    stat1: { value: "40%", label: "Average Tax Saved" },
    stat2: { value: "10K+", label: "ITRs Filed" },
    stat3: { value: "100%", label: "Compliance Rate" },
    cta: "Save on Taxes Now",
    accent: "#10B981",
    accentRgb: "16,185,129",
    bg1: "#001a0a",
    bg2: "#000a05",
    Icon: BarChart3,
    shape: "circle(50% at 50% 50%)",
  },
  {
    id: 3,
    tag: "Financial Coaching",
    badge: "Trusted Across India",
    headline: "Build Lifelong",
    highlight: "Financial Freedom",
    sub: "One-on-one mentoring, budgeting frameworks and investment literacy sessions designed for first-time investors starting completely from scratch.",
    stat1: { value: "500+", label: "Sessions / Month" },
    stat2: { value: "4.67\\u2605", label: "Client Rating" },
    stat3: { value: "15+", label: "Cities Covered" },
    cta: "Book a Session",
    accent: "#8B5CF6",
    accentRgb: "139,92,246",
    bg1: "#0d001a",
    bg2: "#06000a",
    Icon: PiggyBank,
    shape: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  },
];

const AUTOPLAY = 5500;

const variants = {
  enter: (d) => ({
    x: d > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.94,
    filter: "blur(10px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (d) => ({
    x: d > 0 ? "-60%" : "60%",
    opacity: 0,
    scale: 0.94,
    filter: "blur(10px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

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
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#060606] flex flex-col select-none">

      {/* Animated full-screen background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={"bg" + cur}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <div className="absolute inset-0" style={{ background: \`radial-gradient(ellipse 90% 70% at 65% 40%, rgba(\${slide.accentRgb},0.10) 0%, transparent 70%)\` }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px]" style={{ background: \`radial-gradient(circle at 100% 0%, rgba(\${slide.accentRgb},0.08) 0%, transparent 60%)\` }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px]" style={{ background: \`radial-gradient(circle at 0% 100%, rgba(\${slide.accentRgb},0.06) 0%, transparent 60%)\` }} />
        </motion.div>
      </AnimatePresence>

      {/* Grid texture */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      {/* Morphing background shape */}
      <AnimatePresence mode="wait">
        <motion.div
          key={"shape" + cur}
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 0.04, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.3, rotate: 20 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute right-[-10%] top-[5%] w-[650px] h-[650px] pointer-events-none z-0"
          style={{ background: slide.accent, clipPath: slide.shape }}
        />
      </AnimatePresence>

      {/* Floating orbs */}
      <AnimatePresence mode="wait">
        <motion.div key={"orb" + cur} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[
            { size: 320, top: "8%",   left: "2%",    delay: 0   },
            { size: 200, top: "60%",  left: "5%",    delay: 1.5 },
            { size: 260, top: "15%",  right: "3%",   delay: 0.8 },
            { size: 180, bottom: "10%", right: "8%", delay: 2   },
          ].map((o, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -24, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 6 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: o.delay }}
              className="absolute rounded-full"
              style={{
                width: o.size, height: o.size,
                top: o.top, left: o.left, right: o.right, bottom: o.bottom,
                background: \`radial-gradient(circle, rgba(\${slide.accentRgb},0.07) 0%, transparent 70%)\`,
                filter: "blur(40px)",
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Slide counter top-right */}
      <div className="absolute top-24 right-8 z-30 hidden lg:flex items-end gap-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={cur}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-black text-5xl leading-none"
            style={{ color: slide.accent }}
          >
            0{cur + 1}
          </motion.span>
        </AnimatePresence>
        <span className="text-gray-700 text-xl pb-1">/ 0{slides.length}</span>
      </div>

      {/* Vertical dot rail (desktop) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative flex items-center justify-center w-3 h-3 rounded-full transition-all duration-300"
            style={{ background: i === cur ? s.accent : "rgba(255,255,255,0.12)", transform: i === cur ? "scale(1.4)" : "scale(1)", boxShadow: i === cur ? \`0 0 12px \${s.accent}\` : "none" }}
          />
        ))}
      </div>

      {/* MAIN SLIDE AREA */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 pt-24 pb-4">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={cur}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-center"
            >
              {/* LEFT TEXT */}
              <div className="flex flex-col text-center lg:text-left">
                {/* Badge */}
                <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                  className="inline-flex items-center self-center lg:self-start gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
                  style={{ background: \`rgba(\${slide.accentRgb},0.1)\`, border: \`1px solid rgba(\${slide.accentRgb},0.3)\`, color: slide.accent }}
                >
                  <Zap size={11} fill="currentColor" />
                  {slide.badge}
                </motion.div>

                {/* Headline */}
                <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.6, ease: [0.22,1,0.36,1] }}>
                  <h1 className="font-black text-white leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2.8rem, 5.5vw, 5.4rem)" }}>
                    {slide.headline}
                    <br />
                    <span style={{ background: \`linear-gradient(130deg, \${slide.accent} 0%, \${slide.accent}aa 100%)\`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {slide.highlight}
                    </span>
                  </h1>
                </motion.div>

                {/* Sub */}
                <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.55 }}
                  className="text-gray-400 leading-relaxed mt-5 mb-8 max-w-lg mx-auto lg:mx-0"
                  style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.1rem)" }}
                >
                  {slide.sub}
                </motion.p>

                {/* CTA row */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10"
                >
                  <motion.a href="#contact"
                    whileHover={{ scale: 1.04, boxShadow: \`0 0 44px rgba(\${slide.accentRgb},0.55)\` }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-black text-base"
                    style={{ background: \`linear-gradient(135deg, \${slide.accent}, \${slide.accent}cc)\`, boxShadow: \`0 4px 28px rgba(\${slide.accentRgb},0.35)\` }}
                  >
                    {slide.cta} <ArrowRight size={17} />
                  </motion.a>
                  <motion.a href="#services"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white text-base border transition-all duration-300 hover:border-white/20 hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.03)" }}
                  >
                    Explore Services
                  </motion.a>
                </motion.div>

                {/* Stat chips */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-3 justify-center lg:justify-start"
                >
                  {[slide.stat1, slide.stat2, slide.stat3].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                      style={{ background: \`rgba(\${slide.accentRgb},0.07)\`, border: \`1px solid rgba(\${slide.accentRgb},0.18)\` }}
                    >
                      <div className="w-0.5 h-7 rounded-full" style={{ background: slide.accent }} />
                      <div>
                        <p className="font-black text-lg leading-none" style={{ color: slide.accent, textShadow: \`0 0 16px rgba(\${slide.accentRgb},0.5)\` }}>{s.value}</p>
                        <p className="text-gray-500 text-[10px] mt-0.5 font-medium">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT CARD */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22,1,0.36,1] }}
                className="flex justify-center lg:justify-end"
              >
                <HeroCard slide={slide} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 pb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Thumbnail strip */}
          <div className="flex items-center gap-2">
            {slides.map((s, i) => {
              const active = i === cur;
              return (
                <button key={i} onClick={() => goTo(i)} className="flex flex-col items-center gap-1.5 transition-all duration-300">
                  <div
                    className="rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300"
                    style={{
                      width: active ? 80 : 44,
                      height: active ? 44 : 32,
                      background: active ? \`rgba(\${s.accentRgb},0.15)\` : "rgba(255,255,255,0.04)",
                      border: active ? \`1px solid rgba(\${s.accentRgb},0.4)\` : "1px solid rgba(255,255,255,0.06)",
                      boxShadow: active ? \`0 0 16px rgba(\${s.accentRgb},0.25)\` : "none",
                    }}
                  >
                    <s.Icon size={active ? 18 : 14} style={{ color: active ? s.accent : "rgba(255,255,255,0.25)" }} />
                  </div>
                  <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    {active && <motion.div className="h-full rounded-full" style={{ background: s.accent, width: progress + "%" }} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Prev / Play / Next */}
          <div className="flex items-center gap-2.5">
            <motion.button onClick={prev} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:text-white transition-all border border-white/5 bg-white/[0.03]"
            >
              <ArrowLeft size={16} />
            </motion.button>

            <motion.button onClick={() => setPlaying(p => !p)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{ border: \`1px solid rgba(\${slide.accentRgb},0.4)\`, background: \`rgba(\${slide.accentRgb},0.1)\`, color: slide.accent }}
            >
              {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </motion.button>

            <motion.button onClick={next} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:text-white transition-all border border-white/5 bg-white/[0.03]"
            >
              <ArrowRight size={16} />
            </motion.button>
          </div>

          {/* Live label */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: slide.accent }} />
            <span className="text-xs text-gray-500 font-medium tracking-wide">{slide.tag}</span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
      >
        <ChevronDown size={18} color="rgba(255,255,255,0.1)" />
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------
   HERO CARD — 3D tilt on hover
   --------------------------------------------------------- */
function HeroCard({ slide }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    setMouse({ x: nx, y: ny });
    setTilt({ x: (nx - 0.5) * 24, y: (ny - 0.5) * -24 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }); }}
      animate={{ rotateX: tilt.y, rotateY: tilt.x, scale: hovering ? 1.03 : 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      style={{ transformStyle: "preserve-3d", perspective: "900px" }}
      className="relative w-full max-w-[400px] xl:max-w-[440px] cursor-pointer"
    >
      {/* Halo glow */}
      <div
        className="absolute -inset-4 rounded-[32px] pointer-events-none"
        style={{ background: \`radial-gradient(ellipse at \${mouse.x * 100}% \${mouse.y * 100}%, rgba(\${slide.accentRgb},0.2) 0%, transparent 60%)\`, transition: "background 0.1s" }}
      />

      {/* Card */}
      <div
        className="relative rounded-3xl overflow-hidden p-7 flex flex-col gap-5"
        style={{
          background: "rgba(8,8,8,0.94)",
          border: \`1px solid rgba(\${slide.accentRgb},0.28)\`,
          boxShadow: \`0 0 80px rgba(\${slide.accentRgb},0.14), 0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)\`,
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: \`linear-gradient(90deg, transparent, rgba(\${slide.accentRgb},0.7), transparent)\` }} />
        {/* Inner radial */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: \`radial-gradient(ellipse at 40% 0%, rgba(\${slide.accentRgb},0.08) 0%, transparent 55%)\` }} />

        {/* Header row */}
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: slide.accent }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: slide.accent }}>
              {slide.tag}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={10} fill={s <= 4 ? slide.accent : "rgba(255,255,255,0.1)"} color="transparent" />
            ))}
            <span className="text-xs text-gray-500 ml-1">4.67</span>
          </div>
        </div>

        {/* Floating icon */}
        <motion.div
          animate={{ y: [0, -10, 0], rotateZ: [0, 2, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center self-center"
          style={{
            background: \`linear-gradient(135deg, \${slide.accent}, \${slide.accent}bb)\`,
            boxShadow: \`0 10px 50px rgba(\${slide.accentRgb},0.55)\`,
            transform: "translateZ(28px)",
          }}
        >
          <slide.Icon size={40} color="#000" strokeWidth={2.5} />
          <div className="absolute inset-x-2 top-1.5 h-2/5 rounded-t-xl" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.28), transparent)" }} />
        </motion.div>

        {/* KPI tiles 2-col */}
        <div className="grid grid-cols-2 gap-2.5" style={{ transform: "translateZ(12px)" }}>
          {[slide.stat1, slide.stat2].map((s, i) => (
            <div key={i} className="rounded-xl p-4 text-center"
              style={{ background: \`rgba(\${slide.accentRgb},0.07)\`, border: \`1px solid rgba(\${slide.accentRgb},0.16)\` }}
            >
              <p className="font-black text-2xl leading-none" style={{ color: slide.accent, textShadow: \`0 0 20px rgba(\${slide.accentRgb},0.55)\` }}>
                {s.value}
              </p>
              <p className="text-gray-500 text-[10px] mt-1.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Third stat full-width */}
        <div className="rounded-xl px-4 py-3 flex items-center justify-between"
          style={{ background: \`rgba(\${slide.accentRgb},0.06)\`, border: \`1px solid rgba(\${slide.accentRgb},0.12)\` }}
        >
          <span className="text-gray-500 text-xs font-medium">{slide.stat3.label}</span>
          <span className="font-black text-xl" style={{ color: slide.accent }}>{slide.stat3.value}</span>
        </div>

        {/* Trust row */}
        <div className="flex items-center justify-center gap-4 pt-1">
          {["10K+ Clients", "SEBI Reg.", "Est. 2016"].map((t, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ background: \`rgba(\${slide.accentRgb},0.6)\` }} />
              <span className="text-[10px] text-gray-600 font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
`;

const outPath = path.join(__dirname, "components", "Hero.js");
fs.writeFileSync(outPath, code, { encoding: "utf8" });
const stat = fs.statSync(outPath);
console.log("Hero.js written successfully. Size:", stat.size, "bytes");

// Validate UTF-8
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
if (!bad) console.log("UTF-8 validation: OK");
