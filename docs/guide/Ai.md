# AiUpgrade Ai 升级版

一个 vue3 + vite + tailwindcss + axios + pinia 的脚手架，

使用 pnpm 做包管理

安装 pnpm
如果提示没权限, 搜一下怎么弄
npm install -g pnpm

```bash
pnpm install
pnpm run dev
```

## 极速快速高速

- 新项目从头开发, 不在老项目上打补丁, 快
- pnpm 比 npm 进行包管理, 快
- Vue3 比 vue2 提升性能和速度, 快
- vite 比 webpack 显著提高打包和修改速度, 快
- tailwindcss 比传统 css 书写更便捷, 省去 class 查找和书写, 快
- unplugin-vue-components 和 unplugin-auto-import 自动引入, 省去了手动引入, 快
- vscode 配置了搜索优化, 忽略了相关文件, 快
- primevue elementUI

node 版本 20.11.1 或以上

## tailwind 手册

https://nerdcave.com/tailwind-cheat-sheet

## 在.vscode 中写了一些配置

可以搜索的时候忽略包文件，增加搜索速度。

## 使用了 unplugin-vue-components 自动引入自定义组件, components 下面的组件都不用导入

也可以在 vite.config.js 中配置 components 哪些目录下的组件自动导入

primeVue 下面的组件自动导入,不用引入.

```js
Components({ dirs: ['src/components/brief', 'src/components/'] }),
```

## 使用了 unplugin-auto-import 自动引入相关包, ref、reactive、axios 都不用导入

```js
// 使用前
import { computed, ref } from "vue";
const count = ref(0);
const doubled = computed(() => count.value * 2);
// 使用后
const count = ref(0);
const doubled = computed(() => count.value * 2);
```

## 插件安装

需要安装 Eslint ,Tailwind CSS, Vue , Prettier 四个 vs code 插件

## 使用 tailwindcss 作为主要样式书写方式，并且进行了适当配置

具体参考 https://www.tailwindcss.cn/ 或者英文文档 https://www.tailwindcss.com

如 class="mt-2" 就是 margin-top:2px ，已经在 https://ec.cnki.net/member/

使用。可以右键审查元素查看具体写法。

## UI 组件

primevue element-plus 都可以使用

https://primevue.org/ https://tailwind.primevue.org/ 官网
https://element-plus.org/zh-CN/ 饿了么

## 小注意

vite 里没有 require,需要 require 引入图片的时候,需要 new URL(`@/assets/images/header/my-collect.png`, import.meta.url).href

# 小图标

使用了 priveVue 框架中的小图标,数量不多. 常用的上下左右放大镜. 能变大小,换颜色,够用了.

https://primevue.org/icons/

# 解决 Vue UI 中，Open in editor 功能失效无法调起 VS Code 的问题

https://zhuanlan.zhihu.com/p/443600310

# 子项目约定

在 assets/images , components(组件需要以名称开头 如 components/sumup/SumUpHome) , views, api 新建以下不同名字的文件夹,

- 文献综述 sumup
- 文献趋势 trend
- 大脑 brain

# 部署方法

测试环境部署步骤
1、提交代码到 master 分支
2、hosts 文件增加配置 10.31.82.201 e.hlw.cnki.net
3、http://e.hlw.cnki.net/hlwjens/ 账号：hlwdep 密码：hLw!deP#Jen^kins~Tool@2024
http://e.hlw.cnki.net/hlwjens/job/aiplus_upgrade_beta/ Build Now
4、beta 环境测试地址: https://beta.cnki.net/ainote/dashboard

# 本地测试 vip 账户方法

本地项目启动后访问/login.html 这个接口，cookie 会变成 vip 用户信息

# 配置 host

前面是本机 ip 地址 , 在命令行中输入 ipconifg 可以查看自己的 ip 地址
如我的是
IPv4 地址 . . . . . . . . . . . . : 192.168.1.101

因此 host 需要这样配置
192.168.1.101 ai.cnki.net

那么访问项目的时候,输入 http://ai.cnki.net:5173/就可以访问了

要运行后自动打开这个网址, 需要输入 npm run dev:jn

## 其他情况, 如果参照上面的 host 弄好可以不看

如果因为有多个项目,自己的本地 host 是必须是其他 cnki 的域名,如 abc.cnki.net ,那么需要在 hosts 文件中增加配置
192.168.1.101 abc.cnki.net
那么访问项目的时候,输入 http://abc.cnki.net:5173/就可以访问了
要运行后自动打开这个网址, 需要在 packagejson 中配置自己的运行命令. "dev:你的名字": "vite --port 5173 --open http://abc.cnki.net:5173/",
