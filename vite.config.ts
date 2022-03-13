import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'
// 导入 压缩代码的的插件
import viteCompression from 'vite-plugin-compression'

// 导入压缩图片的插件
// import viteImagemin from 'vite-plugin-imagemin'

// cdn 加速
// import importToCDN from 'vite-plugin-cdn-import'

// 导入mock文件
import { viteMockServe } from 'vite-plugin-mock'

import autoprefixer from 'autoprefixer'

// element-puls 按需导入的插件
// 配置好 element-puls的按需导入后 除el组件的其它组件名不能以 el 开头 否则会保错
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    // 打包压缩代码
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // 配置mock文件
    viteMockServe({
      mockPath: 'mock',
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        // Icon自动引入解析器
        IconsResolver({
          // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
          prefix: 'icon',
          // 标识自定义图标集
          customCollections: ['custom'],
        }),
      ],
    }),
    Icons({
      compiler: 'vue3',
      // 自动安装
      autoInstall: true,
      customCollections: {
        // 自定义图标集
        // 这里是存放svg图标的文件地址，custom是自定义图标库的名称
        custom: FileSystemIconLoader('./src/assets/icons'),
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            '> 1%',
          ],
          grid: true,
        }),
        require('postcss-flexbugs-fixes'),
      ],
    },
    // 配置全局样式
    preprocessorOptions: {
      less: {
        charset: false,
        // additionalData: '@import "./src/style/common.less";',
      },
    },
  },
  resolve: {
    // 为文件路径取别名
    alias: {
      '@': '/src',
      // '@': resolve(__dirname, 'src'),
      // comp: src 下的 components 路径别名
      comp: resolve(__dirname, 'src/components'),
      '/imgs': '/src/assets',
    },
  },
  // 生产环境配置
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生成输出时 去除所有console.log
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 取消计算文件大小，加快打包速度
    reportCompressedSize: false,
    // sourcemap: true,
    rollupOptions: {
      // 打包输出的文件按后缀名分类配置
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
  },
  // 热更新配置
  server: {
    port: 8080,
    // 配置代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:2233',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
