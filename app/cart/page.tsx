"use client";

import { useEffect, useState } from "react";
import { CartItem, CreateOrderRequest, Order } from "../lib/types";
import { clearCart, getCart, removeFromCart, updateQty } from "../lib/cart";
import api from "../lib/api";
import { money } from "../lib/utils";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [msg, setMsg] = useState("");

  const refresh = () => setItems(getCart());

  useEffect(() => {
    refresh();
  }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const checkout = async () => {
    setMsg("");
    try {
      const payload: CreateOrderRequest = {
        orderItem: items.map((i) => ({
          name: i.name,
          description: i.description,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
          productId: i.productId,
        })),
      };

      const res = await api.post<Order>("/api/orders", payload);
      clearCart();
      refresh();
      setMsg(`✅ Order created! ReferenceNo: ${res.data.referenceNo}`);
    } catch (e: any) {
      setMsg(e?.response?.data?.message || "Checkout failed (login may be required).");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black">Cart</h1>
        <p className="text-sm text-zinc-600">Local cart (stored in browser)</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border bg-white p-6 text-zinc-600">Cart is empty.</div>
      ) : (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.productId} className="flex flex-col gap-3 rounded-xl border p-4 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-3">
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-zinc-100">
                    {i.image ? <img src={i.image} className="h-full w-full object-cover" /> : null}
                  </div>
                  <div>
                    <div className="font-bold">{i.name}</div>
                    <div className="text-sm text-zinc-600">{money(i.price)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="rounded-xl border px-3 py-2 font-semibold"
                    onClick={() => { updateQty(i.productId, i.quantity - 1); refresh(); }}
                  >
                    -
                  </button>
                  <div className="w-10 text-center font-bold">{i.quantity}</div>
                  <button
                    className="rounded-xl border px-3 py-2 font-semibold"
                    onClick={() => { updateQty(i.productId, i.quantity + 1); refresh(); }}
                  >
                    +
                  </button>

                  <button
                    className="rounded-xl bg-red-600 px-3 py-2 font-semibold text-white hover:bg-red-500"
                    onClick={() => { removeFromCart(i.productId); refresh(); }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-lg font-black">Subtotal: {money(subtotal)}</div>
            <button onClick={checkout} className="rounded-xl bg-zinc-900 px-4 py-2 font-semibold text-white hover:bg-zinc-800">
              Create Order
            </button>
          </div>

          {msg && <div className="mt-4 rounded-xl bg-zinc-100 p-3 text-sm">{msg}</div>}
        </div>
      )}
    </div>
  );
}
