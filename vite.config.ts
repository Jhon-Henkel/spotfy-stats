import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {defineConfig, loadEnv} from 'vite'

export default defineConfig(() => {
    const env = loadEnv('', process.cwd())
    return {
        plugins: [
            vue(),
            legacy(),
        ],
        envDir: './src/environments/.env',
        appType: 'spa',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        define: {
            'process.env': env
        },
        test: {
            globals: true,
            environment: 'jsdom'
        }
    }
})
