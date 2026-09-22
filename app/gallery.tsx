"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  location?: string;
  date?: string | null;
};

function formatDateID(date?: string | null) {
  if (!date) return null;
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  return (
    <>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActive(i)}
            className="group flex cursor-zoom-in flex-col overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-zinc-200 transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-rose-500 dark:bg-zinc-950 dark:ring-zinc-800"
          >
            <span className="relative block h-72 w-full overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                Klik untuk zoom
              </span>
            </span>
            <span className="p-4">
              <span className="block text-sm font-medium">{photo.caption}</span>
              <span className="mt-1 block text-xs text-zinc-500">
                {[photo.location, formatDateID(photo.date)]
                  .filter(Boolean)
                  .join(" • ") || "Ketuk foto untuk lihat"}
              </span>
            </span>
          </button>
        ))}
      </div>

      {active !== null && photos[active] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto: ${photos[active].caption}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (dx > 50) step(-1);
            else if (dx < -50) step(1);
            touchStartX.current = null;
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Tutup"
            className="absolute top-4 right-4 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            ✕ Tutup
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Foto sebelumnya"
            className="absolute left-2 rounded-full bg-white/10 px-4 py-3 text-lg text-white hover:bg-white/20 sm:left-6"
          >
            ‹
          </button>

          <figure
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
              <Image
                key={photos[active].src}
                src={photos[active].src}
                alt={photos[active].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-white">
              <span>
                <span className="block text-sm font-semibold">
                  {photos[active].caption}
                </span>
                <span className="mt-0.5 block text-xs text-zinc-300">
                  {[photos[active].location, formatDateID(photos[active].date)]
                    .filter(Boolean)
                    .join(" • ")}
                </span>
              </span>
              <span className="shrink-0 text-xs tabular-nums text-zinc-300">
                {active + 1} / {photos.length}
              </span>
            </figcaption>
            <p className="mt-1 hidden text-xs text-zinc-400 sm:block">
              Geser / pakai ← → untuk pindah, Esc untuk tutup
            </p>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Foto berikutnya"
            className="absolute right-2 rounded-full bg-white/10 px-4 py-3 text-lg text-white hover:bg-white/20 sm:right-6"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
