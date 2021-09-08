module.exports = {
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    height:{
        '4em':'4em'
    },
    minWidth:{
        '64':`${64 / 4}rem`,
        '96':`${96 / 4}rem`,
    },
    maxWidth: {
        '64': `${64 / 4}rem`,
        '96': `${96 / 4}rem`,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
