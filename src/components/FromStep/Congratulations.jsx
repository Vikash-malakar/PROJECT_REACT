import React, { useEffect, useState } from 'react';

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

import {
  Check,
  Sparkles,
  GraduationCap,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Congratulations({ formData }) {
  const [showContent, setShowContent] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-500, 500], [5, -5]),
    {
      stiffness: 100,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-500, 500], [-6, 6]),
    {
      stiffness: 100,
      damping: 20,
    }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  const particles = Array.from({ length: 22 });

  return (
    <div
      onMouseMove={handleMouseMove}
      className="
        relative
        min-h-[100dvh]
        w-full
        overflow-hidden
        bg-[#e9edf2]
        font-sans
        perspective-[1800px]
      "
    >

      {/* ================================================= */}
      {/* BACKGROUND GRID */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.12]
          [background-image:linear-gradient(#64748b_1px,transparent_1px),linear-gradient(90deg,#64748b_1px,transparent_1px)]
          [background-size:60px_60px]
          [transform:perspective(700px)_rotateX(65deg)_scale(1.6)]
          [transform-origin:center_bottom]
        "
      />

      {/* ================================================= */}
      {/* BACKGROUND GLOW */}
      {/* ================================================= */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white
          blur-[100px]
        "
      />

      {/* ================================================= */}
      {/* 3D ORB LEFT */}
      {/* ================================================= */}

      <motion.div
        animate={{
          y: [-30, 30, -30],
          rotateX: [0, 360],
          rotateY: [0, 180],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="
          pointer-events-none
          absolute
          -left-28
          top-12
          hidden
          h-64
          w-64
          rounded-full
          bg-gradient-to-br
          from-white
          via-slate-200
          to-slate-500
          opacity-60
          shadow-[inset_-30px_-30px_60px_rgba(15,23,42,0.2),20px_30px_70px_rgba(15,23,42,0.12)]
          md:block
          lg:h-80
          lg:w-80
        "
      />

      {/* ================================================= */}
      {/* 3D ORB RIGHT */}
      {/* ================================================= */}

      <motion.div
        animate={{
          y: [30, -30, 30],
          rotateY: [0, 360],
          rotateX: [0, 180],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="
          pointer-events-none
          absolute
          -right-28
          bottom-0
          hidden
          h-72
          w-72
          rounded-full
          bg-gradient-to-br
          from-white
          via-slate-300
          to-slate-500
          opacity-40
          shadow-[inset_30px_30px_70px_rgba(255,255,255,0.8)]
          md:block
          lg:h-96
          lg:w-96
        "
      />

      {/* ================================================= */}
      {/* PARTICLES */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute inset-0">

        {particles.map((_, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0.5],
              y: [30, -100 - index * 4, -180],
              x: [
                0,
                (index % 2 === 0 ? 1 : -1) *
                  (20 + (index % 5) * 20),
              ],
            }}
            transition={{
              duration: 3 + (index % 4),
              delay: index * 0.12,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="
              absolute
              left-1/2
              top-1/2
              h-2
              w-2
              rounded-full
              bg-slate-700
            "
          />
        ))}

      </div>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-4 py-8 sm:px-6">

        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 60,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            type: 'spring',
            stiffness: 80,
            damping: 16,
          }}
          className="
            relative
            w-full
            max-w-[760px]
          "
        >

          {/* CARD SHADOW */}

          <div
            className="
              pointer-events-none
              absolute
              inset-5
              rounded-[45px]
              bg-slate-900/20
              blur-3xl
            "
          />

          {/* ================================================= */}
          {/* MAIN GLASS CARD */}
          {/* ================================================= */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/90
              bg-white/75
              shadow-[0_35px_100px_rgba(15,23,42,0.18)]
              backdrop-blur-3xl
              sm:rounded-[40px]
            "
            style={{
              transformStyle: 'preserve-3d',
            }}
          >

            {/* MOVING LIGHT */}

            <motion.div
              animate={{
                x: ['-150%', '250%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'easeInOut',
              }}
              className="
                pointer-events-none
                absolute
                inset-y-0
                left-0
                z-20
                h-full
                w-1/3
                -skew-x-[25deg]
                bg-gradient-to-r
                from-transparent
                via-white/50
                to-transparent
              "
            />

            <div className="relative px-5 py-10 sm:px-10 sm:py-14 md:px-16">

              {/* ================================================= */}
              {/* SUCCESS ICON */}
              {/* ================================================= */}

              <motion.div
                initial={{
                  scale: 0,
                  rotate: -180,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.9,
                  type: 'spring',
                  stiffness: 120,
                  damping: 12,
                }}
                className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >

                {/* OUTER RING */}

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="
                    absolute
                    inset-0
                    rounded-full
                    border
                    border-dashed
                    border-slate-400
                  "
                />

                {/* GLOW */}

                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                    absolute
                    inset-2
                    rounded-full
                    bg-slate-900
                    blur-xl
                  "
                />

                {/* ICON CIRCLE */}

                <motion.div
                  animate={{
                    rotateY: [0, 180, 360],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="
                    absolute
                    inset-4
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-900
                    text-white
                    shadow-[0_20px_40px_rgba(15,23,42,0.3)]
                  "
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <Check
                    size={46}
                    strokeWidth={2.5}
                  />
                </motion.div>

                {/* SPARKLES */}

                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0"
                >
                  <Sparkles
                    className="absolute -right-2 top-4 text-slate-600"
                    size={18}
                  />

                  <Sparkles
                    className="absolute -left-2 bottom-5 text-slate-500"
                    size={14}
                  />
                </motion.div>

              </motion.div>

              {/* ================================================= */}
              {/* TEXT */}
              {/* ================================================= */}

              <AnimatePresence>

                {showContent && (
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
                      duration: 0.7,
                    }}
                    className="mt-7 text-center sm:mt-8"
                  >

                    <div className="mb-3 flex items-center justify-center gap-2">

                      <GraduationCap
                        size={18}
                        className="text-slate-500"
                      />

                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
                        Registration Complete
                      </span>

                    </div>

                    <h1
                      className="
                        text-4xl
                        font-black
                        tracking-tight
                        text-slate-900
                        sm:text-5xl
                        md:text-6xl
                      "
                    >
                      Congratulations
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                      Your admission enquiry has been successfully
                      submitted. Our team will contact you shortly.
                    </p>

                  </motion.div>
                )}

              </AnimatePresence>

              {/* ================================================= */}
              {/* USER DETAILS */}
              {/* ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1,
                  duration: 0.7,
                }}
                className="
                  mx-auto
                  mt-8
                  grid
                  max-w-2xl
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                "
              >

                {/* NAME */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200/80
                    bg-white/70
                    p-4
                  "
                >

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Applicant
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-slate-800">
                    {formData?.fullName || 'Applicant'}
                  </p>

                </div>

                {/* COURSE */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200/80
                    bg-white/70
                    p-4
                  "
                >

                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Course
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-slate-800">
                    {formData?.course || 'Selected Course'}
                  </p>

                </div>

                {/* EMAIL */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200/80
                    bg-white/70
                    p-4
                  "
                >

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Mail size={16} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 truncate text-xs font-semibold text-slate-700">
                      {formData?.email || 'Email submitted'}
                    </p>

                  </div>

                </div>

                {/* PHONE */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200/80
                    bg-white/70
                    p-4
                  "
                >

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Phone size={16} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Contact
                    </p>

                    <p className="mt-1 truncate text-xs font-semibold text-slate-700">
                      {formData?.contactNumber || 'Contact submitted'}
                    </p>

                  </div>

                </div>

              </motion.div>

              {/* ================================================= */}
              {/* SUCCESS MESSAGE */}
              {/* ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 1.3,
                  duration: 0.6,
                }}
                className="
                  mx-auto
                  mt-6
                  flex
                  max-w-2xl
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200/80
                  bg-slate-50/80
                  p-4
                "
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                  <Check size={18} />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-sm font-bold text-slate-800">
                    Thank you for registering!
                  </p>

                  <p className="mt-0.5 text-xs leading-5 text-slate-500">
                    Please keep your contact number available.
                    Our counselor may contact you regarding your enquiry.
                  </p>

                </div>

              </motion.div>

              {/* ================================================= */}
              {/* FOOTER */}
              {/* ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 1.5,
                }}
                className="
                  mt-7
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-x-5
                  gap-y-2
                  text-[10px]
                  font-medium
                  text-slate-400
                "
              >

                <span className="flex items-center gap-1.5">
                  <MapPin size={12} />
                  {formData?.center || 'Admission Center'}
                </span>

                <span className="flex items-center gap-1.5">
                  <Sparkles size={12} />
                  Secure Registration
                </span>

              </motion.div>

              {/* ================================================= */}
              {/* SMALL FLOATING ELEMENT */}
              {/* ================================================= */}

              <motion.div
                animate={{
                  y: [-6, 6, -6],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="
                  pointer-events-none
                  absolute
                  right-5
                  top-5
                  hidden
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white
                  bg-white/60
                  shadow-lg
                  backdrop-blur-xl
                  sm:flex
                "
              >

                <ArrowUpRight
                  size={19}
                  className="text-slate-600"
                />

              </motion.div>

            </div>
          </div>

        </motion.div>

      </div>

    </div>
  );
}