/*
 * Design: "Warm Authority" — Editorial Corporativo
 * Launch Offer: Urgency-driven CTA section with special offers
 * Colors: Orange gradient bg, white text
 */
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Zap, Gift } from "lucide-react";

export default function LaunchOfferSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8491D] via-[#D43E15] to-[#B8320F]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTMwVjBoLTEydjRoMTJ6TTI0IDI0aDEydi0ySDI0djJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

      <div className="relative container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 rounded-full mb-6 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-white" />
            <span className="text-white/90 text-sm font-semibold font-sans">
              Ofertas válidas até outubro de 2026
            </span>
          </div>

          <h2 className="text-3xl md:text-[48px] font-bold text-white leading-tight max-w-3xl mx-auto">
            Ofertas Especiais de Lançamento
          </h2>
          <p className="text-lg text-white/75 mt-5 max-w-2xl mx-auto font-sans leading-relaxed">
            Condições exclusivas para os primeiros parceiros que ingressarem no programa
            durante os primeiros 6 meses.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto"
        >
          {/* Super Commission */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-7 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white font-serif">
                Super Comissão
              </h3>
            </div>
            <p className="text-white/70 text-[15px] font-sans leading-relaxed mb-4">
              Os primeiros <strong className="text-white">10 parceiros</strong> recebem{" "}
              <strong className="text-white">30% de comissão</strong> sobre o primeiro ano
              do primeiro cliente fechado — o dobro da comissão padrão.
            </p>
            <span className="inline-block px-3 py-1 bg-white/15 text-white text-sm font-bold rounded-full font-mono">
              30% no 1º cliente
            </span>
          </div>

          {/* Campaign */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-7 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white font-serif">
                Campanha de Lançamento
              </h3>
            </div>
            <p className="text-white/70 text-[15px] font-sans leading-relaxed mb-4">
              Nos primeiros 3 meses: <strong className="text-white">desconto de 15%</strong>{" "}
              no primeiro mês para clientes indicados, material exclusivo e campanha de
              email marketing conjunta.
            </p>
            <span className="inline-block px-3 py-1 bg-white/15 text-white text-sm font-bold rounded-full font-mono">
              15% desconto para clientes
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Button
            onClick={() => scrollTo("formulario")}
            size="lg"
            className="bg-white text-[#E8491D] hover:bg-white/90 font-bold text-[17px] px-10 py-6 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all group"
          >
            Garantir minha vaga
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
