/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
      extend: {
        fontFamily: {
            sans: ['Poppins', 'sans-serif'],
          },
        animation: {
          blink: 'blink 1s ease-in-out infinite',
          fadeIn: 'fadeIn 0.6s ease-out', // 👈 novo
        },
        keyframes: {
          blink: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.3' },
          },
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(8px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
      },
    },
    plugins: [],
  }
  