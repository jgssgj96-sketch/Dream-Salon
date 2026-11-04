"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Appointment, Service, Barber, Review } from "./types";
import {
  INITIAL_SERVICES,
  INITIAL_BARBERS,
  INITIAL_REVIEWS,
  INITIAL_APPOINTMENTS,
} from "./mockData";

type SalonInfo = {
  address: string;
  city: string;
  phone: string;
  email: string;
  openTime: string;
  closeTime: string;
  isOpenToday: boolean;
  heroBadge: string;
  satisfactionText: string;
};

type SalonContextType = {
  services: Service[];
  barbers: Barber[];
  appointments: Appointment[];
  reviews: Review[];
  salonInfo: SalonInfo;
  isBookingOpen: boolean;
  selectedServiceIds: string[];
  openBooking: (serviceId?: string) => void;
  closeBooking: () => void;
  toggleSelectService: (id: string) => void;
  setSelectedServiceIds: (ids: string[]) => void;
  addAppointment: (app: Omit<Appointment, "id" | "createdAt">) => Appointment;
  addReview: (rev: Omit<Review, "id" | "date" | "avatar">) => void;
  deleteReview: (id: string) => void;
  addService: (serv: Omit<Service, "id">) => void;
  deleteService: (id: string) => void;
  addBarber: (barb: Omit<Barber, "id">) => void;
  deleteBarber: (id: string) => void;
  updateSalonInfo: (info: SalonInfo) => void;
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void;
  deleteAppointment: (id: string) => void;
};

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export function SalonProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [barbers, setBarbers] = useState<Barber[]>(INITIAL_BARBERS);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [salonInfo, setSalonInfo] = useState<SalonInfo>({
    address: "742 Evergreen Terrace, Suite 100",
    city: "Downtown Metropolitan District",
    phone: "+1 (555) 373-2672",
    email: "concierge@dreamsalon.com",
    openTime: "09:00 AM",
    closeTime: "08:00 PM",
    isOpenToday: true,
    heroBadge: "Voted Best Barber Studio",
    satisfactionText: "Satisfaction Guarantee",
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    const savedServices = localStorage.getItem("dream_salon_services");
    if (savedServices) {
      try { setServices(JSON.parse(savedServices)); } catch {}
    }

    const savedBarbers = localStorage.getItem("dream_salon_barbers");
    if (savedBarbers) {
      try { setBarbers(JSON.parse(savedBarbers)); } catch {}
    }

    const savedApps = localStorage.getItem("dream_salon_appointments");
    if (savedApps) {
      try { setAppointments(JSON.parse(savedApps)); } catch {}
    }

    const savedReviews = localStorage.getItem("dream_salon_reviews");
    if (savedReviews) {
      try { setReviews(JSON.parse(savedReviews)); } catch {}
    }

    const savedInfo = localStorage.getItem("dream_salon_info");
    if (savedInfo) {
      try { setSalonInfo(JSON.parse(savedInfo)); } catch {}
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("dream_salon_services", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem("dream_salon_barbers", JSON.stringify(barbers));
  }, [barbers]);

  useEffect(() => {
    localStorage.setItem("dream_salon_appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("dream_salon_reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("dream_salon_info", JSON.stringify(salonInfo));
  }, [salonInfo]);

  const openBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceIds([serviceId]);
    } else if (selectedServiceIds.length === 0 && services.length > 0) {
      setSelectedServiceIds([services[0].id]);
    }
    setIsBookingOpen(true);
  };

  const closeBooking = () => setIsBookingOpen(false);

  const toggleSelectService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((sId) => sId !== id)
          : prev
        : [...prev, id]
    );
  };

  const addService = (servData: Omit<Service, "id">) => {
    const newService: Service = { ...servData, id: `SERV-${Date.now()}` };
    setServices((prev) => [...prev, newService]);
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setSelectedServiceIds((prev) => prev.filter((sId) => sId !== id));
  };

  const addBarber = (barbData: Omit<Barber, "id">) => {
    const newBarber: Barber = { ...barbData, id: `BARB-${Date.now()}` };
    setBarbers((prev) => [...prev, newBarber]);
  };

  const deleteBarber = (id: string) => {
    setBarbers((prev) => prev.filter((b) => b.id !== id));
  };

  const addAppointment = (appData: Omit<Appointment, "id" | "createdAt">): Appointment => {
    const newApp: Appointment = {
      ...appData,
      id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newApp, ...prev]);
    return newApp;
  };

  const addReview = (revData: Omit<Review, "id" | "date" | "avatar">) => {
    const avatars = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    ];
    const newRev: Review = {
      ...revData,
      id: `REV-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const updateSalonInfo = (info: SalonInfo) => {
    setSalonInfo(info);
  };

  const updateAppointmentStatus = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <SalonContext.Provider
      value={{
        services,
        barbers,
        appointments,
        reviews,
        salonInfo,
        isBookingOpen,
        selectedServiceIds,
        openBooking,
        closeBooking,
        toggleSelectService,
        setSelectedServiceIds,
        addAppointment,
        addReview,
        deleteReview,
        addService,
        deleteService,
        addBarber,
        deleteBarber,
        updateSalonInfo,
        updateAppointmentStatus,
        deleteAppointment,
      }}
    >
      {children}
    </SalonContext.Provider>
  );
}

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) throw new Error("useSalon must be used within SalonProvider");
  return context;
};