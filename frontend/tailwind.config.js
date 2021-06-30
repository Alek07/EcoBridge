module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        login: "url('/images/login_bg.png')",
        hero: "url('/images/main_header.png')",
      }),
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        xl: '1px 5px 6px -4px rgba(0,0,0,0.1)',
      },
    },
  },
  variants: {
    transition: ['hover', 'focus'],
    brightness: ['hover', 'focus'],
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
