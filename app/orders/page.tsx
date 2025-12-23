"use client";

import { useState } from "react";
import api from "../lib/api";
import { Order } from "../lib//types";
import { money } from "../lib//utils";

export default function OrdersPage() {
  const [ref, setRef] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [msg, setMsg] = useState("");

  const fetchOrder = async () => {
    setMsg("");
    setOrder(null);
    try {
      const res = await api.get<Order>(`/api/orders/${ref}`);
      setOrder(res.data);
    } catch (e: any) {
      setMsg("Order not found (check referenceNo)");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black">Track Order</h1>
        <p className="text-sm text-zinc-600">Enter referenceNo</p>

        <div className="mt-4 flex flex-col gap-2 md:flex-row">
          <input className="flex-1 rounded-xl border px-3 py-2" placeholder="referenceNo"
                 value={ref} onChange={(e) => setRef(e.target.value)} />
          <button onClick={fetchOrder} className="rounded-xl bg-zinc-900 px-4 py-2 font-semibold text-white hover:bg-zinc-800">
            Search
          </button>
        </div>

        {msg && <div className="mt-3 text-sm text-red-600">{msg}</div>}
      </div>

      {order && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-2">
          <div className="text-sm text-zinc-600">Reference</div>
          <div className="text-xl font-black">{order.referenceNo}</div>

          <div className="grid gap-2 md:grid-cols-3">
            <div className="rounded-xl border p-3">
              <div className="text-xs text-zinc-600">Status</div>
              <div className="font-bold">{order.status}</div>
            </div>
            <div className="rounded-xl border p-3">
              <div className="text-xs text-zinc-600">Total Items</div>
              <div className="font-bold">{money(order.totalItemAmount)}</div>
            </div>
            <div className="rounded-xl border p-3">
              <div className="text-xs text-zinc-600">Total Amount</div>
              <div className="font-bold">{money(order.totalAmount)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
