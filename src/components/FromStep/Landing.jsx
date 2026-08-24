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
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const features = [
    { icon: Code2, title: 'Software Development' },
    { icon: BrainCircuit, title: 'AI & Machine Learning' },
    { icon: ShieldCheck, title: 'Cyber Security' },
    { icon: Database, title: 'Data & Analytics' },
  ];

  return (
    <main className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-[#eaf5ff] font-sans text-[#0b2945]">

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.10]
            [background-image:linear-gradient(#2879aa_1px,transparent_1px),linear-gradient(90deg,#2879aa_1px,transparent_1px)]
            [background-size:60px_60px]
            [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#79c8f4]/30 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -70, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-52 -right-40 h-[550px] w-[550px] rounded-full bg-[#b4e3ff]/40 blur-[110px]"
        />
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 7, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
          className="absolute top-[35%] h-px w-[45%] bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
        />
      </div>

      {/* NAVBAR */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 sm:py-5 sm:px-8 lg:px-10"
      >
        <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-2 sm:gap-3">
          <motion.div
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl shadow-[0_10px_25px_rgba(11,41,69,0.25)] overflow-hidden bg-[#0b2945]"
          >
            <img 
              src="/303965.png" 
              alt="Cybrom Logo" 
              className="h-full w-full object-cover" 
            />
          </motion.div>
          <div>
            <p className="text-base sm:text-xl font-black tracking-tight">
              Cybrom
            </p>
            <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mt-0.5">
              Technology Pvt. Ltd.
            </p>
          </div>
        </motion.div>

        <motion.button
          onClick={onRegister}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="group relative overflow-hidden rounded-full bg-[#0b2945] px-4 py-1.5 sm:px-7 sm:py-3 text-[9px] sm:text-sm font-bold text-white shadow-[0_10px_30px_rgba(11,41,69,0.25)]"
        >
          <motion.span
            animate={{ x: ['-150%', '180%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/15"
          />
          <span className="relative z-10">Register Now</span>
        </motion.button>
      </motion.header>

      {/* HERO SECTION (Reverted to original grid structure) */}
      <section
        ref={sceneRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 flex flex-1 items-center justify-center w-full px-4 sm:px-8 lg:px-10"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-3 sm:gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-0 mt-2 sm:mt-0">
          
          {/* LEFT CONTENT (AB YEH EK BOX KE ANDAR HAI MOBILE MEIN) */}
          <div className="relative z-20 text-center lg:text-left mt-[-10px] sm:mt-0 
            bg-white/40 border border-white/60 shadow-[0_10px_40px_rgba(11,41,69,0.08)] backdrop-blur-xl rounded-[1.5rem] p-5 
            sm:bg-transparent sm:border-transparent sm:shadow-none sm:backdrop-blur-none sm:p-0 sm:rounded-none">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-2 sm:mb-3 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white bg-white/80 px-3 py-1 sm:px-4 sm:py-2 text-[9px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#2080e5] shadow-[0_10px_30px_rgba(25,100,150,0.08)] backdrop-blur-xl"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#2080e5]"
              />
              Build. Learn. Become.
            </motion.div>

            <div className="overflow-hidden">
              {/* Text Size thoda badha diya (text-[35px]) */}
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.9, type: 'spring', stiffness: 70 }}
                className="text-[35px] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[88px] font-black leading-[1.05] sm:leading-[0.95] tracking-[-0.05em] text-[#0b2945]"
              >
                Shape Your<br />
                <span className="relative inline-block text-[#2080e5]">
                  Future.
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute -bottom-1 left-0 h-0.5 sm:h-1 rounded-full bg-[#2080e5]"
                  />
                </span>
              </motion.h1>
            </div>

            {/* Paragraph Text Size badha diya (text-[12px]) */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="mx-auto mt-2 sm:mt-6 max-w-xl text-[12px] sm:text-base leading-[1.3rem] sm:leading-7 text-slate-600 lg:mx-0 px-1 sm:px-0"
            >
              Learn industry-ready skills, build real projects, and take your first step towards a powerful career with{' '}
              <span className="font-bold text-[#0b2945]">Cybrom Technology Pvt. Ltd.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              className="mt-4 sm:mt-8 flex flex-col items-center gap-2 sm:gap-3 sm:flex-row lg:justify-start"
            >
              <motion.button
                onClick={onRegister}
                whileHover={{ scale: 1.05, y: -5, boxShadow: '0 20px 45px rgba(11,41,69,0.28)' }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex w-[85%] sm:w-auto items-center justify-center gap-2 sm:gap-3 overflow-hidden rounded-xl sm:rounded-2xl bg-[#0b2945] px-5 py-3 sm:px-9 sm:py-4 text-[12px] sm:text-sm font-bold text-white shadow-[0_12px_30px_rgba(11,41,69,0.2)]"
              >
                <motion.div
                  animate={{ x: ['-150%', '180%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute inset-y-0 w-1/4 -skew-x-12 bg-white/15"
                />
                <span className="relative z-10">Start Your Journey</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight size={14} className="sm:w-[18px]" />
                </motion.span>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25 }}
              className="mt-3 sm:mt-7 flex items-center justify-center gap-1 sm:gap-2 text-[9px] sm:text-xs font-medium text-slate-500 lg:justify-start"
            >
              <Sparkles size={10} className="sm:w-[13px]" />
              Industry-focused learning experience
            </motion.div>
          </div>

          {/* 3D SCENE (EKDUM PURANA WALA ORIGINAL LAYOUT) */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative mx-auto mt-2 sm:mt-0 h-[190px] sm:h-[480px] lg:h-[540px] w-full max-w-[280px] sm:max-w-[520px]"
          >
            <motion.div
              animate={{ rotateZ: [0, 360] }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              className="
                absolute left-1/2 top-1/2 
                h-[130px] w-[130px] sm:h-[320px] sm:w-[320px] lg:h-[350px] lg:w-[350px]
                -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-white/50 
                shadow-[inset_-25px_-25px_60px_rgba(32,128,229,0.12),0_35px_80px_rgba(11,41,69,0.14)] 
                backdrop-blur-2xl
              "
            >
              <motion.div
                animate={{ rotateZ: [360, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-3 sm:inset-8 rounded-full border border-[#2080e5]/15"
              />
              <motion.div
                animate={{ rotateZ: [0, -360] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-6 sm:inset-14 rounded-full border border-dashed border-[#2080e5]/20"
              />
              
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    '0 0 25px rgba(32,128,229,0.15)',
                    '0 0 60px rgba(32,128,229,0.35)',
                    '0 0 25px rgba(32,128,229,0.15)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="
                  absolute left-1/2 top-1/2 flex 
                  h-[60px] w-[60px] sm:h-[120px] sm:w-[120px] lg:h-36 lg:w-36 
                  -translate-x-1/2 -translate-y-1/2 items-center justify-center 
                  rounded-[16px] sm:rounded-[35px] bg-[#0b2945] text-white 
                  shadow-[0_20px_50px_rgba(11,41,69,0.25)]
                "
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotateY: [0, 180, 360] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  >
                    <BrainCircuit className="mx-auto mb-0.5 sm:mb-2 w-4 h-4 sm:w-[34px] sm:h-[34px]" />
                  </motion.div>
                  <p className="text-[5px] sm:text-[10px] font-bold uppercase tracking-[0.18em]">
                    Learn
                  </p>
                  <p className="text-[4px] sm:text-[9px] text-white/50">
                    Create • Grow
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {features.map((item, index) => {
              const Icon = item.icon;
              const positions = [
                'left-[-5%] top-[10%] sm:left-[0%] sm:top-[18%]',
                'right-[-5%] top-[5%] sm:right-[0%] sm:top-[10%]',
                'left-[-5%] bottom-[5%] sm:left-[0%] sm:bottom-[13%]',
                'right-[-5%] bottom-[0%] sm:right-[0%] sm:bottom-[9%]',
              ];

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
                  transition={{
                    opacity: { delay: 1.1 + index * 0.15 },
                    scale: { delay: 1.1 + index * 0.15, type: 'spring' },
                    y: { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  whileHover={{ scale: 1.08, z: 30 }}
                  className={`
                    absolute ${positions[index]}
                    w-[85px] sm:w-[150px] lg:w-[170px]
                    rounded-lg sm:rounded-2xl border border-white bg-white/75 
                    p-1 sm:p-3 shadow-[0_18px_40px_rgba(11,41,69,0.12)] backdrop-blur-xl
                  `}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-center gap-1 sm:gap-3">
                    <div className="flex h-4 w-4 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-[4px] sm:rounded-xl bg-[#e8f5ff] text-[#2080e5]">
                      <Icon className="w-2.5 h-2.5 sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <p className="text-[6px] sm:text-[10px] font-bold leading-[1.2] sm:leading-4 text-[#0b2945]">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                animate={{
                  y: [0, -30, 0],
                  x: [0, item % 2 ? 15 : -15, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.7, 1.2, 0.7],
                }}
                transition={{ duration: 3 + item, repeat: Infinity, delay: item * 0.3, ease: 'easeInOut' }}
                className="absolute h-1 w-1 sm:h-2 sm:w-2 rounded-full bg-[#2080e5]"
                style={{
                  left: `${10 + item * 13}%`,
                  top: `${10 + (item * 11) % 75}%`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}