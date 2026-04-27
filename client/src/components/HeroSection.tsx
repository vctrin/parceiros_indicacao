/*
 * Design: "Warm Authority" — Editorial Corporativo
 * Hero: Full-bleed image with text overlay, backdrop blur
 * Typography: Playfair Display for heading, Source Sans 3 for body
 */
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028752377/fro2PgixhPifRKhNGEgZFN/hero-partnership-PaiBZER3PsUQXgUWYkUVku.webp";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Parceria de negócios"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/85 via-[#0A0A0A]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#E8491D]/20 border border-[#E8491D]/40 rounded-full text-[#FF8A65] text-sm font-semibold tracking-wide mb-6 backdrop-blur-sm">
              Programa de Parceria
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] font-bold text-white mb-6"
          >
            Indique, conecte e{" "}
            <span className="text-[#E8491D]">ganhe comissões recorrentes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 font-sans font-light max-w-xl"
          >
            Torne-se um Indicador de Negócios da GluoTech e receba até{" "}
            <strong className="text-white font-semibold">15% de comissão recorrente</strong>{" "}
            sobre cada cliente indicado — sem investimento inicial e sem precisar vender.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => scrollTo("formulario")}
              size="lg"
              className="bg-[#E8491D] hover:bg-[#d13d14] text-white font-semibold text-[17px] px-8 py-6 rounded-lg shadow-[0_4px_20px_rgba(232,73,29,0.35)] hover:shadow-[0_6px_28px_rgba(232,73,29,0.5)] transition-all group"
            >
              Quero ser Parceiro
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollTo("programa")}
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-medium text-[17px] px-8 py-6 rounded-lg backdrop-blur-sm"
            >
              Saiba Mais
            </Button>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="mt-14 flex flex-wrap gap-8 md:gap-12"
          >
            {[
              { value: "15%", label: "Comissão Recorrente" },
              { value: "R$ 0", label: "Investimento Inicial" },
              { value: "30%", label: "Super Comissão*" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-[#E8491D] font-mono">
                  {stat.value}
                </span>
                <span className="text-sm text-white/60 mt-1 font-sans">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("programa")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors"
        aria-label="Rolar para baixo"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </motion.button>
    </section>
  );
}
