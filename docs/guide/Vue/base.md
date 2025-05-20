# 一个 vue3 的脚手架

地址
https://gitee.com/jn9/fast-go

# fastGo

基于 tailwind 4 是 master 分支
基于 tailwind 3 是 v3 分支

他们的语法 99%一致，区别就是对于谷歌浏览器的支持，tailwind 3 支持谷歌 80 浏览器，tailwind 4 谷歌 100 以上浏览器

对于国内，主要体现在是搜狗浏览器的支持，tailwind 3 支持搜狗浏览器 11，tailwind 4 支持搜狗浏览器 13

下载项目后，删掉 git 文件夹，重新建立自己的 git 索引，然后提交到自己的 git 仓库

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

- Node.js v18+
- pnpm >=8.0.0

安装了 vue3，并且配置了 eslint

使用 tailwind，并且标准单位为 1px

安装了 element plus https://element-plus.org/zh-CN/

安装了 AutoImport ，自动导入 ref ，reactive 等, 并且配置 eslint 忽略自动导入的变量

安装了 axios，并且配置了拦截器

安装了 husky lint-staged，配置还有提升空间

unplugin-vue-components 自动导入 components 下面的组件，不需要手动导入

安装了 element-plus，可以直接使用其中的组件，无需导入

因为使用了 element-plus 自带 dayjs，所以可以导入直接使用 import { dayjs } from 'element-plus'

安装了 js-cookie，用于操作 cookie import Cookies from 'js-cookie'

"preinstall": "npx only-allow pnpm", 配置了 pnpm 作为包管理器，防止使用其他包管理器安装

安装 lodash-es，用于操作数组，对象，字符串等 import { chunk } from 'lodash-es'
