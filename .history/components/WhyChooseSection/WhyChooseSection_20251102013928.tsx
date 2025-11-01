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
            delay: index * 0.15, // Adjusted delay for 2x3 grid
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

      // Animate the image section
      const imageSection = sectionRef.current?.querySelector('.image-section');
      if (imageSection) {
        gsap.from(imageSection, {
          scrollTrigger: {
            trigger: imageSection,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
          opacity: 0,
          x: 100,
          scale: 0.9,
          duration: 1,
        });
      }
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000 order-2 lg:order-1">
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
                  <div className="relative p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-md overflow-hidden">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon container */}
                    <div className="relative mb-4">
                      <div className="feature-icon relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {/* Icon glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-sky-400 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Decorative corner elements */}
                    <div className="absolute -top-1 -right-1 w-16 h-16 bg-gradient-to-br from-emerald-200/20 to-sky-200/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-gradient-to-tr from-sky-200/20 to-indigo-200/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column - Image with Stats */}
          <div className="relative order-1 lg:order-2 image-section">
            {/* Background Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/asm.jpg"
                alt="Skyrider School Campus"
                width={600}
                height={500}
                className="w-full h-96 lg:h-[500px] object-cover"
              />

              {/* Stats Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: "1500+", label: "Students" },
                      { value: "80+", label: "Faculty" },
                      { value: "25+", label: "Years of Excellence" },
                      { value: "95%", label: "Success Rate" },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="text-center"
                      >
                        <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 drop-shadow-lg">
                          {stat.value}
                        </div>
                        <div className="text-emerald-200 font-medium text-sm drop-shadow-md">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-sky-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 h-1 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20" />
      </div>
    </section>
  );
}

export default WhyChooseSection;
