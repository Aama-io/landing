# Mantine Next.js Boilerplate

This is a boilerplate built for [Next.js](https://nextjs.org/) pages router + [Mantine](https://mantine.dev/).
If you want to use app router instead, see [next-app-template](https://github.com/mantinedev/next-app-template).

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)
- Google Analytics (GA4) integration with automatic page view tracking
- Email integration with EmailJS and Brevo

## Environment Variables

This project uses environment variables for configuration. Copy `.env.example` to `.env.local` and update the values:

```bash
cp .env.example .env.local
```

### Required Environment Variables

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 measurement ID (e.g., G-XXXXXXXXXX)
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` - EmailJS service ID
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` - EmailJS public key
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` - EmailJS template ID
- `BREVO_API_KEY` - Brevo API key for email services
- `BREVO_SENDER_EMAIL` - Brevo sender email address
- `BREVO_TO_EMAIL` - Recipient email address

### Google Analytics Setup

The project includes Google Analytics 4 (GA4) integration with automatic page view tracking. To enable:

1. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in your `.env.local` file with your GA4 measurement ID
2. For production deployments, add the environment variable to your hosting platform (Vercel, Netlify, etc.)

The Google Analytics implementation includes:
- Automatic page view tracking on route changes
- Custom event tracking support via the `useAnalytics` hook
- Proper Next.js Script component integration for optimal performance

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `export` – exports static website to `out` folder
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

### DEMO

https://mantine-landing-925939727869.us-central1.run.app/
