/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        text_color: "#5A4978",
        sub_text_color: "#989EA8",
        sub_text_color_2: "#ECE8E1",
        sub_text_color_4: "#F27F0C",
        main_color: "#00008A",
        highligth: "#F29F05",
        calendar_weekend: "#17A1FA",
        survey_border_color: "#777B83",
        question_card_bg: "#E8ECF2",
        question_card_grey: "#C2C6CE",
      },
    },
  },
  plugins: [],
};
