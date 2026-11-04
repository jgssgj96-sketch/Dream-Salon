"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { useSalon } from "@/lib/context";

export default function Contact() {
  const { salonInfo } = useSalon();

  return (
    <section id="contact" className="py-24 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold">
            Location & Hours
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-off-white">
            Visit Dream Salon
          </h2>
          <p className="text-muted text-sm font-light">
            Conveniently located in the heart of downtown. Walk-ins welcomed.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brass uppercase tracking-wider mb-1">
                    Address
                  </h3>
                  <p className="text-off-white font-medium text-base">
                    {salonInfo.address}
                  </p>
                  <p className="text-muted text-xs mt-0.5">{salonInfo.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brass uppercase tracking-wider mb-1">
                    Direct Phone Call
                  </h3>
                  <a
                    href={`tel:${salonInfo.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-gold font-bold text-lg hover:underline flex items-center gap-2"
                  >
                    <span>{salonInfo.phone}</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brass uppercase tracking-wider mb-1">
                    Email Inquiry
                  </h3>
                  <a
                    href={`mailto:${salonInfo.email}`}
                    className="text-off-white font-medium hover:text-gold transition-colors text-sm"
                  >
                    {salonInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-surface">
            <iframe
              title="Dream Salon Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2173167439!2d-73.9878441!3d40.7579747!2m3!1f0!0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              className="w-full h-full min-h-[420px] filter grayscale invert contrast-125 opacity-80"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}