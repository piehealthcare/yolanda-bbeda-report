/* eslint-disable import/extensions */
// eslint-disable-next-line
/// <reference path="./src/global.d.ts" />

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import cheerio from 'cheerio';
import rimraf from 'rimraf';
import cssEnv from 'postcss-preset-env';
import pxtorem from 'postcss-pxtorem';
import dayjs from 'dayjs';
import legacy from '@vitejs/plugin-legacy';
import styleImport from 'vite-plugin-style-import';
// 需要引入此插件，否则原始的那个jsx编译表现不一定会符合预期
import vueJsx from '@vitejs/plugin-vue-jsx';
import pkg from './package.json';

function transferMetaCharacters(raw) {
  return raw.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$&');
}

function resolveAliasPath(filePath: string) {
  return filePath.replace(/@/g, 'src/');
}

function resolveAbsolutePath(filePath: string, dirname: string = __dirname) {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }

  return path.resolve(dirname, resolveAliasPath(filePath));
}

function mkdirsSync(dirname: string) {
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }

  return false;
}

export default ({ mode }) => {
  console.log('构建模式:', mode);
  const modeEnv = loadEnv(mode, process.cwd());
  console.log(modeEnv);

  const pages = glob.sync(path.resolve(__dirname, 'src/views/**/page.config.js'));
  const entries: Record<string, any> = {};
  const distH5Dir = 'h5';
  rimraf.sync(distH5Dir);

  pages.forEach((configFile) => {
    // eslint-disable-next-line
    const config: TypePageConfig = require(configFile);
    if (config.enable) {
      const dirname = path.dirname(configFile);
      const inputName = path.relative('src/views', dirname);
      const defaultTemplate = path.resolve(__dirname, 'template.html');
      const template = resolveAbsolutePath(config.template || defaultTemplate, dirname);
      let tplPath = template;
      if (!config.disableTemplateConvert) {
        const $ = cheerio.load(fs.readFileSync(tplPath).toString(), { decodeEntities: false, xmlMode: false });
        const $html = $('html');
        $html.attr('data-build-time', dayjs().format('YYYY-MM-DD HH:mm:ss'));
        $html.attr('data-build-version', pkg.version);
        // $html.find('title').text = config.title || dirname;
        const $entryModule = $html.find('#entryModule');
        $entryModule.attr('src', `/${path.relative(__dirname, resolveAbsolutePath(config.entry || 'main.ts', dirname))}`);

        tplPath = `${resolveAbsolutePath(path.resolve(distH5Dir, inputName), '')}.html`;
        mkdirsSync(path.relative(__dirname, path.dirname(tplPath)));
        fs.writeFileSync(tplPath, $.html());
      }
      Object.assign(entries, {
        [config.name || inputName]: tplPath,
      });
    }
  });

  console.log('entries', entries);

  // https://vitejs.dev/config/
  return defineConfig({
    base: modeEnv.VITE_BASE_URL || '/',
    plugins: [
      vue(),
      vueJsx(),
      legacy(),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => `vant/es/${name}/style`,
          },
        ],
      }),
    ],
    resolve: {
    // 配置别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      rollupOptions: {
        input: entries,
      },
      // NOTE 官方文档有误。import.meta.env 总是为undefined
      outDir: modeEnv.VITE_OUT_DIR || 'dist',
    },
    esbuild: {
    // 需要jsx插件才能这样写，否则 需要使用 jsxInject 引入 h 并且 jsxFragment 也需要指定为 h
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    // jsxFragment: 'h',
    // jsxInject: 'import { h } from "vue"',
    },
    css: {
      postcss: {
        plugins: [
          cssEnv({
            preserve: true,
            importFrom: ['src/assets/style/variables.css'],
            stage: -1,
          }),
          pxtorem({
            rootValue: 75 / 2,
            propList: ['*'],
          // selectorBlackList: [/^\.van-/],
          }),
        ],
      },
    },
  });
};
