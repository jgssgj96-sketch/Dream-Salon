"use client";

import { createContext, useContext, useState } from "react";
import { Appointment, Service, Barber, Review } from "./types";

export const SalonContext = createContext({} as any);

export function SalonProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [salonInfo, setSalonInfo] = useState({
    address: "",
    city: "",
    phone: "",
    email: "",
    openTime: "",
    closeTime: "",
    isOpenToday: false,
    heroBadge: "",
    satisfactionText: "",
    heroImage: null,
  });

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => {
    setIsBookingOpen(true);
  };
  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  // Add a new service
  const addService = (service: Omit<Service, "id">) => {
    const newService: Service = { ...service, id: `SERV-${Date.now()}` };
    setServices([...services, newService]);
  };

  // Add a new barber
  const addBarber = (barber: Omit<Barber, "id">) => {
    const newBarber: Barber = { ...barber, id: `BARB-${Date.now()}` };
    setBarbers([...barbers, newBarber]);
  };

  // Add a new appointment
  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = { ...appointment, id: `APP-${Math.floor(1000 + Math.random() * 9000)}`, createdAt: new Date().toISOString() };
    setAppointments([...appointments, newAppointment]);
  };

  // Add a new review
  const addReview = (review: Omit<Review, "id">) => {
    const newReview: Review = { ...review, id: `REV-${Date.now()}` };
    setReviews([...reviews, newReview]);
  };

  // Update salon info
  const updateSalonInfo = (info: Partial<typeof salonInfo>) => {
    setSalonInfo((prev) => ({ ...prev, ...info }));
  };

  // Update appointment status
  const updateAppointmentStatus = (id: string, status: "confirmed" | "completed" | "cancelled") => {
    setAppointments(
      appointments.map((app) => (
        app.id === id ? { ...app, status } : app
      ))
    );
  };

  // Delete an appointment
  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter((app) => app.id !== id));
  };

  // Delete a service
  const deleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  // Delete a barber
  const deleteBarber = (id: string) => {
    setBarbers(barbers.filter((b) => b.id !== id));
  };

  // Delete a review
  const deleteReview = (id: string) => {
    setReviews(reviews.filter((rev) => rev.id !== id));
  };

  // Toggle select service
  const toggleSelectService = (serviceId: string) => {
    const newSelectedIds = selectedServiceIds.includes(serviceId) ? selectedServiceIds.filter((id) => id !== serviceId) : [...selectedServiceIds, serviceId];
    setSelectedServiceIds(newSelectedIds);
  };

  return (
    <SalonContext.Provider
      value={
        {
          services,
          barbers,
          appointments,
          reviews,
          salonInfo,
          selectedServiceIds,
          isBookingOpen,
          openBooking,
          closeBooking,
          toggleSelectService,
          addService,
          deleteService,
          addBarber,
          deleteBarber,
          updateAppointmentStatus,
          deleteAppointment,
          addReview,
          updateSalonInfo,
          deleteReview,
        }
      }
    >
      {children}
    </SalonContext.Provider>
  );
}

export function useSalon() {
  return useContext(SalonContext);
}