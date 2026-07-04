/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: '#0A0F1E',
          900: '#070B16',
          800: '#0A0F1E',
          700: '#111829',
          600: '#141A2E',
          500: '#1B2340',
        },
        mint: {
          DEFAULT: '#2DE68F',
          light: '#5BF3AC',
          dark: '#1FBE74',
        },
        cyan: {
          glow: '#38BDF8',
        },
        gold: {
          DEFAULT: '#F5C451',
          dark: '#D9A227',
        },
        ink: {
          DEFAULT: '#E8ECF5',
          muted: '#8A93A8',
          faint: '#5A6379',
        },
      },
      fontFamily: {
        display: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
        body: ['var(--font-tajawal)', 'system-ui', 'sans-serif'],
        pixel: ['var(--font-pixel)', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(45, 230, 143, 0.45)',
        'glow-cyan': '0 0 40px -8px rgba(56, 189, 248, 0.45)',
        'glow-gold': '0 0 40px -8px rgba(245, 196, 81, 0.4)',
        card: '0 20px 60px -20px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'mint-cyan': 'linear-gradient(120deg, #2DE68F 0%, #38BDF8 100%)',
        'pixel-grid':
          'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(6deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-28px) rotate(-8deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};
