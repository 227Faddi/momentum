export default {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {
      fontFamily: {
        'chakra-petch': ['Chakra Petch', 'sans-serif'],  // Define the custom font
      },
    },
    // Set the default font family for the entire project
    fontFamily: {
      sans: ['Chakra Petch', 'sans-serif'],  // Use the custom font as the default sans-serif font
    },
  },

  plugins: [],
}

