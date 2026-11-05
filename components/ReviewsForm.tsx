"use client";

import { useState } from "react";
import { Star, Send, X } from "lucide-react";
import { useSalon } from "@/lib/context";

export default function ReviewsForm() {
  const { addReview } = useSalon();
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [service, setService] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) return;

    await addReview({
      name,
      email,
      rating: Number(rating),
      text: reviewText,
      service: service || "General",
      date: new Date().toLocaleDateString(),
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    // Reset form
    setName("");
    setEmail("");
    setReviewText("");
    setService("");
    setRating(5);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-surface border border-white/10 space-y-6">
      <div>
        <h3 className="text-xl font-display font-bold text-off-white mb-2">Share Your Experience</h3>
        <p className="text-sm text-muted">Help future clients choose the right services for their needs.</p>
      </div>

      {submitted && (
        <div className="p-3 rounded-lg bg-green-500/20 text-green-400 text-xs font-semibold text-center border border-green-500/30">
          Thank you! Your review has been submitted.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Johnson"
              className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-1">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@example.com"
              className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted uppercase mb-1">Service (optional)</label>
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="e.g. Classic Haircut"
            className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted uppercase mb-2">Rating</label>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setRating(i + 1)}
                className={`p-1 rounded-full transition-all ${
                  rating === i + 1
                    ? "bg-gold text-surface shadow-gold"
                    : "bg-surface-2 text-off-white/70 hover:bg-surfaceHover"
                }`}
                title={`${rating} stars`}
              >
                <Star className={`w-5 h-5 ${
                  rating === i + 1 ? "fill-gold" : "stroke-current"
                }`} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted uppercase mb-1">Your Review *</label>
          <textarea
            rows={4}
            required
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="How was your experience? What would you tell others?"
            className="w-full px-4 py-2.5 rounded-lg bg-surface-2 border border-white/10 text-off-white text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gold text-surface font-bold text-sm shadow-gold hover:bg-brass transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Submit Review</span>
        </button>
      </form>
    </div>
  );
}