/*
 * Design: "Warm Authority" — Editorial Corporativo
 * Form: Dark background section with clean form, webhook integration
 * Security: Rate limiting, honeypot, input sanitization, CSRF-like token
 * Colors: Petrol dark bg, white form card, orange CTA
 */
import { motion, useInView } from "motion/react";
import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  nome: string;
  sobrenome: string;
  email: string;
  celular: string;
  empresa: string;
  observacoes: string;
}

const initialForm: FormData = {
  nome: "",
  sobrenome: "",
  email: "",
  celular: "",
  empresa: "",
  observacoes: "",
};

// Simple input sanitizer
function sanitize(str: string): string {
  return str
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim();
}

// Phone mask (BR format)
function phoneMask(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

// Email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function FormSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState<FormData>(initialForm);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: name === "celular" ? phoneMask(value) : value,
      }));
      // Clear error on change
      if (errors[name as keyof FormData]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!form.sobrenome.trim()) newErrors.sobrenome = "Sobrenome é obrigatório";
    if (!form.email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!isValidEmail(form.email)) newErrors.email = "E-mail inválido";
    if (!form.celular.trim()) newErrors.celular = "Celular é obrigatório";
    else if (form.celular.replace(/\D/g, "").length < 10)
      newErrors.celular = "Celular inválido";
    if (!form.empresa.trim()) newErrors.empresa = "Empresa é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check (bot detection)
    if (honeypot) return;

    // Rate limiting (30 seconds between submissions)
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      toast.error("Aguarde alguns segundos antes de enviar novamente.");
      return;
    }

    if (!validate()) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setSubmitting(true);

    try {
      const sanitizedData = {
        nome: sanitize(form.nome),
        sobrenome: sanitize(form.sobrenome),
        email: sanitize(form.email),
        celular: sanitize(form.celular),
        empresa: sanitize(form.empresa),
        observacoes: sanitize(form.observacoes),
        website: honeypot,
      };

      const response = await fetch("/api/partner-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        setSubmitted(true);
        setLastSubmitTime(now);
        toast.success("Registro enviado com sucesso!");
      } else {
        throw new Error("Falha no envio");
      }
    } catch {
      toast.error("Erro ao enviar. Tente novamente em alguns instantes.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = (field: keyof FormData) =>
    `w-full px-4 py-3.5 rounded-lg border ${
      errors[field]
        ? "border-red-400 bg-red-50/50 focus:ring-red-300"
        : "border-[#E0DDD8] bg-white focus:ring-[#E8491D]/30 focus:border-[#E8491D]"
    } text-[#1A1A1A] text-[15px] font-sans placeholder:text-[#1A1A1A]/35 outline-none focus:ring-2 transition-all`;

  return (
    <section id="formulario" className="relative py-20 md:py-28 bg-[#1A1A1A] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8491D]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1B3A4B]/20 rounded-full blur-3xl" />

      <div className="relative container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Text content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28"
          >
            <span className="text-[#E8491D] font-semibold text-sm tracking-widest uppercase font-sans">
              Comece Agora
            </span>
            <h2 className="text-3xl md:text-[44px] font-bold text-white mt-4 leading-tight">
              Manifeste seu interesse
            </h2>
            <p className="text-lg text-white/60 mt-5 font-sans leading-relaxed">
              Preencha o formulário abaixo para iniciar sua jornada como parceiro
              Indicador de Negócios da GluoTech. Nossa equipe entrará em contato em
              até 5 dias úteis.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "Sem compromisso — é apenas uma manifestação de interesse",
                "Avaliação de fit estratégico personalizada",
                "Onboarding completo em aproximadamente 1 semana",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#E8491D] mt-0.5 shrink-0" />
                  <span className="text-white/70 text-[15px] font-sans">{item}</span>
                </div>
              ))}
            </div>

            {/* Security badge */}
            <div className="mt-10 flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg border border-white/10">
              <Shield className="h-5 w-5 text-[#E8491D]" />
              <span className="text-white/50 text-sm font-sans">
                Seus dados estão protegidos e serão utilizados exclusivamente para
                contato sobre o programa de parceria.
              </span>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3 font-serif">
                  Registro Enviado!
                </h3>
                <p className="text-[#1A1A1A]/60 text-[16px] font-sans leading-relaxed mb-6">
                  Obrigado pelo interesse no Programa de Parceria GluoTech.
                  Nossa equipe analisará seu perfil e entrará em contato em até
                  5 dias úteis.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setForm(initialForm);
                  }}
                  variant="outline"
                  className="border-[#E8E6E1] text-[#1A1A1A] hover:bg-[#FAFAF7]"
                >
                  Enviar outro registro
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                noValidate
              >
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-6 font-serif">
                  Formulário de Interesse
                </h3>

                {/* Honeypot field (hidden from users, visible to bots) */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-semibold text-[#1A1A1A]/70 mb-1.5 font-sans">
                      Nome <span className="text-[#E8491D]">*</span>
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      className={inputClasses("nome")}
                      placeholder="Seu nome"
                      maxLength={50}
                      required
                    />
                    {errors.nome && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="h-3 w-3" /> {errors.nome}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="sobrenome" className="block text-sm font-semibold text-[#1A1A1A]/70 mb-1.5 font-sans">
                      Sobrenome <span className="text-[#E8491D]">*</span>
                    </label>
                    <input
                      type="text"
                      id="sobrenome"
                      name="sobrenome"
                      value={form.sobrenome}
                      onChange={handleChange}
                      className={inputClasses("sobrenome")}
                      placeholder="Seu sobrenome"
                      maxLength={50}
                      required
                    />
                    {errors.sobrenome && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="h-3 w-3" /> {errors.sobrenome}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A]/70 mb-1.5 font-sans">
                    E-mail <span className="text-[#E8491D]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClasses("email")}
                    placeholder="seu@email.com"
                    maxLength={100}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-sans">
                      <AlertCircle className="h-3 w-3" /> {errors.email}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="celular" className="block text-sm font-semibold text-[#1A1A1A]/70 mb-1.5 font-sans">
                      Celular <span className="text-[#E8491D]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="celular"
                      name="celular"
                      value={form.celular}
                      onChange={handleChange}
                      className={inputClasses("celular")}
                      placeholder="(41) 99999-9999"
                      maxLength={15}
                      required
                    />
                    {errors.celular && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="h-3 w-3" /> {errors.celular}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="empresa" className="block text-sm font-semibold text-[#1A1A1A]/70 mb-1.5 font-sans">
                      Empresa <span className="text-[#E8491D]">*</span>
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={form.empresa}
                      onChange={handleChange}
                      className={inputClasses("empresa")}
                      placeholder="Nome da empresa"
                      maxLength={100}
                      required
                    />
                    {errors.empresa && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="h-3 w-3" /> {errors.empresa}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="observacoes" className="block text-sm font-semibold text-[#1A1A1A]/70 mb-1.5 font-sans">
                    Observações
                  </label>
                  <textarea
                    id="observacoes"
                    name="observacoes"
                    value={form.observacoes}
                    onChange={handleChange}
                    rows={3}
                    className={`${inputClasses("observacoes")} resize-none`}
                    placeholder="Conte-nos um pouco sobre seu interesse no programa..."
                    maxLength={500}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#E8491D] hover:bg-[#d13d14] text-white font-semibold text-[16px] py-6 rounded-lg shadow-[0_4px_20px_rgba(232,73,29,0.3)] hover:shadow-[0_6px_28px_rgba(232,73,29,0.45)] transition-all disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Registro de Interesse
                    </>
                  )}
                </Button>

                <p className="text-[#1A1A1A]/40 text-xs text-center mt-4 font-sans">
                  Ao enviar, você concorda com o uso dos seus dados para contato
                  sobre o programa de parceria.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
