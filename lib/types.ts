export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: "hair" | "beard" | "combo" | "treatments";
  icon: string;
};

export type Barber = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  specialties: string[];
  available: boolean;
};

export type TimeSlot = {
  id: string;
  time: string;
  label: string;
  available: boolean;
};

export type Appointment = {
  id: string;
  services: Service[];
  barber: Barber;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
  date: string; // ISO yyyy-mm-dd
  time: string;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: string;
  price: number;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  service?: string;
  date: string;
  avatar: string;
};

export type Tab = "home" | "services" | "gallery" | "reviews" | "contact";