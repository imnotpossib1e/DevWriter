module.exports = {
  // 아래 구문 추가
  plugins: [require('@tailwindcss/typography')],
};
export default {
  darkMode: 'class', // 👈 이거 추가!
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
};
