"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, formatPKR } from "@/lib/format";
import type { OrderConfirmation } from "@/lib/types";
import { useCart } from "./cart-provider";
import {
  IconArrowLeft,
  IconBag,
  IconCheck,
  IconClose,
  IconMinus,
  IconPlus,
} from "./icons";

type Step = "cart" | "details" | "done";

export function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    isOpen,
    closeCart,
    addItem,
    decrement,
    removeLine,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (isOpen && step === "done") {
      setStep("cart");
      setConfirmation(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const placeOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: lines.map((line) => ({ id: line.id, quantity: line.quantity })),
        }),
      });
      const data: {
        ok?: boolean;
        order?: OrderConfirmation;
        error?: string;
      } = await response.json();

      if (!response.ok || !data.ok || !data.order) {
        throw new Error(data.error ?? "Could not place that order.");
      }

      setConfirmation(data.order);
      clearCart();
      setStep("done");
      setForm({ customerName: "", phone: "", address: "", notes: "" });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not place that order.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[80] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        aria-label="Order cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-gold/20 bg-[#0b0907] shadow-panel transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between border-b border-white/8 px-6 py-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-gold">
              {step === "done" ? "Confirmed" : step === "details" ? "Delivery details" : "Your selection"}
            </p>
            <h2 className="mt-1.5 font-display text-2xl text-cream">
              {step === "done" ? "Order placed" : "Your order"}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-mist transition-colors hover:border-gold/50 hover:text-cream"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>

        {step !== "done" ? (
          <div className="flex items-center gap-3 border-b border-white/5 px-6 py-3 text-[9px] uppercase tracking-[0.2em]">
            <span className={step === "cart" ? "text-gold" : "text-mist/40"}>
              01 Selection
            </span>
            <span className="h-px flex-1 bg-gold/20" />
            <span className={step === "details" ? "text-gold" : "text-mist/40"}>
              02 Checkout
            </span>
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === "done" && confirmation ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                <IconCheck className="h-7 w-7" />
              </span>
              <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold">
                Order {confirmation.orderNumber}
              </p>
              <h3 className="mt-3 font-display text-4xl text-cream">
                Thank you, {confirmation.customerName.split(" ")[0]}.
              </h3>
              <p className="mt-3 max-w-[19rem] text-[0.85rem] leading-relaxed text-mist/80">
                The kitchen has your ticket. We will call to confirm, then send it
                out hot — roughly {confirmation.estimatedMinutes} minutes to your door.
              </p>
              <dl className="mt-7 w-full space-y-2.5 border-y border-white/8 py-5 text-[0.8rem]">
                <div className="flex justify-between text-mist/70">
                  <dt>Subtotal</dt>
                  <dd>{formatPKR(confirmation.subtotal)}</dd>
                </div>
                <div className="flex justify-between text-mist/70">
                  <dt>Delivery</dt>
                  <dd>
                    {confirmation.deliveryFee === 0
                      ? "Complimentary"
                      : formatPKR(confirmation.deliveryFee)}
                  </dd>
                </div>
                <div className="flex justify-between pt-1 text-cream">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-display text-xl text-gold">
                    {formatPKR(confirmation.total)}
                  </dd>
                </div>
              </dl>
              <button type="button" onClick={closeCart} className="btn-gold mt-7 w-full">
                Continue exploring
              </button>
            </div>
          ) : lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/20 text-gold/60">
                <IconBag className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-2xl text-cream">
                Your cart is waiting
              </h3>
              <p className="mt-2 max-w-[17rem] text-[0.82rem] leading-relaxed text-mist/70">
                Start with the Le Classique and a side of truffle fries — it is how
                most first visits begin.
              </p>
              <a
                href="#menu"
                onClick={closeCart}
                className="btn-ghost mt-7"
              >
                Browse the menu
              </a>
            </div>
          ) : step === "cart" ? (
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.2em]">
                  <span className="text-mist/60">
                    {remaining === 0
                      ? "Complimentary delivery unlocked"
                      : `${formatPKR(remaining)} away from free delivery`}
                  </span>
                  <span className="text-gold">{Math.round(progress)}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {lines.map((line) => (
                <div
                  key={line.id}
                  className="flex gap-3 rounded-xl border border-white/[0.07] bg-card p-3"
                >
                  <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={line.imageUrl}
                      alt={line.name}
                      fill
                      unoptimized={line.imageUrl.startsWith("http")}
                      sizes="68px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="truncate text-[0.82rem] font-semibold text-cream">
                        {line.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        aria-label={`Remove ${line.name}`}
                        className="text-mist/40 transition-colors hover:text-gold"
                      >
                        <IconClose className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[0.78rem] text-gold">
                        {formatPKR(line.price * line.quantity)}
                      </span>
                      <div className="flex items-center gap-2.5 rounded-full border border-white/10 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => decrement(line.id)}
                          aria-label={`Decrease ${line.name}`}
                          className="text-mist transition-colors hover:text-gold"
                        >
                          <IconMinus className="h-3 w-3" />
                        </button>
                        <span className="w-3.5 text-center text-[0.72rem] text-cream">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            addItem({
                              id: line.id,
                              name: line.name,
                              price: line.price,
                              imageUrl: line.imageUrl,
                            })
                          }
                          aria-label={`Increase ${line.name}`}
                          className="text-mist transition-colors hover:text-gold"
                        >
                          <IconPlus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <p className="pt-1 text-[10px] leading-relaxed text-mist/45">
                Orders are prepared to order. For allergies, message us on WhatsApp
                after checkout.
              </p>
            </div>
          ) : (
            <form id="checkout-form" onSubmit={placeOrder} className="space-y-4">
              <div>
                <label htmlFor="order-name" className="field-label">
                  Full name
                </label>
                <input
                  id="order-name"
                  className="field"
                  value={form.customerName}
                  onChange={(event) => update("customerName", event.target.value)}
                  placeholder="Ayesha Malik"
                  required
                  minLength={2}
                />
              </div>
              <div>
                <label htmlFor="order-phone" className="field-label">
                  Phone
                </label>
                <input
                  id="order-phone"
                  className="field"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  placeholder="0300 1234567"
                  inputMode="tel"
                  required
                />
              </div>
              <div>
                <label htmlFor="order-address" className="field-label">
                  Delivery address
                </label>
                <textarea
                  id="order-address"
                  className="field min-h-[80px] resize-none"
                  value={form.address}
                  onChange={(event) => update("address", event.target.value)}
                  placeholder="House 12, Street 4, Gulberg III, Lahore"
                  required
                  minLength={10}
                />
              </div>
              <div>
                <label htmlFor="order-notes" className="field-label">
                  Notes for the kitchen
                </label>
                <textarea
                  id="order-notes"
                  className="field min-h-[64px] resize-none"
                  value={form.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  placeholder="Extra gold sauce, no onions…"
                  maxLength={400}
                />
              </div>

              <div className="rounded-xl border border-gold/15 bg-gold/[0.04] px-4 py-3">
                <p className="text-[9px] uppercase tracking-[0.2em] text-gold/80">
                  Delivery window
                </p>
                <p className="mt-1 text-[0.82rem] text-cream">
                  {lines.reduce((sum, line) => sum + line.quantity, 0)} items ·
                  estimated 35 minutes
                </p>
              </div>

              {error ? (
                <p className="text-[11px] tracking-wide text-[#e08f7a]">{error}</p>
              ) : null}
            </form>
          )}
        </div>

        {step !== "done" && lines.length > 0 ? (
          <div className="border-t border-white/10 bg-[#080605] px-6 py-5">
            <div className="space-y-2 text-[0.82rem]">
              <div className="flex justify-between text-mist/70">
                <span>Subtotal · {count} items</span>
                <span>{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-mist/70">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? "Complimentary" : formatPKR(deliveryFee)}</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-white/8 pt-3 text-cream">
                <span className="text-[10px] uppercase tracking-[0.22em]">Total</span>
                <span className="font-display text-2xl text-gold">{formatPKR(total)}</span>
              </div>
            </div>

            {step === "cart" ? (
              <button
                type="button"
                onClick={() => setStep("details")}
                className="btn-gold mt-4 w-full"
              >
                Continue to checkout
              </button>
            ) : (
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold/10"
                  aria-label="Back to cart"
                >
                  <IconArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={submitting}
                  className="btn-gold flex-1"
                >
                  {submitting ? "Placing order…" : "Place order"}
                </button>
              </div>
            )}
            <p className="mt-3 text-center text-[9px] uppercase tracking-[0.18em] text-mist/40">
              Cash on delivery · Card on request
            </p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

export function CartToast() {
  const { toast, isOpen, openCart } = useCart();

  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-24 left-1/2 z-[90] w-[calc(100%-2.5rem)] max-w-sm -translate-x-1/2 transition-all duration-300 sm:bottom-6 ${
        isOpen ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={openCart}
        className="flex w-full items-center gap-3 rounded-full border border-gold/30 bg-[#12100c]/95 px-5 py-3 text-left shadow-panel backdrop-blur-xl"
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold text-ink">
          <IconCheck className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[0.78rem] text-cream">{toast}</span>
        <span className="shrink-0 text-[9px] uppercase tracking-[0.18em] text-gold">
          View cart
        </span>
      </button>
    </div>
  );
}

export function MobileOrderBar() {
  const { count, subtotal, openCart, hydrated } = useCart();

  if (!hydrated || count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[50] border-t border-gold/20 bg-[#0b0907]/95 px-4 py-3 backdrop-blur-xl sm:hidden">
      <button
        type="button"
        onClick={openCart}
        className="flex w-full items-center justify-between rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-deep px-5 py-3 text-ink"
      >
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]">
          <IconBag className="h-4 w-4" />
          {count} in cart
        </span>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.14em]">
          {formatPKR(subtotal)} · View
        </span>
      </button>
    </div>
  );
}
