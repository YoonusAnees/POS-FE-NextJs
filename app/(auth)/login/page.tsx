"use client";

import api from "../../lib/api";
import { tokenStore } from "../../lib/storage";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const login = async () => {
    setErr("");
    try {
      const res = await api.post("/auth/login", { email, password });
      tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
      tokenStore.setEmail(email);

      // fetch /me to get role
      const me = await api.get("/api/users/me");
      tokenStore.setRole(me.data.role);

      window.location.href = "/products";
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black">Login</h1>
        <p className="mt-1 text-sm text-zinc-600">Use your Spring Boot account</p>

        <div className="mt-6 space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {err && <div className="rounded-xl bg-red-50 p-2 text-sm text-red-700">{err}</div>}

          <button
            onClick={login}
            className="w-full rounded-xl bg-zinc-900 py-2 font-semibold text-white hover:bg-zinc-800"
          >
            Login
          </button>

          <a className="block text-center text-sm text-zinc-600 hover:underline" href="/register">
            No account? Register
          </a>
        </div>
      </div>
    </div>
  );
}
