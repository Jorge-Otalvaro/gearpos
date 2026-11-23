import { Loader2 } from 'lucide-react';
import type {
    FormEvent,
    KeyboardEvent,
    ClipboardEvent,
    RefObject,
} from 'react';
import type { Country } from '@/components/country-selector';

interface AuthStepOtpProps {
    phoneNumber: string;
    selectedCountry: Country;
    otpValues: string[];
    otpRefs: RefObject<(HTMLInputElement | null)[]>;
    otpTimer: number;
    otpLoading: boolean;
    onOtpChange: (index: number, val: string) => void;
    onOtpKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
    onOtpPaste: (e: ClipboardEvent) => void;
    onResend: () => void;
    onSubmit: (e: FormEvent) => void;
}

export function AuthStepOtp({
    phoneNumber,
    selectedCountry,
    otpValues,
    otpRefs,
    otpTimer,
    otpLoading,
    onOtpChange,
    onOtpKeyDown,
    onOtpPaste,
    onResend,
    onSubmit,
}: AuthStepOtpProps) {
    return (
        <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#00B63E] sm:text-3xl dark:text-[#62CD00]">
                Verifica tu código
            </h1>
            <p
                className="mt-1.5 text-sm leading-relaxed"
                style={{ color: 'var(--gear-text-body)' }}
            >
                Ingresa el código de 6 dígitos que enviamos a{' '}
                <strong
                    className="font-semibold"
                    style={{ color: 'var(--gear-text-heading)' }}
                >
                    {selectedCountry.dial} {phoneNumber}
                </strong>
                .
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-5">
                <div
                    className="grid grid-cols-6 gap-2 sm:gap-2.5"
                    onPaste={onOtpPaste}
                >
                    {otpValues.map((val, idx) => (
                        <input
                            key={idx}
                            ref={(el) => {
                                if (otpRefs.current) {
                                    otpRefs.current[idx] = el;
                                }
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            aria-label={`Dígito ${idx + 1}`}
                            value={val}
                            onChange={(e) => onOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => onOtpKeyDown(idx, e)}
                            className="gear-input min-h-[52px] w-full rounded-xl text-center font-display text-xl font-extrabold"
                        />
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                    <span style={{ color: 'var(--gear-text-subtle)' }}>
                        ¿No recibiste el código?
                    </span>
                    <button
                        type="button"
                        disabled={otpTimer > 0}
                        onClick={onResend}
                        className="cursor-pointer font-semibold text-[#00B63E] hover:underline disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#62CD00]"
                    >
                        {otpTimer > 0
                            ? `Reenviar código en 0:${String(otpTimer).padStart(2, '0')}`
                            : 'Reenviar código ahora'}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={otpLoading}
                    className="btn-gear-primary flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-[#00B63E]/25 focus:ring-4 focus:ring-[#00B63E]/30 focus:outline-none disabled:opacity-75 sm:text-[15px]"
                >
                    {otpLoading ? (
                        <>
                            <Loader2 className="size-5 animate-spin text-white" />
                            <span>Verificando...</span>
                        </>
                    ) : (
                        <span>Verificar e ingresar</span>
                    )}
                </button>
            </form>
        </div>
    );
}
