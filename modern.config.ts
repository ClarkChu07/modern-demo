import { appTools, defineConfig } from '@modern-js/app-tools';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  // @ts-ignore
  builderPlugins: [pluginImageCompress()],
  dev: {
    // 与本地开发有关的选项
  },
  html: {
    favicon: './src/assets/image/logo.png',
    title: 'modern-demo',
    meta: {
      description: 'demo',
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
      forceSplitting: {
        axios: /node_modules\/axios/,
      },
    },
    removeMomentLocale: true,
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
  ],
  runtime: {
    router: true,
  },
  server: {
    port: 3000,
  },
  source: {
    alias: {
      '@interfaces': './src/interfaces',
      '@utils': './src/utils',
      '@assets': './src/assets',
    },
  },
  tools: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://www.example.com/',
          changeOrigin: true,
        },
      },
    },
  },
});
