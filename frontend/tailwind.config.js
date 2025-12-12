
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#F6FEF9',
          100: '#E8FBF0',
          300: '#A2F1CE',
          500: '#10B981', 
          700: '#059669'
        },
        primary: {
          500: '#4F46E5', 
        }
      },
      dropShadow: {
        'lg-soft': '0 30px 50px rgba(2,6,23,0.08)'
      }
    },
  },
  plugins: [],
};
