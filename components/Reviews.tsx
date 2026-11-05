"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useSalon } from "@/lib/context";
import { Review } from "@/lib/types";

export default function Reviews() {
  const { reviews } = useSalon();

  return (
    <section id="reviews" className="py-24 bg-surface relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold">
            Client Feedback
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-off-white">
            Word on the Street
          </h2>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-16 text-muted text-sm">
            No reviews yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev: Review, _index: number) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: _index * 0.08 }}
                className="p-6 rounded-2xl bg-surface-2 border border-white/10 flex flex-col justify-between space-y-4"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5 pointer-events-none" />

                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold" />
                    ))}
                  </div>
                  <p className="text-off-white/90 text-sm leading-relaxed font-light italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-gold/30"
                  />
                  <div>
                    <div className="text-sm font-bold text-off-white">{rev.name}</div>
                    <div className="text-[11px] text-brass">
                      {rev.service || "Verified Client"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}