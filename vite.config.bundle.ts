import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'

let styleCode = '';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), jsx()],
  build: {
    outDir: 'dist',
    minify: true, // 压缩
    emptyOutDir: false, // 每次构建前清空 dist 目录
    lib: {
      entry: 'src/components/index.ts',
      formats: ['umd', 'cjs', 'es'],
      name: 'MUI',
    },
    rollupOptions: {
      external: ['vue', 'classnames', 'lodash'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          classnames: 'classNames',
          lodash: 'lodash'
        }
      },
      plugins: [
        {
          // 将样式文件单独打包到一个目录
          name: 'vite-plugin-css-inject',
          generateBundle(config, bundle) {
            for (const key in bundle) {
              if (bundle[key]) {
                const chunk = bundle[key]; // 拿到文件名对应的值
                // 判断+提取+移除
                if (chunk.type === 'asset' && chunk.fileName.includes('.css')) {
                  styleCode += chunk.source;
                  delete bundle[key];
                }
              }
            }
            for (const key in bundle) {
              if (bundle[key]) {
                const chunk = bundle[key]; // 拿到文件名对应的值
                if (chunk.type === 'chunk' && chunk.fileName.match(/.[cm]?js$/) !== null && !chunk.fileName.includes('polyfill')) {
                  const initialCode = chunk.code; // 保存原有代码
                  // 重新赋值
                  chunk.code = `
                  (function(){ 
                    try {
                      var elementStyle = document.createElement('style'); 
                      elementStyle.appendChild(document.createTextNode(${JSON.stringify(styleCode.trim())}));
                      document.head.appendChild(elementStyle);
                    } catch(e) {
                      console.error(\'vite-plugin-css-injected-by-js\', e);
                    } 
                  })()
                  `;
                  // 拼接原有代码
                  chunk.code += initialCode;
                  break; // 一个bundle插入一次即可
                }
              }
            }
          }
        }
      ]
    },
  }
})



