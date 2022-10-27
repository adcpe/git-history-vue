import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    define: {
      __APP_ENV__: env.APP_ENV
    }
  }
})
