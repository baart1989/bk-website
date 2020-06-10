/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');
const _ = require('lodash');

const gradient = plugin(({ addUtilities, e, theme, variants }) => {
  const gradients = theme('gradients', {});
  const gradientVariants = variants('gradients', []);

  const utilities = _.map(gradients, ([start, end], name) => ({
    [`.bg-gradient-${e(name)}`]: {
      backgroundImage: `linear-gradient(to right, ${start}, ${end})`,
    },
  }));

  addUtilities(utilities, gradientVariants);
});

const headingSizes = plugin(({ addBase, config }) => {
  addBase({
    h1: {
      fontSize: config('theme.fontSize.5xl'),
      '@screen sm': {
        fontSize: config('theme.fontSize.6xl'),
      },
    },
    h2: {
      fontSize: config('theme.fontSize.4xl'),
      '@screen sm': {
        fontSize: config('theme.fontSize.5xl'),
      },
    },
    h3: {
      fontSize: config('theme.fontSize.3xl'),
      '@screen sm': {
        fontSize: config('theme.fontSize.4xl'),
      },
    },
    h4: {
      fontSize: config('theme.fontSize.2xl'),
      '@screen sm': {
        fontSize: config('theme.fontSize.3xl'),
      },
    },
    h5: {
      fontSize: config('theme.fontSize.xl'),
      '@screen sm': {
        fontSize: config('theme.fontSize.2xl'),
      },
    },
    h6: {
      fontSize: config('theme.fontSize.lg'),
      '@screen sm': {
        fontSize: config('theme.fontSize.xl'),
      },
    },
  });
});

module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    gradients: theme => ({
      primary: [theme('colors.primary'), theme('colors.secondary')],
    }),
    screens: {
      sm: '480px',
      md: '640px',
      lg: '768px',
      xl: '1024px',
    },
    themes: {
      dark: {
        bg: '#111',
        bgalt: '#000',
        'color-default': '#eee',
        'color-1': '#c35fde',
        'color-2': '#adbfef',
        'color-3': '#aeb4c5',
        'color-4': '#d8d8d8',
        border: '#718096',
        primary: '#f55555',
        medium: '#222',
      },
    },
    extend: {
      fontSize: {
        '7xl': '5rem',
      },
      spacing: {
        '1px': '1px',
        '2px': '2px',
      },
      colors: {
        bg: '#fff',
        bgalt: '#f5f5f5',
        'color-default': '#333',
        'color-1': '#8e24aa',
        'color-2': '#673ab7',
        'color-3': '#aeb4c5',
        'color-4': '#d8d8d8',
        primary: '#f55555',
        secondary: '#6888df',
        link: '#0a71c5',
        medium: '#cfd8dc',
        white: '#fff',
        black: '#000',
        transparent: 'rgba(0,0,0,0)',
        error: '#ef5350',
        success: '#8bc34a',
      },
    },
  },
  variants: {},
  plugins: [require(`tailwind-theme-switcher`), gradient, headingSizes],
};
