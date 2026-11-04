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

  const [activeTab, setActiveTab] = useState<
    "appointments" | "services" | "barbers" | "storefront" | "reviews"
  >("appointments");

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterTime, setFilterTime] = useState<string>("all");

  // Add Service Form
  const [servName, setServName] = useState("");
  const [servDesc, setServDesc] = useState("");
  const [servPrice, setServPrice] = useState("");
  const [servDuration, setServDuration] = useState("30");
  const [servCat, setServCat] = useState<"hair" | "beard" | "combo" | "treatments">("hair");

  // Add Barber Form
  const [barbName, setBarbName] = useState("");
  const [barbTitle, setBarbTitle] = useState("");
  const [barbAvatar, setBarbAvatar] = useState("");

  // Location & Storefront Settings Form
  const [address, setAddress] = useState(salonInfo.address);
  const [city, setCity] = useState(salonInfo.city);
  const [phone, setPhone] = useState(salonInfo.phone);
  const [email, setEmail] = useState(salonInfo.email);
  const [openTime, setOpenTime] = useState(salonInfo.openTime);
  const [closeTime, setCloseTime] = useState(salonInfo.closeTime);
  const [isOpenToday, setIsOpenToday] = useState(salonInfo.isOpenToday);
  const [heroBadge, setHeroBadge] = useState(salonInfo.heroBadge);
  const [satisfactionText, setSatisfactionText] = useState(salonInfo.satisfactionText);

  const [infoSaved, setInfoSaved] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  const filteredAppointments = appointments.filter((app) => {
    if (filterStatus !== "all" && app.status !== filterStatus) return false;
    if (filterTime === "today" && app.date !== todayStr) return false;
    if (filterTime === "upcoming" && app.date < todayStr) return false;
    return true;
  });

  const todayApps = appointments.filter((a) => a.date === todayStr);
  const totalRevenue = appointments
    .filter((a) => a.status !== "cancelled")
    .reduce((sum, a) => sum + a.price, 0);

  const avgReviewScore = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!servName || !servPrice) return;
    addService({
      name: servName,
      description: servDesc,
      price: parseFloat(servPrice) || 0,
      duration: parseInt(servDuration) || 30,
      category: servCat,
      icon: "Scissors",
    });
    setServName("");
    setServDesc("");
    setServPrice("");
  };

  const handleAddBarber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barbName) return;
    addBarber({
      name: barbName,
      title: barbTitle || "Master Barber",
      avatar: barbAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      specialties: ["Fade", "Beard"],
      available: true,
    });
    setBarbName("");
    setBarbTitle("");
    setBarbAvatar("");
  };

  const handleSaveStorefront = (e: React.FormEvent) => {
    e.preventDefault();
    updateSalonInfo({
      address,
      city,
      phone,
      email,
      openTime,
      closeTime,
      isOpenToday,
      heroBadge,
      satisfactionText,
    });
    setInfoSaved(true);
    setTimeout(() => setInfoSaved(false), 2500);
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
                <span className="font-display font-bold text-2xl text-off-white">
                  Shop Owner Portal
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-wider">
                  Admin Master Control
                </span>
              </div>
              <p className="text-xs text-muted mt-0.5">
                Manage all storefront branding, hours, services, barbers, and appointments.
              </p>
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
              {todayApps.length}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-muted text-xs font-semibold uppercase">
              <span>Estimated Revenue</span>
              <DollarSign className="w-4 h-4 text-gold" />
            </div>
            <div className="text-3xl font-display font-bold text-off-white">
              ${totalRevenue}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-muted text-xs font-semibold uppercase">
              <span>Average Review Rating</span>
              <Star className="w-4 h-4 text-gold fill-gold" />
            </div>
            <div className="text-3xl font-display font-bold text-gold">
              {avgReviewScore} <span className="text-xs text-muted">/ 5.0</span>
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
                activeTab === tab.id
                  ? "bg-gold text-surface shadow-gold"
                  : "bg-surface text-off-white/70 hover:text-off-white border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: APPOINTMENTS */}
        {activeTab === "appointments" && (
          <div className="p-6 rounded-2xl bg-surface border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-display font-bold text-off-white flex items-center gap-2">
                <Scissors className="w-5 h-5 text-gold" />
                <span>Incoming Appointments ({filteredAppointments.length})</span>
              </h2>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-lg border border-white/10 text-xs">
                  <button
                    onClick={() => setFilterTime("all")}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                      filterTime === "all" ? "bg-gold text-surface" : "text-off-white/70"
                    }`}
                  >
                    All Dates
                  </button>
                  <button
                    onClick={() => setFilterTime("today")}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                      filterTime === "today" ? "bg-gold text-surface" : "text-off-white/70"
                    }`}
                  >
                    Today
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-lg border border-white/10 text-xs">
                  {["all", "confirmed", "completed", "cancelled"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-md font-semibold capitalize transition-colors ${
                        filterStatus === st ? "bg-gold text-surface" : "text-off-white/70"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-12 text-muted text-sm border border-dashed border-white/10 rounded-xl">
                  No appointments match the selected filters.
                </div>
              ) : (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-muted uppercase font-semibold">
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Client Info</th>
                      <th className="p-3">Services</th>
                      <th className="p-3">Barber</th>
                      <th className="p-3">Date & Time</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredAppointments.map((app) => (
                      <tr key={app.id} className="hover:bg-surface-2/50 transition-colors">
                        <td className="p-3 font-mono text-gold font-semibold">{app.id}</td>
                        <td className="p-3">
                          <div className="font-bold text-off-white">{app.customerName}</div>
                          <div className="text-muted text-[10px]">{app.customerPhone}</div>
                        </td>
                        <td className="p-3 text-off-white/90">
                          {app.services.map((s) => s.name).join(", ")}
                        </td>
                        <td className="p-3 text-brass font-medium">{app.barber.name}</td>
                        <td className="p-3 font-medium text-off-white">
                          <div>{app.date}</div>
                          <div className="text-muted text-[10px]">{app.time}</div>
                        </td>
                        <td className="p-3 font-display font-bold text-gold">${app.price}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              app.status === "confirmed"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : app.status === "completed"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {app.status !== "completed" && (
                              <button
                                onClick={() => updateAppointmentStatus(app.id, "completed")}
                                className="p-1.5 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                title="Mark Completed"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {app.status !== "cancelled" && (
                              <button
                                onClick={() => updateAppointmentStatus(app.id, "cancelled")}
                                className="p-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                title="Cancel Appointment"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteAppointment(app.id)}
                              className="p-1.5 rounded bg-surface-2 text-muted hover:text-red-400 hover:bg-red-500/10"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: STOREFRONT & HOURS BRANDING */}
        {activeTab === "storefront" && (
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-surface border border-white/10 space-y-6">
            <h3 className="text-xl font-bold font-display text-gold flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Storefront, Operating Hours & Guarantee Branding</span>
            </h3>

            {infoSaved && (
              <div className="p-3 rounded-lg bg-green-500/20 text-green-400 text-xs font-semibold text-center border border-green-500/30">
                Storefront settings successfully updated!
              </div>
            )}

            <form onSubmit={handleSaveStorefront} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Opening Time</label>
                  <input
                    type="text"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                    placeholder="09:00 AM"
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Closing Time</label>
                  <input
                    type="text"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                    placeholder="08:00 PM"
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase mb-1">Is Salon Open Today?</label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 text-sm text-off-white cursor-pointer">
                    <input
                      type="radio"
                      name="isOpenToday"
                      checked={isOpenToday}
                      onChange={() => setIsOpenToday(true)}
                      className="accent-gold"
                    />
                    <span>Open Today</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-off-white cursor-pointer">
                    <input
                      type="radio"
                      name="isOpenToday"
                      checked={!isOpenToday}
                      onChange={() => setIsOpenToday(false)}
                      className="accent-gold"
                    />
                    <span>Closed Today</span>
                  </label>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Hero Top Badge Text</label>
                  <input
                    type="text"
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                    placeholder="Voted Best Barber Studio"
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Satisfaction Guarantee Label</label>
                  <input
                    type="text"
                    value={satisfactionText}
                    onChange={(e) => setSatisfactionText(e.target.value)}
                    placeholder="Satisfaction Guarantee"
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">City / District</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gold text-surface font-bold text-xs shadow-gold hover:bg-brass transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <Check className="w-4 h-4" />
                <span>Save Storefront Settings</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: MANAGE BARBERS */}
        {activeTab === "barbers" && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 p-6 rounded-2xl bg-surface border border-white/10 space-y-4">
              <h3 className="text-xl font-bold font-display text-gold flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Add Master Barber</span>
              </h3>
              <form onSubmit={handleAddBarber} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Barber Name</label>
                  <input
                    type="text"
                    required
                    value={barbName}
                    onChange={(e) => setBarbName(e.target.value)}
                    placeholder="e.g. Marco Vance"
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Title / Specialty</label>
                  <input
                    type="text"
                    value={barbTitle}
                    onChange={(e) => setBarbTitle(e.target.value)}
                    placeholder="Master Barber & Founder"
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Avatar Image URL</label>
                  <input
                    type="url"
                    value={barbAvatar}
                    onChange={(e) => setBarbAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gold text-surface font-bold text-xs shadow-gold hover:bg-brass transition-colors"
                >
                  Add Barber
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl bg-surface border border-white/10 space-y-4">
              <h3 className="text-xl font-bold font-display text-off-white">Current Barbers ({barbers.length})</h3>
              {barbers.length === 0 ? (
                <div className="text-center py-12 text-muted text-sm">No barbers listed yet. Add one on the left.</div>
              ) : (
                <div className="space-y-3">
                  {barbers.map((b) => (
                    <div key={b.id} className="p-4 rounded-xl bg-surface-2 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {b.avatar ? (
                          <img src={b.avatar} alt={b.name} className="w-10 h-10 rounded-full object-cover border border-gold/30" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-gold font-bold">
                            {b.name[0]}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-off-white">{b.name}</div>
                          <div className="text-xs text-brass">{b.title}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteBarber(b.id)}
                        className="p-2 rounded-lg bg-surface text-muted hover:text-red-400 border border-white/5"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SERVICES */}
        {activeTab === "services" && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 p-6 rounded-2xl bg-surface border border-white/10 space-y-4">
              <h3 className="text-xl font-bold font-display text-gold flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                <span>Add New Service</span>
              </h3>
              <form onSubmit={handleAddService} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Service Name</label>
                  <input
                    type="text"
                    required
                    value={servName}
                    onChange={(e) => setServName(e.target.value)}
                    placeholder="e.g. Classic Haircut"
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={servDesc}
                    onChange={(e) => setServDesc(e.target.value)}
                    placeholder="Describe service..."
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase mb-1">Price ($)</label>
                    <input
                      type="number"
                      required
                      value={servPrice}
                      onChange={(e) => setServPrice(e.target.value)}
                      placeholder="45"
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted uppercase mb-1">Duration (min)</label>
                    <input
                      type="number"
                      value={servDuration}
                      onChange={(e) => setServDuration(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">Category</label>
                  <select
                    value={servCat}
                    onChange={(e: any) => setServCat(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
                  >
                    <option value="hair">Haircut</option>
                    <option value="beard">Beard</option>
                    <option value="combo">Combo</option>
                    <option value="treatments">Treatments</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gold text-surface font-bold text-xs shadow-gold hover:bg-brass transition-colors"
                >
                  Add Service
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl bg-surface border border-white/10 space-y-4">
              <h3 className="text-xl font-bold font-display text-off-white">Current Services ({services.length})</h3>
              {services.length === 0 ? (
                <div className="text-center py-12 text-muted text-sm">No services listed yet.</div>
              ) : (
                <div className="space-y-3">
                  {services.map((s) => (
                    <div key={s.id} className="p-4 rounded-xl bg-surface-2 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-off-white">{s.name}</div>
                        <div className="text-xs text-muted mt-0.5">{s.duration} mins • ${s.price}</div>
                      </div>
                      <button
                        onClick={() => deleteService(s.id)}
                        className="p-2 rounded-lg bg-surface text-muted hover:text-red-400 border border-white/5"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: REVIEWS */}
        {activeTab === "reviews" && (
          <div className="p-6 rounded-2xl bg-surface border border-white/10 space-y-6">
            <h3 className="text-xl font-display font-bold text-off-white">Manage Client Reviews ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <div className="text-center py-12 text-muted text-sm border border-dashed border-white/10 rounded-xl">
                No client reviews submitted yet. (Storefront hero metrics dynamically reflect this as 0.0 ★ / 0 Reviews).
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-surface-2 border border-white/10 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-off-white">{rev.name}</span>
                        <div className="flex text-gold">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-gold" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-off-white/80 italic">"{rev.text}"</p>
                      <div className="text-[11px] text-muted">{rev.date} • {rev.service}</div>
                    </div>
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="p-2 rounded-lg bg-surface text-muted hover:text-red-400 border border-white/5 shrink-0"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}