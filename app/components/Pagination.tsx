"use client";

export default function Pagination({
  page,
  size,
  total,
  onPage,
}: {
  page: number;
  size: number;
  total: number;
  onPage: (p: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / size));

  return (
    <div className="flex items-center justify-between rounded-2xl border bg-white p-3">
      <div className="text-sm text-zinc-600">
        Page <b>{page + 1}</b> of <b>{totalPages}</b> • Total <b>{total}</b>
      </div>
      <div className="flex gap-2">
        <button
          disabled={page <= 0}
          onClick={() => onPage(page - 1)}
          className="rounded-xl border px-3 py-2 font-semibold disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => onPage(page + 1)}
          className="rounded-xl border px-3 py-2 font-semibold disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
