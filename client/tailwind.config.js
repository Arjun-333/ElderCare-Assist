/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    light: '#F0FDF4', // Very light green bg
                    DEFAULT: '#BBF7D0', // Primary Lime Green (Tailwind green-200 like)
                    dark: '#14532D', // Dark green text
                    accent: '#86EFAC', // Hover states
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
