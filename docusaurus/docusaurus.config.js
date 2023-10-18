// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Herbert Yang Digital Public Archive',
  tagline: 'A digital garden of forking paths',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://herbertyang.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: `G-XKPZ7NCGQN`,
          anonymizeIP: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Herbert Yang`,
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
          blogTitle: "Herbert Yang's blog",
          blogDescription: 'the good, the bad, the curious',
          postsPerPage: 10,
          blogSidebarCount: 10
        },
        docs: { 
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/wuhan_moshan_social.jpg',
      navbar: {
        title: 'Herbert Yang',
        logo: {
          alt: 'Herbert Yang Logo',
          src: 'img/herbert_avatar.jpg',
        },
        items: [
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            type: 'docSidebar',
            sidebarId: 'gallerySidebar',
            position: 'left',
            label: 'Photo Gallery',
          },
          {
            type: 'docSidebar',
            sidebarId: 'hackerSidebar',
            position: 'left',
            label: 'Digital Sovereignty',
          },
          {
            type: 'docSidebar',
            sidebarId: 'recordingSidebar',
            position: 'left',
            label: 'Cover Songs',
          },
          {
            type: 'docSidebar',
            sidebarId: 'cookbookSidebar',
            position: 'left',
            label: 'Cook Book',
          },
          {
            type: 'docSidebar',
            sidebarId: 'publicSidebar',
            position: 'left',
            label: 'Public Speech',
          },
          {
            type: 'docSidebar',
            sidebarId: 'aboutSidebar',
            position: 'left',
            label: 'About',
          },
          /**
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
          */
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Writing',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Tags',
                to: '/blog/tags',
              },
              {
                label: 'RSS',
                to: '/blog/rss.xml',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/herbertyang',
              },
              {
                label: 'Linkedin',
                href: 'https://www.linkedin.com/in/herbertyang',
              },
              {
                label: 'OpenChat',
                href: 'https://oc.app/?ref=inda5-hyaaa-aaaaf-aaioq-cai',
              },
            ],
          },
          {
            title: 'Creation',
            items: [
              {
                label: 'Youtube',
                to: 'https://www.youtube.com/c/HerbertYang',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/zire',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/zire',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Herbert Yang Digital Public Archive, Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

};

module.exports = config;