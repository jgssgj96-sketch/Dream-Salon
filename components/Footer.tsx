"use client";

import { motion } from "framer-motion";
import { Scissors, MapPin, Phone, Mail, Instagram, Facebook, Shield } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 text-off-white/70 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-white/5">

          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-2 border border-gold/40 flex items-center justify-center text-gold">
                <Scissors className="w-4 h-4 -rotate-45" />
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-off-white">
                DREAM SALON
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed font-light">
              Elevating men's grooming into a refined art form. Tailored haircuts, hot towel shaves, and premium atmosphere.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-brass uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Services & Pricing</a></li>
              <li><a href="#gallery" className="hover:text-gold transition-colors">Visual Portfolio</a></li>
              <li><a href="#reviews" className="hover:text-gold transition-colors">Client Testimonials</a></li>
              <li><a href="#contact" className="hover:text-gold transition-colors">Contact & Hours</a></li>
            </ul>
          </div>

          {/* Management */}
          <div>
            <h4 className="text-xs font-bold text-brass uppercase tracking-widest mb-4">
              Management
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-muted">Staff Access Only</li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-brass uppercase tracking-widest mb-4">
              Connect With Us
            </h4>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2.5 rounded-lg bg-surface-2 border border-white/10 hover:border-gold text-off-white hover:text-gold transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-surface-2 border border-white/10 hover:border-gold text-off-white hover:text-gold transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-muted pt-2">
              742 Evergreen Terrace, Suite 100
            </p>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <div>
            © {new Date().getFullYear()} Dream Salon. All Rights Reserved.
          </div>
          <div className="text-[11px]">
            Designed for Modern Gentleman Barbering.
          </div>
        </div>
      </div>
    </footer>
  );
}