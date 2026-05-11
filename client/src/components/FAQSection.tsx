/*
 * Design: "Warm Authority" — Editorial Corporativo
 * FAQ: Accordion style with clean typography
 * Colors: White bg, petrol accents, orange on hover
 */
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Preciso fazer algum investimento inicial para me tornar parceiro?",
    answer:
      "Não. O Programa não exige investimento ou taxas de adesão. Você entra sem custo e começa a indicar imediatamente após a formalização.",
  },
  {
    question: "O Indicador de Negócios precisa participar de reuniões com o cliente?",
    answer:
      "Não. Todo o processo comercial (apresentação, negociação e fechamento) é conduzido pela equipe de vendas da Gluotech. O Indicador precisa apenas registrar o lead qualificado na plataforma.",
  },
  {
    question: "Posso começar como Indicador e depois me tornar Revendedor?",
    answer:
      "Sim. O Indicador de Negócios é o modelo de entrada. A qualquer momento, caso deseje ampliar sua atuação e participar ativamente das vendas, você pode migrar para o modelo de Revendedor, passando pelo processo de capacitação correspondente.",
  },
  {
    question: "Quanto tempo leva para receber a primeira comissão?",
    answer:
      "As comissões são pagas mensalmente até o 10º dia útil do mês subsequente ao recebimento do valor pelo cliente. Ou seja, assim que o cliente indicado começar a pagar, sua comissão é processada no mês seguinte.",
  },
  {
    question: "Qual a validade de uma indicação registrada?",
    answer:
      "A validade inicial da indicação é de 60 dias corridos. Quem registrou primeiro tem direito à comissão. Oportunidades não registradas não geram direito a comissão, mesmo que o parceiro tenha feito contato inicial.",
  },
  {
    question: "Quais são os critérios para manter a parceria ativa?",
    answer:
      "Para manter a parceria ativa, o parceiro deve registrar no mínimo 3 leads qualificados por ano OU manter base ativa de pelo menos 3 clientes indicados.",
  },
];

function FAQItem({ faq, index, isInView }: { faq: typeof faqs[0]; index: number; isInView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
      className="border-b border-[#E8E6E1] last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={open}
      >
        <span className="text-[17px] font-semibold text-[#1A1A1A] pr-8 font-serif group-hover:text-[#E8491D] transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-[#1A1A1A]/40 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180 text-[#E8491D]" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-[#1A1A1A]/65 text-[15px] leading-relaxed font-sans pr-12">
          {faq.answer}
        </p>
      </div>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[#E8491D] font-semibold text-sm tracking-widest uppercase font-sans">
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl md:text-[44px] font-bold text-[#1A1A1A] mt-4 leading-tight">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
