import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'CNKI-DOC',
  description: 'JiangNing study document',
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
