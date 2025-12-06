
import React, { useLayoutEffect, useRef } from 'react';
import LightPillar from './components/LightPillar';
import NavBar from './components/NavBar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Skiper58 } from './components/ui/text-roll-navigation';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animation Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial state
      gsap.set([contentRef.current?.children], { autoAlpha: 0, y: 30 });
      
      // Animate in
      tl.to(contentRef.current?.children || [], {
          duration: 1.2,
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          delay: 0.2
        });

      // 2. Scroll Animation (Background Transition)
      // The background dims and blurs as we scroll away from top
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true
        },
        opacity: 0.2, 
        scale: 1.2, 
        filter: "blur(20px)",
        ease: "none"
      });

      // 3. Hero Content Zoom & Fade (Immersive Transition)
      // As we scroll down, text zooms towards the user and fades out
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "40% top", // Ends earlier for faster exit
          scrub: 0.5,
          toggleActions: "play none none reverse"
        },
        scale: 2.5, // Strong zoom
        opacity: 0, 
        filter: "blur(10px)",
        transformOrigin: "center center",
        ease: "power2.in"
      });

      // 4. Animate Next Section Entrance (The "Card" Slide Up)
      // Subtle parallax on the container itself
      gsap.from(nextSectionRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true
        },
        y: 100, // Slight movement to feel detached from background
        ease: "none"
      });

      // Content reveal for Next Section
      gsap.from(nextSectionRef.current?.querySelector('.content-wrapper') || null, {
        scrollTrigger: {
          trigger: nextSectionRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1
        },
        opacity: 0,
        y: 30,
        filter: "blur(5px)"
      });

    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainContainerRef} className="relative w-full min-h-screen bg-[#060606] text-white font-sans selection:bg-red-900/30 overflow-x-hidden">
      
      {/* --- FIXED BACKGROUND LAYER --- */}
      <div ref={bgRef} className="fixed inset-0 z-0 pointer-events-none transform-gpu">
        <LightPillar
          topColor="#8B0016"
          bottomColor="#D65D7E"
          intensity={1.2}
          rotationSpeed={0.2}
          glowAmount={0.005}
          pillarWidth={3.0}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={15}
          interactive={false}
          mixBlendMode="screen"
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#060606]/40 to-[#060606]/90" />
        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      </div>

      <NavBar />

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="relative z-10 flex flex-col">

        {/* --- HERO SECTION --- */}
        <div ref={heroRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
          
          {/* Hero Main Content */}
          <div 
            ref={contentRef}
            className="flex flex-col items-center justify-center w-full text-center max-w-5xl mx-auto px-4 will-change-transform"
          >
            {/* Badge */}
            <div className="group mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md flex items-center gap-3 text-xs md:text-sm text-gray-300 transition-all duration-500 hover:scale-105 hover:border-red-900/40 cursor-pointer shadow-lg shadow-black/20 hover:shadow-red-900/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
               <span className="tracking-wide font-medium">Accepting New Projects</span>
            </div>

            {/* Heading */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-12 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 drop-shadow-2xl">
              Attracting ideas<br />that stick forever.
            </h1>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Start Project
              </button>
              <button className="w-full sm:w-auto px-10 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-medium transition-all duration-300 hover:border-white/30 hover:-translate-y-1">
                View Portfolio
              </button>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
             <span className="text-[10px] uppercase tracking-[0.2em] mb-2 block text-center">Scroll</span>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
               <path d="M7 13l5 5 5-5"/>
               <path d="M7 7l5 5 5-5"/>
             </svg>
          </div>
        </div>

        {/* --- WHAT WE DO SECTION --- */}
        <div 
          ref={nextSectionRef} 
          className="relative z-20 w-full min-h-screen flex flex-col items-center justify-start pb-32 pt-32 -mt-20 rounded-t-[3rem] border-t border-white/10 shadow-[0_-50px_100px_-20px_rgba(0,0,0,1)] bg-[#080808]"
        >
           {/* Top highlight for 3D effect */}
           <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
           
           <div className="content-wrapper relative w-full max-w-7xl mx-auto px-6 md:px-12">
             <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
                <div>
                  <span className="inline-block py-1 px-3 rounded border border-red-900/30 bg-red-900/10 text-red-500 font-semibold tracking-widest text-xs uppercase mb-6 backdrop-blur-sm">
                    Expertise
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                    What We Do.
                  </h2>
                </div>
                <p className="max-w-md text-gray-400 text-lg leading-relaxed text-right md:text-left">
                  We combine strategy, design, and technology to build brands that matter in a digital-first world.
                </p>
            </div>
            
            <div className="w-full">
              <Skiper58 className="w-full" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
