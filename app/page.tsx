import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black tracking-tight">POS Frontend</h1>
        <p className="mt-2 text-zinc-600">
          Next.js + Tailwind v4 frontend connected to your Spring Boot backend.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link className="rounded-xl bg-zinc-900 px-4 py-2 font-semibold text-white hover:bg-zinc-800" href="/products">
            Browse Products
          </Link>
          <Link className="rounded-xl border px-4 py-2 font-semibold hover:bg-zinc-50" href="/login">
            Login
          </Link>
          <Link className="rounded-xl border px-4 py-2 font-semibold hover:bg-zinc-50" href="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
