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
      
    }
    
  },
  fontFamily: {
    'sans': ['Roboto', 'sans-serif'],
    'roboto': ['Roboto', 'sans-serif'],
  }
   
  },
  plugins: [require("preline/plugin"),   require('flowbite/plugin')]
  
};
