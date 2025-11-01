"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LucideIcon } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Feature {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

interface WhyChooseSectionProps {
  features: Feature[];
}

export function WhyChooseSection({ features }: WhyChooseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title with split effect
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
          opacity: 0,
          y: 100,
          scale: 0.8,
          duration: 1,
        });
      }

      // Animate subtitle
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: 1,
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
        });
      }

      // Animate cards with stagger and parallax
      cardsRef.current.forEach((card, index) => {
        if (card) {
          // Card entrance animation
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
            opacity: 0,
            y: 100,
            rotationX: -15,
            scale: 0.8,
            duration: 1,
            delay: index * 0.1,
          });

          // Parallax effect on scroll
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
            y: -30,
            ease: "none",
          });

          // Icon rotation on scroll
          const icon = card.querySelector(".feature-icon");
          if (icon) {
            gsap.to(icon, {
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 30%",
                scrub: 2,
              },
              rotation: 360,
              ease: "none",
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (index: number, isHovering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    if (isHovering) {
      gsap.to(card, {
        scale: 1.05,
        y: -10,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });

      const icon = card.querySelector(".feature-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1.2,
          rotation: "+=15",
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      }

      const bg = card.querySelector(".card-bg");
      if (bg) {
        gsap.to(bg, {
          opacity: 1,
          scale: 1.1,
          duration: 0.3,
        });
      }
    } else {
      gsap.to(card, {
        scale: 1,
        y: 0,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        duration: 0.3,
        ease: "power2.out",
      });

      const icon = card.querySelector(".feature-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      const bg = card.querySelector(".card-bg");
      if (bg) {
        gsap.to(bg, {
          opacity: 0,
          scale: 1,
          duration: 0.3,
        });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl -z-10" />
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-sky-200/20 rounded-full blur-2xl -z-10" />
          <div className="absolute top-10 right-1/4 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl -z-10" />

          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-sky-600 to-indigo-600"
          >
            Why Choose Skyrider School?
          </h2>
          <p
            ref={subtitleRef}
            className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto"
          >
            A legacy of academic excellence combined with modern facilities and
            holistic development
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="relative group cursor-pointer"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Gradient background (hidden by default, shown on hover) */}
                <div
                  className="card-bg absolute inset-0 bg-gradient-to-br from-emerald-50 via-sky-50 to-indigo-50 rounded-3xl opacity-0 -z-10 blur-xl"
                  style={{ transform: "translateZ(-50px)" }}
                />

                {/* Card content */}
                <div className="relative p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-md overflow-hidden">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon container */}
                  <div className="relative mb-6">
                    <div className="feature-icon relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-sky-400 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative corner elements */}
                  <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-emerald-200/20 to-sky-200/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-gradient-to-tr from-sky-200/20 to-indigo-200/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom wave decoration */}
        <div className="mt-20 relative">
          <svg
            className="w-full h-16 text-slate-800"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="fill-current"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="fill-current"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-current"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;
