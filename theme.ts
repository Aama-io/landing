import { Button, Container, createTheme, rem, type MantineColorsTuple } from '@mantine/core';

// Refined, confident brand blue — anchored on aama.io's #0055FF.
// Kept under the `blue` key so existing `var(--mantine-color-blue-*)` references
// inherit the refreshed palette automatically.
const brandBlue: MantineColorsTuple = [
  '#ecf2ff',
  '#d8e4ff',
  '#afc6ff',
  '#84a6ff',
  '#5e8aff',
  '#3d72ff',
  '#1f5aff', // 6 — primary
  '#1247db',
  '#0e3ab0',
  '#0b2e8a',
];

// Slate neutrals for a clean, airy, trustworthy surface system.
const slate: MantineColorsTuple = [
  '#f8fafc',
  '#f1f5f9',
  '#e2e8f0',
  '#cbd5e1',
  '#94a3b8',
  '#64748b',
  '#475569',
  '#334155',
  '#1e293b',
  '#0f172a',
];

export const theme = createTheme({
  fontFamily:
    'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  primaryColor: 'blue',
  primaryShade: { light: 6, dark: 5 },
  colors: {
    blue: brandBlue,
    brand: brandBlue,
    slate,
    // Map Mantine's neutral gray to slate so all dimmed text inherits the system.
    gray: slate,
  },
  white: '#ffffff',
  black: '#0f172a',
  defaultRadius: 'md',
  radius: {
    xs: rem(6),
    sm: rem(8),
    md: rem(12),
    lg: rem(16),
    xl: rem(24),
  },
  shadows: {
    xs: '0 1px 2px rgba(15, 23, 42, 0.04)',
    sm: '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
    md: '0 6px 16px rgba(15, 23, 42, 0.06), 0 2px 6px rgba(15, 23, 42, 0.04)',
    lg: '0 16px 40px rgba(15, 23, 42, 0.08), 0 4px 10px rgba(15, 23, 42, 0.04)',
    xl: '0 28px 70px rgba(15, 23, 42, 0.12), 0 10px 20px rgba(15, 23, 42, 0.06)',
  },
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  lineHeights: {
    xs: '1.45',
    sm: '1.5',
    md: '1.6',
    lg: '1.6',
    xl: '1.65',
  },
  headings: {
    fontFamily:
      'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.05', fontWeight: '800' },
      h2: { fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: '1.1', fontWeight: '800' },
      h3: { fontSize: rem(28), lineHeight: '1.2', fontWeight: '700' },
      h4: { fontSize: rem(22), lineHeight: '1.3', fontWeight: '700' },
      h5: { fontSize: rem(18), lineHeight: '1.4', fontWeight: '600' },
      h6: { fontSize: rem(15), lineHeight: '1.4', fontWeight: '600' },
    },
  },
  components: {
    Button: Button.extend({
      defaultProps: { radius: 'md' },
      styles: {
        root: { fontWeight: 600, letterSpacing: '-0.01em' },
      },
    }),
    Container: Container.extend({
      defaultProps: { size: 'lg' },
    }),
  },
  other: {
    maxWidth: '1200px',
  },
});
