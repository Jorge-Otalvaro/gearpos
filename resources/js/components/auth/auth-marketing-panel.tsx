import { Link } from '@inertiajs/react';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import GearposLogo from '@/components/gearpos-logo';
import NeuralCanvas from '@/components/neural-canvas';

const HEADLINES = [
    'Vende por WhatsApp en automático.',
    'Control de inventario en tiempo real.',
    'Pagos Bre-B seguros y sin enredos.',
    'Tu negocio inteligente y siempre abierto.',
];

const PILLS = [
    { key: 'ia', label: 'Agente IA WhatsApp', headline: 0 },
    { key: 'inventory', label: 'Caja & Stock', headline: 1 },
    { key: 'breb', label: 'Bre-B Antifraude', headline: 2 },
    { key: 'cloud', label: 'Nube Activa', headline: 3 },
];

export function AuthMarketingPanel() {
    const [headlineIdx, setHeadlineIdx] = useState(0);
    const [activePill, setActivePill] = useState('ia');
    const [activeFeedRow, setActiveFeedRow] = useState(0);
    const hudRef = useRef<HTMLDivElement>(null);

    // Headline rotation
    useEffect(() => {
        const timer = setInterval(() => {
            setHeadlineIdx((prev) => (prev + 1) % HEADLINES.length);
        }, 5500);
        return () => clearInterval(timer);
    }, []);

    // Feed row pulse
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveFeedRow((prev) => (prev + 1) % 3);
        }, 3200);
        return () => clearInterval(timer);
    }, []);

    // 3D Tilt handlers
    const handleHudMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = hudRef.current;
        if (!card) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
    };

    const handleHudMouseLeave = () => {
        if (hudRef.current) {
            hudRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
        }
    };

    return (
        <aside className="ai-panel-bg relative hidden flex-col justify-between overflow-hidden p-8 text-white select-none lg:flex lg:w-[50%] xl:w-[52%] xl:p-11">
            <NeuralCanvas />
            <div
                className="ai-grid-overlay pointer-events-none absolute inset-0"
                aria-hidden="true"
            />

            {/* Top Row: Logo & Status Pill */}
            <div className="relative z-10 flex items-center justify-between gap-4">
                <Link href="/" className="flex items-center">
                    <GearposLogo className="h-11 w-auto text-white xl:h-12" />
                </Link>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-[#AFF09E]">
                    <span className="size-2 rounded-full bg-[#62CD00] shadow-[0_0_10px_#62CD00]" />
                    <span>Motor IA Activo · v2.6</span>
                </div>
            </div>

            {/* Center: Rotating Headlines & 3D Tilt HUD */}
            <div className="relative z-10 mx-auto my-auto w-full max-w-xl py-8">
                <div className="mb-7 text-center">
                    <h2 className="font-display text-3xl leading-tight font-extrabold tracking-tight text-white transition-opacity duration-300 xl:text-[34px]">
                        {HEADLINES[headlineIdx]}
                    </h2>
                    <div
                        className="mt-4 flex items-center justify-center gap-2"
                        aria-hidden="true"
                    >
                        {HEADLINES.map((_, i) => (
                            <span
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === headlineIdx
                                        ? 'w-8 bg-[#00B63E]'
                                        : 'w-2 bg-white/25'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* 3D Tilt Container */}
                <div
                    className="[perspective:1000px]"
                    onMouseMove={handleHudMouseMove}
                    onMouseLeave={handleHudMouseLeave}
                >
                    <div
                        ref={hudRef}
                        className="hud-glass rounded-3xl p-5 xl:p-6"
                    >
                        {/* HUD Header */}
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-[#62CD00]/40 bg-[#00B63E]/20 text-[#AFF09E]">
                                    <Sparkles className="size-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate font-display text-sm font-bold text-white">
                                        Agente IA de Ventas · WhatsApp
                                    </p>
                                    <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#AFF09E]/90">
                                        <span>Procesando pedidos en vivo</span>
                                        <span className="ml-0.5 inline-flex items-center gap-0.5">
                                            <span className="typing-dot size-1 rounded-full bg-[#62CD00]" />
                                            <span className="typing-dot size-1 rounded-full bg-[#62CD00]" />
                                            <span className="typing-dot size-1 rounded-full bg-[#62CD00]" />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#00B63E]/40 bg-[#00B63E]/15 px-2.5 py-1 text-[11px] font-semibold text-[#AFF09E]">
                                <ShieldCheck className="size-3.5 text-[#62CD00]" />
                                <span>Bre-B Shield</span>
                            </div>
                        </div>

                        {/* Live Simulated Event Feed */}
                        <div className="mt-4 space-y-2.5">
                            <div
                                className={`flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 transition-all duration-300 ${
                                    activeFeedRow === 0
                                        ? 'border border-[#62CD00]/35 bg-[#00B63E]/15'
                                        : 'border border-white/10 bg-white/[0.04]'
                                }`}
                            >
                                <div className="flex min-w-0 items-center gap-2.5">
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[#00B63E]/25 text-[#AFF09E]">
                                        <Check className="size-3.5" />
                                    </span>
                                    <p className="truncate text-xs font-medium text-white">
                                        Pedido confirmado vía WhatsApp ·
                                        $148.000 COP
                                    </p>
                                </div>
                                <span className="shrink-0 text-[10px] font-semibold text-[#AFF09E]">
                                    Ahora
                                </span>
                            </div>

                            <div
                                className={`flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 transition-all duration-300 ${
                                    activeFeedRow === 1
                                        ? 'border border-[#62CD00]/35 bg-[#00B63E]/15'
                                        : 'border border-white/10 bg-white/[0.04]'
                                }`}
                            >
                                <div className="flex min-w-0 items-center gap-2.5">
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#62CD00]">
                                        <ShieldCheck className="size-3.5" />
                                    </span>
                                    <p className="truncate text-xs font-medium text-slate-200">
                                        Validación Bre-B Antifraude: Aprobada
                                        (99.8%)
                                    </p>
                                </div>
                                <span className="shrink-0 text-[10px] text-slate-400">
                                    2s
                                </span>
                            </div>

                            <div
                                className={`flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 transition-all duration-300 ${
                                    activeFeedRow === 2
                                        ? 'border border-[#62CD00]/35 bg-[#00B63E]/15'
                                        : 'border border-white/10 bg-white/[0.04]'
                                }`}
                            >
                                <div className="flex min-w-0 items-center gap-2.5">
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sky-300">
                                        <Sparkles className="size-3.5" />
                                    </span>
                                    <p className="truncate text-xs font-medium text-slate-200">
                                        Inventario actualizado automáticamente
                                        (-2 unid.)
                                    </p>
                                </div>
                                <span className="shrink-0 text-[10px] text-slate-400">
                                    5s
                                </span>
                            </div>
                        </div>

                        {/* Metrics Bar */}
                        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
                            <div>
                                <p className="text-[10px] text-slate-400">
                                    Respuesta IA
                                </p>
                                <p className="font-display text-xs font-bold text-[#AFF09E]">
                                    &lt; 1.2s
                                </p>
                            </div>
                            <div className="border-x border-white/10">
                                <p className="text-[10px] text-slate-400">
                                    Tasa Cierre
                                </p>
                                <p className="font-display text-xs font-bold text-white">
                                    38.4%
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400">
                                    Disponibilidad
                                </p>
                                <p className="font-display text-xs font-bold text-[#62CD00]">
                                    99.98%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom: Feature Pills */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-2">
                {PILLS.map((pill) => (
                    <button
                        key={pill.key}
                        type="button"
                        onClick={() => {
                            setActivePill(pill.key);
                            setHeadlineIdx(pill.headline);
                        }}
                        className={`feature-pill cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                            activePill === pill.key ? 'is-active' : ''
                        }`}
                    >
                        {pill.label}
                    </button>
                ))}
            </div>
        </aside>
    );
}
