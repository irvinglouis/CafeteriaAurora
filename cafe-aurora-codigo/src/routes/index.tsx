import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/cafe/Navbar";
import { Hero } from "@/components/cafe/Hero";
import { MenuSection } from "@/components/cafe/MenuSection";
import { Reservations } from "@/components/cafe/Reservations";
import { Gallery } from "@/components/cafe/Gallery";
import { Library } from "@/components/cafe/Library";
import { Hours } from "@/components/cafe/Hours";
import { Testimonials } from "@/components/cafe/Testimonials";
import { Story } from "@/components/cafe/Story";
import { Contact } from "@/components/cafe/Contact";
import { Footer } from "@/components/cafe/Footer";
import { WhatsAppButton } from "@/components/cafe/WhatsAppButton";

const title = "Café Aurora — Cafetería de especialidad en Miraflores, Lima";
const description =
  "Café de especialidad peruano, repostería artesanal y reservas en línea. Cada taza cuenta una historia en Miraflores, Lima.";
const ogImage =
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { name: "twitter:image", content: ogImage },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <Reservations />
        <Gallery />
        <Library />
        <Hours />
        <Testimonials />
        <Story />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-center" />
    </div>
  );
}
