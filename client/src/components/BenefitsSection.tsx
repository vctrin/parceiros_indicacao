/*
 * Design: "Warm Authority" — Editorial Corporativo
 * Benefits: Cards with icons, alternating layout
 * Colors: White cards on warm-gray bg, orange accents
 */
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Repeat,
  DollarSign,
  Shield,
  Headphones,
  BookOpen,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    icon: Repeat,
    title: "Comissão Recorrente Vitalícia",
    description:
      "Receba 15% sobre a mensalidade do cliente indicado durante os primeiros 12 meses de contrato. Enquanto o cliente permanecer ativo, sua parceria gera valor.",
    highlight: "15% por 12 meses",
  },
  {
    icon: DollarSign,
    title: "Zero Investimento Inicial",
    description:
      "Não exigimos nenhuma taxa de adesão ou investimento para começar. Você entra no programa sem custo e começa a indicar imediatamente.",
    highlight: "Sem taxas",
  },
  {
    icon: Shield,
    title: "Processo 100% pela GluoTech",
    description:
      "Todo o processo comercial — apresentação, negociação e fechamento — é conduzido pela nossa equipe de vendas. Você foca apenas na indicação.",
    highlight: "Você só indica",
  },
  {
    icon: TrendingUp,
    title: "Bônus sobre Implantação",
    description:
      "Além da comissão recorrente, receba um bônus fixo de 10% sobre a taxa de implantação cobrada pela GluoTech em cada cliente indicado.",
    highlight: "10% de bônus",
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    description:
      "Conte com suporte técnico e comercial dedicado para tirar dúvidas e apoiar suas indicações. Implantação e qualidade são garantidas pela GluoTech.",
    highlight: "Suporte completo",
  },
  {
    icon: BookOpen,
    title: "Materiais e Treinamento",
    description:
      "Receba materiais de vendas completos e treinamento sobre o Gluo CRM para facilitar suas indicações com confiança e conhecimento.",
    highlight: "Capacitação inclusa",
  },
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="beneficios" className="py-20 md:py-28 bg-white">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#E8491D] font-semibold text-sm tracking-widest uppercase font-sans">
            Vantagens Exclusivas
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-[#1A1A1A] mt-4 leading-tight">
            Por que ser um parceiro?
          </h2>
          <p className="text-lg text-[#1A1A1A]/60 mt-4 max-w-2xl mx-auto font-sans leading-relaxed">
            Um modelo de parceria pensado para quem quer gerar receita indicando
            oportunidades qualificadas, sem a complexidade de vender.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group relative bg-[#FAFAF7] rounded-xl p-7 border border-[#E8E6E1] hover:border-[#E8491D]/30 hover:shadow-[0_8px_30px_rgba(232,73,29,0.08)] transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-[#E8491D]/10 flex items-center justify-center mb-5 group-hover:bg-[#E8491D]/15 transition-colors">
                  <Icon className="h-6 w-6 text-[#E8491D]" />
                </div>

                {/* Highlight badge */}
                <span className="inline-block px-3 py-1 bg-[#1B3A4B]/8 text-[#1B3A4B] text-xs font-bold rounded-full mb-3 font-mono tracking-wide">
                  {benefit.highlight}
                </span>

                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 font-serif">
                  {benefit.title}
                </h3>
                <p className="text-[#1A1A1A]/65 text-[15px] leading-relaxed font-sans">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
