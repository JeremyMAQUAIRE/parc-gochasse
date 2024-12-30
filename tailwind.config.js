/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brown: '#5C3117',
      },
    },
  },
  plugins: [import('tailwind-scrollbar')],
};
