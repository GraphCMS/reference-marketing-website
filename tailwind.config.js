module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {},
  },
  variants: {
    margin: ['responsive', 'first'],
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/ui')],
}
