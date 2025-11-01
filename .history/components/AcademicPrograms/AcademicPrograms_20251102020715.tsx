"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  BookOpen,
  Microscope,
  Calculator,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AcademicPrograms() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const programs = [
    {
      level: "Nursery to Grade 5",
      title: "Foundation Years",
      description:
        "Building strong fundamentals with play-based learning, creativity, and social skills development.",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500",
      features: [
        "Play-based learning approach",
        "Creative arts and music",
        "Basic literacy and numeracy",
        "Social skills development",
        "Physical education and sports",
      ],
      bgGradient: "from-yellow-50 to-orange-50",
    },
    {
      level: "Grade 6 to 10",
      title: "Middle & Secondary School",
      description:
        "Comprehensive education preparing students for higher secondary and future careers.",
      icon: BookOpen,
      color: "from-blue-500 to-indigo-500",
      features: [
        "Core subjects: English, Mathematics, Science, Social Studies",
        "Computer Science and Technology",
        "Environmental Studies",
        "Art, Music, and Physical Education",
        "Life skills and career guidance",
      ],
      bgGradient: "from-blue-50 to-indigo-50",
    },
    {
      level: "Grade 11-12 (Science)",
      title: "Science Stream",
      description:
        "Rigorous science education preparing students for STEM careers and higher education.",
      icon: Microscope,
      color: "from-green-500 to-emerald-500",
      features: [
        "Physics, Chemistry, Biology, Mathematics",
        "Computer Science and Programming",
        "Practical laboratory work",
        "Research methodology",
        "STEM project work",
      ],
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      level: "Grade 11-12 (Management)",
      title: "Management Stream",
      description:
        "Business and management education preparing students for commerce and entrepreneurship.",
      icon: Calculator,
      color: "from-purple-500 to-pink-500",
      features: [
        "Business Studies and Accounting",
        "Economics and Statistics",
        "Mathematics and Computer Applications",
        "Entrepreneurship and Business Ethics",
        "Project-based learning",
      ],
      bgGradient: "from-purple-50 to-pink-50",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !cardsContainerRef.current) return;

      const cards = cardsRef.current.filter(Boolean);
      const cardsContainer = cardsContainerRef.current;

      // Pin the section and create horizontal scroll
      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${cards.length * 100}%`, // Extended scroll for all cards
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      });

      // Animate title fade in
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        scale: 0.9,
      });

      // Horizontal slide animation for cards
      const totalWidth = cards.length * 100; // Each card takes 100% viewport width

      gsap.to(cardsContainer, {
        x: () => -totalWidth + "vw",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${cards.length * 100}%`,
          scrub: 1,
        },
      });

      // Individual card animations as they come into view
      cards.forEach((card, index) => {
        // Fade in and scale up
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.8,
            rotationY: -30,
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${index * 25}% top`,
              end: `top+=${index * 25 + 15}% top`,
              scrub: 1,
            },
          }
        );

        // Fade out as it exits
        gsap.to(card, {
          opacity: 0,
          scale: 0.8,
          rotationY: 30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${index * 25 + 75}% top`,
            end: `top+=${index * 25 + 90}% top`,
            scrub: 1,
          },
        });

        // Icon rotation animation
        const icon = card.querySelector(".program-icon");
        if (icon) {
          gsap.from(icon, {
            rotation: -180,
            scale: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${index * 25 + 5}% top`,
              end: `top+=${index * 25 + 15}% top`,
              scrub: 1,
            },
          });
        }

        // Features stagger animation
        const features = card.querySelectorAll(".feature-item");
        gsap.from(features, {
          x: -50,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${index * 25 + 10}% top`,
            end: `top+=${index * 25 + 20}% top`,
            scrub: 1,
          },
        });
      });

      return () => {
        scrollTrigger.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (index: number, isHovering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    if (isHovering) {
      gsap.to(card, {
        scale: 1.08,
        y: -20,
        skewX: index % 2 === 0 ? 2 : -2,
        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)",
        duration: 0.4,
        ease: "power3.out",
      });

      // Add a bounce effect to the icon
      const icon = card.querySelector(".program-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1.3,
          rotation: 15,
          duration: 0.4,
          ease: "back.out(2.5)",
        });
      }

      // Animate the background gradient
      const bg = card.querySelector(".card-bg-gradient");
      if (bg) {
        gsap.to(bg, {
          opacity: 0.8,
          scale: 1.2,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    } else {
      gsap.to(card, {
        scale: 1,
        y: 0,
        skewX: 0,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        duration: 0.4,
        ease: "power3.out",
      });

      const icon = card.querySelector(".program-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      const bg = card.querySelector(".card-bg-gradient");
      if (bg) {
        gsap.to(bg, {
          opacity: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-100"
    >
      {/* Fixed Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -z-10" />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold mb-4">
            <GraduationCap size={20} />
            <span>Academic Programs</span>
          </div>

          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-emerald-600 via-sky-600 to-indigo-600"
          >
            Complete Educational Journey
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto mb-8">
            Scroll to explore our programs from nursery to higher secondary education
          </p>

          {/* Scroll indicator */}
          <div className="flex items-center justify-center gap-2 text-emerald-600 animate-pulse">
            <span className="text-sm font-semibold">Scroll to explore</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center overflow-hidden"
      >
        <div
          ref={cardsContainerRef}
          className="flex items-center h-full"
          style={{ width: `${programs.length * 100}vw` }}
        >
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className="w-screen h-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
              >
                <div
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="relative max-w-2xl w-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${program.bgGradient} rounded-3xl opacity-20 blur-2xl`}
                    style={{ transform: "translateZ(-50px)" }}
                  />

                  {/* Card content */}
                  <div className="relative p-8 md:p-12 rounded-3xl bg-white/90 backdrop-blur-sm border-2 border-slate-200 shadow-2xl">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-sky-500/5 rounded-3xl" />

                    {/* Header */}
                    <div className="relative z-10 mb-8">
                      <div className="flex items-center gap-6 mb-6">
                        <div
                          className={`w-20 h-20 rounded-3xl bg-linear-to-br ${program.color} flex items-center justify-center shadow-xl program-icon`}
                        >
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">
                            {program.level}
                          </div>
                          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                            {program.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 text-lg leading-relaxed mb-6">
                        {program.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="relative z-10">
                      <h4 className="font-bold text-slate-900 text-xl mb-4 flex items-center gap-2">
                        <div
                          className={`w-1 h-6 rounded bg-linear-to-b ${program.color}`}
                        />
                        Key Features
                      </h4>
                      <ul className="space-y-3">
                        {program.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-3 text-slate-700 feature-item"
                          >
                            <div
                              className={`w-6 h-6 rounded-full bg-linear-to-br ${program.color} flex items-center justify-center shrink-0 mt-0.5`}
                            >
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                            <span className="text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Progress indicator */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <div className="text-xs font-semibold text-slate-400">
                        {index + 1} / {programs.length}
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div
                      className={`absolute -top-4 -right-4 w-32 h-32 bg-linear-to-br ${program.color} opacity-10 rounded-full blur-2xl`}
                    />
                    <div
                      className={`absolute -bottom-4 -left-4 w-32 h-32 bg-linear-to-tr ${program.color} opacity-10 rounded-full blur-2xl`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AcademicPrograms;
