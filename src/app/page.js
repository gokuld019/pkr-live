// src/app/page.js
import HeroBanner from "@/components/hero-banner";
import AboutStats from "@/components/aboutus";
import VisionMission from "@/components/mission";
import OurProjects from "@/components/ongoingprojects";
import Testimonials from "@/components/testimonials";
import OurBlogs from "@/components/blogs";
import PromoPopup from "@/components/PromoPopup";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <PromoPopup />
      <HeroBanner />
      <AboutStats />
      <VisionMission />
      <OurProjects />
      <Testimonials />
      <OurBlogs />
    </main>
  );
}