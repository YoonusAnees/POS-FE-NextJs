"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { tokenStore } from "../lib/storage";

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setRole(tokenStore.getRole());
    setHasToken(!!tokenStore.getAccess());
  }, []);

  const logout = () => {
    tokenStore.clear();
    window.location.href = "/login";
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-black tracking-tight">
          POS
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          <Link className="rounded-xl px-3 py-2 hover:bg-zinc-100" href="/products">
            Products
          </Link>
          <Link className="rounded-xl px-3 py-2 hover:bg-zinc-100" href="/cart">
            Cart
          </Link>
          <Link className="rounded-xl px-3 py-2 hover:bg-zinc-100" href="/orders">
            Orders
          </Link>

          {role === "ADMIN" && (
            <Link className="rounded-xl px-3 py-2 hover:bg-zinc-100" href="/admin/users">
              Admin
            </Link>
          )}

          <Link className="rounded-xl px-3 py-2 hover:bg-zinc-100" href="/profile">
            Profile
          </Link>

          {!hasToken ? (
            <Link className="rounded-xl bg-zinc-900 px-3 py-2 font-semibold text-white hover:bg-zinc-800" href="/login">
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="rounded-xl bg-zinc-900 px-3 py-2 font-semibold text-white hover:bg-zinc-800"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
