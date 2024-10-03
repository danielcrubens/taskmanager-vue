const colors =require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},

    colors: {
      ...colors,
     'dark':{
          DEFAULT:'#2f2e41',          
        },
        'orange':{
          DEFAULT:'#f58966',
          
        },
      
    }
  },

  plugins: [],
}