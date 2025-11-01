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

      // Calculate total horizontal scroll distance
      const totalCards = cards.length;
      const scrollDistance = totalCards * 100; // 100vh per card

      // Pin the section and create horizontal scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${scrollDistance}vh`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      });

      // Horizontal slide animation for cards container
      gsap.to(cardsContainer, {
        x: () => -(totalCards - 1) * 100 + "%", // Move left through all cards
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}vh`,
          scrub: 1,
        },
      });

      // Individual card animations
      cards.forEach((card, index) => {
        if (!card) return;

        const startProgress = (index / totalCards) * 100;
        const endProgress = ((index + 1) / totalCards) * 100;

        // Fade in and scale
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.85,
            rotationY: 20,
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${startProgress * 0.3}% top`,
              end: `top+=${startProgress * 0.6}% top`,
              scrub: 1,
            },
          }
        );

        // Fade out
        gsap.to(card, {
          opacity: 0.3,
          scale: 0.9,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${endProgress * 0.7}% top`,
            end: `top+=${endProgress * 0.9}% top`,
            scrub: 1,
          },
        });

        // Icon animation
        const icon = card.querySelector(".program-icon");
        if (icon) {
          gsap.from(icon, {
            rotation: -360,
            scale: 0,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${startProgress * 0.4}% top`,
              end: `top+=${startProgress * 0.7}% top`,
              scrub: 1,
            },
          });
        }

        // Features stagger
        const features = card.querySelectorAll(".feature-item");
        if (features.length > 0) {
          gsap.from(features, {
            x: -30,
            opacity: 0,
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${startProgress * 0.5}% top`,
              end: `top+=${startProgress * 0.8}% top`,
              scrub: 1,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
