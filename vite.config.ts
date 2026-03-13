import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ command }) => ({
	base: command === 'build' ? '/fop-calc/' : '/',
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, './src'),
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/test/setup.ts',
	},
}))
