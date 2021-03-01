module.exports = {
  title: '姜宁知识库',
  tagline: '落霞与孤鹜齐飞 秋水共长天一色',
  url: 'https://web.jnblog.cn/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '姜宁知识库',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: '前端文档',
          position: 'left',
        },
        {to: 'blog', label: '心得体会', position: 'left'},
        {
          href: 'http://www.jnblog.cn/',
          label: '姜宁博客',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            }
          ],
        },
        {
          title: '一些链接',
          items: [
            {
              label: '链接1',
              href: 'http://www.jnblog.cn/1',
            },
            {
              label: '链接2',
              href: 'http://www.jnblog.cn/2',
            },
            {
              label: '链接3',
              href: 'http://www.jnblog.cn/3',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 姜宁知识库, Inc. Built with jnblog.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          showReadingTime: false
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
