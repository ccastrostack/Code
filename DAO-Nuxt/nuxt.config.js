// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default {
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    moralisAppId: process.env.MORALIS_APP_ID,
    moralisMasterKey: process.env.MORALIS_MASTER_KEY,
    moralisServerUrl: process.env.MORALIS_SERVER_URL,
    publicRuntimeConfig: {
      apiUrl: process.env.API_URL,
      moralisAppId: process.env.MORALIS_APP_ID,
      moralisMasterKey: process.env.MORALIS_MASTER_KEY,
      moralisServerUrl: process.env.MORALIS_SERVER_URL,
      plausible: {
        domain: process.env.PLAUSIBLE_DOMAIN,
      },
    },
    css: [
      '~/assets/tailwind.css',
      '~/assets/tokenpurchase.css',
      'vue-toast-notification/dist/theme-sugar.css',
    ],
    build: {
      postcss: {
        postcssOptions: require('./postcss.config.js'),
      },
    },
    modules: ['vue-plausible'],
    plausible: {
      domain: process.env.PLAUSIBLE_DOMAIN,
    },
  },
  css: ['~/assets/tailwind.css', '~/assets/tokenpurchase.css'],
  build: {
    transpile: ['luxon', '@headlessui/vue'],
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  },
  modules: ['vue-plausible', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  plausible: {
    enableAutoPageviews: true,
    // enableAutoOutboundTracking: true,// Causes target="_blank" links to open in same tab
  },
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    'vue-plausible',
  ],
  extend(config, ctx) {
    config.resolve.symlinks = false;
  },
  head: {
    title: "DAOHQ - The world's first DAO marketplace",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'Description',
        content:
          "DAOHQ is the world's first DAO marketplace. Find crypto and DAOs in our one-stop marketplace to manage organisations and businesses on the blockchain.",
      },
    ],
    link: [
      { rel: 'modulepreload', href: '/_nuxt/entry-404c2d51.mjs', as: 'script' },
      { rel: 'preload', href: '/_nuxt/entry.8cdfd321.css', as: 'style' },
      { rel: 'modulepreload', href: '/_nuxt/index-81db9511.mjs', as: 'script' },
      { rel: 'preload', href: '/_nuxt/index.6ec96ede.css', as: 'style' },
      { type: 'module', rel: 'prefetch', href: '/_nuxt/about-58fa83a0.mjs' },
      { type: 'module', rel: 'prefetch', href: '/_nuxt/_id_-c1db7686.mjs' },
      { type: 'module', rel: 'prefetch', href: '/_nuxt/privacy-a24c8859.mjs' },
      { type: 'module', rel: 'prefetch', href: '/_nuxt/submit-f743d627.mjs' },
      { type: 'module', rel: 'prefetch', href: '/_nuxt/terms-65b95648.mjs' },
      { rel: 'stylesheet', href: '/_nuxt/entry.8cdfd321.css' },
      { rel: 'stylesheet', href: '/_nuxt/index.6ec96ede.css' },
    ],
  },
  // robots: {
  //   UserAgent: '*',
  //   Disallow: '/admin',
  // },
  // sitemap: {
  //   hostnme: 'https://www.daohq.co',
  //   path: '/sitemap.xml',
  //   generate: false,

  // }
};
