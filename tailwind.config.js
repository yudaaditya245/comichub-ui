/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      dropShadow : {
        "darksoft" : "0 0 15px rgba(0,0,0,0.08)"
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '2/3' : '2 / 3'
      },
      colors : {
        "dark-600" : "#232323",
        "dark-700" : "#1c1c1c",
        "light-300" : "#e5ebf1",
        'asura' : "#913fe2",
        'flame' : "#990e21"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
