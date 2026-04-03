"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageSquare } from "lucide-react";

const contactInfo = [
  {
    icon: <Phone size={20} className="text-amber-400" />,
    label: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon–Sat, 9AM–7PM IST",
  },
  {
    icon: <Mail size={20} className="text-amber-400" />,
    label: "Email Us",
    value: "hello@fixyourfinance.in",
    sub: "Reply within 24 hours",
  },
  {
    icon: <MapPin size={20} className="text-amber-400" />,
    label: "Visit Us",
    value: "Mumbai | Delhi | Bengaluru | Hyderabad",
    sub: "15+ cities across India",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", goal: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden">
      <div className="section-divider mb-0" />
      <div className="orb w-[500px] h-[500px] bg-amber-600 bottom-[-100px] left-[-100px] opacity-[0.07]" />
      <div className="orb w-[300px] h-[300px] bg-amber-400 top-[-50px] right-[-50px] opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Ready to{" "}
            <span className="text-gold-gradient">Fix Your Finance?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Book your FREE 30-minute consultation today. No commitments, no pressure — just honest advice.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-5 gap-8"
        >
          {/* Left info */}
          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#111111] border border-white/[0.06] hover:border-amber-500/20 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-all duration-300">
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-0.5">{info.label}</p>
                  <p className="font-semibold text-white text-sm">{info.value}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{info.sub}</p>
                </div>
              </motion.div>
            ))}

            {/* Promise card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-5 rounded-2xl glow-border glass"
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-amber-400" />
                <span className="text-sm font-semibold text-white">Our Promise to You</span>
              </div>
              <ul className="space-y-2">
                {[
                  "Loan check response within 4 hours",
                  "No spam — only relevant loan advice",
                  "100% free service for borrowers",
                  "Data 100% confidential & secure",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 size={12} className="text-amber-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-3xl glow-border glass space-y-5"
              >
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare size={20} className="text-amber-400" />
                  Book Free Consultation
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                      Full Name*
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-500/50 focus:bg-amber-500/5 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                      Phone Number*
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      pattern="[0-9+\s\-]{7,15}"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-500/50 focus:bg-amber-500/5 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Email Address*
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-500/50 focus:bg-amber-500/5 transition-all duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Loan Type
                  </label>
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-4 py-3 text-gray-300 text-sm focus:outline-none focus:border-amber-500/50 transition-all duration-300 cursor-pointer"
                  >
                    <option value="">Select loan type</option>
                    <option value="personal">Personal Loan</option>
                    <option value="home">Home Loan</option>
                    <option value="business">Business Loan</option>
                    <option value="lap">Loan Against Property</option>
                    <option value="cc">Credit Card</option>
                    <option value="balance">Balance Transfer</option>
                    <option value="od">Overdraft Facility</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Tell Us More (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Briefly describe your loan requirement — amount needed, purpose, monthly income..."
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber-500/50 focus:bg-amber-500/5 transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full btn-gold py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Book My Free Consultation
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-gray-600 text-center">
                  By submitting, you agree to our Privacy Policy. We never share your data.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-10 rounded-3xl glow-border glass flex flex-col items-center justify-center text-center h-full min-h-[400px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={40} className="text-amber-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">You&apos;re All Set!</h3>
                <p className="text-gray-400 mb-2">
                  Thank you, <strong className="text-amber-400">{formData.name}</strong>! We&apos;ve received your request.
                </p>
                <p className="text-gray-500 text-sm">
                  Our advisor will call you at <strong className="text-white">{formData.phone}</strong> within 4 business hours.
                </p>
                <div className="mt-6 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <p className="text-amber-400 text-sm font-semibold">
                    📅 Check your email for confirmation & appointment details.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
