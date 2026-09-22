"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/musik.mp3";

/**
 * Gerbang masuk: browser memblokir audio autoplay bersuara sebelum ada
 * interaksi user. Satu ketukan "Masuk" = gesture yang mengizinkan audio.
 * - Kalau /musik.mp3 ada → diputar otomatis + tombol floating play/pause.
 * - Kalau belum ada (mode Spotify) → tombol floating scroll ke #musik.
 */
export default function EntryGate() {
  const [entered, setEntered] = useState(
    () =>
      typeof window !== "undefined" &&
      sessionStorage.getItem("entered") === "1",
  );
  const [hasFile, setHasFile] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch(AUDIO_SRC, { method: "HEAD" })
      .then((r) => setHasFile(r.ok))
      .catch(() => setHasFile(false));
  }, []);

  useEffect(() => {
    if (!entered || !hasFile) return;
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.8;
    audioRef.current = audio;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [entered, hasFile]);

  const toggle = () => {
    if (hasFile && audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
      }
      return;
    }
    document.getElementById("musik")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {!entered && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-6 text-center text-white">
          <div>
            <p className="text-sm tracking-widest text-rose-300 uppercase">
              Selamat datang
            </p>
            <h1 className="mt-2 text-4xl font-bold">Kiki ♥ Cimol</h1>
            <button
              type="button"
              onClick={() => {
                setEntered(true);
                sessionStorage.setItem("entered", "1");
              }}
              className="mt-8 animate-pulse rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white hover:bg-rose-500"
            >
              Klik untuk masuk
            </button>
            <p className="mt-3 text-xs text-zinc-400">
              Nyalakan suara ya, ada lagu buat kamu
            </p>
          </div>
        </div>
      )}

      {entered && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Jeda lagu" : "Putar lagu"}
          title={hasFile ? (playing ? "Jeda lagu" : "Putar lagu") : "Ke section Musik"}
          className="fixed right-4 bottom-4 z-50 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-rose-500"
        >
          {hasFile ? (playing ? "⏸" : "▶") : "♪"}
        </button>
      )}
    </>
  );
}
