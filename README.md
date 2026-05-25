# Madgwick Studio — Onboarding

A standalone React + Vite app for the **Madgwick Studio** signup and onboarding flow. Lifted from the larger Madgwick Studio design system project and packaged so it can run on its own or merge into the main codebase.

## Run it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build       # outputs to ./dist
npm run preview     # serves the production build locally
```

The `dist/` folder is a static site — deploy it anywhere (Vercel, Netlify, Cloudflare Pages, an S3 bucket, your existing hosting). No backend required for the prototype.

## What's inside

```
src/
├── App.jsx                       — wizard controller + step state + localStorage
├── main.jsx                      — React mount
├── index.css                     — design tokens + onboarding styles (one file)
├── data/
│   └── options.js                — role / experience / goal / interest / state / heard lists
├── components/
│   ├── Icon.jsx                  — inline-SVG Lucide subset (no CDN)
│   ├── BrandMark.jsx             — header logo + wordmark
│   ├── ProgressBar.jsx
│   └── form/
│       ├── Field.jsx             — label + error + help wrapper
│       ├── TextInput.jsx
│       ├── PasswordInput.jsx     — show/hide toggle
│       ├── Select.jsx
│       ├── Checkbox.jsx
│       ├── OptionCard.jsx        — single-select card with optional icon
│       └── Chip.jsx              — multi-select pill
└── screens/
    ├── SignupScreen.jsx          — name + email + password + terms
    ├── VerifyEmailScreen.jsx     — 6-digit code + resend countdown
    ├── SingleSelectScreen.jsx    — generic single-select wizard step
    ├── MultiSelectChipsScreen.jsx— generic multi-select chip step
    ├── OrgScreen.jsx             — organisation + "prefer not to say"
    ├── LocationScreen.jsx        — state + postcode
    ├── HeardScreen.jsx           — attribution
    └── WelcomeScreen.jsx         — personalised welcome + recommendations

public/
├── favicon.svg                   — simplified "m" mark
├── mark.svg                      — stacked "m / STUDIO" tile (used on welcome)
├── lockup-wordmark.svg           — horizontal "m / Madgwick Studio" lockup fallback
└── madgwick-studio-lockup.png    — official UNE × Madgwick Studio lockup (signup hero)
```

## Flow

The wizard has **10 screens**:

1. **Signup** — name (split), email, password + confirm (with show/hide), terms, optional marketing opt-in. Hero shows the UNE × Madgwick Studio lockup.
2. **Verify email** — 6-digit code (paste-aware), 45-second resend countdown, "I'll verify later" skip.
3–9. **Onboarding** (7 steps) — role, experience, goals, interests, organisation, location, how-heard. Each step has a quiet "Skip for now" link.
10. **Welcome** — stacked brand mark + personalised "Welcome, {name}" + up to 2 recommendation cards based on the chosen goals.

Single-select screens auto-advance 220 ms after selection. Multi-select screens require an explicit Continue.

## State

Form state lives in `App.jsx` as a flat object — keys are:

| Key | Type | Notes |
|---|---|---|
| `firstName`, `lastName`, `email` | string | required |
| `password`, `confirmPassword` | string | min 8 chars, must match |
| `agreed`, `marketing` | boolean | terms + opt-in |
| `role`, `experience`, `heard` | string \| null | single-select |
| `goals`, `interests` | string[] | multi-select |
| `organisation`, `preferNot` | string, boolean | "rather not say" clears the field |
| `state`, `postcode` | string | postcode digits-only, 4-digit max |

The whole object plus the current `stepIdx` is persisted to `localStorage` under the key `madgwick-onboarding` after every change. Refresh and you resume where you left off. The welcome screen's "Take me to my dashboard" clears the saved state.

## Wiring it into your backend

Three places to wire up:

1. **`SignupScreen.jsx` → `submit`** — currently calls `next()`. Replace with `POST /api/auth/signup` first; only call `next()` on success. Show server-side errors via `setTouched` + a global error banner.
2. **`VerifyEmailScreen.jsx` → "Verify and continue" button onClick** — replace with `POST /api/auth/verify-email` carrying `code`.
3. **`App.jsx` → `handleEnterDashboard`** — currently alerts. Replace with `window.location.href = '/lessons'` (or your router's navigation).

The onboarding answers (role, goals, etc.) can be saved at each step via `PATCH /api/profile` inside the `set()` function, or batched in `handleEnterDashboard` before redirect.

## Merging into the main app

This project shares the same design language as the main Madgwick Studio web app. To merge:

1. Copy `src/screens/`, `src/components/`, and `src/data/options.js` into your app.
2. Copy the relevant slice of `src/index.css` (everything from `/* ONBOARDING-SPECIFIC STYLES */` down). The tokens above it should already exist in your global stylesheet — if not, copy them too.
3. Mount `<App />` at `/onboarding` in your router.
4. Replace the localStorage persistence in `App.jsx` with your user-profile API.

## Customising

- **Role list** — edit `src/data/options.js`. There's a commented block at the top showing the rural-fire-service variant to drop in when ready.
- **Tone of copy** — all visible strings are in the screen files. Search for `Madgwick Studio` or page headings.
- **Colours** — top of `src/index.css`. The primary green is `oklch(0.527 0.154 150.069)`; the brand mark uses UNE lime `#91D62E` only on the dark logo tile.
- **Order of steps** — change the `STEPS` array in `App.jsx`. Each step is just a `{ id, kind, title }` object.

## Caveats

- **No TypeScript.** Kept as plain JSX for portability. Convert with `vite-plugin-react`'s TS template if needed.
- **No Tailwind.** Plain CSS so it drops into any project. If you want to convert, the tokens at the top of `index.css` map cleanly to a Tailwind v4 `@theme` block.
- **No SSO** by design — email/password only.
- **Logo files** in `public/` are placeholders pending the final brand assets. The `madgwick-studio-lockup.png` is the official UNE × Madgwick Studio lockup (provisional / unofficial).

## License

Internal — Madgwick Studio.
