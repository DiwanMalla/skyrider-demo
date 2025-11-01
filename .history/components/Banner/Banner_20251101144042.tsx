"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Img = {
  src: string;
  alt?: string;
};

export function Banner() {
  const [images, setImages] = useState<Img[]>([]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    // fetch list of images from API
    fetch("/api/home-images")
      .then((r) => r.json())
      .then((names: string[]) => {
        if (!isMounted.current) return;
        const imgs = names.map((n) => ({ src: `/home/${n}`, alt: `Banner ${n}` }));
        setImages(imgs);
      })
      .catch(() => {
        /* ignore */
      });

    return () => {
      isMounted.current = false;
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    // auto slide every 5s
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [images]);

  function prev() {
    if (images.length <= 1) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  }

  function next() {
    if (images.length <= 1) return;
    setIndex((i) => (i + 1) % images.length);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  }

  return (
    <div className="w-full rounded-xl overflow-hidden relative bg-slate-100">
      <div className="sr-only" aria-live="polite">
        {images.length > 0 && `Slide ${index + 1} of ${images.length}`}
      </div>

      <div className="aspect-[16/9] w-full relative">
        <AnimatePresence initial={false} mode="wait">
          {images[index] && (
            <motion.div
              key={images[index].src}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={images[index].src}
                alt={images[index].alt || "Banner image"}
                fill
                sizes="100vw"
                className="object-cover w-full h-full"
                priority={index === 0}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      {images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="p-2 rounded-full bg-white/70 hover:bg-white shadow"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="p-2 rounded-full bg-white/70 hover:bg-white shadow"
          >
            ›
          </button>
        </div>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-emerald-600" : "bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Banner;
