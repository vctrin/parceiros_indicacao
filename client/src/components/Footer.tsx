/*
 * Design: "Warm Authority" — Editorial Corporativo
 * Footer: Clean, minimal with contact info and branding
 * Colors: Dark bg, white text, orange accents
 */
import { Mail, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] py-14">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-white font-sans">
              glu<span className="text-[#E8491D]">o</span>tech.
            </span>
            <p className="text-white/40 text-sm mt-3 font-sans leading-relaxed max-w-xs">
              Gluo CRM — Solução que se adapta 100% ao seu processo de vendas.
              Desenvolvido para empresas B2B.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4 font-sans">
              Equipe de Parcerias
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:valmir@gluotech.com"
                className="flex items-center gap-3 text-white/50 hover:text-[#E8491D] transition-colors text-sm font-sans"
              >
                <Mail className="h-4 w-4 shrink-0" />
                valmir@gluotech.com
              </a>
              <a
                href="tel:+554132039951"
                className="flex items-center gap-3 text-white/50 hover:text-[#E8491D] transition-colors text-sm font-sans"
              >
                <Phone className="h-4 w-4 shrink-0" />
                (41) 3203-9951
              </a>
              <a
                href="https://wa.me/5541998977507"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-[#E8491D] transition-colors text-sm font-sans"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                (41) 99897-7507
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4 font-sans">
              Links
            </h4>
            <div className="space-y-3">
              <a
                href="https://gluotech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/50 hover:text-[#E8491D] transition-colors text-sm font-sans"
              >
                Site GluoTech
              </a>
              <a
                href="https://parceiros.gluotech.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/50 hover:text-[#E8491D] transition-colors text-sm font-sans"
              >
                Portal do Parceiro
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs font-sans">
            &copy; {new Date().getFullYear()} GluoTech. Todos os direitos reservados.
          </p>
          <p className="text-white/20 text-xs font-sans">
            Programa de Parceria — Versão 1.0 — Abril 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
