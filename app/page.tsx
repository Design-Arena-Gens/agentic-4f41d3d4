'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Script segments with timing and B-roll types
const scriptSegments = [
  {
    text: "People are saving HOURS every week using new free AI tools…",
    duration: 4000,
    broll: 'clocks',
    avatarMouth: [0.3, 0.6, 0.8, 0.5, 0.7, 0.4, 0.6, 0.3]
  },
  {
    text: "but most people still don't know they exist.",
    duration: 3000,
    broll: 'confusion',
    avatarMouth: [0.4, 0.5, 0.7, 0.6, 0.5, 0.3]
  },
  {
    text: "Today, I'll show you 5 powerful AI tools",
    duration: 3500,
    broll: 'aiDashboard',
    avatarMouth: [0.5, 0.7, 0.8, 0.6, 0.7, 0.5, 0.6]
  },
  {
    text: "that can boost your productivity instantly —",
    duration: 3000,
    broll: 'productivity',
    avatarMouth: [0.6, 0.7, 0.5, 0.6, 0.4, 0.5]
  },
  {
    text: "and every one of them is completely free.",
    duration: 3500,
    broll: 'numbers',
    avatarMouth: [0.5, 0.6, 0.8, 0.7, 0.6, 0.4, 0.5]
  }
]

// B-roll components
const ClocksBroll = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        initial={{ scale: 0, rotate: 0, x: 0, y: 0 }}
        animate={{
          scale: [0, 1.5, 0],
          rotate: [0, 180, 360],
          x: [0, Math.cos(i * 45 * Math.PI / 180) * 300],
          y: [0, Math.sin(i * 45 * Math.PI / 180) * 300],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 3, delay: i * 0.1, ease: "easeOut" }}
      >
        <div className="w-32 h-32 rounded-full border-4 border-cyan-400 flex items-center justify-center bg-cyan-900/20 backdrop-blur">
          <div className="w-1 h-12 bg-cyan-300 rounded absolute origin-bottom" style={{ transform: 'rotate(90deg)' }} />
          <div className="w-1 h-8 bg-cyan-400 rounded absolute origin-bottom" style={{ transform: 'rotate(180deg)' }} />
        </div>
      </motion.div>
    ))}
    <motion.div
      className="absolute text-6xl font-bold text-cyan-300"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.8 }}
    >
      HOURS SAVED
    </motion.div>
  </div>
)

const AIDashboardBroll = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-4"
        style={{
          width: 200 + (i % 3) * 100,
          height: 100 + (i % 2) * 50,
          left: `${(i % 4) * 25}%`,
          top: `${Math.floor(i / 4) * 20}%`,
        }}
        initial={{ opacity: 0, x: -100, rotateY: -90 }}
        animate={{
          opacity: [0, 1, 1, 0],
          x: [-100, 0, 0, 100],
          rotateY: [-90, 0, 0, 90]
        }}
        transition={{ duration: 3, delay: i * 0.05, ease: "easeInOut" }}
      >
        <div className="h-2 bg-white/30 rounded mb-2" style={{ width: '80%' }} />
        <div className="h-2 bg-white/20 rounded mb-2" style={{ width: '60%' }} />
        <div className="h-2 bg-white/20 rounded" style={{ width: '40%' }} />
      </motion.div>
    ))}
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3 }}
    >
      <div className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        AI POWERED
      </div>
    </motion.div>
  </div>
)

const NumbersBroll = () => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
    {[1, 2, 3, 4, 5].map((num) => (
      <motion.div
        key={num}
        className="absolute text-[20rem] font-black"
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{
          scale: [0, 1.5, 1.2],
          rotate: [-180, 0, 0],
          opacity: [0, 1, 1],
          x: [0, 0, (num - 3) * 400],
          y: [0, 0, 0]
        }}
        transition={{ duration: 2.5, delay: num * 0.1, ease: "easeOut" }}
        style={{
          background: `linear-gradient(135deg, #667eea ${num * 20}%, #764ba2 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {num}
      </motion.div>
    ))}
  </div>
)

const ProductivityBroll = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${(i % 4) * 25}%`,
          top: `${Math.floor(i / 4) * 33}%`,
        }}
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: [0, 1, 1],
          rotate: [0, 360, 360],
        }}
        transition={{ duration: 2, delay: i * 0.08, ease: "backOut" }}
      >
        <div className="w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center">
          <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </motion.div>
    ))}
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="text-6xl font-bold text-green-300">
        ⚡ BOOST PRODUCTIVITY ⚡
      </div>
    </motion.div>
  </div>
)

const ConfusionBroll = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <motion.div
      className="text-8xl"
      initial={{ scale: 0, rotate: -180 }}
      animate={{
        scale: [0, 1.5, 1],
        rotate: [-180, 0, 0],
      }}
      transition={{ duration: 1.5 }}
    >
      🤔
    </motion.div>
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-6xl"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 1.5],
          x: Math.cos(i * 60 * Math.PI / 180) * 300,
          y: Math.sin(i * 60 * Math.PI / 180) * 300,
        }}
        transition={{ duration: 2, delay: i * 0.1 }}
      >
        ?
      </motion.div>
    ))}
  </div>
)

// Avatar component
const Avatar = ({ mouthValue, isActive }: { mouthValue: number, isActive: boolean }) => {
  return (
    <div className="relative">
      <motion.div
        className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden shadow-2xl"
        animate={{
          scale: isActive ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 0.3,
          repeat: isActive ? Infinity : 0,
        }}
      >
        {/* Face glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-purple-600/30"
          animate={{
            opacity: isActive ? [0.5, 0.8, 0.5] : 0.3,
          }}
          transition={{
            duration: 0.3,
            repeat: isActive ? Infinity : 0,
          }}
        />

        {/* Eyes */}
        <div className="absolute top-20 left-16 w-8 h-8 bg-white rounded-full">
          <div className="w-4 h-4 bg-black rounded-full mt-2 ml-2" />
        </div>
        <div className="absolute top-20 right-16 w-8 h-8 bg-white rounded-full">
          <div className="w-4 h-4 bg-black rounded-full mt-2 ml-2" />
        </div>

        {/* Mouth */}
        <motion.div
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
          animate={{
            scaleY: isActive ? mouthValue : 0.3,
          }}
          transition={{ duration: 0.1 }}
        >
          <div className="w-16 h-8 bg-white rounded-full" />
        </motion.div>
      </motion.div>

      {/* Audio waves */}
      {isActive && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-cyan-400 rounded-full"
              animate={{
                height: [10, 30, 10],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [currentSegment, setCurrentSegment] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mouthIndex, setMouthIndex] = useState(0)
  const mouthIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isPlaying) return

    const segment = scriptSegments[currentSegment]

    // Animate mouth
    let idx = 0
    mouthIntervalRef.current = setInterval(() => {
      idx = (idx + 1) % segment.avatarMouth.length
      setMouthIndex(idx)
    }, 100)

    // Move to next segment
    const timer = setTimeout(() => {
      if (currentSegment < scriptSegments.length - 1) {
        setCurrentSegment(currentSegment + 1)
      } else {
        setIsPlaying(false)
        setCurrentSegment(0)
      }
    }, segment.duration)

    return () => {
      clearTimeout(timer)
      if (mouthIntervalRef.current) {
        clearInterval(mouthIntervalRef.current)
      }
    }
  }, [isPlaying, currentSegment])

  const handleStart = () => {
    setIsPlaying(true)
    setCurrentSegment(0)
  }

  const currentScript = scriptSegments[currentSegment]
  const mouthValue = isPlaying ? currentScript.avatarMouth[mouthIndex] : 0.3

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Video container */}
      <div className="relative w-full h-screen">
        {/* B-roll background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSegment}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentScript.broll === 'clocks' && <ClocksBroll />}
            {currentScript.broll === 'aiDashboard' && <AIDashboardBroll />}
            {currentScript.broll === 'numbers' && <NumbersBroll />}
            {currentScript.broll === 'productivity' && <ProductivityBroll />}
            {currentScript.broll === 'confusion' && <ConfusionBroll />}
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Avatar */}
        <div className="absolute bottom-8 right-8 z-30">
          <Avatar mouthValue={mouthValue} isActive={isPlaying} />
        </div>

        {/* Subtitles */}
        {isPlaying && (
          <motion.div
            className="absolute bottom-32 left-0 right-0 z-20 px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <p className="text-3xl font-semibold text-center leading-relaxed">
                  {currentScript.text}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Start/Replay button */}
        {!isPlaying && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.button
              onClick={handleStart}
              className="px-16 py-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-3xl font-bold shadow-2xl hover:shadow-cyan-500/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentSegment === 0 ? '▶ START' : '↻ REPLAY'}
            </motion.button>
          </motion.div>
        )}

        {/* Progress bar */}
        {isPlaying && (
          <div className="absolute top-0 left-0 right-0 z-50">
            <motion.div
              className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500"
              initial={{ width: '0%' }}
              animate={{
                width: `${((currentSegment + 1) / scriptSegments.length) * 100}%`
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
      </div>
    </main>
  )
}
