/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 👇 JO BHI BLOGIFY KA CODE HAI, WO YAHAN AYEGA. FOR EXAMPLE:
      colors: {
        blogifyPrimary: "#your-color-code",
        blogifySecondary: "#your-color-code",
      },
      fontFamily: {
        blogifySans: ["Inter", "sans-serif"],
      },
      // 👆 Tumhara saara naya code is extend block ke andar rahega
    },
  },
  plugins: [],
};
