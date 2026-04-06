import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Fix Your Finance — Financial Freedom Starts Here",
  description:
    "Fix Your Finance is India's premier financial advisory organization helping individuals and businesses achieve lasting financial freedom through expert guidance, smart investments, and tailored solutions.",
  keywords: "financial advisor, investment planning, wealth management, tax advisory, debt management, India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#080808] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

