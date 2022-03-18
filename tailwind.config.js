module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#2E2E2E',
        'light-dark': '#3D3D3D',
        'primary': '#BE1F2C',
      }
    },
  },
  plugins: [],

}