// Real country flags via flagcdn.com (SVG) — reliable cross-platform rendering
const FLAGS: { code: string; name: string }[] = [
  { code: "br", name: "Brasil" },
  { code: "ar", name: "Argentina" },
  { code: "fr", name: "França" },
  { code: "de", name: "Alemanha" },
  { code: "es", name: "Espanha" },
  { code: "pt", name: "Portugal" },
  { code: "it", name: "Itália" },
  { code: "gb", name: "Inglaterra" },
  { code: "nl", name: "Holanda" },
  { code: "be", name: "Bélgica" },
  { code: "uy", name: "Uruguai" },
  { code: "co", name: "Colômbia" },
  { code: "cl", name: "Chile" },
  { code: "mx", name: "México" },
  { code: "us", name: "EUA" },
  { code: "jp", name: "Japão" },
  { code: "kr", name: "Coreia" },
  { code: "ma", name: "Marrocos" },
  { code: "sn", name: "Senegal" },
  { code: "ci", name: "Costa do Marfim" },
  { code: "ch", name: "Suíça" },
  { code: "hr", name: "Croácia" },
  { code: "dk", name: "Dinamarca" },
  { code: "pl", name: "Polônia" },
  { code: "ec", name: "Equador" },
  { code: "pe", name: "Peru" },
  { code: "py", name: "Paraguai" },
  { code: "ca", name: "Canadá" },
];

export function FlagsMarquee() {
  const loop = [...FLAGS, ...FLAGS];
  return (
    <div className="relative w-full overflow-hidden py-5 sm:py-6 border-y border-white/5 bg-black/50">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10"
        style={{ background: "linear-gradient(90deg, #000 20%, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10"
        style={{ background: "linear-gradient(-90deg, #000 20%, transparent)" }}
      />
      <div className="flex w-max animate-marquee gap-3 sm:gap-4">
        {loop.map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full glass-card whitespace-nowrap shrink-0"
          >
            <span className="relative block w-7 h-5 sm:w-8 sm:h-6 rounded-[3px] overflow-hidden ring-1 ring-white/10 shrink-0">
              <img
                src={`https://flagcdn.com/w80/${f.code}.png`}
                srcSet={`https://flagcdn.com/w160/${f.code}.png 2x`}
                alt={f.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white/85 tracking-wide">
              {f.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
