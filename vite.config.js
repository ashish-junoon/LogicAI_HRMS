import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00ff00",      // pink-600
        primaryLight: "#F472B6", // pink-400
        primaryDark: "#BE185D",  // pink-700

        secondary: "#2563EB",    // blue-600 

        background: "#F9FAFB",   // gray-50
        surface: "#FFFFFF",

        textPrimary: "#111827",  // gray-900
        textSecondary: "#6B7280",// gray-500

        border: "#E5E7EB",       // gray-200

        success: "#16A34A",      // green-600
        warning: "#D97706",      // amber-600
        error: "#DC2626",        // red-600
        info: "#0284C7",         // sky-600
      }
    },
  },
})
