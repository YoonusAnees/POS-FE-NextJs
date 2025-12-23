"use client";

import Link from "next/link";
import { ProductDTO } from "../lib/types";
import { money } from "../lib/utils";
import { addToCart } from "../lib/cart";

export default function ProductCard({ p }: { p: ProductDTO }) {
  const img = p.images?.[0]?.url;

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100">
        {img ? (
          // if backend serves image URLs, this will show
          <img src={img} alt={p.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-500">
            No image
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm text-zinc-600 line-clamp-2">{p.description}</p>
          </div>
          <div className="text-right">
            <div className="font-black">{money(p.price)}</div>
            <div className="text-xs text-zinc-600">{p.category || "Uncategorized"}</div>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <Link
            href={`/products/${p.id}`}
            className="flex-1 rounded-xl border px-3 py-2 text-center font-semibold hover:bg-zinc-50"
          >
            View
          </Link>
          <button
            onClick={() =>
              addToCart({
                productId: p.id,
                name: p.name,
                description: p.description,
                price: p.price,
                quantity: 1,
                image: img,
              })
            }
            className="flex-1 rounded-xl bg-zinc-900 px-3 py-2 font-semibold text-white hover:bg-zinc-800"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
