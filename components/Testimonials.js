"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    city: "Mumbai, Maharashtra",
    rating: 5,
    avatar: "RS",
    photo: "https://images.pexels.com/photos/7580761/pexels-photo-7580761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    color: "from-amber-500 to-amber-700",
    text: "Fix Your Finance got me a personal loan of ₹10 Lakhs within just 24 hours when I needed it most for a family medical emergency. The entire process — application, documents, disbursal — was handled by their team online. The rate was 10.99% which was the lowest I was quoted anywhere. Truly life-saving service!",
    result: "₹10L personal loan in 24 hours",
    date: "March 2025",
  },
  {
    name: "Priya Patel",
    role: "Entrepreneur & Business Owner",
    city: "Ahmedabad, Gujarat",
    rating: 5,
    avatar: "PP",
    photo: "https://images.pexels.com/photos/7580821/pexels-photo-7580821.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    color: "from-yellow-500 to-[#1582b8]",
    text: "As a small business owner, I needed working capital urgently. Fix Your Finance compared 8 loan offers and secured me a ₹50 Lakh business loan at 14% p.a. — much better than what my own bank was offering. Their advisor Deepak handled all bank communication end to end. Smooth, professional and transparent.",
    result: "₹50L business loan at 14% p.a.",
    date: "January 2025",
  },
  {
    name: "Amit Kumar Gupta",
    role: "Government Employee",
    city: "Lucknow, Uttar Pradesh",
    rating: 5,
    avatar: "AG",
    photo: "https://images.pexels.com/photos/7580940/pexels-photo-7580940.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    color: "from-[#1a9bdc] to-orange-600",
    text: "Maine Fix Your Finance se apna home loan process karwaya. Unhone 12 banks compare karke mujhe SBI mein 8.4% rate pe loan dilwaya. 11 din mein sanction letter aa gaya. Koi hidden charge nahi, poori process transparent thi. Inki guidance ke bina itna acha deal milna mushkil tha.",
    result: "Home loan at 8.4% from SBI",
    date: "February 2025",
  },
  {
    name: "Neha Krishnamurthy",
    role: "Doctor (MD)",
    city: "Bengaluru, Karnataka",
    rating: 4,
    avatar: "NK",
    photo: "https://images.pexels.com/photos/7580822/pexels-photo-7580822.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    color: "from-amber-600 to-yellow-700",
    text: "I had credit card debt of ₹3.5 Lakhs across 4 cards at 36% interest. Fix Your Finance consolidated everything into a personal loan at 13% — my monthly outflow dropped by ₹9,000. The process took just 3 days. There was a minor delay in paperwork but their team was very responsive throughout.",
    result: "Saved ₹9,000/month on CC debt",
    date: "December 2024",
  },
  {
    name: "Vikram Mehta",
    role: "Sales Director",
    city: "Pune, Maharashtra",
    rating: 5,
    avatar: "VM",
    photo: "https://images.pexels.com/photos/7580984/pexels-photo-7580984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    color: "from-orange-500 to-[#1582b8]",
    text: "Mujhe Loan Against Property chahiye tha apna retail business expand karne ke liye. Fix Your Finance ne mere commercial property ke against ₹75 Lakhs dilwaye at 9.5% rate jo market se kaafi better tha. 15 saal ki tenure bhi mili. Unke managers ne poora process handle kiya bina kisi tension ke.",
    result: "₹75L LAP at 9.5% for business",
    date: "November 2024",
  },
  {
    name: "Kavya Reddy",
    role: "Homemaker & Investor",
    city: "Hyderabad, Telangana",
    rating: 4,
    avatar: "KR",
    photo: "https://images.pexels.com/photos/7580835/pexels-photo-7580835.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    color: "from-amber-500 to-yellow-600",
    text: "I was a first-time homebuyer and completely clueless about home loans. Their advisor walked me through every step — eligibility check, documents, bank selection, and disbursement. Got approved for ₹45 Lakhs at 8.5% through ICICI Bank in under 2 weeks. The team was patient, knowledgeable and truly helpful.",
    result: "First home loan ₹45L at 8.5%",
    result: "₹5K/mo to ₹4.5L portfolio in 3yrs",
    date: "October 2024",
  },
];

// Average rating: (5+5+5+4+5+4)/6 = 28/6 = 4.667 ✓

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          className={s <= rating ? "star-filled fill-amber-400" : "text-gray-700 fill-gray-700"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const navigate = (dir) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const avgRating = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(2);

  return (
    <section id="testimonials" className="relative py-8 lg:py-12 bg-black overflow-hidden">
      <div className="section-divider mb-0" />
      <div className="orb w-[500px] h-[500px] bg-[#1a9bdc] top-0 left-1/2 -translate-x-1/2 opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a9bdc]/10 border border-[#1a9bdc]/20 text-[#1a9bdc] text-xs font-semibold tracking-widest uppercase mb-4">
            Client Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Real People.{" "}
            <span className="text-gold-gradient">Real Results.</span>
          </h2>
          {/* Overall rating pill */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl glow-border glass mt-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} className={s <= 4 ? "star-filled fill-amber-400" : "text-[#1a9bdc]/40 fill-amber-400/20"} />
              ))}
            </div>
            <span className="text-white font-bold text-lg">{avgRating}</span>
            <span className="text-gray-500 text-sm">/ 5 &nbsp;|&nbsp; 3,200+ Reviews</span>
          </div>
        </motion.div>

        {/* Featured testimonial */}
        <div className="max-w-4xl mx-auto mb-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 80 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="relative p-8 sm:p-10 rounded-3xl glow-border glass overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none rounded-3xl" />

              {/* Quote icon */}
              <Quote
                size={80}
                className="absolute top-4 right-6 text-[#1a9bdc]/8 -scale-x-100"
                strokeWidth={1}
              />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg ring-2 ring-[#1a9bdc]/30">
                    <img src={testimonials[active].photo} alt={testimonials[active].name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-white text-lg">{testimonials[active].name}</h4>
                        <p className="text-gray-500 text-sm">{testimonials[active].role}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <MapPin size={11} className="text-[#1a9bdc]" />
                          <span className="text-xs text-gray-600">{testimonials[active].city}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <StarRating rating={testimonials[active].rating} />
                        <span className="text-xs text-gray-600">{testimonials[active].date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-base leading-relaxed mb-5">
                  &ldquo;{testimonials[active].text}&rdquo;
                </p>

                {/* Result badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a9bdc]/10 border border-[#1a9bdc]/20">
                  <div className="w-2 h-2 rounded-full bg-[#4db8f0] animate-pulse" />
                  <span className="text-[#1a9bdc] text-sm font-semibold">
                    Result: {testimonials[active].result}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-xl glow-border glass flex items-center justify-center text-gray-400 hover:text-[#1a9bdc] hover:border-[#1a9bdc]/40 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-[#4db8f0]" : "w-1.5 bg-gray-700 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => navigate(1)}
              className="w-11 h-11 rounded-xl glow-border glass flex items-center justify-center text-gray-400 hover:text-[#1a9bdc] hover:border-[#1a9bdc]/40 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mini cards grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
                i === active
                  ? "border-[#1a9bdc]/40 bg-[#1a9bdc]/5"
                  : "border-white/[0.06] bg-[#111111] hover:border-[#1a9bdc]/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-[#1a9bdc]/20">
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <div className="flex items-center gap-1">
                    <MapPin size={9} className="text-[#1a9bdc]/70" />
                    <span className="text-[10px] text-gray-600">{t.city.split(",")[1]?.trim()}</span>
                  </div>
                </div>
                <StarRating rating={t.rating} />
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">&ldquo;{t.text}&rdquo;</p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
