import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Crown, Users, Star, Target, ArrowRight } from "lucide-react";
import logoUrl from "@/assets/logoanalise.png";
import { QuizModal } from "@/components/QuizModal";
import { FlagsMarquee } from "@/components/FlagsMarquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Análise Restrita — Qual tipo de torcedor você é?" },
      {
        name: "description",
        content:
          "Quiz exclusivo para torcedores fanáticos. Descubra seu perfil e desbloqueie acesso à comunidade VIP de análises esportivas.",
      },
      { property: "og:title", content: "Análise Restrita — Quiz do Torcedor" },
      {
        property: "og:description",
        content: "Descubra seu perfil de torcedor e libere o acesso ao app.",
      },
      { tag: "link", rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { tag: "link", rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { tag: "link", rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { tag: "link", rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { tag: "link", rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  component: Home,
});

function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-aurora">
      {/* grid pattern */}
      <div className="pointer-events-none absolute inset-0 grid-pattern" />

      {/* glow orbs */}
      <div
        className="pointer-events-none absolute top-1/4 -left-32 size-96 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, #00ff88, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-32 size-96 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, #00c853, transparent 70%)" }}
      />

      {/* Nav */}
      <header className="relative z-20 mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative size-10 rounded-full overflow-hidden border border-emerald-500/40">
            <img src={logoUrl} alt="Análise Restrita" className="size-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-wide text-white">ANÁLISE</div>
            <div className="text-xs font-bold text-gradient-green -mt-0.5">RESTRITA</div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs text-white/70">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Acesso VIP aberto
        </div>
      </header>

      {/* Hero + Logo */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-8 pb-6 sm:pt-12 sm:pb-8 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto mb-6 size-40 sm:size-52"
        >
          {/* Rotating ring */}
          <div
            className="absolute inset-0 rounded-full animate-spin-slow"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, #00ff88 25%, transparent 50%, #FFD700 75%, transparent 100%)",
              padding: 2,
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          {/* Glow */}
          <div className="absolute inset-2 rounded-full glow-green animate-pulse-ring" />
          {/* Logo */}
          <div className="absolute inset-3 rounded-full overflow-hidden border border-white/10 bg-black animate-float-slow">
            <img src={logoUrl} alt="Análise Restrita" className="size-full object-cover" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs sm:text-sm font-semibold text-white/80 mb-5"
        >
          <Crown className="size-4 text-yellow-400" />
          Análises exclusivas do seu time do coração
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl mx-auto"
        >
          <span className="text-gradient-white">Qual tipo de</span>
          <br />
          <span className="text-gradient-green">torcedor você é?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 mx-auto max-w-2xl text-base sm:text-lg text-white/65"
        >
          Responda o quiz exclusivo e descubra se o seu perfil é compatível com a
          <span className="text-emerald-400 font-semibold"> comunidade VIP </span>
          dos melhores analistas e torcedores fanáticos do Brasil.
        </motion.p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/55">
          <span className="flex items-center gap-1.5"><Star className="size-4 text-yellow-400" /> 2 minutos</span>
          <span className="flex items-center gap-1.5"><Sparkles className="size-4 text-emerald-400" /> Resultado instantâneo</span>
          <span className="flex items-center gap-1.5"><Users className="size-4 text-emerald-400" /> +12.847 aprovados</span>
        </div>
      </section>

      {/* CTA Button — ACIMA DAS BANDEIRAS, encaixado perfeito */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-2 pb-4 sm:pt-4 sm:pb-6">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={() => setModalOpen(true)}
            className="btn-primary group inline-flex items-center justify-center gap-3 rounded-full px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg animate-pulse-ring"
          >
            <Target className="size-5" />
            <span>Iniciar meu teste — é grátis</span>
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
          <p className="mt-3 text-xs sm:text-sm text-white/55">
            ⏱️ 2 minutos · 9 perguntas · Resultado instantâneo
          </p>
        </div>
      </section>

      {/* Flags marquee — ABAIXO DO BOTÃO */}
      <FlagsMarquee />

      {/* Footer */}
      <footer className="relative z-10 mx-auto max-w-7xl px-6 py-10 text-center text-xs text-white/40 border-t border-white/5">
        © {new Date().getFullYear()} Análise Restrita — Comunidade VIP de torcedores fanáticos.
      </footer>

      {/* Quiz Modal — abre ao clicar no botão */}
      <QuizModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}