import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  Code2,
  ShieldCheck,
  Database,
  Rocket,
  ChevronDown,
} from 'lucide-react';

export default function Landing({ onRegister }) {
  const sceneRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const rotateY = useTransform(smoothX, [-500, 500], [-10, 10]);
  const rotateX = useTransform(smoothY, [-500, 500], [8, -8]);

  const handleMouseMove = (e) => {
    if (!sceneRef.current) return;

    const rect = sceneRef.current.getBoundingClientRect();

    const x =
      e.clientX - (rect.left + rect.width / 2);

    const y =
      e.clientY - (rect.top + rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const features = [
    {
      icon: Code2,
      title: 'Software Development',
    },
    {
      icon: BrainCircuit,
      title: 'AI & Machine Learning',
    },
    {
      icon: ShieldCheck,
      title: 'Cyber Security',
    },
    {
      icon: Database,
      title: 'Data & Analytics',
    },
  ];

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#eaf5ff] font-sans text-[#0b2945]">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.10]
            [background-image:linear-gradient(#2879aa_1px,transparent_1px),linear-gradient(90deg,#2879aa_1px,transparent_1px)]
            [background-size:60px_60px]
            [mask-image:linear-gradient(to_bottom,black,transparent)]
          "
        />

        {/* Glow 1 */}

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            -left-40
            -top-40
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#79c8f4]/30
            blur-[100px]
          "
        />

        {/* Glow 2 */}

        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            -bottom-52
            -right-40
            h-[550px]
            w-[550px]
            rounded-full
            bg-[#b4e3ff]/40
            blur-[110px]
          "
        />

        {/* Cinematic horizontal light */}

        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'linear',
          }}
          className="
            absolute
            top-[35%]
            h-px
            w-[45%]
            bg-gradient-to-r
            from-transparent
            via-white
            to-transparent
            opacity-70
          "
        />

      </div>

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <motion.header
        initial={{
          opacity: 0,
          y: -25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          relative
          z-30
          mx-auto
          flex
          w-full
          max-w-7xl
          items-center
          justify-between
          px-5
          py-5
          sm:px-8
          lg:px-10
        "
      >

        {/* Brand */}

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="flex items-center gap-3"
        >

          <motion.div
            animate={{
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#0b2945]
              text-white
              shadow-[0_10px_25px_rgba(11,41,69,0.25)]
            "
          >
            <Rocket size={20} />
          </motion.div>

          <div>
            <p className="text-sm font-black tracking-tight sm:text-base">
              Cybrom
            </p>

            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-[9px]">
              Technology Pvt. Ltd.
            </p>
          </div>

        </motion.div>

        {/* Register */}

        <motion.button
          onClick={onRegister}
          whileHover={{
            scale: 1.06,
            y: -2,
          }}
          whileTap={{
            scale: 0.94,
          }}
          className="
            group
            relative
            overflow-hidden
            rounded-full
            bg-[#0b2945]
            px-5
            py-2.5
            text-xs
            font-bold
            text-white
            shadow-[0_10px_30px_rgba(11,41,69,0.25)]
            sm:px-7
            sm:py-3
            sm:text-sm
          "
        >

          <motion.span
            animate={{
              x: ['-150%', '180%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="
              absolute
              inset-y-0
              w-1/3
              -skew-x-12
              bg-white/15
            "
          />

          <span className="relative z-10">
            Register Now
          </span>

        </motion.button>

      </motion.header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        ref={sceneRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100dvh-82px)]
          w-full
          max-w-7xl
          items-center
          px-5
          pb-16
          pt-6
          sm:px-8
          lg:px-10
        "
      >

        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-5">

          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div className="relative z-20 text-center lg:text-left">

            {/* Badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.7,
              }}
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white
                bg-white/70
                px-4
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#2080e5]
                shadow-[0_10px_30px_rgba(25,100,150,0.08)]
                backdrop-blur-xl
                sm:text-xs
              "
            >

              <motion.span
                animate={{
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="h-2 w-2 rounded-full bg-[#2080e5]"
              />

              Build. Learn. Become.

            </motion.div>

            {/* Heading */}

            <div className="overflow-hidden">

              <motion.h1
                initial={{
                  y: 100,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.9,
                  type: 'spring',
                  stiffness: 70,
                }}
                className="
                  text-[42px]
                  font-black
                  leading-[0.95]
                  tracking-[-0.05em]
                  text-[#0b2945]
                  sm:text-6xl
                  md:text-7xl
                  lg:text-[76px]
                  xl:text-[88px]
                "
              >
                Shape Your
                <br />

                <span className="relative inline-block text-[#2080e5]">

                  Future.

                  <motion.span
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: '100%',
                    }}
                    transition={{
                      delay: 1.2,
                      duration: 0.8,
                    }}
                    className="
                      absolute
                      -bottom-1
                      left-0
                      h-1
                      rounded-full
                      bg-[#2080e5]
                    "
                  />

                </span>

              </motion.h1>

            </div>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.75,
                duration: 0.7,
              }}
              className="
                mx-auto
                mt-6
                max-w-xl
                text-sm
                leading-6
                text-slate-500
                sm:text-base
                sm:leading-7
                lg:mx-0
              "
            >
              Learn industry-ready skills, build real projects,
              and take your first step towards a powerful career
              with{' '}
              <span className="font-bold text-[#0b2945]">
                Cybrom Technology Pvt. Ltd.
              </span>
            </motion.p>

            {/* CTA */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.95,
              }}
              className="
                mt-8
                flex
                flex-col
                items-center
                gap-3
                sm:flex-row
                lg:justify-start
              "
            >

              <motion.button
                onClick={onRegister}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow:
                    '0 20px 45px rgba(11,41,69,0.28)',
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="
                  group
                  relative
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  overflow-hidden
                  rounded-2xl
                  bg-[#0b2945]
                  px-8
                  py-4
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_12px_30px_rgba(11,41,69,0.2)]
                  sm:w-auto
                  sm:px-9
                "
              >

                <motion.div
                  animate={{
                    x: ['-150%', '180%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="
                    absolute
                    inset-y-0
                    w-1/4
                    -skew-x-12
                    bg-white/15
                  "
                />

                <span className="relative z-10">
                  Start Your Journey
                </span>

                <motion.span
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                  }}
                  className="relative z-10"
                >
                  <ArrowRight size={18} />
                </motion.span>

              </motion.button>

            </motion.div>

            {/* Trust */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1.25,
              }}
              className="
                mt-7
                flex
                items-center
                justify-center
                gap-2
                text-[10px]
                font-medium
                text-slate-400
                lg:justify-start
                sm:text-xs
              "
            >
              <Sparkles size={13} />

              Industry-focused learning experience

            </motion.div>

          </div>

          {/* =================================================
              3D SCENE
          ================================================== */}

          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="
              relative
              mx-auto
              h-[390px]
              w-full
              max-w-[520px]
              sm:h-[480px]
              lg:h-[540px]
            "
          >

            {/* Main Orb */}

            <motion.div
              animate={{
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="
                absolute
                left-1/2
                top-1/2
                h-[250px]
                w-[250px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-white/90
                bg-white/50
                shadow-[inset_-25px_-25px_60px_rgba(32,128,229,0.12),0_35px_80px_rgba(11,41,69,0.14)]
                backdrop-blur-2xl
                sm:h-[320px]
                sm:w-[320px]
                lg:h-[350px]
                lg:w-[350px]
              "
            >

              {/* Orb inner */}

              <motion.div
                animate={{
                  rotateZ: [360, 0],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="
                  absolute
                  inset-8
                  rounded-full
                  border
                  border-[#2080e5]/15
                "
              />

              <motion.div
                animate={{
                  rotateZ: [0, -360],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="
                  absolute
                  inset-14
                  rounded-full
                  border
                  border-dashed
                  border-[#2080e5]/20
                "
              />

              {/* Center */}

              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    '0 0 25px rgba(32,128,229,0.15)',
                    '0 0 60px rgba(32,128,229,0.35)',
                    '0 0 25px rgba(32,128,229,0.15)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  flex
                  h-28
                  w-28
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-[35px]
                  bg-[#0b2945]
                  text-white
                  shadow-[0_20px_50px_rgba(11,41,69,0.25)]
                  sm:h-36
                  sm:w-36
                "
              >

                <div className="text-center">

                  <motion.div
                    animate={{
                      rotateY: [0, 180, 360],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <BrainCircuit
                      className="mx-auto mb-2"
                      size={34}
                    />
                  </motion.div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.18em]">
                    Learn
                  </p>

                  <p className="text-[9px] text-white/50">
                    Create • Grow
                  </p>

                </div>

              </motion.div>

            </motion.div>

            {/* Orbit Cards */}

            {features.map((item, index) => {

              const Icon = item.icon;

              const positions = [
                'left-[0%] top-[18%]',
                'right-[0%] top-[10%]',
                'left-[0%] bottom-[13%]',
                'right-[0%] bottom-[9%]',
              ];

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -12, 0],
                  }}
                  transition={{
                    opacity: {
                      delay: 1.1 + index * 0.15,
                    },
                    scale: {
                      delay: 1.1 + index * 0.15,
                      type: 'spring',
                    },
                    y: {
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                  whileHover={{
                    scale: 1.08,
                    z: 30,
                  }}
                  className={`
                    absolute
                    ${positions[index]}
                    hidden
                    w-[150px]
                    rounded-2xl
                    border
                    border-white
                    bg-white/75
                    p-3
                    shadow-[0_18px_40px_rgba(11,41,69,0.12)]
                    backdrop-blur-xl
                    sm:block
                    sm:w-[170px]
                  `}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >

                  <div className="flex items-center gap-3">

                    <div className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#e8f5ff]
                      text-[#2080e5]
                    ">
                      <Icon size={18} />
                    </div>

                    <p className="text-[10px] font-bold leading-4 text-[#0b2945]">
                      {item.title}
                    </p>

                  </div>

                </motion.div>
              );
            })}

            {/* Floating particles */}

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                animate={{
                  y: [0, -30, 0],
                  x: [0, item % 2 ? 15 : -15, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.7, 1.2, 0.7],
                }}
                transition={{
                  duration: 3 + item,
                  repeat: Infinity,
                  delay: item * 0.3,
                  ease: 'easeInOut',
                }}
                className="absolute h-2 w-2 rounded-full bg-[#2080e5]"
                style={{
                  left: `${10 + item * 13}%`,
                  top: `${10 + (item * 11) % 75}%`,
                }}
              />
            ))}

          </motion.div>

        </div>

      </section>

      {/* Scroll indicator */}

      <motion.div
        animate={{
          y: [0, 8, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-5
          left-1/2
          z-20
          hidden
          -translate-x-1/2
          flex-col
          items-center
          text-slate-400
          md:flex
        "
      >

        <span className="mb-1 text-[9px] uppercase tracking-[0.2em]">
          Explore
        </span>

        <ChevronDown size={16} />

      </motion.div>

    </main>
  );
}