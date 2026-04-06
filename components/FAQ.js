"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What documents are required to apply for a personal loan?",
    a: "For a personal loan you typically need: Aadhaar Card & PAN Card (identity proof), last 3 months\u2019 salary slips (or 2 years\u2019 ITR for self-employed), last 6 months\u2019 bank statements, and a recent utility bill for address proof. Our team helps you prepare and verify all documents — completely free of charge.",
  },
  {
    q: "What is the minimum CIBIL score required?",
    a: "Most banks require a CIBIL score of 700+ for personal loans and 750+ for home loans. However, we work with lenders who approve loans for scores as low as 650. If your score is lower, our team provides a free credit improvement plan that typically rebuilds your score within 3\u20136 months.",
  },
  {
    q: "How quickly can my loan be approved and disbursed?",
    a: "Personal loans can be approved and disbursed within 24\u201348 hours for salaried employees with good credit. Home loans take 7\u201315 working days including property verification. Business loans take 48\u201372 hours. We track every stage and keep you informed throughout the entire process.",
  },
  {
    q: "What interest rate will I get on my personal loan?",
    a: "Personal loan rates range from 10.49% to 24% p.a. depending on your CIBIL score, income, employer profile and loan amount. We compare offers from 15+ lenders — SBI, HDFC, ICICI, Axis, Bajaj Finserv, Tata Capital and more — and present you the lowest rate available for your profile.",
  },
  {
    q: "Is Fix Your Finance a bank or NBFC? What do you charge?",
    a: "We are a registered Direct Selling Agent (DSA) — a RBI-regulated financial intermediary that connects borrowers with the best banks and NBFCs. Our service is 100% free for borrowers. We earn a referral commission from the lending institution after your loan is disbursed — you pay nothing extra.",
  },
  {
    q: "Can I get a loan if I\u2019m self-employed or have an irregular income?",
    a: "Absolutely. We specialise in self-employed, business owner, and freelancer profiles. Lenders assess income through ITR, GST returns, and bank statements. We identify the right lenders for your profile and structure the application to maximise approval chances. Book a free call and we\u2019ll assess your eligibility in minutes.",
  },
  {
    q: "Can I transfer my existing high-interest loan to a lower rate?",
    a: "Yes! Balance transfer is one of our most popular services. We identify banks offering lower rates for your existing loan, handle the entire transfer paperwork, and close your old loan. Customers typically save \u20b92,000\u2013\u20b98,000 per month on EMIs after switching. Call us for a free EMI savings analysis.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="relative py-8 lg:py-12 bg-black overflow-hidden">
      <div className="section-divider mb-0" />
      <div className="orb w-[400px] h-[400px] bg-[#1a9bdc] top-1/2 right-[-100px] opacity-[0.05]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a9bdc]/10 border border-[#1a9bdc]/20 text-[#1a9bdc] text-xs font-semibold tracking-widest uppercase mb-4">
            FAQs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Questions?{" "}
            <span className="text-gold-gradient">We have answers.</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i
                  ? "border-[#1a9bdc]/30 bg-[#1a9bdc]/5"
                  : "border-white/[0.06] bg-[#111111] hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span
                  className={`font-semibold text-base transition-colors duration-300 ${
                    open === i ? "text-amber-300" : "text-white"
                  }`}
                >
                  {faq.q}
                </span>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    open === i
                      ? "bg-[#1a9bdc]/20 text-[#1a9bdc]"
                      : "bg-white/[0.05] text-gray-500"
                  }`}
                >
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-[#1a9bdc]/10 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center p-8 rounded-2xl glow-border glass"
        >
          <p className="text-white font-semibold mb-2">Still have questions?</p>
          <p className="text-gray-500 text-sm mb-5">
            Our team is available Mon–Sat, 9AM–7PM IST to help you.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 btn-gold px-7 py-3 rounded-xl font-bold text-sm"
          >
            Talk to an Advisor
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
