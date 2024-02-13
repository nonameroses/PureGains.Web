/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/**/*.{html,ts}",
    "./src/**/**/**/*.{html,ts}",
    "./src/**/**/**/**/*.{html,ts}",
    "./src/**/**/**/**/**/*.{html,ts}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {colors: {
      transitionProperty: {
        'height': 'max-height',
        'spacing': 'margin, padding',
      },
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'tahiti': {
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
      'black-grey-10' : '#2C2F3F',
      'black-grey-20' : '#272933',
      'cp-1':'#e63946',
      'cp-2':'#f1faee',
      'cp-3':'#a8dadc',
      'cp-4':'#457b9d',
      'cp-41':'#2e5168',
      'cp-42':'#355f7a',
      'cp-43':'#3d6d8b',
      'cp-44':'#45659d',
      'cp-5':'#1d3557',
      'bliu-1' : '#3a62ff',
      'bliu-2' : '#224cb6',
      'bliu-3' : '#007BFF',
      'bliu-4' : '#1BC0EA',
      'green-1' : '#2ECC40',
      'darkblue': '#000428',
      'deepblue': '#004e92',

      'orange-1' : '#FFA500'
    

    },
    gradientColorStops: theme => ({
      ...theme('colors'),
      'primary': '#000428',
      'secondary': '#004e92',
    }),
  },
  fontFamily: {
    'sans': ['Roboto', 'sans-serif'],
    'roboto': ['Roboto', 'sans-serif'],
  },animation: {
    'rotate-to-180': 'rotate-to-180 0.5s ease-in-out forwards',
    'rotate-to-0': 'rotate-to-0 0.5s ease-in-out forwards',
  },

   
  },
  plugins: [require("preline/plugin"),   require('flowbite/plugin')]
  
};
