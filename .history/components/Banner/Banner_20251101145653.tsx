"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  Parallax,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

type Img = {
  src: string;
  alt?: string;
};

export function Banner() {
  const [images, setImages] = useState<Img[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch list of images from API
    fetch("/api/home-images")
      .then((r) => r.json())
      .then((names: string[]) => {
        const imgs = names.map((n) => ({
          src: `/images/home/${n}`,
          alt: `Skyrider High School - ${n.replace(
            /\.(jpg|jpeg|png|webp|avif|gif)$/i,
            ""
          )}`,
        }));
        setImages(imgs);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full bg-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
        <p className="text-white/60">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-slate-900">
      <style jsx global>{`
        .banner-swiper {
          width: 100%;
          height: 100%;
        }

        .banner-swiper .swiper-button-next,
        .banner-swiper .swiper-button-prev {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border-radius: 50%;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .banner-swiper .swiper-button-next:hover,
        .banner-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.1);
        }

        .banner-swiper .swiper-button-next::after,
        .banner-swiper .swiper-button-prev::after {
          font-size: 20px;
          color: white;
          font-weight: bold;
        }

        .banner-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .banner-swiper .swiper-pagination-bullet-active {
          width: 40px;
          border-radius: 6px;
          background: white;
        }

        @media (max-width: 768px) {
          .banner-swiper .swiper-button-next,
          .banner-swiper .swiper-button-prev {
            width: 36px;
            height: 36px;
          }

          .banner-swiper .swiper-button-next::after,
          .banner-swiper .swiper-button-prev::after {
            font-size: 16px;
          }
        }
      `}</style>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={images.length > 1}
        className="banner-swiper"
        parallax={true}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <Image
                src={img.src}
                alt={img.alt || "Banner image"}
                fill
                sizes="100vw"
                className="object-cover"
                priority={idx === 0}
                quality={90}
              />
              {/* Lighter overlay for better image visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/25" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
