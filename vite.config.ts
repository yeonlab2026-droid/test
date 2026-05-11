import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const buildTime = new Date().toLocaleString('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit',
  hour12: false,
}).replace(/\. /g, '-').replace('.', '') + ' KST'

export default defineConfig({
  base: '/test/',
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0'),
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
})
