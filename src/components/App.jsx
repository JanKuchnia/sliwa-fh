import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Wrench, ArrowUpRight, ArrowRight, Phone, Mail, MapPin, Menu, X,
  Shovel, Hammer, Link2, PaintBucket, CornerDownRight, Package,
  Star, Clock, ShieldCheck, Award, CheckCircle2, Upload, Trash2, Send,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PHONE_DISPLAY = '12 270 43 53'
const PHONE_TEL = '+48122704353'
const MOBILE_DISPLAY = '601 913 899'
const EMAIL = 'biuro@fhsliwa.com.pl'
const ADDRESS = 'Rzeszotary 451, 32-040 Świątniki Górne'

const NAV_LINKS = [
  { label: 'Start', href: '#home' },
  { label: 'Oferta', href: '#services' },
  { label: 'Dlaczego my', href: '#pillars' },
  { label: 'Jak to działa', href: '#process' },
  { label: 'Kontakt', href: '#contact' },
]

const SERVICES = [
  { icon: Shovel, title: 'Narzędzia ogrodnicze', text: 'Łopaty, grabie, sekatory i cały sprzęt do prac w ogrodzie i na działce.' },
  { icon: Hammer, title: 'Okucia budowlane', text: 'Zawiasy, zamki, klamki i okucia do drzwi, bram i ogrodzeń.' },
  { icon: Link2, title: 'Łańcuchy i zawiesia', text: 'Łańcuchy techniczne, ogniwa i osprzęt do mocowania ładunków.' },
  { icon: PaintBucket, title: 'Pędzle i akcesoria malarskie', text: 'Pędzle, wałki i akcesoria do malowania oraz konserwacji.' },
  { icon: CornerDownRight, title: 'Złączki i kolana', text: 'Kolana, trójniki i złączki do instalacji oraz prac rurowych.' },
  { icon: Package, title: 'Artykuły metalowe i BHP', text: 'Śruby, kotwy, drobnica metalowa oraz podstawowe wyposażenie BHP.' },
]

function CountUp({ end, suffix = '', duration = 2000 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTs = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - startTs) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(Math.round(end * eased * 10) / 10)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])

  return <span ref={ref} className="tabular-nums">{value}{suffix}</span>
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-full px-4 sm:px-6 py-2.5 transition-colors ${scrolled ? 'glass' : ''}`}>
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Wrench className="h-5 w-5 text-white" strokeWidth={2.4} />
              <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/50 transition" />
            </span>
            <span className={`font-display font-bold tracking-tight text-lg transition-colors ${scrolled ? 'text-ink' : 'text-white'}`}>
              Śliwa FH
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className={`lift-on-hover text-sm font-medium ${scrolled ? 'text-ink/80' : 'text-white/85'}`}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="magnetic-btn hidden sm:inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-primary/30">
              Zapytaj o dostępność <ArrowUpRight className="h-4 w-4" />
            </a>
            <button onClick={() => setOpen(true)} className={`lg:hidden p-2 rounded-full ${scrolled ? 'text-ink' : 'text-white'}`} aria-label="Otwórz menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-deep/90 backdrop-blur-2xl flex flex-col">
          <div className="flex justify-end p-6">
            <button onClick={() => setOpen(false)} className="p-2 text-white" aria-label="Zamknij menu">
              <X className="h-7 w-7" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-8 flex-1">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display text-3xl font-semibold text-white">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="magnetic-btn mt-4 inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold">
              Zapytaj o dostępność <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </>
  )
}

function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-cta, .hero-meta', { y: 24, opacity: 0, duration: 0.8, delay: 0.8, stagger: 0.12, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1800&auto=format&fit=crop"
        alt="Narzędzia zawieszone na tablicy warsztatowej"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.5]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-deep/80 via-deep/40 to-deep/70" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-deep to-transparent" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="absolute top-24 right-8 sm:right-16 hidden sm:block">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-2 w-2 rounded-full bg-accent/80 animate-float mb-6"
            style={{ marginLeft: `${i * 18}px`, animationDelay: `${i * 0.9}s` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-20 min-h-[100dvh] flex flex-col justify-end">
        <p className="hero-meta font-mono text-xs uppercase tracking-[0.25em] text-white/70 mb-6">
          Hurtownia narzędzi · Rzeszotary
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.95] max-w-5xl text-balance">
          <span className="hero-line-1 block">Narzędzia i okucia</span>
          <span className="hero-line-2 block font-serif italic font-medium">od ręki, po sąsiedzku</span>
        </h1>
        <p className="hero-meta mt-8 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed">
          Od lat zaopatrujemy warsztaty, ekipy budowlane i ogrodników w Rzeszotarach, Świątnikach Górnych i Skawinie. Solidny sprzęt, uczciwa cena, bez zbędnego czekania.
        </p>
        <div className="hero-cta mt-10 flex flex-wrap gap-3">
          <a href="#contact" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary/30">
            Zapytaj o dostępność <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href={`tel:${PHONE_TEL}`} className="magnetic-btn inline-flex items-center gap-2 glass-dark text-white px-6 py-3 rounded-full font-semibold border border-white/15">
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  )
}

function CategoryShuffler() {
  const items = ['Narzędzia ogrodnicze', 'Okucia budowlane', 'Łańcuchy i zawiesia']
  const [front, setFront] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setFront((f) => (f + 1) % items.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-44 rounded-3xl bg-background border border-divider overflow-hidden">
      {items.map((label, i) => {
        const pos = (i - front + items.length) % items.length
        const isFront = pos === 0
        return (
          <div
            key={label}
            className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-2xl bg-surface border border-divider p-4 flex items-center justify-between transition-all duration-500"
            style={{
              zIndex: items.length - pos,
              transform: `translateY(calc(-50% + ${pos * 10}px)) scale(${1 - pos * 0.06})`,
              filter: isFront ? 'none' : `blur(${pos}px)`,
              opacity: isFront ? 1 : 0.6 - pos * 0.15,
            }}
          >
            <span className="font-display font-semibold text-ink text-sm sm:text-base">{label}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">na stanie</span>
          </div>
        )
      })}
    </div>
  )
}

function MetalworkSparks() {
  const statuses = ['Sprawdzamy jakość', 'Pakujemy zamówienie', 'Gotowe do odbioru']
  const [status, setStatus] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setStatus((s) => (s + 1) % statuses.length), 2300)
    return () => clearInterval(id)
  }, [])

  const sparks = Array.from({ length: 7 }, (_, i) => ({
    left: 12 + i * 11 + (i % 2) * 4,
    delay: i * 0.35,
    duration: 1.6 + (i % 3) * 0.3,
    size: 3 + (i % 3),
  }))

  return (
    <div className="relative h-44 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(160deg, #14181c 0%, #1f262d 100%)' }}>
      <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary-light/20 blur-2xl" />

      <div className="absolute top-3 inset-x-0 flex items-center justify-between px-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">Pracownia</span>
        <span className="font-mono text-[10px] text-white/40">#{String(status + 1).padStart(2, '0')}</span>
      </div>

      <svg className="absolute top-8 left-1/2 -translate-x-1/2" width="120" height="14" viewBox="0 0 120 14">
        <rect x="0" y="4" width="120" height="6" rx="3" fill="#3a4450" />
        <rect x="50" y="0" width="20" height="4" rx="1" fill="#e8792e" />
      </svg>

      {sparks.map((s, i) => (
        <div
          key={i}
          className="absolute top-8"
          style={{ left: `${s.left}%`, animation: `spark-fall ${s.duration}s ease-in ${s.delay}s infinite` }}
        >
          <span style={{ display: 'block', width: s.size, height: s.size, background: '#e8792e', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
        </div>
      ))}

      <svg className="absolute bottom-9 inset-x-0" width="100%" height="10" viewBox="0 0 300 10" preserveAspectRatio="none">
        <path d="M0 5 Q75 0 150 5 T300 5" stroke="#3a4450" strokeWidth="2" fill="none" />
      </svg>

      {[30, 55, 78].map((left, i) => (
        <span
          key={i}
          className="absolute bottom-9 rounded-full border border-accent/60"
          style={{
            left: `${left}%`, width: 6, height: 6, marginLeft: -3,
            animation: `spark-burst 1.8s ease-out ${i * 0.6}s infinite`,
          }}
        />
      ))}

      <div className="absolute bottom-3 inset-x-0 flex items-center gap-2 px-4">
        <span className="relative h-1.5 w-1.5 rounded-full bg-accent">
          <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
        </span>
        <span key={status} className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70" style={{ animation: 'spark-fadein 0.4s ease-out' }}>
          {statuses[status]}
        </span>
      </div>

      <style>{`
        @keyframes spark-fall {
          0%   { transform: translate(-50%, -6px); opacity: 0; }
          12%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(-50%, 70px); opacity: 0; }
        }
        @keyframes spark-burst {
          0%   { transform: scale(0.4); opacity: 0.9; }
          80%  { transform: scale(3); opacity: 0; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes spark-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

function PickupScheduler() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 5), 1400)
    return () => clearInterval(id)
  }, [])

  const days = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt']
  const targetDay = 3
  const clicked = step >= 2

  return (
    <div className="relative h-44 rounded-3xl bg-background border border-divider p-4 overflow-hidden">
      <div className="grid grid-cols-5 gap-2 h-full">
        {days.map((d, i) => (
          <div key={d} className={`rounded-xl flex flex-col items-center justify-center gap-1 border transition-colors duration-300 ${i === targetDay && clicked ? 'bg-primary border-primary text-white' : 'bg-surface border-divider text-muted'}`}>
            <span className="font-mono text-[10px] uppercase">{d}</span>
            {i === targetDay && clicked && <CheckCircle2 className="h-4 w-4" />}
          </div>
        ))}
      </div>
      <div
        className="absolute h-5 w-5 pointer-events-none transition-all duration-700 ease-out"
        style={{
          left: step < 2 ? '10%' : `${10 + targetDay * 18}%`,
          top: step < 2 ? '20%' : '60%',
          transform: clicked ? 'scale(0.85)' : 'scale(1)',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#2f5c85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51z" fill="#2f5c85" />
        </svg>
      </div>
    </div>
  )
}

function Features() {
  const ref = useRef(null)
  useEffect(() => {
    gsap.from('.feature-card', {
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    })
  }, [])

  return (
    <section id="services" ref={ref} className="py-24 sm:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">Oferta</p>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter max-w-2xl text-balance">
          Wszystko, czego potrzebuje warsztat, budowa i ogród
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
          <div className="feature-card rounded-3xl bg-surface border border-divider p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-2">Oferta</p>
            <h3 className="font-display text-xl sm:text-2xl font-semibold mb-5">Zawsze pod ręką</h3>
            <CategoryShuffler />
            <p className="text-sm sm:text-base text-muted leading-relaxed mt-5">
              Sześć głównych kategorii asortymentu, uzupełniane na bieżąco — od narzędzi ogrodniczych po drobnicę metalową.
            </p>
          </div>
          <div className="feature-card rounded-3xl bg-surface border border-divider p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-2">Jakość</p>
            <h3 className="font-display text-xl sm:text-2xl font-semibold mb-5">Solidny sprzęt do pracy</h3>
            <MetalworkSparks />
            <p className="text-sm sm:text-base text-muted leading-relaxed mt-5">
              Sprawdzony asortyment od sprawdzonych dostawców — bez przypadkowego towaru na regale.
            </p>
          </div>
          <div className="feature-card rounded-3xl bg-surface border border-divider p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-2">Zamówienia</p>
            <h3 className="font-display text-xl sm:text-2xl font-semibold mb-5">Odbiór bez czekania</h3>
            <PickupScheduler />
            <p className="text-sm sm:text-base text-muted leading-relaxed mt-5">
              Zadzwoń, zamów, odbierz — pon.–pt. 07:00–17:00, bez umawiania się z wyprzedzeniem.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pillars() {
  return (
    <section id="pillars" className="relative py-24 sm:py-32 overflow-hidden grid-bg">
      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-3 lg:divide-x divide-divider gap-12 lg:gap-0">
          <div className="lg:px-10 first:lg:pl-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-3">Ocena klientów</p>
            <p className="font-display text-5xl sm:text-6xl font-bold gradient-text"><CountUp end={4.8} suffix="/5" /></p>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-4 mb-4 overflow-hidden">
              <div className="h-px bg-primary" style={{ animation: 'pillar-sweep 3s ease-in-out infinite' }} />
            </div>
            <p className="text-sm text-muted leading-relaxed">Opinie klientów w Google — dziękujemy za zaufanie.</p>
          </div>
          <div className="lg:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-3">Kategorii asortymentu</p>
            <p className="font-display text-5xl sm:text-6xl font-bold gradient-text"><CountUp end={6} /></p>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-4 mb-4 overflow-hidden">
              <div className="h-px bg-primary" style={{ animation: 'pillar-sweep 3s ease-in-out infinite' }} />
            </div>
            <p className="text-sm text-muted leading-relaxed">Od narzędzi ogrodniczych po okucia budowlane — wszystko w jednym miejscu.</p>
          </div>
          <div className="lg:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-3">Dni w tygodniu otwarte</p>
            <p className="font-display text-5xl sm:text-6xl font-bold gradient-text"><CountUp end={5} /></p>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-4 mb-4 overflow-hidden">
              <div className="h-px bg-primary" style={{ animation: 'pillar-sweep 3s ease-in-out infinite' }} />
            </div>
            <p className="text-sm text-muted leading-relaxed">Pon.–pt. 07:00–17:00 — zapraszamy codziennie w tygodniu roboczym.</p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

const PROCESS_STEPS = [
  {
    n: '01', eyebrow: 'Krok pierwszy', title: 'Zapytaj o dostępność',
    text: `Zadzwoń pod ${PHONE_DISPLAY} lub odwiedź nas w Rzeszotarach 451 — sprawdzimy, co mamy na stanie.`,
    bullets: ['Telefon lub wizyta na miejscu', 'Szybka odpowiedź o dostępności'],
    img: 'https://images.unsplash.com/photo-1591129841117-3adfd313e34f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    n: '02', eyebrow: 'Krok drugi', title: 'Przygotowujemy zamówienie',
    text: 'Kompletujemy towar i pakujemy zgodnie z Twoim zamówieniem, gotowe do odbioru.',
    bullets: ['Kompletacja z asortymentu na stanie', 'Staranne pakowanie'],
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
  },
  {
    n: '03', eyebrow: 'Krok trzeci', title: 'Odbiór na miejscu',
    text: `Odbierz zamówienie w naszej hurtowni, pon.–pt. w godzinach 07:00–17:00.`,
    bullets: ['Bez umawiania się z wyprzedzeniem', 'Rzeszotary 451, 32-040'],
    img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop',
  },
]

function Protocol() {
  const cardsRef = useRef([])

  useEffect(() => {
    cardsRef.current.slice(0, -1).forEach((card) => {
      if (!card) return
      gsap.to(card, {
        scrollTrigger: { trigger: card, start: 'top top+=100', end: '+=500', scrub: 1 },
        scale: 0.92, filter: 'blur(6px) saturate(0.7)', opacity: 0.5, ease: 'none',
      })
    })
  }, [])

  return (
    <section id="process" className="relative" style={{ minHeight: '300vh' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">Jak to działa</p>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter max-w-2xl text-balance mb-16">
          Prosty proces, bez zbędnych formalności
        </h2>
      </div>
      {PROCESS_STEPS.map((step, i) => (
        <div
          key={step.n}
          ref={(el) => (cardsRef.current[i] = el)}
          className="sticky top-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16"
        >
          <div className="rounded-4xl bg-surface border border-divider p-8 sm:p-12 grid lg:grid-cols-5 gap-8 items-center shadow-xl shadow-ink/5">
            <div className="lg:col-span-3">
              <p className="font-display text-5xl font-bold text-primary/20 mb-4">{step.n}</p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary mb-2">{step.eyebrow}</p>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted leading-relaxed mb-5">{step.text}</p>
              <ul className="space-y-2">
                {step.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-ink/80">
                    <ArrowRight className="h-3.5 w-3.5 text-primary" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <img src={step.img} alt={step.title} className="rounded-3xl w-full h-56 sm:h-64 object-cover" />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    gsap.from('.svc-tile', {
      scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
    })
  }, [])

  return (
    <section ref={ref} className="bg-deep text-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light mb-4">Pełny asortyment</p>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter max-w-2xl text-balance mb-16">
          Sześć kategorii, jedna hurtownia
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="svc-tile group bg-deep p-8 sm:p-10 transition-colors hover:bg-white/[0.03]">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-6">
                <Icon className="h-6 w-6 text-primary-light transition-transform group-hover:scale-110" strokeWidth={2.2} />
              </span>
              <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TRUST_SIGNALS = [
  { icon: MapPin, title: 'Lokalna hurtownia w Rzeszotarach', text: 'Działamy w sercu regionu Rzeszotary–Świątniki Górne–Skawina.' },
  { icon: Star, title: '4,8/5 od klientów', text: 'Wysokie oceny za rzetelność i szeroki asortyment.' },
  { icon: Clock, title: 'Otwarte 5 dni w tygodniu', text: 'Pon.–pt. 07:00–17:00, zawsze gotowi do obsługi.' },
]

function TrustSignals() {
  const ref = useRef(null)
  useEffect(() => {
    gsap.from('.trust-badge', {
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      y: 24, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
    })
  }, [])

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-3 gap-6">
          {TRUST_SIGNALS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="trust-badge rounded-2xl bg-surface border border-divider p-6 sm:p-8 shadow-sm shadow-ink/5 lift-on-hover">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                <Icon className="h-5 w-5 text-primary" strokeWidth={2.2} />
              </span>
              <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted mb-1.5 block">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-divider bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
      />
    </label>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [files, setFiles] = useState([])

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  const onDrop = (e) => {
    e.preventDefault()
    const list = [...e.dataTransfer.files].filter((f) => f.type.startsWith('image/')).slice(0, 5 - files.length)
    setFiles((prev) => [...prev, ...list])
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">Kontakt</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter text-balance mb-8">
              Skontaktuj się z nami
            </h2>
            <div className="space-y-4">
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 rounded-2xl bg-surface border border-divider p-4 lift-on-hover">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><Phone className="h-4.5 w-4.5 text-primary" /></span>
                <span className="text-sm font-medium">{PHONE_DISPLAY} · {MOBILE_DISPLAY}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-2xl bg-surface border border-divider p-4 lift-on-hover">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><Mail className="h-4.5 w-4.5 text-primary" /></span>
                <span className="text-sm font-medium">{EMAIL}</span>
              </a>
              <div className="flex items-center gap-3 rounded-2xl bg-surface border border-divider p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><MapPin className="h-4.5 w-4.5 text-primary" /></span>
                <span className="text-sm font-medium">{ADDRESS}</span>
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed mt-6">
              Twoje dane służą wyłącznie do przygotowania oferty i nie są przekazywane innym podmiotom.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-4xl bg-surface border border-divider p-6 sm:p-10">
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <CheckCircle2 className="h-7 w-7 text-primary" />
                  </span>
                  <h3 className="font-display text-xl font-semibold mb-2">Dziękujemy!</h3>
                  <p className="text-muted text-sm">Odezwiemy się wkrótce.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Imię i nazwisko" type="text" required placeholder="Jan Kowalski" />
                    <Field label="Email" type="email" required placeholder="jan@firma.pl" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Telefon" type="tel" placeholder="600 000 000" />
                    <Field label="Kod pocztowy" type="text" placeholder="32-040" />
                  </div>
                  <label className="block">
                    <span className="text-xs font-medium text-muted mb-1.5 block">Wiadomość</span>
                    <textarea
                      rows={5} required placeholder="Czego szukasz?"
                      className="w-full rounded-xl border border-divider bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition resize-none"
                    />
                  </label>
                  <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="rounded-xl border-2 border-dashed border-divider p-6 text-center">
                    <Upload className="h-5 w-5 text-muted mx-auto mb-2" />
                    <p className="text-xs text-muted">Przeciągnij zdjęcia (maks. 5) lub kliknij, aby wybrać</p>
                    <input
                      type="file" accept="image/*" multiple className="hidden" id="file-upload"
                      onChange={(e) => setFiles((prev) => [...prev, ...[...e.target.files].slice(0, 5 - prev.length)])}
                    />
                    <label htmlFor="file-upload" className="inline-block mt-2 text-xs font-medium text-primary cursor-pointer">Wybierz pliki</label>
                    {files.length > 0 && (
                      <ul className="mt-4 space-y-1.5 text-left">
                        {files.map((f, i) => (
                          <li key={i} className="flex items-center justify-between text-xs bg-background rounded-lg px-3 py-1.5">
                            <span className="truncate">{f.name}</span>
                            <button type="button" onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))} aria-label="Usuń plik">
                              <Trash2 className="h-3.5 w-3.5 text-muted" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    type="submit" disabled={status === 'sending'}
                    className="magnetic-btn w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-full font-semibold shadow-lg shadow-primary/30 disabled:opacity-70"
                  >
                    {status === 'sending' ? 'Wysyłanie…' : (<>Wyślij zapytanie <Send className="h-4 w-4" /></>)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-deep text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-5 gap-12 pb-16">
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Wrench className="h-5 w-5 text-white" strokeWidth={2.4} />
              </span>
              <span className="font-display font-bold text-2xl">Śliwa FH</span>
            </div>
            <p className="font-serif italic text-white/70 text-lg max-w-xs">
              Narzędzia i okucia, od ręki, po sąsiedzku.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="relative h-2 w-2 rounded-full bg-emerald-500">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">Hurtownia czynna</span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mb-4">Oferta</p>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.title}><a href="#services" className="text-sm text-white/70 lift-on-hover inline-block">{s.title}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mb-4">Firma</p>
            <ul className="space-y-2.5">
              <li><a href="#pillars" className="text-sm text-white/70 lift-on-hover inline-block">O nas</a></li>
              <li><a href="#process" className="text-sm text-white/70 lift-on-hover inline-block">Jak działamy</a></li>
              <li><a href="#contact" className="text-sm text-white/70 lift-on-hover inline-block">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mb-4">Kontakt</p>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>{PHONE_DISPLAY}</li>
              <li>{MOBILE_DISPLAY}</li>
              <li>{EMAIL}</li>
              <li>{ADDRESS}</li>
              <li className="text-white/40">Pon.–pt. 07:00–17:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Śliwa FH. Wszelkie prawa zastrzeżone.</p>
          <div className="flex items-center gap-6">
            <a href={`${import.meta.env.BASE_URL}/polityka-prywatnosci`.replace(/\/+/g, '/')} className="text-xs text-white/40 lift-on-hover inline-block">Polityka prywatności</a>
            <a href={`${import.meta.env.BASE_URL}/regulamin`.replace(/\/+/g, '/')} className="text-xs text-white/40 lift-on-hover inline-block">Regulamin</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
