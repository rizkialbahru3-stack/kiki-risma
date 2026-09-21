"use client";

import { useEffect, useState } from "react";

function diffDays(from: string): number {
  const start = new Date(`${from}T00:00:00`);
  const now = new Date();
  return Math.max(0, Math.floor((now.getTime() - start.getTime()) / 86400000));
}

export default function DayCounter({ startDate }: { startDate: string | null }) {
  const [days, setDays] = useState<number | null>(() =>
    startDate ? diffDays(startDate) : null,
  );

  useEffect(() => {
    if (!startDate) return;
    const timer = setInterval(() => setDays(diffDays(startDate)), 60 * 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  if (!startDate) {
    return (
      <p className="mt-4 text-zinc-500 dark:text-zinc-400">
        Tanggal jadian menyusul — penghitungnya jalan otomatis begitu
        tanggalnya diisi.
      </p>
    );
  }

  if (days === null) {
    return <p className="mt-4 text-zinc-500">Menghitung hari...</p>;
  }

  return (
    <div className="mt-4 flex items-baseline justify-center gap-3">
      <span className="text-6xl font-bold tabular-nums text-rose-600 dark:text-rose-400">
        {days}
      </span>
      <span className="text-lg font-medium text-zinc-600 dark:text-zinc-300">
        hari bersama
      </span>
    </div>
  );
}
