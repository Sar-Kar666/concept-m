
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const cn = (...arr: Array<string | false | null | undefined>) =>
  arr.filter(Boolean).join(" ");

const navigationItems = [
  { name: "Brand Strategy", href: "#strategy", description: "Defining the path forward" },
  { name: "Visual Identity", href: "#identity", description: "Crafting distinct visual systems" },
  { name: "Web Development", href: "#dev", description: "High-performance digital products" },
  { name: "Motion Design", href: "#motion", description: "Bringing narratives to life" },
  { name: "Creative Direction", href: "#creative", description: "Guiding the artistic vision" },
];

const STAGGER = 0.025;

export const TextRoll: React.FC<{
  children: string;
  className?: string;
  hovered?: boolean;
}> = ({ children, className, hovered = false }) => (
  <div className={cn("relative overflow-hidden", className)}>
    <div className="relative">
      {children.split("").map((l, i) => (
        <motion.span
          key={`top-${i}`}
          className="inline-block"
          animate={{ y: hovered ? "-100%" : "0%" }}
          transition={{ ease: "easeInOut", duration: 0.3, delay: STAGGER * i }}
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </div>

    <div className="absolute inset-0">
      {children.split("").map((l, i) => (
        <motion.span
          key={`bot-${i}`}
          className="inline-block"
          initial={{ y: "100%" }}
          animate={{ y: hovered ? "0%" : "100%" }}
          transition={{ ease: "easeInOut", duration: 0.3, delay: STAGGER * i }}
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </div>
  </div>
);

export const Skiper58: React.FC<{ className?: string }> = ({ className }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ul className={cn("flex flex-col w-full", className)}>
      {navigationItems.map((item, index) => {
        const isHovered = hoveredIndex === index;
        const isDimmed = hoveredIndex !== null && !isHovered;

        return (
          <li
            key={index}
            className="group relative border-b border-white/10 last:border-b-0"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a
              href={item.href}
              className="flex items-center justify-between w-full py-8 md:py-12 cursor-pointer transition-all duration-500"
              style={{ opacity: isDimmed ? 0.3 : 1 }}
            >
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className="text-sm md:text-base font-mono text-red-500/80 group-hover:text-red-500 transition-colors">
                  0{index + 1}/
                </span>
                
                <div className="flex flex-col">
                   <TextRoll 
                     hovered={isHovered}
                     className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white"
                   >
                     {item.name}
                   </TextRoll>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-4 overflow-hidden">
                <span className={cn(
                  "text-sm text-gray-400 transform transition-all duration-500",
                  isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                )}>
                  {item.description}
                </span>
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <motion.svg 
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     className="absolute text-white"
                     animate={{ x: isHovered ? 24 : 0, opacity: isHovered ? 0 : 1 }}
                     transition={{ duration: 0.3 }}
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </motion.svg>
                  <motion.svg 
                     width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     className="absolute text-red-500"
                     initial={{ x: -24, opacity: 0 }}
                     animate={{ x: isHovered ? 0 : -24, opacity: isHovered ? 1 : 0 }}
                     transition={{ duration: 0.3 }}
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </motion.svg>
                </div>
              </div>
              
              {/* Mobile Arrow */}
              <div className="md:hidden text-white/50 group-hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M5 12h14" />
                   <path d="M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};
