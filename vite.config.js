// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      //  '/api': 'http://localhost:3000', // Proxy API requests to your local server
      '/api': 'https://video-tube-backend-9lix.vercel.app/',

      // '/socket.io/':'http://localhost:3000'
      //  {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   ws: true,
      //   rewrite: (path) => path.replace(/^\/socket.io/, ''),
      // },
    },
  },
  plugins: [react()],
});

