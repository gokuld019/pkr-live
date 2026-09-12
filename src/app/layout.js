// src/app/layout.js
import "./globals.css";
import Navbar from "@/components/navbar";
import Cta from "@/components/cta"
import Footer from "@/components/footer";
import FloatingWidgets from "@/components/FloatingWidgets";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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