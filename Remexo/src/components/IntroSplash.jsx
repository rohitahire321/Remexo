import React, { useState, useEffect } from "react";

export default function IntroSplash({ onFinish }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 2300);
    const doneTimer = setTimeout(() => onFinish(), 2900);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  const handleSkip = () => {
    setExiting(true);
    setTimeout(() => onFinish(), 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 text-center text-white transition-all duration-700 ${
        exiting ? "pointer-events-none -translate-y-6 opacity-0" : "opacity-100"
      }`}
    >
      {/* Responsive Ambient Yellow Glow */}
      <div className="absolute h-56 w-56 rounded-full bg-yellow-500/20 blur-3xl sm:h-72 sm:w-72" />

      {/* Animated Equalizer Bars */}
      <div className="relative mb-5 flex h-10 items-end gap-1.5 sm:mb-6 sm:h-12">
        <span
          className="eq-bar h-8 w-1.5 rounded-full bg-[#FFF44F] sm:h-10"
          style={{ animationDelay: "0s" }}
        />
        <span
          className="eq-bar h-10 w-1.5 rounded-full bg-yellow-400 sm:h-12"
          style={{ animationDelay: "0.2s" }}
        />
        <span
          className="eq-bar h-7 w-1.5 rounded-full bg-amber-400 sm:h-8"
          style={{ animationDelay: "0.4s" }}
        />
        <span
          className="eq-bar h-9 w-1.5 rounded-full bg-yellow-300 sm:h-11"
          style={{ animationDelay: "0.15s" }}
        />
        <span
          className="eq-bar h-8 w-1.5 rounded-full bg-[#FFF44F] sm:h-9"
          style={{ animationDelay: "0.35s" }}
        />
      </div>

      {/* Main Brand Headline */}
      <h1 className="animate-fade-up relative bg-gradient-to-r from-[#FFF44F] via-yellow-300 to-yellow-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl">
        Remexo
      </h1>

      {/* Responsive Subtitle */}
      <p className="animate-fade-up-delay relative mt-3 max-w-xs text-base font-medium tracking-wide text-yellow-400 sm:max-w-none sm:text-2xl">
        Welcome to the World of Music
      </p>

      {/* Mobile-Friendly Tap-to-Enter Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="relative mt-8 cursor-pointer rounded-full border border-yellow-500/30 bg-zinc-900/90 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-yellow-300 transition hover:border-[#FFF44F] hover:text-[#FFF44F] sm:mt-10"
      >
        Enter Now →
      </button>
    </div>
  );
}
