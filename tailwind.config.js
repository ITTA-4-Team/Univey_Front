/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        text_color:'#5A4978',
        sub_text_color:'#989EA8',
        sub_text_color_2: '#ECE8E1',
        main_color:'#00008A',
        highligth:'#F29F05',
        line_color:'#C2C6CE',
        box_color_1:'#4A4AB4',
        box_color_2:'#2E64B5',
        sub_text_color_4: "#F27F0C",
        holiday: "#17A1FA",
        
      },
      height:{
        xxl: '34rem',
        carousel: '36rem'
      },
      width:{
        line: '71%'
      },
      border:{
        xs : '5px'
      },     
      margin:{
        left : '14%',
        leftsm : '6%'
      },
      borderWidth: {
        '1': '1px',
      },
    },
  },
  plugins: [],
}

