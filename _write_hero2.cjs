const fs = require('fs');
const path = require('path');

const code = `"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, TrendingUp, Shield, PiggyBank,
  BarChart3, ChevronDown, Zap, Play, Pause,
} from "lucide-react";

const slides = [
  {
    id: 0,
    tag: "Wealth Management",
    headline: "Grow Your Wealth",
    highlight: "Smarter",
    sub:
      "Strategic investments, SIPs, and portfolio optimisation — our SEBI-registered advisors build a wealth roadmap that outperforms the market.",
    stat1: { value: "\\u20b9500Cr+", label: "Assets Managed" },
    stat2: { value: "+34.2%", label: "Avg Annual Return" },
    cta: "Start Investing",
    accent: "#F59E0B",
    accentDark: "#92400E",
    icon: <TrendingUp size={44} color="#000" strokeWidth={2.5} />,
    badge: "\\u2728 Top Rated Advisor 2025",
    particles: ["\\u20b9", "%", "\\u2191", "\\u2605", "\\u20b9", "%"],
  },
  {
    id: 1,
    tag: "Debt Freedom",
    headline: "Break Free from",
    highlight: "Debt Forever",
    sub:
      "Restructured repayment plans, bank negotiations, and credit score repair — our experts have freed 4,000+ Indians from the debt trap.",
    stat1: { value: "4,000+", label: "Debt-Free Clients" },
    stat2: { value: "18mo", label: "Avg Debt-Free Timeline" },
    cta: "Eliminate My Debt",
    accent: "#EF4444",
    accentDark: "#7F1D1D",
    icon: <Shield size={44} color="#000" strokeWidth={2.5} />,
    badge: "\\u2714 SEBI & RBI Compliant",
    particles: ["\\u2714", "\\u26D4", "\\u20b9", "\\u2665", "\\u2714", "\\u26D4"],
  },
  {
    id: 2,
    tag: "Tax Planning",
    headline: "Pay Less Tax,",
    highlight: "Legally",
    sub:
      "CA-led tax advisory that maximises 80C, 80D, HRA, and NPS benefits. We file your ITR and ensure zero surprises from the IT department.",
    stat1: { value: "40%", label: "Average Tax Saved" },
    stat2: { value: "10K+", label: "ITRs Filed" },
    cta: "Save on Taxes",
    accent: "#10B981",
    accentDark: "#064E3B",
    icon: <BarChart3 size={44} color="#000" strokeWidth={2.5} />,
    badge: "\\u26a1 72-hr Plan Delivery",
    particles: ["\\u20b9", "\\u2193", "%", "\\u2714", "\\u20b9", "\\u2193"],
  },
  {
    id: 3,
    tag: "Financial Coaching",
    headline: "Build Lifelong",
    highlight: "Financial IQ",
    sub:
      "One-on-one mentoring, budgeting frameworks, and investment literacy sessions — designed for first-time investors and those starting from zero.",
    stat1: { value: "500+", label: "Coaching Sessions / Month" },
    stat2: { value: "4.67\\u2605", label: "Client Rating" },
    cta: "Book a Session",
    accent: "#8B5CF6",
    accentDark: "#3B0764",
    icon: <PiggyBank size={44} color="#000" strokeWidth={2.5} />,
    badge: "\\u1F1EE\\u1F1F3 Trusted Across India",
    particles: ["\\u2605", "\\u1F4DA", "%", "\\u2665", "\\u2605", "\\u1F4DA"],
  },
];

const AUTOPLAY_MS = 5000;

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.92,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.92,
    filter: "blur(8px)",
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function FloatingParticle({ char, style }) {
  return (
    <motion.span
      className="absolute select-none pointer-events-none font-black opacity-[0.07] text-white"
      style={style}
      animate={{ y: [0, -30, 0], rotate: [0, 15, 0], opacity: [0.04, 0.1, 0.04] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
    >
      {char}
    </motion.span>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startRef = useRef(null);

  const goTo = useCallback(
    (idx) => {
      const d = idx > current ? 1 : -1;
      setDir(d);
      setCurrent((idx + slides.length) % slides.length);
      setProgress(0);
      startRef.current = performance.now();
    },
    [current]
  );

  const next = useCallback(() => {
    setDir(1);
    setCurrent((p) => (p + 1) % slides.length);
    setProgress(0);
    startRef.current = performance.now();
  }, []);

  const prev = useCallback(() => {
    setDir(-1);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
    setProgress(0);
    startRef.current = performance.now();
  }, []);

  // Autoplay + progress bar
  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(progressRef.current);
      clearTimeout(timerRef.current);
      return;
    }
    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / AUTOPLAY_MS) * 100, 100);
      setProgress(pct);
      if (elapsed >= AUTOPLAY_MS) {
        next();
      } else {
        progressRef.current = requestAnimationFrame(tick);
      }
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [current, playing, next]);

  const slide = slides[current];

  const particlePositions = [
    { fontSize: "4rem", top: "10%",  left: "5%"  },
    { fontSize: "3rem", top: "70%",  left: "8%"  },
    { fontSize: "5rem", top: "20%",  right: "6%" },
    { fontSize: "2.5rem", top: "55%", right: "10%" },
    { fontSize: "3.5rem", bottom: "15%", left: "15%" },
    { fontSize: "4rem", top: "40%",  left: "50%" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#060606] flex flex-col"
    >
      {/* ── Static background grid ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Slide-synced background glow ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: \`radial-gradient(ellipse 80% 60% at 60% 30%, \${slide.accent}18 0%, transparent 65%)\`,
          }}
        />
      </AnimatePresence>

      {/* ── Floating background chars ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {slide.particles.map((char, i) => (
          <FloatingParticle key={i + "-" + current} char={char} style={particlePositions[i]} />
        ))}
      </div>

      {/* ── Slide counter top-right ── */}
      <div className="absolute top-[88px] right-6 z-20 hidden lg:flex items-center gap-2">
        <span className="text-3xl font-black" style={{ color: slide.accent }}>
          0{current + 1}
        </span>
        <span className="text-gray-700 text-lg font-light">/</span>
        <span className="text-gray-600 text-sm">0{slides.length}</span>
      </div>

      {/* ── Main carousel ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={current}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid lg:grid-cols-2 gap-10 xl:gap-20 items-center"
            >
              {/* ── LEFT: Text content ── */}
              <div className="flex flex-col text-center lg:text-left">
                {/* Tag badge */}
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 self-center lg:self-start px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
                  style={{
                    background: slide.accent + "18",
                    border: \`1px solid \${slide.accent}40\`,
                    color: slide.accent,
                  }}
                >
                  <Zap size={11} fill="currentColor" />
                  {slide.badge}
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.55 }}
                  className="font-black text-white leading-[1.06] mb-3 tracking-tight"
                  style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.2rem)" }}
                >
                  {slide.headline}
                  <br />
                  <span
                    className="relative"
                    style={{
                      background: \`linear-gradient(135deg, \${slide.accent}, \${slide.accent}cc)\`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {slide.highlight}
                  </span>
                </motion.h1>

                {/* Sub */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.5 }}
                  className="text-gray-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
                  style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)" }}
                >
                  {slide.sub}
                </motion.p>

                {/* CTA row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
                >
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05, boxShadow: \`0 0 40px \${slide.accent}55\` }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-black text-base transition-all duration-300"
                    style={{
                      background: \`linear-gradient(135deg, \${slide.accent}, \${slide.accent}cc)\`,
                      boxShadow: \`0 4px 24px \${slide.accent}35\`,
                    }}
                  >
                    {slide.cta} <ArrowRight size={18} />
                  </motion.a>
                  <motion.a
                    href="#services"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white text-base transition-all duration-300"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = slide.accent + "50";
                      e.currentTarget.style.background = slide.accent + "08";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    Explore Services
                  </motion.a>
                </motion.div>

                {/* Two stat chips */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  {[slide.stat1, slide.stat2].map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: \`1px solid \${slide.accent}25\`,
                      }}
                    >
                      <div
                        className="w-1 h-8 rounded-full"
                        style={{ background: slide.accent }}
                      />
                      <div>
                        <p
                          className="font-black text-xl leading-none"
                          style={{ color: slide.accent }}
                        >
                          {s.value}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── RIGHT: Visual card ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
                className="flex justify-center lg:justify-end"
                style={{ perspective: "900px" }}
              >
                <HeroCard slide={slide} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom controls bar ── */}
      <div className="relative z-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Dot + progress indicators */}
          <div className="flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative flex items-center justify-center group"
              >
                {i === current ? (
                  <div className="relative w-24 h-1.5 rounded-full overflow-hidden bg-white/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: slide.accent, width: progress + "%" }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125"
                    style={{
                      background: i < current ? s.accent + "80" : "rgba(255,255,255,0.15)",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Prev / Play-Pause / Next */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
            >
              <ArrowLeft size={18} />
            </motion.button>

            <motion.button
              onClick={() => setPlaying((p) => !p)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all"
              style={{
                border: \`1px solid \${slide.accent}40\`,
                background: slide.accent + "12",
                color: slide.accent,
              }}
            >
              {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </motion.button>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
            >
              <ArrowRight size={18} />
            </motion.button>
          </div>

          {/* Slide label */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: slide.accent }} />
            <span className="text-xs text-gray-500 font-medium">{slide.tag}</span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden lg:block"
      >
        <ChevronDown size={20} color="rgba(255,255,255,0.12)" />
      </motion.div>
    </section>
  );
}

/* ─── Hero card component ─── */
function HeroCard({ slide }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 24,
      y: ((e.clientY - r.top) / r.height - 0.5) * -24,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }); }}
      animate={{
        rotateX: tilt.y,
        rotateY: tilt.x,
        scale: hovering ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: "900px" }}
      className="relative w-full max-w-[400px]"
    >
      {/* Card outer glow */}
      <div
        className="absolute -inset-px rounded-3xl blur-xl opacity-30 pointer-events-none"
        style={{ background: \`linear-gradient(135deg, \${slide.accent}, transparent)\` }}
      />

      {/* Main card */}
      <div
        className="relative rounded-3xl overflow-hidden p-8 flex flex-col gap-6"
        style={{
          background: "rgba(12,12,12,0.9)",
          border: \`1px solid \${slide.accent}35\`,
          boxShadow: \`0 0 60px \${slide.accent}15, inset 0 1px 0 rgba(255,255,255,0.05)\`,
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Top shimmer */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: \`linear-gradient(90deg, transparent, \${slide.accent}70, transparent)\` }}
        />

        {/* Radial glow inside */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: \`radial-gradient(ellipse at 40% 0%, \${slide.accent}10 0%, transparent 55%)\`,
          }}
        />

        {/* Icon box */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center self-center"
          style={{
            background: \`linear-gradient(135deg, \${slide.accent}, \${slide.accent}bb)\`,
            boxShadow: \`0 8px 40px \${slide.accent}50\`,
            transform: "translateZ(20px)",
          }}
        >
          {slide.icon}
          {/* gloss */}
          <div
            className="absolute inset-x-2 top-1 h-1/3 rounded-t-xl"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.3), transparent)" }}
          />
        </motion.div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3" style={{ transform: "translateZ(10px)" }}>
          {[slide.stat1, slide.stat2].map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-4 text-center"
              style={{
                background: slide.accent + "0D",
                border: \`1px solid \${slide.accent}20\`,
              }}
            >
              <p
                className="font-black text-2xl leading-none"
                style={{ color: slide.accent, textShadow: \`0 0 20px \${slide.accent}60\` }}
              >
                {s.value}
              </p>
              <p className="text-gray-500 text-xs mt-1.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tag + live dot */}
        <div
          className="flex items-center justify-between px-4 py-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: slide.accent }}
            />
            <span className="text-xs font-semibold" style={{ color: slide.accent }}>
              {slide.tag}
            </span>
          </div>
          <span className="text-xs text-gray-600">Fix Your Finance</span>
        </div>

        {/* India trust row */}
        <div className="flex items-center justify-center gap-3">
          {["10K+ Clients", "SEBI Reg.", "8+ Years"].map((t, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ background: slide.accent + "80" }} />
              <span className="text-[10px] text-gray-600">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
`;

const outPath = path.join(__dirname, 'components', 'Hero.js');
fs.writeFileSync(outPath, code, { encoding: 'utf8' });
const stats = fs.statSync(outPath);
console.log('Hero.js written. Size:', stats.size, 'bytes');

// Validate UTF-8
const buf = fs.readFileSync(outPath);
let bad = false;
for (let i = 0; i < buf.length; i++) {
  const b = buf[i];
  if (b > 127) {
    if ((b & 0xE0) === 0xC0 && i + 1 < buf.length) { i++; continue; }
    if ((b & 0xF0) === 0xE0 && i + 2 < buf.length) { i += 2; continue; }
    if ((b & 0xF8) === 0xF0 && i + 3 < buf.length) { i += 3; continue; }
    console.error('Bad byte', b.toString(16), 'at offset', i);
    bad = true;
    break;
  }
}
if (!bad) console.log('UTF-8 validation: OK');
