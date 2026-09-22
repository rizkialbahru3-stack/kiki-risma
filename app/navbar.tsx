"use client";

import { useState } from "react";

const links = [
  { href: "#tentang", label: "Tentang" },
  { href: "#hari", label: "Hari" },
  { href: "#galeri", label: "Galeri" },
  { href: "#musik", label: "Musik" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-bold tracking-tight">
          Kiki <span className="text-rose-500">&hearts;</span> Cimol
        </a>
        <div className="hidden gap-6 text-sm font-medium sm:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-rose-500">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#galeri"
            className="hidden rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 sm:inline-block dark:bg-white dark:text-black dark:hover:bg-zinc-300"
          >
            Lihat Galeri
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="rounded-lg px-3 py-2 text-xl leading-none hover:bg-zinc-100 sm:hidden dark:hover:bg-zinc-900"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-zinc-200 bg-white px-6 py-3 sm:hidden dark:border-zinc-800 dark:bg-black">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-2 py-3 text-sm font-medium hover:bg-zinc-100 hover:text-rose-500 dark:hover:bg-zinc-900"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
