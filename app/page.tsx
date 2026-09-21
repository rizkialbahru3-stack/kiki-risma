import Image from "next/image";
import DayCounter from "./day-counter";

// Isi tanggal jadian dengan format "YYYY-MM-DD" kalau sudah ada,
// misal "2025-02-14". Selama null, section-nya tampil sebagai "menyusul".
const ANNIVERSARY_DATE: string | null = "2025-04-05";

const photos = [
  {
    src: "/kami-2.png",
    alt: "Kiki dan Cimol duduk berdua di bangku taman",
    caption: "Santai berdua di taman",
  },
  {
    src: "/kami-1.png",
    alt: "Kiki dan Cimol mirror selfie",
    caption: "Mirror selfie",
  },
  {
    src: "/kami-3.png",
    alt: "Kiki dan Cimol memakai batik, selfie di depan cermin",
    caption: "Kompak pakai batik",
  },
];

const profiles = [
  {
    photo: "/foto-kiki.png",
    alt: "Foto Kiki",
    name: "Kiki",
    desc: "Halo, aku Kiki — yang bikin halaman kecil ini spesial untuk kami berdua. Lahir 23 November 2007 (Sagitarius). Makanan kesukaanku sate kambing — aku tidak suka bakso, kecuali bakso aci.",
  },
  {
    photo: "/foto-risma.png",
    alt: "Foto Risma (Cimol)",
    name: 'Risma "Cimol"',
    desc: "Halo, aku Risma, biasa dipanggil Cimol — partner setia Kiki di setiap momen. Warna kesukaanku pink dan ungu muda, makananku dimsum. Aku suka di-notice hal-hal kecil dan tidak suka dibentak. Lahir 4 Januari 2005 (Capricorn).",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#" className="text-lg font-bold tracking-tight">
            Kiki <span className="text-rose-500">&hearts;</span> Cimol
          </a>
          <div className="hidden gap-6 text-sm font-medium sm:flex">
            <a href="#tentang" className="hover:text-rose-500">Tentang</a>
            <a href="#hari" className="hover:text-rose-500">Hari</a>
            <a href="#galeri" className="hover:text-rose-500">Galeri</a>
            <a href="#musik" className="hover:text-rose-500">Musik</a>
          </div>
          <a
            href="#galeri"
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-300"
          >
            Lihat Galeri
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="flex flex-col-reverse items-center gap-10 py-20 text-center sm:text-left lg:flex-row lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 inline-block rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              Halo, selamat datang di halaman kami
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Kiki &amp; Cimol
            </h1>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Ini adalah halaman kecil tentang kami berdua — Kiki dan Risma
              yang biasa dipanggil Cimol. Kenalan lebih jauh di bawah dan
              nikmati foto-foto kami.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#galeri"
                className="rounded-full bg-rose-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-rose-500"
              >
                Lihat Galeri
              </a>
              <a
                href="#tentang"
                className="rounded-full border border-zinc-300 px-6 py-3 text-center text-sm font-semibold hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                Tentang Kami
              </a>
            </div>
          </div>
          <div className="relative h-72 w-full max-w-sm overflow-hidden rounded-3xl shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-800">
            <Image
              src="/kami-2.png"
              alt="Kiki dan Cimol duduk berdua di bangku taman"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Tentang */}
        <section id="tentang" className="rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-950 dark:ring-1 dark:ring-zinc-800">
          <h2 className="text-2xl font-bold">Tentang Kami</h2>
          <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
            Kenalan dulu — ini kami berdua. Cerita lengkapnya menyusul ya.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {profiles.map((p) => (
              <div key={p.name} className="overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={p.photo}
                    alt={p.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-lg font-bold">{p.name}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Menghitung hari */}
        <section id="hari" className="py-16 text-center">
          <h2 className="text-2xl font-bold">Menghitung Hari</h2>
          <DayCounter startDate={ANNIVERSARY_DATE} />
        </section>

        {/* Galeri */}
        <section id="galeri" className="py-16">
          <h2 className="text-2xl font-bold">Galeri Kami</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Beberapa momen favorit kami berdua.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <article
                key={photo.src}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition hover:shadow-md dark:bg-zinc-950 dark:ring-zinc-800"
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <p className="p-4 text-sm font-medium">{photo.caption}</p>
              </article>
            ))}
          </div>
        </section>
        {/* Musik */}
        <section id="musik" className="pb-16">
          <h2 className="text-2xl font-bold">Musik Kami</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Lagu favorit yang selalu kami putar.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold">
                Favorit Kiki — &ldquo;bitterlove&rdquo;
              </p>
              <iframe
                src="https://open.spotify.com/embed/track/74OLXYsvpfmSgPCMMi898K"
                width="100%"
                height="152"
                title="Spotify Embed: bitterlove (Favorit Kiki)"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">
                Favorit Risma — &ldquo;1000X&rdquo;
              </p>
              <iframe
                src="https://open.spotify.com/embed/track/6ksyG6PARbZD5j4WTMJ08G"
                width="100%"
                height="152"
                title="Spotify Embed: 1000X (Favorit Risma)"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
        &copy; {new Date().getFullYear()} Kiki &amp; Cimol — Dibuat dengan Next.js + Tailwind
      </footer>
    </div>
  );
}
