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
  output: {
    // 与构建产物有关的选项
    assetPrefix: '/',
    distPath: {
      image: 'assets/image',
      svg: 'assets/svg',
      font: 'assets/font',
      media: 'assets/media',
    },
    dataUriLimit: {
      svg: 10000,
      font: 10000,
      image: 10000,
      media: 0,
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
      forceSplitting: {
        axios: /node_modules\/axios/,
      },
    },
    bundleAnalyze: {
      analyzerMode: 'static',
      openAnalyzer: true,
      reportFilename: `report-web.html`,
    },
    removeConsole: ['log', 'warn'],
    removeMomentLocale: true,
    profile: true,
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
    define: {
      'process.env.ENV': JSON.stringify(process.env.ENV),
    }
  },
  tools: {
    devServer: {
      proxy: {
        '/prod': {
          target: 'http://www.example.com/',
          changeOrigin: true,
        },
      },
    },
    // 与底层工具有关的选项
    rspack(config, { appendPlugins }) {
      appendPlugins(
        new RsdoctorRspackPlugin({
          // 插件选项
        }),
      );
    },
  },
});
