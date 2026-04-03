"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Wallet, Home, Briefcase,
  CreditCard, ChevronDown, Zap, Play, Pause,
  CheckCircle2, Star, Phone,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   SLIDE DATA
───────────────────────────────────────────────────────── */
const slides = [
  {
    id: 0,
    tag: "Personal Loan",
    badge: "Approval in 24 Hours",
    headline: "Get Funds",
    highlight: "In 24 Hours",
    sub: "Instant personal loans up to \u20b940 Lakhs with minimal documentation, no collateral, and direct disbursal to your bank account at rates starting 10.49% p.a.",
    stats: [
      { value: "\u20b940L",  label: "Max Amount"    },
      { value: "10.49%",       label: "Starting Rate" },
      { value: "24 Hrs",       label: "Disbursal"     },
    ],
    features: [
      "No collateral required",
      "Minimal documentation",
      "Direct bank disbursal",
      "Flexible 12–60 month tenure",
    ],
    banks: ["SBI","HDFC","ICICI","Axis","Bajaj"],
    emiNote: "EMI from \u20b92,149/mo for \u20b91L",
    cta: "Apply Now",
    accent: "#F59E0B",
    accentRgb: "245,158,11",
    Icon: Wallet,
    img: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1920&q=90",
  },
  {
    id: 1,
    tag: "Home Loan",
    badge: "Best Rate Guaranteed",
    headline: "Own Your",
    highlight: "Dream Home",
    sub: "Home loans starting 8.35% p.a. with tenure up to 30 years. We compare 15+ banks and NBFCs \u2014 SBI, HDFC, ICICI, Axis and more \u2014 to get you the lowest EMI possible.",
    stats: [
      { value: "8.35%",     label: "Starting Rate" },
      { value: "30 Yrs",    label: "Max Tenure"    },
      { value: "15+ Banks", label: "Our Partners"  },
    ],
    features: [
      "Salaried & self-employed eligible",
      "Up to 90% of property value",
      "Top-up loan available",
      "Balance transfer option",
    ],
    banks: ["SBI","HDFC","LIC HFL","PNB","Axis"],
    emiNote: "EMI from \u20b9771/mo for \u20b91L",
    cta: "Check Eligibility",
    accent: "#EF4444",
    accentRgb: "239,68,68",
    Icon: Home,
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=90",
  },
  {
    id: 2,
    tag: "Business Loan",
    badge: "For SMEs & Startups",
    headline: "Scale Your",
    highlight: "Business Fast",
    sub: "Unsecured business loans up to \u20b92 Crores for MSMEs, startups and self-employed professionals. Fast 48-hour sanction, flexible repayment, zero collateral required.",
    stats: [
      { value: "\u20b92Cr+", label: "Max Amount"   },
      { value: "48 Hrs",       label: "Sanction"     },
      { value: "MSME Reg.",    label: "Certified"    },
    ],
    features: [
      "Zero collateral for up to \u20b950L",
      "MSME / Udyam Registered",
      "Overdraft & term loan options",
      "Repayment up to 5 years",
    ],
    banks: ["Axis","HDFC","Tata Cap","IDFC","Kotak"],
    emiNote: "Rates from 14% for MSMEs",
    cta: "Get Business Loan",
    accent: "#10B981",
    accentRgb: "16,185,129",
    Icon: Briefcase,
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=90",
  },
  {
    id: 3,
    tag: "Credit Card & OD",
    badge: "Zero Hidden Charges",
    headline: "Smart Credit",
    highlight: "Smarter Living",
    sub: "Get the best credit card with zero annual fees, cashback and reward points. Plus, overdraft facilities up to \u20b910 Lakhs against salary and savings accounts.",
    stats: [
      { value: "\u20b90 Fee", label: "Annual Charge" },
      { value: "45 Days",       label: "Free Credit"   },
      { value: "\u20b910L+ OD", label: "OD Limit"    },
    ],
    features: [
      "Zero joining & annual fee cards",
      "Up to 5% cashback on spends",
      "OD against salary account",
      "Reward points never expire",
    ],
    banks: ["HDFC","SBI Card","Axis","ICICI","AmEx"],
    emiNote: "Up to 45 interest-free days",
    cta: "Get Best Card",
    accent: "#8B5CF6",
    accentRgb: "139,92,246",
    Icon: CreditCard,
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1920&q=90",
  },
];

const AUTOPLAY = 6000;

/* ─────────────────────────────────────────────────────────
   HERO
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
    <section id="hero" className="relative min-h-screen overflow-hidden flex flex-col select-none">

      {/* ── Full-screen background images crossfade ── */}
      <AnimatePresence>
        {slides.map((s, i) =>
          i === cur ? (
            <motion.div key={s.id}
              initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 1.1, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <img src={s.img} alt={s.tag} draggable={false} className="w-full h-full object-cover" />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Uniform dark overlay — both sides readable */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.70) 50%, rgba(0,0,0,0.78) 100%)" }}
      />
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 40%)" }}
      />

      {/* Accent wash */}
      <AnimatePresence>
        <motion.div key={"tint"+cur} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          transition={{ duration:1 }} className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 80% at 0% 50%, rgba(${slide.accentRgb},0.12) 0%, transparent 70%)` }}
        />
      </AnimatePresence>

      {/* Grid texture */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)", backgroundSize:"72px 72px" }}
      />

      {/* Vertical dot rail */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-4">
        {slides.map((s,i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={"Slide "+(i+1)} className="flex items-center gap-3">
            <motion.div
              animate={{ width: i===cur ? 28 : 5, background: i===cur ? s.accent : "rgba(255,255,255,0.22)" }}
              transition={{ duration:0.35 }} className="h-1.5 rounded-full"
              style={{ boxShadow: i===cur ? `0 0 8px ${s.accent}` : "none" }}
            />
          </button>
        ))}
      </div>

      {/* ── MAIN CONTENT — 2-column grid ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-14 xl:px-16 pt-24 pb-4">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={cur} custom={dir}
              initial={{ opacity:0, x: dir>0 ? 50 : -50, filter:"blur(8px)" }}
              animate={{ opacity:1, x:0, filter:"blur(0px)" }}
              exit={{ opacity:0, x: dir>0 ? -30 : 30, filter:"blur(6px)" }}
              transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
              className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-10 xl:gap-14 items-center"
            >
              {/* ─── LEFT: Text ─── */}
              <div className="flex flex-col">
                {/* Badge */}
                <motion.div initial={{ opacity:0,y:-14 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }}
                  className="inline-flex items-center self-start gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
                  style={{ background:`rgba(${slide.accentRgb},0.15)`, border:`1px solid rgba(${slide.accentRgb},0.4)`, color:slide.accent }}
                >
                  <Zap size={11} fill="currentColor" />
                  {slide.badge}
                </motion.div>

                {/* Headline */}
                <motion.h1 initial={{ opacity:0,y:40 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.16, duration:0.65, ease:[0.22,1,0.36,1] }}
                  className="font-black text-white leading-[1.0] tracking-tight"
                  style={{ fontSize:"clamp(2.8rem,5.5vw,5.8rem)", textShadow:"0 4px 40px rgba(0,0,0,0.7)" }}
                >
                  {slide.headline}<br />
                  <span style={{
                    background:`linear-gradient(130deg, ${slide.accent} 0%, ${slide.accent}dd 100%)`,
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                    filter:`drop-shadow(0 0 28px rgba(${slide.accentRgb},0.55))`,
                  }}>
                    {slide.highlight}
                  </span>
                </motion.h1>

                {/* Sub */}
                <motion.p initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.28, duration:0.55 }}
                  className="text-white/70 leading-relaxed mt-5 mb-7"
                  style={{ fontSize:"clamp(0.95rem,1.2vw,1.1rem)", maxWidth:"520px" }}
                >
                  {slide.sub}
                </motion.p>

                {/* CTAs */}
                <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
                  transition={{ delay:0.36 }} className="flex flex-wrap gap-3 mb-8"
                >
                  <motion.a href="#contact"
                    whileHover={{ scale:1.05, boxShadow:`0 0 48px rgba(${slide.accentRgb},0.65)` }}
                    whileTap={{ scale:0.96 }}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-black text-sm"
                    style={{ background:`linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)`, boxShadow:`0 4px 28px rgba(${slide.accentRgb},0.45)` }}
                  >
                    {slide.cta} <ArrowRight size={16} strokeWidth={2.5} />
                  </motion.a>
                  <motion.a href="#services"
                    whileHover={{ scale:1.04, background:"rgba(255,255,255,0.12)" }}
                    whileTap={{ scale:0.96 }}
                    className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-white text-sm backdrop-blur-sm transition-all"
                    style={{ border:"1px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.06)" }}
                  >
                    All Loan Products
                  </motion.a>
                </motion.div>

                {/* Stats */}
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.48 }}
                  className="flex flex-wrap gap-2.5 mb-5"
                >
                  {slide.stats.map((s,i) => (
                    <div key={i} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl backdrop-blur-md"
                      style={{ background:"rgba(0,0,0,0.45)", border:`1px solid rgba(${slide.accentRgb},0.28)` }}
                    >
                      <div className="w-0.5 h-6 rounded-full" style={{ background:slide.accent }} />
                      <div>
                        <p className="font-black text-base leading-none"
                          style={{ color:slide.accent, textShadow:`0 0 16px rgba(${slide.accentRgb},0.5)` }}
                        >{s.value}</p>
                        <p className="text-white/40 text-[9px] mt-0.5 font-medium">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Trust pills */}
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
                  className="flex flex-wrap gap-2"
                >
                  {["RBI Reg. DSA","15+ Banks","10K+ Loans","Free Service"].map((t,i) => (
                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
                      style={{ background:"rgba(0,0,0,0.35)", border:"1px solid rgba(255,255,255,0.1)" }}
                    >
                      <div className="w-1 h-1 rounded-full" style={{ background:slide.accent }} />
                      <span className="text-white/45 text-[9px] font-medium">{t}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ─── RIGHT: Loan Info Card ─── */}
              <motion.div
                initial={{ opacity:0, x:70, rotateY:-15 }}
                animate={{ opacity:1, x:0, rotateY:0 }}
                transition={{ delay:0.2, duration:0.75, ease:[0.22,1,0.36,1] }}
                className="hidden lg:flex justify-end"
              >
                <LoanCard slide={slide} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-14 xl:px-16 pb-7">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Thumbnail strip */}
          <div className="flex items-center gap-2.5">
            {slides.map((s,i) => {
              const active = i===cur;
              return (
                <button key={i} onClick={() => goTo(i)} className="flex flex-col items-center gap-1.5">
                  <div className="rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-md"
                    style={{
                      width: active ? 84 : 46, height: active ? 46 : 34,
                      background: active ? `rgba(${s.accentRgb},0.22)` : "rgba(255,255,255,0.06)",
                      border: active ? `1px solid rgba(${s.accentRgb},0.5)` : "1px solid rgba(255,255,255,0.1)",
                      boxShadow: active ? `0 0 18px rgba(${s.accentRgb},0.3)` : "none",
                    }}
                  >
                    <s.Icon size={active ? 20 : 14} style={{ color: active ? s.accent : "rgba(255,255,255,0.28)" }} />
                  </div>
                  <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,0.08)" }}>
                    {active && <motion.div className="h-full rounded-full" style={{ background:s.accent, width:progress+"%" }} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Prev/Play/Next */}
          <div className="flex items-center gap-2">
            <motion.button onClick={prev} whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white backdrop-blur-md transition-all"
              style={{ border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)" }}
            ><ArrowLeft size={16} /></motion.button>

            <motion.button onClick={() => setPlaying(p => !p)} whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md transition-all"
              style={{ border:`1px solid rgba(${slide.accentRgb},0.5)`, background:`rgba(${slide.accentRgb},0.14)`, color:slide.accent }}
            >{playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}</motion.button>

            <motion.button onClick={next} whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white backdrop-blur-md transition-all"
              style={{ border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)" }}
            ><ArrowRight size={16} /></motion.button>
          </div>

          {/* Live label */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-sm"
            style={{ background:"rgba(0,0,0,0.4)", border:"1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:slide.accent }} />
            <span className="text-[11px] text-white/45 font-medium">{slide.tag}</span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a href="#about"
        animate={{ y:[0,8,0] }} transition={{ duration:1.8, repeat:Infinity, ease:"easeInOut" }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-1"
      >
        <span className="text-[9px] text-white/18 tracking-widest uppercase">Scroll</span>
        <ChevronDown size={15} color="rgba(255,255,255,0.14)" />
      </motion.a>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   LOAN CARD  (right panel)
───────────────────────────────────────────────────────── */
function LoanCard({ slide }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x:0, y:0 });
  const [hover, setHover] = useState(false);
  const [mouse, setMouse] = useState({ x:0.5, y:0.5 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top)  / r.height;
    setMouse({ x:nx, y:ny });
    setTilt({ x:(nx - 0.5)*18, y:(ny - 0.5)*-18 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setTilt({ x:0, y:0 }); }}
      animate={{ rotateX:tilt.y, rotateY:tilt.x, scale:hover ? 1.025 : 1 }}
      transition={{ type:"spring", stiffness:200, damping:22 }}
      style={{ transformStyle:"preserve-3d", perspective:"900px" }}
      className="relative w-full max-w-[400px] xl:max-w-[430px]"
    >
      {/* Halo glow */}
      <div className="absolute -inset-5 rounded-[36px] pointer-events-none"
        style={{
          background:`radial-gradient(ellipse at ${mouse.x*100}% ${mouse.y*100}%, rgba(${slide.accentRgb},0.22) 0%, transparent 62%)`,
          transition:"background 0.1s",
        }}
      />

      {/* Card body */}
      <div className="relative rounded-3xl overflow-hidden flex flex-col"
        style={{
          background:"rgba(6,6,6,0.82)",
          border:`1px solid rgba(${slide.accentRgb},0.30)`,
          boxShadow:`0 0 80px rgba(${slide.accentRgb},0.12), 0 28px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)`,
          backdropFilter:"blur(28px)",
        }}
      >
        {/* Top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background:`linear-gradient(90deg, transparent, rgba(${slide.accentRgb},0.75), transparent)` }}
        />
        {/* Inner radial */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:`radial-gradient(ellipse at 50% 0%, rgba(${slide.accentRgb},0.07) 0%, transparent 55%)` }}
        />

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 relative">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <motion.div
              animate={{ y:[0,-6,0] }} transition={{ duration:3.5, repeat:Infinity, ease:"easeInOut" }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background:`linear-gradient(135deg, ${slide.accent}, ${slide.accent}99)`,
                boxShadow:`0 8px 32px rgba(${slide.accentRgb},0.5)`,
              }}
            >
              <slide.Icon size={24} color="#000" strokeWidth={2.5} />
            </motion.div>
            <div>
              <p className="font-black text-white text-base leading-tight">{slide.tag}</p>
              <p className="text-xs mt-0.5" style={{ color:slide.accent }}>{slide.badge}</p>
            </div>
          </div>
          {/* Stars */}
          <div className="flex flex-col items-end gap-0.5">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={10} fill={s<=4 ? slide.accent : "rgba(255,255,255,0.1)"} color="transparent" />
              ))}
            </div>
            <span className="text-[9px] text-white/30">4.7 / 5.0</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px" style={{ background:`rgba(${slide.accentRgb},0.12)` }} />

        {/* ── Features ── */}
        <div className="px-6 py-4 flex flex-col gap-2.5">
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-1">Key Features</p>
          {slide.features.map((f,i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }}
              transition={{ delay:0.12 + i*0.07, duration:0.4 }}
              className="flex items-center gap-2.5"
            >
              <CheckCircle2 size={13} style={{ color:slide.accent, flexShrink:0 }} />
              <span className="text-white/75 text-sm leading-tight">{f}</span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-6 h-px" style={{ background:`rgba(${slide.accentRgb},0.1)` }} />

        {/* ── Partner banks ── */}
        <div className="px-6 py-4">
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2.5">Partner Banks</p>
          <div className="flex flex-wrap gap-1.5">
            {slide.banks.map((b,i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-bold backdrop-blur-sm"
                style={{
                  background:`rgba(${slide.accentRgb},0.1)`,
                  border:`1px solid rgba(${slide.accentRgb},0.22)`,
                  color:slide.accent,
                }}
              >{b}</span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px" style={{ background:`rgba(${slide.accentRgb},0.1)` }} />

        {/* ── EMI note + CTA ── */}
        <div className="px-6 py-5 flex flex-col gap-3">
          {/* EMI row */}
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
            style={{ background:`rgba(${slide.accentRgb},0.07)`, border:`1px solid rgba(${slide.accentRgb},0.15)` }}
          >
            <div className="w-0.5 h-7 rounded-full flex-shrink-0" style={{ background:slide.accent }} />
            <p className="text-white/65 text-xs leading-tight">{slide.emiNote}</p>
          </div>

          {/* CTA button */}
          <motion.a href="#contact"
            whileHover={{ scale:1.03, boxShadow:`0 0 40px rgba(${slide.accentRgb},0.6)` }}
            whileTap={{ scale:0.97 }}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-black text-sm"
            style={{
              background:`linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)`,
              boxShadow:`0 4px 20px rgba(${slide.accentRgb},0.4)`,
            }}
          >
            <Phone size={14} strokeWidth={2.5} />
            Apply Now — Free
          </motion.a>

          {/* Micro trust line */}
          <p className="text-center text-[9px] text-white/25 font-medium">
            No fee \u00b7 No spam \u00b7 100% Secure \u00b7 RBI Compliant
          </p>
        </div>
      </div>
    </motion.div>
  );
}
