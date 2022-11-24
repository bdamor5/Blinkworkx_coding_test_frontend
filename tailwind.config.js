/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      '3xl': {'max': '2561px'},
      // => @media (max-width: 2561px) { ... }
  
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }
  
      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }
  
      'lg': {'max': '1025px'},
      // => @media (max-width: 1025px) { ... }
  
      'md': {'max': '769px'},
      // => @media (max-width: 769px) { ... }
  
      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
  
      'xs': {'max': '430px'},
      // => @media (max-width: 430px) { ... }
    }
  },
  plugins: [],
 
}


