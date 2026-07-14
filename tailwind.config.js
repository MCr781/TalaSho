/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          500: 'var(--color-primary-500)',
          700: 'var(--color-primary-700)'
        },
        gold: {
          50: 'var(--color-gold-50)',
          500: 'var(--color-gold-500)',
          600: 'var(--color-gold-600)'
        },
        background: 'var(--color-bg-base)',
        surface: 'var(--color-surface)',
        content: {
          main: 'var(--color-text-main)',
          body: 'var(--color-text-body)',
          muted: 'var(--color-text-muted)'
        },
        success: 'var(--color-success)',
        error: 'var(--color-error)'
      },
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(74, 21, 75, 0.05)',
        'card-hover': '0 10px 25px -4px rgba(74, 21, 75, 0.1), 0 4px 10px -2px rgba(212, 175, 55, 0.1)',
        'vip': '0 10px 40px -10px rgba(74, 21, 75, 0.1), 0 4px 10px -2px rgba(212, 175, 55, 0.1)'
      }
    }
  },
  plugins: [],
}
