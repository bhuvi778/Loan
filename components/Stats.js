"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 10000, suffix: "+", label: "Loans Sanctioned", prefix: "" },
  { value: 500, suffix: "Cr+", label: "Loan Amount Disbursed", prefix: "₹" },
  { value: 4.67, suffix: "", label: "Average Rating", prefix: "", decimal: true },
  { value: 98, suffix: "%", label: "Loan Approval Rate", prefix: "" },
  { value: 15, suffix: "+", label: "Banking Partners", prefix: "" },
  { value: 20, suffix: "+", label: "Cities in India", prefix: "" },
];

function CountUp({ end, prefix = "", suffix = "", decimal = false, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  const startTime = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = decimal ? parseFloat((eased * end).toFixed(2)) : Math.floor(eased * end);
      setCount(current);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [inView, end, duration, decimal]);

  return (
    <span ref={ref}>
      {prefix}
      {decimal ? count.toFixed(2) : count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="stats" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0900] to-[#0a0a0a]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <div className="orb w-[600px] h-[200px] bg-amber-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Numbers That{" "}
            <span className="text-gold-gradient">Speak for Themselves</span>
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="group relative text-center p-6 rounded-2xl bg-[#111111] border border-white/[0.05] hover:border-amber-500/30 card-hover overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

              <p className="relative text-3xl sm:text-4xl font-black text-amber-400 counter-glow mb-2">
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimal={stat.decimal}
                />
              </p>
              <p className="relative text-sm text-gray-500 font-medium">{stat.label}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 bg-gradient-to-r from-transparent via-amber-500 to-transparent transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 p-6 rounded-2xl glow-border glass"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {[
              "🏆 Best FinAdvisor 2023 — Fintech India Awards",
              "⭐ Certified by SEBI & AMFI",
              "🇮🇳 Trusted by 10,000+ Indian Families",
              "📈 ₹500Cr+ AUM Growth Since 2016",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
