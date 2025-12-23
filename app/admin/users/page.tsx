"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { User } from "../../lib/types";
import Protected from "../../components/Protected";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const res = await api.get<User[]>("/api/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const del = async (id: number) => {
    setMsg("");
    await api.delete(`/api/admin/users/${id}`);
    setMsg("✅ Deleted");
    await load();
  };

  const updateRole = async (id: number, role: "USER" | "ADMIN") => {
    setMsg("");
    await api.put(`/api/admin/users/${id}`, { role });
    setMsg("✅ Updated role");
    await load();
  };

  return (
    <Protected roles={["ADMIN"]}>
      <div className="space-y-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-black">Admin • Users</h1>
          <p className="text-sm text-zinc-600">Manage users</p>
          {msg && <div className="mt-3 rounded-xl bg-zinc-100 p-3 text-sm">{msg}</div>}
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left">
                <tr className="border-b">
                  <th className="py-2">ID</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="py-2">{u.id}</td>
                    <td className="py-2">{u.firstName} {u.lastName}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2">
                      <select
                        className="rounded-xl border px-2 py-1"
                        value={u.role}
                        onChange={(e) => updateRole(u.id, e.target.value as any)}
                      >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => del(u.id)}
                        className="rounded-xl bg-red-600 px-3 py-2 font-semibold text-white hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-zinc-600">
                      No users
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Protected>
  );
}
