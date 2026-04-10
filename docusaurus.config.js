// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Abhishek Gupta | Portfolio',
  tagline: 'Exploring the World of Testing, Reliability, and AI',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://abhishekgupta1.github.io',
  baseUrl: '/',

  organizationName: 'abhishekgupta1',
  projectName: 'abhishekgupta1.github.io',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: './docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
        },
        blog: {
          path: './blog',
          routeBasePath: 'articles',
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        blogRouteBasePath: '/articles',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {name: 'twitter:card', content: 'summary_large_image'},
        {property: 'og:type', content: 'website'},
      ],
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Abhishek Gupta',
        items: [
          {to: '/', label: 'Home', position: 'left'},
          {to: '/projects', label: 'Projects', position: 'left'},
          {to: '/articles', label: 'Articles', position: 'left'},
          {type: 'docSidebar', sidebarId: 'docs', label: 'Docs', position: 'left'},
          {to: '/resume', label: 'Resume', position: 'left'},
          {to: '/certificates', label: 'Certificates', position: 'left'},
          {
            href: 'https://github.com/abhishekgupta1',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub',
          },
          {
            href: 'https://www.linkedin.com/in/abhishekcgupta1/',
            position: 'right',
            className: 'header-linkedin-link',
            'aria-label': 'LinkedIn',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Navigation',
            items: [
              {label: 'Home', to: '/'},
              {label: 'Projects', to: '/projects'},
              {label: 'Articles', to: '/articles'},
              {label: 'Docs', to: '/docs/intro'},
              {label: 'Resume', to: '/resume'},
              {label: 'Certificates', to: '/certificates'},
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/abhishekgupta1',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/abhishekcgupta1/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Abhishek Gupta. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
