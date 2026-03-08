import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Arquitetura limpa: Injetando o plugin nativo do Tailwind v4
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})