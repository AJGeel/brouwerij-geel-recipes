module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Space Grotesk', 'Inter', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#FFFFFF',
      'black': '#000000',
      'gray-100': '#F4F4F4',
      'gray-400': '#A699A5',
      'gray-500': '#8F7F8E',
      'gray-600': '#634E63',
      'gray-900': '#20011F',
      'amber-100': '#EDE8E1',
      'amber-200': '#CBC8C3',
      'amber-500': '#A07F4D',
    },
    extend: {},
  },
  plugins: [],
}
