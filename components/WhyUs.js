"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle2, TrendingUp, Users, Clock, HeartHandshake, Zap, Star, Layers } from "lucide-react";

const advantages = [
  {
    icon: <Users size={24} />,
    title: "Dedicated Loan Manager",
    desc: "Every applicant gets a personal loan manager who guides you from application to disbursement — no call centres, no waiting.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Best Rate Guarantee",
    desc: "We compare rates across 15+ banks and NBFCs and guarantee the lowest interest rate available for your profile — every time.",
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: "RBI Registered DSA",
    desc: "We are a registered Direct Selling Agent (DSA) fully compliant with RBI guidelines — your data and finances are completely protected.",
  },
  {
    icon: <Clock size={24} />,
    title: "24–48 Hour Approval",
    desc: "Pre-approved offers and fast-track processing ensure your loan is sanctioned in as little as 24 hours after document submission.",
  },
  {
    icon: <HeartHandshake size={24} />,
    title: "Zero Hidden Charges",
    desc: "Complete transparency always. We disclose all processing fees, prepayment charges and clauses upfront — no surprises, ever.",
  },
  {
    icon: <Layers size={24} />,
    title: "All Loans Under One Roof",
    desc: "Personal, Home, Business, LAP, Credit Cards and Overdraft — every credit need handled with one call, one team, one solution.",
  },
];

const process = [
  { step: "01", title: "Apply in 5 Mins", desc: "Fill a quick online form with your basic loan requirements — takes under 5 minutes." },
  { step: "02", title: "Document Check", desc: "Our team verifies your documents and checks eligibility across 15+ lenders simultaneously." },
  { step: "03", title: "Loan Sanction", desc: "Best offer selected and loan sanctioned — typically within 24–48 hours of submission." },
  { step: "04", title: "Disbursement", desc: "Loan amount credited directly to your bank account, completely hassle-free." },
];

export default function WhyUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [refProcess, inViewProcess] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="why-us" className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-amber-500 bottom-0 right-0 opacity-[0.06]" />

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
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            The <span className="text-gold-gradient">Fix Your Finance</span> Advantage
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What makes us different — and why 10,000+ Indians choose us for their loan needs every year.
          </p>
        </motion.div>

        {/* Advantages grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
        >
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="group p-6 rounded-2xl bg-[#111111] border border-white/[0.06] hover:border-amber-500/25 card-hover transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:bg-amber-500/20 transition-all duration-300">
                  {adv.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
                    {adv.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process timeline */}
        <div className="relative">
          <div className="section-divider mb-16" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              How It <span className="text-gold-gradient">Works</span>
            </h3>
            <p className="text-gray-500 mt-2">From hello to financial freedom in 4 simple steps.</p>
          </motion.div>

          <motion.div
            ref={refProcess}
            initial="hidden"
            animate={inViewProcess ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          >
            {/* Connector line */}
            <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent z-0" />

            {process.map((step, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-5 shadow-xl shadow-amber-500/25">
                  <span className="text-black font-black text-lg">{step.step}</span>
                </div>
                <h4 className="font-bold text-white text-lg mb-2">{step.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
