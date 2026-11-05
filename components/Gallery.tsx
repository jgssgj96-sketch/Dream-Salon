"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/mockData";
import { Maximize2, X, Scissors } from "lucide-react";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const categories = ["All", "Haircut", "Beard", "Shave", "Interior"];

  const filteredImages =
    activeTab === "All"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeTab);

  return (
    <section id="gallery" className="py-24 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold">
            Visual Portfolio
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-off-white">
            The Craft & Atmosphere
          </h2>
          <p className="text-muted text-sm font-light">
            Take a look inside Dream Salon and explore recent transformations created by our master barbers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ₹{
                activeTab === cat
                  ? "bg-gold text-surface"
                  : "bg-surface text-off-white/70 hover:text-off-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, index) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedImg(img.url)}
              className="relative group rounded-2xl overflow-hidden aspect-[4/3] bg-surface cursor-pointer border border-white/10 shadow-lg"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs text-gold font-semibold uppercase tracking-wider">
                  {img.category}
                </span>
                <h3 className="text-lg font-bold font-display text-off-white flex items-center justify-between">
                  <span>{img.title}</span>
                  <Maximize2 className="w-4 h-4 text-gold" />
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-surface text-off-white hover:text-gold border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              src={selectedImg}
              alt="Gallery Preview"
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-white/10 object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}