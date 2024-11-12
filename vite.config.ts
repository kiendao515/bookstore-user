import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path, { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === 'development';

  return {
    plugins: [
      react(),
      VitePWA({
        manifest,
        includeAssets: ['hust-logo.png', 'robots.txt'],
        // switch to "true" to enable sw on development
        devOptions: {
          enabled: false,
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        app: resolve(__dirname, 'src', 'app'),
        components: resolve(__dirname, 'src', 'components'),
        hooks: resolve(__dirname, 'src', 'hooks'),
        routes: resolve(__dirname, 'src', 'routes'),
        utils: resolve(__dirname, 'src', 'utils'),
        pages: resolve(__dirname, 'src', 'pages'),
        styles: resolve(__dirname, 'src', 'styles'),
        assets: resolve(__dirname, 'src', 'assets'),
        layout: resolve(__dirname, 'src', 'layout'),
        store: resolve(__dirname, 'src', 'store'),
        ui: resolve(__dirname, 'src', 'ui'),
        type: resolve(__dirname, 'src', 'type'),
        api: resolve(__dirname, 'src', 'api'),
        contracts: resolve(__dirname, 'src', 'contracts'),
      },
    },
    css: {
      modules: {
        generateScopedName: isDevelopment ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:5]',
      },
    },
  };
});

