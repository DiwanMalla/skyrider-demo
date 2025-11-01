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
        const imgs = names.map((n) => ({ src: `/images/home/${n}`, alt: `Banner ${n}` }));
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
    <div className="w-full h-full relative bg-slate-900">
      <div className="sr-only" aria-live="polite">
        {images.length > 0 && `Slide ${index + 1} of ${images.length}`}
      </div>

      <div className="w-full h-full relative">
        <AnimatePresence initial={false} mode="wait">
          {images[index] && (
            <motion.div
              key={images[index].src}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
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
        <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12">
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="p-3 md:p-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm shadow-lg transition-all hover:scale-110"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="p-3 md:p-4 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm shadow-lg transition-all hover:scale-110"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`transition-all ${
                i === index 
                  ? "w-8 md:w-10 h-2 md:h-2.5 bg-white rounded-full" 
                  : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/50 hover:bg-white/75 rounded-full"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Banner;
