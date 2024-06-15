/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        'hero': "url('./src/assets/bghero.png')",
        'heromd': "url('./src/assets/bgheromd.png')",
        'heroxl': "url('./src/assets/bgheroxl.svg')",
        'hero2': "url('./src/assets/bgzx9.png')",
        'hero2xl': "url('./src/assets/bgzx9xl.png')",
        'hero2md': "url('./src/assets/bgzx9md.png')",
        'hero3': "url('./src/assets/bgzx7.png')",
        'hero3md': "url('./src/assets/bgzx7md.png')",
        'hero3xl': "url('./src/assets/bgzx7xl.png')"
      }
    },
  },
  plugins: [],
}
