import { Loader2 } from 'lucide-react';
import type { FormEvent } from 'react';
import CountrySelector, { type Country } from '@/components/country-selector';

interface AuthStepPhoneProps {
    phoneNumber: string;
    onPhoneChange: (val: string) => void;
    selectedCountry: Country;
    onCountryChange: (country: Country) => void;
    phoneError: string;
    phoneLoading: boolean;
    onSubmit: (e: FormEvent) => void;
}

export function AuthStepPhone({
    phoneNumber,
    onPhoneChange,
    selectedCountry,
    onCountryChange,
    phoneError,
    phoneLoading,
    onSubmit,
}: AuthStepPhoneProps) {
    return (
        <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#00B63E] sm:text-3xl dark:text-[#62CD00]">
                Ingresa con tu celular
            </h1>
            <p
                className="mt-1.5 text-sm"
                style={{ color: 'var(--gear-text-body)' }}
            >
                Te enviaremos un código seguro por WhatsApp o SMS.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                    <label
                        htmlFor="phone-input"
                        className="mb-1.5 block text-sm font-semibold"
                        style={{ color: 'var(--gear-text-heading)' }}
                    >
                        Número de celular
                    </label>
                    <div className="flex items-stretch gap-2.5">
                        <CountrySelector
                            selected={selectedCountry}
                            onSelect={onCountryChange}
                        />
                        <input
                            id="phone-input"
                            name="phone"
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            placeholder="300 123 4567"
                            maxLength={14}
                            value={phoneNumber}
                            onChange={(e) => onPhoneChange(e.target.value)}
                            required
                            className="gear-input min-h-[48px] flex-1 rounded-xl px-4 py-2.5 text-sm tracking-wide placeholder:text-slate-400"
                        />
                    </div>
                    {phoneError && (
                        <p
                            className="mt-1.5 text-xs font-medium text-rose-500"
                            role="alert"
                        >
                            {phoneError}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={phoneLoading}
                    className="btn-gear-primary flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-[#00B63E]/25 focus:ring-4 focus:ring-[#00B63E]/30 focus:outline-none disabled:opacity-75 sm:text-[15px]"
                >
                    {phoneLoading ? (
                        <>
                            <Loader2 className="size-5 animate-spin text-white" />
                            <span>Enviando código...</span>
                        </>
                    ) : (
                        <span>Enviar código de verificación</span>
                    )}
                </button>
            </form>
        </div>
    );
}
