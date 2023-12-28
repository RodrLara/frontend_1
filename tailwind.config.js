/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html", 
    "./src/**/*.jsx"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'gray-100-transparent': 'rgba(15, 15, 15, 0.70)',
        'black-transparent': 'rgba(0, 0, 0, 0.75)',
      },
      outline: {
        green: '2px solid green',
  
      },
    },
  },
  plugins: [],
}

