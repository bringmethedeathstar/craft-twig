module.exports = {
  important: true,

  theme: {
    container: {
      center: true,
      padding: '1rem',
    },

    extend: {
      screens: {
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },
      },

      colors: {
        primary: '#e5422b',
      },
    },
  },
  variants: {},
  plugins: [],
};
