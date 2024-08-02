module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "auth-screen": "var(--auth-screen-bg-color)",
        "auth-card": "var(--auth-card-bg-color)",
        "btn-primary": "var(--btn-primary)",
        "btn-primary-color": "var(--btn-primary-color)",
      },
    },
  },
  plugins: [],
};
