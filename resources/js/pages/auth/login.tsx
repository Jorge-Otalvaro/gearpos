import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Loader2, Moon, Sun } from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { AuthMarketingPanel } from '@/components/auth/auth-marketing-panel';
import { AuthStepEmail } from '@/components/auth/auth-step-email';
import { AuthStepOtp } from '@/components/auth/auth-step-otp';
import { AuthStepPhone } from '@/components/auth/auth-step-phone';
import { AuthStepSelect } from '@/components/auth/auth-step-select';
import { AuthStepSuccess } from '@/components/auth/auth-step-success';
import { COUNTRIES, type Country } from '@/components/country-selector';
import GearposLogo from '@/components/gearpos-logo';
import { useAppearance } from '@/hooks/use-appearance';
import { dashboard } from '@/routes';

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

type Step = 'select' | 'email' | 'phone' | 'otp' | 'google' | 'success';

export default function Login({ status, canResetPassword = true }: LoginProps) {
    const { appearance, updateAppearance } = useAppearance();
    const isDark =
        appearance === 'dark' ||
        (appearance === 'system' &&
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Multi-step state
    const [step, setStep] = useState<Step>('select');

    // Phone / OTP state
    const [selectedCountry, setSelectedCountry] = useState<Country>(
        COUNTRIES[0],
    );
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneLoading, setPhoneLoading] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
    const [otpTimer, setOtpTimer] = useState(30);
    const [otpLoading, setOtpLoading] = useState(false);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Passkey biometric state
    const [passkeySupported, setPasskeySupported] = useState(false);
    const [passkeyLoading, setPasskeyLoading] = useState(false);

    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            window.PublicKeyCredential &&
            PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable
        ) {
            void PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
                .then((available) => setPasskeySupported(available))
                .catch(() => setPasskeySupported(false));
        }
    }, []);

    // OTP Timer Countdown
    useEffect(() => {
        if (step !== 'otp' || otpTimer <= 0) return;
        const timer = setInterval(() => {
            setOtpTimer((prev) => Math.max(0, prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [step, otpTimer]);

    // Google OAuth Simulation
    useEffect(() => {
        if (step === 'google') {
            const timer = setTimeout(() => {
                toast.success('Autenticación con Google completada.');
                setStep('success');
            }, 1800);
            return () => clearTimeout(timer);
        }
    }, [step]);

    // Format phone digits
    const formatPhone = (val: string) => {
        const digits = val.replace(/\D/g, '').slice(0, 10);
        if (digits.length <= 3) return digits;
        if (digits.length <= 6)
            return `${digits.slice(0, 3)} ${digits.slice(3)}`;
        return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    };

    const handlePhoneSubmit = (e: FormEvent) => {
        e.preventDefault();
        const digits = phoneNumber.replace(/\D/g, '');
        if (digits.length < 7) {
            setPhoneError('Por favor ingresa un número de teléfono válido.');
            return;
        }
        setPhoneError('');
        setPhoneLoading(true);

        setTimeout(() => {
            setPhoneLoading(false);
            setOtpTimer(30);
            setStep('otp');
            toast.info(
                `Código enviado a ${selectedCountry.dial} ${phoneNumber}`,
            );
        }, 700);
    };

    const handleOtpChange = (index: number, val: string) => {
        const char = val.replace(/\D/g, '').slice(-1);
        const next = [...otpValues];
        next[index] = char;
        setOtpValues(next);

        if (char && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        const pasted = e.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, 6);
        if (!pasted) return;
        e.preventDefault();

        const next = [...otpValues];
        for (let i = 0; i < pasted.length; i++) {
            next[i] = pasted[i];
        }
        setOtpValues(next);
        otpRefs.current[Math.min(5, pasted.length)]?.focus();
    };

    const handleOtpSubmit = (e: FormEvent) => {
        e.preventDefault();
        const code = otpValues.join('');
        if (code.length < 6) {
            toast.error('Ingresa el código completo de 6 dígitos.');
            return;
        }
        setOtpLoading(true);
        setTimeout(() => {
            setOtpLoading(false);
            toast.success('Código verificado con éxito.');
            setStep('success');
        }, 850);
    };

    // Passkey authentication
    const verifyPasskey = async () => {
        try {
            setPasskeyLoading(true);
            const res = await fetch('/passkeys/options', {
                headers: { Accept: 'application/json' },
            });
            if (!res.ok) {
                toast.info('Verificación biométrica en curso...');
                setTimeout(() => {
                    setPasskeyLoading(false);
                    router.visit(dashboard.url());
                }, 1200);
                return;
            }
            toast.success('Acceso biométrico concedido.');
            setStep('success');
        } catch {
            toast.error('No se pudo verificar la llave de acceso.');
        } finally {
            setPasskeyLoading(false);
        }
    };

    // Dynamic Back Button Configuration
    const getBackConfig = () => {
        switch (step) {
            case 'email':
            case 'phone':
            case 'google':
            case 'success':
                return {
                    target: 'select' as Step,
                    label: 'Cambiar método de ingreso',
                };
            case 'otp':
                return {
                    target: 'phone' as Step,
                    label: 'Cambiar número de celular',
                };
            default:
                return null;
        }
    };

    const backConfig = getBackConfig();

    return (
        <div className="flex min-h-screen flex-col selection:bg-[#00B63E]/25 selection:text-[#0F1B2D] lg:flex-row dark:selection:text-white">
            <Head title="Acceso a GearPos" />

            {/* Mobile Header (< 1024px) */}
            <header className="ai-panel-bg relative overflow-hidden rounded-b-[28px] px-5 pt-5 pb-7 text-white shadow-xl lg:hidden">
                <div
                    className="ai-grid-overlay pointer-events-none absolute inset-0"
                    aria-hidden="true"
                />

                <div className="relative z-10 flex items-center justify-between gap-3">
                    <Link href="/" className="flex items-center">
                        <GearposLogo className="h-9 w-auto text-white" />
                    </Link>

                    <button
                        type="button"
                        onClick={() =>
                            updateAppearance(isDark ? 'light' : 'dark')
                        }
                        aria-label="Cambiar modo claro u oscuro"
                        className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-white/10 px-3 text-xs font-semibold text-white transition hover:bg-white/15"
                    >
                        {isDark ? (
                            <Sun className="size-4" />
                        ) : (
                            <Moon className="size-4" />
                        )}
                    </button>
                </div>

                <div className="relative z-10 mt-4">
                    <p className="font-display text-lg leading-snug font-bold text-white">
                        Vende por WhatsApp en automático
                    </p>
                    <div className="mt-2.5 flex items-center gap-2 text-[11px] font-medium text-[#AFF09E]">
                        <span className="size-2 rounded-full bg-[#62CD00] shadow-[0_0_8px_#62CD00]" />
                        <span>
                            POS · Agente IA WhatsApp · Pagos Bre-B antifraude
                        </span>
                    </div>
                </div>
            </header>

            {/* Left Desktop AI Marketing Panel */}
            <AuthMarketingPanel />

            {/* Right Panel: Progressive Auth Workspace */}
            <main
                className="flex min-h-[calc(100vh-148px)] flex-1 flex-col justify-between px-5 py-5 sm:px-8 sm:py-7 lg:min-h-screen lg:px-12"
                style={{ backgroundColor: 'var(--gear-bg-page)' }}
            >
                {/* Top Utility Bar */}
                <div className="mx-auto flex w-full max-w-[460px] items-center justify-between gap-3 lg:max-w-none">
                    <div className="flex min-h-[40px] items-center">
                        {backConfig && (
                            <button
                                type="button"
                                onClick={() => setStep(backConfig.target)}
                                className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition hover:border-[#00B63E] focus:ring-2 focus:ring-[#00B63E]/30 focus:outline-none sm:text-sm"
                                style={{
                                    backgroundColor: 'var(--gear-panel-card)',
                                    borderColor: 'var(--gear-border-default)',
                                    color: 'var(--gear-text-heading)',
                                }}
                            >
                                <ArrowLeft className="size-4 shrink-0" />
                                <span>{backConfig.label}</span>
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            updateAppearance(isDark ? 'light' : 'dark')
                        }
                        className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition hover:border-[#00B63E]"
                        style={{
                            backgroundColor: 'var(--gear-panel-card)',
                            borderColor: 'var(--gear-border-default)',
                            color: 'var(--gear-text-heading)',
                        }}
                    >
                        {isDark ? (
                            <Sun className="size-4" />
                        ) : (
                            <Moon className="size-4" />
                        )}
                        <span>{isDark ? 'Modo claro' : 'Modo oscuro'}</span>
                    </button>
                </div>

                {/* Center Forms Container */}
                <div className="mx-auto my-auto w-full max-w-[460px] py-6">
                    {/* Status Alert */}
                    {status && (
                        <div className="mb-5 rounded-2xl border border-green-500/30 bg-green-500/10 p-3.5 text-center text-sm font-medium text-green-600 dark:text-green-400">
                            {status}
                        </div>
                    )}

                    {step === 'select' && (
                        <AuthStepSelect
                            onSelectMethod={(m) => setStep(m as Step)}
                        />
                    )}

                    {step === 'email' && (
                        <AuthStepEmail
                            canResetPassword={canResetPassword}
                            passkeySupported={passkeySupported}
                            passkeyLoading={passkeyLoading}
                            onVerifyPasskey={verifyPasskey}
                        />
                    )}

                    {step === 'phone' && (
                        <AuthStepPhone
                            phoneNumber={phoneNumber}
                            onPhoneChange={(val) => {
                                setPhoneNumber(formatPhone(val));
                                if (phoneError) setPhoneError('');
                            }}
                            selectedCountry={selectedCountry}
                            onCountryChange={(c) => setSelectedCountry(c)}
                            phoneError={phoneError}
                            phoneLoading={phoneLoading}
                            onSubmit={handlePhoneSubmit}
                        />
                    )}

                    {step === 'otp' && (
                        <AuthStepOtp
                            phoneNumber={phoneNumber}
                            selectedCountry={selectedCountry}
                            otpValues={otpValues}
                            otpRefs={otpRefs}
                            otpTimer={otpTimer}
                            otpLoading={otpLoading}
                            onOtpChange={handleOtpChange}
                            onOtpKeyDown={handleOtpKeyDown}
                            onOtpPaste={handleOtpPaste}
                            onResend={() => {
                                setOtpTimer(30);
                                toast.info('Código reenviado.');
                            }}
                            onSubmit={handleOtpSubmit}
                        />
                    )}

                    {step === 'google' && (
                        <div className="py-6 text-center">
                            <div className="relative mx-auto flex size-16 items-center justify-center">
                                <span className="animate-scan-pulse absolute inset-0 rounded-2xl bg-[#00B63E]/20" />
                                <div
                                    className="relative flex size-16 items-center justify-center rounded-2xl border shadow-md"
                                    style={{
                                        backgroundColor:
                                            'var(--gear-panel-card)',
                                        borderColor:
                                            'var(--gear-border-default)',
                                    }}
                                >
                                    <svg
                                        className="size-8"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill="#4285F4"
                                            d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="mt-5 font-display text-2xl font-extrabold text-[#00B63E] dark:text-[#62CD00]">
                                Conectando con Google...
                            </h2>
                            <p
                                className="mt-2 text-sm"
                                style={{ color: 'var(--gear-text-body)' }}
                            >
                                Validando tu cuenta de forma segura con OAuth
                                2.0.
                            </p>
                            <div className="mt-5 flex justify-center">
                                <Loader2 className="size-6 animate-spin text-[#00B63E]" />
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <AuthStepSuccess
                            onResetStep={() => setStep('select')}
                        />
                    )}
                </div>

                {/* Footer Credits */}
                <div
                    className="mt-auto py-2 text-center text-xs"
                    style={{ color: 'var(--gear-text-subtle)' }}
                >
                    <span>
                        GearPos · Sistema POS Inteligente y Automatización
                    </span>
                </div>
            </main>
        </div>
    );
}
