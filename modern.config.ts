import { appTools, defineConfig, mergeConfig } from '@modern-js/app-tools';
import type { AppUserConfig } from '@modern-js/app-tools';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';

let envDefineConfig: AppUserConfig<'rspack'> = {};

if (process.env.ENV === 'dev') {
  envDefineConfig = {
    server: {
      port: 8000,
      // baseUrl: '/dev',
    },
    tools: {
      devServer: {
        proxy: {
          '/dev': {
            target: 'http://api.dev.com/',
            changeOrigin: true,
          },
        },
      },
    },
  };
} else if (process.env.ENV === 'test') {
  envDefineConfig = {
    server: {
      port: 8000,
    },
    tools: {
      devServer: {
        proxy: {
          '/test': {
            target: 'http://api.test.com/',
            changeOrigin: true,
          },
        },
      },
    },
  };
} else if (process.env.ENV === 'prod') {
  envDefineConfig = {
    // @ts-ignore
    builderPlugins: [pluginImageCompress()],
    performance: {
      bundleAnalyze: {
        analyzerMode: 'static',
        openAnalyzer: true,
        reportFilename: 'report-web.html',
      },
      removeConsole: ['log', 'warn'],
      profile: true,
    },
    server: {
      port: 8000,
    },
    tools: {
      devServer: {
        proxy: {
          '/prod': {
            target: 'http://api.prod.com/',
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
  };
}

const baseDefineConfig: AppUserConfig<'rspack'> = {
  dev: {
    // 与本地开发有关的选项
  },
  html: {
    favicon: './src/assets/image/logo.png',
    title: 'modern-demo',
    meta: {
      description: 'demo',
    },
    disableHtmlFolder: true,
  },
  output: {
    // 与构建产物有关的选项
    assetPrefix: '/',
    distPath: {
      js: 'js',
      css: 'css',
      html: '',
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
    sourceMap: {
      js: false,
      css: false,
    },
    filename: {
      html: 'index.html',
    }
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
      bundler: 'rspack',
    }),
  ],
  runtime: {
    router: true,
  },
  source: {
    alias: {
      '@interfaces': './src/interfaces',
      '@utils': './src/utils',
      '@assets': './src/assets',
    },
    define: {
      'process.env': JSON.stringify({
        ENV: process.env.ENV,
        BASE_URL: process.env.BASE_URL,
      }),
    },
  },
};

const mergeDefineConfig = mergeConfig([baseDefineConfig, envDefineConfig]);

// console.log(mergeDefineConfig, 'mergeDefineConfig');

// https://modernjs.dev/en/configure/app/usage
export default defineConfig(mergeDefineConfig);
