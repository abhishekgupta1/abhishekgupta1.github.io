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
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
        },
        // Google Analytics (GA4). Uncomment and set trackingID once you have a
        // property. Left off until then because an invalid ID fails the build.
        // gtag: {
        //   trackingID: 'G-XXXXXXXXXX',
        //   anonymizeIP: true,
        // },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'cheatsheets',
        path: 'cheatsheets',
        routeBasePath: 'cheatsheets',
        sidebarPath: './sidebarsCheatsheets.js',
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
        docsRouteBasePath: ['docs', 'cheatsheets'],
        blogRouteBasePath: '/articles',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/og-image.png',
      metadata: [
        {name: 'twitter:card', content: 'summary_large_image'},
        {property: 'og:type', content: 'website'},
        // Google Search Console verification. Replace the content value with the
        // token from Search Console (Settings -> Ownership verification -> HTML tag),
        // or drop Google's verification HTML file into static/ instead.
        {name: 'google-site-verification', content: 'REPLACE_WITH_SEARCH_CONSOLE_TOKEN'},
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
          {type: 'docSidebar', docsPluginId: 'cheatsheets', sidebarId: 'cheatsheets', label: 'Cheat Sheets', position: 'left'},
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
            title: 'Content',
            items: [
              {label: 'Articles', to: '/articles'},
              {label: 'Docs', to: '/docs/intro'},
              {label: 'Cheat Sheets', to: '/cheatsheets'},
              {label: 'Projects', to: '/projects'},
              {label: 'Dashboard', to: '/dashboard'},
            ],
          },
          {
            title: 'Site',
            items: [
              {label: 'About', to: '/about'},
              {label: 'Contact', to: '/contact'},
              {label: 'Resume', to: '/resume'},
              {label: 'Certificates', to: '/certificates'},
            ],
          },
          {
            title: 'Legal',
            items: [
              {label: 'Privacy Policy', to: '/privacy'},
              {label: 'Terms of Service', to: '/terms'},
              {label: 'Cookie Policy', to: '/cookie-policy'},
              {label: 'Disclaimer', to: '/disclaimer'},
            ],
          },
          {
            title: 'Connect',
            items: [
              {label: 'GitHub', href: 'https://github.com/abhishekgupta1'},
              {label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhishekcgupta1/'},
              {label: 'RSS', href: 'https://abhishekgupta1.github.io/articles/rss.xml'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Abhishek Gupta. Content is original work; third-party names and trademarks belong to their owners.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
