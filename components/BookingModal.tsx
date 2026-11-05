"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  CheckCircle,
  Scissors,
  Calendar as CalendarIcon,
  Clock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useSalon } from "@/lib/context";
import { Barber } from "@/lib/types";

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:15 AM",
  "01:00 PM",
  "02:15 PM",
  "03:30 PM",
  "04:45 PM",
  "06:00 PM",
  "07:00 PM",
];

export default function BookingModal() {
  const {
    services,
    barbers,
    isBookingOpen,
    closeBooking,
    selectedServiceIds,
    toggleSelectService,
    addAppointment,
  } = useSalon();

  const [step, setStep] = useState<number>(1);

  // Form states
  const [selectedBarber, setSelectedBarber] = useState<Barber>(barbers[0] || { id: "any", name: "Any Barber", title: "First Available", avatar: "", specialties: [], available: true });
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[1]);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [confirmedAppointment, setConfirmedAppointment] = useState<any>(null);

  if (!isBookingOpen) return null;

  const chosenServices = services.filter((s) =>
    selectedServiceIds.includes(s.id)
  );
  const totalPrice = chosenServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = chosenServices.reduce((sum, s) => sum + s.duration, 0);

  const handleNextStep = () => {
    if (step === 1 && chosenServices.length === 0) return;
    if (step === 4) {
      if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) return;

      const app = addAppointment({
        services: chosenServices,
        barber: selectedBarber,
        customerName,
        customerPhone,
        customerEmail,
        notes,
        date: selectedDate,
        time: selectedTime,
        status: "confirmed",
        price: totalPrice,
      });

      setConfirmedAppointment(app);
      setStep(5);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setConfirmedAppointment(null);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setNotes("");
    closeBooking();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-surface border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-auto"
      >
        {/* Header Bar */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-surface-2">
          <div className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-gold -rotate-45" />
            <span className="font-display font-bold text-lg text-off-white">
              {step === 5 ? "Booking Confirmed" : "Book Your Session"}
            </span>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-off-white/70 hover:text-off-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar (Steps 1-4) */}
        {step < 5 && (
          <div className="bg-surface-2/50 px-6 py-3 border-b border-white/5 flex justify-between items-center text-xs">
            {[
              { s: 1, name: "Services" },
              { s: 2, name: "Barber" },
              { s: 3, name: "Date & Time" },
              { s: 4, name: "Your Info" },
            ].map((item) => (
              <div
                key={item.s}
                className={`flex items-center gap-1.5 ₹{
                  step === item.s
                    ? "text-gold font-bold"
                    : step > item.s
                    ? "text-brass"
                    : "text-muted"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ₹{
                    step === item.s
                      ? "bg-gold text-surface"
                      : step > item.s
                      ? "bg-brass/20 text-brass"
                      : "bg-surface text-muted border border-white/10"
                  }`}
                >
                  {item.s}
                </span>
                <span className="hidden sm:inline">{item.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Modal Body Content per Step */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">

          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted">
                Select one or multiple services for your appointment:
              </p>
              {services.length === 0 ? (
                <div className="text-center py-8 text-muted text-sm border border-dashed border-white/10 rounded-xl">
                  No services available yet. Please add services on the main page first or via the admin view.
                </div>
              ) : (
                <div className="space-y-3">
                  {services.map((s) => {
                    const isSelected = selectedServiceIds.includes(s.id);
                    return (
                      <div
                        key={s.id}
                        onClick={() => toggleSelectService(s.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ₹{
                          isSelected
                            ? "bg-surface-2 border-gold ring-1 ring-gold/40"
                            : "bg-surface-2/40 border-white/5 hover:border-white/20"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-off-white text-base">
                            {s.name}
                          </div>
                          <div className="text-xs text-muted mt-1">
                            {s.duration} mins • {s.description}
                          </div>
                        </div>
                        <div className="text-right pl-4">
                          <span className="font-display font-bold text-lg text-gold">
                            ₹{s.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SELECT BARBER */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted">Choose your preferred master barber:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {barbers.map((b) => {
                  const isSelected = selectedBarber.id === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBarber(b)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ₹{
                        isSelected
                          ? "bg-surface-2 border-gold ring-1 ring-gold/40"
                          : "bg-surface-2/40 border-white/5 hover:border-white/20"
                      }`}
                    >
                      {b.avatar ? (
                        <img
                          src={b.avatar}
                          alt={b.name}
                          className="w-14 h-14 rounded-full object-cover border border-gold/30 shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-surface border border-gold/30 flex items-center justify-center text-gold font-bold">
                          {b.name[0]}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-off-white text-sm">{b.name}</div>
                        <div className="text-xs text-brass">{b.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-white/10 text-off-white focus:outline-none focus:border-gold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase mb-2">
                  Select Available Time Slot
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-3 rounded-xl text-xs font-semibold transition-all border ₹{
                          isSelected
                            ? "bg-gold text-surface border-gold shadow-gold"
                            : "bg-surface-2 border-white/5 text-off-white/80 hover:border-white/20"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT DETAILS */}
          {step === 4 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNextStep();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-muted uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Arthur Pendelton"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-white/10 text-off-white focus:outline-none focus:border-gold text-sm"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-white/10 text-off-white focus:outline-none focus:border-gold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="arthur@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-white/10 text-off-white focus:outline-none focus:border-gold text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase mb-1">
                  Special Requests / Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specific guard lengths, beverage preferences..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-white/10 text-off-white focus:outline-none focus:border-gold text-sm"
                />
              </div>
            </form>
          )}

          {/* STEP 5: CONFIRMATION */}
          {step === 5 && confirmedAppointment && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto border border-gold/40">
                <CheckCircle className="w-10 h-10 text-gold" />
              </div>

              <div>
                <span className="text-xs font-bold text-brass uppercase tracking-widest">
                  Confirmation #{confirmedAppointment.id}
                </span>
                <h3 className="text-2xl font-display font-bold text-off-white mt-1">
                  You're Booked, {confirmedAppointment.customerName}!
                </h3>
              </div>

              <div className="p-5 rounded-2xl bg-surface-2 border border-white/10 text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted">Barber:</span>
                  <span className="font-bold text-gold">{confirmedAppointment.barber.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted">Date & Time:</span>
                  <span className="font-bold text-off-white">
                    {confirmedAppointment.date} @ {confirmedAppointment.time}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted">Services:</span>
                  <span className="font-bold text-off-white text-right">
                    {confirmedAppointment.services.map((s: any) => s.name).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span className="text-off-white">Total Amount Due:</span>
                  <span className="text-gold font-display text-base">
                    ₹{confirmedAppointment.price}
                  </span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full py-3.5 rounded-xl bg-gold text-surface font-bold text-sm hover:bg-brass transition-colors shadow-gold"
              >
                Done & Close
              </button>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        {step < 5 && (
          <div className="p-5 bg-surface-2 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-muted">Total: {totalDuration} mins</div>
              <div className="text-xl font-display font-bold text-gold">₹{totalPrice}</div>
            </div>

            <div className="flex items-center gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-off-white/80 hover:text-off-white flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleNextStep}
                disabled={step === 1 && chosenServices.length === 0}
                className="px-6 py-2.5 rounded-xl bg-gold text-surface font-bold text-xs tracking-wide hover:bg-brass transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1 shadow-gold"
              >
                <span>{step === 4 ? "Confirm Booking" : "Next Step"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}