import type { Config } from "tailwindcss"

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const svgToDataUri = require("mini-svg-data-uri");
 
const colors = require("tailwindcss/colors");


const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slideInFromLeft": {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        "slideOutToLeft": {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        "loadInFromLeft": {
          '0%': { transform: 'translateX(-20%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        "loadInFromRight": {
          '0%': { transform: 'translateX(20%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        "loadInFromBottom": {
          '0%': { transform: 'translateY(20%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        "loadInFromTop": {
          '0%': { transform: 'translateY(-50%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        "line-draw": {
          "0%": { height: "0%" },
          "100%": { height: "100%" },
        },
        "circle-draw": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-in-by-pixel": {
          "0%": { opacity: '0', transform: "translateY(20px)" },
          "100%": { opacity: '1', transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'slide-in-from-left': 'slideInFromLeft 0.1s ease-out',
        'slide-out-to-left': 'slideOutToLeft 0.1s ease-out',
        'load-in-from-left': 'loadInFromLeft 1s ease-in-out',
        'load-in-from-right': 'loadInFromRight 1s ease-in-out',
        'load-in-from-bottom': 'loadInFromBottom 1s ease-in-out',
        'load-in-from-top': 'loadInFromTop 1s ease-in-out',
        "line-draw": "line-draw 2s ease-in-out forwards",
        "circle-draw": "circle-draw 0.5s ease-in-out forwards",
        "fade-in-by-pixel": "fade-in-by-pixel 0.5s ease-out forwards",
      },
    },
  },
  
  plugins: [require("tailwindcss-animate"), addVariablesForColors,
  function ({ matchUtilities, theme }: any) {
    matchUtilities(
      {
        "bg-grid": (value: any) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
          )}")`,
        }),
        "bg-grid-small": (value: any) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
          )}")`,
        }),
        "bg-dot": (value: any) => ({
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
          )}")`,
        }),
      },
      { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
    );
  },],
} satisfies Config

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

export default config