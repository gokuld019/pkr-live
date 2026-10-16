// src/app/layout.js
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Cta from "@/components/cta"
import Footer from "@/components/footer";
import FloatingWidgets from "@/components/FloatingWidgets";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <Navbar />
        {children}
        <Cta />
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}