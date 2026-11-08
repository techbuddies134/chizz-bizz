"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "chizz-bizz-cart-v1";

type AddableItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  isOpen: boolean;
  toast: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: AddableItem) => void;
  decrement: (id: number) => void;
  removeLine: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.id === "number" &&
    typeof line.name === "string" &&
    typeof line.price === "number" &&
    typeof line.imageUrl === "string" &&
    typeof line.quantity === "number" &&
    line.quantity > 0
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(parsed.filter(isCartLine).slice(0, 40));
        }
      }
    } catch {
      // Ignore malformed storage.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage may be unavailable (private mode).
    }
  }, [lines, hydrated]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const flashToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const addItem = useCallback(
    (item: AddableItem) => {
      setLines((prev) => {
        const existing = prev.find((line) => line.id === item.id);
        if (existing) {
          return prev.map((line) =>
            line.id === item.id
              ? { ...line, quantity: Math.min(20, line.quantity + 1) }
              : line,
          );
        }
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
            quantity: 1,
          },
        ];
      });
      flashToast(`${item.name} added to your selection`);
    },
    [flashToast],
  );

  const decrement = useCallback((id: number) => {
    setLines((prev) =>
      prev
        .map((line) =>
          line.id === id ? { ...line, quantity: line.quantity - 1 } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeLine = useCallback((id: number) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const { count, subtotal } = useMemo(() => {
    return lines.reduce(
      (acc, line) => ({
        count: acc.count + line.quantity,
        subtotal: acc.subtotal + line.quantity * line.price,
      }),
      { count: 0, subtotal: 0 },
    );
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count,
      subtotal,
      hydrated,
      isOpen,
      toast,
      openCart,
      closeCart,
      addItem,
      decrement,
      removeLine,
      clearCart,
    }),
    [
      lines,
      count,
      subtotal,
      hydrated,
      isOpen,
      toast,
      openCart,
      closeCart,
      addItem,
      decrement,
      removeLine,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
