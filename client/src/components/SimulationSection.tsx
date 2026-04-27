/*
 * Design: "Warm Authority" — Editorial Corporativo
 * Simulation: Financial simulation with editorial infographic style
 * Colors: Warm white bg, orange highlights, petrol for data
 */
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, Coins, Award, Calculator } from "lucide-react";

const GROWTH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028752377/fro2PgixhPifRKhNGEgZFN/business-growth-3nxjwPsotF9gsfYzDBPKFU.webp";

function AnimatedNumber({ target, prefix = "", suffix = "", duration = 1.5 }: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-mono font-bold">
      {prefix}{value.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

export default function SimulationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="simulacao" className="py-20 md:py-28 bg-[#FAFAF7]">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#E8491D] font-semibold text-sm tracking-widest uppercase font-sans">
            Simulação Financeira
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-[#1A1A1A] mt-4 leading-tight">
            Quanto você pode ganhar?
          </h2>
          <p className="text-lg text-[#1A1A1A]/60 mt-4 max-w-2xl mx-auto font-sans leading-relaxed">
            Veja uma simulação real de receita como Indicador de Negócios, baseada no
            Plano Performance Mensal com 10 usuários.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <img
              src={GROWTH_IMG}
              alt="Crescimento financeiro"
              className="w-full h-auto rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
            />
          </motion.div>

          {/* Financial data */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Scenario description */}
            <div className="bg-white rounded-xl p-6 border border-[#E8E6E1] mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Calculator className="h-5 w-5 text-[#1B3A4B]" />
                <span className="font-semibold text-[#1B3A4B] text-sm uppercase tracking-wide font-sans">
                  Cenário
                </span>
              </div>
              <p className="text-[#1A1A1A]/70 text-[15px] font-sans leading-relaxed">
                Indicador de Negócios com <strong className="text-[#1A1A1A]">10 clientes indicados e fechados no ano</strong>,
                cada um no Plano Performance Mensal com 10 usuários.
              </p>
            </div>

            {/* Revenue cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 border border-[#E8E6E1]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Coins className="h-4 w-4 text-[#E8491D]" />
                      <span className="text-sm font-semibold text-[#1A1A1A]/50 uppercase tracking-wide font-sans">
                        Bônus de Implantação
                      </span>
                    </div>
                    <p className="text-xs text-[#1A1A1A]/40 font-sans mt-1">
                      10% sobre R$ 2.500 x 10 clientes
                    </p>
                  </div>
                  <span className="text-2xl text-[#1B3A4B]">
                    <AnimatedNumber target={2500} prefix="R$ " suffix=",00" />
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[#E8E6E1]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-[#E8491D]" />
                      <span className="text-sm font-semibold text-[#1A1A1A]/50 uppercase tracking-wide font-sans">
                        Comissão sobre Mensalidades
                      </span>
                    </div>
                    <p className="text-xs text-[#1A1A1A]/40 font-sans mt-1">
                      15% de R$ 1.180/mês x 12 meses x 10 clientes
                    </p>
                  </div>
                  <span className="text-2xl text-[#1B3A4B]">
                    <AnimatedNumber target={21240} prefix="R$ " suffix=",00" />
                  </span>
                </div>
              </div>

              {/* Total highlight */}
              <div className="bg-gradient-to-r from-[#E8491D] to-[#d13d14] rounded-xl p-6 shadow-[0_8px_30px_rgba(232,73,29,0.25)]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="h-5 w-5 text-white/80" />
                      <span className="text-sm font-semibold text-white/80 uppercase tracking-wide font-sans">
                        Receita Total no Ano
                      </span>
                    </div>
                    <p className="text-xs text-white/50 font-sans mt-1">
                      Apenas indicando leads qualificados
                    </p>
                  </div>
                  <span className="text-3xl text-white">
                    <AnimatedNumber target={23740} prefix="R$ " suffix=",00" />
                  </span>
                </div>
              </div>
            </div>

            {/* Super commission callout */}
            <div className="mt-6 bg-[#FFF8F0] border border-[#E8491D]/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-10 h-10 rounded-lg bg-[#E8491D] text-white font-bold text-lg flex items-center justify-center font-mono">
                  30%
                </span>
                <div>
                  <h4 className="font-bold text-[#1A1A1A] text-[15px] font-serif">
                    Super Comissão no Primeiro Cliente
                  </h4>
                  <p className="text-[#1A1A1A]/60 text-sm font-sans mt-1 leading-relaxed">
                    Os primeiros 10 parceiros recebem 30% de comissão sobre o primeiro
                    ano do primeiro cliente fechado. Oferta válida até outubro de 2026.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
