import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Camera, Palette, Clock } from "lucide-react";

export const CustomStudioTeaser = () => {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_40%,#7EDAF215,transparent_45%),radial-gradient(circle_at_85%_60%,#7EDAF210,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#7EDAF2]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#7EDAF2]" />
              <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#7EDAF2]">
                XOK&apos;S® Custom Studio
              </span>
            </div>

            <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] uppercase text-white">
              Design your <br />
              <span className="text-[#7EDAF2] italic">Identity.</span>
            </h2>

            <p className="mt-6 text-zinc-400 max-w-md text-base">
              Cria umas caneleiras únicas com o teu nome, número e as tuas fotografias.
              Sem stock, sem repetições — só a tua história em fibra de carbono.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { icon: Palette, label: "3 tipos de carbono" },
                { icon: Camera, label: "Até 4 fotografias" },
                { icon: Clock, label: "Preview em 48h" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-300"
                >
                  <s.icon className="w-3 h-3 text-[#7EDAF2]" />
                  <span className="font-semibold">{s.label}</span>
                </div>
              ))}
            </div>

            <Link
              to="/custom-studio"
              data-testid="home-custom-studio-cta"
              className="cta-glow mt-8 inline-flex items-center gap-2 bg-[#7EDAF2] hover:bg-[#A5E8F7] text-black font-bold px-8 py-4 rounded-full uppercase tracking-widest text-sm transition-colors"
            >
              Explorar Custom Studio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right: visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] group">
              <img
                src="https://customer-assets-lqy194kg.emergentagent.net/job_xoks-shin-guards/artifacts/mk5elhi1_Captura%20de%20ecr%C3%A3%202026-08-24%20192818.png"
                alt="XOK'S Custom Studio"
                className="absolute inset-0 w-full h-full object-contain bg-[#FEFEFE] opacity-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7EDAF2]">Studio Pro</p>
                <p className="font-display text-2xl uppercase text-white leading-tight mt-1">
                  Até 4 fotos <br /> personalizadas
                </p>
              </div>
            </div>

            {/* Floating pill */}
            <div className="absolute -top-3 -right-3 bg-black border border-[#7EDAF2]/30 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur">
              <span className="text-[#7EDAF2]">Desde</span> 92,90 €
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
