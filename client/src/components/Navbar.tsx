/*
 * Design: "Warm Authority" — Editorial Corporativo
 * Navbar: Clean, sticky, with GluoTech branding
 * Colors: White bg with subtle shadow, orange accent on CTA
 */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-1 group">
          <span className={`text-2xl md:text-[28px] font-extrabold tracking-tight font-sans transition-colors duration-300 ${
            scrolled ? "text-[#1A1A1A]" : "text-white"
          }`}>
            glu
            <span className="text-[#E8491D]">o</span>
            tech.
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("programa")} className={`text-[15px] font-medium hover:text-[#E8491D] transition-colors ${scrolled ? "text-[#1A1A1A]/70" : "text-white/80"}`}>
            O Programa
          </button>
          <button onClick={() => scrollTo("beneficios")} className={`text-[15px] font-medium hover:text-[#E8491D] transition-colors ${scrolled ? "text-[#1A1A1A]/70" : "text-white/80"}`}>
            Benefícios
          </button>
          <button onClick={() => scrollTo("como-funciona")} className={`text-[15px] font-medium hover:text-[#E8491D] transition-colors ${scrolled ? "text-[#1A1A1A]/70" : "text-white/80"}`}>
            Como Funciona
          </button>
          <button onClick={() => scrollTo("faq")} className={`text-[15px] font-medium hover:text-[#E8491D] transition-colors ${scrolled ? "text-[#1A1A1A]/70" : "text-white/80"}`}>
            FAQ
          </button>
          <Button
            onClick={() => scrollTo("formulario")}
            className="bg-[#E8491D] hover:bg-[#d13d14] text-white font-semibold px-6 py-2.5 rounded-lg shadow-[0_2px_8px_rgba(232,73,29,0.3)] hover:shadow-[0_4px_16px_rgba(232,73,29,0.4)] transition-all"
          >
            Quero ser Parceiro
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 transition-colors ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E8E6E1] shadow-lg">
          <div className="flex flex-col py-4 px-6 gap-1">
            {[
              { id: "programa", label: "O Programa" },
              { id: "beneficios", label: "Benefícios" },
              { id: "como-funciona", label: "Como Funciona" },
              { id: "faq", label: "FAQ" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left py-3 text-[16px] font-medium text-[#1A1A1A]/80 hover:text-[#E8491D] transition-colors border-b border-[#F0EDE8] last:border-0"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("formulario")}
              className="mt-3 bg-[#E8491D] hover:bg-[#d13d14] text-white font-semibold py-3 rounded-lg"
            >
              Quero ser Parceiro
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
