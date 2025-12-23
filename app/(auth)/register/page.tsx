"use client";

import api from "../../lib/api";
import { useState } from "react";

export default function RegisterPage() {
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const register = async () => {
    setErr("");
    setMsg("");
    try {
      await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      setMsg("Registered! Now login.");
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Register failed");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black">Register</h1>

        <div className="mt-6 space-y-3">
          <input className="w-full rounded-xl border px-3 py-2" placeholder="First name" value={firstName} onChange={(e) => setFirst(e.target.value)} />
          <input className="w-full rounded-xl border px-3 py-2" placeholder="Last name" value={lastName} onChange={(e) => setLast(e.target.value)} />
          <input className="w-full rounded-xl border px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded-xl border px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPass(e.target.value)} />

          {err && <div className="rounded-xl bg-red-50 p-2 text-sm text-red-700">{err}</div>}
          {msg && <div className="rounded-xl bg-green-50 p-2 text-sm text-green-700">{msg}</div>}

          <button onClick={register} className="w-full rounded-xl bg-zinc-900 py-2 font-semibold text-white hover:bg-zinc-800">
            Create account
          </button>

          <a className="block text-center text-sm text-zinc-600 hover:underline" href="/login">
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
}
