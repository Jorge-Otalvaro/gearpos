import { Form, Link } from '@inertiajs/react';
import {
    Check,
    Eye,
    EyeOff,
    Fingerprint,
    Loader2,
    Lock,
    Mail,
} from 'lucide-react';
import { useState } from 'react';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

interface AuthStepEmailProps {
    canResetPassword?: boolean;
    passkeySupported: boolean;
    passkeyLoading: boolean;
    onVerifyPasskey: () => void;
}

export function AuthStepEmail({
    canResetPassword,
    passkeySupported,
    passkeyLoading,
    onVerifyPasskey,
}: AuthStepEmailProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [emailValue, setEmailValue] = useState('');

    return (
        <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#00B63E] sm:text-3xl dark:text-[#62CD00]">
                Ingresa con tu correo
            </h1>
            <p
                className="mt-1.5 text-sm"
                style={{ color: 'var(--gear-text-body)' }}
            >
                Accede al panel de control de tu negocio con tus credenciales.
            </p>

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="mt-6 space-y-4"
            >
                {({ processing, errors }) => (
                    <>
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="login-email"
                                className="mb-1.5 block text-sm font-semibold"
                                style={{ color: 'var(--gear-text-heading)' }}
                            >
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <span
                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5"
                                    style={{ color: 'var(--gear-text-subtle)' }}
                                >
                                    <Mail className="size-4" />
                                </span>
                                <input
                                    id="login-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    autoFocus
                                    value={emailValue}
                                    onChange={(e) =>
                                        setEmailValue(e.target.value)
                                    }
                                    placeholder="tu@negocio.com"
                                    className="gear-input min-h-[48px] w-full rounded-xl py-2.5 pr-10 pl-10 text-sm placeholder:text-slate-400"
                                />
                                {emailValue &&
                                    emailValue.includes('@') &&
                                    emailValue.includes('.') && (
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#00B63E]">
                                            <Check className="size-4 stroke-[2.5]" />
                                        </span>
                                    )}
                            </div>
                            {errors.email && (
                                <p
                                    className="mt-1 text-xs font-medium text-rose-500"
                                    role="alert"
                                >
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label
                                    htmlFor="login-password"
                                    className="block text-sm font-semibold"
                                    style={{
                                        color: 'var(--gear-text-heading)',
                                    }}
                                >
                                    Contraseña
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={request()}
                                        className="text-xs font-semibold text-[#00B63E] hover:underline dark:text-[#62CD00]"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <span
                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5"
                                    style={{ color: 'var(--gear-text-subtle)' }}
                                >
                                    <Lock className="size-4" />
                                </span>
                                <input
                                    id="login-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    placeholder="Ingresa tu contraseña"
                                    className="gear-input min-h-[48px] w-full rounded-xl py-2.5 pr-12 pl-10 text-sm placeholder:text-slate-400"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    aria-label="Mostrar u ocultar contraseña"
                                    className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center rounded-r-xl text-muted-foreground hover:text-[#00B63E] focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p
                                    className="mt-1 text-xs font-medium text-rose-500"
                                    role="alert"
                                >
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <label className="flex min-h-[36px] cursor-pointer items-center gap-2.5 select-none">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember-me"
                                className="size-4 rounded accent-[#00B63E]"
                            />
                            <span
                                className="text-sm"
                                style={{ color: 'var(--gear-text-body)' }}
                            >
                                Mantener sesión iniciada en este dispositivo
                            </span>
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn-gear-primary flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-[#00B63E]/25 focus:ring-4 focus:ring-[#00B63E]/30 focus:outline-none disabled:opacity-75 sm:text-[15px]"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="size-5 animate-spin text-white" />
                                    <span>Verificando credenciales...</span>
                                </>
                            ) : (
                                <span>Iniciar sesión</span>
                            )}
                        </button>

                        {/* Passkey Options */}
                        {passkeySupported && (
                            <>
                                <div className="relative flex items-center justify-center py-1">
                                    <span
                                        className="w-full border-t"
                                        style={{
                                            borderColor:
                                                'var(--gear-border-default)',
                                        }}
                                    />
                                    <span
                                        className="shrink-0 px-3 text-xs font-medium"
                                        style={{
                                            color: 'var(--gear-text-subtle)',
                                        }}
                                    >
                                        o ingresa sin contraseña
                                    </span>
                                    <span
                                        className="w-full border-t"
                                        style={{
                                            borderColor:
                                                'var(--gear-border-default)',
                                        }}
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={onVerifyPasskey}
                                    disabled={passkeyLoading}
                                    className="flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border text-sm font-semibold transition hover:border-[#00B63E] focus:ring-4 focus:ring-[#00B63E]/15 focus:outline-none"
                                    style={{
                                        backgroundColor:
                                            'var(--gear-panel-card)',
                                        borderColor:
                                            'var(--gear-border-default)',
                                        color: 'var(--gear-text-heading)',
                                    }}
                                >
                                    {passkeyLoading ? (
                                        <Loader2 className="size-5 animate-spin text-[#00B63E]" />
                                    ) : (
                                        <Fingerprint className="size-5 text-[#00B63E] dark:text-[#62CD00]" />
                                    )}
                                    <span>
                                        Ingresar con Passkey / Biometría
                                    </span>
                                </button>
                            </>
                        )}
                    </>
                )}
            </Form>
        </div>
    );
}
