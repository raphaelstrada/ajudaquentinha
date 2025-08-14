import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

// Nav typing
const nav: { to: string; label: string }[] = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/acoes", label: "Ações" },
  { to: "/doar", label: "Doar" },
  { to: "/contato", label: "Contato" },
];

// Section props
type SectionProps = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  tint?: "rose" | "sky" | "emerald";
};

// Card props
type CardProps = {
  title: string;
  desc: string;
};

// Donate card props
type DonateCardProps = {
  title: string;
  body: string;
  footer: React.ReactNode;
};




// tailwind-safe gradient map (avoid template-string class names)
const tintGradients: Record<NonNullable<SectionProps["tint"]>, string> = {
  rose: "from-rose-400 to-rose-200",
  sky: "from-sky-400 to-sky-200",
  emerald: "from-emerald-400 to-emerald-200",
};

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-rose-500/40 selection:text-white">
        <Header />
        <main className="pt-20">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/acoes" element={<Actions />} />
            <Route path="/doar" element={<Donate />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur bg-neutral-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <a href="#/" className="group inline-flex items-center gap-3">
          <img src="/logo.svg" alt="Ajuda Quentinha" className="w-[160px]" />
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `transition hover:text-rose-300 ${isActive ? "text-rose-300" : "text-neutral-300"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <NavLink to="/doar" className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold hover:bg-rose-400 text-white">Doar agora</NavLink>
        </nav>
        <button
        className="md:hidden inline-flex items-center rounded-xl border border-white/15 bg-transparent px-3 py-2 text-neutral-200 appearance-none hover:bg-white/10"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-80">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 ${isActive ? "bg-white/5 text-rose-300" : "text-neutral-300 hover:bg-white/5"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <NavLink to="/doar" onClick={() => setOpen(false)} className="rounded-lg bg-rose-500 px-3 py-2 text-center font-semibold hover:bg-rose-400 text-white">Doar agora</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

function Section({
  kicker,
  title,
  subtitle,
  children,
  tint = "rose",
}: SectionProps) {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-neutral-900/40 to-neutral-950" />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {kicker && (
          <p className="mb-3 text-xs uppercase tracking-wider text-neutral-400">
            {kicker}
          </p>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            <span
              className={`bg-gradient-to-r ${tintGradients[tint]} bg-clip-text text-transparent`}
            >
              {title}
            </span>
          </h2>
        )}
        {subtitle && <p className="mt-3 max-w-2xl text-neutral-300">{subtitle}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <Section
        kicker="Nossa missão"
        title="Quem tem fome, tem pressa"
        subtitle="O Ajuda Quentinha nasceu no sul do Brasil para levar alimento, acolhimento e esperança a pessoas em situação de vulnerabilidade. Com ações mensais, distribuímos marmitas, roupas, kits de higiene e, quando possível, itens para crianças de áreas atingidas por enchentes."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Transparência",
              d: "Operação 100% voluntária. Prestamos contas das ações e dos recursos recebidos.",
            },
            {
              t: "Presença local",
              d: "Atuação em Porto Alegre e região metropolitana, chegando onde a urgência é maior.",
            },
            { t: "Rede solidária", d: "Apoio de amigos, parceiros e doadores no Brasil e no Canadá." },
          ].map((c) => (
            <Card key={c.t} title={c.t} desc={c.d} />
          ))}
        </div>
      </Section>
      <Gallery />
      <CtaDonate />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,63,94,.25),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(244,63,94,.2),transparent_35%)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-24 md:py-36">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-rose-400 to-rose-200 bg-clip-text text-transparent">Ajuda Quentinha</span>
          </h1>
          <p className="mt-5 text-lg text-neutral-300">
            Pequena ONG que distribui refeições e cuidado a quem mais precisa. Cada doação vira comida quente e um gesto de dignidade.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#/doar" className="rounded-2xl bg-rose-500 px-6 py-3 font-semibold text-white hover:bg-rose-400">Doar agora</a>
            <a href="#/sobre" className="rounded-2xl border border-white/15 px-6 py-3 font-semibold text-neutral-200 hover:bg-white/5">Conheça o projeto</a>
          </div>
          <p className="mt-4 text-xs text-neutral-400">De Porto Alegre para quem tem pressa. Juntos somos mais fortes.</p>
        </div>
      </div>
    </section>
  );
}

function ImpactStats() {
  return (
    <Section kicker="Impacto" title="Pequenos gestos, grandes mudanças" subtitle="Números aproximados das nossas ações.">
      <div className="grid gap-6 sm:grid-cols-3">
        {[
          { n: "+1200", l: "marmitas distribuídas/ano" },
          { n: "+300", l: "famílias alcançadas" },
          { n: "100%", l: "trabalho voluntário" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="text-3xl font-extrabold text-white">{s.n}</div>
            <div className="mt-1 text-sm text-neutral-300">{s.l}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Card({ title, desc }: CardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-neutral-300">{desc}</p>
    </div>
  );
}

function Gallery() {
  // Auto-list simple placeholders from /gallery if present
  const [images, setImages] = useState<string[]>([]);     // ← type the state

  useEffect(() => {
    const guesses: string[] = Array.from({ length: 8 }).map((_, i) => `/gallery/${i + 1}.png`);
    setImages(guesses);                                   // ← now valid
  }, []);

  return (
    <Section kicker="Fotos" title="Nossas ações" subtitle="...">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((src) => (
          <div
            key={src}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5"
          >
            <img
              src={src}
              alt="Ação Ajuda Quentinha"
              className="aspect-square h-full w-full object-cover opacity-90 transition hover:opacity-100"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section kicker="Sobre nós" title="Nossa história e propósito" subtitle="Movidos por empatia, atuamos mensalmente levando quentinhas e cuidado a quem mais precisa.">
      <div className="prose prose-invert max-w-none">
        <p>
          O <strong>Ajuda Quentinha</strong> nasceu no sul do Brasil com um objetivo simples e urgente: levar alimento quente, respeito e acolhimento a pessoas em situação de vulnerabilidade. Ao longo do ano, realizamos ações em Porto Alegre e região metropolitana, incluindo cidades vizinhas quando há desastres e enchentes.
        </p>
        <p>
          Com o apoio de amigos e doadores do Brasil e do Canadá, distribuímos marmitas, roupas, kits de higiene e, em datas especiais, brinquedos e materiais escolares para crianças. Nosso trabalho é <strong>100% voluntário</strong> e guiado pela transparência.
        </p>
        <ul>
          <li>Distribuição de marmitas (quentinhas) em ações mensais;</li>
          <li>Resposta solidária a emergências (enchentes, frio intenso);</li>
          <li>Foco em dignidade: comida, escuta e respeito.</li>
        </ul>
        <p><em>Quem tem fome, tem pressa. Juntos somos mais fortes.</em></p>
      </div>
    </Section>
  );
}

function Actions() {
  const timeline = [
    { date: "Jan", text: "Primeira ação do ano — distribuição de marmitas." },
    { date: "Jun", text: "Apoio a cidades afetadas por temporais com roupas e higiene." },
    { date: "Out", text: "Dia das Crianças — kits e brinquedos para comunidades ilhadas." },
    { date: "Dez", text: "Natal solidário — reforço de marmitas e materiais escolares." },
  ];
  return (
    <Section kicker="Ações" title="Como atuamos" subtitle="Exemplos de ações recorrentes; substitua pelos dados reais.">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold">Calendário ilustrativo</h3>
          <ol className="mt-4 space-y-4">
            {timeline.map((t) => (
              <li key={t.date} className="flex gap-4">
                <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-rose-500/30 ring-2 ring-rose-400/40" />
                <div>
                  <div className="text-sm text-neutral-400">{t.date}</div>
                  <div className="text-neutral-100">{t.text}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold">Doação</h3>
          <p className="mt-2 text-neutral-300">
            Clique no link abaixo para doar.
          </p>
          <a href="#/doar" className="mt-4 inline-block rounded-xl bg-rose-500 px-4 py-2 font-semibold text-white hover:bg-rose-400">Quero apoiar</a>
        </div>
      </div>
    </Section>
  );
}




function Donate() {
  return (
    <Section kicker="Doações" title="Sua ajuda vira comida quente" subtitle="Escolha a forma mais prática para você.">
      <div className="grid gap-6 md:grid-cols-3">
        <DonateCard title="PIX (Brasil)" body="Use o QR Code para pagamento via pix ou copie o e-mail abaixo:" footer={<>
          <div className="flex flex-col items-center gap-3">
            <img src="/pix.png" alt="QR PIX" className="mx-auto w-[150px] rounded bg-white p-2" onError={(e)=>{e.currentTarget.style.display='none';}} />
            <div className="flex items-center gap-2">
              <code className="rounded-xl bg-white/10 px-3 py-1 text-xs text-neutral-200 break-all">
                  obrigado@ajudaquentinha.com.br
                </code>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-1 text-sm font-medium appearance-none bg-white/10 text-white hover:bg-white/20 border border-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={async () => {
                    const email = "obrigado@ajudaquentinha.com.br";
                    try { await navigator.clipboard.writeText(email); }
                    catch {
                      const ta = document.createElement("textarea");
                      ta.value = email; document.body.appendChild(ta);
                      ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
                    }
                  }}
                >
                  Copiar
                </button>
              </div>
            </div>
        </>} />
        <DonateCard
          title="Canadian e-Transfer"
          body="Ideal para doadores no Canadá."
          footer={
            <div className="flex flex-col items-center gap-3">
              {/* row 1: flag */}
              <img
                src="/canada.png"
                alt="Canada flag"
                className="w-[150px] rounded p-2"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />

              {/* row 2: email + copy button */}
              <div className="flex items-center gap-2">
                <code className="rounded-xl bg-white/10 px-3 py-1 text-xs text-neutral-200 break-all">
                  obrigado@ajudaquentinha.com.br
                </code>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-1 text-sm font-medium appearance-none bg-white/10 text-white hover:bg-white/20 border border-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={async () => {
                    const email = "obrigado@ajudaquentinha.com.br";
                    try { await navigator.clipboard.writeText(email); }
                    catch {
                      const ta = document.createElement("textarea");
                      ta.value = email; document.body.appendChild(ta);
                      ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
                    }
                  }}
                >
                  Copiar
                </button>
              </div>
            </div>
          }

        />
        <DonateCard title="Voluntariado" body="Participe nas entregas, triagem de roupas e logística." footer={<a href="#/contato" className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-400">Quero ser voluntário</a>} />
      </div>
      <p className="mt-6 text-center text-sm text-neutral-400">Envie o comprovante por e-mail para <a className="underline" href="mailto:obrigado@ajudaquentinha.com.br">obrigado@ajudaquentinha.com.br</a>.</p>
    </Section>
  );
}

function DonateCard({ title, body, footer }: DonateCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 grow text-sm text-neutral-300">{body}</p>
      <div className="mt-4">{footer}</div>
    </div>
  );
}

function Contact() {
  return (
    <Section kicker="Contato" title="Fale com a gente" subtitle="Dúvidas, parcerias e doações.">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">E-mail</h3>
          <p className="mt-2 text-neutral-300">Envie uma mensagem para:
            <br />
            <a className="underline" href="mailto:obrigado@ajudaquentinha.com.br">obrigado@ajudaquentinha.com.br</a>
          </p>
          <h3 className="mt-6 text-lg font-semibold">Instagram</h3>
          <a className="mt-2 inline-flex items-center gap-2 underline" href="https://instagram.com/ajuda_quentinha" target="_blank" rel="noreferrer">
            @ajuda_quentinha
          </a>
        </div>
        <form
          action="https://formspree.io/f/myzpvpbe"  
          method="POST"
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h3 className="text-lg font-semibold">Mensagem rápida</h3>

          <label className="mt-4 block text-sm">
            Nome
            <input
              name="nome"
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 outline-none focus:ring focus:ring-rose-400/40"
            />
          </label>

          <label className="mt-4 block text-sm">
            E-mail
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 outline-none focus:ring focus:ring-rose-400/40"
            />
          </label>

          <label className="mt-4 block text-sm">
            Mensagem
            <textarea
              name="mensagem"
              rows={4}
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 outline-none focus:ring focus:ring-rose-400/40"
            />
          </label>

          <button
            type="submit"
            className="mt-4 rounded-xl bg-rose-500 px-4 py-2 font-semibold text-white hover:bg-rose-400"
          >
            Enviar
          </button>
        </form>
      </div>
    </Section>
  );
}

function CtaDonate() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-rose-500/20 to-rose-400/10 p-8 md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-extrabold">Cada doação vira uma quentinha</h3>
              <p className="mt-2 text-neutral-200">Com pouco, fazemos muito. Apoie para manter as ações mensais.</p>
              <div className="mt-4 flex gap-3">
                <a href="#/doar" className="rounded-xl bg-rose-500 px-5 py-2.5 font-semibold text-white hover:bg-rose-400">Doar agora</a>
                <a href="#/sobre" className="rounded-xl border border-white/15 px-5 py-2.5 font-semibold hover:bg-white/5">Saber mais</a>
              </div>
            </div>
            <img src="/logo.svg" alt="Coração Ajuda Quentinha" className="mx-auto h-28 w-28 opacity-90" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <div className="flex items-center gap-3">
          <img src="/coracao.svg" alt="Ajuda Quentinha" className="h-6 w-6" />
          <span className="text-sm text-neutral-400">© {new Date().getFullYear()} Ajuda Quentinha</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="#/sobre" className="text-neutral-300 hover:text-rose-300">Sobre</a>
          <a href="#/acoes" className="text-neutral-300 hover:text-rose-300">Ações</a>
          <a href="#/doar" className="text-neutral-300 hover:text-rose-300">Doar</a>
          <a href="mailto:obrigado@ajudaquentinha.com.br" className="text-neutral-300 hover:text-rose-300">Contato</a>
        </div>
      </div>
    </footer>
  );
}
