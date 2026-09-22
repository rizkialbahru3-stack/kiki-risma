"use client";

import { useState } from "react";

// Ganti isi surat di sini — semua teks editable.
const LETTER = {
  date: "Untuk Cimol, dengan sayang",
  greeting: "Hai Cimol,",
  body: [
    "Halaman kecil ini aku bikin khusus untuk kita berdua. Buat nyimpen foto, lagu, dan semua hal kecil yang bikin aku bersyukur kenal kamu.",
    "Makasih ya, udah jadi partner paling setia — dari mirror selfie sampai kompak pakai batik. Aku janji bakal terus notice hal-hal kecil tentang kamu, seperti kamu yang selalu notice hal kecil tentang aku.",
    "Sehat-sehat terus, jangan lupa makan dimsum favoritmu. Yang sayang sama kamu,",
  ],
  signature: "Kiki ♥",
};

export default function LoveLetter() {
  const [open, setOpen] = useState(false);

  return (
    <section id="surat" className="py-16">
      <h2 className="text-center text-2xl font-bold">Surat untuk Cimol</h2>

      {!open ? (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-2xl bg-white px-10 py-8 shadow-sm ring-1 ring-zinc-200 transition hover:shadow-md hover:ring-rose-300 dark:bg-zinc-950 dark:ring-zinc-800 dark:hover:ring-rose-700"
          >
            <span className="block text-5xl">💌</span>
            <span className="mt-3 block text-sm font-semibold text-rose-600 dark:text-rose-400">
              Klik untuk buka surat
            </span>
          </button>
        </div>
      ) : (
        <article className="mx-auto mt-6 max-w-2xl rounded-2xl bg-amber-50 p-8 shadow-md ring-1 ring-amber-200 sm:p-10 dark:bg-zinc-950 dark:ring-zinc-800">
          <p className="text-sm font-medium tracking-wide text-rose-500 uppercase">
            {LETTER.date}
          </p>
          <p className="mt-4 font-serif text-lg">{LETTER.greeting}</p>
          {LETTER.body.map((p, i) => (
            <p
              key={i}
              className="mt-4 font-serif leading-8 text-zinc-700 dark:text-zinc-300"
            >
              {p}
            </p>
          ))}
          <p className="mt-6 text-right font-serif text-xl font-bold text-rose-600 dark:text-rose-400">
            {LETTER.signature}
          </p>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-medium text-zinc-400 hover:text-rose-500"
            >
              Tutup surat ✕
            </button>
          </div>
        </article>
      )}
    </section>
  );
}
