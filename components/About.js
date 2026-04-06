"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, TrendingUp, Lightbulb, Banknote, PhoneCall, BadgeCheck } from "lucide-react";

const pillars = [
  { icon: <BadgeCheck size={18} className="text-[#1a9bdc]" />, text: "Free Loan Advisory" },
  { icon: <Clock size={18} className="text-[#1a9bdc]" />, text: "Approval in 24–48 Hours" },
  { icon: <TrendingUp size={18} className="text-[#1a9bdc]" />, text: "Best Interest Rate Guarantee" },
  { icon: <Lightbulb size={18} className="text-[#1a9bdc]" />, text: "Minimal Documentation" },
  { icon: <Banknote size={18} className="text-[#1a9bdc]" />, text: "15+ Banking Partners" },
  { icon: <PhoneCall size={18} className="text-[#1a9bdc]" />, text: "End-to-End Loan Support" },
];

const steps = [
  { num: "01", title: "Share Your Need", desc: "Tell us loan type, amount & purpose in 2 minutes." },
  { num: "02", title: "We Compare Offers", desc: "Our experts scan 15+ banks & NBFCs for your best rate." },
  { num: "03", title: "Disbursal in 48 Hrs", desc: "Paperwork to disbursal — fully guided, zero stress." },
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
    <section id="about" className="relative py-8 lg:py-12 bg-black overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-[#1582b8] top-[-80px] right-[-100px] opacity-10" />
      <div className="orb w-[300px] h-[300px] bg-[#4db8f0] bottom-0 left-[-80px] opacity-8" />

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
              <div className="relative rounded-3xl overflow-hidden glow-border glass p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#001a2e]/20 via-black to-[#0d3a5c]/10" />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(26,155,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,155,220,0.05) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="relative z-10 space-y-6">
                  {/* Banking Partners */}
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">Our Banking Partners</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB", "BOB", "Yes Bank", "IDFC"].map((bank, i) => (
                        <div key={i} className="rounded-lg bg-white/[0.04] border border-white/[0.07] px-2 py-2 flex items-center justify-center">
                          <span className="text-gray-300 text-xs font-semibold">{bank}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-600 mt-2 text-center">+ 6 more NBFCs &amp; lenders</p>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1a9bdc]/20 to-transparent" />

                  {/* How it works */}
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">How It Works</p>
                  <div className="space-y-4">
                    {steps.map((s, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a9bdc]/10 border border-[#1a9bdc]/20 flex items-center justify-center text-[#1a9bdc] text-xs font-black">
                          {s.num}
                        </span>
                        <div>
                          <p className="text-white text-sm font-semibold">{s.title}</p>
                          <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#1a9bdc]/20 to-transparent" />

                  {/* Key stats */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { v: "15+", l: "Banking Partners" },
                      { v: "₹0", l: "Advisory Fee" },
                      { v: "24–48 Hrs", l: "Typical Approval" },
                      { v: "100%", l: "Transparent Process" },
                    ].map((s, i) => (
                      <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-3 text-center">
                        <p className="text-lg font-bold text-[#1a9bdc]">{s.v}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Promise badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mt-4 glow-border glass rounded-2xl px-5 py-4 flex items-center justify-between"
              >
                <p className="text-xs text-gray-500">Our Promise</p>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">Zero Hidden Charges</p>
                  <p className="text-[#EC8E00] text-xs mt-0.5 font-medium">100% Free for Borrowers</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <div className="order-1 lg:order-2 space-y-6">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a9bdc]/10 border border-[#1a9bdc]/20 text-[#1a9bdc] text-xs font-semibold tracking-widest uppercase">
                Who We Are
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white"
            >
              Smart Loan Advisory,{" "}
              <span className="text-gold-gradient">Built for India.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed">
              <strong className="text-white">Fix Your Finance</strong> is a new-age loan advisory
              platform built to help every Indian access credit at the best possible interest
              rates — with zero stress, zero hidden charges, and full transparency.
            </motion.p>

            <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed">
              Whether you need a personal loan, home loan, business funding, loan against property,
              credit card or overdraft — our expert loan managers compare offers from 15+ banks and
              NBFCs to get you the lowest rate, fastest approval, and hassle-free processing.
              Completely free for you.
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
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#1a9bdc]/20 transition-all duration-300"
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
