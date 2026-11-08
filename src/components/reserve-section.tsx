"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { IconCheck, IconClock, IconPhone, IconPin, IconSpark } from "./icons";

const TIMES = [
  "12:30 PM",
  "1:30 PM",
  "3:00 PM",
  "5:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:30 PM",
  "11:00 PM",
];

const OCCASIONS = [
  "Just dinner",
  "Birthday",
  "Anniversary",
  "Business dinner",
  "Private dining",
  "Chef's counter",
];

type Confirmation = {
  id: number;
  name: string;
  guests: number;
  date: string;
  time: string;
};

export function ReserveSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: "",
    time: "7:00 PM",
    occasion: OCCASIONS[0],
    notes: "",
  });
  const [minDate, setMinDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const prettyDate = useMemo(() => {
    if (!confirmation) return "";
    const parsed = new Date(`${confirmation.date}T12:00:00`);
    if (Number.isNaN(parsed.getTime())) return confirmation.date;
    return parsed.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [confirmation]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guests: Number(form.guests) }),
      });
      const data: {
        ok?: boolean;
        reservation?: Confirmation;
        error?: string;
      } = await response.json();

      if (!response.ok || !data.ok || !data.reservation) {
        throw new Error(data.error ?? "Could not request that table.");
      }
      setConfirmation(data.reservation);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not request that table.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reserve" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[460px] w-[460px] rounded-full bg-gold/[0.06] blur-[140px]" />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="V"
            eyebrow="Reservations"
            title={
              <>
                Save a seat <span className="italic text-gold-gradient">for the evening.</span>
              </>
            }
            subtitle="Forty-two seats, two sittings. Tell us when you are coming and we will have the room — and the gold sauce — ready."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="panel p-6 sm:p-9">
              {confirmation ? (
                <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                    <IconCheck className="h-7 w-7" />
                  </span>
                  <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold">
                    Table requested
                  </p>
                  <h3 className="mt-3 font-display text-4xl text-cream">
                    We have you, {confirmation.name.split(" ")[0]}.
                  </h3>
                  <p className="mt-3 max-w-sm text-[0.88rem] leading-relaxed text-mist/80">
                    Your table for {confirmation.guests}{" "}
                    {confirmation.guests === 1 ? "guest" : "guests"} on {prettyDate} at{" "}
                    {confirmation.time} is in our book. Our host will call to confirm
                    within 15 minutes.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-mist/60">
                    <span className="rounded-full border border-white/10 px-3 py-1.5">
                      Ref · CB-{String(confirmation.id).padStart(4, "0")}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1.5">
                      Smart casual
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmation(null);
                      setForm((prev) => ({ ...prev, name: "", phone: "", notes: "" }));
                    }}
                    className="btn-ghost mt-8"
                  >
                    Request another table
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="res-name" className="field-label">
                        Full name
                      </label>
                      <input
                        id="res-name"
                        className="field"
                        value={form.name}
                        onChange={(event) => update("name", event.target.value)}
                        placeholder="Ayesha Malik"
                        required
                        minLength={2}
                      />
                    </div>
                    <div>
                      <label htmlFor="res-phone" className="field-label">
                        Phone
                      </label>
                      <input
                        id="res-phone"
                        className="field"
                        value={form.phone}
                        onChange={(event) => update("phone", event.target.value)}
                        placeholder="0300 1234567"
                        inputMode="tel"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="res-date" className="field-label">
                        Date
                      </label>
                      <input
                        id="res-date"
                        type="date"
                        className="field"
                        value={form.date}
                        min={minDate || undefined}
                        onChange={(event) => update("date", event.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="res-time" className="field-label">
                        Time
                      </label>
                      <select
                        id="res-time"
                        className="field appearance-none"
                        value={form.time}
                        onChange={(event) => update("time", event.target.value)}
                      >
                        {TIMES.map((time) => (
                          <option key={time} value={time} className="bg-[#111]">
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="res-guests" className="field-label">
                        Guests
                      </label>
                      <select
                        id="res-guests"
                        className="field appearance-none"
                        value={form.guests}
                        onChange={(event) => update("guests", event.target.value)}
                      >
                        {Array.from({ length: 12 }, (_, index) => index + 1).map(
                          (guests) => (
                            <option key={guests} value={guests} className="bg-[#111]">
                              {guests} {guests === 1 ? "guest" : "guests"}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="res-occasion" className="field-label">
                      Occasion
                    </label>
                    <select
                      id="res-occasion"
                      className="field appearance-none"
                      value={form.occasion}
                      onChange={(event) => update("occasion", event.target.value)}
                    >
                      {OCCASIONS.map((occasion) => (
                        <option key={occasion} value={occasion} className="bg-[#111]">
                          {occasion}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="res-notes" className="field-label">
                      Anything we should know?
                    </label>
                    <textarea
                      id="res-notes"
                      className="field min-h-[92px] resize-none"
                      value={form.notes}
                      onChange={(event) => update("notes", event.target.value)}
                      placeholder="Allergies, a surprise, a favourite booth…"
                      maxLength={400}
                    />
                  </div>

                  {error ? (
                    <p className="text-[11px] tracking-wide text-[#e08f7a]">{error}</p>
                  ) : null}

                  <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-mist/45">
                      No prepayment · Cancel any time
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-gold w-full sm:w-auto"
                    >
                      {submitting ? "Requesting…" : "Request table"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col gap-5">
              <div className="panel flex-1 p-6 sm:p-7">
                <p className="eyebrow">Find the house</p>
                <div className="mt-5 space-y-4">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(site.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 text-[0.86rem] leading-relaxed text-mist transition-colors hover:text-cream"
                  >
                    <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {site.address}
                  </a>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-[0.86rem] text-mist transition-colors hover:text-cream"
                  >
                    <IconPhone className="h-4 w-4 shrink-0 text-gold" />
                    {site.phone}
                  </a>
                  <div className="flex items-start gap-3 text-[0.86rem] text-mist">
                    <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <div className="space-y-1">
                      {site.hours.map((entry) => (
                        <p key={entry.day}>
                          <span className="text-cream/90">{entry.day}</span>
                          <span className="mx-2 text-gold/40">·</span>
                          {entry.time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative mt-7 overflow-hidden rounded-xl border border-white/5 bg-[#0b0907] p-5">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(200,169,107,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,169,107,0.08)_1px,transparent_1px)] bg-[size:26px_26px]" />
                  <div className="relative flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold">
                      <IconPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[0.8rem] font-semibold text-cream">
                        Gulberg III · MM Alam Road
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-mist/50">
                        Valet parking · 2 min from Liberty
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.4rem] border border-gold/20 bg-gradient-to-br from-gold/[0.12] via-[#12100c] to-[#0d0b08] p-6 sm:p-7">
                <IconSpark className="h-4 w-4 text-gold" />
                <p className="mt-3 font-display text-2xl leading-snug text-cream">
                  &ldquo;Six seats at the pass. Six courses. One very good night.&rdquo;
                </p>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-mist/70">
                  Ask for the chef&rsquo;s counter when you book — a tasting of the
                  kitchen&rsquo;s current obsessions, paired with house sodas.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
