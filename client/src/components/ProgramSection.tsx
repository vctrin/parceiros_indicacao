/*
 * Design: "Warm Authority" — Editorial Corporativo
 * Program Section: Editorial layout with CRM image and description
 * Colors: Off-white bg, petrol accents, orange highlights
 */
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const CRM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028752377/fro2PgixhPifRKhNGEgZFN/crm-dashboard-SeuBLfMAMPdxnEUnjv8e8T.webp";

const features = [
  "Gestão completa de pipeline de vendas",
  "Automação de follow-ups e tarefas comerciais",
  "Dashboards e relatórios gerenciais em tempo real",
  "Integração com email, WhatsApp e telefone",
  "Gestão de propostas e contratos",
  "Aplicativo mobile para equipes em campo",
  "API aberta para integração com ERP e Omnichannel",
];

export default function ProgramSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="programa" className="py-20 md:py-28 bg-[#FAFAF7]">
      <div className="container">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[#E8491D] font-semibold text-sm tracking-widest uppercase font-sans">
            Sobre o Programa
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-[#1A1A1A] mt-4 leading-tight">
            Conheça o Gluo CRM
          </h2>
          <p className="text-lg text-[#1A1A1A]/60 mt-4 max-w-2xl mx-auto font-sans leading-relaxed">
            Uma solução completa de gestão de relacionamento com clientes, desenvolvida
            especificamente para empresas B2B que buscam aumentar a produtividade comercial.
          </p>
        </motion.div>

        {/* Editorial layout: image + text */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <img
                src={CRM_IMG}
                alt="Dashboard do Gluo CRM"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#E8491D]/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#1B3A4B]/10 rounded-xl -z-10" />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-6">
              A solução que se adapta <span className="text-[#E8491D]">100%</span> ao processo de vendas
            </h3>
            <p className="text-[#1A1A1A]/70 text-[17px] leading-relaxed mb-8 font-sans">
              O Gluo CRM é ideal para empresas com equipes de vendas externas, indústrias com
              ciclos de venda complexos, distribuidores B2B e organizações que buscam unificar
              canais de atendimento.
            </p>

            <div className="space-y-3.5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#E8491D] mt-0.5 shrink-0" />
                  <span className="text-[#1A1A1A]/80 text-[16px] font-sans">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
