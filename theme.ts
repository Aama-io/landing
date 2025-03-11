import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'blue',
  colors: {
    blue: [
      '#E6F7FF',
      '#BAE7FF',
      '#91D5FF',
      '#69C0FF',
      '#40A9FF',
      '#1890FF',
      '#096DD9',
      '#0050B3',
      '#003A8C',
      '#002766',
    ],
  },
  shadows: {
    md: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    lg: '0 2px 4px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.1)',
  },
  headings: {
    fontFamily: 'Inter, sans-serif',
    sizes: {
      h1: { fontSize: rem(48) },
      h2: { fontSize: rem(36) },
      h3: { fontSize: rem(24) },
    },
  },
  other: {
    backgroundGradient: 'radial-gradient(circle at top center, var(--mantine-color-blue-1) 0%, var(--mantine-color-white) 100%)',
    cardHover: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
});
