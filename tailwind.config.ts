import type { Config } from 'tailwindcss';
const {nextui} = require("@nextui-org/theme");

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      yati: ['Yati', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#197CC0',
        gray_500: '#667085',
        gray_700: '#344054',
        blue_50: '#EFF8FF',
        error_b: '#FDA29B',
        error: '#F04438',
        text: {
          700: '#475467',
          950: '#101828',
        },
        blue:{
            100:"#e0f2fe"
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), nextui()],
};
export default config;
