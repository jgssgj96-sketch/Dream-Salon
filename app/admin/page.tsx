"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  DollarSign,
  Star,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  ArrowLeft,
  Scissors,
  PlusCircle,
  MapPin,
  Phone,
  Mail,
  Check,
  User,
  Image,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSalon } from "@/lib/context";

export default function AdminDashboard() {
  const {
    appointments,
    reviews,
    services,
    barbers,
    salonInfo,
    updateAppointmentStatus,
    deleteAppointment,
    addService,
    deleteService,
    addBarber,
    deleteBarber,
    updateSalonInfo,
    deleteReview,
  } = useSalon();

  const [activeTab, setActiveTab] = useState<"appointments" | "services" | "barbers" | "storefront" | "reviews">("appointments");

  const handleSaveStorefront = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for saving storefront info
  };

  return (
    <div className="min-h-screen bg-background text-off-white font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2.5 rounded-xl bg-surface border border-white/10 text-off-white/80 hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-2xl text-off-white">Shop Owner Portal</span>
                <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-wider">Admin Master Control</span>
              </div>
              <p className="text-xs text-muted mt-0.5">Manage all storefront branding, hours, services, barbers, and appointments.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-lg bg-gold text-surface font-bold text-xs hover:bg-brass transition-colors shadow-gold"
            >
              View Storefront
            </Link>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-muted text-xs font-semibold uppercase">
              <span>Today's Bookings</span>
              <Calendar className="w-4 h-4 text-gold" />
            </div>
            <div className="text-3xl font-display font-bold text-gold">
              {appointments.filter((a: { date: string }) => a.date === new Date().toISOString().split("T")[0]).length}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-muted text-xs font-semibold uppercase">
              <span>Estimated Revenue</span>
              <DollarSign className="w-4 h-4 text-gold" />
            </div>
            <div className="text-3xl font-display font-bold text-off-white">₹{appointments.filter((a: { status: string; price: number }) => a.status !== "cancelled").reduce((sum: number, a: { price: number }) => sum + a.price, 0)}</div>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-muted text-xs font-semibold uppercase">
              <span>Average Review Rating</span>
              <Star className="w-4 h-4 text-gold fill-gold" />
            </div>
            <div className="text-3xl font-display font-bold text-gold">
              {reviews.length ? (reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0.0"} <span className="text-xs text-muted">/ 5.0</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-muted text-xs font-semibold uppercase">
              <span>Total Appointments</span>
              <Users className="w-4 h-4 text-gold" />
            </div>
            <div className="text-3xl font-display font-bold text-off-white">
              {appointments.length}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-white/10 pb-4 overflow-x-auto">
          {[
            { id: "appointments", label: "Appointments" },
            { id: "storefront", label: "Storefront & Hours Branding" },
            { id: "barbers", label: "Manage Barbers" },
            { id: "services", label: "Manage Services" },
            { id: "reviews", label: "Manage Reviews" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === tab.id ? "bg-gold text-surface shadow-gold" : "bg-surface text-off-white/70 hover:text-off-white border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 2: STOREFRONT & HOURS BRANDING */}
        {activeTab === "storefront" && (
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 space-y-6">
            <h3 className="text-xl font-bold font-display text-gold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Storefront, Operating Hours & Guarantee Branding</span>
            </h3>

            <form onSubmit={handleSaveStorefront} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Opening Time</label>
                  <input
                    type="text"
                    value={salonInfo.openTime}
                    onChange={(e) => updateSalonInfo({ openTime: e.target.value })}
                    placeholder="09:00 AM"
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Closing Time</label>
                  <input
                    type="text"
                    value={salonInfo.closeTime}
                    onChange={(e) => updateSalonInfo({ closeTime: e.target.value })}
                    placeholder="08:00 PM"
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Street Address</label>
                  <input
                    type="text"
                    value={salonInfo.address}
                    onChange={(e) => updateSalonInfo({ address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">City / District</label>
                  <input
                    type="text"
                    value={salonInfo.city}
                    onChange={(e) => updateSalonInfo({ city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={salonInfo.phone}
                    onChange={(e) => updateSalonInfo({ phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={salonInfo.email}
                    onChange={(e) => updateSalonInfo({ email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gold text-surface font-bold text-xs shadow-gold hover:bg-brass transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Storefront Settings</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}