"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const [failed, setFailed] = useState(false);
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
        preload="auto"
        poster="/kami-2.png"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
