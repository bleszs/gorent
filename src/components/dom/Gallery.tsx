"use client";

/* eslint-disable @next/next/no-img-element -- placeholder Unsplash images butuh <img> mentah agar bebas berperilaku masonry */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface Shot {
  id: string; // Unsplash photo id (mudah ditukar bila 404)
  alt: string;
  ratio: string; // aspect ratio Tailwind → variasi tinggi masonry
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

const SHOTS: Shot[] = [
  { id: "1503376780353-7e6692767b70", alt: "Luxury sports car", ratio: "aspect-[3/4]" },
  { id: "1449965408869-eaa3f722e40d", alt: "Sport motorcycle", ratio: "aspect-square" },
  { id: "1552519507-da3b142c6e3d", alt: "Yellow supercar", ratio: "aspect-[4/5]" },
  { id: "1494976388531-d1058494cdd8", alt: "Classic muscle car", ratio: "aspect-[3/4]" },
  { id: "1568605117036-5fe5e7bab0b7", alt: "Modern car on road", ratio: "aspect-square" },
  { id: "1583121274602-3e2820c69888", alt: "Exotic supercar", ratio: "aspect-[4/5]" },
  { id: "1502877338535-766e1452684a", alt: "Rider on the road", ratio: "aspect-[3/4]" },
  { id: "1568772585407-9361f9bf3a87", alt: "Premium car detail", ratio: "aspect-square" },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax tipis per gambar (kecepatan sedikit berbeda saat scroll)
      const items = gsap.utils.toArray<HTMLElement>(".gallery-media");
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.from(".gallery-heading", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-7xl px-6 md:px-10">
      <header className="gallery-heading mb-16 max-w-2xl">
        <p className="mb-4 font-ui text-sm uppercase tracking-[0.3em] text-luxury-gold">
          Gallery
        </p>
        <h2 className="font-display text-5xl font-bold tracking-tighter md:text-7xl">
          Moments in motion
        </h2>
      </header>

      {/* Masonry via CSS columns */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {SHOTS.map((shot) => (
          <figure
            key={shot.id}
            className="group relative w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10"
          >
            <div className={`${shot.ratio} w-full overflow-hidden`}>
              <img
                src={unsplash(shot.id)}
                alt={shot.alt}
                loading="lazy"
                className="gallery-media h-[116%] w-full scale-105 object-cover transition-transform duration-700 ease-out group-hover:scale-125"
              />
            </div>
            {/* Overlay gradient halus + caption saat hover */}
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 bg-gradient-to-t from-black/70 to-transparent p-5 font-ui text-sm text-white/80 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              {shot.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
