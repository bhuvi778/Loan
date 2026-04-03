"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Wallet,
  Home,
  Briefcase,
  Building2,
  CreditCard,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: <Wallet size={28} />,
    title: "Personal Loan",
    desc: "Instant personal loans up to ₹40 Lakhs with minimal documentation and no collateral. Ideal for medical emergencies, weddings, home renovation, travel and more.",
    tags: ["Instant Approval", "No Collateral", "₹40L Max", "10.49% PA"],
    gradient: "from-amber-500/20 to-amber-700/5",
  },
  {
    icon: <Home size={28} />,
    title: "Home Loan",
    desc: "Make your dream home a reality with rates starting 8.35% p.a. We compare 15+ lenders — SBI, HDFC, ICICI, Axis — to get you the best EMI and tenure.",
    tags: ["8.35% Rate", "30-yr Tenure", "15+ Banks", "Top-Up Available"],
    gradient: "from-yellow-500/20 to-yellow-700/5",
  },
  {
    icon: <Briefcase size={28} />,
    title: "Business Loan",
    desc: "Unsecured business loans up to ₹2 Crores for MSMEs, startups and self-employed professionals. Fast 48-hour sanction with zero collateral required.",
    tags: ["₹2Cr Max", "MSME Reg.", "48-hr Sanction", "No Collateral"],
    gradient: "from-amber-600/20 to-orange-700/5",
  },
  {
    icon: <Building2 size={28} />,
    title: "Loan Against Property",
    desc: "Unlock the equity in your residential or commercial property to get high-value loans at low interest rates with long repayment tenures up to 20 years.",
    tags: ["Up to 70% LTV", "Low Rates", "20-yr Tenure", "High Amount"],
    gradient: "from-orange-500/20 to-amber-700/5",
  },
  {
    icon: <CreditCard size={28} />,
    title: "Credit Card",
    desc: "Get the best credit card matched to your lifestyle — zero annual fee, cashback, travel rewards, fuel surcharge waiver and a 45-day interest-free credit period.",
    tags: ["Zero Annual Fee", "Cashback", "Travel Perks", "45-Day Credit"],
    gradient: "from-amber-400/20 to-amber-600/5",
  },
  {
    icon: <RefreshCw size={28} />,
    title: "Balance Transfer & Overdraft",
    desc: "Transfer high-interest loans to a lower rate and save thousands monthly. Plus, we arrange overdraft (OD) facilities against salary and savings accounts.",
    tags: ["Lower EMI", "Save Interest", "OD Facility", "Quick Processing"],
    gradient: "from-yellow-600/20 to-amber-500/5",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Section divider top */}
      <div className="section-divider mb-0" />

      {/* Background accent */}
      <div className="orb w-[500px] h-[500px] bg-amber-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Every Loan Product{"\ "}
            <span className="text-gold-gradient">Under One Roof</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From personal loans to home loans, business funding to credit cards — we compare
            15+ banks and NBFCs to get you the best rate, every time.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={cardAnim}
              className="group relative rounded-2xl p-6 glow-border glass card-hover cursor-pointer overflow-hidden"
            >
              {/* Gradient bg on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
              />
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all duration-300 group-hover:scale-110">
                  {service.icon}
                </div>

                {/* Title */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    className="text-gray-600 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </div>

                {/* Desc */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/8 border border-amber-500/15 text-amber-400/80 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-gray-500 mb-5">
            Not sure where to start? Our advisors will help you identify the right services.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 btn-gold px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-amber-500/20"
          >
            Get a Free Analysis
            <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
