/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        '75sc': '75vh',
      },
      lineHeight: {
        90: '90px',
      },
      maxWidth: {
        '1/2': '50%',
      },
      lineHeight: {
        75: '75px',
      },
      backgroundColor: {
        modal: '#222030',
        'modal-transparent': 'rgba(0, 0, 0, 0.39)',
      },
      background: {
        gradient: 'linear-gradient(0deg, #11101a 0%, #08080d 50.52%);',
      },
      borderRadius: {
        4: '4px',
      },
    },
  },
  plugins: [],
};
