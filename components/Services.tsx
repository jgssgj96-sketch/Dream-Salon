"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Zap, Crown, Sparkles, Heart, Users, Clock, Check, Plus } from "lucide-react";
import { useSalon } from "@/lib/context";
import { Service } from "@/lib/types";

const ICON_MAP: Record<string, any> = {
  Scissors,
  Zap,
  Crown,
  Sparkles,
  Heart,
  Users,
};

export default function Services() {
  const { services, selectedServiceIds, toggleSelectService, openBooking } = useSalon();
  const [filter, setFilter] = useState<string>("all");

  const filteredServices =
    filter === "all"
      ? services
      : services.filter((s: Service) => s.category === filter);

  return (
    <section id="services" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold">
            Curated Menu
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-off-white">
            Services & Pricing
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: "all", label: "All Services" },
            { id: "hair", label: "Haircuts" },
            { id: "beard", label: "Beard & Shave" },
            { id: "combo", label: "Combos" },
            { id: "treatments", label: "Treatments" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                filter === tab.id
                  ? "bg-gold text-surface shadow-gold"
                  : "bg-surface-2 text-off-white/70 hover:bg-surfaceHover hover:text-off-white border border-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-16 text-muted text-sm">
            No services currently listed.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service: Service, _index: number) => {
              const IconComponent = ICON_MAP[service.icon] || Scissors;
              const isSelected = selectedServiceIds.includes(service.id);

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: _index * 0.08 }}
                  className={`relative rounded-2xl p-6 bg-surface-2 border transition-all duration-300 flex flex-col justify-between group hover:border-gold/50 ${
                    isSelected ? "border-gold ring-1 ring-gold/40 bg-[#222228]" : "border-white/10"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-surface transition-all duration-300 shadow-sm">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-display font-bold text-gold">
                          $
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-muted justify-end mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{service.duration} mins</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold font-display text-off-white mb-2 group-hover:text-gold transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-muted text-sm font-light leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                    <button
                      onClick={() => toggleSelectService(service.id)}
                      className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? "bg-gold/20 text-gold border border-gold/40"
                          : "bg-surface text-off-white/80 hover:bg-surfaceHover border border-white/10"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-gold" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Select</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => openBooking(service.id)}
                      className="py-2.5 px-4 rounded-lg bg-gold text-surface text-xs font-bold hover:bg-brass transition-colors shadow-sm"
                    >
                      Book
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}