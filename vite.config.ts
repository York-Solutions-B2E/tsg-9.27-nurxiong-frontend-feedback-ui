import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom', // simulates a browser for React components
        setupFiles: './src/setupTests.ts', // optional, you can add test utilities here
    },
})
