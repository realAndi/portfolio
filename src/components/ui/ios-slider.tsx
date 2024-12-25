"use client"

import React, { useRef, useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"

interface IOSSliderProps {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  className?: string
}

export function IOSSlider({ min, max, value, onChange, className }: IOSSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startValue, setStartValue] = useState(0)

  const range = max - min
  const isContrast = max === 200 && min === 0
  const hasNegative = min < 0 || isContrast

  // For contrast, transform the value to appear as -100 to 100
  const displayValue = isContrast ? value - 100 : value
  const displayMin = isContrast ? -100 : min
  const displayMax = isContrast ? 100 : max
  const displayRange = displayMax - displayMin

  // Create a spring-animated transform value
  const springConfig = { stiffness: 500, damping: 50, mass: 0.5 }
  const motionValue = useMotionValue(((displayValue - displayMin) / displayRange) * 100)
  const springValue = useSpring(motionValue, springConfig)
  
  // Update motion value when value changes
  useEffect(() => {
    motionValue.set(((displayValue - displayMin) / displayRange) * 100)
  }, [displayValue, displayMin, displayRange, motionValue])

  const transform = useTransform(springValue, (v) => 
    hasNegative ? v + 50 : v
  )
  
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    setStartX(clientX)
    setStartValue(value)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !sliderRef.current) return

      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
      const rect = sliderRef.current.getBoundingClientRect()
      const deltaX = startX - clientX
      const scale = range / rect.width
      const deltaValue = deltaX * scale * 0.75
      const newValue = startValue + deltaValue
      
      onChange(Math.round(Math.max(min, Math.min(max, newValue))))
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchend', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging, startX, startValue, onChange, min, max, range])

  const renderTicks = () => {
    const ticks = []
    const tickMin = isContrast ? -100 : min
    const tickMax = isContrast ? 100 : max
    const tickRange = tickMax - tickMin

    for (let i = tickMin; i <= tickMax; i += 1) {
      const isMajor = i % 50 === 0 || i === 0
      const isZero = i === 0
      const position = hasNegative 
        ? (i / tickRange) * 100 + 50 // Center at 50% for ranges with negative values
        : ((i - tickMin) / tickRange) * 100 // Start at 0 for non-negative ranges

      ticks.push(
        <div
          key={i}
          className={cn(
            "absolute top-0 transform -translate-x-1/2",
            isMajor ? "h-5 w-[2px] bg-foreground" : "h-3 w-[1.5px] bg-foreground/30",
          )}
          style={{ left: `${position}%` }}
        >
          {isMajor && (
            <span className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-foreground/70 tabular-nums">
              {i === 0 ? '0' : (i > 0 ? `+${i}` : i)}
            </span>
          )}
          {isZero && displayValue !== 0 && hasNegative && (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-foreground" />
          )}
        </div>
      )
    }
    return ticks
  }

  return (
    <div className={cn("relative h-20 select-none touch-none", className)}>
      <div
        ref={sliderRef}
        className="absolute inset-x-0 top-8 h-10"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Scale Container */}
        <motion.div
          className={cn(
            "absolute h-10 w-[200%] cursor-grab",
            isDragging && "cursor-grabbing"
          )}
          style={{
            left: hasNegative ? '150%' : '50%',
            x: useTransform(transform, (v) => `-${v}%`)
          }}
        >
          {renderTicks()}
        </motion.div>
      </div>
    </div>
  )
} 