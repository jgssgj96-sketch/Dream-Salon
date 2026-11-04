"use client";

import { motion } from "framer-motion";
import { Calendar, Shield, Award, Clock, Star, ArrowRight } from "lucide-react";
import { useSalon } from "@/lib/context";

export default function Hero() {
  const { openBooking, reviews, barbers, salonInfo } = useSalon();

  const avgRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503951914875-452162b09f6f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-25 filter contrast-125" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-gold/30 text-brass text-xs font-semibold tracking-wider uppercase"
            >
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              <span>{salonInfo.heroBadge || "Voted Best Barber Studio"}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-off-white leading-[1.1]"
            >
              Crafting <span className="text-gold italic font-normal">Timeless</span> Elegance for the Modern Gentleman.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted max-w-xl font-light leading-relaxed"
            >
              Step into a sanctuary of bespoke barbering. Where classic craftsmanship meets contemporary precision in the heart of downtown.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={() => openBooking()}
                className="px-8 py-4 rounded-lg bg-gold text-surface font-bold text-base tracking-wide hover:bg-brass transition-all duration-300 shadow-gold hover:shadow-xl flex items-center justify-center gap-3 group active:scale-98"
              >
                <Calendar className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>Book Your Session</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#services"
                className="px-8 py-4 rounded-lg border border-white/15 text-off-white font-medium text-base hover:border-gold/50 hover:bg-surface-2 transition-all text-center"
              >
                Explore Services
              </a>
            </motion.div>

            {/* Micro Stats Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-gold">
                  {reviews.length > 0 ? `${avgRating} ★` : "0.0 ★"}
                </div>
                <div className="text-xs text-muted mt-1">
                  {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-off-white">
                  {barbers.length}
                </div>
                <div className="text-xs text-muted mt-1">
                  {barbers.length === 1 ? "Master Barber" : "Master Barbers"}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-gold">
                  100%
                </div>
                <div className="text-xs text-muted mt-1">
                  {salonInfo.satisfactionText || "Satisfaction Guarantee"}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column Showcase Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-surface p-2 group">
              <div className="relative h-[480px] sm:h-[520px] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800"
                  alt="Barber sculpting beard at Dream Salon"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />

                {/* Floating Badge on Visual */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-surface/85 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs text-brass font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      {salonInfo.isOpenToday
                        ? `Open Today until ${salonInfo.closeTime}`
                        : "Closed Today"}
                    </span>
                    <span className={salonInfo.isOpenToday ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                      {salonInfo.isOpenToday ? "• Live Openings" : "• Closed"}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-off-white">
                    Hours: {salonInfo.openTime} – {salonInfo.closeTime}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}