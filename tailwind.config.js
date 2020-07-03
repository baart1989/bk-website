/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');
const _ = require('lodash');

const gradient = plugin(({ addUtilities, e, theme, variants }) => {
  const gradients = theme('gradients', {});
  const gradientVariants = variants('gradients', []);

  console.log({ gradients });
  console.log({ gradientVariants });

  const utilities = _.map(gradients, ([start, end], name) => ({
    [`.bg-gradient-${e(name)}`]: {
      backgroundImage: `linear-gradient(to right, ${start}, ${end})`,
    },
  }));
  console.log({ utilities });

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
      primary: [theme('colors.primary-gradient-color'), theme('colors.secondary-gradient-color')],
    }),
    screens: {
      sm: '480px',
      md: '640px',
      lg: '768px',
      xl: '1024px',
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
        bg: 'var(--primary-background)',
        bgalt: 'var(--secondary-background)',
        'color-default': 'var(--primary-text)',
        'color-secondary': 'var(--secondary-text)',
        'color-1': 'var(--color-1)',
        'color-2': 'var(--color-2)',
        'color-3': 'var(--color-3)',
        'color-4': 'var(--color-4)',
        primary: 'var(--primary)',
        'primary-gradient-color': '#f55555',
        'secondary-gradient-color': '#6888df',
        medium: {
          light: 'var(--medium-light)',
          default: 'var(--medium)',
          dark: 'var(--medium-dark)',
        },
        secondary: {
          light: 'var(--secondary-light)',
          default: 'var(--secondary)',
          dark: 'var(--secondary-dark)',
        },
      },
    },
  },
  variants: {},
  plugins: [gradient, headingSizes],
};
