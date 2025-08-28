/**
 * Tailwind CSS configuration for GreenMind (GreenMind workspace)
 * Provides a sustainable/eco-themed color palette and common extensions.
 * Use classes like `bg-primary`, `text-accent`, `bg-cream`, etc.
 */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4CAF50',
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81C784',
          400: '#66bb6a',
          500: '#4CAF50',
          600: '#388E3C',
          700: '#2e7031',
          800: '#205522',
          900: '#133a15',
        },
        accent: {
          DEFAULT: '#F5F5DC',
          50: '#ffffff',
          100: '#fdfcf7',
          200: '#f5f5dc',
          300: '#e0d8c3',
          400: '#bcae8d',
          500: '#8D6E63',
          600: '#7a5e54',
          700: '#5c463f',
          800: '#3e2e2a',
          900: '#231813',
        },
        cream: {
          DEFAULT: '#fdfcf7',
          50: '#ffffff',
          100: '#fdfcf7',
          200: '#f5f5dc',
          300: '#e8f5e9',
          400: '#f1f8e9',
          500: '#f5f5dc',
          600: '#e0d8c3',
          700: '#bcae8d',
          800: '#8D6E63',
          900: '#5c463f',
        },
        surface: '#f8faf6',
        muted: '#6b7280',
      },
      fontFamily: {
        sans: ['Poppins', 'Montserrat', 'Lato', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 20px rgba(14, 27, 20, 0.06)',
      },
      borderRadius: {
        lg: '0.75rem',
      },
    },
  },
  plugins: [
    // Tailwind official plugins - install these in your project for best results
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
