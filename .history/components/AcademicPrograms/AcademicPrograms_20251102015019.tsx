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
} from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AcademicPrograms() {
  const sectionRef = useRef<HTMLElement>(null);
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
      // Title with morphing effect
      if (titleRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 2,
          },
        });

        tl.from(titleRef.current, {
          opacity: 0,
          scale: 0.5,
          rotationZ: -45,
          filter: "blur(20px)",
          duration: 1.5,
        }).to(titleRef.current, {
          scale: 1.05,
          duration: 0.3,
        }).to(titleRef.current, {
          scale: 1,
          duration: 0.3,
        });
      }

      // Cards with wave entrance effect
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const row = Math.floor(index / 2);
          const col = index % 2;
          
          // Create a wave-like entrance
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 40%",
              scrub: 2,
            },
          });

          // Initial state
          gsap.set(card, {
            opacity: 0,
            z: -200,
            rotationX: 90,
          });

          // Wave animation
          tl.to(card, {
            opacity: 1,
            z: 0,
            rotationX: 0,
            duration: 1,
            ease: "power4.out",
            delay: (row * 0.2) + (col * 0.15),
          });

          // Magnetic parallax - cards move towards center on scroll
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 4,
            },
            x: col === 0 ? 15 : -15,
            y: -50,
            rotationZ: col === 0 ? 3 : -3,
            ease: "none",
          });

          // Pulsating glow effect
          gsap.to(card, {
            filter: "brightness(1.1)",
            duration: 2 + (index * 0.3),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (index: number, isHovering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    if (isHovering) {
      // Stop the pulsating animation
      gsap.killTweensOf(card);
      
      // Create morphing effect
      const tl = gsap.timeline();
      
      tl.to(card, {
        scale: 1.12,
        rotationY: 15,
        z: 100,
        boxShadow: "0 40px 80px rgba(16, 185, 129, 0.3), 0 0 80px rgba(14, 165, 233, 0.2)",
        duration: 0.5,
        ease: "expo.out",
      });

      // Icon explosion effect
      const icon = card.querySelector(".program-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1.5,
          rotation: 360,
          boxShadow: "0 0 40px rgba(16, 185, 129, 0.8)",
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      }

      // Ripple background effect
      const bg = card.querySelector(".card-bg-gradient");
      if (bg) {
        gsap.to(bg, {
          opacity: 1,
          scale: 1.5,
          rotation: 45,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // Animate feature bullets
      const bullets = card.querySelectorAll(".feature-bullet");
      bullets.forEach((bullet, i) => {
        gsap.to(bullet, {
          scale: 1.5,
          x: 5,
          duration: 0.3,
          delay: i * 0.05,
          ease: "back.out(2)",
        });
      });

    } else {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        z: 0,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        filter: "brightness(1)",
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Restart pulsating effect
          gsap.to(card, {
            filter: "brightness(1.1)",
            duration: 2 + (index * 0.3),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      });

      const icon = card.querySelector(".program-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          boxShadow: "none",
          duration: 0.4,
          ease: "power2.out",
        });
      }

      const bg = card.querySelector(".card-bg-gradient");
      if (bg) {
        gsap.to(bg, {
          opacity: 0,
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      const bullets = card.querySelectorAll(".feature-bullet");
      bullets.forEach((bullet) => {
        gsap.to(bullet, {
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 via-white to-slate-100"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -z-10" />
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -z-10" />
          <div className="absolute top-10 right-1/4 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl -z-10" />

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
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto">
            From nursery to higher secondary education, we provide comprehensive
            learning pathways in both Science and Management streams.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="relative group cursor-pointer"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Background gradient with unique pattern */}
                <div
                  className="card-bg-gradient absolute inset-0 rounded-3xl opacity-0 blur-2xl"
                  style={{ 
                    transform: "translateZ(-50px)",
                    background: `linear-gradient(135deg, ${program.color.includes('yellow') ? '#fbbf24' : program.color.includes('blue') ? '#3b82f6' : program.color.includes('green') ? '#10b981' : '#a855f7'} 0%, ${program.color.includes('yellow') ? '#f97316' : program.color.includes('blue') ? '#6366f1' : program.color.includes('green') ? '#059669' : '#ec4899'} 100%)`
                  }}
                />

                {/* Card content with glassmorphism */}
                <div className="relative p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-300/50 shadow-xl overflow-hidden">
                  {/* Dynamic mesh gradient overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                                   radial-gradient(circle at 80% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
                                   radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 70%)`
                    }}
                  />

                  {/* Header with animated icon */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`program-icon w-16 h-16 rounded-2xl bg-linear-to-br ${program.color} flex items-center justify-center shadow-2xl relative overflow-hidden`}
                      >
                        {/* Icon shine effect */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Icon className="w-8 h-8 text-white relative z-10" />
                        {/* Orbiting particles */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute w-1 h-1 bg-white rounded-full top-2 left-2 animate-ping" />
                          <div className="absolute w-1 h-1 bg-white rounded-full bottom-2 right-2 animate-ping" style={{ animationDelay: '0.3s' }} />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                          {program.level}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {program.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="relative z-10 mb-6">
                    <p className="text-slate-600 leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="relative z-10">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${program.color}`}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-32 h-32 bg-linear-to-br from-emerald-200/20 to-sky-200/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-linear-to-tr from-sky-200/20 to-indigo-200/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Career Guidance Section */}
        <div className="bg-linear-to-r from-emerald-600 to-sky-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8" />
                <h3 className="text-2xl md:text-3xl font-bold">
                  Career Guidance
                </h3>
              </div>
              <p className="text-emerald-100 text-lg mb-6">
                Our dedicated career counseling helps students make informed
                choices about their academic streams and future career paths.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">STEM Careers</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Business & Management</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-1">95%</div>
                  <div className="text-sm text-emerald-200">
                    Higher Education
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-1">85%</div>
                  <div className="text-sm text-emerald-200">
                    Career Placement
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AcademicPrograms;
