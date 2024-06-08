/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'lxs': '0.8125rem',
        'sbase': '0.938rem',
        '28xl': '1.75rem',
      },
      colors: {
        'darkorange': '#D87D4A',
        'lightorange': '#fbaf85',
        'black1': '#101010',
        'white': '#FFFFFF',
        'greywhite': '#F1F1F1',
        'black2': '#000000',
        'lightgreywhite': '#FAFAFA',
        'bordergrey': '#979797',
        'hoverblack': '#4C4C4C',
      },
      backgroundImage: {
        'hero': "url('./src/assets/bghero.png')",
        'hero2': "url('./src/assets/bgzx9.png')",
        'hero3': "url('./src/assets/bgzx7.png')",
      }
    },
  },
  plugins: [],
}
