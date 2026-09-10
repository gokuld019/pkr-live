// src/app/layout.js
import "./globals.css";
import Navbar from "@/components/navbar";
import Cta from "@/components/cta"
import Footer from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Cta />
        <Footer />
      </body>
    </html>
  );
}