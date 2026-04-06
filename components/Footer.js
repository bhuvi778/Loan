"use client";
"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Services: [
    "Investment Planning",
    "Tax Advisory",
    "Wealth Management",
    "Debt Management",
    "Insurance Planning",
    "Financial Coaching",
  ],
  Company: [
    "About Us",
    "Our Team",
    "Careers",
    "Blog",
    "Press",
    "Awards",
  ],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "SEBI Disclosures",
    "Refund Policy",
    "Cookie Policy",
  ],
};

// Inline SVG social icons (lucide-react v0.5+ removed brand icons)
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const TwitterXIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const socials = [
  { icon: <InstagramIcon />, label: "Instagram" },
  { icon: <TwitterXIcon />, label: "Twitter / X" },
  { icon: <LinkedInIcon />, label: "LinkedIn" },
  { icon: <YoutubeIcon />, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden">
      <div className="section-divider" />

      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a2e]/20 via-amber-800/15 to-amber-900/20" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,155,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,155,220,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Your Financial Freedom{" "}
              <span className="text-gold-gradient">Starts Today</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Join 10,000+ Indians who have transformed their finances with Fix Your Finance.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 btn-gold px-10 py-4 rounded-2xl font-bold text-base shadow-2xl shadow-amber-500/25"
            >
              Book Free Consultation
              <ArrowUpRight size={18} />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div className="section-divider" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <svg viewBox="0 0 210 64" height="42" width="220" style={{display:"block", marginLeft:"-30px"}} xmlns="http://www.w3.org/2000/svg" aria-label="Fix Your Finance">
                <text x="0" y="48" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="52" fill="#ffffff" letterSpacing="-2">Fix</text>
                <rect x="88" y="4" width="6" height="52" fill="#FF4900" rx="2" />
                <text x="100" y="30" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="26" fill="#1a9bdc" letterSpacing="-0.5">Your</text>
                <text x="100" y="56" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="26" fill="#1a9bdc" letterSpacing="-0.5">Finance</text>
              </svg>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              India&apos;s most trusted financial advisory organisation, helping individuals and businesses achieve lasting financial freedom since 2016.
            </p>
            {/* Contact details */}
            <div className="space-y-3">
              {[
                { icon: <Phone size={14} />, text: "+91 98765 43210" },
                { icon: <Mail size={14} />, text: "hello@fixyourfinance.in" },
                { icon: <MapPin size={14} />, text: "Mumbai, Maharashtra — 400001" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200">
                  <span className="text-[#1a9bdc]">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map((s, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-[#1a9bdc] hover:border-[#1a9bdc]/30 transition-all duration-200"
                  aria-label={s.label}
                >
                  {s.icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-[#1a9bdc] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © 2026 Fix Your Finance. All rights reserved. SEBI Reg. No: INA000XXXXXX
          </p>
          <p className="text-xs text-gray-600">
            Investments are subject to market risks. Please read all scheme related documents carefully.
          </p>
        </div>
      </div>
    </footer>
  );
}
