import { CartItem } from "./types";

const KEY = "pos_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const idx = cart.findIndex((c) => c.productId === item.productId);
  if (idx >= 0) cart[idx].quantity += item.quantity;
  else cart.push(item);
  setCart(cart);
}

export function removeFromCart(productId: number) {
  const cart = getCart().filter((c) => c.productId !== productId);
  setCart(cart);
}

export function updateQty(productId: number, qty: number) {
  const cart = getCart().map((c) => (c.productId === productId ? { ...c, quantity: qty } : c));
  setCart(cart.filter((c) => c.quantity > 0));
}

export function clearCart() {
  localStorage.removeItem(KEY);
}

export function cartTotal(): number {
  return getCart().reduce((sum, i) => sum + i.price * i.quantity, 0);
}
