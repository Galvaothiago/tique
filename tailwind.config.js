module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { transform: 'translateY(55px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1'}
        }
      },
      animation: {
        'bounce': 'bounce 1.75s infinite',
        'appear': 'appear .5s ease-in-out'
      }
    },
  },
  plugins: [],
}
