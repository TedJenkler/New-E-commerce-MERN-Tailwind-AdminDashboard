/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./dist/**/*.html", // Add dist HTML files if needed
    "./dist/**/*.{js,ts,jsx,tsx}", // Add dist JS/TS files if needed
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      screens: {
        'base': '376px',
        'xsm': '450px',
        'sm': '600px',
        'lmd': '900px',
        'l': '1000px',
      },
      fontSize: {
        'lxs': '0.8125rem',
        'sbase': '0.938rem',
        '28xl': '1.75rem',
        '32xl': '2rem',
        '40xl': '2.5rem',
        '56xl': '3.5rem',
      },
      colors: {
        'darkorange': '#D87D4A',
        'lightorange': '#fbaf85',
        'black1': '#121212',
        'white': '#FFFFFF',
        'greywhite': '#F1F1F1',
        'black2': '#000000',
        'lightgreywhite': '#FAFAFA',
        'bordergrey': '#979797',
        'hoverblack': '#4C4C4C',
        'inputborder': '#CFCFCF',
        'red': '#CD2C2C'
      },
      backgroundImage: {
        'hero': "url('/assets/bghero.png')",
        'heromd': "url('/assets/bgheromd.png')",
        'heroxl': "url('/assets/bgheroxl.svg')",
        'hero2': "url('/assets/bgzx9.png')",
        'hero2xl': "url('/assets/bgzx9xl.png')",
        'hero2md': "url('/assets/bgzx9md.png')",
        'hero3': "url('/assets/bgzx7.png')",
        'hero3md': "url('/assets/bgzx7md.png')",
        'hero3xl': "url('/assets/bgzx7xl.png')"
      },
    },
  },
  plugins: [],
}
