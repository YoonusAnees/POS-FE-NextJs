"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { ProductsResponse, ProductDTO } from "../lib/types";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { safeNumber } from "../lib/utils";

export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(false);

  // search
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [ratings, setRatings] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get<ProductsResponse>(`/api/products?page=${page}&size=${size}`);
      setProducts(res.data.products);
      setTotal(res.data.total);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (keyword) params.set("Keyword", keyword);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (ratings) params.set("ratings", ratings);

      const res = await api.get<ProductDTO[]>(`/api/products/search?${params.toString()}`);
      setProducts(res.data);
      setTotal(res.data.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-black">Products</h1>
            <p className="text-sm text-zinc-600">Browse, search, add to cart</p>
          </div>

          <div className="grid w-full grid-cols-2 gap-2 md:w-auto md:grid-cols-5">
            <input className="rounded-xl border px-3 py-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input className="rounded-xl border px-3 py-2" placeholder="Keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <input className="rounded-xl border px-3 py-2" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input className="rounded-xl border px-3 py-2" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            <input className="rounded-xl border px-3 py-2" placeholder="Rating ≥" value={ratings} onChange={(e) => setRatings(e.target.value)} />
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <button onClick={() => { setPage(0); fetchProducts(); }}
                  className="rounded-xl border px-4 py-2 font-semibold hover:bg-zinc-50">
            Reset
          </button>
          <button onClick={searchProducts}
                  className="rounded-xl bg-zinc-900 px-4 py-2 font-semibold text-white hover:bg-zinc-800">
            Search
          </button>
        </div>
      </div>

      <Pagination page={page} size={size} total={total} onPage={setPage} />

      {loading ? (
        <div className="rounded-2xl border bg-white p-6 text-center text-zinc-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
