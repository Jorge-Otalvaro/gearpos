import { Link } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { dashboard } from '@/routes';

interface AuthStepSuccessProps {
    onResetStep: () => void;
}

export function AuthStepSuccess({ onResetStep }: AuthStepSuccessProps) {
    return (
        <div className="py-6 text-center">
            <div className="relative mx-auto flex size-16 items-center justify-center">
                <span className="animate-scan-pulse absolute inset-0 rounded-2xl bg-[#00B63E]/20" />
                <div className="relative flex size-16 items-center justify-center rounded-2xl border border-[#00B63E]/40 bg-[#00B63E]/15 text-[#00B63E] dark:text-[#62CD00]">
                    <Check className="size-8 stroke-[2.5]" />
                </div>
            </div>
            <h2 className="mt-5 font-display text-2xl font-extrabold text-[#00B63E] sm:text-3xl dark:text-[#62CD00]">
                ¡Acceso verificado!
            </h2>
            <p
                className="mt-2 text-sm"
                style={{ color: 'var(--gear-text-body)' }}
            >
                Redirigiendo al panel principal de tu negocio en GearPos...
            </p>
            <div className="mt-6 flex flex-col gap-3">
                <Link
                    href={dashboard()}
                    className="btn-gear-primary inline-flex min-h-[48px] items-center justify-center rounded-xl text-sm font-semibold text-white shadow-lg shadow-[#00B63E]/25"
                >
                    Ir a mi Dashboard
                </Link>
                <button
                    type="button"
                    onClick={onResetStep}
                    className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl border text-sm font-semibold transition hover:border-[#00B63E]"
                    style={{
                        backgroundColor: 'var(--gear-panel-card)',
                        borderColor: 'var(--gear-border-default)',
                        color: 'var(--gear-text-heading)',
                    }}
                >
                    Probar otro método de ingreso
                </button>
            </div>
        </div>
    );
}
