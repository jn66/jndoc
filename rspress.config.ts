import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'CNKI前端规范',
  description: 'CNKI 前端团队规范与样式库共建文档',
  icon: '/logo.png',
  logo: {
    light: '/logo.png',
    dark: '/logo-dark.png',
  },
  
  themeConfig: {
    socialLinks: [
      { icon: 'github', mode: 'link', content: '' },
    ],
  },
  globalStyles: path.join(__dirname, 'style.css'),
});
