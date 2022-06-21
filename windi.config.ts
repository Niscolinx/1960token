import { defineConfig } from 'windicss/helpers'

export default defineConfig({
    darkMode: 'class',
    extract: {
        include: ['**/*.{jsx,tsx,css}'],
        exclude: ['node_modules', '.git', '.next'],
    },
    theme: {
        extend: {
            gridTemplateColumns: {
                tc: 'repeat(auto-fit, minmax(8rem, 1fr))',
            },
            boxShadow: {
                neumorphism: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
             
            }
        },
    },
    attributify: true,
})
