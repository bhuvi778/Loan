"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle2, Target, TrendingUp, Award, Lightbulb } from "lucide-react";

const pillars = [
  { icon: <Award size={18} className="text-amber-400" />, text: "RBI Registered DSA" },
  { icon: <Target size={18} className="text-amber-400" />, text: "Approval in 24–48 Hours" },
  { icon: <TrendingUp size={18} className="text-amber-400" />, text: "Best Interest Rate Guarantee" },
  { icon: <Lightbulb size={18} className="text-amber-400" />, text: "Minimal Documentation" },
  { icon: <CheckCircle2 size={18} className="text-amber-400" />, text: "15+ Banking Partners" },
  { icon: <CheckCircle2 size={18} className="text-amber-400" />, text: "End-to-End Loan Support" },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden">
      {/* Orb accents */}
      <div className="orb w-[400px] h-[400px] bg-amber-600 top-[-80px] right-[-100px] opacity-10" />
      <div className="orb w-[300px] h-[300px] bg-amber-400 bottom-0 left-[-80px] opacity-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Visual */}
          <motion.div variants={fadeUp} className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main image placeholder — stylised graphic */}
              <div className="relative rounded-3xl overflow-hidden glow-border glass aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-amber-800/10" />
                {/* Grid lines */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(245,158,11,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.06) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Content inside */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
                  <div className="text-center">
                    <p className="text-6xl font-black text-gold-gradient counter-glow mb-2">2016</p>
                    <p className="text-gray-400 text-sm">Founded in India</p>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                  <div className="grid grid-cols-2 gap-6 w-full">
                    {[
                      { v: "10K+", l: "Loans Sanctioned" },
                      { v: "₹500Cr", l: "Loans Disbursed" },
                      { v: "15+", l: "Banking Partners" },
                      { v: "20+", l: "Cities Covered" },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <p className="text-2xl font-bold text-amber-400">{s.v}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 glow-border glass rounded-2xl px-5 py-4"
              >
                <p className="text-xs text-gray-500 mb-0.5">Overall Rating</p>
                <div className="flex items-center gap-1">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className={i < 4 ? "text-amber-400 text-lg" : "text-amber-400/40 text-lg"}>
                      ★
                    </span>
                  ))}
                  <span className="text-white font-bold text-lg ml-1">4.67</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">from 3,200+ reviews</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <div className="order-1 lg:order-2 space-y-6">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-widest uppercase">
                Who We Are
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white"
            >
              India&apos;s Trusted{" "}
              <span className="text-gold-gradient">Loan Advisor.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed">
              <strong className="text-white">Fix Your Finance</strong> is India&apos;s most trusted loan advisory
              and DSA platform — founded in 2016 to help every Indian access credit at the best possible
              interest rates with zero stress and full transparency.
            </motion.p>

            <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed">
              Whether you need a personal loan, home loan, business funding, loan against property,
              credit card or overdraft — our expert loan managers compare offers from 15+ banks and
              NBFCs to guarantee the lowest rate, fastest approval and hassle-free processing.
            </motion.p>

            {/* Pillars grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
            >
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/20 transition-all duration-300"
                >
                  <div className="flex-shrink-0">{p.icon}</div>
                  <span className="text-sm text-gray-300 font-medium">{p.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 btn-gold px-7 py-3.5 rounded-xl font-bold mt-4"
            >
              Check My Eligibility
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
