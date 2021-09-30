const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: { sky: colors.sky, lightBlue: colors.lightBlue },
            spacing: {
                contentHeight: "calc(100vh - 64px )",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
    important: true,
};
