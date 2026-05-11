/*
 * Design: "Warm Authority" — Editorial Corporativo
 * How It Works: 4-step process with editorial layout
 * Colors: Petrol dark bg with white text, orange accents
 */
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { FileText, Search, Users, BadgeCheck } from "lucide-react";

const TEAM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028752377/fro2PgixhPifRKhNGEgZFN/team-collaboration-jVK3nnJtBypceDjvNT5vwE.webp";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Manifestação de Interesse",
    description:
      "Preencha o formulário online indicando seu interesse no modelo Indicador de Negócios. É rápido e sem compromisso.",
  },
  {
    icon: Search,
    number: "02",
    title: "Análise pela Gluotech",
    description:
      "Nossa equipe avalia o fit estratégico em até 5 dias úteis e entra em contato para os próximos passos.",
  },
  {
    icon: Users,
    number: "03",
    title: "Reunião de Alinhamento",
    description:
      "Apresentação detalhada do programa, esclarecimento de dúvidas e definição do Perfil de Cliente Ideal (ICP).",
  },
  {
    icon: BadgeCheck,
    number: "04",
    title: "Formalização e Início",
    description:
      "Assinatura do contrato digital e início da parceria. Onboarding completo em cerca de 1 semana.",
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="como-funciona" className="relative py-20 md:py-28 bg-[#1B3A4B] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-10">
        <img
          src={TEAM_IMG}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-[#1B3A4B]/95" />

      <div className="relative container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#E8491D] font-semibold text-sm tracking-widest uppercase font-sans">
            Passo a Passo
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-white mt-4 leading-tight">
            Como funciona a parceria?
          </h2>
          <p className="text-lg text-white/60 mt-4 max-w-2xl mx-auto font-sans leading-relaxed">
            Da manifestação de interesse ao início das indicações em apenas 4 passos simples.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                className="relative"
              >
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+32px)] w-[calc(100%-64px)] h-[2px] bg-gradient-to-r from-[#E8491D]/40 to-[#E8491D]/10" />
                )}

                <div className="text-center">
                  {/* Number + Icon */}
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#E8491D]/15 border border-[#E8491D]/25 mb-6">
                    <Icon className="h-8 w-8 text-[#E8491D]" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#E8491D] text-white text-xs font-bold flex items-center justify-center font-mono">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-serif">
                    {step.title}
                  </h3>
                  <p className="text-white/55 text-[15px] leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
