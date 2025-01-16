/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          700: '#1d3557',
          800: '#112240',
          900: '#0a192f',
        },
        cyan: {
          500: '#64ffda',
        },
      },
    },
  },
  plugins: [],
}

