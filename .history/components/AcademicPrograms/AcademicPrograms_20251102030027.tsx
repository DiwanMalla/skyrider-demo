"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  BookOpen,
  Users,
  Microscope,
  Calculator,
  Award,
  Target,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AcademicPrograms() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
      bgColor: "bg-yellow-50",
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
      bgColor: "bg-blue-50",
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
      bgColor: "bg-green-50",
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
      bgColor: "bg-purple-50",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Horizontal scroll animation
      if (scrollContainerRef.current && cardsRef.current.length > 0) {
        const scrollContainer = scrollContainerRef.current;
        const cards = cardsRef.current.filter((card) => card !== null);

        // Calculate total scroll width
        const getScrollAmount = () => {
          const containerWidth = scrollContainer.scrollWidth;
          return -(containerWidth - window.innerWidth);
        };

        // Create horizontal scroll
        const horizontalScroll = gsap.to(scrollContainer, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollContainer.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Individual card animations
        cards.forEach((card, index) => {
          if (card) {
            // Card entrance animation
            gsap.from(card, {
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: "left 80%",
                end: "left 20%",
                toggleActions: "play none none reverse",
              },
              opacity: 0,
              scale: 0.8,
              y: 100,
              rotation: index % 2 === 0 ? -15 : 15,
              duration: 1,
              ease: "power3.out",
            });

            // Continuous floating animation
            gsap.to(card, {
              y: "+=20",
              duration: 2 + index * 0.3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });

            // Icon rotation
            const icon = card.querySelector(".program-icon");
            if (icon) {
              gsap.to(icon, {
                rotation: 360,
                duration: 20,
                ease: "none",
                repeat: -1,
              });
            }
          }
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
        y: -20,
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
        duration: 0.4,
        ease: "power2.out",
      });

      const icon = card.querySelector(".program-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1.2,
          duration: 0.4,
          ease: "back.out(2)",
        });
      }
    } else {
      gsap.to(card, {
        scale: 1,
        y: 0,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        duration: 0.4,
        ease: "power2.out",
      });

      const icon = card.querySelector(".program-icon");
      if (icon) {
        gsap.to(icon, {
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
      className="relative py-20 bg-linear-to-b from-white via-slate-50 to-white overflow-hidden"
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -z-10" />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold mb-4">
            <GraduationCap size={20} />
            <span>Academic Programs</span>
          </div>

          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-emerald-600 via-sky-600 to-indigo-600"
          >
            Complete Educational Journey
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto mb-6">
            From nursery to higher secondary education, we provide comprehensive
            learning pathways in both Science and Management streams.
          </p>

          {/* Scroll indicator */}
          <div className="flex items-center justify-center gap-2 text-emerald-600 animate-pulse">
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowRight size={20} />
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Cards Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-8 px-4 sm:px-6 lg:px-8 will-change-transform"
          style={{ width: "max-content" }}
        >
          {/* Spacer for starting position */}
          <div className="w-[calc(50vw-300px)] shrink-0" />

          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="relative group cursor-pointer shrink-0 w-[450px]"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Card */}
                <div className="relative h-[600px] rounded-3xl bg-white border-2 border-slate-200 shadow-xl overflow-hidden">
                  {/* Gradient background overlay */}
                  <div
                    className={`absolute inset-0 ${program.bgColor} opacity-30`}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={`program-icon w-20 h-20 rounded-3xl bg-linear-to-br ${program.color} flex items-center justify-center shadow-2xl`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Level badge */}
                    <div className="inline-flex self-start px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-wide mb-4">
                      {program.level}
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      {program.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {program.description}
                    </p>

                    {/* Features */}
                    <div className="grow">
                      <h4 className="font-semibold text-slate-900 mb-4 text-lg">
                        Key Features:
                      </h4>
                      <ul className="space-y-3">
                        {program.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-3 text-slate-700"
                          >
                            <div
                              className={`w-2 h-2 rounded-full bg-linear-to-r ${program.color} mt-2 shrink-0`}
                            />
                            <span className="text-sm leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Decorative corner accents */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-white/50 to-transparent rounded-bl-full" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-white/50 to-transparent rounded-tr-full" />
                  </div>

                  {/* Hover glow effect */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                </div>

                {/* Card number indicator */}
                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-linear-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                  {index + 1}
                </div>
              </div>
            );
          })}

          {/* Career Guidance Card at the end */}
          <div className="shrink-0 w-[500px] h-[600px]">
            <div className="relative h-full rounded-3xl bg-linear-to-br from-emerald-600 to-sky-600 p-8 md:p-12 text-white shadow-2xl overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-12 h-12" />
                    <h3 className="text-3xl md:text-4xl font-bold">
                      Career Guidance
                    </h3>
                  </div>
                  <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                    Our dedicated career counseling helps students make informed
                    choices about their academic streams and future career paths.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
                      <Award className="w-5 h-5" />
                      <span className="text-sm font-medium">STEM Careers</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
                      <Users className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Business & Management
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="text-4xl font-bold mb-2">95%</div>
                      <div className="text-sm text-emerald-200">
                        Higher Education
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="text-4xl font-bold mb-2">85%</div>
                      <div className="text-sm text-emerald-200">
                        Career Placement
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>

          {/* Spacer for ending position */}
          <div className="w-[calc(50vw-300px)] shrink-0" />
        </div>
      </div>
    </section>
  );
}

export default AcademicPrograms;
