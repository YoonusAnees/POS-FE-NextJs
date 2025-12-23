"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { User } from "../lib/types";
import Protected from "../components/Protected";

export default function ProfilePage() {
  const [me, setMe] = useState<User | null>(null);
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [password, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    const res = await api.get<User>("/api/users/me");
    setMe(res.data);
    setFirst(res.data.firstName || "");
    setLast(res.data.lastName || "");
  };

  useEffect(() => {
    load();
  }, []);

  const update = async () => {
    setMsg("");
    try {
      await api.put("/api/users/me", {
        firstName,
        lastName,
        password: password || undefined,
      });
      setMsg("✅ Profile updated");
      setPass("");
      await load();
    } catch {
      setMsg("Update failed");
    }
  };

  return (
    <Protected roles={["USER", "ADMIN"]}>
      <div className="space-y-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-black">My Profile</h1>
          <p className="text-sm text-zinc-600">Update your details</p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-3">
          <div className="text-sm text-zinc-600">Email</div>
          <div className="font-bold">{me?.email}</div>

          <div className="grid gap-3 md:grid-cols-2">
            <input className="rounded-xl border px-3 py-2" value={firstName} onChange={(e) => setFirst(e.target.value)} placeholder="First name" />
            <input className="rounded-xl border px-3 py-2" value={lastName} onChange={(e) => setLast(e.target.value)} placeholder="Last name" />
          </div>

          <input className="rounded-xl border px-3 py-2" value={password} onChange={(e) => setPass(e.target.value)} placeholder="New password (optional)" type="password" />

          <button onClick={update} className="rounded-xl bg-zinc-900 px-4 py-2 font-semibold text-white hover:bg-zinc-800">
            Save Changes
          </button>

          {msg && <div className="rounded-xl bg-zinc-100 p-3 text-sm">{msg}</div>}
        </div>
      </div>
    </Protected>
  );
}
