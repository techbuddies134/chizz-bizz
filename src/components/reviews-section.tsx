"use client";

import { useState } from "react";
import type { ReviewView } from "@/lib/types";
import { Reveal } from "./reveal";
import { SectionHeading, Stars } from "./section-heading";
import { IconArrowRight, IconCheck, IconStar } from "./icons";

export function ReviewsSection({ initialReviews }: { initialReviews: ReviewView[] }) {
  const [list, setList] = useState<ReviewView[]>(initialReviews);
  const [showAll, setShowAll] = useState(false);
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const visible = showAll ? list : list.slice(0, 6);
  const average =
    list.length > 0
      ? (list.reduce((sum, review) => sum + review.rating, 0) / list.length).toFixed(1)
      : "5.0";

  const submitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, quote, rating }),
      });
      const data: { ok?: boolean; review?: ReviewView; error?: string } =
        await response.json();

      if (!response.ok || !data.ok || !data.review) {
        throw new Error(data.error ?? "Could not save your review.");
      }

      setList((prev) => [data.review as ReviewView, ...prev]);
      setShowAll(true);
      setName("");
      setQuote("");
      setRating(5);
      setSuccess(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not save your review.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-y border-white/5 bg-[#0a0806] py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute -left-32 top-16 h-[420px] w-[420px] rounded-full bg-gold/[0.05] blur-[130px]" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="IV"
            eyebrow="The Guest Book"
            title={
              <>
                Kind words, <span className="italic text-gold-gradient">kept in gold.</span>
              </>
            }
            subtitle="We read every note. Here is what the room is saying this season."
            aside={
              <div className="flex items-center gap-5 rounded-2xl border border-gold/20 bg-card/60 px-5 py-4">
                <span className="font-display text-4xl leading-none text-gold">
                  {average}
                </span>
                <div>
                  <Stars rating={Number(average)} />
                  <p className="mt-1.5 text-[9px] uppercase tracking-[0.22em] text-mist/60">
                    {list.length} guest notes
                  </p>
                </div>
              </div>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((review, index) => (
            <Reveal key={review.id} delay={(index % 3) * 80}>
              <article className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30">
                <div className="flex items-center justify-between">
                  <Stars rating={review.rating} />
                  <span className="font-display text-3xl leading-none text-gold/25 transition-colors duration-500 group-hover:text-gold/50">
                    &rdquo;
                  </span>
                </div>
                <p className="mt-5 flex-1 font-display text-[1.12rem] leading-relaxed text-cream/90">
                  {review.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/25 bg-gold/[0.07] text-[11px] font-semibold text-gold">
                    {review.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-[0.82rem] font-semibold text-cream">
                      {review.name}
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-mist/50">
                      {review.role}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {list.length > 6 ? (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 border-b border-gold/30 pb-1 text-[10px] uppercase tracking-[0.24em] text-gold transition-colors hover:border-gold"
            >
              {showAll ? "Show fewer notes" : `Read all ${list.length} notes`}
              <IconArrowRight className="h-3 w-3" />
            </button>
          </div>
        ) : null}

        <Reveal delay={120}>
          <div className="mt-14 grid gap-8 rounded-[1.4rem] border border-gold/15 bg-[#0e0c09] p-6 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <p className="eyebrow">Write in the guest book</p>
              <h3 className="mt-4 font-display text-3xl leading-tight text-cream sm:text-4xl">
                Tell us about <span className="italic text-gold-gradient">your night.</span>
              </h3>
              <p className="mt-4 max-w-sm text-[0.88rem] leading-relaxed text-mist/75">
                A dish that surprised you, a server who made the evening, a detail
                we should keep. Your note is saved to our guest book instantly.
              </p>
              <div className="mt-6 hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-mist/50 lg:flex">
                <IconStar className="h-3 w-3 text-gold" />
                Reviews are published as written
              </div>
            </div>

            <form onSubmit={submitReview} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="review-name" className="field-label">
                    Your name
                  </label>
                  <input
                    id="review-name"
                    className="field"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="e.g. Ayesha M."
                    required
                    minLength={2}
                    maxLength={120}
                  />
                </div>
                <div>
                  <span className="field-label">Your rating</span>
                  <div className="flex h-[42px] items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                        className="transition-transform hover:scale-110"
                      >
                        <IconStar
                          className={`h-5 w-5 ${
                            star <= rating ? "text-gold" : "text-white/15"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="review-quote" className="field-label">
                  Your note
                </label>
                <textarea
                  id="review-quote"
                  className="field min-h-[104px] resize-none"
                  value={quote}
                  onChange={(event) => setQuote(event.target.value)}
                  placeholder="The truffle fries alone are worth the trip…"
                  required
                  minLength={12}
                  maxLength={800}
                />
              </div>

              {error ? (
                <p className="text-[11px] tracking-wide text-[#e08f7a]">{error}</p>
              ) : null}
              {success ? (
                <p className="flex items-center gap-2 text-[11px] tracking-wide text-gold">
                  <IconCheck className="h-3.5 w-3.5" />
                  Thank you — your note is now in the guest book.
                </p>
              ) : null}

              <button type="submit" disabled={submitting} className="btn-gold w-full sm:w-auto">
                {submitting ? "Saving…" : "Add to the guest book"}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
