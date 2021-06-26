module.exports = {
  prefix: 'tw-',
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'tippydark': '#333',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
