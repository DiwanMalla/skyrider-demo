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
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9));
          backdrop-filter: blur(12px);
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
        }

        .banner-swiper .swiper-button-next:hover,
        .banner-swiper .swiper-button-prev:hover {
          background: linear-gradient(135deg, rgba(16, 185, 129, 1), rgba(5, 150, 105, 1));
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 12px 40px rgba(16, 185, 129, 0.4);
        }

        .banner-swiper .swiper-button-next::after,
        .banner-swiper .swiper-button-prev::after {
          font-size: 22px;
          color: white;
          font-weight: bold;
        }

        .banner-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
          transition: all 0.4s ease;
          z-index: 10;
          border: 2px solid transparent;
        }

        .banner-swiper .swiper-pagination-bullet-active {
          width: 36px;
          border-radius: 6px;
          background: linear-gradient(90deg, rgba(16, 185, 129, 1), rgba(14, 165, 233, 1));
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.5);
        }

        @media (max-width: 768px) {
          .banner-swiper .swiper-button-next,
          .banner-swiper .swiper-button-prev {
            width: 44px;
            height: 44px;
            border-radius: 10px;
          }

          .banner-swiper .swiper-button-next::after,
          .banner-swiper .swiper-button-prev::after {
            font-size: 18px;
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
