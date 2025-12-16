"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Label } from '@/components/ui/label';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IOSSlider } from '@/components/ui/ios-slider';
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { 
  Sun,
  Sparkles,
  CloudSun,
  CloudMoon,
  Contrast,
  Lightbulb,
  Moon,
  Palette,
  Flame,
  Thermometer,
  Scissors,
  CircleDot,
  Gauge,
  Snowflake,
  CircleDashed
} from "lucide-react";

interface PhotoEditorProps {
  imageUrl: string | StaticImageData;
  className?: string;
}

interface FilterValues {
  exposure: number;
  brilliance: number;
  highlights: number;
  shadows: number;
  contrast: number;
  brightness: number;
  blackPoint: number;
  saturation: number;
  vibrance: number;
  warmth: number;
  tint: number;
  sharpness: number;
  definition: number;
  noiseReduction: number;
  vignette: number;
}

interface FilterConfig {
  icon: React.ReactNode;
  label: string;
  min: number;
  max: number;
  default: number;
}

export function PhotoEditor({ imageUrl, className }: PhotoEditorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<keyof FilterValues>('exposure');
  const scrollTimeout = useRef<NodeJS.Timeout>(undefined);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Wait for scrolling to finish before checking position
    scrollTimeout.current = setTimeout(() => {
      const container = scrollRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      // Get all filter buttons
      const filterTypes = Object.keys(filterConfigs) as Array<keyof FilterValues>;
      let closestFilter: keyof FilterValues | null = null;
      let closestDistance = Infinity;

      // Find the button closest to center
      filterTypes.forEach(filterType => {
        const button = container.querySelector<HTMLButtonElement>(`button[data-filter="${filterType}"]`);
        if (button) {
          const rect = button.getBoundingClientRect();
          const buttonCenter = rect.left + rect.width / 2;
          const distance = Math.abs(buttonCenter - containerCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestFilter = filterType;
          }
        }
      });

      // Update selected filter if we found a close one
      if (closestFilter) {
        setSelectedFilter(closestFilter);
      }
    }, 50); // Reduced timeout for more responsive feel
  };

  const handleFilterClick = (filterType: keyof FilterValues) => {
    setSelectedFilter(filterType);
    
    // Scroll the clicked filter into view
    if (scrollRef.current) {
      const container = scrollRef.current;
      const button = container.querySelector(`button[data-filter="${filterType}"]`);
      
      if (button) {
        // Calculate the scroll position to center the button
        const containerWidth = container.offsetWidth;
        const buttonRect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const scrollLeft = container.scrollLeft + buttonRect.left - containerRect.left - (containerWidth / 2) + (buttonRect.width / 2);
        
        // Smooth scroll to the position
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const filterConfigs: Record<keyof FilterValues, FilterConfig> = {
    exposure: { icon: <Sun className="w-4 h-4" />, label: 'Exposure', min: -100, max: 100, default: 0 },
    brilliance: { icon: <Sparkles className="w-4 h-4" />, label: 'Brilliance', min: -100, max: 100, default: 0 },
    highlights: { icon: <CloudSun className="w-4 h-4" />, label: 'Highlights', min: -100, max: 100, default: 0 },
    shadows: { icon: <CloudMoon className="w-4 h-4" />, label: 'Shadows', min: -100, max: 100, default: 0 },
    contrast: { icon: <Contrast className="w-4 h-4" />, label: 'Contrast', min: 0, max: 200, default: 100 },
    brightness: { icon: <Lightbulb className="w-4 h-4" />, label: 'Brightness', min: 0, max: 200, default: 100 },
    blackPoint: { icon: <Moon className="w-4 h-4" />, label: 'Black Point', min: -100, max: 100, default: 0 },
    saturation: { icon: <Palette className="w-4 h-4" />, label: 'Saturation', min: 0, max: 200, default: 100 },
    vibrance: { icon: <Flame className="w-4 h-4" />, label: 'Vibrance', min: -100, max: 100, default: 0 },
    warmth: { icon: <Thermometer className="w-4 h-4" />, label: 'Warmth', min: -100, max: 100, default: 0 },
    tint: { icon: <CircleDot className="w-4 h-4" />, label: 'Tint', min: -100, max: 100, default: 0 },
    sharpness: { icon: <Scissors className="w-4 h-4" />, label: 'Sharpness', min: 0, max: 100, default: 0 },
    definition: { icon: <Gauge className="w-4 h-4" />, label: 'Definition', min: 0, max: 100, default: 0 },
    noiseReduction: { icon: <Snowflake className="w-4 h-4" />, label: 'Noise Reduction', min: 0, max: 100, default: 0 },
    vignette: { icon: <CircleDashed className="w-4 h-4" />, label: 'Vignette', min: 0, max: 100, default: 0 },
  };

  const [filters, setFilters] = useState<FilterValues>(() => {
    const initialFilters: Partial<FilterValues> = {};
    (Object.keys(filterConfigs) as Array<keyof FilterValues>).forEach(key => {
      initialFilters[key] = filterConfigs[key].default;
    });
    return initialFilters as FilterValues;
  });

  const getFilterStyle = () => {
    return {
      filter: `
        brightness(${1 + (filters.exposure * 0.01)})
        contrast(${filters.contrast}%)
        brightness(${filters.brightness}%)
        saturate(${filters.saturation}%)
        opacity(${1 + filters.blackPoint / 200})
        sepia(${filters.warmth / 100})
        hue-rotate(${filters.tint}deg)
        blur(${filters.definition / 100}px)
      `,
      transform: `scale(1.01)`,
    };
  };

  const handleFilterChange = (value: number[], filterType: keyof FilterValues) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value[0]
    }));
  };

  const renderFilterButtons = () => {
    const filterTypes = Object.keys(filterConfigs) as Array<keyof FilterValues>;
    
    return filterTypes.map((filterType) => {
      const config = filterConfigs[filterType];
      const value = filters[filterType];
      const hasNegativeRange = config.min < 0;
      const isPercentageRange = config.max === 200 && config.min === 0;
      
      // Transform the value for display
      const displayValue = isPercentageRange ? value - 100 : value;
      const displayMin = isPercentageRange ? -100 : config.min;
      const displayMax = isPercentageRange ? 100 : config.max;
      const displayDefault = isPercentageRange ? 0 : config.default;
      
      // Calculate normalized value for the yellow bar
      const normalizedValue = isPercentageRange
        ? ((value - 100) / 100) // For percentage ranges (0-200 → -100-100)
        : hasNegativeRange
          ? value / config.max // For -100 to 100
          : (value - config.default) / (config.max - config.default); // For 0 to 100

      return (
        <button
          key={filterType}
          data-filter={filterType}
          onClick={() => handleFilterClick(filterType)}
          className={cn(
            "relative flex flex-col items-center gap-1 rounded-sm  py-2 px-0 transition-colors min-w-[72px] shrink-0 snap-center",
            selectedFilter === filterType
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          {/* Yellow indicator bar */}
          {hasNegativeRange || isPercentageRange ? (
            // For -100 to 100 range
            <>
              {/* Right side bar (positive values) */}
              <div className="absolute top-0 left-1/2 rounded-lg right-[2px] h-[2px] bg-yellow-400 origin-left transition-all duration-300"
                style={{ 
                  transform: normalizedValue > 0 ? `scaleX(${normalizedValue})` : 'scaleX(0)',
                  opacity: displayValue === displayDefault ? 0 : 1
                }}
              />
              {/* Left side bar (negative values) */}
              <div className="absolute top-0 rounded-lg left-[2px] w-[calc(50%-2px)] h-[2px] bg-yellow-400 origin-right transition-all duration-300"
                style={{ 
                  transform: normalizedValue < 0 ? `scaleX(${Math.abs(normalizedValue)})` : 'scaleX(0)',
                  opacity: displayValue === displayDefault ? 0 : 1
                }}
              />
            </>
          ) : (
            // For 0 to 100 range
            <div className="absolute top-0 left-[2px] rounded-lg right-[2px] h-[2px] bg-yellow-400 origin-left transition-all duration-300"
              style={{ 
                transform: `scaleX(${Math.max(0, normalizedValue)})`,
                opacity: displayValue === displayDefault ? 0 : 1
              }}
            />
          )}
          
          {filterConfigs[filterType].icon}
          {selectedFilter === filterType && (
            <span className="text-xs font-medium">{filterConfigs[filterType].label}</span>
          )}
        </button>
      );
    });
  };

  // Update the value display to show the visual value
  const getDisplayValue = (value: number, filterType: keyof FilterValues) => {
    const config = filterConfigs[filterType];
    const isPercentageRange = config.max === 200 && config.min === 0;
    const displayValue = isPercentageRange ? value - 100 : value;
    return displayValue > 0 ? `+${displayValue}` : displayValue;
  };

  const renderActiveSlider = () => (
    <div className="px-4">
      <div className="relative">
        {/* Yellow line connecting to selected filter */}
        <div 
          className="absolute -top-[1px] left-1/2 w-[2px] h-4 bg-yellow-400 transform -translate-x-1/2"
          style={{
            borderTopLeftRadius: '2px',
            borderTopRightRadius: '2px',
          }}
        />
        <IOSSlider
          min={filterConfigs[selectedFilter].min}
          max={filterConfigs[selectedFilter].max}
          value={filters[selectedFilter]}
          onChange={(value) => handleFilterChange([value], selectedFilter)}
        />
      </div>
    </div>
  );

  const handleEmailImage = () => {
    // Create a list of non-default filter settings
    const usedFilters = Object.entries(filters)
      .filter(([key, value]) => {
        const filterKey = key as keyof FilterValues;
        return value !== filterConfigs[filterKey].default;
      })
      .map(([key, value]) => {
        const filterKey = key as keyof FilterValues;
        const displayValue = filterConfigs[filterKey].max === 200 && filterConfigs[filterKey].min === 0
          ? value - 100  // For percentage ranges (0-200 → -100-100)
          : value;
        return `${filterConfigs[filterKey].label}: ${displayValue > 0 ? '+' : ''}${displayValue}`;
      })
      .join('%0D%0A'); // Use URL-encoded line breaks

    const body = usedFilters 
      ? `Here are the filter settings I used:%0D%0A%0D%0A${usedFilters}`
      : "I haven't made any adjustments to the photo yet!";

    // Construct the mailto URL with proper encoding
    const mailtoUrl = `mailto:tafilajandi@gmail.com?subject=${encodeURIComponent("Photo Filter Settings")}&body=${encodeURIComponent(body.replace(/%0D%0A/g, '\n'))}`;
    
    // Use window.open for better mobile compatibility
    window.open(mailtoUrl, '_self');
  };

  return (
    <div className={cn("flex flex-col h-[100dvh] md:h-[80vh] overflow-hidden", className)}>
      {/* Image Container */}
      <div className="relative flex-1 bg-black flex items-center justify-center p-4">
        <div ref={imageRef} className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt="Editable image"
            className="object-contain will-change-[filter] motion-reduce:transition-none"
            fill
            style={{
              ...getFilterStyle(),
              WebkitBackfaceVisibility: 'hidden',
              WebkitTransform: 'translate3d(0, 0, 0)',
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </div>

      {/* Controls Container */}
      <div className="bg-background border-t shrink-0 overflow-hidden">
        {/* Email Button */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            onClick={handleEmailImage}
            size="icon"
            variant="secondary"
            className="rounded-full"
          >
            <Mail className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Type Selector */}
        <div className="relative border-b">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scrollbar-none py-4 scroll-smooth snap-x snap-mandatory"
            style={{
              paddingLeft: 'max(calc(50% - 36px), 16px)',
              paddingRight: 'max(calc(50% - 36px), 16px)',
            }}
          >
            {renderFilterButtons()}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
          {/* Value display */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground">
            {getDisplayValue(filters[selectedFilter], selectedFilter)}
          </div>
        </div>

        {/* Active Slider */}
        <div className="overflow-hidden">
          {renderActiveSlider()}
        </div>
      </div>
    </div>
  );
} 