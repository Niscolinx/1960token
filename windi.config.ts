import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  theme: {
    extend: {
      gridTemplateColumns: {
        tc: 'repeat(auto-fit, minmax(18rem, 1fr))'
      },
    },
  },
  attributify: true,
})
