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
        371: '371px',
        60: '60px',
        140: '140px',
        441: '441px',
        513: '513px',
      },
      width: {
        440: '440px',
      },
      lineHeight: {
        90: '90px',
      },
      maxWidth: {
        '1/2': '50%',
      },
      maxHeight: {
        60: '80vh',
      },
      lineHeight: {
        75: '75px',
      },
      backgroundColor: {
        modal: '#222030',
        'modal-transparent': 'rgba(0, 0, 0, 0.39)',
        navbar: 'rgb(36,34,46)',
        sidebar: '#11101A',
        post: '#24222F',
        singlepost: '#11101A',
        search: 'rgba(239, 239, 239, 0.3)',
      },
      background: {
        gradient: 'linear-gradient(0deg, #11101a 0%, #08080d 50.52%);',
      },
      borderRadius: {
        4: '4px',
      },
      width: {
        530: '530px',
        810: '810px',
        226: '226px',
      },
      borderColor: {
        search: 'rgba(239, 239, 239, 0.3)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
