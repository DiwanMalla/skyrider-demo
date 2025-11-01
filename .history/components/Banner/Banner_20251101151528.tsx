"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
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
import "swiper/css/parallax";

type Img = {
  src: string;
  alt?: string;
};

type BannerProps = {
  onSlideChange?: (index: number) => void;
};

export function Banner({ onSlideChange }: BannerProps) {
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
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 2px solid rgba(16, 185, 129, 0.3);
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .banner-swiper .swiper-button-next:hover,
        .banner-swiper .swiper-button-prev:hover {
          background: white;
          border-color: rgba(16, 185, 129, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.2);
        }

        .banner-swiper .swiper-button-next::after,
        .banner-swiper .swiper-button-prev::after {
          font-size: 20px;
          color: #10b981;
          font-weight: 900;
        }

        .banner-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .banner-swiper .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 5px;
          background: white;
          box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          .banner-swiper .swiper-button-next,
          .banner-swiper .swiper-button-prev {
            width: 40px;
            height: 40px;
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
        navigation={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          enabled: true,
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
        allowTouchMove={true}
        touchRatio={1}
        touchAngle={45}
        threshold={10}
        simulateTouch={true}
        onSlideChange={(swiper) => {
          if (onSlideChange) {
            onSlideChange(swiper.realIndex);
          }
        }}
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
              {/* Very light overlay to preserve image visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/15" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
