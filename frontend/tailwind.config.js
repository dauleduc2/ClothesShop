const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: { sky: colors.sky, lightBlue: colors.sky },
            spacing: {
                contentHeight: "calc(100vh - 64px )",
                120: "30rem",
                180: "45rem",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/typography"),
    ],
    important: true,
};
