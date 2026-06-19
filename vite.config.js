import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// De React dev-inspector en de inspect-overlay zijn lokale dev-tools.
// inspect-overlay.vite.ts staat bewust niet in git (zie .gitignore), dus de
// inspector wordt alleen in dev geladen en nooit in een productie-build (Vercel).
export default defineConfig(async ({ command }) => {
  const isDev = command === 'serve';

  const plugins = [
    tailwindcss(),
    isDev
      ? react({
          babel: { plugins: [['@react-dev-inspector/babel-plugin', {}]] },
        })
      : react(),
  ];

  const overlayPath = fileURLToPath(
    new URL('./inspect-overlay.vite.ts', import.meta.url)
  );
  if (isDev && existsSync(overlayPath)) {
    const mod = './inspect-overlay.vite.ts';
    const { inspectOverlay } = await import(/* @vite-ignore */ mod);
    plugins.push(inspectOverlay());
  }

  return { plugins };
});
