import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, Trophy, Target, TrendingUp, Users, DollarSign, Sparkles,
  ShieldCheck, Crown, ArrowRight, CheckCircle2, Zap, Heart, Calendar,
  Brain, Rocket, BarChart3, Eye, Wallet, Star, MessageCircle, Activity,
  Timer, Frown, Gauge, Medal, Lightbulb, Compass, Flag, Radio, X,
} from "lucide-react";
import {
  RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, Tooltip, CartesianGrid,
} from "recharts";

type Option = { label: string; value: string; icon: React.ReactNode };
type Question = {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  badge: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: "team",
    title: "Qual time faz seu coração bater mais forte?",
    subtitle: "Aquele que te tira do sério, te faz chorar e gritar.",
    icon: <Heart className="size-5 text-rose-400" />,
    badge: "Paixão",
    options: [
      { label: "Flamengo", value: "fla", icon: <img src="/escudos/Flamengo.png" alt="Flamengo" className="size-8 object-contain" /> },
      { label: "Corinthians", value: "cor", icon: <img src="/escudos/Corinthians.png" alt="Corinthians" className="size-8 object-contain" /> },
      { label: "Palmeiras", value: "pal", icon: <img src="/escudos/Palmeiras.png" alt="Palmeiras" className="size-8 object-contain" /> },
      { label: "Santos", value: "san", icon: <img src="/escudos/Santos.png" alt="Santos" className="size-8 object-contain" /> },
      { label: "São Paulo", value: "sao", icon: <img src="/escudos/SaoPaulo.png" alt="São Paulo" className="size-8 object-contain" /> },
      { label: "Outro grande do Brasil", value: "outro", icon: <Trophy className="size-5 text-yellow-400" /> },
    ],
  },
  {
    id: "passion",
    title: "Como você vive o futebol?",
    subtitle: "Seja honesto — o quiz é o seu espelho.",
    icon: <Flame className="size-5 text-orange-400" />,
    badge: "Intensidade",
    options: [
      { label: "Sou fanático, vivo cada jogo", value: "fanatic", icon: <Flame className="size-5 text-orange-400" /> },
      { label: "Acompanho com paixão de torcedor", value: "passionate", icon: <Heart className="size-5 text-rose-400" /> },
      { label: "Gosto e quero entender mais", value: "curious", icon: <Brain className="size-5 text-cyan-400" /> },
    ],
  },
  {
    id: "frequency",
    title: "Quantos jogos você assiste por semana?",
    icon: <Calendar className="size-5 text-blue-400" />,
    badge: "Imersão",
    options: [
      { label: "Mais de 5 jogos", value: "5+", icon: <Radio className="size-5 text-emerald-400" /> },
      { label: "Entre 2 e 5 jogos", value: "2-5", icon: <Eye className="size-5 text-yellow-400" /> },
      { label: "Apenas do meu time", value: "1", icon: <Flag className="size-5 text-rose-400" /> },
    ],
  },
  {
    id: "bets",
    title: "Você já faz apostas esportivas?",
    icon: <Target className="size-5 text-emerald-400" />,
    badge: "Experiência",
    options: [
      { label: "Sim, aposto toda semana", value: "active", icon: <Zap className="size-5 text-yellow-400" /> },
      { label: "Aposto de vez em quando", value: "sometimes", icon: <Target className="size-5 text-emerald-400" /> },
      { label: "Ainda não, mas quero começar", value: "starting", icon: <Rocket className="size-5 text-cyan-400" /> },
      { label: "Nunca apostei", value: "never", icon: <Sparkles className="size-5 text-white" /> },
    ],
  },
  {
    id: "earned",
    title: "Quanto você já ganhou apostando?",
    subtitle: "Conta a real — vamos te dar uma referência.",
    icon: <Wallet className="size-5 text-amber-400" />,
    badge: "Histórico",
    options: [
      { label: "Mais de R$ 10.000", value: "10k+", icon: <Crown className="size-5 text-yellow-400" /> },
      { label: "Entre R$ 1.000 e R$ 10.000", value: "1k-10k", icon: <TrendingUp className="size-5 text-emerald-400" /> },
      { label: "Até R$ 1.000", value: "lt-1k", icon: <DollarSign className="size-5 text-white" /> },
      { label: "Ainda não comecei", value: "0", icon: <Target className="size-5 text-white/70" /> },
    ],
  },
  {
    id: "pain",
    title: "Qual sua maior dor hoje nas apostas?",
    icon: <Frown className="size-5 text-rose-400" />,
    badge: "Diagnóstico",
    options: [
      { label: "Aposto no feeling e perco", value: "feeling", icon: <Flame className="size-5 text-rose-400" /> },
      { label: "Não tenho análise confiável", value: "no-data", icon: <BarChart3 className="size-5 text-yellow-400" /> },
      { label: "Falta disciplina e estratégia", value: "no-strategy", icon: <ShieldCheck className="size-5 text-emerald-400" /> },
      { label: "Estou começando agora", value: "newbie", icon: <Rocket className="size-5 text-cyan-400" /> },
    ],
  },
  {
    id: "goal",
    title: "Quanto você quer ganhar por mês?",
    icon: <Gauge className="size-5 text-cyan-400" />,
    badge: "Objetivo",
    options: [
      { label: "R$ 20.000+ — quero viver disso", value: "20k", icon: <Crown className="size-5 text-yellow-400" /> },
      { label: "R$ 5.000 a R$ 20.000", value: "5-20k", icon: <Rocket className="size-5 text-emerald-400" /> },
      { label: "R$ 1.000 a R$ 5.000 extras", value: "1-5k", icon: <TrendingUp className="size-5 text-cyan-400" /> },
      { label: "Quero aprender primeiro", value: "learn", icon: <Lightbulb className="size-5 text-white/80" /> },
    ],
  },
  {
    id: "commitment",
    title: "Quanto tempo você dedicaria por dia?",
    subtitle: "Os melhores resultados vêm de quem se compromete.",
    icon: <Timer className="size-5 text-violet-400" />,
    badge: "Disciplina",
    options: [
      { label: "1h+ por dia, estou pronto", value: "1h", icon: <Flame className="size-5 text-orange-400" /> },
      { label: "30 min — quero resultado real", value: "30m", icon: <Zap className="size-5 text-yellow-400" /> },
      { label: "15 min com análises prontas", value: "15m", icon: <BarChart3 className="size-5 text-emerald-400" /> },
    ],
  },
  {
    id: "community",
    title: "Quer fazer parte da comunidade VIP?",
    subtitle: "Os melhores analistas e torcedores fanáticos estão lá dentro.",
    icon: <Medal className="size-5 text-yellow-400" />,
    badge: "Comunidade",
    options: [
      { label: "Sim, quero entrar agora", value: "yes-now", icon: <ShieldCheck className="size-5 text-emerald-400" /> },
      { label: "Sim, se for de verdade", value: "yes-real", icon: <CheckCircle2 className="size-5 text-yellow-400" /> },
      { label: "Quero conhecer primeiro", value: "explore", icon: <Compass className="size-5 text-cyan-400" /> },
    ],
  },
];

const CHART_DATA = [
  { label: "Paixão", v: 95 },
  { label: "Análise", v: 88 },
  { label: "Estratégia", v: 92 },
  { label: "Disciplina", v: 84 },
  { label: "Visão", v: 90 },
];

export function QuizModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;
  const progress = done ? 100 : (step / total) * 100;

  const select = (val: string) => {
    const q = QUESTIONS[step];
    const next = { ...answers, [q.id]: val };
    setAnswers(next);
    setTimeout(() => {
      if (step + 1 >= total) setDone(true);
      else setStep(step + 1);
    }, 240);
  };

  const handleClose = () => {
    onClose();
    // Reset após animação de saída
    setTimeout(() => {
      setStep(0);
      setAnswers({});
      setDone(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 grid place-items-center size-10 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <X className="size-5" />
            </button>

            {/* Quiz Content */}
            <div className="glass-card rounded-3xl p-5 sm:p-10 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px animate-shimmer" />

              {/* Progress */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3 pr-12">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-white/60">
                  <Sparkles className="size-3.5 sm:size-4 text-emerald-400" />
                  {done ? "Resultado" : `Pergunta ${step + 1}/${total}`}
                </div>
                <div className="text-[10px] sm:text-xs text-white/50 font-mono">{Math.round(progress)}%</div>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-6 sm:mb-8">
                <motion.div
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg,#00c853,#00ff88)" }}
                />
              </div>

              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.div
                    key={QUESTIONS[step].id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex items-center gap-3 mb-3 text-emerald-400">
                      <span className="grid place-items-center size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 shrink-0">
                        {QUESTIONS[step].icon}
                      </span>
                      <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold">
                        {QUESTIONS[step].badge}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gradient-white mb-2 leading-tight">
                      {QUESTIONS[step].title}
                    </h3>
                    {QUESTIONS[step].subtitle && (
                      <p className="text-white/60 mb-6 sm:mb-8 text-sm sm:text-base">
                        {QUESTIONS[step].subtitle}
                      </p>
                    )}
                    <div className="grid gap-2.5 sm:gap-3">
                      {QUESTIONS[step].options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => select(opt.value)}
                          className="group flex items-center justify-between gap-3 sm:gap-4 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-left
                                     bg-white/[0.03] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/50
                                     transition-all hover:translate-x-1 active:scale-[0.99]"
                        >
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <span className="grid place-items-center size-10 sm:size-11 rounded-xl bg-black/60 border border-white/10 group-hover:border-emerald-500/40 transition shrink-0">
                              {opt.icon}
                            </span>
                            <span className="font-medium text-white text-sm sm:text-base md:text-lg leading-snug">
                              {opt.label}
                            </span>
                          </div>
                          <ArrowRight className="size-5 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-1 transition shrink-0" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <ResultView answers={answers} />
                )}
              </AnimatePresence>
            </div>

            {!done && <LiveActivity compact />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------- Live social proof -------------- */
const NAMES = [
  "João S.", "Carlos M.", "Pedro R.", "Lucas A.", "Rafael T.", "Felipe O.",
  "Bruno C.", "Gabriel F.", "Matheus L.", "Diego P.", "Thiago V.", "André N.",
  "Vinícius B.", "Rodrigo H.", "Eduardo K.", "Marcos D.",
];
const CITIES = ["SP", "RJ", "BH", "POA", "CWB", "REC", "SSA", "FOR", "BSB", "MAN"];

function LiveActivity({ compact }: { compact?: boolean }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setIdx((v) => v + 1), 3200);
    return () => clearInterval(i);
  }, []);
  const name = NAMES[idx % NAMES.length];
  const city = CITIES[(idx + 3) % CITIES.length];
  const ago = (idx % 9) + 1;

  return (
    <div className={`mt-${compact ? 4 : 6} flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-card text-xs sm:text-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            <span className="relative rounded-full size-2 bg-emerald-400" />
          </span>
          <MessageCircle className="size-3.5 text-emerald-400" />
          <span className="text-white/80">
            <span className="font-semibold text-white">{name}</span> de {city} respondendo agora · há {ago}s
          </span>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-card text-xs sm:text-sm">
        <div className="flex -space-x-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="size-5 rounded-full border-2 border-black"
              style={{
                background: `linear-gradient(135deg, hsl(${140 + i * 12} 70% 45%), hsl(${110 + i * 10} 70% 35%))`,
              }}
            />
          ))}
        </div>
        <span className="text-white/80">
          <span className="font-bold text-emerald-400">+12.847</span> já fizeram o teste
        </span>
      </div>
    </div>
  );
}

/* -------------- Result -------------- */
function ResultView({ answers }: { answers: Record<string, string> }) {
  const filled = Object.keys(answers).length;
  const score = Math.min(99, 82 + filled * 2);
  const radial = [{ name: "Score", value: score, fill: "#00ff88" }];

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 180 }}
        className="mx-auto mb-5 grid place-items-center size-20 sm:size-24 rounded-full glow-green"
        style={{ background: "linear-gradient(135deg,#00c853,#00ff88)" }}
      >
        <CheckCircle2 className="size-12 sm:size-14 text-black" strokeWidth={2.5} />
      </motion.div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-4">
        <Crown className="size-3.5" /> Torcedor Aprovado
      </div>

      <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 leading-tight">
        <span className="text-gradient-green">Você foi aprovado</span>
        <br />
        <span className="text-white">para a Análise Restrita</span>
      </h3>

      <p className="text-white/65 max-w-xl mx-auto mb-6 text-sm sm:text-base px-2">
        Seu perfil bate com o grupo seleto de torcedores fanáticos e analistas vencedores.
        Acesso VIP liberado para você.
      </p>

      {/* CTA — ABAIXO DO TEXTO, ACIMA DOS GRÁFICOS */}
      <div className="flex flex-col items-center justify-center mb-8">
        <a
          href="https://seu-app.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="btn-primary inline-flex items-center justify-center gap-3 rounded-full px-7 sm:px-12 py-4 sm:py-5 text-sm sm:text-lg animate-pulse-ring w-full sm:w-auto"
        >
          <Crown className="size-5" />
          <span>Liberar meu acesso ao app</span>
          <ArrowRight className="size-5" />
        </a>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/60">
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="size-7 rounded-full border-2 border-black"
                style={{
                  background: `linear-gradient(135deg, hsl(${140 + i * 12} 70% 45%), hsl(${110 + i * 10} 70% 35%))`,
                }}
              />
            ))}
          </div>
          <span className="text-center">
            <span className="font-bold text-emerald-400">+12.847</span> torcedores já garantiram o acesso
          </span>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
          <span className="ml-1 text-xs text-white/60">4.9 de avaliação</span>
        </div>
      </div>

      {/* GRÁFICOS — ABAIXO DO CTA */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-7">
        <div className="glass-card rounded-2xl p-4 sm:p-5 relative">
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 mb-2 text-left">Compatibilidade VIP</div>
          <div className="relative h-40 sm:h-44">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="72%" outerRadius="100%" data={radial} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "rgba(255,255,255,0.06)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-3xl sm:text-4xl font-black text-gradient-green">{score}%</div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50">match VIP</div>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-4 sm:p-5">
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 mb-2 text-left">Seu perfil de torcedor</div>
          <div className="h-40 sm:h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA} margin={{ top: 10, right: 4, left: -28, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(0,255,136,0.06)" }}
                  contentStyle={{ background: "#0a0a0a", border: "1px solid rgba(0,255,136,0.3)", borderRadius: 12, fontSize: 12 }}
                />
                <Bar dataKey="v" fill="url(#barG)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00ff88" />
                    <stop offset="100%" stopColor="#009C3B" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bullets — ABAIXO DOS GRÁFICOS */}
      <div className="grid sm:grid-cols-3 gap-2.5 text-left">
        {[
          { i: <BarChart3 className="size-4 text-emerald-400" />, t: "Análises ao vivo dos melhores jogos" },
          { i: <Users className="size-4 text-emerald-400" />, t: "Comunidade VIP de fanáticos" },
          { i: <ShieldCheck className="size-4 text-emerald-400" />, t: "Estratégias validadas e seguras" },
        ].map((b, i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 bg-white/[0.03] border border-white/10">
            {b.i}
            <span className="text-xs sm:text-sm text-white/80">{b.t}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}