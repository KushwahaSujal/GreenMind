/**
 * Tailwind CSS configuration for GreenMind (GreenMind workspace)
 * Provides a sustainable/eco-themed color palette and common extensions.
 * Use classes like `bg-primary`, `text-accent`, `bg-cream`, etc.
 */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#16a34a',
          50: '#ecf9ef',
          100: '#dff3df',
          200: '#bff0bf',
          300: '#99e79a',
          400: '#5fd56b',
          500: '#16a34a',
          600: '#13843c',
          700: '#0f6b31',
          800: '#0b4e24',
          900: '#073618',
        },
        accent: {
          DEFAULT: '#0d9488',
          50: '#e7f9f7',
          100: '#dff3ef',
          200: '#bfece4',
          300: '#9be3d6',
          400: '#4fd0bd',
          500: '#0d9488',
          600: '#0b7a6f',
          700: '#085d55',
          800: '#05403b',
          900: '#033027',
        },
        cream: {
          DEFAULT: '#fff9f2',
          50: '#ffffff',
          100: '#fffefb',
          200: '#fffaf1',
          300: '#fff6e6',
          400: '#fff0d3',
          500: '#fff9f2',
          600: '#f7efe0',
          700: '#efe3cc',
          800: '#e6d6b8',
          900: '#d6bea0',
        },
        surface: '#f8faf6',
        muted: '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
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
