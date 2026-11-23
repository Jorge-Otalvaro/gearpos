import { Link } from '@inertiajs/react';
import { Mail, Phone } from 'lucide-react';
import { register } from '@/routes';

interface AuthStepSelectProps {
    onSelectMethod: (method: 'email' | 'phone' | 'google') => void;
}

export function AuthStepSelect({ onSelectMethod }: AuthStepSelectProps) {
    return (
        <div>
            <div className="text-center sm:text-left">
                <h1
                    className="font-display text-[26px] font-bold tracking-tight sm:text-[30px]"
                    style={{ color: 'var(--gear-text-heading)' }}
                >
                    Bienvenido de nuevo
                </h1>
                <p
                    className="mt-2 text-sm sm:text-[15px]"
                    style={{ color: 'var(--gear-text-body)' }}
                >
                    ¿Cómo quieres ingresar a tu negocio hoy?
                </p>
            </div>

            {/* 3 Interactive Method Cards */}
            <div className="mt-6 space-y-3">
                {/* Option 1: Email */}
                <button
                    type="button"
                    onClick={() => onSelectMethod('email')}
                    className="method-card group flex min-h-[68px] w-full cursor-pointer items-center justify-between gap-3.5 rounded-2xl p-3.5 text-left focus:ring-4 focus:ring-[#00B63E]/20 focus:outline-none"
                >
                    <div className="flex min-w-0 items-center gap-3.5">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#00B63E]/12 text-[#00B63E] transition group-hover:scale-105 dark:bg-[#00B63E]/20 dark:text-[#62CD00]">
                            <Mail className="size-5" />
                        </span>
                        <div className="min-w-0">
                            <span
                                className="block text-sm font-semibold sm:text-[15px]"
                                style={{ color: 'var(--gear-text-heading)' }}
                            >
                                Continuar con correo electrónico
                            </span>
                            <span
                                className="mt-0.5 block truncate text-xs"
                                style={{ color: 'var(--gear-text-subtle)' }}
                            >
                                Usa tu correo, contraseña o Passkey
                            </span>
                        </div>
                    </div>
                    <span
                        className="text-muted-foreground transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                    >
                        →
                    </span>
                </button>

                {/* Option 2: Phone */}
                <button
                    type="button"
                    onClick={() => onSelectMethod('phone')}
                    className="method-card group flex min-h-[68px] w-full cursor-pointer items-center justify-between gap-3.5 rounded-2xl p-3.5 text-left focus:ring-4 focus:ring-[#00B63E]/20 focus:outline-none"
                >
                    <div className="flex min-w-0 items-center gap-3.5">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#62CD00]/14 text-[#4DAF00] transition group-hover:scale-105 dark:bg-[#62CD00]/20 dark:text-[#62CD00]">
                            <Phone className="size-5" />
                        </span>
                        <div className="min-w-0">
                            <span
                                className="block text-sm font-semibold sm:text-[15px]"
                                style={{ color: 'var(--gear-text-heading)' }}
                            >
                                Continuar con número de teléfono
                            </span>
                            <span
                                className="mt-0.5 block truncate text-xs"
                                style={{ color: 'var(--gear-text-subtle)' }}
                            >
                                Código rápido por WhatsApp o SMS
                            </span>
                        </div>
                    </div>
                    <span
                        className="text-muted-foreground transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                    >
                        →
                    </span>
                </button>

                {/* Option 3: Google */}
                <button
                    type="button"
                    onClick={() => onSelectMethod('google')}
                    className="method-card group flex min-h-[68px] w-full cursor-pointer items-center justify-between gap-3.5 rounded-2xl p-3.5 text-left focus:ring-4 focus:ring-[#00B63E]/20 focus:outline-none"
                >
                    <div className="flex min-w-0 items-center gap-3.5">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition group-hover:scale-105 dark:bg-white/10">
                            <svg
                                className="size-5"
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
                        </span>
                        <div className="min-w-0">
                            <span
                                className="block text-sm font-semibold sm:text-[15px]"
                                style={{ color: 'var(--gear-text-heading)' }}
                            >
                                Continuar con Google
                            </span>
                            <span
                                className="mt-0.5 block truncate text-xs"
                                style={{ color: 'var(--gear-text-subtle)' }}
                            >
                                Acceso inmediato en un clic
                            </span>
                        </div>
                    </div>
                    <span
                        className="text-muted-foreground transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                    >
                        →
                    </span>
                </button>
            </div>

            {/* Register Link */}
            <p
                className="mt-6 text-center text-sm"
                style={{ color: 'var(--gear-text-body)' }}
            >
                ¿Aún no tienes cuenta?{' '}
                <Link
                    href={register()}
                    className="font-bold text-[#00B63E] hover:underline dark:text-[#62CD00]"
                >
                    Crea tu tienda gratis
                </Link>
            </p>
        </div>
    );
}
