module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      ibm: ['IBM Plex Sans', 'sans-serif'],
    },
    extend: {
      fontSize: {
        dynamic: 'clamp(5.4rem, 10vw, 8rem)',
        dynamicMd: 'clamp(4rem, 10vw, 5rem)',
      },
      colors: {
        trueGray: '#111',
      },
    },
  },
  variants: {
    extend: {
      top: ['last'],
      cursor: ['disabled'],
      pointerEvents: ['disabled'],
      backgroundColor: ['disabled', 'hover'],
    },
    backgroundColor: ({ after }) => after(['disabled']),
  },
  plugins: [],
}
