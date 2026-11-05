"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import ReviewsForm from "@/components/ReviewsForm";
import ReviewsForm from "@/components/ReviewsForm";
import Contact from "@/components/Contact";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import { Phone, Calendar } from "lucide-react";
import { useSalon } from "@/lib/context";

export default function Home() {
  const { openBooking } = useSalon();

  return (
    <main className="min-h-screen bg-background text-off-white selection:bg-gold selection:text-surface">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <Reviews />
      <ReviewsForm />
      <Contact />
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal />

      {/* Sticky Bottom Floating Bar for Mobile Devices (<640px) */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-30 flex items-center gap-3">
        <a
          href="tel:+15553732672"
          className="p-3.5 rounded-xl bg-surface border border-gold/40 text-gold shadow-2xl flex items-center justify-center shrink-0 active:scale-95"
          aria-label="Call Shop"
        >
          <Phone className="w-5 h-5" />
        </a>

        <button
          onClick={() => openBooking()}
          className="flex-1 py-3.5 px-5 rounded-xl bg-gold text-surface font-bold text-sm tracking-wide shadow-gold flex items-center justify-center gap-2 active:scale-95"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>
    </main>
  );
}