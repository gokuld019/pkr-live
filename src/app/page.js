// src/app/page.js
import HeroBanner from "@/components/hero-banner";
import AboutStats from "@/components/aboutus";
import VisionMission from "@/components/mission";
import OurProjects from "@/components/ongoingprojects";
import Testimonials from "@/components/testimonials";
import OurBlogs from "@/components/blogs";
import PromoPopup from "@/components/PromoPopup";
import SocialFeedSection from "@/components/social-feed-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <PromoPopup />
      <HeroBanner />
      
      <OurProjects />
      <AboutStats />
      <VisionMission />
      <Testimonials />
      <OurBlogs />
      <SocialFeedSection />
    </main>
  );
}