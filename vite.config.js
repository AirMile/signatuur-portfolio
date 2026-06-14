import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { inspectOverlay } from './inspect-overlay.vite.ts';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['@react-dev-inspector/babel-plugin', {}]],
      },
    }),
    inspectOverlay(),
  ],
});
