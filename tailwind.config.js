/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(50px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-50px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          from: { opacity: '0', transform: 'translateX(50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          from: { opacity: '0', transform: 'translateX(-50px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fadeInUp-2': 'fadeInUp 0.2s ease both',
        'fadeInUp-4': 'fadeInUp 0.4s ease both',
        'fadeInUp-6': 'fadeInUp 0.6s ease both',
        'fadeInUp-8': 'fadeInUp 0.8s ease both',
        'fadeInUp-10': 'fadeInUp 1.0s ease both',
        'fadeInDown-2': 'fadeInDown 0.2s ease both',
        'fadeInDown-4': 'fadeInDown 0.4s ease both',
        'fadeInDown-6': 'fadeInDown 0.6s ease both',
        'fadeInDown-8': 'fadeInDown 0.8s ease both',
        'fadeInDown-10': 'fadeInDown 1.0s ease both',
        'fadeInLeft-2': 'fadeInLeft 0.2s ease both',
        'fadeInLeft-4': 'fadeInLeft 0.4s ease both',
        'fadeInLeft-6': 'fadeInLeft 0.6s ease both',
        'fadeInLeft-8': 'fadeInLeft 0.8s ease both',
        'fadeInLeft-10': 'fadeInLeft 1.0s ease both',
        'fadeInRight-2': 'fadeInRight 0.2s ease both',
        'fadeInRight-4': 'fadeInRight 0.4s ease both',
        'fadeInRight-6': 'fadeInRight 0.6s ease both',
        'fadeInRight-8': 'fadeInRight 0.8s ease both',
        'fadeInRight-10': 'fadeInRight 1.0s ease both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
