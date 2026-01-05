/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'bg-light': '#F3F4F6', // Light gray background
        'card-white': '#FFFFFF',
        'text-primary': '#111827', // Dark gray text
        'text-secondary': '#6B7280', // Medium gray text
        'accent-green': '#10B981', // For positive stats
        'accent-red': '#EF4444', // For negative stats
        'accent-blue': '#3B82F6', // For weather/calendar icons
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}