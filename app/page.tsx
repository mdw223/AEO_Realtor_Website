import { HomeHero } from "@/components/home-hero";
import { HomeAbout } from "@/components/home-about";
import { HomeExperience } from "@/components/home-experience";
import { HomeServices } from "@/components/home-services";
import { HomeFeaturedListings } from "@/components/home-featured-listings";
import { HomeVideoFeature } from "@/components/home-video-feature";
import { HomeTriangleMap } from "@/components/home-triangle-map";
import { HomeReviews } from "@/components/home-reviews";
import { HomeLeadMagnet } from "@/components/home-lead-magnet";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/forms/contact-form";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeAbout />
      <HomeExperience />
      <HomeServices />
      <HomeFeaturedListings />
      <HomeVideoFeature />
      <HomeTriangleMap />
      <HomeReviews />
      <HomeLeadMagnet />
      <Section id="contact" className="contact-band">
        <div className="home-contact">
          <div className="home-contact__content">
            <p className="eyebrow">Let&apos;s talk</p>
            <h2 className="section-title">Tell Fatima about your move</h2>
            <p className="section-subtitle">
              Share a few details and she will follow up with a simple next
              step. You can also join the newsletter for Triangle buyer and
              seller notes.
            </p>
            <NewsletterForm />
          </div>
          <div className="home-contact__form">
            <ContactForm />
          </div>
        </div>
      </Section>
    </main>
  );
}
