"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { apiFetch, friendlyError } from "@/lib/api";

export function ReviewForm({ bookingId, onSubmitted }: { bookingId: string; onSubmitted: () => void }) {
  const [rating, setRating] = useState("5");
  const [review, setReview] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      const result = await apiFetch<{ message: string }>(`/api/bookings/${bookingId}/review`, {
        method: "POST",
        auth: true,
        body: JSON.stringify({ rating: Number(rating), review: review.trim() })
      });
      toast.success(result.message || "Thank you for your feedback.");
      onSubmitted();
    } catch (error) {
      toast.error(friendlyError(error));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="repair-review-form" onSubmit={submit}>
      <div className="repair-review-heading"><Star size={15}/><strong>How did the repair go?</strong></div>
      <div className="repair-review-fields">
        <label>
          <span>Your rating</span>
          <select value={rating} onChange={(event) => setRating(event.target.value)}>
            <option value="5">5 — Excellent</option>
            <option value="4">4 — Very good</option>
            <option value="3">3 — Good</option>
            <option value="2">2 — Fair</option>
            <option value="1">1 — Needs improvement</option>
          </select>
        </label>
        <label className="repair-review-comment">
          <span>Your review</span>
          <textarea value={review} onChange={(event) => setReview(event.target.value)} minLength={8} maxLength={600} required placeholder="Share a few words about the technician and the repair…" />
        </label>
      </div>
      <div className="repair-review-submit"><small>{review.trim().length}/600 characters</small><button className="button button-primary button-small" disabled={busy || review.trim().length < 8}>{busy ? "Submitting…" : "Submit review"}</button></div>
    </form>
  );
}
