import { type ReactNode } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';

export type Country = {
    dial: string;
    name: string;
    flag: ReactNode;
};

export const COUNTRIES: Country[] = [
    {
        dial: '+57',
        name: 'Colombia',
        flag: (
            <svg
                viewBox="0 0 24 16"
                className="block size-full"
                aria-hidden="true"
            >
                <rect width="24" height="8" fill="#FCD116" />
                <rect y="8" width="24" height="4" fill="#003893" />
                <rect y="12" width="24" height="4" fill="#CE1126" />
            </svg>
        ),
    },
    {
        dial: '+52',
        name: 'México',
        flag: (
            <svg
                viewBox="0 0 24 16"
                className="block size-full"
                aria-hidden="true"
            >
                <rect width="8" height="16" fill="#006847" />
                <rect x="8" width="8" height="16" fill="#FFFFFF" />
                <rect x="16" width="8" height="16" fill="#CE1126" />
                <circle cx="12" cy="8" r="1.8" fill="#7C5328" />
            </svg>
        ),
    },
    {
        dial: '+1',
        name: 'Estados Unidos',
        flag: (
            <svg
                viewBox="0 0 24 16"
                className="block size-full"
                aria-hidden="true"
            >
                <rect width="24" height="16" fill="#FFFFFF" />
                <g fill="#B22234">
                    <rect width="24" height="1.23" />
                    <rect y="2.46" width="24" height="1.23" />
                    <rect y="4.92" width="24" height="1.23" />
                    <rect y="7.38" width="24" height="1.23" />
                    <rect y="9.84" width="24" height="1.23" />
                    <rect y="12.3" width="24" height="1.23" />
                    <rect y="14.77" width="24" height="1.23" />
                </g>
                <rect width="10" height="8.6" fill="#3C3B6E" />
                <g fill="#FFFFFF">
                    <circle cx="2" cy="2" r="0.5" />
                    <circle cx="4.5" cy="2" r="0.5" />
                    <circle cx="7" cy="2" r="0.5" />
                    <circle cx="3.2" cy="4.2" r="0.5" />
                    <circle cx="5.8" cy="4.2" r="0.5" />
                    <circle cx="8.2" cy="4.2" r="0.5" />
                    <circle cx="2" cy="6.4" r="0.5" />
                    <circle cx="4.5" cy="6.4" r="0.5" />
                    <circle cx="7" cy="6.4" r="0.5" />
                </g>
            </svg>
        ),
    },
    {
        dial: '+34',
        name: 'España',
        flag: (
            <svg
                viewBox="0 0 24 16"
                className="block size-full"
                aria-hidden="true"
            >
                <rect width="24" height="4" fill="#AA151B" />
                <rect y="4" width="24" height="8" fill="#F1BF00" />
                <rect y="12" width="24" height="4" fill="#AA151B" />
                <rect
                    x="5.5"
                    y="6"
                    width="2.4"
                    height="4"
                    rx="0.4"
                    fill="#AA151B"
                />
            </svg>
        ),
    },
    {
        dial: '+54',
        name: 'Argentina',
        flag: (
            <svg
                viewBox="0 0 24 16"
                className="block size-full"
                aria-hidden="true"
            >
                <rect width="24" height="5.33" fill="#74ACDF" />
                <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
                <rect y="10.67" width="24" height="5.33" fill="#74ACDF" />
                <circle cx="12" cy="8" r="1.7" fill="#F6B40E" />
            </svg>
        ),
    },
    {
        dial: '+51',
        name: 'Perú',
        flag: (
            <svg
                viewBox="0 0 24 16"
                className="block size-full"
                aria-hidden="true"
            >
                <rect width="8" height="16" fill="#D91023" />
                <rect x="8" width="8" height="16" fill="#FFFFFF" />
                <rect x="16" width="8" height="16" fill="#D91023" />
            </svg>
        ),
    },
    {
        dial: '+56',
        name: 'Chile',
        flag: (
            <svg
                viewBox="0 0 24 16"
                className="block size-full"
                aria-hidden="true"
            >
                <rect width="24" height="8" fill="#FFFFFF" />
                <rect y="8" width="24" height="8" fill="#D52B1E" />
                <rect width="8" height="8" fill="#0039A6" />
                <polygon
                    points="4,1.8 4.6,3.5 6.4,3.5 4.9,4.5 5.5,6.2 4,5.2 2.5,6.2 3.1,4.5 1.6,3.5 3.4,3.5"
                    fill="#FFFFFF"
                />
            </svg>
        ),
    },
    {
        dial: '+593',
        name: 'Ecuador',
        flag: (
            <svg
                viewBox="0 0 24 16"
                className="block size-full"
                aria-hidden="true"
            >
                <rect width="24" height="8" fill="#FFD100" />
                <rect y="8" width="24" height="4" fill="#034EA2" />
                <rect y="12" width="24" height="4" fill="#ED1C24" />
                <circle cx="12" cy="8" r="1.7" fill="#7A4F2B" />
            </svg>
        ),
    },
];

type Props = {
    selected: Country;
    onSelect: (country: Country) => void;
};

export default function CountrySelector({ selected, onSelect }: Props) {
    return (
        <Select
            value={selected.dial}
            onValueChange={(val) => {
                const found = COUNTRIES.find((c) => c.dial === val);
                if (found) onSelect(found);
            }}
        >
            <SelectTrigger
                aria-label="Seleccionar país e indicativo"
                className="gear-input flex h-auto min-h-[48px] cursor-pointer items-center gap-2 rounded-xl px-3 text-sm font-semibold shadow-none select-none focus-visible:ring-[#00B63E]/20"
            >
                <span className="inline-flex h-4 w-6 shrink-0 items-center justify-center overflow-hidden rounded-[3px] shadow-sm">
                    {selected.flag}
                </span>
                <span className="tabular-nums">{selected.dial}</span>
            </SelectTrigger>
            <SelectContent
                align="start"
                className="max-h-64 w-60 rounded-2xl border p-1.5 shadow-xl"
                style={{
                    backgroundColor: 'var(--gear-panel-card)',
                    borderColor: 'var(--gear-border-default)',
                }}
            >
                {COUNTRIES.map((country) => (
                    <SelectItem
                        key={country.dial + country.name}
                        value={country.dial}
                        className="cursor-pointer rounded-xl px-2.5 py-2 text-sm font-medium"
                    >
                        <span className="flex min-w-0 items-center gap-2.5">
                            <span className="inline-flex h-4 w-6 shrink-0 items-center justify-center overflow-hidden rounded-[3px] shadow-sm">
                                {country.flag}
                            </span>
                            <span
                                className="truncate"
                                style={{ color: 'var(--gear-text-heading)' }}
                            >
                                {country.name}
                            </span>
                        </span>
                        <span className="ml-auto shrink-0 pr-2 text-xs font-semibold text-muted-foreground tabular-nums">
                            {country.dial}
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
