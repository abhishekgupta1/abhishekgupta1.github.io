// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import {GOATCOUNTER_CODE, ADS_ENABLED, ADSENSE_CLIENT} from './src/data/site.js';

const GITHUB_REPO = 'https://github.com/abhishekgupta1/abhishekgupta1.github.io';
const EDIT_URL = `${GITHUB_REPO}/tree/main/`;

/**
 * Analytics + ads are injected here only when switched on in src/data/site.js.
 * GoatCounter is cookieless; AdSense stays off until the site is approved.
 */
const conditionalHeadTags = [
  {
    tagName: 'link',
    attributes: {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicon-32x32.png'},
  },
  {
    tagName: 'link',
    attributes: {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicon-16x16.png'},
  },
  ...(GOATCOUNTER_CODE
    ? [
        {
          tagName: 'script',
          attributes: {
            'data-goatcounter': `https://${GOATCOUNTER_CODE}.goatcounter.com/count`,
            async: true,
            src: '//gc.zgo.at/count.js',
          },
        },
      ]
    : []),
  ...(ADS_ENABLED
    ? [
        {
          tagName: 'script',
          attributes: {
            async: true,
            src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
            crossorigin: 'anonymous',
          },
        },
      ]
    : []),
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'docssheet',
  tagline: 'Docs & cheat sheets for testing, reliability, and AI',
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

  markdown: {
    mermaid: true,
  },

  onBrokenLinks: 'warn',

  headTags: conditionalHeadTags,

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
          editUrl: EDIT_URL,
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          path: './blog',
          routeBasePath: 'articles',
          editUrl: EDIT_URL,
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
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
        editUrl: EDIT_URL,
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
      }),
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {tagName: 'link', rel: 'manifest', href: '/manifest.json'},
          {tagName: 'meta', name: 'theme-color', content: '#FFC933'},
          {tagName: 'meta', name: 'apple-mobile-web-app-capable', content: 'yes'},
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {tagName: 'link', rel: 'apple-touch-icon', href: '/img/apple-touch-icon-180x180.png'},
          {tagName: 'link', rel: 'mask-icon', href: '/img/logo-icon.svg', color: '#FFC933'},
        ],
      },
    ],
    // Per-page Open Graph images, generated at build time. Best-effort:
    // never breaks the build. Remove this line to disable.
    './plugins/og-image',
  ],

  themes: [
    '@docusaurus/theme-mermaid',
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
        title: 'docssheet',
        logo: {
          alt: 'docssheet logo',
          src: 'img/logo-icon.svg',
        },
        items: [
          {to: '/', label: 'Home', position: 'left'},
          {to: '/projects', label: 'Projects', position: 'left'},
          {to: '/articles', label: 'Articles', position: 'left'},
          {type: 'docSidebar', sidebarId: 'docs', label: 'Docs', position: 'left'},
          {type: 'docSidebar', docsPluginId: 'cheatsheets', sidebarId: 'cheatsheets', label: 'Cheat Sheets', position: 'left'},
          {
            type: 'dropdown',
            label: 'Learn',
            position: 'left',
            items: [
              {to: '/roadmap', label: 'Skill Roadmap'},
              {to: '/skills', label: 'Skills Matrix'},
              {to: '/dashboard', label: 'Progress Dashboard'},
              {to: '/start', label: 'Pick Your Focus'},
            ],
          },
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
            title: 'Learn',
            items: [
              {label: 'Skill Roadmap', to: '/roadmap'},
              {label: 'Skills Matrix', to: '/skills'},
              {label: 'Progress Dashboard', to: '/dashboard'},
              {label: 'Pick Your Focus', to: '/start'},
            ],
          },
          {
            title: 'Site',
            items: [
              {label: 'About', to: '/about'},
              {label: 'Uses', to: '/uses'},
              {label: 'Now', to: '/now'},
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
