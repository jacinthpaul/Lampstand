import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Built for GitHub Pages at https://jacinthpaul.github.io/Lampstand/, so the
// production bundle is served from the /Lampstand/ subpath. Local dev stays at
// the root for convenience.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Lampstand/' : '/',
  plugins: [react(), tailwindcss()],
}))
