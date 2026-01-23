/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* sage green with transparency */
        input: 'var(--color-input)', /* elevated surface color */
        ring: 'var(--color-ring)', /* sage green */
        background: 'var(--color-background)', /* off-white with green undertones */
        foreground: 'var(--color-foreground)', /* dark forest green */
        primary: {
          DEFAULT: 'var(--color-primary)', /* sage green */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* soft blue-gray */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* muted red-brown */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* elevated surface color */
          foreground: 'var(--color-muted-foreground)', /* muted green-gray */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* warm gold */
          foreground: 'var(--color-accent-foreground)', /* dark forest green */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)', /* dark forest green */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* elevated surface color */
          foreground: 'var(--color-card-foreground)', /* dark forest green */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* natural green */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* earthy orange */
          foreground: 'var(--color-warning-foreground)', /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* muted red-brown */
          foreground: 'var(--color-error-foreground)', /* white */
        },
      },
      fontFamily: {
        'sans': ['Source Sans 3', 'sans-serif'],
        'heading': ['Inter', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow-md)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'organic': '0 2px 4px rgba(107, 142, 122, 0.08), 0 8px 16px rgba(107, 142, 122, 0.04)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'DEFAULT': 'var(--radius)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'gentle-pulse': 'pulse 2s cubic-bezier(0.4, 0.0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.02)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
      },
      transitionTimingFunction: {
        'gentle': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}