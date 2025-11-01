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
    let rafId: number;
    
    // Handle page load and refresh ScrollTrigger
    const handleLoad = () => {
      rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        console.log("ScrollTrigger refreshed after page load");
      });
    };

    // Handle window resize
    const handleResize = () => {
      rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    // If page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    window.addEventListener("resize", handleResize);

    // Observe layout changes (navbar loading)
    const observer = new MutationObserver(() => {
      rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        console.log("ScrollTrigger refreshed after DOM change");
      });
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !cardsContainerRef.current) return;

      const cards = cardsRef.current.filter(Boolean);
      const cardsContainer = cardsContainerRef.current;
      const totalCards = cards.length;

      console.log("Initializing with cards:", totalCards);

      // Each card gets 100vh of scroll
      const scrollDistance = totalCards * 100;

      // Delay initialization to ensure layout is stable
      const initTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        
        // Pin the section
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}vh`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            console.log("Scroll progress:", self.progress.toFixed(2));
          },
        });

        // Horizontal movement - move the entire container
        gsap.to(cardsContainer, {
          xPercent: -75, // Move 75% to show all 4 cards
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollDistance}vh`,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const xValue = -75 * self.progress;
              console.log("Horizontal scroll:", xValue.toFixed(1) + "%");
            },
          },
        });

        // Animate each card
        cards.forEach((card, index) => {
        if (!card) return;

        const cardProgress = index / totalCards;
        const nextCardProgress = (index + 1) / totalCards;

        // Fade in
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${cardProgress * scrollDistance}vh top`,
              end: `top+=${cardProgress * scrollDistance + 30}vh top`,
              scrub: 1,
            },
          }
        );

        // Fade out
        gsap.to(card, {
          opacity: 0.4,
          scale: 0.95,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${nextCardProgress * scrollDistance - 30}vh top`,
            end: `top+=${nextCardProgress * scrollDistance}vh top`,
            scrub: 1,
          },
        });

        // Icon spin
        const icon = card.querySelector(".program-icon");
        if (icon) {
          gsap.from(icon, {
            rotation: 360,
            scale: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${cardProgress * scrollDistance + 10}vh top`,
              end: `top+=${cardProgress * scrollDistance + 40}vh top`,
              scrub: 1,
            },
          });
        }

        // Features animate
        const features = card.querySelectorAll(".feature-item");
        if (features.length > 0) {
          features.forEach((feature, fIndex) => {
            gsap.from(feature, {
              x: -20,
              opacity: 0,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `top+=${
                  cardProgress * scrollDistance + 20 + fIndex * 2
                }vh top`,
                end: `top+=${
                  cardProgress * scrollDistance + 40 + fIndex * 2
                }vh top`,
                scrub: 1,
              },
            });
          });
        }
      });
      }, 300); // 300ms delay to ensure layout is ready

      return () => {
        clearTimeout(initTimer);
      };
    }, sectionRef);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-100"
    >
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8">
        {/* Left Column - Fixed Content */}
        <div className="flex flex-col justify-center py-20 lg:py-0 relative z-20">
          <div className="max-w-xl">
            {/* Decorative background elements */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-sky-200/20 rounded-full blur-2xl -z-10" />

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold mb-6">
              <GraduationCap size={20} />
              <span>Academic Programs</span>
            </div>

            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-emerald-600 via-sky-600 to-indigo-600"
            >
              Complete Educational Journey
            </h2>

            <p className="text-slate-600 text-lg md:text-xl mb-8 leading-relaxed">
              Scroll to explore our programs from nursery to higher secondary
              education. We provide comprehensive learning pathways in both
              Science and Management streams.
            </p>

            {/* Scroll indicator */}
            <div className="flex items-center gap-3 text-emerald-600">
              <div className="flex flex-col gap-1">
                <div className="w-1 h-8 bg-emerald-600 rounded-full animate-pulse" />
                <div className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse delay-75" />
                <div className="w-1 h-2 bg-emerald-300 rounded-full animate-pulse delay-150" />
              </div>
              <div>
                <div className="font-semibold text-sm">Scroll to explore</div>
                <div className="text-xs text-slate-500">
                  {programs.length} programs to discover
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Horizontal Scrolling Cards */}
        <div
          ref={containerRef}
          className="relative flex items-center overflow-hidden lg:ml-8"
        >
          <div
            ref={cardsContainerRef}
            className="flex items-center h-full will-change-transform"
          >
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={index}
                  className="h-full flex items-center justify-center px-4 shrink-0"
                  style={{ width: "100%", minWidth: "100%" }}
                >
                  <div
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className="relative w-full max-w-lg"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${program.bgGradient} rounded-3xl opacity-20 blur-2xl`}
                      style={{ transform: "translateZ(-50px)" }}
                    />

                    {/* Card content */}
                    <div className="relative p-6 md:p-8 rounded-3xl bg-white/95 backdrop-blur-sm border-2 border-slate-200 shadow-2xl overflow-y-auto max-h-[80vh]">
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-sky-500/5 rounded-3xl pointer-events-none" />

                      {/* Header */}
                      <div className="relative z-10 mb-4">
                        <div className="flex items-center gap-4 mb-3">
                          <div
                            className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-linear-to-br ${program.color} flex items-center justify-center shadow-xl program-icon`}
                          >
                            <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                              {program.level}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                              {program.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                          {program.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="relative z-10">
                        <h4 className="font-bold text-slate-900 text-base md:text-lg mb-3 flex items-center gap-2">
                          <div
                            className={`w-1 h-5 rounded bg-linear-to-b ${program.color}`}
                          />
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {program.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-start gap-2.5 text-slate-700 feature-item"
                            >
                              <div
                                className={`w-5 h-5 rounded-full bg-linear-to-br ${program.color} flex items-center justify-center shrink-0 mt-0.5`}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                              </div>
                              <span className="text-sm leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Progress indicator */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <div className="flex gap-1">
                          {programs.map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 rounded-full transition-all ${
                                i === index
                                  ? "w-6 bg-emerald-600"
                                  : "w-1.5 bg-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div
                        className={`absolute -top-3 -right-3 w-24 h-24 bg-linear-to-br ${program.color} opacity-10 rounded-full blur-2xl`}
                      />
                      <div
                        className={`absolute -bottom-3 -left-3 w-24 h-24 bg-linear-to-tr ${program.color} opacity-10 rounded-full blur-2xl`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AcademicPrograms;
