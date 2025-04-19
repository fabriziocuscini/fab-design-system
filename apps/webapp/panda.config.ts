import { defineConfig } from "@pandacss/dev";
import { createPreset } from '@park-ui/panda-preset'
import amber from '@park-ui/panda-preset/colors/amber'
import slate from '@park-ui/panda-preset/colors/slate'
import { recipes, slotRecipes } from './src/theme/recipes'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      recipes,
      slotRecipes,
    },
  },

  // Add the Park UI preset
  presets: [createPreset({ accentColor: amber, grayColor: slate, radius: 'sm' })],

  // Set the JSX framework
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: "styled-system",
});
