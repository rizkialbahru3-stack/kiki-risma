"use client";

import { useEffect, useState } from "react";

type Info = { days: number; date: Date; year: number };

function nextInfo(startDate: string, now: Date): Info | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(startDate);
  if (!m) return null;
  const month = Number(m[2]) - 1;
  const day = Number(m[3]);
  const startYear = Number(m[1]);
  let year = now.getFullYear();
  let target = new Date(year, month, day);
  if (target.getTime() <= now.getTime()) {
    year += 1;
    target = new Date(year, month, day);
  }
  const days = Math.ceil((target.getTime() - now.getTime()) / 86400000);
  return { days, date: target, year: year - startYear };
}

export default function AnniversaryCountdown({
  startDate,
}: {
  startDate: string | null;
}) {
  const [info, setInfo] = useState<Info | null>(() =>
    startDate ? nextInfo(startDate, new Date()) : null,
  );

  useEffect(() => {
    if (!startDate) return;
    const timer = setInterval(
      () => setInfo(nextInfo(startDate, new Date())),
      60 * 60 * 1000,
    );
    return () => clearInterval(timer);
  }, [startDate]);

  if (!startDate || !info) return null;

  return (
    <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-950 dark:ring-1 dark:ring-zinc-800">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Menuju anniversary ke-{info.year}
      </p>
      <p className="mt-1 text-5xl font-bold tabular-nums text-rose-600 dark:text-rose-400">
        {info.days}
      </p>
      <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
        hari lagi —{" "}
        {info.date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
