"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { ProductDTO } from "../../lib/types";
import { addToCart } from "../../lib//cart";
import { money } from "../../lib/utils";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  const [p, setP] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get<ProductDTO>(`/api/products/${id}`);
      setP(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submitReview = async () => {
    setMsg("");
    try {
      await api.post("/api/products/review", {
        productId: Number(id),
        rating: Number(rating),
        comment,
      });
      setMsg("Review added!");
      setComment("");
      await fetchProduct();
    } catch (e: any) {
      setMsg(e?.response?.data?.message || "Failed to add review (login may be required).");
    }
  };

  if (loading) return <div className="rounded-2xl border bg-white p-6">Loading...</div>;
  if (!p) return <div className="rounded-2xl border bg-white p-6">Not found</div>;

  const img = p.images?.[0]?.url;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
            {img ? <img src={img} alt={p.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-zinc-500">No image</div>}
          </div>

          <div>
            <h1 className="text-3xl font-black">{p.name}</h1>
            <p className="mt-2 text-zinc-700">{p.description}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-zinc-100 px-3 py-1">Category: {p.category || "N/A"}</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1">Seller: {p.seller}</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1">Stock: {p.stock}</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1">Rating: {p.ratings?.toFixed?.(1) ?? p.ratings}</span>
              <span className="rounded-full bg-zinc-100 px-3 py-1">Reviews: {p.numOfReviews}</span>
            </div>

            <div className="mt-4 text-2xl font-black">{money(p.price)}</div>

            <div className="mt-4 flex gap-2">
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
                className="rounded-xl bg-zinc-900 px-4 py-2 font-semibold text-white hover:bg-zinc-800"
              >
                Add to Cart
              </button>
              <a href="/cart" className="rounded-xl border px-4 py-2 font-semibold hover:bg-zinc-50">
                Go to Cart
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black">Reviews</h2>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <select className="rounded-xl border px-3 py-2" value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Ok</option>
            <option value="2">2 - Bad</option>
            <option value="1">1 - Terrible</option>
          </select>
          <input className="md:col-span-2 rounded-xl border px-3 py-2" placeholder="Comment (optional)"
                 value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button onClick={submitReview} className="rounded-xl bg-zinc-900 px-4 py-2 font-semibold text-white hover:bg-zinc-800">
            Submit Review
          </button>
          {msg && <div className="text-sm text-zinc-700">{msg}</div>}
        </div>

        <div className="mt-6 space-y-2">
          {(p.reviews || []).length === 0 ? (
            <div className="text-sm text-zinc-600">No reviews yet.</div>
          ) : (
            p.reviews.map((r, idx) => (
              <div key={idx} className="rounded-xl border p-3">
                <div className="font-semibold">Rating: {r.rating}</div>
                <div className="text-sm text-zinc-700">{r.comment || "No comment"}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
