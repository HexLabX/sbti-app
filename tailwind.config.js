export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#4d6a53', light: '#6c8d71', lighter: '#a5c4a8', bg: '#e8f0e9', page: '#f0f7f0' },
        dark: { DEFAULT: '#2d4a33', bg: '#1a1f1a', card: '#252b25', text: '#e8f0e9' },
      },
      fontFamily: { sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'] },
    },
  },
}
