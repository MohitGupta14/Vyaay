/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        colors: {
          bgGreen: '#DEF9C4',
          btnGreen : '#50B498',
          textGreen : '#508D4E',
          darkGreen : '#468585',
          navbar : '#243642'
        },
        fontFamily: {

          lato: ['Funnel Display', 'Lato', 'sans-serif'], // 'sans-serif' as fallback
        },
        backgroundImage: {
          'gradient-footer': 'linear-gradient(to right, #064e3b, #065f46, #047857)',
        }
    },
  },
  plugins: [],
}