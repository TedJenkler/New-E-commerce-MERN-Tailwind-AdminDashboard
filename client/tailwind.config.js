/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
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
      }
    },
  },
  plugins: [],
}
