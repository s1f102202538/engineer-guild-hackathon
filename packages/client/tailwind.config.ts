import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        green: {
          '50': '#effefa',
          '100': '#c9fef1',
          '200': '#92fde3',
          '300': '#54f4d4',
          '400': '#27e1c1',
          '500': '#08c4a6',
          '600': '#039e89',
          '700': '#087d6f', // 一旦デフォルト
          '800': '#0b645a',
          '900': '#0f524b',
          '950': '#01322f',
        },
        beige: {
          '50': '#f9f7f3',
          '100': '#f0ede4', //一旦デフォルト
          '200': '#e0d9c8',
          '300': '#ccc0a5',
          '400': '#b7a380',
          '500': '#a88e67',
          '600': '#9b7c5b',
          '700': '#81654d',
          '800': '#695343',
          '900': '#564538',
          '950': '#2e231c',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
