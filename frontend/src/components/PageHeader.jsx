import React from "react";
import { motion } from "framer-motion";

export const PageHeader = ({ eyebrow, title, subtitle, accentWord }) => {
  const renderTitle = () => {
    if (!accentWord) return title;
    const parts = title.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="text-[#7EDAF2]">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 border-b border-white/5 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-10 right-0 w-[50vw] h-[50vw] max-w-[560px] max-h-[560px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(126,218,242,0.10), transparent 65%)" }}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow && (
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#7EDAF2]">{eyebrow}</span>
          )}
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.85] uppercase text-white mt-3">
            {renderTitle()}
          </h1>
          {subtitle && <p className="text-lg text-zinc-400 max-w-2xl mt-6 leading-relaxed">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
};
