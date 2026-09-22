"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.play().catch(() => {});
  }, [failed]);

  if (failed) {
    return (
      <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-3xl shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-800">
        <Image
          src="/kami-2.png"
          alt="Kiki dan Cimol duduk berdua di bangku taman"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-3xl shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-800">
      <video
        ref={videoRef}
        src="/video-kita.mp4"
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/kami-2.png"
        onError={() => setFailed(true)}
      />
      <button
        type="button"
        onClick={() => {
          const v = videoRef.current;
          const next = !muted;
          setMuted(next);
          if (v) {
            v.muted = next;
            if (!next) v.play().catch(() => {});
          }
        }}
        aria-label={muted ? "Nyalakan suara video" : "Bisukan video"}
        className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/80"
      >
        {muted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}
