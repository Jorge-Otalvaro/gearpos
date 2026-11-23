# GearPos — brand assets

Derived only from the original logo (`../source/logo-original.png`). Colours: `colors.json`.

| File                                                     | Use                                                                     |
| -------------------------------------------------------- | ----------------------------------------------------------------------- |
| logo-light-bg.png / .svg                                 | Main logo on white/light backgrounds ("Gear" + tagline in navy #0F1B2D) |
| logo-dark-bg.png / .svg                                  | Original logo, on dark backgrounds                                      |
| logo-horizontal-no-tagline-*-bg                          | Header/nav version without "Sistema POS"                                |
| logo-mono-white / logo-mono-black                        | One-colour versions (stamps, receipts, photos, embroidery)              |
| icon-chameleon.png                                       | Mascot alone, transparent                                               |
| app-icon-light / app-icon-dark                           | 1024 app/store icons (rounded square)                                   |
| maskable-icon-512.png                                    | PWA maskable icon (mascot inside the 80% safe zone)                     |
| favicon.ico, favicon-16x16, favicon-32x32, favicon.svg   | Browser tab (simplified mascot: flat silhouette + eye)                  |
| apple-touch-icon.png, android-chrome-*, site.webmanifest | Home-screen icons                                                       |
| og-image.png                                             | Link preview (WhatsApp, Facebook, LinkedIn)                             |
| svg/                                                     | Vector versions of the logos and icons                                  |

HTML head:

```html
<link rel="icon" href="/favicon.ico" sizes="48x48" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta property="og:image" content="https://YOUR-DOMAIN/og-image.png" />
```

Minimum logo width on screen: 120 px (use the no-tagline version below 200 px).
