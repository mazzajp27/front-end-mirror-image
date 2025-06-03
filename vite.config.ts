import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.otf'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          const extType = assetInfo.name.split('.')[1];
          if (!extType) return 'assets/[name]-[hash][extname]';
          if (/otf|ttf|eot|woff|woff2/i.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
      },
    },
  },
}));
