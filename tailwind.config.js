/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        /* ---- Primary (Royal Purple / Eggplant) ---- */
        primary: {
          50:  'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          900: 'var(--color-primary-900)',
        },
        /* ---- Accent (Gold) ---- */
        gold: {
          50:  'var(--color-gold-50)',
          100: 'var(--color-gold-100)',
          500: 'var(--color-gold-500)',
          600: 'var(--color-gold-600)',
          700: 'var(--color-gold-700)',
        },
        /* ---- Background surfaces ---- */
        background: {
          DEFAULT: 'var(--color-bg-base)',
          surface: 'var(--color-surface)',
          hover:   'var(--color-surface-hover)',
        },
        /* Convenience top-level aliases (so `bg-surface`, `bg-base` also work) */
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        /* ---- Text colors (accessibility-focused) ---- */
        content: {
          main:   'var(--color-text-main)',
          body:   'var(--color-text-body)',
          muted:  'var(--color-text-muted)',
          invert: 'var(--color-text-invert)',
        },
        /* ---- Semantic / status ---- */
        status: {
          success:    'var(--color-success)',
          'success-bg': 'var(--color-success-bg)',
          error:      'var(--color-error)',
          'error-bg':   'var(--color-error-bg)',
          warning:    'var(--color-warning)',
          'warning-bg': 'var(--color-warning-bg)',
          info:       'var(--color-info)',
          'info-bg':    'var(--color-info-bg)',
        },
      },
      fontFamily: {
        /* Default to Farsi-Digit variant so numerals render Persian automatically */
        sans: ['Vazirmatn-FD', 'Vazirmatn', 'sans-serif'],
        /* Latin-digit variant for price board (financial LTR data) */
        latin: ['Vazirmatn', 'sans-serif'],
      },
      boxShadow: {
        'card':       '0 2px 8px -2px rgba(74, 21, 75, 0.08)',
        'card-hover': '0 10px 15px -3px rgba(74, 21, 75, 0.12)',
        'vip':        '0 10px 40px -10px rgba(74, 21, 75, 0.50)',
        'gold-glow':  '0 0 20px rgba(212, 175, 55, 0.40)',
      },
      maxWidth: {
        'page': '1280px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
