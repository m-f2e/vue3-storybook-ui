import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
// import dts from 'vite-plugin-dts'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), jsx()],
  build: {
    target: 'modules',
    minify: true, // 压缩
    // cssCodeSplit: true, // css分离
    lib: {
      entry: 'src/components/index.ts',
      // name: 'MButton',
      // fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'classnames', 'lodash'],
      input: ['src/components/index.ts'],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          entryFileNames: '[name].js', // .es.js，默认改为.js
          assetFileNames: 'index.[ext]',
          preserveModules: true,
          preserveModulesRoot: 'src/components',
          exports: 'named', // 消除命名默认导出警告
        },
        {
          format: 'cjs',
          dir: 'dist/lib',
          entryFileNames: '[name].js',
          assetFileNames: 'index.[ext]',
          preserveModules: true,
          preserveModulesRoot: 'src/components',
          exports: 'named', // 消除命名默认导出警告
        }
      ],
      plugins: [
        {
          // 将样式文件单独打包到一个目录
          name: 'vite-plugin-style',
          generateBundle(config, bundle) {
            Object.values(bundle).forEach((chunk) => {
              if (chunk.type === 'asset' && chunk.fileName.endsWith('.css')) {
                // 将满足条件的 css 文件的输出路径修改为 ../styles/[name].css 路径下
                chunk.fileName = path.join('../', 'styles', path.basename(chunk.fileName));
              }
            });
          }
        }
      ]
    },
  }
})
