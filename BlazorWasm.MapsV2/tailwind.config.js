/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{razor,html,cshtml}"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: "#f9fcf0",
                    dark: "#1a1c13",
                },
                foreground: {
                    DEFAULT: "#1a1c13",
                    dark: "#f9fcf0",
                },
                primary: {
                    DEFAULT: "#849258",
                    foreground: "#ffffff",
                    dark: "#a2ad86",
                },
                secondary: {
                    DEFAULT: "#fcd9b1",
                    foreground: "#1a1c13",
                },
                accent: {
                    DEFAULT: "#a2ad86",
                    foreground: "#ffffff",
                },
                card: {
                    DEFAULT: "#ffffff",
                    dark: "#2a2d21",
                },
                muted: {
                    DEFAULT: "#d9e2b1",
                    dark: "#3a3d31",
                }
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            },
            fontFamily: {
                sans: ['Inter', 'Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
