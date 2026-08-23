import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  GraduationCap,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Building2,
  AlertCircle,
} from 'lucide-react';

// --- CUSTOM SELECT COMPONENT ---
const CustomSelectField = ({ field, index, formData, handleChange, hasError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isCustomizable = field.name === 'branch';

  return (
    <motion.div
      key={field.name}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.35 + index * 0.08,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      className="relative"
      style={{ zIndex: isOpen ? 50 : 10 - index }}
      ref={dropdownRef}
    >
      <div
        onClick={() => setIsOpen(true)}
        className={`
          relative flex items-center gap-2.5 rounded-[16px] border bg-white/80 px-2.5 py-2.5 transition-all sm:gap-4 sm:rounded-[20px] sm:px-4 sm:py-3.5 md:py-4
          ${
            hasError
              ? 'border-red-300'
              : isOpen
              ? 'border-slate-900 shadow-[0_8px_25px_rgba(15,23,42,0.07)]'
              : 'border-slate-200 hover:border-slate-300'
          }
        `}
      >
        <motion.div
          whileHover={{ rotateY: 180, scale: 1.08 }}
          transition={{ duration: 0.45 }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-10 sm:w-10 sm:rounded-[14px] ${
            isOpen ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <GraduationCap size={15} className="sm:w-[17px] sm:h-[17px]" />
        </motion.div>

        <div className="min-w-0 flex-1">
          <label className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 sm:text-[10px]">
            {field.label}
          </label>
          <input
            type="text"
            readOnly={!isCustomizable}
            placeholder={field.placeholder}
            name={field.name}
            value={formData?.[field.name] || ''}
            onChange={(e) => {
              if (isCustomizable) {
                handleChange(e);
              }
            }}
            className="mt-0.5 w-full min-w-0 bg-transparent text-xs font-medium text-slate-800 outline-none placeholder:text-slate-300 sm:text-[15px]"
            style={{ cursor: isCustomizable ? 'text' : 'pointer' }}
          />
        </div>

        <ChevronDown
          size={16}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={`shrink-0 cursor-pointer transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-slate-900' : 'text-slate-400 hover:text-slate-900'
          }`}
        />

        <div
          className={`pointer-events-none absolute bottom-0 left-5 right-5 h-[2px] origin-center bg-slate-900 transition-transform duration-300 ${
            isOpen ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-[105%] mt-2 rounded-[20px] border border-white/80 bg-white/70 p-1.5 shadow-[0_20px_40px_rgba(15,23,42,0.12)] backdrop-blur-3xl overflow-hidden"
          >
            <div className="max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
              {field.options.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    handleChange({ target: { name: field.name, value: opt } });
                    setIsOpen(false);
                  }}
                  className="cursor-pointer rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 transition-colors hover:bg-white hover:text-slate-900 hover:shadow-sm sm:px-4 sm:py-3 sm:text-sm"
                >
                  {opt}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-1.5 flex items-center gap-1.5 px-2 text-[10px] sm:text-[11px] font-medium text-red-500"
          >
            <AlertCircle size={10} className="sm:w-[12px] sm:h-[12px]" />
            Required
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
// ------------------------------------

export default function Education({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) {
  const [focusedField, setFocusedField] = useState('');
  const [errors, setErrors] = useState({});
  const [bubbles, setBubbles] = useState([]);

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const newBubble = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setBubbles((prev) => [...prev.slice(-15), newBubble]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setBubbles((prev) => prev.slice(1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      [name]: value,
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.qualification?.trim()) newErrors.qualification = 'Required';
    if (!formData?.branch?.trim()) newErrors.branch = 'Required';
    if (!formData?.semester?.trim()) newErrors.semester = 'Required';
    if (!formData?.year?.trim()) newErrors.year = 'Required';
    if (!formData?.passoutYear?.trim()) newErrors.passoutYear = 'Required';
    if (!formData?.collegeName?.trim()) newErrors.collegeName = 'Required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-500, 500], [6, -6]),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-500, 500], [-8, 8]),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const handleCardMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();

    if (!rect) return;

    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const fields = [
    {
      name: 'qualification',
      label: 'Educational Qualification',
      placeholder: 'Select Educational Qualification',
      options: [
        '10th',
        '12th',
        'Diploma',
        'Graduation',
        'Post Graduation',
      ],
    },
    {
      name: 'branch',
      label: 'Branch',
      placeholder: 'Select or Type Branch',
      options: [
        'Computer Science',
        'Mechanical',
        'Electrical',
        'Civil',
        'Commerce',
        'Arts',
      ],
    },
    {
      name: 'semester',
      label: 'Semester',
      placeholder: 'Select Semester',
      options: [
        '1st',
        '2nd',
        '3rd',
        '4th',
        '5th',
        '6th',
        '7th',
        '8th',
      ],
    },
    {
      name: 'year',
      label: 'Year',
      placeholder: 'Select Year',
      options: [
        '1st Year',
        '2nd Year',
        '3rd Year',
        '4th Year',
      ],
    },
    {
      name: 'passoutYear',
      label: 'Passout Year',
      placeholder: 'Select Passout Year',
      options: [
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
        '2025',
        '2026',
        '2027',
      ],
    },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="
        relative
        h-[100dvh]
        w-full
        overflow-hidden
        flex
        items-center
        justify-center
        bg-[#e9edf2]
        font-sans
        px-3
        py-2
        sm:px-5
        sm:py-6
        md:px-8
        md:py-8
        lg:px-10
        lg:py-10
        perspective-[1800px]
      "
    >
      {/* BACKGROUND GRID */}
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

      {/* BACKGROUND 3D ORBS */}
      <motion.div
        animate={{
          y: [-25, 25, -25],
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
          top-10
          hidden
          h-64
          w-64
          rounded-full
          bg-gradient-to-br
          from-white
          via-slate-200
          to-slate-400
          opacity-60
          shadow-[inset_-30px_-30px_60px_rgba(15,23,42,0.22),20px_30px_70px_rgba(15,23,42,0.12)]
          md:block
          lg:h-80
          lg:w-80
        "
      />

      <motion.div
        animate={{
          y: [25, -25, 25],
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

      {/* WATER BUBBLES */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{
              scale: 0,
              opacity: 0.5,
            }}
            animate={{
              scale: 2.5,
              opacity: 0,
              rotateZ: 180,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            style={{
              left: bubble.x,
              top: bubble.y,
            }}
            className="
              pointer-events-none
              absolute
              z-0
              h-4
              w-4
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-white/80
              bg-white/30
              shadow-[inset_2px_2px_5px_white]
              backdrop-blur-md
            "
          />
        ))}
      </AnimatePresence>

      {/* MAIN 3D CARD */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.94,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.9,
          type: 'spring',
          stiffness: 80,
          damping: 15,
        }}
        className="
          relative
          z-10
          w-full
          max-w-[680px]
          md:max-w-[700px]
          lg:max-w-[760px]
        "
      >
        {/* CARD SHADOW */}
        <div
          className="
            pointer-events-none
            absolute
            inset-4
            rounded-[38px]
            bg-slate-900/15
            blur-3xl
          "
        />

        {/* MAIN CARD BODY */}
        <div
          className="
            relative
            max-h-[calc(100dvh-20px)]
            overflow-y-auto
            overflow-x-hidden
            rounded-[28px]
            border
            border-white/90
            bg-white/80
            backdrop-blur-3xl
            shadow-[0_30px_80px_rgba(15,23,42,0.16)]
            sm:max-h-[calc(100dvh-32px)]
            sm:rounded-[34px]
            md:rounded-[38px]
          "
          style={{
            transformStyle: 'preserve-3d',
            scrollbarWidth: 'none',
          }}
        >
          {/* TOP LIGHT */}
          <motion.div
            animate={{
              x: ['-120%', '220%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
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
              -skew-x-12
              bg-gradient-to-r
              from-transparent
              via-white/40
              to-transparent
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative
              p-4
              sm:p-7
              md:p-9
              lg:p-11
            "
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* HEADER */}
            <motion.div
              style={{
                translateZ: 40,
              }}
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.6,
              }}
              className="text-center"
            >
              <motion.div
                animate={{
                  y: [-3, 3, -3],
                  rotateY: [0, 180, 360],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  rotateY: {
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
                className="
                  mx-auto
                  mb-2
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[12px]
                  bg-slate-900
                  text-white
                  shadow-[0_12px_25px_rgba(15,23,42,0.25)]
                  sm:mb-4
                  sm:h-14
                  sm:w-14
                  sm:rounded-[18px]
                "
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <img 
                  src="/303965.png" 
                  alt="Logo" 
                  className="h-full w-full object-cover" 
                />
              </motion.div>

              <h1
                className="
                  text-[22px]
                  font-black
                  tracking-tight
                  text-slate-900
                  sm:text-3xl
                  md:text-4xl
                "
              >
                Academic Details
              </h1>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-slate-500
                  sm:mt-2
                  sm:text-sm
                "
              >
                Tell us about your educational background
              </p>
            </motion.div>

            {/* STEPPER */}
            <div className="relative my-5 sm:my-8 md:my-11">
              <div
                className="
                  absolute
                  left-[16.66%]
                  right-[16.66%]
                  top-[16px]
                  h-[2px]
                  bg-slate-200
                  sm:top-5
                "
              />

              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '50%' }}
                transition={{
                  duration: 0.7,
                  ease: 'easeInOut',
                }}
                className="
                  absolute
                  left-[16.66%]
                  top-[16px]
                  h-[2px]
                  bg-slate-900
                  sm:top-5
                "
              />

              <div className="relative flex justify-between">
                {[1, 2, 3].map((s) => {
                  const completed = s < 2;
                  const active = s === 2;

                  return (
                    <motion.div
                      key={s}
                      whileHover={{
                        y: -5,
                        scale: 1.04,
                      }}
                      className="flex w-1/3 flex-col items-center"
                    >
                      <motion.div
                        animate={
                          active
                            ? {
                                scale: [1, 1.08, 1],
                                boxShadow: [
                                  '0 5px 15px rgba(15,23,42,0.12)',
                                  '0 12px 25px rgba(15,23,42,0.25)',
                                  '0 5px 15px rgba(15,23,42,0.12)',
                                ],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          repeat: active ? Infinity : 0,
                        }}
                        className={`
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          border-2
                          text-[10px]
                          font-bold
                          sm:h-10
                          sm:w-10
                          sm:text-sm
                          ${
                            active || completed
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-200 bg-white text-slate-400'
                          }
                        `}
                      >
                        <AnimatePresence mode="wait">
                          {completed ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                            >
                              <Check size={15} strokeWidth={3} className="sm:w-[17px] sm:h-[17px]"/>
                            </motion.div>
                          ) : (
                            <motion.span
                              key="number"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                            >
                              {s}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <span
                        className={`
                          mt-1.5
                          text-[9px]
                          font-semibold
                          sm:mt-3
                          sm:text-xs
                          md:text-sm
                          ${
                            active || completed
                              ? 'text-slate-900'
                              : 'text-slate-400'
                          }
                        `}
                      >
                        {s === 1 && 'Personal Info'}
                        {s === 2 && 'Academic Details'}
                        {s === 3 && 'Submit'}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* FORM */}
            <form
              className="space-y-3 sm:space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                validateForm();
              }}
            >
              <div className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-2">
                {fields.map((field, index) => {
                  return (
                    <CustomSelectField 
                      key={field.name}
                      field={field}
                      index={index}
                      formData={formData}
                      handleChange={handleChange}
                      hasError={errors[field.name]}
                    />
                  );
                })}

                {/* COLLEGE NAME INPUT */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.35 + fields.length * 0.08,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className="group relative z-[1]"
                >
                  <div
                    className={`
                      relative
                      flex
                      items-center
                      gap-2.5
                      rounded-[16px]
                      border
                      bg-white/80
                      px-2.5
                      py-2.5
                      transition-all
                      sm:gap-4
                      sm:rounded-[20px]
                      sm:px-4
                      sm:py-3.5
                      md:py-4
                      ${
                        errors.collegeName
                          ? 'border-red-300'
                          : 'border-slate-200 group-focus-within:border-slate-900 group-focus-within:shadow-[0_8px_25px_rgba(15,23,42,0.07)]'
                      }
                    `}
                  >
                    <motion.div
                      whileHover={{
                        rotateY: 180,
                        scale: 1.08,
                      }}
                      transition={{
                        duration: 0.45,
                      }}
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-slate-100
                        text-slate-600
                        sm:h-10
                        sm:w-10
                        sm:rounded-[14px]
                      "
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <Building2 size={15} className="sm:w-[17px] sm:h-[17px]"/>
                    </motion.div>

                    <div className="min-w-0 flex-1">
                      <label
                        className="
                          block
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-slate-400
                          sm:text-[10px]
                        "
                      >
                        College / Institution
                      </label>

                      <input
                        type="text"
                        name="collegeName"
                        placeholder="Enter college name"
                        value={formData?.collegeName || ''}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('collegeName')}
                        onBlur={() => setFocusedField('')}
                        className="
                          mt-0.5
                          w-full
                          min-w-0
                          bg-transparent
                          text-xs
                          font-medium
                          text-slate-800
                          outline-none
                          placeholder:text-slate-300
                          sm:text-[15px]
                        "
                      />
                    </div>

                    <div
                      className="
                        pointer-events-none
                        absolute
                        bottom-0
                        left-5
                        right-5
                        h-[2px]
                        origin-center
                        scale-x-0
                        bg-slate-900
                        transition-transform
                        duration-300
                        group-focus-within:scale-x-100
                      "
                    />
                  </div>

                  <AnimatePresence>
                    {errors.collegeName && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="
                          mt-1.5
                          flex
                          items-center
                          gap-1.5
                          px-2
                          text-[10px]
                          font-medium
                          text-red-500
                          sm:text-[11px]
                        "
                      >
                        <AlertCircle size={10} className="sm:w-[12px] sm:h-[12px]"/>
                        Required
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* ACTION BUTTONS */}
              <div
                className="
                  flex flex-col-reverse
                  gap-2
                  pt-2
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:pt-4
                "
              >
                {/* PREV BUTTON */}
                <motion.button
                  type="button"
                  onClick={onPrev}
                  whileHover={{
                    scale: 1.015,
                    x: -3,
                    boxShadow: '0 8px 20px rgba(15,23,42,0.08)',
                  }}
                  whileTap={{
                    scale: 0.96,
                    x: -1,
                  }}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-[16px]
                    bg-slate-100
                    py-3
                    px-6
                    text-xs
                    font-bold
                    text-slate-600
                    hover:bg-slate-200
                    transition-all
                    sm:rounded-[20px]
                    sm:py-4
                    sm:px-8
                    sm:text-sm
                    cursor-pointer
                  "
                >
                  <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]"/>
                  <span>Back</span>
                </motion.button>

                {/* NEXT BUTTON */}
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.015,
                    y: -3,
                    boxShadow: '0 18px 35px rgba(15,23,42,0.25)',
                  }}
                  whileTap={{
                    scale: 0.96,
                    y: 2,
                  }}
                  className="
                    group
                    relative
                    flex
                    items-center
                    justify-center
                    gap-2
                    overflow-hidden
                    rounded-[16px]
                    bg-slate-900
                    py-3
                    px-8
                    text-xs
                    font-bold
                    text-white
                    shadow-[0_10px_25px_rgba(15,23,42,0.18)]
                    sm:gap-3
                    sm:rounded-[20px]
                    sm:py-4
                    sm:px-10
                    sm:text-sm
                    cursor-pointer
                  "
                >
                  {/* SHINE */}
                  <motion.div
                    initial={{ x: '-150%' }}
                    animate={{ x: '150%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: 'easeInOut',
                    }}
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      w-1/4
                      -skew-x-[25deg]
                      bg-white/15
                    "
                  />

                  <span className="relative z-10">Continue</span>

                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative z-10"
                  >
                    <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]"/>
                  </motion.span>
                </motion.button>
              </div>
            </form>

            {/* FOOTER */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-1.5
                text-[9px]
                text-slate-400
                sm:mt-5
                sm:text-xs
              "
            >
              <Sparkles size={10} className="sm:w-[11px] sm:h-[11px]" />
              Secure Admission Enquiry
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}